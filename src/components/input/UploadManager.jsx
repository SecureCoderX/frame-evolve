import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, X, RefreshCw } from 'lucide-react';
import { Button } from '../../design-system/components/atoms';
import FileDragDropZone from './FileDragDropZone';
import UploadProgress from './UploadProgress';
import FileInfoDisplay from './FileInfoDisplay';
import FileBrowser from './FileBrowser';

const UploadManager = ({ 
  onFileProcessed,
  className = ""
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'processing', 'complete', 'error'
  const [fileMetadata, setFileMetadata] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showFileBrowser, setShowFileBrowser] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);

  // Extract file metadata (in real app, this would use proper metadata extraction)
  const extractMetadata = useCallback(async (file) => {
    // Simulate metadata extraction
    return new Promise((resolve) => {
      setTimeout(() => {
        const metadata = {
          duration: 180, // seconds
          resolution: { width: 1920, height: 1080 },
          frameRate: 30,
          bitrate: 5000000,
          codec: 'h264',
          audioCodec: 'aac',
          audioChannels: 2,
          aspectRatio: '16:9',
          colorSpace: 'YUV420p',
          size: file.size
        };
        resolve(metadata);
      }, 1000);
    });
  }, []);

  // Simulate file upload/processing
  const processFile = useCallback(async (file) => {
    setUploadStatus('uploading');
    setUploadProgress(0);
    setEstimatedTime(30000); // 30 seconds

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(uploadInterval);
          setUploadStatus('processing');
          setEstimatedTime(60000); // 1 minute for processing
          
          // Simulate processing
          setTimeout(() => {
            setUploadStatus('complete');
            setEstimatedTime(null);
            onFileProcessed?.(file, fileMetadata);
          }, 3000);
          
          return 100;
        }
        return newProgress;
      });
    }, 200);

    // Extract metadata during upload
    try {
      const metadata = await extractMetadata(file);
      setFileMetadata(metadata);
    } catch (error) {
      console.error('Failed to extract metadata:', error);
    }
  }, [extractMetadata, fileMetadata, onFileProcessed]);

  const handleFileSelect = useCallback(async (file) => {
    setSelectedFile(file);
    setErrorMessage('');
    setUploadProgress(0);
    setFileMetadata({});
    
    try {
      await processFile(file);
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Failed to process file. Please try again.');
    }
  }, [processFile]);

  const handleError = useCallback((error) => {
    setErrorMessage(error);
    setUploadStatus('error');
  }, []);

  const handleCancel = useCallback(() => {
    setUploadStatus('idle');
    setSelectedFile(null);
    setUploadProgress(0);
    setFileMetadata({});
    setErrorMessage('');
    setEstimatedTime(null);
  }, []);

  const handleRetry = useCallback(() => {
    if (selectedFile) {
      processFile(selectedFile);
    }
  }, [selectedFile, processFile]);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    setFileMetadata({});
    setErrorMessage('');
    setEstimatedTime(null);
  }, []);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Upload Area */}
      <div className="space-y-4">
        {!selectedFile ? (
          <div className="space-y-4">
            <FileDragDropZone
              onFileSelect={handleFileSelect}
              onError={handleError}
              disabled={uploadStatus === 'uploading' || uploadStatus === 'processing'}
            />
            
            <div className="flex justify-center">
              <Button
                variant="secondary"
                onClick={() => setShowFileBrowser(true)}
                className="text-sm"
              >
                <FolderOpen size={16} className="mr-2" />
                Browse Files
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Upload Progress */}
            <UploadProgress
              file={selectedFile}
              progress={uploadProgress}
              status={uploadStatus}
              onCancel={uploadStatus !== 'complete' ? handleCancel : undefined}
              onRetry={uploadStatus === 'error' ? handleRetry : undefined}
              estimatedTime={estimatedTime}
              errorMessage={errorMessage}
            />

            {/* Action Buttons */}
            <div className="flex justify-center space-x-3">
              {uploadStatus === 'complete' && (
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  size="sm"
                >
                  <RefreshCw size={14} className="mr-2" />
                  Upload Another File
                </Button>
              )}
              
              {(uploadStatus === 'idle' || uploadStatus === 'error') && (
                <Button
                  variant="secondary"
                  onClick={() => setShowFileBrowser(true)}
                  size="sm"
                >
                  <FolderOpen size={14} className="mr-2" />
                  Browse Files
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* File Information */}
      <AnimatePresence>
        {selectedFile && Object.keys(fileMetadata).length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FileInfoDisplay
              file={selectedFile}
              metadata={fileMetadata}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      <AnimatePresence>
        {errorMessage && uploadStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-400">{errorMessage}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setErrorMessage('')}
                className="p-1 h-auto"
              >
                <X size={14} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Browser Modal */}
      <AnimatePresence>
        {showFileBrowser && (
          <FileBrowser
            onFileSelect={handleFileSelect}
            onClose={() => setShowFileBrowser(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadManager;