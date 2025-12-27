const { platformSelect, hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          action: 'rgb(var(--color-primary-action) / <alpha-value>)',
        },
        // Background Colors
        background: {
          DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
          secondary: 'rgb(var(--color-background-secondary) / <alpha-value>)',
          card: 'rgb(var(--color-background-card) / <alpha-value>)',
          surface: 'rgb(var(--color-background-surface) / <alpha-value>)',
        },
        // Text Colors
        foreground: {
          DEFAULT: 'rgb(var(--color-foreground) / <alpha-value>)',
          heading: 'rgb(var(--color-foreground-heading) / <alpha-value>)',
          muted: 'rgb(var(--color-foreground-muted) / <alpha-value>)',
        },
        // Border Colors
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
        },
        // Semantic Colors (using design system palette)
        accent: 'rgb(var(--color-primary) / <alpha-value>)',
      },
      fontFamily: {
        // Design system typography
        serif: platformSelect({
          ios: ['ui-serif', 'Georgia'],
          android: ['serif'],
          web: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
          default: ['serif'],
        }),
        sans: platformSelect({
          ios: ['system-ui', '-apple-system'],
          android: ['sans-serif'],
          web: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
          default: ['sans-serif'],
        }),
        mono: platformSelect({
          ios: ['ui-monospace', 'SF Mono'],
          android: ['monospace'],
          web: ['SF Mono', 'Monaco', 'Consolas', 'Source Code Pro', 'monospace'],
          default: ['monospace'],
        }),
      },
      fontSize: {
        // Design system font sizes
        hero: ['48px', { lineHeight: '1.1', fontWeight: '600' }],
        h1: ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        h2: ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        h4: ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        body: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        caption: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        label: ['12px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        // Design system spacing (base unit: 4px)
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
      },
      borderRadius: {
        // Design system border radius
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        pill: '9999px',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      maxWidth: {
        // Design system content widths
        readable: '720px',
        content: '1024px',
        wide: '1280px',
        full: '1440px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
    },
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        ':root': {
          // Light Mode - Primary Colors
          '--color-primary': '218 119 86', // Terra Cotta #da7756
          '--color-primary-hover': '196 102 68', // #c46644
          '--color-primary-action': '193 95 60', // Crail #C15F3C
          // Light Mode - Background Colors
          '--color-background': '244 243 238', // Pampas #F4F3EE
          '--color-background-secondary': '238 236 226', // Cream #eeece2
          '--color-background-card': '255 255 255', // White #FFFFFF
          '--color-background-surface': '255 255 255', // White #FFFFFF
          // Light Mode - Text Colors
          '--color-foreground': '61 57 41', // Primary Text #3d3929
          '--color-foreground-heading': '0 0 0', // Black #000000
          '--color-foreground-muted': '177 173 161', // Cloudy #B1ADA1
          // Light Mode - Border Colors
          '--color-border': '177 173 161', // Cloudy #B1ADA1
        },
        '.dark': {
          // Dark Mode - Primary Colors
          '--color-primary': '224 124 90', // Terra Cotta (Dark) #e07c5a
          '--color-primary-hover': '218 119 86', // #da7756
          '--color-primary-action': '224 124 90', // #e07c5a
          // Dark Mode - Background Colors
          '--color-background': '26 26 26', // Dark Background #1a1a1a
          '--color-background-secondary': '13 13 13', // Near Black #0d0d0d
          '--color-background-card': '45 45 45', // Charcoal Grey #2d2d2d
          '--color-background-surface': '51 51 51', // Dark Surface #333333
          // Dark Mode - Text Colors
          '--color-foreground': '229 229 229', // Light Text #e5e5e5
          '--color-foreground-heading': '255 255 255', // White
          '--color-foreground-muted': '153 153 153', // Muted Text #999999
          // Dark Mode - Border Colors
          '--color-border': '51 51 51', // Dark Surface #333333
        },
      }),
  ],
};
