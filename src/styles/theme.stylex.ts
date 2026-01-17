import * as stylex from '@stylexjs/stylex';

// Define color variables with defaults
export const colors = stylex.defineVars({
  background: '#ffffff',
  backgroundSecondary: '#f5f5f5',
  foreground: '#000000',
  foregroundSecondary: '#333333',
  foregroundMuted: '#666666',
  accent: '#3b82f6',
  border: '#e5e5e5',
  borderLight: '#f0f0f0',
});

// Define typography tokens
export const typography = stylex.defineVars({
  headingSize: '40px',
  subheadingSize: '28px',
  bodyLineHeight: '1.4',
  descriptionLineHeight: '1.4',
});

// Define spacing tokens
export const spacing = stylex.defineVars({
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
});

// Create dark theme (overrides the defaults)
export const darkTheme = stylex.createTheme(colors, {
  background: '#0a0a0a',
  backgroundSecondary: '#1a1a1a',
  foreground: '#fafafa',
  foregroundSecondary: '#d4d4d4',
  foregroundMuted: '#a3a3a3',
  accent: '#3b82f6',
  border: '#333333',
  borderLight: '#404040',
});

// Export colors for use in components
// (duplicate re-export removed)
