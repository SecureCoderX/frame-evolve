import React from 'react';

/**
 * Drag region component for window movement
 * Creates draggable areas in the titlebar while preserving click functionality for child elements
 */
const DragRegion = ({ children, className = '', disabled = false, ...props }) => {
  
  const handleDoubleClick = async (e) => {
    // Prevent double-click when disabled
    if (disabled) return;
    
    // Only handle double-click on the drag region itself or its children
    e.preventDefault();

    // Double-click to maximize/restore window
    if (window.electronAPI) {
      await window.electronAPI.windowControls.maximize();
    }
  };

  return (
    <div
      className={`drag-region ${className}`}
      onDoubleClick={handleDoubleClick}
      style={{
        WebkitAppRegion: disabled ? 'no-drag' : 'drag',
        userSelect: 'none',
        cursor: 'default'
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default DragRegion;