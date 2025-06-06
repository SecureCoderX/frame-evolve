import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

/**
 * Professional Icon Component
 * Wrapper for Lucide React icons with consistent styling and animations
 */
const Icon = ({
  icon: IconComponent,
  size = 'medium',
  variant = 'default',
  color = 'current',
  animation = 'none',
  interactive = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {

  // Size mappings
  const sizeMap = {
    xs: 12,
    small: 16,
    medium: 20,
    large: 24,
    xl: 28,
    '2xl': 32,
    '3xl': 40
  };

  // Get numeric size
  const iconSize = typeof size === 'number' ? size : sizeMap[size] || sizeMap.medium;

  // Base icon classes
  const baseClasses = [
    'flex-shrink-0',
    'transition-all duration-200'
  ];

  // Variant classes
  const variantClasses = {
    default: 'text-slate-400',
    primary: 'text-blue-400',
    secondary: 'text-slate-300',
    success: 'text-green-400',
    warning: 'text-amber-400',
    error: 'text-red-400',
    info: 'text-cyan-400',
    accent: 'text-purple-400',
    muted: 'text-slate-500',
    bright: 'text-white'
  };

  // Interactive states
  const interactiveClasses = {
    true: [
      'cursor-pointer',
      'hover:scale-110 hover:text-white',
      'active:scale-95',
      'focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded'
    ],
    false: []
  };

  // Disabled state
  const disabledClasses = disabled ? [
    'opacity-50 cursor-not-allowed',
    'pointer-events-none'
  ] : [];

  // Color override
  const colorClasses = color !== 'current' ? {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
    red: 'text-red-400',
    amber: 'text-amber-400',
    cyan: 'text-cyan-400',
    slate: 'text-slate-400',
    white: 'text-white'
  }[color] || `text-${color}` : '';

  // Animation variants
  const animationVariants = {
    none: {},
    
    spin: {
      animate: { rotate: 360 },
      transition: { duration: 1, repeat: Infinity, ease: 'linear' }
    },
    
    pulse: {
      animate: { 
        scale: [1, 1.1, 1],
        opacity: [1, 0.8, 1]
      },
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
    },
    
    bounce: {
      animate: { y: [0, -4, 0] },
      transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
    },
    
    wiggle: {
      animate: { rotate: [-3, 3, -3] },
      transition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
    },
    
    heartbeat: {
      animate: { scale: [1, 1.2, 1, 1.2, 1] },
      transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
    },
    
    float: {
      animate: { y: [0, -6, 0] },
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  // Hover animations for interactive icons
  const hoverVariants = interactive ? {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.15, ease: 'easeOut' }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1, ease: 'easeOut' }
    }
  } : {};

  // Combine all classes
  const iconClasses = clsx(
    baseClasses,
    variantClasses[variant],
    interactiveClasses[interactive],
    disabledClasses,
    colorClasses || variantClasses[variant],
    className
  );

  // Handle click
  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
  };

  // If no icon component provided, return null
  if (!IconComponent) return null;

  return (
    <motion.div
      className={iconClasses}
      onClick={handleClick}
      variants={hoverVariants}
      whileHover={interactive ? 'hover' : undefined}
      whileTap={interactive ? 'tap' : undefined}
      {...animationVariants[animation]}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive && !disabled ? 0 : -1}
      {...props}
    >
      <IconComponent 
        size={iconSize}
        className="w-full h-full"
        strokeWidth={1.5}
      />
    </motion.div>
  );
};

// Convenience components for common icon patterns
export const LoadingIcon = ({ size = 'medium', className = '', ...props }) => (
  <Icon
    icon={({ size: iconSize, className: iconClassName }) => (
      <div className={clsx('animate-spin', iconClassName)} style={{ width: iconSize, height: iconSize }}>
        <svg fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )}
    size={size}
    className={className}
    {...props}
  />
);

export const StatusIcon = ({ status = 'default', size = 'medium', ...props }) => {
  const statusIcons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ⓘ',
    default: '◯'
  };

  const statusColors = {
    success: 'success',
    error: 'error', 
    warning: 'warning',
    info: 'info',
    default: 'default'
  };

  return (
    <Icon
      icon={({ size: iconSize, className }) => (
        <div 
          className={clsx('flex items-center justify-center font-bold', className)}
          style={{ width: iconSize, height: iconSize, fontSize: iconSize * 0.7 }}
        >
          {statusIcons[status]}
        </div>
      )}
      variant={statusColors[status]}
      size={size}
      {...props}
    />
  );
};

export const FrameEvolveIcon = ({ size = 'medium', animated = false, ...props }) => (
  <Icon
    icon={({ size: iconSize, className }) => (
      <div className={clsx('rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center', className)} 
           style={{ width: iconSize, height: iconSize }}>
        <svg 
          width={iconSize * 0.7} 
          height={iconSize * 0.7} 
          viewBox="0 0 24 24" 
          fill="white"
        >
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fillOpacity="0.3"/>
          <path d="M17 7H7c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1z"/>
          <path d="M9 10l2 2-2 2M15 14l-2-2 2-2" stroke="white" strokeWidth="1" fill="none"/>
        </svg>
      </div>
    )}
    animation={animated ? 'pulse' : 'none'}
    size={size}
    {...props}
  />
);

export default Icon;