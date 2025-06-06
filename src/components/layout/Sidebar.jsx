import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Upload, 
  Sparkles, 
  Settings, 
  FolderOpen,
  List,
  ChevronLeft,
  ChevronRight,
  Video,
  TrendingUp
} from 'lucide-react';

/**
 * Sidebar navigation component
 * Provides main navigation and project overview
 */
const Sidebar = ({ 
  activeView, 
  collapsed, 
  onViewChange, 
  onToggleCollapse,
  processingQueue,
  currentProject 
}) => {

  // Navigation items configuration
  const getNavigationItems = () => [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      description: 'Dashboard and overview'
    },
    {
      id: 'upload',
      label: 'Upload',
      icon: Upload,
      description: 'Add videos to enhance'
    },
    {
      id: 'enhance',
      label: 'Enhance',
      icon: Sparkles,
      description: 'Video enhancement tools',
      disabled: !currentProject
    },
    {
      id: 'queue',
      label: 'Queue',
      icon: List,
      description: 'Processing queue',
      badge: processingQueue.length > 0 ? processingQueue.length : null
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderOpen,
      description: 'Manage your projects'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'App preferences'
    }
  ];

  // Render navigation button
  const renderNavButton = (item) => {
    const Icon = item.icon;
    const isActive = activeView === item.id;
    const isDisabled = item.disabled;

    return (
      <motion.button
        key={item.id}
        onClick={() => !isDisabled && onViewChange(item.id)}
        disabled={isDisabled}
        className={`
          w-full flex items-center p-3 rounded-lg transition-all duration-200 group relative
          ${isActive 
            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
            : isDisabled
            ? 'text-slate-600 cursor-not-allowed'
            : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
          }
        `}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        title={collapsed ? item.label : item.description}
      >
        {/* Icon */}
        <Icon size={20} className="flex-shrink-0" />
        
        {/* Label and Badge */}
        {!collapsed && (
          <motion.div 
            className="ml-3 flex-1 flex items-center justify-between"
            variants={contentVariants}
            animate={collapsed ? 'collapsed' : 'expanded'}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full min-w-[20px] text-center">
                {item.badge}
              </span>
            )}
          </motion.div>
        )}
        
        {/* Collapsed state badge */}
        {collapsed && item.badge && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
            {item.badge}
          </div>
        )}

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"
            layoutId="activeIndicator"
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.button>
    );
  };

  // Sidebar animation variants
  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 64 }
  };

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };

  return (
    <motion.div 
      className="fixed left-0 top-12 bottom-0 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700/50 z-30"
      variants={sidebarVariants}
      animate={collapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex flex-col h-full">
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          {!collapsed && (
            <motion.div
              variants={contentVariants}
              animate={collapsed ? 'collapsed' : 'expanded'}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-white">Navigation</h2>
              <p className="text-xs text-slate-400">Frame Evolve</p>
            </motion.div>
          )}
          
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {getNavigationItems().map(renderNavButton)}
        </nav>

        {/* Project Info Section */}
        {!collapsed && currentProject && (
          <motion.div 
            className="p-4 border-t border-slate-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Video size={16} className="text-blue-400" />
                <span className="text-sm font-medium text-white">Current Project</span>
              </div>
              <p className="text-xs text-slate-300 truncate">
                {currentProject.name || 'Untitled Project'}
              </p>
              <div className="flex items-center space-x-2 mt-2 text-xs text-slate-400">
                <TrendingUp size={12} />
                <span>Ready for enhancement</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sidebar Footer */}
        {!collapsed && (
          <motion.div 
            className="p-4 border-t border-slate-700/50"
            variants={contentVariants}
            animate={collapsed ? 'collapsed' : 'expanded'}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs text-slate-500 space-y-1">
              <p>Frame Evolve v1.0.0</p>
              <p>Phase 1 Development</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;