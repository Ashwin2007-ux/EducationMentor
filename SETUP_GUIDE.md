# 🚀 EduMentor - Complete Setup Guide

## ⚡ Quick Start (5 Minutes)

### 1. Get GROQ API Key (1 minute)
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up for free
3. Create an API key
4. **Save it** - you'll need it in step 3

### 2. Setup Backend

```bash
# Open Terminal/Command Prompt
cd backend
npm install
```

### 3. Create `.env` file in `backend/` folder

Create a file named `.env` in the `backend` folder with these contents:

```env
PORT=5000
GROQ_API_KEY=your_api_key_here
JWT_SECRET=edumentor-secret-key-2024
MONGODB_URI=mongodb://localhost:27017/edumentor
```

Replace `your_api_key_here` with your actual GROQ API key.

### 4. Setup Frontend

```bash
# Open new Terminal/Command Prompt
# Go to project root (where you see package.json)
npm install
```

### 5. Create `.env` file in project root

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 6. Start Backend

```bash
cd backend
npm run dev
```

You should see:
```
✓ EduMentor Backend server running on port 5000
```

### 7. Start Frontend (Open NEW Terminal)

```bash
npm run dev
```

You should see:
```
VITE v7.x.x  ready in xxx ms
Local: http://localhost:5173/
```

### 8. Open in Browser

Go to: **http://localhost:5173/**

### 9. Login with Default Credentials

```
Email: admin@edumentor.com
Password: admin123
```

✅ **Done! All 4 features are ready to use!**

---

## 📋 Testing Checklist

### Feature 1: AI Tutor Chatbot ✓
- [ ] Click "AI Tutor" button
- [ ] Type a question: "Explain gravity"
- [ ] Click "Send"
- [ ] You should see AI response

### Feature 2: RAG Chatbot (Document Q&A) ✓
- [ ] Click "RAG Chat" button
- [ ] Click "Choose File"
- [ ] Upload any PDF file
- [ ] Type a question about the PDF
- [ ] Click "Send"
- [ ] You should get answer based on PDF content

### Feature 3: Notes Generator ✓
- [ ] Click "Notes" button
- [ ] Click "Select PDF File"
- [ ] Upload a PDF
- [ ] Click "Generate Notes"
- [ ] Wait for processing
- [ ] Download or copy the generated notes

### Feature 4: Authentication ✓
- [ ] Login with default credentials
- [ ] See username in navbar
- [ ] Click "Logout"
- [ ] Verify you're logged out

---

## 🔧 Troubleshooting

### Problem: "Cannot find module" error in backend

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problem: Backend won't start (Port 5000 in use)

**Solution:**
```bash
# Change port in backend/.env
PORT=5001

# Or kill the process (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Problem: Frontend shows "Cannot connect to API"

**Check:**
1. Is backend running? (http://localhost:5000/api/health should work)
2. Is VITE_API_BASE_URL correct in .env?
3. Restart frontend: `npm run dev`

### Problem: GROQ API error

**Check:**
1. API key is valid and in .env
2. You have API quota remaining
3. Internet connection is working

### Problem: PDF upload fails

**Solution:**
- File must be actual PDF (not image)
- File size < 10MB
- PDF must have selectable text (not scanned image)

---

## 📁 Project Structure Quick Reference

```
EduMentor/
├── backend/
│   ├── server.js           ← All API routes here
│   ├── models.js           ← Database schemas
│   └── package.json
├── src/
│   ├── Components/
│   │   ├── Chat/
│   │   │   ├── AITutorChat.jsx     ← Feature 1
│   │   │   └── RagChat.jsx         ← Feature 2
│   │   ├── notes/
│   │   │   └── NotesGenerator.jsx  ← Feature 3
│   │   ├── Auth/
│   │   │   ├── Login.jsx           ← Feature 4
│   │   │   └── Register.jsx
│   │   ├── Home.jsx
│   │   └── NavBar.jsx
│   ├── services/
│   │   ├── tutorApi.js
│   │   ├── ragApi.js
│   │   ├── notesApi.js
│   │   └── authApi.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── .env
└── README.md
```

---

## 🌍 Environment Variables Explained

### Backend (.env)
| Variable | Purpose | Example |
|----------|---------|---------|
| PORT | Backend server port | 5000 |
| GROQ_API_KEY | AI service API key | gsk_xxxx... |
| JWT_SECRET | Password encryption key | any-secret-string |
| MONGODB_URI | Database connection | mongodb://localhost... |

### Frontend (.env)
| Variable | Purpose | Example |
|----------|---------|---------|
| VITE_API_BASE_URL | Backend API address | http://localhost:5000/api |

---

## 🎯 How Each Feature Works

### 1. AI Tutor Chatbot
```
User Question → Express Backend → Groq API → AI Response → Display
```
- No files needed
- Maintains conversation history
- Works without MongoDB

### 2. RAG Chatbot
```
User uploads PDF → Extract text → Send with question → Groq API → Answer based on PDF → Display
```
- Temporary file storage in `/backend/uploads/`
- Files deleted after processing
- Works without MongoDB

### 3. Notes Generator
```
User uploads PDF → Extract text → Send to Groq → Generate notes → Display + Download
```
- Processes PDF documents
- Creates formatted notes
- Download as .txt file
- Works without MongoDB

### 4. Authentication
```
User credentials → Hash password → Verify → Generate JWT → Store in localStorage
```
- Default user: admin@edumentor.com / admin123
- Optional MongoDB for real user storage
- JWT tokens valid for 7 days

---

## 💾 Optional: Enable MongoDB

If you want to save user data persistently:

### Install MongoDB Locally
- Windows: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
- Mac: `brew install mongodb-community`
- Linux: Follow official MongoDB docs

### Start MongoDB
```bash
# Windows
net start MongoDB

# Mac/Linux
mongod
```

### Update backend/.env
```env
MONGODB_URI=mongodb://localhost:27017/edumentor
```

Now:
- User registrations are saved
- Chat histories are saved
- Notes are saved to database
- User can login with custom credentials

---

## 📚 Learning Resources

### Understanding the Code
- **Frontend**: Modern React with Hooks (useState, useEffect)
- **Backend**: Express.js REST API
- **Styling**: Tailwind CSS
- **Database**: MongoDB + Mongoose (optional)
- **AI**: Groq API (LLaMA 3.3 model)

### Files to Study
1. `backend/server.js` - All API logic
2. `src/App.jsx` - Main app routing
3. `src/services/` - API integration
4. `src/Components/` - UI components

---

## ❓ Common Questions

**Q: Do I need MongoDB to run the app?**
A: No! It works great without it. Use default login for testing.

**Q: Can I use a different AI service?**
A: Yes! Replace Groq API calls in `backend/server.js` with any other LLM API.

**Q: How do I deploy this?**
A: See README.md for deployment instructions.

**Q: Can I modify the UI?**
A: Absolutely! All CSS is in Tailwind classes - easy to customize.

**Q: Is this production-ready?**
A: It's a great learning project. For production, add:
- Rate limiting
- Input validation
- Error logging
- User permissions
- Database backups

---

## 🆘 Still Stuck?

1. Check that Node.js is installed: `node --version`
2. Check that npm is installed: `npm --version`
3. Verify both terminals are running (backend on 5000, frontend on 5173)
4. Check browser console (F12) for frontend errors
5. Check terminal for backend errors

**If backend won't start:**
```bash
npm install -g npm@latest
cd backend
rm -rf node_modules
npm install
npm run dev
```

**If frontend won't start:**
```bash
rm -rf node_modules
npm install
npm run dev
```

---

## 📞 Support

- Check README.md for detailed documentation
- Read code comments - they explain how everything works
- Check the browser console (F12) for errors
- Verify .env files are correct

**Happy Learning! 🎉**
