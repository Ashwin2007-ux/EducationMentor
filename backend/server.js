import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import tutorRoutes from './routes/tutor.js';
import ragRoutes from './routes/rag.js';
import notesRoutes from './routes/notes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/tutor', tutorRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/notes', notesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const dbConn = await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Backend running on ${PORT}`);
      if (dbConn) {
        console.log('✅ MongoDB connected successfully');
      } else {
        console.log('⚠️  Running in demo mode (no MongoDB)');
      }
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'EduMentor backend is running 🚀',
    status: 'OK'
  });
});

startServer();
