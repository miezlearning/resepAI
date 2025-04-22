import React, { useState } from 'react';
import { Recipe } from '../types';
import { Clock, Users, Award, Share2, Download, Bookmark, Star } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';

interface RecipeCardProps {
  recipe: Recipe;
  showActions?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, showActions = true }) => {
  const { saveRecipe, addRating } = useRecipe();
  const [expanded, setExpanded] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  
  const handleSave = async () => {
    await saveRecipe(recipe);
    toast.success('Recipe saved to history!');
  };
  
  const handleRating = async (rating: number) => {
    if (!recipe.id) return;
    
    setUserRating(rating);
    await addRating(recipe.id, rating);
    toast.success('Rating saved!');
  };
  
  const handleDownloadPDF = () => {
    const element = document.getElementById(`recipe-${recipe.id || 'current'}`);
    if (!element) return;
    
    const opt = {
      margin: 1,
      filename: `${recipe.nama_resep.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
    toast.success('Recipe downloaded as PDF!');
  };
  
  const shareUrl = `${window.location.origin}/recipe/${recipe.id || 'current'}`;
  const shareTitle = `Check out this recipe for ${recipe.nama_resep}!`;
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6" id={`recipe-${recipe.id || 'current'}`}>
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{recipe.nama_resep}</h2>
          
          {recipe.kategori && (
            <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
              {recipe.kategori}
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-3 mb-4 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.waktu_memasak}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{recipe.porsi} portions</span>
          </div>
          <div className="flex items-center gap-1">
            <Award size={16} />
            <span>{recipe.tingkat_kesulitan}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium text-slate-800 dark:text-white mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
            {recipe.bahan.slice(0, expanded ? recipe.bahan.length : 5).map((bahan, index) => (
              <li key={index}>{bahan}</li>
            ))}
          </ul>
          {recipe.bahan.length > 5 && !expanded && (
            <button 
              onClick={() => setExpanded(true)}
              className="text-orange-500 dark:text-orange-400 mt-2 text-sm font-medium hover:underline"
            >
              Show all ingredients
            </button>
          )}
        </div>
        
        {expanded && (
          <>
            <div className="mb-4">
              <h3 className="font-medium text-slate-800 dark:text-white mb-2">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300">
                {recipe.langkah.map((step, index) => (
                  <li key={index} className="pl-1">
                    <span className="font-medium text-slate-800 dark:text-white mr-2">{index + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-slate-800 dark:text-white mb-2">Tips:</h3>
              <p className="text-slate-600 dark:text-slate-300">{recipe.tips}</p>
            </div>
          </>
        )}
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-orange-500 dark:text-orange-400 hover:underline"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      </div>
      
      {showActions && (
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 flex flex-wrap items-center justify-between">
          <div className="flex gap-3">
            {recipe.rating && (
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    fill={star <= recipe.rating! ? "currentColor" : "none"}
                    className={star <= recipe.rating! ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            )}
            
            {!recipe.rating && (
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-${userRating && star <= userRating ? 'yellow' : 'gray'}-400 hover:text-yellow-400 transition-colors`}
                  >
                    <Star
                      size={16}
                      fill={userRating && star <= userRating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 rounded-full hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors"
              aria-label="Save recipe"
            >
              <Bookmark size={18} />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 rounded-full hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors"
                aria-label="Share recipe"
              >
                <Share2 size={18} />
              </button>
              
              {showShareOptions && (
                <div className="absolute right-0 bottom-10 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-2 flex gap-2 z-10">
                  <FacebookShareButton url={shareUrl} quote={shareTitle}>
                    <div className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full">FB</div>
                  </FacebookShareButton>
                  
                  <TwitterShareButton url={shareUrl} title={shareTitle}>
                    <div className="p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full">TW</div>
                  </TwitterShareButton>
                  
                  <WhatsappShareButton url={shareUrl} title={shareTitle}>
                    <div className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-slate-700 rounded-full">WA</div>
                  </WhatsappShareButton>
                </div>
              )}
            </div>
            
            <button
              onClick={handleDownloadPDF}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 rounded-full hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors"
              aria-label="Download recipe as PDF"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;