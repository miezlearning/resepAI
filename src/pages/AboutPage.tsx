import React from 'react';
import { ChefHat, Sparkles, Database, Share } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              About ResepAI
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Your AI-powered kitchen assistant
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 mb-8 transition-colors duration-300">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg">
                ResepAI is an intelligent recipe generator that uses artificial intelligence to create customized recipes based on your preferences, ingredients, and dietary needs.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4 flex items-center">
                <ChefHat className="text-orange-500 dark:text-orange-400 mr-2" size={24} />
                How It Works
              </h2>
              
              <p>
                When you enter a query like "vegetarian pasta with mushrooms" or "easy breakfast ideas," our AI analyzes your request and generates a complete recipe with ingredients, instructions, and helpful tips. The recipes are designed to be practical, delicious, and tailored to your specifications.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4 flex items-center">
                <Sparkles className="text-orange-500 dark:text-orange-400 mr-2" size={24} />
                Key Features
              </h2>
              
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>AI-Generated Recipes:</strong> Get unique recipes created specifically for your needs.</li>
                <li><strong>Recipe History:</strong> Save and access your favorite generated recipes anytime.</li>
                <li><strong>Filtering Options:</strong> Filter recipes by category, difficulty level, and more.</li>
                <li><strong>PDF Export:</strong> Download recipes in PDF format for offline access.</li>
                <li><strong>Share:</strong> Share recipes with friends and family on social media.</li>
                <li><strong>Dark Mode:</strong> Enjoy a comfortable viewing experience day or night.</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4 flex items-center">
                <Database className="text-orange-500 dark:text-orange-400 mr-2" size={24} />
                Technology
              </h2>
              
              <p>
                ResepAI is powered by Google's Gemini AI model, which has been trained on a vast collection of recipes and cooking techniques. The application is built with modern web technologies including React, Node.js, Express, and MongoDB.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4 flex items-center">
                <Share className="text-orange-500 dark:text-orange-400 mr-2" size={24} />
                Privacy
              </h2>
              
              <p>
                We care about your privacy. Your search queries and saved recipes are stored securely and are only used to improve your experience with the application. We do not share your data with third parties.
              </p>
              
              <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  © 2025 ResepAI. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;