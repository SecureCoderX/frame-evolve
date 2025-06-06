import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

/**
 * Professional Button Component
 * Supports multiple variants, sizes, states, and accessibility features
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {

  // Base button classes
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950',
    'disabled:cursor-not-allowed disabled:opacity-60',
    'select-none relative overflow-hidden'
  ];

  // Variant styles
  const variantClasses = {
    primary: [
      'bg-gradient-to-r from-blue-500 to-blue-600',
      'hover:from-blue-600 hover:to-blue-700',
      'active:from-blue-700 active:to-blue-800',
      'text-white shadow-lg',
      'hover:shadow-xl hover:shadow-blue-500/25',
      'focus:ring-blue-500',
      'disabled:from-slate-600 disabled:to-slate-600 disabled:shadow-none'
    ],
    
    secondary: [
      'bg-transparent border-2 border-slate-700',
      'hover:border-slate-600 hover:bg-slate-800/50',
      'active:border-slate-500 active:bg-slate-800/70',
      'text-slate-200 hover:text-white',
      'focus:ring-slate-500',
      'disabled:border-slate-700 disabled:text-slate-500'
    ],
    
    ghost: [
      'bg-transparent text-slate-300',
      'hover:bg-slate-800/50 hover:text-white',
      'active:bg-slate-800/70',
      'focus:ring-slate-500',
      'disabled:text-slate-600'
    ],
    
    danger: [
      'bg-gradient-to-r from-red-500 to-red-600',
      'hover:from-red-600 hover:to-red-700',
      'active:from-red-700 active:to-red-800',
      'text-white shadow-lg',
      'hover:shadow-xl hover:shadow-red-500/25',
      'focus:ring-red-500',
      'disabled:from-slate-600 disabled:to-slate-600 disabled:shadow-none'
    ],
    
    success: [
      'bg-gradient-to-r from-green-500 to-green-600',
      'hover:from-green-600 hover:to-green-700',
      'active:from-green-700 active:to-green-800',
      'text-white shadow-lg',
      'hover:shadow-xl hover:shadow-green-500/25',
      'focus:ring-green-500',
      'disabled:from-slate-600 disabled:to-slate-600 disabled:shadow-none'
    ],
    
    accent: [
      'bg-gradient-to-r from-purple-500 to-purple-600',
      'hover:from-purple-600 hover:to-purple-700',
      'active:from-purple-700 active:to-purple-800',
      'text-white shadow-lg',
      'hover:shadow-xl hover:shadow-purple-500/25',
      'focus:ring-purple-500',
      'disabled:from-slate-600 disabled:to-slate-600 disabled:shadow-none'
    ]
  };

  // Size styles
  const sizeClasses = {
    small: [
      'px-3 py-2 text-xs rounded-lg',
      'min-h-[32px]'
    ],
    medium: [
      'px-4 py-3 text-sm rounded-lg',
      'min-h-[40px]'
    ],
    large: [
      'px-6 py-4 text-base rounded-xl',
      'min-h-[48px]'
    ]
  };

  // Icon spacing
  const iconSpacing = {
    small: 'gap-2',
    medium: 'gap-2',
    large: 'gap-3'
  };

  // Loading spinner size
  const spinnerSize = {
    small: 14,
    medium: 16,
    large: 18
  };

  // Combine all classes
  const buttonClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    iconSpacing[size],
    {
      'w-full': fullWidth,
      'pointer-events-none': loading || disabled
    },
    className
  );

  // Handle click
  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  // Render icon
  const renderIcon = (position) => {
    if (loading && position === 'left') {
      return <Loader2 size={spinnerSize[size]} className="animate-spin" />;
    }
    
    if (icon && iconPosition === position) {
      return React.cloneElement(icon, { size: spinnerSize[size] });
    }
    
    return null;
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      {...props}
    >
      {/* Shimmer effect for primary buttons */}
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
      
      {/* Left icon */}
      {renderIcon('left')}
      
      {/* Button text */}
      <span className={clsx(
        'relative z-10',
        loading && iconPosition === 'left' ? 'ml-1' : '',
        loading && iconPosition === 'right' ? 'mr-1' : ''
      )}>
        {children}
      </span>
      
      {/* Right icon */}
      {renderIcon('right')}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;