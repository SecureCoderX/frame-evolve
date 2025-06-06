import React from 'react';
import { motion } from 'framer-motion';
import { X, FileVideo, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Button } from '../../design-system/components/atoms';
import { formatFileSize, formatDuration } from '../../utils/formatters';

const UploadProgress = ({ 
  file,
  progress = 0,
  status = 'uploading', // 'uploading', 'processing', 'complete', 'error', 'paused'
  onCancel,
  onRetry,
  estimatedTime,
  errorMessage,
  className = ""
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'uploading':
        return {
          icon: FileVideo,
          color: 'blue',
          text: 'Uploading...',
          showProgress: true
        };
      case 'processing':
        return {
          icon: Clock,
          color: 'purple',
          text: 'Processing...',
          showProgress: true
        };
      case 'complete':
        return {
          icon: CheckCircle2,
          color: 'green',
          text: 'Complete',
          showProgress: false
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'red',
          text: 'Error',
          showProgress: false
        };
      case 'paused':
        return {
          icon: Clock,
          color: 'yellow',
          text: 'Paused',
          showProgress: true
        };
      default:
        return {
          icon: FileVideo,
          color: 'slate',
          text: 'Unknown',
          showProgress: false
        };
    }
  };

  const statusConfig = getStatusConfig();
  const IconComponent = statusConfig.icon;

  const getColorClasses = (type) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
        icon: 'text-blue-400',
        progress: 'bg-blue-500',
        text: 'text-blue-400'
      },
      purple: {
        bg: 'bg-purple-500/20',
        border: 'border-purple-500/30',
        icon: 'text-purple-400',
        progress: 'bg-purple-500',
        text: 'text-purple-400'
      },
      green: {
        bg: 'bg-green-500/20',
        border: 'border-green-500/30',
        icon: 'text-green-400',
        progress: 'bg-green-500',
        text: 'text-green-400'
      },
      red: {
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
        icon: 'text-red-400',
        progress: 'bg-red-500',
        text: 'text-red-400'
      },
      yellow: {
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-500/30',
        icon: 'text-yellow-400',
        progress: 'bg-yellow-500',
        text: 'text-yellow-400'
      },
      slate: {
        bg: 'bg-slate-500/20',
        border: 'border-slate-500/30',
        icon: 'text-slate-400',
        progress: 'bg-slate-500',
        text: 'text-slate-400'
      }
    };

    return colorMap[statusConfig.color] || colorMap.slate;
  };

  const colors = getColorClasses();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        relative rounded-lg border p-4 transition-all duration-300
        bg-slate-800/50 backdrop-blur-sm border-slate-700/50
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <motion.div
            className={`p-2 rounded-lg ${colors.bg} ${colors.border} border`}
            animate={status === 'uploading' || status === 'processing' ? 
              { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <IconComponent size={20} className={colors.icon} />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-slate-200 truncate">
              {file?.name || 'Unknown file'}
            </h4>
            <p className="text-xs text-slate-400 flex items-center space-x-2">
              <span>{formatFileSize(file?.size || 0)}</span>
              {statusConfig.showProgress && (
                <>
                  <span>•</span>
                  <span className={colors.text}>{progress}%</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-3">
          {status === 'error' && onRetry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRetry}
              className="text-xs px-2 py-1"
            >
              Retry
            </Button>
          )}
          
          {(status === 'uploading' || status === 'processing' || status === 'paused') && onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="p-1 h-auto"
            >
              <X size={14} />
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {statusConfig.showProgress && (
        <div className="mb-3">
          <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${colors.progress}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}

      {/* Status Message */}
      <div className="flex items-center justify-between text-xs">
        <span className={`font-medium ${colors.text}`}>
          {statusConfig.text}
          {status === 'processing' && (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ...
            </motion.span>
          )}
        </span>
        
        {estimatedTime && (status === 'uploading' || status === 'processing') && (
          <span className="text-slate-400">
            {formatDuration(estimatedTime)} remaining
          </span>
        )}
      </div>

      {/* Error Message */}
      {status === 'error' && errorMessage && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <p className="text-xs text-red-400">{errorMessage}</p>
        </motion.div>
      )}

      {/* Completion Message */}
      {status === 'complete' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
        >
          <p className="text-xs text-green-400">
            File uploaded successfully and ready for processing
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UploadProgress;