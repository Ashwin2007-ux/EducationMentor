import ChatHistory from '../models/ChatHistory.js';
import { generateAIResponse } from '../services/aiService.js';

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.userId || 'guest';

    let chat = await ChatHistory.findOne({ userId, type: 'tutor' });
    if (!chat) {
      chat = new ChatHistory({ userId, type: 'tutor', messages: [] });
    }

    chat.messages.push({ role: 'user', content: question });

    const answer = await generateAIResponse(question);
    chat.messages.push({ role: 'assistant', content: answer });

    await chat.save();

    res.json({ answer, sources: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const userId = req.userId || 'guest';
    const chat = await ChatHistory.findOne({ userId, type: 'tutor' });
    res.json({ messages: chat?.messages || [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearHistory = async (req, res) => {
  try {
    const userId = req.userId || 'guest';
    await ChatHistory.deleteOne({ userId, type: 'tutor' });
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
