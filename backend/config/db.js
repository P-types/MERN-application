import mongoose from 'mongoose';
import Item from '../models/Item.js';

const initialItems = [
  {
    title: 'Explore MERN Stack Architecture',
    description: 'Learn how React communicates with an Express and Node.js REST API with MongoDB storage.',
    category: 'Learning',
    priority: 'High',
    completed: true
  },
  {
    title: 'Build Express REST Endpoints',
    description: 'Provide GET, POST, PUT, and DELETE operations with MongoDB / Mongoose models.',
    category: 'Backend',
    priority: 'High',
    completed: true
  },
  {
    title: 'Connect React Frontend with Vite',
    description: 'Fetch backend data asynchronously and render dynamic UI with state updates.',
    category: 'Frontend',
    priority: 'Medium',
    completed: false
  },
  {
    title: 'Style Dashboard with Modern UI',
    description: 'Create responsive card layouts, badges, filter controls, and status indicators.',
    category: 'Design',
    priority: 'Low',
    completed: false
  }
];

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskflow';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout fast if mongo server isn't running
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host} / Database: ${conn.connection.name}`);

    // Seed initial data if collection is empty
    const count = await Item.countDocuments();
    if (count === 0) {
      await Item.insertMany(initialItems);
      console.log('🌱 Seeded initial tasks into MongoDB collection');
    }
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn(`⚠️ Please make sure MongoDB is running on your system (e.g. at ${uri}).`);
    return false;
  }
};

export const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};
