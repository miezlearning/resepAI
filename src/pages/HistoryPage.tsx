import React, { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';
import { useRecipe } from '../context/RecipeContext';
import { Clock, Search } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const { historyRecipes, fetchHistory } = useRecipe();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);
  
  const filteredRecipes = historyRecipes.filter(recipe => {
    const matchesSearch = searchQuery === '' || 
      recipe.nama_resep.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === '' || 
      recipe.kategori.toLowerCase() === filterCategory.toLowerCase();
    
    const matchesDifficulty = filterDifficulty === '' || 
      recipe.tingkat_kesulitan.toLowerCase() === filterDifficulty.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  const categories = Array.from(
    new Set(historyRecipes.map(recipe => recipe.kategori))
  );
  
  const difficultyLevels = Array.from(
    new Set(historyRecipes.map(recipe => recipe.tingkat_kesulitan))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center">
            <Clock className="text-orange-500 dark:text-orange-400 mr-3" size={24} />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              Recipe History
            </h1>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-8 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
                />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
              >
                <option value="">All Difficulty Levels</option>
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          
          <RecipeList 
            recipes={filteredRecipes} 
            emptyMessage="Your recipe history is empty. Generate some recipes to see them here!"
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;