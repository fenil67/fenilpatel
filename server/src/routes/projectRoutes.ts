import express from 'express';
import {
  getProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController';

const router = express.Router();

// Get all projects and create a new project
router.route('/')
  .get(getProjects)
  .post(createProject);

// Get featured projects
router.get('/featured', getFeaturedProjects);

// Get, update and delete a project by id
router.route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

export default router; 