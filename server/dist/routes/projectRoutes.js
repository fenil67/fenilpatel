"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const router = express_1.default.Router();
// Get all projects and create a new project
router.route('/')
    .get(projectController_1.getProjects)
    .post(projectController_1.createProject);
// Get featured projects
router.get('/featured', projectController_1.getFeaturedProjects);
// Get, update and delete a project by id
router.route('/:id')
    .get(projectController_1.getProjectById)
    .put(projectController_1.updateProject)
    .delete(projectController_1.deleteProject);
exports.default = router;
