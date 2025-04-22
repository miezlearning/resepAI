import React, { useState } from 'react';
import { useRecipe } from '../context/RecipeContext';
import { RecipeFormData } from '../types';
import { Search, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const SearchForm: React.FC = () => {
  const { generateRecipe, loading } = useRecipe();
  const [formData, setFormData] = useState<RecipeFormData>({
    query: '',
    kategori: '',
    tingkat_kesulitan: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.query.trim()) {
      toast.error('Please enter a search query');
      return;
    }
    
    const recipe = await generateRecipe(formData);
    
    if (recipe) {
      toast.success(`Recipe for ${recipe.nama_resep} generated!`);
    }
  };

  const categories = [
    'Breakfast', 'Lunch', 'Dinner', 'Appetizer', 'Dessert', 
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Low-Carb', 'High-Protein'
  ];
  
  const difficultyLevels = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="query" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
          >
            What would you like to cook?
          </label>
          <div className="relative">
            <input
              type="text"
              id="query"
              name="query"
              placeholder="E.g., Pasta with tomato sauce, Vegan curry, Chocolate cake..."
              value={formData.query}
              onChange={handleChange}
              className="w-full px-4 py-3 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
              disabled={loading}
            />
            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="kategori" 
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
            >
              Category (Optional)
            </label>
            <select
              id="kategori"
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
              disabled={loading}
            >
              <option value="">Any Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label 
              htmlFor="tingkat_kesulitan" 
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
            >
              Difficulty (Optional)
            </label>
            <select
              id="tingkat_kesulitan"
              name="tingkat_kesulitan"
              value={formData.tingkat_kesulitan}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
              disabled={loading}
            >
              <option value="">Any Difficulty</option>
              {difficultyLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin mr-2" />
                Generating Recipe...
              </>
            ) : (
              'Generate Recipe'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;