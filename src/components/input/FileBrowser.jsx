import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, 
  FileVideo, 
  Search, 
  Filter,
  ArrowUp,
  Grid,
  List,
  SortAsc,
  Clock,
  HardDrive
} from 'lucide-react';
import { Button, Input } from '../../design-system/components/atoms';
import { formatFileSize, formatDuration } from '../../utils/formatters';

const SUPPORTED_EXTENSIONS = ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv', '.wmv', '.m4v'];

const FileBrowser = ({ 
  onFileSelect,
  onClose,
  className = ""
}) => {
  const [currentPath, setCurrentPath] = useState('');
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'size', 'modified'
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Simulated file system (in real app, this would use Electron's file system APIs)
  const loadDirectory = useCallback(async (path = '') => {
    setIsLoading(true);
    
    // In a real Electron app, this would use fs APIs
    // For demo purposes, we'll simulate file loading
    setTimeout(() => {
      const mockFiles = [
        {
          name: 'Sample_Video_1080p.mp4',
          size: 125829120, // ~120MB
          type: 'video/mp4',
          modified: new Date('2024-01-15'),
          isDirectory: false,
          duration: 180000, // 3 minutes
          thumbnail: null
        },
        {
          name: 'High_Quality_Demo.mov',
          size: 524288000, // ~500MB
          type: 'video/quicktime',
          modified: new Date('2024-01-20'),
          isDirectory: false,
          duration: 300000, // 5 minutes
          thumbnail: null
        },
        {
          name: 'Projects',
          size: 0,
          type: 'directory',
          modified: new Date('2024-01-10'),
          isDirectory: true
        },
        {
          name: 'Raw_Footage.avi',
          size: 1073741824, // ~1GB
          type: 'video/x-msvideo',
          modified: new Date('2024-01-05'),
          isDirectory: false,
          duration: 600000, // 10 minutes
          thumbnail: null
        }
      ];
      
      setFiles(mockFiles);
      setIsLoading(false);
    }, 500);
  }, []);

  const openNativeFileBrowser = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleNativeFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFileSelect?.(files[0]);
      onClose?.();
    }
    e.target.value = '';
  }, [onFileSelect, onClose]);

  const handleFileClick = useCallback((file) => {
    if (file.isDirectory) {
      const newPath = currentPath ? `${currentPath}/${file.name}` : file.name;
      setCurrentPath(newPath);
      loadDirectory(newPath);
    } else {
      onFileSelect?.(file);
      onClose?.();
    }
  }, [currentPath, loadDirectory, onFileSelect, onClose]);

  const navigateUp = useCallback(() => {
    const pathParts = currentPath.split('/');
    pathParts.pop();
    const newPath = pathParts.join('/');
    setCurrentPath(newPath);
    loadDirectory(newPath);
  }, [currentPath, loadDirectory]);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isVideoFile = file.isDirectory || SUPPORTED_EXTENSIONS.some(ext => 
      file.name.toLowerCase().endsWith(ext));
    return matchesSearch && isVideoFile;
  });

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    // Directories first
    if (a.isDirectory && !b.isDirectory) return -1;
    if (!a.isDirectory && b.isDirectory) return 1;
    
    switch (sortBy) {
      case 'size':
        return b.size - a.size;
      case 'modified':
        return b.modified - a.modified;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  React.useEffect(() => {
    loadDirectory();
  }, [loadDirectory]);

  const FileIcon = ({ file }) => (
    <div className={`
      p-2 rounded-lg ${file.isDirectory ? 
        'bg-yellow-500/20 border border-yellow-500/30' : 
        'bg-blue-500/20 border border-blue-500/30'}
    `}>
      {file.isDirectory ? (
        <FolderOpen size={20} className="text-yellow-400" />
      ) : (
        <FileVideo size={20} className="text-blue-400" />
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/50 backdrop-blur-sm ${className}
      `}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="w-full max-w-4xl h-full max-h-[80vh] bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-200">Select Video File</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={openNativeFileBrowser}
                className="text-xs"
              >
                <FolderOpen size={14} className="mr-1" />
                Browse System
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ×
              </Button>
            </div>
          </div>

          {/* Navigation and Search */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {currentPath && (
                <Button variant="ghost" size="sm" onClick={navigateUp}>
                  <ArrowUp size={14} />
                </Button>
              )}
              <span className="text-sm text-slate-400">
                {currentPath || 'Home'}
              </span>
            </div>
            
            <div className="flex-1">
              <Input
                placeholder="Search video files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                leftIcon={Search}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 bg-slate-800 border border-slate-600 rounded text-sm text-slate-200"
              >
                <option value="name">Name</option>
                <option value="size">Size</option>
                <option value="modified">Modified</option>
              </select>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List size={14} /> : <Grid size={14} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <AnimatePresence>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-4 gap-4">
                  {sortedFiles.map((file, index) => (
                    <motion.div
                      key={file.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => handleFileClick(file)}
                    >
                      <div className="p-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
                        <div className="flex flex-col items-center space-y-3">
                          <FileIcon file={file} />
                          <div className="text-center min-w-0 w-full">
                            <p className="text-sm font-medium text-slate-200 truncate">
                              {file.name}
                            </p>
                            {!file.isDirectory && (
                              <p className="text-xs text-slate-400">
                                {formatFileSize(file.size)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedFiles.map((file, index) => (
                    <motion.div
                      key={file.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center space-x-4 p-3 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 cursor-pointer transition-colors"
                      onClick={() => handleFileClick(file)}
                    >
                      <FileIcon file={file} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {file.isDirectory ? 'Folder' : `${formatFileSize(file.size)} • Modified ${file.modified.toLocaleDateString()}`}
                        </p>
                      </div>
                      {!file.isDirectory && file.duration && (
                        <div className="text-xs text-slate-400">
                          {formatDuration(file.duration)}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          )}
          
          {!isLoading && sortedFiles.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <FileVideo size={48} className="text-slate-500 mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">No video files found</h3>
              <p className="text-sm text-slate-400 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'This folder contains no supported video files'}
              </p>
              <Button variant="secondary" onClick={openNativeFileBrowser}>
                Browse System Files
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input for native file browser */}
      <input
        ref={fileInputRef}
        type="file"
        accept={SUPPORTED_EXTENSIONS.join(',')}
        onChange={handleNativeFileSelect}
        className="hidden"
      />
    </motion.div>
  );
};

export default FileBrowser;