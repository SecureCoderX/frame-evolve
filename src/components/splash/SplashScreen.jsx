import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingAnimation from './LoadingAnimation';
import BrandIdentity from './BrandIdentity';

/**
 * Professional splash screen component for Frame Evolve
 * Handles app initialization, loading states, and smooth transitions
 */
const SplashScreen = ({ onComplete }) => {
  const [loadingStage, setLoadingStage] = useState('initializing');
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Frame Evolve...');
  const [appVersion, setAppVersion] = useState('1.0.0');
  const [error, setError] = useState(null);

  // Loading stages and their durations
  const loadingStages = [
    { key: 'initializing', text: 'Initializing Frame Evolve...', duration: 800 },
    { key: 'system', text: 'Checking system capabilities...', duration: 600 },
    { key: 'codecs', text: 'Loading video codecs...', duration: 700 },
    { key: 'ai', text: 'Preparing AI models...', duration: 900 },
    { key: 'ui', text: 'Setting up interface...', duration: 500 },
    { key: 'complete', text: 'Ready to enhance!', duration: 400 }
  ];

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Get app version if available
        if (window.electronAPI) {
          const version = await window.electronAPI.app.getVersion();
          setAppVersion(version);
        }

        // Simulate initialization stages
        for (let i = 0; i < loadingStages.length; i++) {
          const stage = loadingStages[i];
          
          setLoadingStage(stage.key);
          setLoadingText(stage.text);
          
          // Animate progress
          const targetProgress = ((i + 1) / loadingStages.length) * 100;
          await animateProgress(targetProgress, stage.duration);
          
          // Wait for stage completion
          await new Promise(resolve => setTimeout(resolve, stage.duration));
        }

        // Complete initialization
        setTimeout(() => {
          onComplete?.();
        }, 500);

      } catch (err) {
        setError('Failed to initialize application');
        // eslint-disable-next-line no-console
        console.error('Splash screen initialization error:', err);
      }
    };

    initializeApp();
  }, [onComplete]);

  const animateProgress = (target, duration) => {
    return new Promise(resolve => {
      const start = progress;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth progress
        const easedProgress = 1 - Math.pow(1 - progressRatio, 3);
        const currentProgress = start + (target - start) * easedProgress;
        
        setProgress(currentProgress);
        
        if (progressRatio < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      
      requestAnimationFrame(animate);
    });
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.4, ease: 'easeIn' }
    }
  };

  const contentVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { delay: 0.2, duration: 0.8, ease: 'easeOut' }
    }
  };

  if (error) {
    return (
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white">Initialization Error</h2>
          <p className="text-slate-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Background Particles/Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Main Content */}
        <motion.div 
          className="relative z-10 text-center space-y-8 px-8"
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          {/* Brand Identity */}
          <BrandIdentity />

          {/* Loading Animation */}
          <LoadingAnimation stage={loadingStage} progress={progress} />

          {/* Loading Text */}
          <motion.div 
            className="space-y-2"
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-slate-300 text-lg font-medium">
              {loadingText}
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
              <span>Frame Evolve</span>
              <span>•</span>
              <span>v{appVersion}</span>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-80 mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400">Progress</span>
              <span className="text-xs text-slate-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;