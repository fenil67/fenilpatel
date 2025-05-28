import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';

// Load environment variables
dotenv.config();

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, shopping cart, and payment processing.',
    imageUrl: 'https://via.placeholder.com/800x600?text=E-Commerce+Platform',
    projectUrl: 'https://example.com/ecommerce',
    githubUrl: 'https://github.com/username/ecommerce',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    featured: true
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team workspace.',
    imageUrl: 'https://via.placeholder.com/800x600?text=Task+Management',
    projectUrl: 'https://example.com/taskmanager',
    githubUrl: 'https://github.com/username/taskmanager',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    featured: true
  },
  {
    title: 'Weather Dashboard',
    description: 'A weather dashboard that displays current conditions and forecasts for multiple locations.',
    imageUrl: 'https://via.placeholder.com/800x600?text=Weather+App',
    projectUrl: 'https://example.com/weather',
    githubUrl: 'https://github.com/username/weather',
    technologies: ['React', 'OpenWeather API', 'Chart.js'],
    featured: false
  },
  {
    title: 'Recipe Finder',
    description: 'An application that helps users find recipes based on ingredients they have on hand.',
    imageUrl: 'https://via.placeholder.com/800x600?text=Recipe+Finder',
    projectUrl: 'https://example.com/recipes',
    githubUrl: 'https://github.com/username/recipes',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Edamam API'],
    featured: false
  },
  {
    title: 'Fitness Tracker',
    description: 'A fitness tracking application that allows users to record and analyze their workouts.',
    imageUrl: 'https://via.placeholder.com/800x600?text=Fitness+Tracker',
    projectUrl: 'https://example.com/fitness',
    githubUrl: 'https://github.com/username/fitness',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    featured: true
  },
  {
    title: 'Movie Database',
    description: 'A movie database application that allows users to browse, search, and review movies.',
    imageUrl: 'https://via.placeholder.com/800x600?text=Movie+Database',
    projectUrl: 'https://example.com/movies',
    githubUrl: 'https://github.com/username/movies',
    technologies: ['React', 'TMDB API', 'CSS'],
    featured: false
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(async () => {
    console.log('MongoDB connected for seeding');
    
    try {
      // Delete existing projects
      await Project.deleteMany({});
      console.log('Existing projects deleted');
      
      // Insert new projects
      const createdProjects = await Project.insertMany(sampleProjects);
      console.log(`${createdProjects.length} projects inserted`);
      
      // Close database connection
      await mongoose.connection.close();
      console.log('Database connection closed');
      
      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 