import Notes from '../models/Notes.js';
import pdfParse from 'pdf-parse';
import { generateAIResponse } from '../services/aiService.js';

const structureNotes = async (text) => {
  // Extract key sentences
  const sentences = text.split('.').filter(s => s.trim().length > 20).slice(0, 5);
  
  // Generate smart key points
  const keyPoints = [];
  for (const sentence of sentences.slice(0, 3)) {
    const aiSummary = await generateAIResponse(`Summarize in one line: ${sentence.trim()}`);
    keyPoints.push(aiSummary);
  }

  return {
    sections: ['Introduction', 'Main Concepts', 'Key Points', 'Conclusion'],
    keyPoints: keyPoints.length > 0 ? keyPoints : sentences.map(s => s.trim().substring(0, 80)),
    summary: await generateAIResponse(`Summarize this in 2-3 lines: ${text.substring(0, 500)}`),
    questions: [
      'What are the main concepts discussed?',
      'How can you apply this information?',
      'What are the key takeaways?'
    ]
  };
};

export const generateNotes = async (req, res) => {
  try {
    const userId = req.userId || 'guest';
    const file = req.file;
    const { content: textContent } = req.body;

    let content;
    let fileName = 'manual_notes';

    // If file uploaded, extract PDF text
    if (file) {
      const pdfData = await pdfParse(file.buffer);
      content = pdfData.text;
      fileName = file.originalname.replace('.pdf', '');
    } 
    // If text content provided, use it
    else if (textContent) {
      content = textContent;
    } 
    // If neither, return error
    else {
      return res.status(400).json({ message: 'Please upload a file or provide text content' });
    }

    const structure = await structureNotes(content);

    const notes = new Notes({
      userId,
      originalFileName: fileName + '.pdf',
      title: fileName,
      content,
      structure
    });

    await notes.save();

    res.json({
      title: notes.title,
      structure,
      message: 'Notes generated successfully',
      notesId: notes._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveNotes = async (req, res) => {
  try {
    const userId = req.userId || 'guest';
    const { title, content } = req.body;

    const notes = new Notes({
      userId,
      title,
      content,
      structure: {}
    });

    await notes.save();
    res.json({ message: 'Notes saved', notesId: notes._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSavedNotes = async (req, res) => {
  try {
    const userId = req.userId || 'guest';
    const allNotes = await Notes.find({ userId }).select('-content');
    res.json({ notes: allNotes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.userId || 'guest';

    const note = await Notes.findOneAndDelete({ _id: noteId, userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.userId || 'guest';
    const { title, content } = req.body;

    const note = await Notes.findOneAndUpdate(
      { _id: noteId, userId },
      { title, content, lastModified: new Date() },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note updated', note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
