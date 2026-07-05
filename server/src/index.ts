import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Mini Task Manager API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Database connection helper
const mongoUri = process.env.MONGODB_URI;

if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
} else {
  console.warn('Warning: MONGODB_URI environment variable is not defined in .env. Skipping database connection.');
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
