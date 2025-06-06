/**
 * Frame Evolve Design System - Color Tokens
 * Professional color palette with semantic meanings and accessibility compliance
 */

// Brand Colors - Frame Evolve Identity
export const brand = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main brand blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },
  
  accent: {
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff', 
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7', // Main accent purple
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764'
    },
    
    cyan: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4', // Accent cyan for highlights
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63'
    }
  }
};

// Surface Colors - Dark Theme Optimized
export const surface = {
  // Main backgrounds
  950: '#020617', // Deepest background
  900: '#0f172a', // Main app background
  850: '#1a202c', // Slightly elevated
  800: '#1e293b', // Card backgrounds
  750: '#2d3748', // Hover states
  700: '#334155', // Border colors
  600: '#475569', // Disabled backgrounds
  500: '#64748b', // Muted text
  
  // Overlay and transparency variants
  overlay: {
    light: 'rgba(15, 23, 42, 0.8)',   // surface-900 with opacity
    medium: 'rgba(15, 23, 42, 0.9)',  // surface-900 with opacity
    heavy: 'rgba(15, 23, 42, 0.95)',  // surface-900 with opacity
  },
  
  // Glass morphism effects
  glass: {
    light: 'rgba(30, 41, 59, 0.1)',   // surface-800 with low opacity
    medium: 'rgba(30, 41, 59, 0.2)',  // surface-800 with medium opacity
    heavy: 'rgba(30, 41, 59, 0.4)',   // surface-800 with high opacity
  }
};

// Text Colors - Hierarchical and accessible
export const text = {
  primary: '#ffffff',     // Main text - pure white
  secondary: '#e2e8f0',   // Secondary text - slate-200
  tertiary: '#cbd5e1',    // Tertiary text - slate-300
  quaternary: '#94a3b8',  // Muted text - slate-400
  disabled: '#64748b',    // Disabled text - slate-500
  
  // On colored backgrounds
  onPrimary: '#ffffff',   // Text on primary blue
  onSecondary: '#1e293b', // Text on light backgrounds
  onAccent: '#ffffff',    // Text on accent colors
  
  // Inverse for light themes
  inverse: {
    primary: '#0f172a',
    secondary: '#334155',
    tertiary: '#475569'
  }
};

// Semantic Colors - Meaning-based colors
export const semantic = {
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main success green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Main warning amber
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Main error red
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d'
  },
  
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main info blue (matches brand)
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  }
};

// Interactive States - For buttons, inputs, etc.
export const interactive = {
  // Button states
  button: {
    primary: {
      default: brand.primary[500],
      hover: brand.primary[600],
      active: brand.primary[700],
      disabled: surface[600],
      focus: brand.primary[400]
    },
    
    secondary: {
      default: 'transparent',
      hover: surface.glass.light,
      active: surface.glass.medium,
      disabled: surface[700],
      focus: brand.primary[500]
    },
    
    ghost: {
      default: 'transparent',
      hover: surface[800],
      active: surface[750],
      disabled: 'transparent',
      focus: surface[700]
    }
  },
  
  // Input states
  input: {
    default: {
      background: surface[800],
      border: surface[700],
      text: text.primary
    },
    
    hover: {
      background: surface[750],
      border: surface[600],
      text: text.primary
    },
    
    focus: {
      background: surface[800],
      border: brand.primary[500],
      text: text.primary,
      ring: `${brand.primary[500]}40` // 40 = 25% opacity
    },
    
    error: {
      background: surface[800],
      border: semantic.error[500],
      text: text.primary,
      ring: `${semantic.error[500]}40`
    },
    
    success: {
      background: surface[800],
      border: semantic.success[500],
      text: text.primary,
      ring: `${semantic.success[500]}40`
    },
    
    disabled: {
      background: surface[850],
      border: surface[700],
      text: text.disabled
    }
  }
};

// Border Colors - Consistent border system
export const border = {
  default: surface[700],     // Standard borders
  subtle: surface[750],      // Very subtle borders
  strong: surface[600],      // Prominent borders
  focus: brand.primary[500], // Focus rings
  error: semantic.error[500],
  success: semantic.success[500],
  warning: semantic.warning[500]
};

// Shadow System - Elevation and depth
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Colored shadows for brand elements
  primary: `0 10px 15px -3px ${brand.primary[500]}20, 0 4px 6px -2px ${brand.primary[500]}10`,
  accent: `0 10px 15px -3px ${brand.accent.purple[500]}20, 0 4px 6px -2px ${brand.accent.purple[500]}10`,
  
  // Inner shadows
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
};

// Gradients - For special elements and branding
export const gradients = {
  // Brand gradients
  primary: `linear-gradient(135deg, ${brand.primary[500]} 0%, ${brand.primary[600]} 100%)`,
  primaryToAccent: `linear-gradient(135deg, ${brand.primary[500]} 0%, ${brand.accent.purple[500]} 100%)`,
  accentToPrimary: `linear-gradient(135deg, ${brand.accent.purple[500]} 0%, ${brand.primary[500]} 100%)`,
  
  // Subtle surface gradients
  surface: `linear-gradient(135deg, ${surface[800]} 0%, ${surface[850]} 100%)`,
  surfaceHover: `linear-gradient(135deg, ${surface[750]} 0%, ${surface[800]} 100%)`,
  
  // Overlay gradients
  overlayTop: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.8) 0%, transparent 100%)',
  overlayBottom: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 100%)',
  
  // Text gradients
  textPrimary: `linear-gradient(135deg, ${brand.primary[400]} 0%, ${brand.accent.purple[400]} 100%)`,
  textAccent: `linear-gradient(135deg, ${brand.accent.purple[400]} 0%, ${brand.accent.cyan[400]} 100%)`
};

// Export complete color system
export const colors = {
  brand,
  surface,
  text,
  semantic,
  interactive,
  border,
  shadows,
  gradients
};

export default colors;