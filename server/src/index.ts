import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB, loadDataIntoMemory } from './config/db';
import projectRoutes from './routes/projectRoutes';
import experienceRoutes from './routes/experienceRoutes';
import skillRoutes from './routes/skillRoutes';
import qnaRoutes from './routes/qnaRoutes';
import queryRoutes from './routes/queryRoutes';
import messageRoutes from './routes/messageRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();
const PORT = process.env.PORT || 5002;

// CORS configuration - MUST be before other middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // frontend URLs
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(morgan('dev'));

// Serve static files from the public directory
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running' });
});

// Route to download resume
app.get('/resume.pdf', (req: Request, res: Response) => {
  // Fix path for production environment
  const resumePath = path.resolve(__dirname, '../public/assets/Resume_Fenil_Patel.pdf');
  console.log('Resume path:', resumePath);
  console.log('File exists:', require('fs').existsSync(resumePath));
  res.sendFile(resumePath, (err) => {
    if (err) {
      console.error('Error sending resume file:', err);
      res.status(404).send('Resume file not found');
    }
  });
});

// Direct resume download for testing
app.get('/download-resume', (req: Request, res: Response) => {
  // Fix path for production environment
  const resumePath = path.resolve(__dirname, '../public/assets/Resume_Fenil_Patel.pdf');
  res.download(resumePath, 'Resume_Fenil_Patel.pdf', (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

// Import routes
console.log('Registering routes...');

console.log('Registering projectRoutes');
app.use('/api/projects', projectRoutes);

console.log('Registering experienceRoutes');
app.use('/api/experiences', experienceRoutes);

console.log('Registering skillRoutes');
app.use('/api/skills', skillRoutes);

console.log('Registering qnaRoutes');
app.use('/api/qna', qnaRoutes);

console.log('Registering queryRoutes');
app.use('/api/query', queryRoutes);

console.log('Registering messageRoutes');
app.use('/api/messages', messageRoutes);

console.log('All routes registered successfully');

// Production setup
if (process.env.NODE_ENV === 'production') {
  console.log('Setting up production mode');
  
  // Set static folder
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req: Request, res: Response) => {
    console.log(`Catch-all route hit: ${req.originalUrl}`);
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
  
  console.log('Production setup complete');
}

// Start server
connectDB().then(() => {
  // Load data into memory once connected to MongoDB
  loadDataIntoMemory().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}); 
