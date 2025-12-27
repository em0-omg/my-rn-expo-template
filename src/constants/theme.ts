/**
 * Design System Theme Configuration
 *
 * Based on the Anthropic-inspired design system with Terra Cotta as the primary brand color.
 * Follows the "Human-Centered AI" design concept with "Helpful, Harmless, Honest" messaging.
 */

import { Platform } from 'react-native';

/**
 * Design System Color Palette
 */
export const Colors = {
  light: {
    // Primary Colors
    primary: '#da7756', // Terra Cotta - Brand color
    primaryHover: '#c46644', // Hover state
    primaryAction: '#C15F3C', // Crail - Primary actions

    // Background Colors
    background: '#F4F3EE', // Pampas - Main background
    backgroundSecondary: '#eeece2', // Cream - Website background
    backgroundCard: '#FFFFFF', // White - Cards, content background
    backgroundSurface: '#FFFFFF', // White - Surface elements

    // Text Colors
    text: '#3d3929', // Primary Text - Body text
    textHeading: '#000000', // Black - Headings, emphasis
    textMuted: '#B1ADA1', // Cloudy - Secondary text

    // Border Colors
    border: '#B1ADA1', // Cloudy - Borders

    // Semantic Colors (for backwards compatibility)
    tint: '#da7756',
    icon: '#B1ADA1',
    tabIconDefault: '#B1ADA1',
    tabIconSelected: '#da7756',
  },
  dark: {
    // Primary Colors
    primary: '#e07c5a', // Terra Cotta (Dark) - Slightly brighter
    primaryHover: '#da7756',
    primaryAction: '#e07c5a',

    // Background Colors
    background: '#1a1a1a', // Dark Background - Main background
    backgroundSecondary: '#0d0d0d', // Near Black - Deepest background
    backgroundCard: '#2d2d2d', // Charcoal Grey - Card background
    backgroundSurface: '#333333', // Dark Surface - Surface elements

    // Text Colors
    text: '#e5e5e5', // Light Text - Body text
    textHeading: '#FFFFFF', // White - Headings
    textMuted: '#999999', // Muted Text - Secondary text

    // Border Colors
    border: '#333333', // Dark Surface - Borders

    // Semantic Colors (for backwards compatibility)
    tint: '#e07c5a',
    icon: '#999999',
    tabIconDefault: '#999999',
    tabIconSelected: '#e07c5a',
  },
} as const;

/**
 * Design System Typography
 *
 * Prioritizes serif fonts for a scholarly, research-oriented impression.
 */
export const Fonts = Platform.select({
  ios: {
    /** iOS serif - Display/Headings */
    serif: 'ui-serif',
    /** iOS system font - Body fallback */
    sans: 'system-ui',
    /** iOS SF Pro Rounded */
    rounded: 'ui-rounded',
    /** iOS SF Mono */
    mono: 'ui-monospace',
  },
  android: {
    serif: 'serif',
    sans: 'sans-serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
  web: {
    serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    sans: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", // Using serif as per design system
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "'SF Mono', Monaco, Consolas, 'Source Code Pro', monospace",
  },
  default: {
    serif: 'serif',
    sans: 'sans-serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
});

/**
 * Design System Spacing (base unit: 4px)
 */
export const Spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

/**
 * Design System Border Radius
 */
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 9999,
} as const;

/**
 * Design System Font Sizes
 */
export const FontSizes = {
  hero: 48,
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  bodyLg: 18,
  body: 16,
  caption: 14,
  label: 12,
} as const;

/**
 * Design System Line Heights
 */
export const LineHeights = {
  hero: 1.1,
  h1: 1.2,
  h2: 1.3,
  h3: 1.4,
  h4: 1.4,
  body: 1.6,
  caption: 1.5,
  label: 1.4,
} as const;

/**
 * Design System Shadows
 */
export const Shadows = {
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
} as const;

/**
 * React Navigation Theme Configuration
 */
export const NavigationTheme = {
  light: {
    dark: false,
    colors: {
      primary: Colors.light.primary,
      background: Colors.light.background,
      card: Colors.light.backgroundCard,
      text: Colors.light.text,
      border: Colors.light.border,
      notification: Colors.light.primary,
    },
    fonts: Platform.select({
      ios: {
        regular: { fontFamily: 'ui-serif', fontWeight: '400' as const },
        medium: { fontFamily: 'ui-serif', fontWeight: '500' as const },
        bold: { fontFamily: 'ui-serif', fontWeight: '700' as const },
        heavy: { fontFamily: 'ui-serif', fontWeight: '800' as const },
      },
      default: {
        regular: { fontFamily: 'serif', fontWeight: '400' as const },
        medium: { fontFamily: 'serif', fontWeight: '500' as const },
        bold: { fontFamily: 'serif', fontWeight: '700' as const },
        heavy: { fontFamily: 'serif', fontWeight: '800' as const },
      },
    }),
  },
  dark: {
    dark: true,
    colors: {
      primary: Colors.dark.primary,
      background: Colors.dark.background,
      card: Colors.dark.backgroundCard,
      text: Colors.dark.text,
      border: Colors.dark.border,
      notification: Colors.dark.primary,
    },
    fonts: Platform.select({
      ios: {
        regular: { fontFamily: 'ui-serif', fontWeight: '400' as const },
        medium: { fontFamily: 'ui-serif', fontWeight: '500' as const },
        bold: { fontFamily: 'ui-serif', fontWeight: '700' as const },
        heavy: { fontFamily: 'ui-serif', fontWeight: '800' as const },
      },
      default: {
        regular: { fontFamily: 'serif', fontWeight: '400' as const },
        medium: { fontFamily: 'serif', fontWeight: '500' as const },
        bold: { fontFamily: 'serif', fontWeight: '700' as const },
        heavy: { fontFamily: 'serif', fontWeight: '800' as const },
      },
    }),
  },
};
