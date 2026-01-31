# EduMentor - Features Documentation

## 🎓 4 Core Features Explained

---

## 1. 🤖 AI Tutor Chatbot

### What It Does
Ask your AI tutor any question and get instant, detailed answers on virtually any topic.

### How to Use
1. Click **"AI Tutor"** in the navbar
2. Type your question in the input box
3. Click **"Send"** button
4. AI responds with helpful explanation
5. Continue asking follow-up questions
6. Click **"Clear"** to start new conversation

### Example Questions
- "What is photosynthesis?"
- "How do I solve quadratic equations?"
- "Explain the French Revolution"
- "What are electromagnetic waves?"
- "How does machine learning work?"

### Technical Details
- Uses **Groq API** with LLaMA 3.3 model
- Maintains conversation context
- Responses saved to MongoDB (if connected)
- Each conversation is a separate session
- Typical response time: 2-5 seconds

### Code Location
- **Frontend**: `src/Components/Chat/AITutorChat.jsx`
- **Backend API**: `backend/server.js` (route: `/api/tutor/chat`)
- **Service**: `src/services/tutorApi.js`

### Features
✓ Multi-turn conversations
✓ Session history
✓ Loading indicators
✓ Error handling
✓ Simple interface

---

## 2. 📄 RAG Chatbot (Retrieval-Augmented Generation)

### What It Does
Upload a PDF document and ask questions about its content. The AI reads your document and answers based on what's inside.

### How to Use
1. Click **"RAG Chat"** in the navbar
2. Click **"Choose File"** and select a PDF
3. Wait for file to be selected (you'll see filename)
4. Type a question about the PDF content
5. Click **"Send"**
6. AI analyzes the PDF and answers your question
7. Upload another PDF or ask more questions
8. Click **"Clear"** to reset

### Example Workflow
1. Upload: "Biology_Textbook_Chapter5.pdf"
2. Ask: "What are the stages of cellular respiration?"
3. AI answers based on the PDF content
4. Ask: "Which stage produces the most ATP?"
5. AI answers from same PDF
6. Upload: "Physics_Notes.pdf"
7. Ask questions about physics

### Technical Details
- Uses **multer** for file upload
- Converts PDF to text using **pdf-parse**
- Sends document context to Groq API
- Temporary files stored in `/backend/uploads/`
- Files automatically deleted after processing
- Max file size: 10MB
- Typical response time: 3-8 seconds

### Code Location
- **Frontend**: `src/Components/Chat/RagChat.jsx`
- **Backend API**: `backend/server.js` (route: `/api/rag/chat`)
- **Service**: `src/services/ragApi.js`

### Features
✓ PDF document upload
✓ Context-aware responses
✓ File size validation
✓ Format validation
✓ Conversation history within session
✓ Multiple PDFs support
✓ Automatic file cleanup

### Supported Formats
- PDF files only
- With selectable text (not scanned images)
- Maximum 10MB
- Any language that PDF supports

---

## 3. 📝 Notes Generator

### What It Does
Transform a PDF document into well-structured, organized study notes with headings, bullet points, and key takeaways.

### How to Use
1. Click **"Notes"** in the navbar
2. Click **"Select PDF File"** and choose your PDF
3. Verify filename appears below input
4. Click **"Generate Notes"** button
5. Wait for processing (shows spinner)
6. Generated notes appear in right panel
7. Click **"Download Notes"** to save as .txt file
8. Or click **"Copy"** to copy to clipboard
9. Upload another PDF or click **"Clear All"**

### Example Workflow
1. Upload: "Lecture_Slides.pdf"
2. Click "Generate Notes"
3. AI creates well-formatted notes
4. Download as "notes_Lecture_Slides_2024-01-30.txt"
5. Share with classmates or study offline

### Generated Notes Include
- Clear section headings
- Bullet points for key concepts
- Important definitions
- Summary points
- Logical flow and structure

### Technical Details
- Uses **pdf-parse** for PDF extraction
- Sends text to Groq API for processing
- Prompt optimized for academic note-taking
- Notes stored in MongoDB (if connected)
- Typical processing time: 5-15 seconds
- Quality depends on PDF text quality

### Code Location
- **Frontend**: `src/Components/notes/NotesGenerator.jsx`
- **Backend API**: `backend/server.js` (route: `/api/notes/generate`)
- **Service**: `src/services/notesApi.js`

### Features
✓ PDF to notes conversion
✓ AI-powered summarization
✓ Download functionality
✓ Copy to clipboard
✓ Multiple file formats support
✓ Progress indication
✓ Error handling
✓ File validation

### File Requirements
- PDF format (.pdf)
- Selectable text (not scanned)
- Max 10MB size
- Clear, readable content
- Better quality = better notes

---

## 4. 🔐 User Authentication

### What It Does
Secure login and registration system to personalize the learning experience and save progress.

### How to Use

#### Logging In
1. Click **"Login"** in navbar
2. Enter email and password
3. Click **"Sign in"**
4. Redirected to home page if successful
5. Username appears in navbar

#### Registering New Account
1. Click **"Register"** link on login page
2. Enter username
3. Enter email
4. Enter password
5. Confirm password
6. Click **"Sign up"**
7. Account created and logged in

#### Logging Out
1. Click **"Logout"** button in navbar
2. All localStorage data cleared
3. Returned to home page

### Default Test Account
For immediate testing without registration:

```
Email: admin@edumentor.com
Password: admin123
```

### Technical Details
- Uses **JWT** (JSON Web Tokens) for authentication
- Passwords hashed with **bcryptjs**
- Tokens stored in localStorage
- Token valid for 7 days
- Optional MongoDB for user storage
- Without MongoDB: only default login works
- With MongoDB: users can register and login

### Code Location
- **Frontend**: `src/Components/Auth/Login.jsx`, `Register.jsx`
- **Backend API**: `backend/server.js` (routes: `/api/auth/*`)
- **Service**: `src/services/authApi.js`

### Features
✓ User registration
✓ Secure login
✓ Password hashing
✓ JWT tokens
✓ Session persistence
✓ Default test account
✓ Error handling

### Database Support
**Without MongoDB:**
- Only default login works
- No user persistence
- Perfect for testing

**With MongoDB:**
- Users can register
- Custom accounts
- Profile persistence
- Chat history saved
- Notes saved

---

## 🔄 How Features Work Together

### User Journey
```
1. Login/Register (Auth)
   ↓
2. Browse Home Page
   ↓
3. Choose Feature:
   - Ask AI Tutor questions
   - Upload PDF for RAG Chat
   - Generate Notes from PDF
   ↓
4. All conversations/notes saved (if MongoDB enabled)
```

### Data Flow Example
```
User uploads PDF for RAG Chat
    ↓
File sent to backend
    ↓
multer saves file temporarily
    ↓
pdf-parse extracts text
    ↓
Text sent to Groq API with user question
    ↓
AI generates answer
    ↓
File deleted from uploads/
    ↓
Response displayed to user
```

---

## 🎯 When to Use Each Feature

### Use AI Tutor When You Need To:
- Get explanations for concepts
- Ask homework questions
- Learn something new
- Clarify confusing topics
- Get study tips
- Practice explaining concepts

### Use RAG Chat When You Need To:
- Ask questions about specific documents
- Find information in textbooks
- Study from uploaded materials
- Get contextual answers
- Discuss document content

### Use Notes Generator When You Need To:
- Convert rough notes to clean notes
- Summarize lecture slides
- Create study materials
- Prepare for exams
- Organize information

### Use Authentication When You Need To:
- Save your progress
- Keep conversation history
- Access multiple devices
- Share your account
- Personalize experience

---

## 📊 API Endpoints Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| POST | `/api/tutor/chat` | AI Tutor chat |
| POST | `/api/rag/chat` | RAG Chat (with PDF) |
| POST | `/api/notes/generate` | Generate notes from PDF |
| GET | `/api/notes` | Get saved notes |
| GET | `/api/chat/sessions` | Get chat sessions |
| GET | `/api/chat/messages/:id` | Get session messages |
| GET | `/api/health` | Server status |

---

## 💡 Tips for Best Results

### AI Tutor
- Ask specific questions
- Provide context if needed
- Ask follow-up questions
- Request explanations in your level

### RAG Chat
- Upload clear, readable PDFs
- Ask questions about document content
- Upload academic materials (textbooks, notes)
- One topic per PDF for best results

### Notes Generator
- Upload lecture slides or textbooks
- Avoid scanned images
- Prefer documents with clear structure
- Wait for full processing

### Authentication
- Remember your credentials
- Logout on shared computers
- Keep password secure
- Use unique passwords

---

## 🔧 Customization Options

### Change AI Model
Edit `backend/server.js`:
```javascript
// Currently uses: 'llama-3.3-70b-versatile'
// Can change to other Groq models
```

### Modify System Prompts
Edit the `role: 'system'` messages in `backend/server.js` to customize AI behavior.

### Change UI Colors
Edit Tailwind classes in component files:
- `bg-blue-600` → change color
- `text-white` → change text color
- `px-4 py-2` → change padding

### Add Features
- Extend `/api` routes in `backend/server.js`
- Create new components in `src/Components/`
- Add new services in `src/services/`

---

## 📈 Performance Tips

- Keep PDFs under 10MB
- Clear old chat histories
- Use specific questions
- Upload readable documents
- Keep browser cache clean

---

**All features working correctly! Happy learning! 🎉**
