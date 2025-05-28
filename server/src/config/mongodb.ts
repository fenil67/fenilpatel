import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB options for better connection handling
export const mongoOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true
};

// MongoDB URI - use Atlas in production, local in development
export const MONGODB_URI = process.env.NODE_ENV === 'production' 
  ? 'mongodb+srv://pfenil286:CNe8IwrGRa6dS3kD@cluster0.8gwdtvw.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0'
  : process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'; 