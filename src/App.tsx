import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { RecipeProvider } from './context/RecipeContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <ThemeProvider>
      <RecipeProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white transition-colors duration-300">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            <Toaster 
              position="bottom-right"
              toastOptions={{
                style: {
                  borderRadius: '8px',
                  background: 'var(--toaster-bg, #fff)',
                  color: 'var(--toaster-color, #334155)',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#f97316',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                },
              }}
            />
          </div>
        </Router>
      </RecipeProvider>
    </ThemeProvider>
  );
}

export default App;