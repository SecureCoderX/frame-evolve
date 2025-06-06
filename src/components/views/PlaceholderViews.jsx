import React from 'react';
import { motion } from 'framer-motion';

// Shared animation variants
const viewVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

// UploadView.jsx
export const UploadView = ({ onViewChange }) => (
  <motion.div 
    className="h-full flex items-center justify-center p-8"
    variants={viewVariants}
    initial="initial"
    animate="animate"
  >
    <div className="text-center space-y-6 max-w-md">
      <div className="w-20 h-20 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-white">Upload Videos</h2>
      <p className="text-slate-400">
        Drag & drop functionality and file upload system will be implemented in Phase 2.
      </p>
      <div className="text-sm text-blue-400">Coming in Phase 2 Step 2.2</div>
    </div>
  </motion.div>
);

// EnhanceView.jsx
export const EnhanceView = ({ currentProject }) => (
  <motion.div 
    className="h-full flex items-center justify-center p-8"
    variants={viewVariants}
    initial="initial"
    animate="animate"
  >
    <div className="text-center space-y-6 max-w-md">
      <div className="w-20 h-20 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-white">Video Enhancement</h2>
      <p className="text-slate-400">
        AI-powered video enhancement tools and processing controls will be available here.
      </p>
      {!currentProject && (
        <p className="text-amber-400 text-sm">Upload a video first to enable enhancement tools</p>
      )}
      <div className="text-sm text-purple-400">Coming in Phase 4</div>
    </div>
  </motion.div>
);

// QueueView.jsx
export const QueueView = ({ processingQueue }) => (
  <motion.div 
    className="h-full flex items-center justify-center p-8"
    variants={viewVariants}
    initial="initial"
    animate="animate"
  >
    <div className="text-center space-y-6 max-w-md">
      <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-white">Processing Queue</h2>
      <p className="text-slate-400">
        Batch processing queue management and progress tracking will be implemented here.
      </p>
      <div className="text-sm text-slate-300">
        Current queue: {processingQueue.length} items
      </div>
      <div className="text-sm text-green-400">Coming in Phase 3</div>
    </div>
  </motion.div>
);

// ProjectsView.jsx
export const ProjectsView = () => (
  <motion.div 
    className="h-full flex items-center justify-center p-8"
    variants={viewVariants}
    initial="initial"
    animate="animate"
  >
    <div className="text-center space-y-6 max-w-md">
      <div className="w-20 h-20 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-white">Project Manager</h2>
      <p className="text-slate-400">
        Project organization, file management, and history tracking will be available here.
      </p>
      <div className="text-sm text-orange-400">Coming in Phase 2</div>
    </div>
  </motion.div>
);

// SettingsView.jsx
export const SettingsView = () => (
  <motion.div 
    className="h-full flex items-center justify-center p-8"
    variants={viewVariants}
    initial="initial"
    animate="animate"
  >
    <div className="text-center space-y-6 max-w-md">
      <div className="w-20 h-20 mx-auto bg-slate-500/20 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-white">Settings</h2>
      <p className="text-slate-400">
        Application preferences, AI model settings, and system configuration options.
      </p>
      <div className="text-sm text-slate-400">Coming in Phase 5</div>
    </div>
  </motion.div>
);

// Default export with all views
const Views = {
  UploadView,
  EnhanceView,
  QueueView,
  ProjectsView,
  SettingsView
};

export default Views;