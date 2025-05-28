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

// GET /api/qna/:id
router.get('/:id', getQnAById);

// POST /api/qna
router.post('/', createQnA);

// PUT /api/qna/:id
router.put('/:id', updateQnA);

// DELETE /api/qna/:id
router.delete('/:id', deleteQnA);

// POST /api/qna/search
router.post('/search', searchQnAs);

export default router; 