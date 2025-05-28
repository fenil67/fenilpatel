import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';
import Experience from '../models/Experience';
import Skill from '../models/Skill';
import QnA from '../models/QnA';

// Load environment variables
dotenv.config();

// Sample projects data
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

// Sample experiences data
const sampleExperiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Solutions Inc.',
    duration: 'Jan 2021 - Present',
    description: 'Led the development of a complex SaaS platform using React, Node.js, and MongoDB. Implemented CI/CD pipelines that reduced deployment time by 40%. Mentored junior developers and conducted code reviews to maintain code quality.',
    technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
    order: 1
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Innovations',
    duration: 'Mar 2019 - Dec 2020',
    description: 'Developed and maintained multiple client web applications. Collaborated with UX designers to implement responsive and accessible interfaces. Integrated third-party APIs and services to enhance application functionality.',
    technologies: ['JavaScript', 'React', 'Express', 'PostgreSQL', 'Docker'],
    order: 2
  },
  {
    title: 'Frontend Developer',
    company: 'Creative Web Studio',
    duration: 'Jun 2017 - Feb 2019',
    description: 'Built interactive UI components using React and Redux. Optimized web performance resulting in a 30% improvement in load times. Implemented responsive designs that work across various devices and browsers.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux'],
    order: 3
  },
  {
    title: 'Web Development Intern',
    company: 'StartUp Vision',
    duration: 'Jan 2017 - May 2017',
    description: 'Assisted in the development of company website and client projects. Learned modern web development practices and tools in a professional environment. Contributed to frontend features that improved user engagement.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    order: 4
  }
];

// Sample skills data
const sampleSkills = [
  {
    title: 'Frontend',
    icon: 'FiLayout',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'NextJS'],
    order: 1
  },
  {
    title: 'Backend',
    icon: 'FiServer',
    skills: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'GraphQL', 'Authentication', 'Authorization'],
    order: 2
  },
  {
    title: 'Databases',
    icon: 'FiDatabase',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Mongoose', 'TypeORM', 'SQL', 'NoSQL'],
    order: 3
  },
  {
    title: 'Programming',
    icon: 'FiCode',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'OOP', 'Functional Programming', 'Algorithms'],
    order: 4
  },
  {
    title: 'DevOps',
    icon: 'FiTool',
    skills: ['Git', 'GitHub', 'Docker', 'CI/CD', 'AWS', 'Azure', 'Linux', 'Bash'],
    order: 5
  },
  {
    title: 'Other',
    icon: 'FiLayers',
    skills: ['UI/UX Design', 'Figma', 'RESTful APIs', 'Testing', 'Agile', 'SCRUM', 'Project Management'],
    order: 6
  }
];

// Sample QnA data
const sampleQnAs = [
  {
    question: 'What technologies do you work with?',
    answer: 'I primarily work with React, Node.js, TypeScript, and MongoDB for full-stack development. I also have experience with other technologies like NextJS, GraphQL, PostgreSQL, and AWS.',
    tags: ['skills', 'technologies', 'stack']
  },
  {
    question: 'What is your professional experience?',
    answer: 'I have over 5 years of experience in web development, having worked with companies ranging from startups to established tech firms. My focus has been on full-stack development with JavaScript/TypeScript ecosystems.',
    tags: ['experience', 'work', 'professional']
  },
  {
    question: 'Tell me about your education',
    answer: 'I hold a Bachelor\'s degree in Computer Science and have completed various online courses and certifications in web development, cloud technologies, and software architecture.',
    tags: ['education', 'degree', 'learning']
  },
  {
    question: 'What are your best projects?',
    answer: 'Some of my best projects include an e-commerce platform with full payment processing, a task management application with real-time collaboration features, and a fitness tracking app with data visualization.',
    tags: ['projects', 'portfolio', 'work']
  },
  {
    question: 'How can I contact you?',
    answer: 'You can reach me via email at your.email@example.com, or connect with me on LinkedIn and GitHub. I\'m currently based in San Francisco, CA.',
    tags: ['contact', 'email', 'connect']
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});
    await QnA.deleteMany({});
    console.log('Existing data cleared');

    // Insert new data
    const projects = await Project.insertMany(sampleProjects);
    const experiences = await Experience.insertMany(sampleExperiences);
    const skills = await Skill.insertMany(sampleSkills);
    const qnas = await QnA.insertMany(sampleQnAs);

    console.log(`Seed data inserted:
      ${projects.length} projects
      ${experiences.length} experiences
      ${skills.length} skills
      ${qnas.length} QnAs
    `);

    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 