import { Request, Response } from 'express';
import Message, { IMessage } from '../models/Message';

// Get all messages (admin functionality)
export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching messages', 
      error 
    });
  }
};

// Submit a new message
export const submitMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
      return;
    }

    // Create and save new message
    const newMessage = new Message({
      name,
      email,
      subject,
      message
    });

    const savedMessage = await newMessage.save();
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: savedMessage
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error sending message', 
      error 
    });
  }
}; 