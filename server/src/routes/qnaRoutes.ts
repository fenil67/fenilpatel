import express from 'express';
import {
  getQnAs,
  getQnAById,
  createQnA,
  updateQnA,
  deleteQnA,
  searchQnAs
} from '../controllers/qnaController';

const router = express.Router();

// GET /api/qna
router.get('/', getQnAs);

// POST /api/qna
router.post('/', createQnA);

// POST /api/qna/search - specific route must come BEFORE parameter routes
router.post('/search', searchQnAs);

// GET /api/qna/:id
router.get('/:id', getQnAById);

// PUT /api/qna/:id
router.put('/:id', updateQnA);

// DELETE /api/qna/:id
router.delete('/:id', deleteQnA);

export default router; 