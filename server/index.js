import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { generateRecipeHandler, getHistoryHandler, saveRecipeHandler, rateRecipeHandler, addCommentHandler } from './controllers/recipeController.js';

// Load environment variables
config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/generate-recipe', generateRecipeHandler);
app.get('/api/history', getHistoryHandler);
app.post('/api/save-recipe', saveRecipeHandler);
app.post('/api/rate-recipe', rateRecipeHandler);
app.post('/api/add-comment', addCommentHandler);

// Connect to MongoDB
const startServer = async () => {
  try {
    // Use an in-memory MongoDB for demonstration
    // In a real app, you'd connect to a real MongoDB instance
    console.log('MongoDB connection would happen here in a production environment');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();