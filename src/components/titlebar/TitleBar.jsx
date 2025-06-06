import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WindowControls from './WindowControls';
import DragRegion from './DragRegion';

/**
 * Custom titlebar component for frameless window
 * Provides window controls, branding, and drag functionality
 */
const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    // Get platform info and window state
    const initializeTitlebar = async () => {
      if (window.electronAPI) {
        const platformInfo = await window.electronAPI.app.getPlatform();
        const maximized = await window.electronAPI.windowControls.isMaximized();
        
        setPlatform(platformInfo);
        setIsMaximized(maximized);
      }
    };

    initializeTitlebar();

    // Listen for window state changes
    const handleWindowStateChange = () => {
      if (window.electronAPI) {
        window.electronAPI.windowControls.isMaximized().then(setIsMaximized);
      }
    };

    // Add event listeners for window resize
    window.addEventListener('resize', handleWindowStateChange);
    
    return () => {
      window.removeEventListener('resize', handleWindowStateChange);
    };
  }, []);

  const titleBarVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      className="titlebar-container"
      variants={titleBarVariants}
      initial="initial"
      animate="animate"
    >
      <div className={`
        flex items-center justify-between h-12 
        bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
        border-b border-slate-700/50
        select-none relative
        ${platform === 'darwin' ? 'pl-20' : 'pl-4'}
      `}>
        
        {/* Left Section - Logo and App Name */}
        <DragRegion className="flex items-center space-x-3 flex-1">
          <div className="flex items-center space-x-2">
            {/* App Logo */}
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center pointer-events-none">
              <svg 
                className="w-4 h-4 text-white pointer-events-none" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            
            {/* App Name */}
            <div className="text-white font-medium text-sm tracking-wide draggable-text">
              Frame Evolve
            </div>
            
            {/* Version Badge (Optional) */}
            <div className="hidden md:block px-2 py-0.5 bg-slate-700/50 rounded-full text-xs text-slate-300 pointer-events-none">
              v1.0.0
            </div>
          </div>
        </DragRegion>

        {/* Center Section - Window Title/Status */}
        <DragRegion className="flex-1 flex justify-center">
          <div className="text-slate-300 text-sm font-light tracking-wide draggable-text">
            Professional Video Enhancement
          </div>
        </DragRegion>

        {/* Right Section - Window Controls */}
        <div className="flex items-center window-controls">
          <WindowControls 
            isMaximized={isMaximized}
            platform={platform}
            onStateChange={setIsMaximized}
          />
        </div>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      {/* Bottom border highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </motion.div>
  );
};

export default TitleBar;