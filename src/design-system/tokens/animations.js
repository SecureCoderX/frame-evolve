/**
 * Frame Evolve Design System - Animation Tokens
 * Professional animation system with consistent timing and easing
 */

// Animation Durations - Consistent timing across the app
export const durations = {
  instant: 0,
  fastest: 100,
  faster: 150,
  fast: 200,
  normal: 300,
  slow: 400,
  slower: 500,
  slowest: 750,
  glacial: 1000
};

// Easing Functions - For natural motion
export const easings = {
  // Standard easings
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Custom Frame Evolve easings
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  dramatic: 'cubic-bezier(0.17, 0.67, 0.83, 0.67)',
  gentle: 'cubic-bezier(0.25, 0.25, 0.75, 0.75)',
  
  // Specialized easings
  bounceOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  backOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  anticipate: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)'
};

// Framer Motion Variants - Reusable animation patterns
export const motionVariants = {
  // Fade animations
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  fadeDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  
  fadeLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  
  fadeRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  
  // Scale animations
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },
  
  scaleUp: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 }
  },
  
  // Slide animations
  slideUp: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 }
  },
  
  slideDown: {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 }
  },
  
  slideLeft: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 }
  },
  
  slideRight: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 }
  },
  
  // Container animations for staggered children
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  },
  
  // Button interactions
  button: {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  },
  
  // Modal animations
  modal: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.easeOut
      }
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      transition: {
        duration: durations.fast / 1000,
        ease: easings.easeIn
      }
    }
  },
  
  // Backdrop animations
  backdrop: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: durations.fast / 1000
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: durations.fast / 1000
      }
    }
  }
};

// Component-specific animations
export const componentAnimations = {
  // Sidebar animations
  sidebar: {
    expanded: { 
      width: 256,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.easeInOut
      }
    },
    collapsed: { 
      width: 64,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.easeInOut
      }
    }
  },
  
  // Toast notifications
  toast: {
    initial: { x: 300, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.spring
      }
    },
    exit: { 
      x: 300, 
      opacity: 0,
      transition: {
        duration: durations.fast / 1000,
        ease: easings.easeIn
      }
    }
  },
  
  // Loading spinner
  spinner: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: easings.linear
      }
    }
  },
  
  // Progress bar
  progressBar: {
    initial: { width: 0 },
    animate: (progress) => ({
      width: `${progress}%`,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.easeOut
      }
    })
  },
  
  // Tooltip
  tooltip: {
    initial: { opacity: 0, scale: 0.8, y: 5 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: durations.faster / 1000,
        ease: easings.easeOut
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 5,
      transition: {
        duration: durations.fastest / 1000,
        ease: easings.easeIn
      }
    }
  },
  
  // Dropdown menu
  dropdown: {
    initial: { opacity: 0, scale: 0.95, y: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: durations.fast / 1000,
        ease: easings.easeOut
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: {
        duration: durations.faster / 1000,
        ease: easings.easeIn
      }
    }
  }
};

// Micro-interactions - Subtle animations for better UX
export const microInteractions = {
  // Input focus
  inputFocus: {
    borderColor: {
      duration: durations.faster / 1000,
      ease: easings.easeOut
    },
    scale: {
      duration: durations.fastest / 1000,
      ease: easings.easeOut
    }
  },
  
  // Button hover
  buttonHover: {
    backgroundColor: {
      duration: durations.faster / 1000,
      ease: easings.easeOut
    },
    transform: {
      duration: durations.fastest / 1000,
      ease: easings.easeOut
    }
  },
  
  // Card hover
  cardHover: {
    boxShadow: {
      duration: durations.fast / 1000,
      ease: easings.easeOut
    },
    transform: {
      duration: durations.fast / 1000,
      ease: easings.easeOut
    }
  },
  
  // Icon animations
  iconSpin: {
    rotate: 360,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: easings.linear
    }
  },
  
  iconBounce: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.3,
      ease: easings.bounceOut
    }
  },
  
  iconPulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: easings.easeInOut
    }
  }
};

// Page transitions
export const pageTransitions = {
  // Default page transition
  default: {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.easeOut
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: {
        duration: durations.fast / 1000,
        ease: easings.easeIn
      }
    }
  },
  
  // Slide page transition
  slide: {
    initial: { opacity: 0, x: 100 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.easeOut
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: {
        duration: durations.fast / 1000,
        ease: easings.easeIn
      }
    }
  },
  
  // Fade page transition
  fade: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.easeInOut
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: durations.fast / 1000,
        ease: easings.easeInOut
      }
    }
  }
};

// Export complete animation system
export const animations = {
  durations,
  easings,
  motionVariants,
  componentAnimations,
  microInteractions,
  pageTransitions
};

export default animations;