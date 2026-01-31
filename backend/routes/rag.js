import express from 'express';
import multer from 'multer';
import { uploadDocument, queryDocument, getDocuments, deleteDocument, getQuiz } from '../controllers/ragController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/upload', optionalAuth, upload.single('file'), uploadDocument);
router.post('/query', optionalAuth, queryDocument);
router.get('/documents', optionalAuth, getDocuments);
router.delete('/:documentId', optionalAuth, deleteDocument);
router.get('/quiz/:documentId', optionalAuth, getQuiz);

export default router;
