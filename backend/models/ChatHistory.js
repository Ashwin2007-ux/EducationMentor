import mongoose from 'mongoose';

const chatHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ['tutor', 'rag'], required: true },
  documentId: String,
  messages: [{
    role: { type: String, enum: ['user', 'assistant'] },
    content: String,
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('ChatHistory', chatHistorySchema);
