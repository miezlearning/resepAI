import { GoogleGenerativeAI } from '@google/generative-ai';
import Recipe from '../models/Recipe.js';

// Initialize Google Gemini AI
const API_KEY = 'AIzaSyDPKCL_fwr3dylx75NcmkhwurCSzWZfAoE';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// In-memory storage for development
const recipeStore = [];

export const generateRecipeHandler = async (req, res) => {
  try {
    const { query, kategori, tingkat_kesulitan } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }
    
    let prompt = `Generate a recipe for ${query}`;
    
    if (kategori) {
      prompt += ` in the ${kategori} category`;
    }
    
    if (tingkat_kesulitan) {
      prompt += ` with ${tingkat_kesulitan} difficulty level`;
    }
    
    prompt += `. Return the response in the following JSON format ONLY (no additional text):
    {
      "nama_resep": "Recipe name",
      "porsi": 4, 
      "waktu_memasak": "30 minutes",
      "bahan": ["ingredient 1", "ingredient 2", "..."],
      "langkah": ["step 1", "step 2", "..."],
      "tips": "Cooking tips",
      "kategori": "${kategori || 'Dinner'}",
      "tingkat_kesulitan": "${tingkat_kesulitan || 'Medium'}"
    }`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse recipe from AI response');
    }
    
    // Parse the JSON
    const recipeData = JSON.parse(jsonMatch[0]);
    
    // Add ID to the recipe
    const recipe = {
      ...recipeData,
      id: Date.now().toString(),
      created_at: new Date()
    };
    
    // In a production app, you would store this in MongoDB
    recipeStore.push(recipe);
    
    return res.json(recipe);
  } catch (error) {
    console.error('Error generating recipe:', error);
    return res.status(500).json({ message: 'Failed to generate recipe', error: error.message });
  }
};

export const getHistoryHandler = async (req, res) => {
  try {
    // In a production app, you would fetch from MongoDB
    return res.json(recipeStore);
  } catch (error) {
    console.error('Error fetching recipe history:', error);
    return res.status(500).json({ message: 'Failed to fetch recipe history', error: error.message });
  }
};

export const saveRecipeHandler = async (req, res) => {
  try {
    const recipe = req.body;
    
    if (!recipe) {
      return res.status(400).json({ message: 'Recipe data is required' });
    }
    
    // In a production app, you would save to MongoDB
    // Check if recipe already exists
    const existingIndex = recipeStore.findIndex(r => r.id === recipe.id);
    if (existingIndex !== -1) {
      // Update existing recipe
      recipeStore[existingIndex] = recipe;
    } else {
      // Add new recipe
      recipeStore.push({
        ...recipe,
        id: recipe.id || Date.now().toString(),
        created_at: new Date()
      });
    }
    
    return res.status(201).json({ message: 'Recipe saved successfully' });
  } catch (error) {
    console.error('Error saving recipe:', error);
    return res.status(500).json({ message: 'Failed to save recipe', error: error.message });
  }
};

export const rateRecipeHandler = async (req, res) => {
  try {
    const { recipeId, rating } = req.body;
    
    if (!recipeId || !rating) {
      return res.status(400).json({ message: 'Recipe ID and rating are required' });
    }
    
    // In a production app, you would update in MongoDB
    const recipeIndex = recipeStore.findIndex(r => r.id === recipeId);
    if (recipeIndex === -1) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    recipeStore[recipeIndex].rating = rating;
    
    return res.json({ message: 'Rating added successfully' });
  } catch (error) {
    console.error('Error adding rating:', error);
    return res.status(500).json({ message: 'Failed to add rating', error: error.message });
  }
};

export const addCommentHandler = async (req, res) => {
  try {
    const { recipeId, comment, author } = req.body;
    
    if (!recipeId || !comment) {
      return res.status(400).json({ message: 'Recipe ID and comment are required' });
    }
    
    // In a production app, you would update in MongoDB
    const recipeIndex = recipeStore.findIndex(r => r.id === recipeId);
    if (recipeIndex === -1) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    if (!recipeStore[recipeIndex].comments) {
      recipeStore[recipeIndex].comments = [];
    }
    
    recipeStore[recipeIndex].comments.push({
      id: Date.now().toString(),
      text: comment,
      author: author || 'Anonymous',
      date: new Date()
    });
    
    return res.json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};