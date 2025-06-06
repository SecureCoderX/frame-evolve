/**
 * Frame Evolve Design System - Spacing & Layout Tokens
 * Consistent spacing system based on 4px base unit for perfect alignment
 */

// Base Unit - All spacing is based on 4px increments
export const baseUnit = 4;

// Spacing Scale - 4px base unit system
export const spacing = {
  // Micro spacing
  px: '1px',
  0: '0px',
  0.5: '2px',   // 0.5 * 4px
  1: '4px',     // 1 * 4px
  1.5: '6px',   // 1.5 * 4px
  2: '8px',     // 2 * 4px
  2.5: '10px',  // 2.5 * 4px
  3: '12px',    // 3 * 4px
  3.5: '14px',  // 3.5 * 4px
  4: '16px',    // 4 * 4px
  5: '20px',    // 5 * 4px
  6: '24px',    // 6 * 4px
  7: '28px',    // 7 * 4px
  8: '32px',    // 8 * 4px
  9: '36px',    // 9 * 4px
  10: '40px',   // 10 * 4px
  11: '44px',   // 11 * 4px
  12: '48px',   // 12 * 4px
  14: '56px',   // 14 * 4px
  16: '64px',   // 16 * 4px
  20: '80px',   // 20 * 4px
  24: '96px',   // 24 * 4px
  28: '112px',  // 28 * 4px
  32: '128px',  // 32 * 4px
  36: '144px',  // 36 * 4px
  40: '160px',  // 40 * 4px
  44: '176px',  // 44 * 4px
  48: '192px',  // 48 * 4px
  52: '208px',  // 52 * 4px
  56: '224px',  // 56 * 4px
  60: '240px',  // 60 * 4px
  64: '256px',  // 64 * 4px
  72: '288px',  // 72 * 4px
  80: '320px',  // 80 * 4px
  96: '384px'   // 96 * 4px
};

// Component-specific spacing
export const componentSpacing = {
  // Button padding
  button: {
    small: {
      x: spacing[3],    // 12px horizontal
      y: spacing[2]     // 8px vertical
    },
    medium: {
      x: spacing[4],    // 16px horizontal
      y: spacing[3]     // 12px vertical
    },
    large: {
      x: spacing[6],    // 24px horizontal
      y: spacing[4]     // 16px vertical
    }
  },
  
  // Input padding
  input: {
    small: {
      x: spacing[3],    // 12px horizontal
      y: spacing[2]     // 8px vertical
    },
    medium: {
      x: spacing[4],    // 16px horizontal
      y: spacing[3]     // 12px vertical
    },
    large: {
      x: spacing[4],    // 16px horizontal
      y: spacing[4]     // 16px vertical
    }
  },
  
  // Card padding
  card: {
    small: spacing[4],   // 16px
    medium: spacing[6],  // 24px
    large: spacing[8]    // 32px
  },
  
  // Modal spacing
  modal: {
    padding: spacing[6],  // 24px
    gap: spacing[4]       // 16px between elements
  },
  
  // Section spacing
  section: {
    small: spacing[8],    // 32px
    medium: spacing[12],  // 48px
    large: spacing[16],   // 64px
    xlarge: spacing[24]   // 96px
  }
};

// Border Radius - Consistent rounding system
export const borderRadius = {
  none: '0px',
  sm: '4px',      // Small radius for buttons, inputs
  md: '8px',      // Medium radius for cards
  lg: '12px',     // Large radius for modals
  xl: '16px',     // Extra large for special elements
  '2xl': '20px',  // Very large for hero elements
  '3xl': '24px',  // Maximum practical radius
  full: '9999px'  // Perfect circles
};

// Z-Index System - Layering hierarchy
export const zIndex = {
  // Base layers
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  tooltip: 600,
  notification: 700,
  
  // Specific component z-indexes
  titlebar: 1000,      // Custom titlebar
  sidebar: 900,        // Navigation sidebar
  header: 800,         // Page headers
  drawer: 750,         // Side drawers
  backdrop: 700,       // Modal backdrops
  toast: 650,          // Toast notifications
  contextMenu: 600,    // Context menus
  dropdown: 550,       // Dropdown menus
  tooltip: 500,        // Tooltips
  
  // Maximum z-index for critical elements
  max: 2147483647
};

// Breakpoints - Responsive design system
export const breakpoints = {
  // Mobile first approach
  xs: '0px',        // Extra small devices (phones)
  sm: '640px',      // Small devices (large phones)
  md: '768px',      // Medium devices (tablets)
  lg: '1024px',     // Large devices (desktops)
  xl: '1280px',     // Extra large devices (large desktops)
  '2xl': '1536px'   // 2X large devices (very large screens)
};

// Container sizes - Max widths for content
export const containers = {
  xs: '475px',      // Extra small container
  sm: '640px',      // Small container
  md: '768px',      // Medium container
  lg: '1024px',     // Large container
  xl: '1280px',     // Extra large container
  '2xl': '1536px',  // 2X large container
  full: '100%'      // Full width
};

// Grid System - Flexible grid layout
export const grid = {
  // Grid template columns
  columns: {
    1: 'repeat(1, minmax(0, 1fr))',
    2: 'repeat(2, minmax(0, 1fr))',
    3: 'repeat(3, minmax(0, 1fr))',
    4: 'repeat(4, minmax(0, 1fr))',
    5: 'repeat(5, minmax(0, 1fr))',
    6: 'repeat(6, minmax(0, 1fr))',
    7: 'repeat(7, minmax(0, 1fr))',
    8: 'repeat(8, minmax(0, 1fr))',
    9: 'repeat(9, minmax(0, 1fr))',
    10: 'repeat(10, minmax(0, 1fr))',
    11: 'repeat(11, minmax(0, 1fr))',
    12: 'repeat(12, minmax(0, 1fr))'
  },
  
  // Grid gaps
  gap: {
    none: '0px',
    sm: spacing[2],     // 8px
    md: spacing[4],     // 16px
    lg: spacing[6],     // 24px
    xl: spacing[8]      // 32px
  }
};

// Layout Utilities - Common layout patterns
export const layout = {
  // Flexbox utilities
  flex: {
    // Flex direction
    direction: {
      row: 'row',
      column: 'column',
      rowReverse: 'row-reverse',
      columnReverse: 'column-reverse'
    },
    
    // Flex wrap
    wrap: {
      wrap: 'wrap',
      nowrap: 'nowrap',
      wrapReverse: 'wrap-reverse'
    },
    
    // Justify content
    justify: {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly'
    },
    
    // Align items
    align: {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      baseline: 'baseline',
      stretch: 'stretch'
    }
  },
  
  // Position utilities
  position: {
    static: 'static',
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky'
  },
  
  // Display utilities
  display: {
    none: 'none',
    block: 'block',
    inline: 'inline',
    inlineBlock: 'inline-block',
    flex: 'flex',
    inlineFlex: 'inline-flex',
    grid: 'grid',
    inlineGrid: 'inline-grid'
  }
};

// Animation Timing - For consistent motion
export const timing = {
  // Duration
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms'
  },
  
  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Custom Frame Evolve easings
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    dramatic: 'cubic-bezier(0.17, 0.67, 0.83, 0.67)'
  },
  
  // Delays
  delay: {
    none: '0ms',
    short: '75ms',
    medium: '150ms',
    long: '300ms'
  }
};

// Component-specific Layout Patterns
export const layoutPatterns = {
  // Stack layout (vertical spacing)
  stack: {
    tight: spacing[2],    // 8px
    normal: spacing[4],   // 16px
    loose: spacing[6],    // 24px
    extraLoose: spacing[8] // 32px
  },
  
  // Inline layout (horizontal spacing)
  inline: {
    tight: spacing[2],    // 8px
    normal: spacing[4],   // 16px
    loose: spacing[6],    // 24px
    extraLoose: spacing[8] // 32px
  },
  
  // Page layouts
  page: {
    // Standard page margins
    margin: {
      mobile: spacing[4],   // 16px
      tablet: spacing[6],   // 24px
      desktop: spacing[8]   // 32px
    },
    
    // Content max widths
    maxWidth: {
      narrow: '65ch',       // Optimal reading width
      normal: containers.lg, // 1024px
      wide: containers.xl   // 1280px
    },
    
    // Section spacing
    section: {
      small: spacing[12],   // 48px
      medium: spacing[16],  // 64px
      large: spacing[24]    // 96px
    }
  }
};

// Export complete spacing system
export const spacingSystem = {
  baseUnit,
  spacing,
  componentSpacing,
  borderRadius,
  zIndex,
  breakpoints,
  containers,
  grid,
  layout,
  timing,
  layoutPatterns
};

export default spacingSystem;