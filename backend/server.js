import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, isDBConnected } from './config/db.js';
import itemsRouter from './routes/items.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbConnected = isDBConnected();
  res.json({
    status: 'online',
    database: dbConnected ? 'connected' : 'disconnected',
    databaseType: 'MongoDB (Mongoose)',
    message: dbConnected
      ? 'Backend and MongoDB are fully connected and online'
      : 'Backend is running, but MongoDB is not connected',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
});

// API Routes
app.use('/api/items', itemsRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.url}`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 MERN Backend Server running on http://localhost:${PORT}`);
  console.log(`🍃 Database: MongoDB via Mongoose`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📋 Items API: http://localhost:${PORT}/api/items`);
  console.log(`=================================================\n`);
});
