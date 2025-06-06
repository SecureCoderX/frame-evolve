/**
 * Utility functions for formatting data in Frame Evolve
 * Used by input components and throughout the application
 */

/**
 * Format file size in human-readable format
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted file size (e.g., "1.5 GB")
 */
export const formatFileSize = (bytes, decimals = 1) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format duration in human-readable format
 * @param {number} milliseconds - Duration in milliseconds
 * @param {boolean} includeMs - Whether to include milliseconds (default: false)
 * @returns {string} Formatted duration (e.g., "2:30", "1:30:45")
 */
export const formatDuration = (milliseconds, includeMs = false) => {
  if (!milliseconds || milliseconds < 0) return '0:00';
  
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10); // Two digit milliseconds
  
  let formatted = '';
  
  if (hours > 0) {
    formatted += `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    formatted += `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  if (includeMs) {
    formatted += `.${ms.toString().padStart(2, '0')}`;
  }
  
  return formatted;
};

/**
 * Format timestamp for display
 * @param {Date|number} timestamp - Date object or timestamp
 * @param {string} format - Format type: 'relative', 'short', 'long' (default: 'relative')
 * @returns {string} Formatted timestamp
 */
export const formatTimestamp = (timestamp, format = 'relative') => {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  switch (format) {
    case 'relative':
      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 30) return `${diffDays}d ago`;
      return date.toLocaleDateString();
      
    case 'short':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      
    case 'long':
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
    default:
      return date.toLocaleDateString();
  }
};

/**
 * Format resolution for display
 * @param {Object} resolution - Resolution object with width and height
 * @param {boolean} includeAspectRatio - Whether to include aspect ratio (default: false)
 * @returns {string} Formatted resolution (e.g., "1920×1080" or "1920×1080 (16:9)")
 */
export const formatResolution = (resolution, includeAspectRatio = false) => {
  if (!resolution || !resolution.width || !resolution.height) {
    return 'Unknown';
  }
  
  const { width, height } = resolution;
  let formatted = `${width}×${height}`;
  
  if (includeAspectRatio) {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    const aspectWidth = width / divisor;
    const aspectHeight = height / divisor;
    formatted += ` (${aspectWidth}:${aspectHeight})`;
  }
  
  return formatted;
};

/**
 * Format bitrate for display
 * @param {number} bitsPerSecond - Bitrate in bits per second
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted bitrate (e.g., "5.2 Mbps")
 */
export const formatBitrate = (bitsPerSecond, decimals = 1) => {
  if (!bitsPerSecond || bitsPerSecond <= 0) return '0 bps';
  
  const units = ['bps', 'Kbps', 'Mbps', 'Gbps'];
  const k = 1000; // Using 1000 for bitrates, not 1024
  
  const i = Math.floor(Math.log(bitsPerSecond) / Math.log(k));
  const value = (bitsPerSecond / Math.pow(k, i)).toFixed(decimals);
  
  return `${value} ${units[i]}`;
};

/**
 * Format percentage for display
 * @param {number} value - Percentage value (0-100)
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted percentage (e.g., "75%")
 */
export const formatPercentage = (value, decimals = 0) => {
  if (typeof value !== 'number') return '0%';
  
  const clamped = Math.max(0, Math.min(100, value));
  return `${clamped.toFixed(decimals)}%`;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text || '';
  
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Format codec name for display
 * @param {string} codec - Codec string
 * @returns {string} Formatted codec name
 */
export const formatCodec = (codec) => {
  if (!codec) return 'Unknown';
  
  const codecMap = {
    'h264': 'H.264',
    'h265': 'H.265 (HEVC)',
    'hevc': 'H.265 (HEVC)',
    'vp8': 'VP8',
    'vp9': 'VP9',
    'av1': 'AV1',
    'aac': 'AAC',
    'mp3': 'MP3',
    'flac': 'FLAC',
    'opus': 'Opus'
  };
  
  const normalized = codec.toLowerCase().replace(/[^a-z0-9]/g, '');
  return codecMap[normalized] || codec.toUpperCase();
};