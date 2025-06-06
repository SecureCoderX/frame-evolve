import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

/**
 * Professional Badge Component
 * Perfect for status indicators, counts, labels, and tags
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  shape = 'rounded',
  icon = null,
  iconPosition = 'left',
  removable = false,
  onRemove = null,
  className = '',
  ...props
}) => {

  // Base badge classes
  const baseClasses = [
    'inline-flex items-center font-medium',
    'transition-all duration-200',
    'select-none relative'
  ];

  // Variant styles
  const variantClasses = {
    default: [
      'bg-slate-700/50 text-slate-200',
      'border border-slate-600/50',
      'hover:bg-slate-700/70'
    ],
    
    primary: [
      'bg-blue-500/20 text-blue-300',
      'border border-blue-500/30',
      'hover:bg-blue-500/30'
    ],
    
    secondary: [
      'bg-slate-600/30 text-slate-300',
      'border border-slate-500/30',
      'hover:bg-slate-600/50'
    ],
    
    success: [
      'bg-green-500/20 text-green-300',
      'border border-green-500/30',
      'hover:bg-green-500/30'
    ],
    
    warning: [
      'bg-amber-500/20 text-amber-300',
      'border border-amber-500/30',
      'hover:bg-amber-500/30'
    ],
    
    error: [
      'bg-red-500/20 text-red-300',
      'border border-red-500/30',
      'hover:bg-red-500/30'
    ],
    
    info: [
      'bg-cyan-500/20 text-cyan-300',
      'border border-cyan-500/30',
      'hover:bg-cyan-500/30'
    ],
    
    accent: [
      'bg-purple-500/20 text-purple-300',
      'border border-purple-500/30',
      'hover:bg-purple-500/30'
    ],
    
    gradient: [
      'bg-gradient-to-r from-blue-500/20 to-purple-500/20',
      'border border-blue-500/30',
      'text-transparent bg-clip-text',
      'bg-gradient-to-r from-blue-300 to-purple-300',
      'hover:from-blue-400 hover:to-purple-400'
    ],
    
    solid: [
      'bg-blue-500 text-white',
      'border border-blue-600',
      'hover:bg-blue-600'
    ],
    
    outline: [
      'bg-transparent text-slate-300',
      'border-2 border-slate-600',
      'hover:bg-slate-800/50 hover:border-slate-500'
    ]
  };

  // Size classes
  const sizeClasses = {
    small: [
      'px-2 py-1 text-xs',
      'gap-1 min-h-[20px]'
    ],
    medium: [
      'px-2.5 py-1.5 text-xs',
      'gap-1.5 min-h-[24px]'
    ],
    large: [
      'px-3 py-2 text-sm',
      'gap-2 min-h-[28px]'
    ]
  };

  // Shape classes
  const shapeClasses = {
    rounded: 'rounded-md',
    pill: 'rounded-full',
    square: 'rounded-none'
  };

  // Icon sizes
  const iconSizes = {
    small: 12,
    medium: 14,
    large: 16
  };

  // Combine all classes
  const badgeClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    {
      'cursor-pointer': removable || props.onClick,
      'pr-1': removable && size === 'small',
      'pr-1.5': removable && size === 'medium',
      'pr-2': removable && size === 'large'
    },
    className
  );

  // Handle remove
  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove?.();
  };

  // Render icon
  const renderIcon = (position) => {
    if (icon && iconPosition === position) {
      return React.cloneElement(icon, { 
        size: iconSizes[size],
        className: 'flex-shrink-0'
      });
    }
    return null;
  };

  // Render remove button
  const renderRemoveButton = () => {
    if (!removable) return null;

    return (
      <motion.button
        onClick={handleRemove}
        className={clsx(
          'ml-1 flex-shrink-0 rounded-full',
          'hover:bg-black/20 transition-colors',
          {
            'p-0.5': size === 'small',
            'p-1': size === 'medium' || size === 'large'
          }
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Remove"
      >
        <svg
          className={clsx({
            'w-2.5 h-2.5': size === 'small',
            'w-3 h-3': size === 'medium',
            'w-3.5 h-3.5': size === 'large'
          })}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
    );
  };

  return (
    <motion.span
      className={badgeClasses}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={props.onClick ? { scale: 1.05 } : {}}
      whileTap={props.onClick ? { scale: 0.95 } : {}}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      {...props}
    >
      {/* Left icon */}
      {renderIcon('left')}
      
      {/* Badge content */}
      <span className="truncate">
        {children}
      </span>
      
      {/* Right icon */}
      {renderIcon('right')}
      
      {/* Remove button */}
      {renderRemoveButton()}
      
      {/* Pulse animation for certain variants */}
      {(variant === 'error' || variant === 'warning') && (
        <motion.div
          className={clsx(
            'absolute inset-0 rounded-inherit',
            {
              'bg-red-500/20': variant === 'error',
              'bg-amber-500/20': variant === 'warning'
            }
          )}
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.span>
  );
};

export default Badge;