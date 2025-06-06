import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileVideo, 
  Clock, 
  Monitor, 
  HardDrive, 
  Settings,
  Film,
  Volume2,
  Info
} from 'lucide-react';
import { Badge } from '../../design-system/components/atoms';
import { formatFileSize, formatDuration } from '../../utils/formatters';

const FileInfoDisplay = ({ 
  file,
  metadata = {},
  className = ""
}) => {
  if (!file) return null;

  const {
    duration,
    resolution,
    frameRate,
    bitrate,
    codec,
    audioCodec,
    audioChannels,
    aspectRatio,
    colorSpace,
    size: metadataSize
  } = metadata;

  const infoSections = [
    {
      title: 'File Information',
      icon: FileVideo,
      items: [
        { label: 'Name', value: file.name },
        { label: 'Size', value: formatFileSize(file.size) },
        { label: 'Type', value: file.type.split('/')[1].toUpperCase() },
        { label: 'Last Modified', value: new Date(file.lastModified).toLocaleDateString() }
      ]
    },
    {
      title: 'Video Properties',
      icon: Monitor,
      items: [
        duration && { label: 'Duration', value: formatDuration(duration * 1000) },
        resolution && { label: 'Resolution', value: `${resolution.width}×${resolution.height}` },
        frameRate && { label: 'Frame Rate', value: `${frameRate} fps` },
        aspectRatio && { label: 'Aspect Ratio', value: aspectRatio },
        codec && { label: 'Video Codec', value: codec.toUpperCase() },
        colorSpace && { label: 'Color Space', value: colorSpace }
      ].filter(Boolean)
    },
    {
      title: 'Audio Properties',
      icon: Volume2,
      items: [
        audioCodec && { label: 'Audio Codec', value: audioCodec.toUpperCase() },
        audioChannels && { label: 'Channels', value: audioChannels },
        bitrate && { label: 'Bitrate', value: `${Math.round(bitrate / 1000)} kbps` }
      ].filter(Boolean)
    }
  ].filter(section => section.items.length > 0);

  const getQualityBadge = () => {
    if (!resolution) return null;
    
    const { width, height } = resolution;
    const totalPixels = width * height;
    
    if (totalPixels >= 3840 * 2160) return { text: '4K', variant: 'success' };
    if (totalPixels >= 2560 * 1440) return { text: '1440p', variant: 'info' };
    if (totalPixels >= 1920 * 1080) return { text: '1080p', variant: 'secondary' };
    if (totalPixels >= 1280 * 720) return { text: '720p', variant: 'warning' };
    return { text: 'SD', variant: 'error' };
  };

  const qualityBadge = getQualityBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm
        ${className}
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
              <Info size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">File Details</h3>
              <p className="text-xs text-slate-400">Video metadata and properties</p>
            </div>
          </div>
          
          {qualityBadge && (
            <Badge variant={qualityBadge.variant} size="sm">
              {qualityBadge.text}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {infoSections.map((section, sectionIndex) => {
          const SectionIcon = section.icon;
          
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="space-y-3"
            >
              {/* Section Header */}
              <div className="flex items-center space-x-2">
                <SectionIcon size={16} className="text-slate-400" />
                <h4 className="text-xs font-medium text-slate-300 uppercase tracking-wide">
                  {section.title}
                </h4>
              </div>

              {/* Section Items */}
              <div className="grid grid-cols-1 gap-2">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                    className="flex items-center justify-between py-2 px-3 rounded-lg 
                             bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                  >
                    <span className="text-sm text-slate-400">{item.label}</span>
                    <span className="text-sm font-medium text-slate-200 text-right">
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Enhancement Recommendations */}
        {resolution && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4 border-t border-slate-700/50"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Settings size={16} className="text-slate-400" />
              <h4 className="text-xs font-medium text-slate-300 uppercase tracking-wide">
                Enhancement Suggestions
              </h4>
            </div>
            
            <div className="space-y-2">
              {resolution.width < 1920 && (
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-xs text-blue-400">
                    <strong>Upscale to 1080p:</strong> Recommended for better quality
                  </p>
                </div>
              )}
              
              {resolution.width >= 1920 && resolution.width < 3840 && (
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-xs text-purple-400">
                    <strong>Upscale to 4K:</strong> Maximum quality enhancement available
                  </p>
                </div>
              )}
              
              {frameRate && frameRate < 30 && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-xs text-green-400">
                    <strong>Frame Rate Enhancement:</strong> Interpolate to 30fps or 60fps
                  </p>
                </div>
              )}
              
              {(!bitrate || bitrate < 5000000) && (
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-xs text-yellow-400">
                    <strong>Quality Enhancement:</strong> AI denoising and sharpening recommended
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FileInfoDisplay;