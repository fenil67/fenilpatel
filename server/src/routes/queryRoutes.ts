import express from 'express';
import { handleQuery } from '../controllers/queryController';

const router = express.Router();

// Route for handling general queries
router.post('/', handleQuery);

export default router; 