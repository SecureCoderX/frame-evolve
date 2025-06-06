import React from 'react';
import { motion } from 'framer-motion';

/**
 * Brand identity component for splash screen
 * Displays Frame Evolve logo, name, and tagline with animations
 */
const BrandIdentity = () => {
  
  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 1.2, 
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.6, 
        duration: 0.8, 
        ease: 'easeOut' 
      }
    }
  };

  const taglineVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        delay: 1.2, 
        duration: 0.6, 
        ease: 'easeOut' 
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Logo */}
      <motion.div 
        className="relative"
        variants={logoVariants}
        initial="initial"
        animate="animate"
      >
        {/* Main Logo Container */}
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 p-1 shadow-2xl">
          {/* Inner Logo */}
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center relative overflow-hidden">
            
            {/* Logo Icon - Video/Frame Enhancement Symbol */}
            <svg 
              className="w-10 h-10 text-white relative z-10" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              {/* Outer frame */}
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fillOpacity="0.3"/>
              
              {/* Inner enhanced frame */}
              <path d="M17 7H7c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1z"/>
              
              {/* Enhancement arrows */}
              <path d="M9 10l2 2-2 2M15 14l-2-2 2-2" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>

            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-100, 100] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: 'loop',
                ease: 'linear'
              }}
              style={{ transform: 'skewX(-15deg)' }}
            />
          </div>

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-50 blur-lg -z-10"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          />
        </div>
      </motion.div>

      {/* App Name */}
      <motion.div 
        className="text-center space-y-2"
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Frame Evolve
        </h1>
        
        {/* Tagline */}
        <motion.p 
          className="text-slate-400 text-lg font-light tracking-wide"
          variants={taglineVariants}
          initial="initial"
          animate="animate"
        >
          Professional Video Enhancement
        </motion.p>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div 
        className="flex items-center space-x-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        {/* Left decorative line */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent to-blue-500/50"
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 1.6, duration: 0.8, ease: 'easeOut' }}
        />
        
        {/* Center dot */}
        <motion.div 
          className="w-2 h-2 rounded-full bg-blue-400"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ delay: 2, duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Right decorative line */}
        <motion.div 
          className="h-px bg-gradient-to-l from-transparent to-purple-500/50"
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 1.6, duration: 0.8, ease: 'easeOut' }}
        />
      </motion.div>
    </div>
  );
};

export default BrandIdentity;