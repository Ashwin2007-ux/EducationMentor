# 🎓 EduMentor - AI-Powered Learning Assistant

EduMentor is a comprehensive MERN (MongoDB, Express, React, Node.js) application that provides AI-powered learning tools to help students learn more effectively.

## ✨ Features

### 1. **🤖 AI Tutor Chatbot**
- Ask questions on any topic and get instant AI-powered assistance
- Maintain conversation history within chat sessions
- Perfect for clarifying doubts and learning new concepts
- Built with Groq API integration for fast, intelligent responses

### 2. **📄 RAG Chatbot (Retrieval-Augmented Generation)**
- Upload PDF documents and ask questions about their content
- AI understands document context and provides accurate answers
- Useful for studying from textbooks, notes, or research papers
- Supports multiple PDF uploads in a session

### 3. **📝 Notes Generator**
- Convert PDF documents into structured, well-organized notes
- AI-powered summarization and formatting
- Download generated notes as text files
- Copy notes to clipboard for easy sharing

### 4. **🔐 User Authentication**
- Secure user registration and login
- Default login available for testing (admin@edumentor.com / admin123)
- Optional MongoDB integration for persistent data storage

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **GROQ API Key** - [Get free key](https://console.groq.com)
- **MongoDB** (Optional) - For persistent storage

### Installation

#### 1. Clone & Setup Backend

```bash
cd backend
npm install
```

#### 2. Setup Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
JWT_SECRET=your_secret_key_here
MONGODB_URI=mongodb://localhost:27017/edumentor
VITE_API_BASE_URL=http://localhost:5000/api
```

**How to get GROQ API Key:**
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up or login
3. Create an API key
4. Copy it to your `.env` file

#### 3. Setup Frontend

```bash
# From project root
npm install
```

Create `.env` file in project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Running the Application

#### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
EduMentor Backend server running on port 5000
```

#### Terminal 2 - Start Frontend Dev Server

```bash
# From project root
npm run dev
```

Expected output:
```
VITE v7.x.x  ready in xxx ms
Port: 5173
Local: http://localhost:5173/
```

### Access the Application

Open your browser and go to: **http://localhost:5173/**

### Default Login Credentials

```
Email: admin@edumentor.com
Password: admin123
```

---

## 📚 How to Use Each Feature

### AI Tutor Chatbot

1. Click **"AI Tutor"** in the navigation
2. Type your question in the input box
3. Click **"Send"** and wait for AI response
4. Continue the conversation or click **"Clear"** to start fresh

**Example Questions:**
- "Explain photosynthesis"
- "How do I solve quadratic equations?"
- "What is machine learning?"

### RAG Chatbot

1. Click **"RAG Chat"** in the navigation
2. Click **"Choose File"** and upload a PDF
3. Type a question about the PDF content
4. Click **"Send"** to get AI-powered answers based on your document

**Example:**
- Upload a chemistry textbook PDF
- Ask: "What are the steps of the Krebs cycle?"
- Get answers directly from your document

### Notes Generator

1. Click **"Notes"** in the navigation
2. Click **"Select PDF File"** and choose a PDF
3. Click **"Generate Notes"** button
4. Wait for AI to process (shows progress spinner)
5. View generated notes in the right panel
6. Click **"Download Notes"** to save as .txt file
7. Or click **"Copy"** to copy to clipboard

**Tips:**
- Works best with PDF documents that contain readable text
- Maximum file size: 10MB
- Generated notes include structured headings and bullet points

---

## 🔧 Project Structure

```
EduMentor/
├── backend/
│   ├── models.js           # MongoDB schemas
│   ├── server.js           # Express server & API routes
│   ├── package.json        # Backend dependencies
│   └── uploads/            # Temporary file storage
├── src/
│   ├── Components/
│   │   ├── Chat/
│   │   │   ├── AITutorChat.jsx      # AI Tutor feature
│   │   │   ├── RagChat.jsx          # RAG Chat feature
│   │   │   ├── MessageInput.jsx
│   │   │   └── MessageList.jsx
│   │   ├── notes/
│   │   │   └── NotesGenerator.jsx   # Notes Generator feature
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── NavBar.jsx
│   ├── services/
│   │   ├── tutorApi.js     # AI Tutor API calls
│   │   ├── ragApi.js       # RAG Chat API calls
│   │   ├── notesApi.js     # Notes Generator API calls
│   │   ├── authApi.js      # Authentication API calls
│   │   └── apiClient.js    # Base API configuration
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # React entry point
│   └── index.css
├── package.json            # Frontend dependencies
├── vite.config.js          # Vite configuration
├── .env                    # Environment variables
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### AI Tutor
- `POST /api/tutor/chat` - Send message to AI tutor
- `GET /api/chat/sessions` - Get user's chat sessions
- `GET /api/chat/messages/:sessionId` - Get messages from a session

### RAG Chat
- `POST /api/rag/chat` - Send message with optional PDF file

### Notes Generator
- `POST /api/notes/generate` - Generate notes from PDF
- `GET /api/notes` - Get user's saved notes

### Health Check
- `GET /api/health` - Server status

---

## 🛠️ Troubleshooting

### Backend Won't Start
```bash
# Clear node modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port Already in Use
```bash
# Change port in backend/.env
PORT=5001

# Or kill existing process (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### GROQ API Errors
- Verify API key is correct in `.env`
- Check you have API quota remaining
- Ensure your internet connection is stable

### PDF Upload Issues
- File must be actual PDF (not corrupted)
- File size must be under 10MB
- Ensure PDF has selectable text content
- Scanned images without OCR won't work well

### MongoDB Connection Issues
```bash
# If you want to use MongoDB locally
# Install MongoDB Community Edition
# Or use MongoDB Atlas cloud service

# For now, app works without MongoDB
# (uses default test login)
```

---

## 🧪 Testing Without MongoDB

The application has a **default test login** that works without MongoDB:

```
Email: admin@edumentor.com
Password: admin123
```

This allows you to test all features immediately without setting up a database!

---

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `groq-sdk` - AI API integration
- `multer` - File upload handling
- `pdf-parse` - PDF parsing
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-origin requests

### Frontend
- `react` - UI framework
- `react-router-dom` - Routing
- `tailwindcss` - CSS styling
- `vite` - Build tool

---

## 🚀 Deployment (Optional)

### Deploy Backend to Render
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables
6. Deploy!

### Deploy Frontend to Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project
4. Set `VITE_API_BASE_URL` to your backend URL
5. Deploy!

---

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Developer Notes

- All code uses **beginner-friendly syntax** with clear comments
- Frontend uses **modern React hooks** (useState, useEffect)
- Backend uses **ES6 modules** throughout
- Styling done with **Tailwind CSS** for easy customization
- Error handling included on all API calls

---

## ❓ FAQ

**Q: Can I use this without GROQ API?**
A: No, GROQ API is required for AI features. Get a free key at console.groq.com

**Q: Is my data stored?**
A: Without MongoDB, data is stored in browser (localStorage). Enable MongoDB for persistent storage.

**Q: Can I modify the AI responses?**
A: Yes! Edit the system prompts in `backend/server.js` for each feature.

**Q: What if I have questions?**
A: Check the code comments, they're comprehensive and beginner-friendly!

---

**Happy Learning! 🎉** - AI-Powered Learning Assistant

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/kHcTVVd1)

EduMentor is a comprehensive AI-powered educational platform that helps students with their learning journey through multiple intelligent tools.

## Features

### 🤖 AI Tutor Chatbot
- Get instant answers to your questions
- 24/7 AI-powered tutoring assistance
- Supports various subjects and topics

### 📚 RAG Chatbot
- Upload PDF documents and chat about their content
- Intelligent document analysis and Q&A
- Perfect for studying from textbooks and research papers

### 📝 Notes Generator
- Convert PDF documents into structured, clean notes
- AI-powered summarization and formatting
- Save time on note-taking

## Technology Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **AI**: Groq API (Llama 3.3 70B)
- **File Processing**: PDF parsing capabilities
- **Database**: MongoDB (optional)

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Groq API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EduMentor
   ```

2. **Set up environment variables**
   
   Backend (.env in /backend folder):
   ```
   GROQ_API_KEY=your_groq_api_key_here
   PORT=5000
   MONGODB_URI=your_mongodb_uri_here (optional)
   ```
   
   Frontend (.env in root folder):
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. **Easy Start (Windows)**
   ```bash
   start.bat
   ```
   
   Or manually:
   
   **Start Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```
   
   **Start Frontend:**
   ```bash
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/notes/generate` - Generate notes from PDF
- `POST /api/tutor/chat` - AI tutor chat
- `POST /api/rag/chat` - RAG chat with document upload

## Usage

### AI Tutor
1. Navigate to the "AI Tutor" tab
2. Type your question in the chat input
3. Get instant AI-powered responses

### RAG Chat
1. Go to the "RAG Chat" tab
2. Upload a PDF document
3. Ask questions about the document content
4. Get contextual answers based on your document

### Notes Generator
1. Visit the "Notes" tab
2. Upload a PDF file (max 10MB)
3. Click "Generate Notes"
4. Get well-structured, AI-generated notes

## File Structure

```
EduMentor/
├── backend/
│   ├── uploads/          # Temporary file uploads
│   ├── .env             # Backend environment variables
│   ├── package.json     # Backend dependencies
│   └── server.js        # Express server
├── src/
│   ├── Components/      # React components
│   ├── services/        # API service functions
│   └── styles/          # CSS files
├── .env                 # Frontend environment variables
├── package.json         # Frontend dependencies
├── start.bat           # Windows startup script
└── README.md           # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.