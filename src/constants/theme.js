/**
 * Panorama CRM Design System Constants
 * Use these constants programmatically (e.g. for charts, inline styles, dynamic components).
 * They mirror the CSS variables defined in src/index.css.
 */

export const COLORS = {
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1', // Brand Indigo
    600: '#4F46E5', // Primary Hover/Active
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
    950: '#1E1B4B',
  },
  neutral: {
    50: '#F8FAFC',  // Page Background
    100: '#F1F5F9', // Card/Table header bg
    200: '#E2E8F0', // Border subtle
    300: '#CBD5E1', // Border focus / secondary text dark
    400: '#94A3B8', // Placeholder / disabled
    500: '#64748B', // Secondary text
    600: '#475569', // Body text secondary
    700: '#334155', // Body text
    800: '#1E293B', // Title secondary
    900: '#0F172A', // Primary titles / text
    950: '#020617', // Dark mode background / absolute dark
  },
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#F43F5E',
    600: '#E11D48',
    700: '#BE123C',
  },
  info: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    500: '#0EA5E9',
    600: '#0284C7',
    700: '#0369A1',
  },
  background: {
    default: '#F8FAFC',
    card: '#FFFFFF',
    overlay: 'rgba(15, 23, 42, 0.4)',
  },
};

export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  xxl: '3rem',     // 48px
  
  // Container standards
  sidebar: '280px',
  sidebarCollapsed: '80px',
  header: '70px',
  containerMax: '1440px',
};

export const SHADOWS = {
  subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
  dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
  modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  glow: '0 0 15px 3px rgba(99, 102, 241, 0.15)', // Custom active/accent glow
};

export const RADIUS = {
  xs: '0.25rem',   // 4px
  sm: '0.375rem',  // 6px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  xxl: '1.5rem',   // 24px
  xxxl: '2rem',    // 32px
  full: '9999px',
};

export const BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
};

export const TYPOGRAPHY = {
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    h3: '1.5rem',      // 24px
    h2: '1.875rem',    // 30px
    h1: '2.25rem',     // 36px
  },
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

export const TRANSITIONS = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  default: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
};

const theme = {
  COLORS,
  SPACING,
  SHADOWS,
  RADIUS,
  BREAKPOINTS,
  TYPOGRAPHY,
  TRANSITIONS,
};

export default theme;
