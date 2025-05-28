import mongoose from 'mongoose';
import Project from './models/Project';
import Experience from './models/Experience';
import Skill from './models/Skill';
import QnA from './models/QnA';
import { MONGODB_URI, mongoOptions } from './config/mongodb';

// Set NODE_ENV to production to use Atlas
process.env.NODE_ENV = 'production';

const testAtlasConnection = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    console.log(`Connection string: ${MONGODB_URI}`);
    
    await mongoose.connect(MONGODB_URI, mongoOptions);
    console.log('MongoDB Atlas connected successfully');

    // Count documents in each collection
    const projectCount = await Project.countDocuments();
    const experienceCount = await Experience.countDocuments();
    const skillCount = await Skill.countDocuments();
    const qnaCount = await QnA.countDocuments();

    console.log(`
    Data in MongoDB Atlas:
      Projects: ${projectCount}
      Experiences: ${experienceCount}
      Skills: ${skillCount}
      QnAs: ${qnaCount}
    `);

    // Fetch one document from each collection
    if (projectCount > 0) {
      const project = await Project.findOne();
      console.log('Sample project:', project?.title);
    }

    if (experienceCount > 0) {
      const experience = await Experience.findOne();
      console.log('Sample experience:', experience?.title);
    }

    if (skillCount > 0) {
      const skill = await Skill.findOne();
      console.log('Sample skill category:', skill?.title);
    }

    if (qnaCount > 0) {
      const qna = await QnA.findOne();
      console.log('Sample question:', qna?.question);
    }

    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
};

// Run the test function
testAtlasConnection(); 