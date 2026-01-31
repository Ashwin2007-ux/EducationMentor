import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  originalFileName: String,
  title: String,
  content: { type: String, default: '' },
  structure: {
    sections: [String],
    keyPoints: [String],
    summary: String,
    questions: [String]
  },
  createdDate: { type: Date, default: Date.now },
  lastModified: Date
});

export default mongoose.model('Notes', notesSchema);
