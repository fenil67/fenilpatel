import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Skill from '../models/Skill';
import Experience from '../models/Experience';
import Project from '../models/Project';
import QnA from '../models/QnA';
import Message from '../models/Message';
import { mongoOptions } from '../config/mongodb';

// Atlas connection string - specific for direct seeding
const MONGODB_URI = 'mongodb+srv://pfenil286:CNe8IwrGRa6dS3kD@cluster0.8gwdtvw.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas and seed data
const seedAtlasDatabase = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, mongoOptions);
    console.log('MongoDB Atlas connected successfully for seeding');

    // Clear existing data
    console.log('Clearing existing data...');
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});
    await QnA.deleteMany({});
    await Message.deleteMany({});
    console.log('Existing data cleared');

    // Skills data
    const skills = [
      {
        title: 'Programming Languages',
        icon: 'FiCode',
        skills: ['Python', 'R', 'SAS', 'Java'],
        order: 1
      },
      {
        title: 'Libraries & Frameworks',
        icon: 'FiPackage',
        skills: ['NumPy', 'Pandas', 'NLTK', 'Scikit Learn', 'Matplotlib', 'Plotly'],
        order: 2
      },
      {
        title: 'Databases',
        icon: 'FiDatabase',
        skills: ['MySQL', 'SQL', 'MS SQL Server'],
        order: 3
      },
      {
        title: 'Machine Learning',
        icon: 'FiActivity',
        skills: [
          'Unsupervised Learning (Clustering, Recommendation Systems)',
          'Supervised Learning (Regression, Classification)'
        ],
        order: 4
      },
      {
        title: 'Cloud Platforms',
        icon: 'FiCloud',
        skills: ['AWS', 'Azure'],
        order: 5
      },
      {
        title: 'Operating Systems',
        icon: 'FiCpu',
        skills: ['Linux', 'Windows'],
        order: 6
      },
      {
        title: 'Tools & Technologies',
        icon: 'FiTool',
        skills: [
          'Tableau', 'Power BI', 'Looker',
          'PowerPoint', 'Excel', 'Word', 'Visio',
          'JIRA', 'Confluence', 'GitHub'
        ],
        order: 7
      },
      {
        title: 'Data Analytics & BI',
        icon: 'FiBarChart2',
        skills: [
          'Business Intelligence (BI)',
          'Data Analysis',
          'Data Visualization',
          'Probability',
          'Statistical Analysis',
          'Data Documentation'
        ],
        order: 8
      }
    ];

    // Experiences data
    const experiences = [
      {
        title: 'Software Developer Intern',
        company: 'Acodesoft Technologies',
        location: 'Gujarat, India',
        duration: 'Jan 2023 – Apr 2023',
        description: 'Wrote efficient Python code for data management apps (15% faster). Increased test coverage by 40% through unit tests. Built RESTful APIs and optimized SQL queries. Collaborated with stakeholders for requirement gathering and documentation.',
        technologies: ['Python', 'RESTful APIs', 'SQL', 'Unit Testing'],
        order: 1
      },
      {
        title: 'Data Analyst Intern',
        company: 'Dynamic Dreamz',
        location: 'Gujarat, India',
        duration: 'Jan 2021 – Apr 2021',
        description: 'Cleaned and preprocessed large structured/unstructured datasets. Used Excel tools like VLOOKUP and Power Query. Wrote SQL scripts for rule-based transformations. Built ETL pipelines in Python and SQL (25% faster). Created Tableau dashboards and presented insights to stakeholders.',
        technologies: ['Excel', 'SQL', 'Python', 'Tableau', 'ETL'],
        order: 2
      }
    ];

    // Projects data
    const projects = [
      {
        title: 'Historical Indian IPO & Financial Market Analysis',
        description: 'Analyzed IPOs using Power BI, Pandas, and predictive ML. Built dashboards and linked financial indicators to outcomes.',
        imageUrl: 'https://via.placeholder.com/800x600?text=IPO+Analysis',
        projectUrl: 'https://example.com/ipo-analysis',
        githubUrl: 'https://github.com/username/ipo-analysis',
        technologies: ['Power BI', 'Pandas', 'ML', 'Financial Analysis'],
        featured: true
      },
      {
        title: 'Healthcare Workforce and Clinical Data Analysis',
        description: 'Used Tableau, Selenium, and statistical analysis to identify trends in workforce data and clinical outcomes.',
        imageUrl: 'https://via.placeholder.com/800x600?text=Healthcare+Analysis',
        projectUrl: 'https://example.com/healthcare-analysis',
        githubUrl: 'https://github.com/username/healthcare-analysis',
        technologies: ['Tableau', 'Selenium', 'Statistical Analysis'],
        featured: true
      },
      {
        title: 'AlwaysBlue Web App',
        description: 'Built a multi-tool web app with features like Email Extractor, Text to Speech using Java and React.',
        imageUrl: 'https://via.placeholder.com/800x600?text=AlwaysBlue+App',
        projectUrl: 'https://example.com/alwaysblue',
        githubUrl: 'https://github.com/username/alwaysblue',
        technologies: ['Java', 'React', 'Web Development'],
        featured: false
      }
    ];

    // Sample QnA data
    const qnas = [
      {
        question: 'What technologies do you work with?',
        answer: 'I primarily work with Python, R, and Java for programming, along with various data science libraries like NumPy, Pandas, and NLTK. I also have experience with SQL databases, Tableau for visualization, and cloud platforms like AWS and Azure.',
        tags: ['skills', 'technologies', 'stack']
      },
      {
        question: 'What is your professional experience?',
        answer: 'I have experience as a Software Developer Intern at Acodesoft Technologies and as a Data Analyst Intern at Dynamic Dreamz, where I worked on various projects involving data analysis, Python programming, and building ETL pipelines.',
        tags: ['experience', 'work', 'professional']
      },
      {
        question: 'Tell me about your education',
        answer: 'I hold a degree in Computer Science/Data Science with a focus on analytics and machine learning. I have also completed various certifications in data analysis and visualization tools.',
        tags: ['education', 'degree', 'learning']
      },
      {
        question: 'What are your best projects?',
        answer: 'Some of my notable projects include a Historical Indian IPO & Financial Market Analysis using Power BI and ML, Healthcare Workforce Analysis using Tableau and statistical methods, and a multi-tool web application called AlwaysBlue.',
        tags: ['projects', 'portfolio', 'work']
      },
      {
        question: 'How can I contact you?',
        answer: 'You can reach me via email at your.email@example.com, or connect with me on LinkedIn and GitHub.',
        tags: ['contact', 'email', 'connect']
      }
    ];

    // Insert new data
    console.log('Inserting new data...');
    const skillsResult = await Skill.insertMany(skills);
    const experiencesResult = await Experience.insertMany(experiences);
    const projectsResult = await Project.insertMany(projects);
    const qnasResult = await QnA.insertMany(qnas);

    console.log(`Seed data inserted successfully:
      ${skillsResult.length} skills
      ${experiencesResult.length} experiences
      ${projectsResult.length} projects
      ${qnasResult.length} QnAs
    `);

    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding MongoDB Atlas database:', error);
    console.error('Please make sure your IP address is whitelisted in MongoDB Atlas Network Access settings.');
    process.exit(1);
  }
};

// Run the seed function
seedAtlasDatabase(); 



