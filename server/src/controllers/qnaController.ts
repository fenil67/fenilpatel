import { Request, Response } from 'express';
import QnA, { IQnA } from '../models/QnA';
import { inMemoryData } from '../config/db';

// Get all QnAs
export const getQnAs = async (req: Request, res: Response): Promise<void> => {
  try {
    const qnas = await QnA.find();
    res.status(200).json(qnas);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get QnA by ID
export const getQnAById = async (req: Request, res: Response): Promise<void> => {
  try {
    const qna = await QnA.findById(req.params.id);
    
    if (!qna) {
      res.status(404).json({ message: 'QnA not found' });
      return;
    }
    
    res.status(200).json(qna);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Search QnAs
export const searchQnAs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body;
    
    if (!query) {
      res.status(400).json({ message: 'Query is required' });
      return;
    }
    
    const qnas = await QnA.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
    
    const results = qnas.map(qna => ({
      text: qna.answer,
      source: qna.question
    }));
    
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create new QnA
export const createQnA = async (req: Request, res: Response): Promise<void> => {
  try {
    const qna = new QnA(req.body);
    const savedQnA = await qna.save();
    
    // Update in-memory data
    inMemoryData.qna = await QnA.find();
    
    res.status(201).json(savedQnA);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update QnA
export const updateQnA = async (req: Request, res: Response): Promise<void> => {
  try {
    const qna = await QnA.findById(req.params.id);
    
    if (!qna) {
      res.status(404).json({ message: 'QnA not found' });
      return;
    }
    
    const updatedQnA = await QnA.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    // Update in-memory data
    inMemoryData.qna = await QnA.find();
    
    res.status(200).json(updatedQnA);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete QnA
export const deleteQnA = async (req: Request, res: Response): Promise<void> => {
  try {
    const qna = await QnA.findById(req.params.id);
    
    if (!qna) {
      res.status(404).json({ message: 'QnA not found' });
      return;
    }
    
    await QnA.findByIdAndDelete(req.params.id);
    
    // Update in-memory data
    inMemoryData.qna = await QnA.find();
    
    res.status(200).json({ message: 'QnA removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
}; 