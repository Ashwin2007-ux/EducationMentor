import express from 'express';
import multer from 'multer';
import { generateNotes, saveNotes, getSavedNotes, deleteNote, updateNote } from '../controllers/notesController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/generate', optionalAuth, upload.single('file'), generateNotes);
router.post('/save', optionalAuth, saveNotes);
router.get('/saved', optionalAuth, getSavedNotes);
router.delete('/:noteId', optionalAuth, deleteNote);
router.put('/:noteId', optionalAuth, updateNote);

export default router;
