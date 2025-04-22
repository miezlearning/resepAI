import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Recipe, RecipeFormData } from '../types';

interface RecipeContextType {
  recipes: Recipe[];
  historyRecipes: Recipe[];
  loading: boolean;
  error: string | null;
  generateRecipe: (formData: RecipeFormData) => Promise<Recipe | null>;
  fetchHistory: () => Promise<void>;
  saveRecipe: (recipe: Recipe) => Promise<void>;
  addRating: (recipeId: string, rating: number) => Promise<void>;
  addComment: (recipeId: string, comment: string, author: string) => Promise<void>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api';

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [historyRecipes, setHistoryRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const generateRecipe = async (formData: RecipeFormData): Promise<Recipe | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_URL}/generate-recipe`, { 
        params: formData 
      });
      
      const newRecipe = response.data;
      setRecipes(prev => [newRecipe, ...prev]);
      return newRecipe;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to generate recipe');
      } else {
        setError('An unexpected error occurred');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (): Promise<void> => {
    try {
      const response = await axios.get(`${API_URL}/history`);
      setHistoryRecipes(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error fetching history:', err.response?.data?.message);
      } else {
        console.error('Unexpected error fetching history:', err);
      }
    }
  };

  const saveRecipe = async (recipe: Recipe): Promise<void> => {
    try {
      await axios.post(`${API_URL}/save-recipe`, recipe);
      await fetchHistory();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error saving recipe:', err.response?.data?.message);
      } else {
        console.error('Unexpected error saving recipe:', err);
      }
    }
  };

  const addRating = async (recipeId: string, rating: number): Promise<void> => {
    try {
      await axios.post(`${API_URL}/rate-recipe`, { recipeId, rating });
      await fetchHistory();
    } catch (err) {
      console.error('Error adding rating:', err);
    }
  };

  const addComment = async (recipeId: string, comment: string, author: string): Promise<void> => {
    try {
      await axios.post(`${API_URL}/add-comment`, { recipeId, comment, author });
      await fetchHistory();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <RecipeContext.Provider 
      value={{ 
        recipes, 
        historyRecipes, 
        loading, 
        error, 
        generateRecipe,
        fetchHistory, 
        saveRecipe,
        addRating,
        addComment
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
};