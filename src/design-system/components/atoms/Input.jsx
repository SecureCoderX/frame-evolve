import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * Professional Input Component
 * Supports multiple types, validation states, icons, and accessibility
 */
const Input = forwardRef(({
  label = '',
  placeholder = '',
  type = 'text',
  value = '',
  error = '',
  success = '',
  disabled = false,
  required = false,
  size = 'medium',
  leftIcon = null,
  rightIcon = null,
  showPasswordToggle = false,
  className = '',
  onChange,
  onFocus,
  onBlur,
  ...props
}, ref) => {

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [internalType, setInternalType] = useState(type);

  // Update internal type when showPassword changes
  React.useEffect(() => {
    if (type === 'password') {
      setInternalType(showPassword ? 'text' : 'password');
    }
  }, [showPassword, type]);

  // Determine validation state
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success);
  const hasValue = Boolean(value);

  // Base input classes
  const baseClasses = [
    'w-full transition-all duration-200',
    'bg-slate-800 border border-slate-700',
    'text-white placeholder-slate-400',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950',
    'disabled:bg-slate-850 disabled:text-slate-500 disabled:cursor-not-allowed',
    'disabled:placeholder-slate-600'
  ];

  // Size classes
  const sizeClasses = {
    small: [
      'px-3 py-2 text-sm rounded-lg',
      'min-h-[36px]'
    ],
    medium: [
      'px-4 py-3 text-sm rounded-lg',
      'min-h-[44px]'
    ],
    large: [
      'px-4 py-4 text-base rounded-xl',
      'min-h-[52px]'
    ]
  };

  // State-specific classes
  const stateClasses = {
    default: [
      'border-slate-700 hover:border-slate-600',
      'focus:border-blue-500 focus:ring-blue-500/20'
    ],
    error: [
      'border-red-500 hover:border-red-400',
      'focus:border-red-500 focus:ring-red-500/20'
    ],
    success: [
      'border-green-500 hover:border-green-400',
      'focus:border-green-500 focus:ring-green-500/20'
    ]
  };

  // Determine current state
  const currentState = hasError ? 'error' : hasSuccess ? 'success' : 'default';

  // Combine input classes
  const inputClasses = clsx(
    baseClasses,
    sizeClasses[size],
    stateClasses[currentState],
    {
      'pl-10': leftIcon,
      'pr-10': rightIcon || (type === 'password' && showPasswordToggle),
      'pr-16': rightIcon && (type === 'password' && showPasswordToggle)
    },
    className
  );

  // Label classes
  const labelClasses = clsx(
    'block text-sm font-medium mb-2',
    {
      'text-slate-200': !hasError && !hasSuccess,
      'text-red-400': hasError,
      'text-green-400': hasSuccess,
      'text-slate-500': disabled
    }
  );

  // Message classes
  const messageClasses = clsx(
    'mt-2 text-xs flex items-center gap-1',
    {
      'text-red-400': hasError,
      'text-green-400': hasSuccess
    }
  );

  // Handle focus
  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  // Handle blur
  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Icon size based on input size
  const iconSize = {
    small: 16,
    medium: 18,
    large: 20
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            {React.cloneElement(leftIcon, { size: iconSize[size] })}
          </div>
        )}

        {/* Input Field */}
        <motion.input
          ref={ref}
          type={internalType}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          {...props}
        />

        {/* Right Icons Container */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {/* Validation Icon */}
          {hasError && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-red-400"
            >
              <AlertCircle size={iconSize[size]} />
            </motion.div>
          )}
          
          {hasSuccess && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-green-400"
            >
              <CheckCircle2 size={iconSize[size]} />
            </motion.div>
          )}

          {/* Password Toggle */}
          {type === 'password' && showPasswordToggle && (
            <motion.button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? (
                <EyeOff size={iconSize[size]} />
              ) : (
                <Eye size={iconSize[size]} />
              )}
            </motion.button>
          )}

          {/* Custom Right Icon */}
          {rightIcon && (
            <div className="text-slate-400">
              {React.cloneElement(rightIcon, { size: iconSize[size] })}
            </div>
          )}
        </div>

        {/* Focus Ring Animation */}
        {isFocused && (
          <motion.div
            className={clsx(
              'absolute inset-0 rounded-lg pointer-events-none',
              {
                'ring-2 ring-blue-500/20': currentState === 'default',
                'ring-2 ring-red-500/20': currentState === 'error',
                'ring-2 ring-green-500/20': currentState === 'success'
              }
            )}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* Helper Text / Error Message */}
      {(error || success) && (
        <motion.div
          className={messageClasses}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {hasError && <AlertCircle size={12} />}
          {hasSuccess && <CheckCircle2 size={12} />}
          <span>{error || success}</span>
        </motion.div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;