# EduMentor Backend

Backend API for EduMentor - AI Learning Assistant

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure `.env` file with MongoDB connection string

3. Start server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Auth
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get profile (auth required)

### AI Tutor
- POST `/api/tutor/ask` - Ask a question
- GET `/api/tutor/history` - Get chat history
- DELETE `/api/tutor/clear` - Clear history

### RAG Chat
- POST `/api/rag/upload` - Upload PDF document
- POST `/api/rag/query` - Ask question about document
- GET `/api/rag/documents` - Get all documents
- DELETE `/api/rag/:documentId` - Delete document
- GET `/api/rag/quiz/:documentId` - Get auto-generated quiz

### Notes Generator
- POST `/api/notes/generate` - Generate notes from PDF
- POST `/api/notes/save` - Save custom notes
- GET `/api/notes/saved` - Get saved notes
- PUT `/api/notes/:noteId` - Update notes
- DELETE `/api/notes/:noteId` - Delete notes

## Database

MongoDB Atlas connection configured in `.env`
