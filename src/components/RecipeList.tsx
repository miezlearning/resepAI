import React from 'react';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  showActions?: boolean;
  emptyMessage?: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  showActions = true,
  emptyMessage = "No recipes found. Try generating a new recipe!"
}) => {
  if (recipes.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 text-center transition-colors duration-300">
        <p className="text-slate-600 dark:text-slate-300">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard 
          key={recipe.id || index} 
          recipe={recipe} 
          showActions={showActions} 
        />
      ))}
    </div>
  );
};

export default RecipeList;