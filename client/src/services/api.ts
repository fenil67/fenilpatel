import axios from 'axios';
import env from '../config/env';

const API_URL = env.API_URL;

// Debug - log the API URL
console.log('Using API URL:', API_URL);

// Define types for backend data
export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
}

export interface Experience {
  _id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  order: number;
}

export interface Skill {
  _id: string;
  title: string;
  icon: string;
  skills: string[];
  order: number;
}

export interface QueryResult {
  text: string;
  source?: string;
}

export interface QueryResponse {
  success: boolean;
  query: string;
  results: QueryResult[];
}

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const apiService = {
  // Projects
  getProjects: async (): Promise<Project[]> => {
    try {
      const response = await api.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Experiences
  getExperiences: async (): Promise<Experience[]> => {
    try {
      const response = await api.get('/experiences');
      return response.data;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },

  // Skills
  getSkills: async (): Promise<Skill[]> => {
    try {
      const response = await api.get('/skills');
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  },

  // Query
  sendQuery: async (query: string): Promise<QueryResponse> => {
    try {
      const response = await api.post('/query', { query });
      return response.data;
    } catch (error) {
      console.error('Error sending query:', error);
      throw error;
    }
  },
  
  // Submit contact message
  submitMessage: async (messageData: { name: string; email: string; subject: string; message: string; }): Promise<any> => {
    try {
      const response = await api.post('/messages', messageData);
      return response.data;
    } catch (error) {
      console.error('Error submitting message:', error);
      throw error;
    }
  }
}; 