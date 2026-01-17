import * as stylex from "@stylexjs/stylex";

// Define color variables with defaults
export const colors = stylex.defineVars({
  background: "#ffffff",
  backgroundSecondary: "#f5f5f5",
  foreground: "#000000",
  foregroundSecondary: "#333333",
  foregroundMuted: "#666666",
  accent: "#3b82f6",
  link: "#3b82f6",
  linkHover: "#2563eb",
  border: "#e5e5e5",
  borderLight: "#f0f0f0",
});

// Define typography tokens
export const typography = stylex.defineVars({
  headingSize: "40px",
  subheadingSize: "28px",
  bodyLineHeight: "1.4",
  descriptionLineHeight: "1.4",
});

// Define spacing tokens
export const spacing = stylex.defineVars({
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
  "4xl": "96px",
});

// Define border radius tokens
export const borderRadius = stylex.defineVars({
  none: "0",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
});

// Create dark theme (overrides the defaults)
export const darkTheme = stylex.createTheme(colors, {
  background: "#0a0a0a",
  backgroundSecondary: "#1a1a1a",
  foreground: "#fafafa",
  foregroundSecondary: "#d4d4d4",
  foregroundMuted: "#a3a3a3",
  accent: "#3b82f6",
  link: "#60a5fa",
  linkHover: "#93c5fd",
  border: "#333333",
  borderLight: "#404040",
});

// Animation styles using CSS transitions
export const animationStyles = stylex.create({
  // Fade Up (most common) - initial state
  fadeUp: {
    opacity: 0,
    transform: "translateY(20px)",
    transition:
      "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  // Fade Up - animated state
  fadeUpAnimated: {
    opacity: 1,
    transform: "translateY(0)",
  },
  // Fade In - initial state
  fadeIn: {
    opacity: 0,
    transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  // Fade In - animated state
  fadeInAnimated: {
    opacity: 1,
  },
  // Fade In with Scale (for images) - initial state
  fadeInScale: {
    opacity: 0,
    transform: "scale(0.95)",
    transition:
      "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  // Fade In with Scale - animated state
  fadeInScaleAnimated: {
    opacity: 1,
    transform: "scale(1)",
  },
  // Fade In with Scale Small (for avatars) - initial state
  fadeInScaleSmall: {
    opacity: 0,
    transform: "scale(0.8)",
    transition:
      "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  // Fade In with Scale Small - animated state
  fadeInScaleSmallAnimated: {
    opacity: 1,
    transform: "scale(1)",
  },
  // Fade Down (for header) - initial state
  fadeDown: {
    opacity: 0,
    transform: "translateY(-20px)",
    transition:
      "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
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
  // Respect reduced motion
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    opacity: 1,
    transform: "none",
  },
});

// Export colors for use in components
// (duplicate re-export removed)
