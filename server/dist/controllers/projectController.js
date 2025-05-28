"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getFeaturedProjects = exports.getProjects = void 0;
const Project_1 = __importDefault(require("../models/Project"));
// Get all projects
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
});
exports.getProjects = getProjects;
// Get featured projects
const getFeaturedProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_1.default.find({ featured: true }).sort({ createdAt: -1 });
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching featured projects', error });
    }
});
exports.getFeaturedProjects = getFeaturedProjects;
// Get a single project
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findById(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching project', error });
    }
});
exports.getProjectById = getProjectById;
// Create a new project
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = new Project_1.default(req.body);
        const savedProject = yield project.save();
        res.status(201).json(savedProject);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
});
exports.createProject = createProject;
// Update a project
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
});
exports.updateProject = updateProject;
// Delete a project
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findByIdAndDelete(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.status(200).json({ message: 'Project deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
});
exports.deleteProject = deleteProject;
