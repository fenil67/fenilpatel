import express from 'express';
import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} from '../controllers/experienceController';

const router = express.Router();

// GET /api/experiences
router.get('/', getExperiences);

// GET /api/experiences/:id
router.get('/:id', getExperienceById);

// POST /api/experiences
router.post('/', createExperience);

// PUT /api/experiences/:id
router.put('/:id', updateExperience);

// DELETE /api/experiences/:id
router.delete('/:id', deleteExperience);

export default router; 