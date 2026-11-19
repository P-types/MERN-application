import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itemsRouter from './routes/items.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
  res.json({
    status: 'online',
    message: 'Backend server is running smoothly (In-memory storage active)',
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
  console.log(`📦 Storage: In-memory (No database required)`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📋 Items API: http://localhost:${PORT}/api/items`);
  console.log(`=================================================\n`);
});
