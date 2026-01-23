import * as stylex from "@stylexjs/stylex";

// 4-point spacing system base unit
const BASE_UNIT = 0.25; // 0.25rem = 4px (assuming 16px = 1rem)

// Color primitives layer
const colorPrimitives = {
  white: "#ffffff",
  black: "#000000",
  gray50: "#fafafa",
  gray100: "#f5f5f5",
  gray200: "#e5e5e5",
  gray300: "#d4d4d4",
  gray400: "#a3a3a3",
  gray500: "#737373",
  gray600: "#525252",
  gray700: "#404040",
  gray800: "#262626",
  gray900: "#171717",
  blue400: "#60a5fa",
  blue500: "#3b82f6",
  blue600: "#2563eb",
  blue700: "#1d4ed8",
};

// Define color variables with defaults (reference primitives)
export const colors = stylex.defineVars({
  background: colorPrimitives.white,
  backgroundSecondary: colorPrimitives.gray100,
  foreground: colorPrimitives.black,
  foregroundSecondary: colorPrimitives.gray700,
  foregroundMuted: colorPrimitives.gray500,
  accent: colorPrimitives.blue500,
  link: colorPrimitives.blue500,
  linkHover: colorPrimitives.blue600,
  border: colorPrimitives.gray200,
  borderLight: colorPrimitives.gray100,
});

// Breakpoint constants
export const breakpoints = stylex.defineConsts({
  mobile: "@media (max-width: 768px)",
  tablet: "@media (min-width: 769px) and (max-width: 1024px)",
  desktop: "@media (min-width: 1025px)",
});

// Typography tokens (calculated from 4-point system in rem)
export const typography = stylex.defineVars({
  // Font sizes
  fontSizeXS: `${BASE_UNIT * 3}rem`, // 0.75rem = 12px
  fontSizeSM: `${BASE_UNIT * 3.5}rem`, // 0.875rem = 14px
  fontSizeM: `${BASE_UNIT * 4}rem`, // 1rem = 16px
  fontSizeLG: `${BASE_UNIT * 4.5}rem`, // 1.125rem = 18px
  fontSizeXL: `${BASE_UNIT * 5}rem`, // 1.25rem = 20px
  fontSizeXXL: `${BASE_UNIT * 5.5}rem`, // 1.375rem = 22px
  fontSizeXXXL: `${BASE_UNIT * 7}rem`, // 1.75rem = 28px
  fontSizeXXXXL: `${BASE_UNIT * 10}rem`, // 2.5rem = 40px
  // Line heights (unitless/percentage-based)
  lineHeightTight: "1.1",
  lineHeightNormal: "1.5",
  lineHeightRelaxed: "1.75",
  // Legacy support (will be migrated)
  headingSize: `${BASE_UNIT * 10}rem`, // 2.5rem = 40px (references fontSizeXXXXL)
  subheadingSize: `${BASE_UNIT * 7}rem`, // 1.75rem = 28px (references fontSizeXXXL)
  bodyLineHeight: "1.5", // references lineHeightNormal
  descriptionLineHeight: "1.75", // references lineHeightRelaxed
});

// Spacing tokens (calculated from 4-point system in rem)
export const spacing = stylex.defineVars({
  xs: `${BASE_UNIT * 1}rem`, // 0.25rem = 4px
  sm: `${BASE_UNIT * 2}rem`, // 0.5rem = 8px
  md: `${BASE_UNIT * 4}rem`, // 1rem = 16px
  lg: `${BASE_UNIT * 6}rem`, // 1.5rem = 24px
  xl: `${BASE_UNIT * 8}rem`, // 2rem = 32px
  XXL: `${BASE_UNIT * 12}rem`, // 3rem = 48px
  XXXL: `${BASE_UNIT * 16}rem`, // 4rem = 64px
  XXXXL: `${BASE_UNIT * 24}rem`, // 6rem = 96px
  XXXXXL: `${BASE_UNIT * 32}rem`, // 8rem = 128px
});

// Border radius tokens (calculated from 4-point system in rem)
export const borderRadius = stylex.defineVars({
  none: "0",
  sm: `${BASE_UNIT * 1}rem`, // 0.25rem = 4px
  md: `${BASE_UNIT * 2}rem`, // 0.5rem = 8px
  lg: `${BASE_UNIT * 3}rem`, // 0.75rem = 12px
  xl: `${BASE_UNIT * 4}rem`, // 1rem = 16px
  full: "9999px", // For circular elements
});

// Dimension tokens (calculated from 4-point system in rem)
export const dimensions = stylex.defineVars({
  avatar: `${BASE_UNIT * 40}rem`, // 10rem = 160px
  imageSmall: `${BASE_UNIT * 62.5}rem`, // 15.625rem = 250px
  imageMedium: `${BASE_UNIT * 75}rem`, // 18.75rem = 300px
  imageLarge: `${BASE_UNIT * 150}rem`, // 37.5rem = 600px
  cardHeight: `${BASE_UNIT * 90}rem`, // 22.5rem = 360px
});

// Z-index tokens (numeric system)
export const zIndex = stylex.defineVars({
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "50": "50",
  "100": "100",
});

// Container tokens (calculated from 4-point system in rem)
export const container = stylex.defineVars({
  maxWidth: `${BASE_UNIT * 300}rem`, // 75rem = 1200px
});

// Create dark theme (overrides the defaults)
export const darkTheme = stylex.createTheme(colors, {
  background: colorPrimitives.gray900,
  backgroundSecondary: colorPrimitives.gray800,
  foreground: colorPrimitives.gray50,
  foregroundSecondary: colorPrimitives.gray300,
  foregroundMuted: colorPrimitives.gray400,
  accent: colorPrimitives.blue500,
  link: colorPrimitives.blue400,
  linkHover: colorPrimitives.blue600,
  border: colorPrimitives.gray700,
  borderLight: colorPrimitives.gray700,
});

// Animation styles using CSS transitions
// Fixed: Media queries nested within property values, not at top level
export const animationStyles = stylex.create({
  // Fade Up (most common) - initial state
  fadeUp: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transform: {
      default: "translateY(20px)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    transition: {
      default:
        "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  // Fade Up - animated state
  fadeUpAnimated: {
    opacity: 1,
    transform: "translateY(0)",
  },
  // Fade In - initial state
  fadeIn: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transition: {
      default: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  // Fade In - animated state
  fadeInAnimated: {
    opacity: 1,
  },
  // Fade In with Scale (for images) - initial state
  fadeInScale: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transform: {
      default: "scale(0.95)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    transition: {
      default:
        "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  // Fade In with Scale - animated state
  fadeInScaleAnimated: {
    opacity: 1,
    transform: "scale(1)",
  },
  // Fade In with Scale Small (for avatars) - initial state
  fadeInScaleSmall: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transform: {
      default: "scale(0.8)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    transition: {
      default:
        "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  // Fade In with Scale Small - animated state
  fadeInScaleSmallAnimated: {
    opacity: 1,
    transform: "scale(1)",
  },
  // Fade Down (for header) - initial state
  fadeDown: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transform: {
      default: "translateY(-20px)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    transition: {
      default:
        "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  // Fade Down - animated state
  fadeDownAnimated: {
    opacity: 1,
    transform: "translateY(0)",
  },
  // Delay variants
  delay1: {
    transitionDelay: "0.1s",
  },
  delay2: {
    transitionDelay: "0.2s",
  },
  delay3: {
    transitionDelay: "0.3s",
  },
});
