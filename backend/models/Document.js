import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fileName: { type: String, required: true },
  fileSize: Number,
  content: { type: String, default: '' },
  uploadDate: { type: Date, default: Date.now },
  questions: [{ type: String }],
  chatHistory: [{
    question: String,
    answer: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('Document', documentSchema);
