import React from 'react';
import { motion } from 'framer-motion';
import HomeView from '../views/HomeView';
import { UploadView, EnhanceView, QueueView, ProjectsView, SettingsView } from '../views/PlaceholderViews';

/**
 * Content area component that renders different views
 * Handles view switching with smooth animations
 */
const ContentArea = ({ 
  activeView, 
  currentProject,
  processingQueue,
  onProjectSelect,
  onAddToQueue,
  onRemoveFromQueue,
  onViewChange 
}) => {

  // Content animation variants
  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };

  // Render the appropriate view based on activeView
  const renderView = () => {
    const viewProps = {
      currentProject,
      processingQueue,
      onProjectSelect,
      onAddToQueue,
      onRemoveFromQueue,
      onViewChange
    };

    switch (activeView) {
      case 'home':
        return <HomeView {...viewProps} />;
      case 'upload':
        return <UploadView {...viewProps} />;
      case 'enhance':
        return <EnhanceView {...viewProps} />;
      case 'queue':
        return <QueueView {...viewProps} />;
      case 'projects':
        return <ProjectsView {...viewProps} />;
      case 'settings':
        return <SettingsView {...viewProps} />;
      default:
        return <HomeView {...viewProps} />;
    }
  };

  return (
    <motion.div 
      className="h-full bg-slate-950 text-white overflow-auto"
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Content Container */}
      <div className="h-full">
        {renderView()}
      </div>
    </motion.div>
  );
};

export default ContentArea;