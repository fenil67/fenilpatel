import express from 'express';
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController';

const router = express.Router();

// GET /api/skills
router.get('/', getSkills);

// GET /api/skills/:id
router.get('/:id', getSkillById);

// POST /api/skills
router.post('/', createSkill);

// PUT /api/skills/:id
router.put('/:id', updateSkill);

// DELETE /api/skills/:id
router.delete('/:id', deleteSkill);

export default router; 