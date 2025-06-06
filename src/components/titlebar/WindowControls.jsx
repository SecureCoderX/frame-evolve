import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, X, Maximize2, Minimize2 } from 'lucide-react';

/**
 * Window control buttons component
 * Handles minimize, maximize, and close functionality
 * Adapts styling based on platform (macOS vs Windows/Linux)
 */
const WindowControls = ({ isMaximized, platform, onStateChange }) => {
  
  const handleMinimize = async () => {
    if (window.electronAPI) {
      await window.electronAPI.windowControls.minimize();
    }
  };

  const handleMaximize = async () => {
    if (window.electronAPI) {
      await window.electronAPI.windowControls.maximize();
      const newState = await window.electronAPI.windowControls.isMaximized();
      onStateChange(newState);
    }
  };

  const handleClose = async () => {
    if (window.electronAPI) {
      await window.electronAPI.windowControls.close();
    }
  };

  // Button animation variants
  const buttonVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  // macOS-style traffic light controls
  const MacOSControls = () => (
    <div className="flex items-center space-x-2 px-4">
      {/* Close Button */}
      <motion.button
        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center group"
        onClick={handleClose}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        title="Close"
      >
        <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Minimize Button */}
      <motion.button
        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center group"
        onClick={handleMinimize}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        title="Minimize"
      >
        <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Maximize Button */}
      <motion.button
        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center group"
        onClick={handleMaximize}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        title={isMaximized ? "Restore" : "Maximize"}
      >
        <div className="w-2 h-2 border border-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  );

  // Windows/Linux-style controls
  const WindowsControls = () => (
    <div className="flex items-center">
      {/* Minimize Button */}
      <motion.button
        className="h-12 w-12 flex items-center justify-center hover:bg-slate-700/50 transition-colors"
        onClick={handleMinimize}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        title="Minimize"
      >
        <Minus className="w-4 h-4 text-slate-300" />
      </motion.button>

      {/* Maximize/Restore Button */}
      <motion.button
        className="h-12 w-12 flex items-center justify-center hover:bg-slate-700/50 transition-colors"
        onClick={handleMaximize}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        title={isMaximized ? "Restore Down" : "Maximize"}
      >
        {isMaximized ? (
          <Minimize2 className="w-4 h-4 text-slate-300" />
        ) : (
          <Maximize2 className="w-4 h-4 text-slate-300" />
        )}
      </motion.button>

      {/* Close Button */}
      <motion.button
        className="h-12 w-12 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
        onClick={handleClose}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        title="Close"
      >
        <X className="w-4 h-4 text-slate-300" />
      </motion.button>
    </div>
  );

  return (
    <div className="window-controls">
      {platform === 'darwin' ? <MacOSControls /> : <WindowsControls />}
    </div>
  );
};

export default WindowControls;