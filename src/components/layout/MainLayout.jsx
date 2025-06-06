import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import StatusBar from './StatusBar';

/**
 * Main layout component for Frame Evolve
 * Provides the core structure with sidebar, content area, and status bar
 */
const MainLayout = () => {
  const [activeView, setActiveView] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [processingQueue, setProcessingQueue] = useState([]);

  // Layout animation variants
  const layoutVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  // Handle view navigation
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Handle project operations
  const handleProjectSelect = (project) => {
    setCurrentProject(project);
    setActiveView('enhance');
  };

  const handleAddToQueue = (file) => {
    const newItem = {
      id: Date.now(),
      file,
      status: 'pending',
      progress: 0,
      addedAt: new Date()
    };
    setProcessingQueue(prev => [...prev, newItem]);
  };

  const handleRemoveFromQueue = (id) => {
    setProcessingQueue(prev => prev.filter(item => item.id !== id));
  };

  return (
    <motion.div 
      className="flex h-full bg-slate-950 text-white overflow-hidden"
      variants={layoutVariants}
      initial="initial"
      animate="animate"
    >
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        collapsed={sidebarCollapsed}
        onViewChange={handleViewChange}
        onToggleCollapse={toggleSidebar}
        processingQueue={processingQueue}
        currentProject={currentProject}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        
        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <ContentArea
              key={activeView}
              activeView={activeView}
              currentProject={currentProject}
              processingQueue={processingQueue}
              onProjectSelect={handleProjectSelect}
              onAddToQueue={handleAddToQueue}
              onRemoveFromQueue={handleRemoveFromQueue}
              onViewChange={handleViewChange}
            />
          </AnimatePresence>
        </main>

        {/* Status Bar */}
        <StatusBar
          activeView={activeView}
          currentProject={currentProject}
          processingQueue={processingQueue}
          sidebarCollapsed={sidebarCollapsed}
        />
      </div>

      {/* Overlay for collapsed sidebar on mobile */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </motion.div>
  );
};

export default MainLayout;