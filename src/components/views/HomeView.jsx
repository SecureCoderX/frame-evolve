import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Upload, Settings, Zap } from 'lucide-react';

// Try different import approaches to debug the issue

// Option 1: Try importing from existing UI components (most likely to work)
// import Button from '../ui/Button';

// Option 2: Try direct imports from design system
// import Button from '../../design-system/components/atoms/Button';
// import Card from '../../design-system/components/molecules/Card';

// Option 3: For now, let's create inline components to isolate the issue
const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, ...props }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-lg font-medium transition-all duration-200
      ${variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
        variant === 'secondary' ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600' :
        'bg-transparent hover:bg-slate-800 text-slate-400'}
      ${size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2'}
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = '', variant = 'default', onClick, ...props }) => (
  <div
    onClick={onClick}
    className={`
      rounded-lg border transition-all duration-200
      ${variant === 'interactive' ? 
        'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800/70 hover:scale-105' :
        'border-slate-700 bg-slate-800/50'}
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

const HomeView = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const quickActions = [
    {
      icon: Upload,
      title: 'Upload Video',
      description: 'Drag & drop or browse for video files',
      action: () => {
        document.getElementById('file-input')?.click();
      }
    },
    {
      icon: Zap,
      title: 'Quick Enhance',
      description: 'AI-powered automatic enhancement',
      action: () => console.log('Quick enhance clicked'),
      disabled: !selectedFile
    },
    {
      icon: Settings,
      title: 'Custom Settings',
      description: 'Advanced enhancement controls',
      action: () => console.log('Custom settings clicked'),
      disabled: !selectedFile
    },
    {
      icon: Play,
      title: 'Preview',
      description: 'Preview enhanced video',
      action: () => console.log('Preview clicked'),
      disabled: !selectedFile
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Frame Evolve
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Professional video upscaling and enhancement powered by AI
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card
                key={action.title}
                variant={action.disabled ? 'default' : 'interactive'}
                className={`p-4 text-center space-y-3 ${
                  action.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={!action.disabled ? action.action : undefined}
              >
                <div className={`
                  mx-auto w-12 h-12 rounded-lg flex items-center justify-center
                  ${action.disabled ? 
                    'bg-slate-700/50 border border-slate-600/50' : 
                    'bg-blue-500/20 border border-blue-500/30'}
                `}>
                  <IconComponent 
                    size={24} 
                    className={action.disabled ? 'text-slate-500' : 'text-blue-400'} 
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">{action.title}</h3>
                  <p className="text-sm text-slate-400">{action.description}</p>
                </div>
              </Card>
            );
          })}
        </motion.div>

        {/* Current File Status */}
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-slate-200">Current Project</h2>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                    <Play size={24} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">{selectedFile.name}</h3>
                    <p className="text-sm text-slate-400">
                      Ready for processing • {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm">
                    Settings
                  </Button>
                  <Button variant="primary" size="sm">
                    Start Processing
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-slate-200">
              {selectedFile ? 'Upload Another Video' : 'Get Started'}
            </h2>
            <p className="text-slate-400">
              {selectedFile ? 
                'Process multiple videos or replace the current one' : 
                'Upload your video file to begin enhancement'}
            </p>
          </div>

          {/* Temporary Upload Area - No Input Components Yet */}
          <div className="max-w-4xl mx-auto">
            <div 
              className="relative border-2 border-dashed border-slate-600 rounded-xl p-8 text-center transition-all duration-300 hover:border-slate-500 hover:bg-slate-800/30 cursor-pointer"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div className="flex flex-col items-center space-y-4">
                <Upload size={48} className="text-slate-400" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-200">
                    Drop video files here
                  </h3>
                  <p className="text-sm text-slate-400 max-w-sm">
                    Supports MP4, AVI, MOV, MKV and other video formats
                  </p>
                </div>
                <Button variant="secondary" size="sm">
                  Browse Files
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Status Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center p-6 rounded-lg border border-blue-500/30 bg-blue-500/10"
        >
          <h3 className="text-lg font-semibold text-blue-400 mb-2">
            🔧 Debug Mode: Testing Basic Components
          </h3>
          <p className="text-blue-300 text-sm">
            This version uses inline components to isolate import issues.<br/>
            Once this works, we'll gradually add back the enhanced upload components.
          </p>
        </motion.div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-slate-200 text-center">
            Why Choose Frame Evolve?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <Zap size={32} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">AI-Powered Enhancement</h3>
                <p className="text-slate-400">
                  Advanced algorithms automatically enhance video quality, sharpness, and detail
                </p>
              </div>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Upload size={32} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Simple Workflow</h3>
                <p className="text-slate-400">
                  Drag, drop, and enhance. Professional results with minimal effort required
                </p>
              </div>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <Settings size={32} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Full Control</h3>
                <p className="text-slate-400">
                  Fine-tune every aspect of enhancement with professional-grade controls
                </p>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeView;