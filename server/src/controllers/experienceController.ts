import { Request, Response } from 'express';
import Experience, { IExperience } from '../models/Experience';
import { inMemoryData } from '../config/db';

// Get all experiences
export const getExperiences = async (req: Request, res: Response): Promise<void> => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get experience by ID
export const getExperienceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      res.status(404).json({ message: 'Experience not found' });
      return;
    }
    
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create new experience
export const createExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const experience = new Experience(req.body);
    const savedExperience = await experience.save();
    
    // Update in-memory data
    inMemoryData.experiences = await Experience.find().sort({ order: 1 });
    
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update experience
export const updateExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      res.status(404).json({ message: 'Experience not found' });
      return;
    }
    
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    // Update in-memory data
    inMemoryData.experiences = await Experience.find().sort({ order: 1 });
    
    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete experience
export const deleteExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      res.status(404).json({ message: 'Experience not found' });
      return;
    }
    
    await Experience.findByIdAndDelete(req.params.id);
    
    // Update in-memory data
    inMemoryData.experiences = await Experience.find().sort({ order: 1 });
    
    res.status(200).json({ message: 'Experience removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
}; 