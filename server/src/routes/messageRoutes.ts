import express from 'express';
import { getMessages, submitMessage } from '../controllers/messageController';

const router = express.Router();

// Get all messages (admin route)
router.get('/', getMessages);

// Submit a new message
router.post('/', submitMessage);

export default router; 