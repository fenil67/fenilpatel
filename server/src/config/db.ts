import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { IProject } from '../models/Project';
import { IExperience } from '../models/Experience';
import { ISkill } from '../models/Skill';
import { IQnA } from '../models/QnA';
import { MONGODB_URI, mongoOptions } from './mongodb';

dotenv.config();

// Define types for in-memory data
interface InMemoryData {
  projects: mongoose.Document<unknown, {}, IProject>[];
  experiences: mongoose.Document<unknown, {}, IExperience>[];
  skills: mongoose.Document<unknown, {}, ISkill>[];
  qna: mongoose.Document<unknown, {}, IQnA>[];
}

// Initialize in-memory data storage
export const inMemoryData: InMemoryData = {
  projects: [],
  experiences: [],
  skills: [],
  qna: []
};

// MongoDB Connection Function
export const connectDB = async (): Promise<void> => {
  try {
    // Get MongoDB URI from config
    const mongoUri = MONGODB_URI;
    
    if (!mongoUri) {
      console.error('MongoDB URI is not defined');
      process.exit(1);
    }
    
    const conn = await mongoose.connect(mongoUri, mongoOptions);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

// Function to load data into memory
export const loadDataIntoMemory = async (): Promise<void> => {
  try {
    // Import models
    const Project = require('../models/Project').default;
    const Experience = require('../models/Experience').default;
    const Skill = require('../models/Skill').default;
    const QnA = require('../models/QnA').default;
    
    // Load data from MongoDB
    const projects = await Project.find({});
    const experiences = await Experience.find({});
    const skills = await Skill.find({});
    const qna = await QnA.find({});
    
    // Store in memory
    inMemoryData.projects = projects;
    inMemoryData.experiences = experiences;
    inMemoryData.skills = skills;
    inMemoryData.qna = qna;
    
    console.log('Data loaded into memory successfully');
  } catch (error) {
    console.error(`Error loading data into memory: ${error}`);
  }
}; 