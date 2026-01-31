# ✅ EduMentor - Final Startup Checklist

## Pre-Startup Verification

Before you run the application, verify these files are in place:

### Root Folder Files
- [x] `package.json` - Frontend dependencies
- [x] `vite.config.js` - Vite configuration
- [x] `.env` - Frontend environment variables
- [x] `README.md` - Full documentation
- [x] `SETUP_GUIDE.md` - Setup instructions
- [x] `FEATURES.md` - Feature documentation
- [x] `SUMMARY.md` - Project overview
- [x] `TODO.md` - Project status

### Backend Folder (`backend/`)
- [x] `server.js` - Express server with all routes
- [x] `models.js` - MongoDB schemas
- [x] `package.json` - Backend dependencies
- [x] `.env` - Backend environment variables (create this!)

### Frontend Folder (`src/`)
- [x] `App.jsx` - Main app component
- [x] `main.jsx` - React entry point
- [x] `Components/` - All UI components
  - [x] `Chat/AITutorChat.jsx`
  - [x] `Chat/RagChat.jsx`
  - [x] `notes/NotesGenerator.jsx`
  - [x] `Auth/Login.jsx`
  - [x] `Auth/Register.jsx`
- [x] `services/` - API integration
  - [x] `tutorApi.js`
  - [x] `ragApi.js`
  - [x] `notesApi.js`
  - [x] `authApi.js`
  - [x] `apiClient.js`

---

## Step-by-Step Startup

### ✅ Step 1: Get GROQ API Key
- [ ] Go to https://console.groq.com
- [ ] Sign up (free account)
- [ ] Create API key
- [ ] Copy the key: `gsk_xxxxxxxxxxxx...`
- [ ] Save it somewhere (you'll need it in Step 3)

### ✅ Step 2: Install Dependencies

#### Backend Dependencies
```bash
cd backend
npm install
```
Wait for completion. Should see:
```
added XXX packages in Xs
```

#### Frontend Dependencies
```bash
# Go back to root folder
cd ..
npm install
```
Wait for completion.

### ✅ Step 3: Create Backend .env File

**Create file**: `backend/.env`

**Contents**:
```env
PORT=5000
GROQ_API_KEY=gsk_xxxxxxxxxxxx
JWT_SECRET=edumentor-secret-key-2024
MONGODB_URI=mongodb://localhost:27017/edumentor
```

Replace `gsk_xxxxxxxxxxxx` with your actual API key from Step 1.

### ✅ Step 4: Verify Frontend .env File

**File**: `.env` (in project root)

**Should contain**:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

If missing, create it with the above content.

### ✅ Step 5: Start Backend Server

**Terminal 1:**
```bash
cd backend
npm run dev
```

**Expected Output**:
```
✓ EduMentor Backend server running on port 5000
✓ Health check endpoint: http://localhost:5000/api/health
ℹ️  Running without MongoDB - using default login
```

**✅ Verify Backend is Running**:
1. Open browser
2. Go to: http://localhost:5000/api/health
3. Should show JSON with status

**If backend doesn't start**:
- Check that Node.js is installed: `node --version`
- Check npm is updated: `npm --version`
- Try: `cd backend && npm install && npm run dev`

### ✅ Step 6: Start Frontend Server

**Terminal 2** (Keep Terminal 1 running!):
```bash
npm run dev
```

**Expected Output**:
```
VITE v7.x.x  ready in xxx ms

> Local:   http://localhost:5173/
> press h to show help
```

**Do NOT close Terminal 1!** Both servers must run together.

### ✅ Step 7: Open Application

1. Open web browser
2. Go to: **http://localhost:5173/**
3. You should see EduMentor home page

### ✅ Step 8: Login

**Default Credentials**:
```
Email: admin@edumentor.com
Password: admin123
```

Click "Sign in" → Welcome page appears ✅

---

## 🧪 Quick Feature Test

After login, verify all 4 features work:

### Test 1: AI Tutor
- [ ] Click "AI Tutor" in navbar
- [ ] Type: "What is gravity?"
- [ ] Click "Send"
- [ ] Wait 2-5 seconds
- [ ] AI responds with explanation ✅

### Test 2: RAG Chat
- [ ] Click "RAG Chat" in navbar
- [ ] Click "Choose File"
- [ ] Select any PDF file from your computer
- [ ] Type a question about the PDF
- [ ] Click "Send"
- [ ] AI responds based on PDF content ✅

### Test 3: Notes Generator
- [ ] Click "Notes" in navbar
- [ ] Click "Select PDF File"
- [ ] Choose a PDF
- [ ] Click "Generate Notes"
- [ ] Wait for processing (shows spinner)
- [ ] Generated notes appear on right ✅
- [ ] Click "Download Notes" ✅
- [ ] File downloads to computer ✅

### Test 4: Authentication
- [ ] Verify username shows in navbar ✅
- [ ] Click "Logout" button
- [ ] Redirected to home page ✅
- [ ] Login button reappears ✅

---

## 🎯 Final Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Can open application in browser
- [ ] Can login with admin@edumentor.com
- [ ] AI Tutor responds to questions
- [ ] RAG Chat processes PDFs
- [ ] Notes Generator creates notes
- [ ] Can download generated notes
- [ ] Logout works
- [ ] All 4 features operational ✅

---

## 🔧 Common Issues & Fixes

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Fix**: Change PORT in `backend/.env` to `5001`

### Cannot Find Module
```
Error: Cannot find module 'express'
```
**Fix**: Run `npm install` in both root and backend folders

### API Connection Error
```
API Error: Cannot connect to backend
```
**Fix**: 
1. Verify backend is running
2. Check http://localhost:5000/api/health in browser
3. Verify VITE_API_BASE_URL in .env

### GROQ API Error
```
Error: Invalid API key
```
**Fix**: Verify GROQ_API_KEY in `backend/.env` is correct

### PDF Upload Error
```
Error: Only PDF files are allowed
```
**Fix**: 
- File must be .pdf format
- Not a scanned image
- Under 10MB size

---

## 🚀 You're All Set!

If all checks pass, you're ready to:
- ✅ Use AI Tutor for learning
- ✅ Ask questions about PDFs
- ✅ Generate study notes
- ✅ Manage your learning journey

---

## 📞 Need Help?

1. **Setup Issues**: Read `SETUP_GUIDE.md`
2. **Feature Questions**: Read `FEATURES.md`
3. **Project Details**: Read `README.md`
4. **Check Browser Console**: Press F12 for error details
5. **Check Terminal Output**: Look for error messages in both terminals

---

## 📝 Important Notes

⚠️ **Both terminals must stay open!**
- Terminal 1: Backend (port 5000)
- Terminal 2: Frontend (port 3173)

⚠️ **Without MongoDB:**
- Default login only works: admin@edumentor.com / admin123
- Data not saved between sessions
- Perfect for testing!

✅ **To Enable MongoDB:**
- Install MongoDB Community Edition
- Update MONGODB_URI in backend/.env
- Users can register and save data

---

## 🎉 Ready to Learn!

Your EduMentor application is fully set up and ready to use.

**Next Steps**:
1. Explore each feature
2. Try different questions
3. Upload various PDFs
4. Generate notes
5. Customize the code to learn more

**Happy Learning! 🚀**
