import React from 'react';
import SearchForm from '../components/SearchForm';
import RecipeList from '../components/RecipeList';
import { useRecipe } from '../context/RecipeContext';
import { ChefHat } from 'lucide-react';

const HomePage: React.FC = () => {
  const { recipes, loading, error } = useRecipe();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <ChefHat className="text-orange-500 dark:text-orange-400" size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3">
            AI-Powered Recipe Generator
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Describe what you want to cook, and let AI create a delicious recipe for you. Specify ingredients, cuisine type, or dietary preferences.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <SearchForm />
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
              {loading ? 'Generating your recipe...' : recipes.length > 0 ? 'Your Recipes' : 'Generate your first recipe'}
            </h2>
            
            {loading ? (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 text-center transition-colors duration-300">
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                </div>
              </div>
            ) : (
              <RecipeList recipes={recipes} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;