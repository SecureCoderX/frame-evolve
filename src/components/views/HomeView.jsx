import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Sparkles, 
  TrendingUp, 
  Clock,
  Video,
  Zap,
  ChevronRight,
  Plus
} from 'lucide-react';

/**
 * Home dashboard view component
 * Displays overview, quick actions, and recent activity
 */
const HomeView = ({ 
  currentProject, 
  processingQueue, 
  onViewChange, 
  onProjectSelect 
}) => {

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  // Quick action items
  const quickActions = [
    {
      id: 'upload',
      title: 'Upload Videos',
      description: 'Add new videos to enhance',
      icon: Upload,
      color: 'blue',
      action: () => onViewChange('upload')
    },
    {
      id: 'enhance',
      title: 'Start Enhancing',
      description: 'Begin video enhancement',
      icon: Sparkles,
      color: 'purple',
      disabled: !currentProject,
      action: () => onViewChange('enhance')
    },
    {
      id: 'queue',
      title: 'View Queue',
      description: `${processingQueue.length} items in queue`,
      icon: Clock,
      color: 'green',
      action: () => onViewChange('queue')
    }
  ];

  // Recent projects (mock data for now)
  const recentProjects = [
    { id: 1, name: 'Wedding Video Enhancement', status: 'completed', date: '2 hours ago' },
    { id: 2, name: 'Conference Recording Upscale', status: 'processing', date: '1 day ago' },
    { id: 3, name: 'Nature Documentary 4K', status: 'completed', date: '3 days ago' }
  ];

  const colorClasses = {
    blue: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 text-blue-400',
    purple: 'bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20 text-purple-400',
    green: 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20 text-green-400'
  };

  return (
    <motion.div 
      className="h-full p-8 overflow-auto"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome to Frame Evolve
          </h1>
          <p className="text-xl text-slate-400">
            Professional video enhancement at your fingertips
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Total Projects */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <Video className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-2 flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+3 this week</span>
            </div>
          </div>

          {/* Enhanced Videos */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Enhanced Videos</p>
                <p className="text-2xl font-bold text-white">47</p>
              </div>
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <div className="mt-2 flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12 this month</span>
            </div>
          </div>

          {/* Processing Time Saved */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Time Saved</p>
                <p className="text-2xl font-bold text-white">156h</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="mt-2 flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>vs manual editing</span>
            </div>
          </div>

          {/* Queue Status */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Queue Status</p>
                <p className="text-2xl font-bold text-white">{processingQueue.length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-400" />
            </div>
            <div className="mt-2 flex items-center text-sm text-slate-400">
              <span>items pending</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <motion.button
                  key={action.id}
                  onClick={action.action}
                  disabled={action.disabled}
                  className={`
                    p-6 rounded-xl border transition-all duration-200 text-left group
                    ${action.disabled 
                      ? 'bg-slate-800/30 border-slate-700/30 text-slate-600 cursor-not-allowed' 
                      : colorClasses[action.color]
                    }
                  `}
                  whileHover={!action.disabled ? { scale: 1.02 } : {}}
                  whileTap={!action.disabled ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Icon className="w-8 h-8" />
                      <h3 className="font-semibold text-white">{action.title}</h3>
                      <p className="text-sm text-slate-400">{action.description}</p>
                    </div>
                    {!action.disabled && (
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Projects & Getting Started */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Projects */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Recent Projects</h2>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                  onClick={() => onProjectSelect && onProjectSelect(project)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-white truncate">{project.name}</h3>
                      <p className="text-sm text-slate-400 mt-1">{project.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Getting Started / Development Status */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Development Progress</h2>
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 space-y-4">
              <div>
                <h4 className="font-medium text-green-400 mb-2">✅ Phase 1 Complete</h4>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>• Project setup and configuration</li>
                  <li>• Custom titlebar with window controls</li>
                  <li>• Professional splash screen system</li>
                  <li>• Main layout with navigation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-400 mb-2">🚧 Coming in Phase 2</h4>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>• Design system foundation</li>
                  <li>• Drag & drop file upload</li>
                  <li>• Video preview components</li>
                  <li>• Control panel interface</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeView;