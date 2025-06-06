import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TitleBar from './components/titlebar/TitleBar';
import SplashScreen from './components/splash/SplashScreen';
import MainLayout from './components/layout/MainLayout';
import './styles/globals.css';

/**
 * Main App component with splash screen, titlebar, and layout integration
 * Manages the complete application lifecycle and navigation
 */
function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    // Small delay for smooth transition
    setTimeout(() => {
      setShowSplash(false);
    }, 300);
  };

  return (
    <div className="App min-h-screen bg-slate-950 text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen 
            key="splash"
            onComplete={handleSplashComplete} 
          />
        ) : (
          <div key="main-app" className="min-h-screen">
            {/* Custom Titlebar */}
            <TitleBar />
            
            {/* Main Application Layout */}
            <main className="pt-12 h-screen">
              <MainLayout />
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;