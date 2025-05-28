import { Request, Response } from 'express';
import Skill, { ISkill } from '../models/Skill';
import { inMemoryData } from '../config/db';

// Get all skills
export const getSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get skill by ID
export const getSkillById = async (req: Request, res: Response): Promise<void> => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      res.status(404).json({ message: 'Skill not found' });
      return;
    }
    
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create new skill
export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const skill = new Skill(req.body);
    const savedSkill = await skill.save();
    
    // Update in-memory data
    inMemoryData.skills = await Skill.find().sort({ order: 1 });
    
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update skill
export const updateSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      res.status(404).json({ message: 'Skill not found' });
      return;
    }
    
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    // Update in-memory data
    inMemoryData.skills = await Skill.find().sort({ order: 1 });
    
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete skill
export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      res.status(404).json({ message: 'Skill not found' });
      return;
    }
    
    await Skill.findByIdAndDelete(req.params.id);
    
    // Update in-memory data
    inMemoryData.skills = await Skill.find().sort({ order: 1 });
    
    res.status(200).json({ message: 'Skill removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
}; 