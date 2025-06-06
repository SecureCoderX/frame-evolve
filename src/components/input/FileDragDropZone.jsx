import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileVideo, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, animations } from '../../design-system/tokens';
import { Button } from '../../design-system/components/atoms';

const SUPPORTED_FORMATS = [
  'video/mp4',
  'video/avi',
  'video/mov',
  'video/mkv',
  'video/webm',
  'video/flv',
  'video/wmv',
  'video/m4v'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB

const FileDragDropZone = ({ 
  onFileSelect, 
  onError, 
  accept = SUPPORTED_FORMATS,
  maxSize = MAX_FILE_SIZE,
  disabled = false,
  className = ""
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [validationState, setValidationState] = useState(null);
  const fileInputRef = useRef(null);
  const dragCounterRef = useRef(0);

  const validateFile = useCallback((file) => {
    if (!accept.includes(file.type)) {
      return {
        isValid: false,
        error: `Unsupported file format. Please use: ${accept.map(type => 
          type.split('/')[1].toUpperCase()).join(', ')}`
      };
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `File too large. Maximum size: ${(maxSize / (1024 * 1024 * 1024)).toFixed(1)}GB`
      };
    }

    return { isValid: true };
  }, [accept, maxSize]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    dragCounterRef.current++;
    
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    dragCounterRef.current--;
    
    if (dragCounterRef.current === 0) {
      setIsDragActive(false);
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragActive(false);
    setIsDragOver(false);
    dragCounterRef.current = 0;
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    const file = files[0]; // Only take the first file
    const validation = validateFile(file);
    
    if (validation.isValid) {
      setValidationState('success');
      onFileSelect?.(file);
      setTimeout(() => setValidationState(null), 2000);
    } else {
      setValidationState('error');
      onError?.(validation.error);
      setTimeout(() => setValidationState(null), 3000);
    }
  }, [disabled, validateFile, onFileSelect, onError]);

  const handleFileInputChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const file = files[0];
    const validation = validateFile(file);
    
    if (validation.isValid) {
      setValidationState('success');
      onFileSelect?.(file);
      setTimeout(() => setValidationState(null), 2000);
    } else {
      setValidationState('error');
      onError?.(validation.error);
      setTimeout(() => setValidationState(null), 3000);
    }
    
    // Reset input
    e.target.value = '';
  }, [validateFile, onFileSelect, onError]);

  const openFileDialog = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  const getStateStyles = () => {
    if (disabled) {
      return 'border-slate-700 bg-slate-900/30 cursor-not-allowed';
    }
    
    if (validationState === 'error') {
      return 'border-red-500 bg-red-500/10 border-dashed animate-pulse';
    }
    
    if (validationState === 'success') {
      return 'border-green-500 bg-green-500/10 border-solid';
    }
    
    if (isDragActive) {
      return 'border-blue-500 bg-blue-500/20 border-solid shadow-lg shadow-blue-500/20';
    }
    
    return 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800/70 border-dashed';
  };

  const getIconComponent = () => {
    if (validationState === 'error') return AlertCircle;
    if (validationState === 'success') return CheckCircle2;
    if (isDragActive) return FileVideo;
    return Upload;
  };

  const IconComponent = getIconComponent();

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />
      
      <motion.div
        className={`
          relative border-2 rounded-xl p-8 text-center transition-all duration-300
          cursor-pointer select-none min-h-[200px] flex flex-col items-center justify-center
          ${getStateStyles()}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
        whileHover={!disabled ? { scale: 1.01 } : {}}
        whileTap={!disabled ? { scale: 0.99 } : {}}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={validationState || (isDragActive ? 'active' : 'default')}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center space-y-4"
          >
            <motion.div
              animate={isDragActive ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <IconComponent 
                size={48} 
                className={`
                  ${validationState === 'error' ? 'text-red-400' : 
                    validationState === 'success' ? 'text-green-400' :
                    isDragActive ? 'text-blue-400' : 'text-slate-400'}
                `}
              />
            </motion.div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-200">
                {validationState === 'error' ? 'Invalid File' :
                 validationState === 'success' ? 'File Accepted!' :
                 isDragActive ? 'Drop your video here' :
                 'Drop video files here'}
              </h3>
              
              <p className="text-sm text-slate-400 max-w-sm">
                {validationState === 'error' ? 'Please try again with a supported video file' :
                 validationState === 'success' ? 'Ready for processing' :
                 isDragActive ? 'Release to upload' :
                 `Supports ${accept.length} video formats up to ${(maxSize / (1024 * 1024 * 1024)).toFixed(1)}GB`}
              </p>
            </div>
            
            {!isDragActive && !validationState && (
              <Button
                variant="secondary"
                size="sm"
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  openFileDialog();
                }}
              >
                Browse Files
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FileDragDropZone;