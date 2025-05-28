import { Request, Response } from 'express';
import QnA, { IQnA } from '../models/QnA';
import { inMemoryData } from '../config/db';

// Sample responses for different types of queries
const queryResponses: Record<string, string[]> = {
  skills: [
    "I am proficient in React, Node.js, TypeScript, and MongoDB.",
    "I have experience with frontend frameworks like React and Vue.js.",
    "My backend skills include Node.js, Express, and database technologies like MongoDB and PostgreSQL."
  ],
  experience: [
    "I have 5+ years of experience in full-stack development.",
    "I've worked with companies like Tech Solutions Inc. and Digital Innovations.",
    "I started my career as a frontend developer before expanding to full-stack development."
  ],
  education: [
    "I have a Bachelor's degree in Computer Science.",
    "I've completed various certifications in web development and cloud technologies.",
    "I regularly participate in online courses to stay updated with the latest technologies."
  ],
  projects: [
    "I've built e-commerce platforms, task management applications, and portfolio websites.",
    "One of my notable projects is an e-commerce platform with full payment processing capabilities.",
    "I enjoy building applications that solve real-world problems."
  ],
  contact: [
    "You can reach me at your.email@example.com.",
    "Feel free to connect with me on LinkedIn or GitHub.",
    "I'm currently based in San Francisco, CA."
  ]
};

// Default responses for general queries
const defaultResponses = [
  "I'm a full-stack developer with a passion for creating beautiful and functional web applications.",
  "My portfolio showcases my skills in web development and design.",
  "I specialize in JavaScript/TypeScript ecosystems, with expertise in React, Node.js, and various database technologies."
];

// Define the result interface
interface QueryResult {
  text: string;
  source?: string;
}

export const handleQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body;
    
    if (!query || typeof query !== 'string') {
      res.status(400).json({ 
        success: false, 
        message: 'Query is required and must be a string' 
      });
      return;
    }
    
    // Try to find answers from QnA collection first
    let results: QueryResult[] = [];
    
    // Check if we have QnA documents in MongoDB
    try {
      // First try with in-memory data for faster responses
      if (inMemoryData.qna.length > 0) {
        // Simple text search in memory
        const matchingQnAs = inMemoryData.qna.filter(qna => {
          const qnaDoc = qna.toObject() as IQnA;
          return qnaDoc.question.toLowerCase().includes(query.toLowerCase()) || 
            qnaDoc.answer.toLowerCase().includes(query.toLowerCase()) ||
            qnaDoc.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()));
        });
        
        if (matchingQnAs.length > 0) {
          results = matchingQnAs.map(qna => {
            const qnaDoc = qna.toObject() as IQnA;
            return {
              text: qnaDoc.answer,
              source: qnaDoc.question
            };
          });
        }
      } 
      
      // If no results from in-memory search, try MongoDB text search
      if (results.length === 0) {
        const qnas = await QnA.find(
          { $text: { $search: query } },
          { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });
        
        if (qnas.length > 0) {
          results = qnas.map(qna => ({
            text: qna.answer,
            source: qna.question
          }));
        }
      }
    } catch (err) {
      console.error('QnA search error:', err);
      // Continue to fallback if there's an error with QnA search
    }
    
    // If no results from QnA, use fallback responses
    if (results.length === 0) {
      const lowerQuery = query.toLowerCase();
      let relevantResponses: string[] = [];
      
      // Check for keywords in the query
      Object.entries(queryResponses).forEach(([keyword, responses]) => {
        if (lowerQuery.includes(keyword)) {
          relevantResponses = [...relevantResponses, ...responses];
        }
      });
      
      // If still no specific responses found, use default responses
      if (relevantResponses.length === 0) {
        relevantResponses = defaultResponses;
      }
      
      // Format the fallback responses
      results = relevantResponses.map(text => ({ text }));
    }
    
    // Simulate a short delay to make the response feel more natural
    setTimeout(() => {
      res.status(200).json({
        success: true,
        query,
        results
      });
    }, 300);
    
  } catch (error) {
    console.error('Error handling query:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while processing query' 
    });
  }
}; 