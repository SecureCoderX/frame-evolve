import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  HardDrive, 
  Activity, 
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

/**
 * Status bar component showing system info and app status
 * Displays processing status, system resources, and notifications
 */
const StatusBar = ({ 
  activeView, 
  currentProject, 
  processingQueue, 
  sidebarCollapsed 
}) => {
  const [systemInfo, setSystemInfo] = useState({
    memory: 0,
    cpu: 0,
    storage: 0
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Simulate system monitoring (in real app, this would come from Electron main process)
  useEffect(() => {
    const updateSystemInfo = () => {
      setSystemInfo({
        memory: Math.floor(Math.random() * 30) + 60, // 60-90%
        cpu: Math.floor(Math.random() * 20) + 10,    // 10-30%
        storage: Math.floor(Math.random() * 10) + 85  // 85-95%
      });
    };

    updateSystemInfo();
    const interval = setInterval(updateSystemInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get processing status
  const getProcessingStatus = () => {
    const processing = processingQueue.filter(item => item.status === 'processing').length;
    const completed = processingQueue.filter(item => item.status === 'completed').length;
    const failed = processingQueue.filter(item => item.status === 'failed').length;

    return { processing, completed, failed, total: processingQueue.length };
  };

  const status = getProcessingStatus();

  // Get current view display name
  const getViewDisplayName = (view) => {
    const viewNames = {
      home: 'Dashboard',
      upload: 'File Upload',
      enhance: 'Video Enhancement',
      queue: 'Processing Queue',
      projects: 'Project Manager',
      settings: 'Settings'
    };
    return viewNames[view] || 'Unknown';
  };

  // Status indicator based on processing state
  const getStatusIndicator = () => {
    if (status.failed > 0) {
      return { icon: AlertCircle, color: 'text-red-400', label: 'Errors' };
    }
    if (status.processing > 0) {
      return { icon: Activity, color: 'text-blue-400', label: 'Processing' };
    }
    if (status.completed > 0) {
      return { icon: CheckCircle, color: 'text-green-400', label: 'Ready' };
    }
    return { icon: Info, color: 'text-slate-400', label: 'Idle' };
  };

  const statusIndicator = getStatusIndicator();
  const StatusIcon = statusIndicator.icon;

  return (
    <motion.div 
      className="h-8 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50 flex items-center justify-between px-4 text-xs text-slate-400"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {/* Left Section - Current Status */}
      <div className="flex items-center space-x-6">
        
        {/* App Status */}
        <div className="flex items-center space-x-2">
          <StatusIcon size={14} className={statusIndicator.color} />
          <span className={statusIndicator.color}>{statusIndicator.label}</span>
        </div>

        {/* Current View */}
        <div className="flex items-center space-x-2">
          <span>View:</span>
          <span className="text-white font-medium">{getViewDisplayName(activeView)}</span>
        </div>

        {/* Project Info */}
        {currentProject && (
          <div className="flex items-center space-x-2">
            <span>Project:</span>
            <span className="text-blue-400 font-medium truncate max-w-32">
              {currentProject.name || 'Untitled'}
            </span>
          </div>
        )}

        {/* Processing Queue Summary */}
        {status.total > 0 && (
          <div className="flex items-center space-x-2">
            <span>Queue:</span>
            <span className="text-white">
              {status.processing > 0 && <span className="text-blue-400">{status.processing} processing</span>}
              {status.processing > 0 && status.completed > 0 && <span className="mx-1">•</span>}
              {status.completed > 0 && <span className="text-green-400">{status.completed} done</span>}
              {status.failed > 0 && (
                <>
                  <span className="mx-1">•</span>
                  <span className="text-red-400">{status.failed} failed</span>
                </>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Right Section - System Info */}
      <div className="flex items-center space-x-6">
        
        {/* System Resources */}
        <div className="flex items-center space-x-4">
          
          {/* CPU Usage */}
          <div className="flex items-center space-x-1">
            <Cpu size={12} />
            <span>CPU {systemInfo.cpu}%</span>
          </div>

          {/* Memory Usage */}
          <div className="flex items-center space-x-1">
            <Activity size={12} />
            <span>RAM {systemInfo.memory}%</span>
          </div>

          {/* Storage */}
          <div className="flex items-center space-x-1">
            <HardDrive size={12} />
            <span>Disk {systemInfo.storage}%</span>
          </div>
        </div>

        {/* Current Time */}
        <div className="flex items-center space-x-1">
          <Clock size={12} />
          <span>{currentTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })}</span>
        </div>

        {/* Version Info */}
        <div className="flex items-center space-x-2">
          <span>Frame Evolve</span>
          <span className="text-blue-400">v1.0.0</span>
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusBar;