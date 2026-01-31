import Document from '../models/Document.js';
import ChatHistory from '../models/ChatHistory.js';
import pdfParse from 'pdf-parse';
import { generateAIResponse } from '../services/aiService.js';

const generateQuestions = (text) => {
  const sentences = text.split('.').filter(s => s.length > 20).slice(0, 3);
  return sentences.map((s, i) => `Question ${i + 1}: Based on "${s.trim()}", what is the key concept?`);
};

let docCounter = 1;

export const uploadDocument = async (req, res) => {
  try {
    const userId = req.userId || 'guest';
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const pdfData = await pdfParse(file.buffer);
    const content = pdfData.text;
    const questions = generateQuestions(content);

    const doc = new Document({
      userId,
      fileName: file.originalname,
      fileSize: file.size,
      content,
      questions
    });

    await doc.save();
    res.json({
      documentId: doc._id,
      fileName: doc.fileName,
      questions,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const queryDocument = async (req, res) => {
  try {
    const { documentId, question } = req.body;
    const userId = req.userId || 'guest';

    // If no documentId, generate AI response in demo mode
    if (!documentId) {
      const answer = await generateAIResponse(question);
      return res.json({
        answer: answer,
        relevantExcerpts: [],
        confidence: 0.7
      });
    }

    const doc = await Document.findOne({ _id: documentId, userId });
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    let chat = await ChatHistory.findOne({ userId, type: 'rag', documentId });
    if (!chat) {
      chat = new ChatHistory({ userId, type: 'rag', documentId, messages: [] });
    }

    chat.messages.push({ role: 'user', content: question });

    const relevantExcerpts = doc.content.split('.').slice(0, 2).filter(s => s.length > 10);
    const context = doc.content.substring(0, 500); // Use document content as context
    const answer = await generateAIResponse(question, context);

    chat.messages.push({ role: 'assistant', content: answer });
    await chat.save();

    res.json({
      answer,
      relevantExcerpts,
      confidence: 0.85
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const userId = req.userId || 'guest';
    const docs = await Document.find({ userId }).select('-content');
    res.json({ documents: docs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const userId = req.userId || 'guest';

    const doc = await Document.findOneAndDelete({ _id: documentId, userId });
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    await ChatHistory.deleteOne({ documentId, userId });
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const { documentId } = req.params;
    const userId = req.userId || 'guest';

    const doc = await Document.findOne({ _id: documentId, userId });
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    const questions = doc.questions.map((q, i) => ({
      id: i + 1,
      question: q,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      explanation: 'This is the correct answer based on document content.'
    }));

    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
