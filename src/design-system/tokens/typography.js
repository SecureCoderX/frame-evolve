/**
 * Frame Evolve Design System - Typography Tokens
 * Professional typography scale with consistent spacing and hierarchy
 */

// Font Families
export const fontFamilies = {
  // Primary sans-serif font stack
  sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ].join(', '),
  
  // Monospace for code and technical content
  mono: [
    'SF Mono',
    'Monaco',
    'Cascadia Code',
    'Roboto Mono',
    'Courier New',
    'monospace'
  ].join(', '),
  
  // Display font for special headings (optional)
  display: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'sans-serif'
  ].join(', ')
};

// Font Weights
export const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900
};

// Font Sizes - Using a modular scale
export const fontSizes = {
  // Tiny text (legal, captions)
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  
  // Body text
  base: '1rem',     // 16px (base)
  lg: '1.125rem',   // 18px
  
  // Headings
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  
  // Display sizes
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem',  // 72px
  '8xl': '6rem',    // 96px
  '9xl': '8rem'     // 128px
};

// Line Heights - Proportional to font sizes
export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
  
  // Specific line heights for each font size
  xs: 1.5,      // 18px
  sm: 1.43,     // 20px  
  base: 1.5,    // 24px
  lg: 1.56,     // 28px
  xl: 1.6,      // 32px
  '2xl': 1.33,  // 32px
  '3xl': 1.27,  // 38px
  '4xl': 1.22,  // 44px
  '5xl': 1.17,  // 56px
  '6xl': 1.13,  // 68px
  '7xl': 1.11,  // 80px
  '8xl': 1.08,  // 104px
  '9xl': 1.06   // 136px
};

// Letter Spacing - For different text styles
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
};

// Typography Scale - Complete text styles
export const textStyles = {
  // Display Text - For hero sections and major headings
  display: {
    '4xl': {
      fontSize: fontSizes['4xl'],
      lineHeight: lineHeights['4xl'],
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.tight,
      fontFamily: fontFamilies.display
    },
    
    '3xl': {
      fontSize: fontSizes['3xl'],
      lineHeight: lineHeights['3xl'],
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.tight,
      fontFamily: fontFamilies.display
    },
    
    '2xl': {
      fontSize: fontSizes['2xl'],
      lineHeight: lineHeights['2xl'],
      fontWeight: fontWeights.semiBold,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.display
    }
  },
  
  // Headings - For section headers and important content
  heading: {
    h1: {
      fontSize: fontSizes['3xl'],
      lineHeight: lineHeights['3xl'],
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.tight,
      fontFamily: fontFamilies.sans
    },
    
    h2: {
      fontSize: fontSizes['2xl'],
      lineHeight: lineHeights['2xl'],
      fontWeight: fontWeights.semiBold,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    },
    
    h3: {
      fontSize: fontSizes.xl,
      lineHeight: lineHeights.xl,
      fontWeight: fontWeights.semiBold,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    },
    
    h4: {
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    },
    
    h5: {
      fontSize: fontSizes.base,
      lineHeight: lineHeights.base,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    },
    
    h6: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.wide,
      fontFamily: fontFamilies.sans
    }
  },
  
  // Body Text - For paragraphs and general content
  body: {
    large: {
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    },
    
    medium: {
      fontSize: fontSizes.base,
      lineHeight: lineHeights.base,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    },
    
    small: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    }
  },
  
  // Labels - For form labels and UI text
  label: {
    large: {
      fontSize: fontSizes.base,
      lineHeight: lineHeights.base,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    },
    
    medium: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    },
    
    small: {
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.xs,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.wide,
      fontFamily: fontFamilies.sans
    }
  },
  
  // Caption Text - For metadata and secondary info
  caption: {
    large: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    },
    
    small: {
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.xs,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.wide,
      fontFamily: fontFamilies.sans
    }
  },
  
  // Code Text - For technical content
  code: {
    inline: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.mono
    },
    
    block: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.relaxed,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.mono
    }
  },
  
  // Button Text - Optimized for interactive elements
  button: {
    large: {
      fontSize: fontSizes.base,
      lineHeight: lineHeights.base,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    },
    
    medium: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.sans
    },
    
    small: {
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.xs,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.wide,
      fontFamily: fontFamilies.sans
    }
  }
};

// Text Utilities - Helper classes and utilities
export const textUtilities = {
  // Text alignment
  align: {
    left: 'left',
    center: 'center',
    right: 'right',
    justify: 'justify'
  },
  
  // Text decoration
  decoration: {
    none: 'none',
    underline: 'underline',
    strikethrough: 'line-through'
  },
  
  // Text transform
  transform: {
    none: 'none',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize'
  },
  
  // Text overflow
  overflow: {
    clip: 'clip',
    ellipsis: 'ellipsis'
  },
  
  // White space
  whitespace: {
    normal: 'normal',
    nowrap: 'nowrap',
    pre: 'pre',
    preWrap: 'pre-wrap',
    preLine: 'pre-line'
  }
};

// Responsive Typography - Breakpoint-specific sizes
export const responsiveText = {
  // Hero text that scales down on mobile
  hero: {
    mobile: textStyles.display['2xl'],
    tablet: textStyles.display['3xl'],
    desktop: textStyles.display['4xl']
  },
  
  // Section headings
  section: {
    mobile: textStyles.heading.h3,
    tablet: textStyles.heading.h2,
    desktop: textStyles.heading.h1
  },
  
  // Body text that adjusts for readability
  body: {
    mobile: textStyles.body.small,
    tablet: textStyles.body.medium,
    desktop: textStyles.body.medium
  }
};

// Export complete typography system
export const typography = {
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacing,
  textStyles,
  textUtilities,
  responsiveText
};

export default typography;