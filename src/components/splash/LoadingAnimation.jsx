import React from 'react';
import { motion } from 'framer-motion';

/**
 * Dynamic loading animation component
 * Changes animation based on loading stage and progress
 */
const LoadingAnimation = ({ stage, progress }) => {
  
  // Animation variants for different stages
  const getStageAnimation = () => {
    switch (stage) {
      case 'initializing':
        return <InitializingAnimation />;
      case 'system':
        return <SystemCheckAnimation />;
      case 'codecs':
        return <CodecLoadingAnimation />;
      case 'ai':
        return <AIPreparationAnimation />;
      case 'ui':
        return <UISetupAnimation />;
      case 'complete':
        return <CompletionAnimation />;
      default:
        return <DefaultAnimation />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div 
        className="relative w-24 h-24"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {getStageAnimation()}
      </motion.div>
    </div>
  );
};

// Initializing Animation - Spinning rings
const InitializingAnimation = () => (
  <>
    <motion.div
      className="absolute inset-0 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute inset-2 border-2 border-purple-500/30 border-b-purple-500 rounded-full"
      animate={{ rotate: -360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />
  </>
);

// System Check Animation - Pulsing radar
const SystemCheckAnimation = () => (
  <>
    <motion.div
      className="absolute inset-0 border-2 border-green-500/50 rounded-full"
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute inset-4 bg-green-500/20 rounded-full"
      animate={{ scale: [0.8, 1, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-2 h-2 bg-green-400 rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  </>
);

// Codec Loading Animation - Flowing bars
const CodecLoadingAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="w-1 bg-orange-500 rounded-full mx-1"
        animate={{ height: ['20%', '80%', '20%'] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: 'easeInOut'
        }}
      />
    ))}
  </div>
);

// AI Preparation Animation - Neural network nodes
const AIPreparationAnimation = () => (
  <>
    <div className="absolute inset-0">
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          className="absolute border border-purple-500/30 rounded-full"
          style={{
            inset: `${ring * 8}px`,
          }}
          animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 4 + ring, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-4 h-4 bg-purple-400 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          boxShadow: [
            '0 0 0 0 rgba(168, 85, 247, 0.4)',
            '0 0 0 10px rgba(168, 85, 247, 0)',
            '0 0 0 0 rgba(168, 85, 247, 0)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  </>
);

// UI Setup Animation - Building blocks
const UISetupAnimation = () => (
  <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2">
    {Array.from({ length: 9 }, (_, i) => (
      <motion.div
        key={i}
        className="bg-blue-500/40 rounded"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: i * 0.1,
          duration: 0.3,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.8
        }}
      />
    ))}
  </div>
);

// Completion Animation - Success checkmark
const CompletionAnimation = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <motion.div
      className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        viewBox="0 0 24 24"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </motion.svg>
    </motion.div>
  </motion.div>
);

// Default Animation - Simple spinner
const DefaultAnimation = () => (
  <motion.div
    className="absolute inset-0 border-4 border-slate-600 border-t-blue-500 rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
  />
);

export default LoadingAnimation;