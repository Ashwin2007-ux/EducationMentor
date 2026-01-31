import express from 'express';
import { askQuestion, getChatHistory, clearHistory } from '../controllers/tutorController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/ask', optionalAuth, askQuestion);
router.get('/history', optionalAuth, getChatHistory);
router.delete('/clear', optionalAuth, clearHistory);

export default router;
