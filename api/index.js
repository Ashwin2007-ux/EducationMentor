const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const Groq = require('groq-sdk');
const FormData = require('form-data');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ dest: '/tmp/' });

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edumentor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EduMentor Backend is running' });
});

// Generate notes from PDF
app.post('/api/notes/generate', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Processing file:', req.file.originalname);

    // Validate file type
    if (req.file.mimetype !== 'application/pdf') {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }

    // Check file size (limit to 10MB)
    if (req.file.size > 10 * 1024 * 1024) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'File size too large. Maximum 10MB allowed.' });
    }

    // Parse PDF
    let pdfText = '';
    try {
      const dataBuffer = fs.readFileSync(req.file.path);
      const data = await pdfParse(dataBuffer);
      pdfText = data.text;
      console.log('PDF text extracted, length:', pdfText.length);
    } catch (pdfError) {
      console.error('PDF parsing error:', pdfError);
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Invalid PDF file. Please upload a valid PDF document.' });
    }

    if (!pdfText || pdfText.trim().length === 0) {
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'No text content found in PDF. Please upload a PDF with readable text.' });
    }

    // Generate notes using Groq with updated model
    const prompt = `Please generate structured, clean notes from the following text extracted from a PDF. Organize the content into sections with headings, bullet points, and key takeaways:\n\n${pdfText}`;

    console.log('Calling Groq API...');
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-70b-8192', // Updated to supported model
    });

    const generatedNotes = chatCompletion.choices[0]?.message?.content || 'Failed to generate notes';

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    console.log('Notes generated successfully');
    res.json({ notes: generatedNotes });
  } catch (error) {
    console.error('Error generating notes:', error);

    // Clean up uploaded file if it exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ error: 'Failed to generate notes. Please try again.' });
  }
});

// Proxy for RAG chat (Flowise)
app.post('/api/rag/chat', upload.single('files'), async (req, res) => {
  try {
    const { question } = req.body;
    const file = req.file;

    const form = new FormData();
    form.append('question', question);

    if (file) {
      form.append('files', fs.createReadStream(file.path), { filename: file.originalname, contentType: file.mimetype });
    }

    const response = await fetch(`http://localhost:3000/api/v1/prediction/7664444b-d5c1-4b15-8d6a-c04222455e2c`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.FLOWISE_API_KEY}`,
        ...form.getHeaders(),
      },
      body: form,
    });

    if (!response.ok) {
      throw new Error(`Flowise API error: ${response.statusText}`);
    }

    const result = await response.json();
    res.json(result);

    // Clean up file if uploaded
    if (file) {
      fs.unlinkSync(file.path);
    }
  } catch (error) {
    console.error('Error in RAG chat:', error);
    res.status(500).json({ error: 'Failed to process RAG chat' });
  }
});

// Proxy for AI Tutor chat (Flowise)
app.post('/api/tutor/chat', async (req, res) => {
  try {
    const { question } = req.body;

    const response = await fetch(`http://localhost:3000/api/v1/prediction/69e318b4-1aa7-4e09-a15b-60630f990c15`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`Flowise API error: ${response.statusText}`);
    }

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error('Error in tutor chat:', error);
    res.status(500).json({ error: 'Failed to process tutor chat' });
  }
});

module.exports = app;
