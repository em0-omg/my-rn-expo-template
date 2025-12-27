# Styling Rules (NativeWind + Tailwind CSS)

This project uses NativeWind (Tailwind CSS for React Native) for styling.

## Core Setup

### Configuration Files

- `tailwind.config.js` - Tailwind configuration with NativeWind preset
- `global.css` - Base styles, components, and utilities
- `nativewind-env.d.ts` - TypeScript declarations

### Import in Root Layout

```tsx
// src/app/_layout.tsx
import '../../global.css';
```

## Using Tailwind Classes

### Basic Usage

```tsx
import { View, Text } from 'react-native';

function Component() {
  return (
    <View className="flex-1 items-center justify-center bg-background p-4">
      <Text className="font-serif text-h1 text-foreground-heading">Hello World</Text>
    </View>
  );
}
```

### Dark Mode

Dark mode is handled via the `dark` class on the root View:

```tsx
// src/app/_layout.tsx
<View className={`flex-1 ${isDark ? 'dark' : ''}`}>{/* children */}</View>
```

Use dark mode variants in components:

```tsx
<View className="bg-background-card dark:bg-background-surface">
  <Text className="text-foreground dark:text-foreground-muted">Adapts to theme</Text>
</View>
```

## Design System Colors

### Color Tokens

Use semantic color names from the design system:

| Token                  | Light Mode             | Dark Mode              |
| ---------------------- | ---------------------- | ---------------------- |
| `primary`              | Terra Cotta (#da7756)  | Brighter (#e07c5a)     |
| `primary-hover`        | Hover state            | Hover state            |
| `primary-action`       | Crail (#C15F3C)        | Same as primary        |
| `background`           | Pampas (#F4F3EE)       | Dark (#1a1a1a)         |
| `background-secondary` | Cream (#eeece2)        | Near Black (#0d0d0d)   |
| `background-card`      | White (#FFFFFF)        | Charcoal (#2d2d2d)     |
| `background-surface`   | White (#FFFFFF)        | Dark Surface (#333333) |
| `foreground`           | Primary Text (#3d3929) | Light Text (#e5e5e5)   |
| `foreground-heading`   | Black (#000000)        | White (#FFFFFF)        |
| `foreground-muted`     | Cloudy (#B1ADA1)       | Muted (#999999)        |
| `border`               | Cloudy (#B1ADA1)       | Dark Surface (#333333) |

### Usage

```tsx
// Background
<View className="bg-background" />
<View className="bg-background-card" />
<View className="bg-primary" />

// Text
<Text className="text-foreground" />
<Text className="text-foreground-heading" />
<Text className="text-foreground-muted" />
<Text className="text-primary" />

// Borders
<View className="border border-border" />
```

## Typography

### Font Families

```tsx
// Serif (default for this design system)
<Text className="font-serif">Serif text</Text>

// Sans-serif
<Text className="font-sans">Sans-serif text</Text>

// Monospace
<Text className="font-mono">Monospace text</Text>
```

### Font Sizes

| Class          | Size | Line Height | Weight |
| -------------- | ---- | ----------- | ------ |
| `text-hero`    | 48px | 1.1         | 600    |
| `text-h1`      | 32px | 1.2         | 600    |
| `text-h2`      | 24px | 1.3         | 600    |
| `text-h3`      | 20px | 1.4         | 600    |
| `text-h4`      | 18px | 1.4         | 600    |
| `text-body-lg` | 18px | 1.6         | 400    |
| `text-body`    | 16px | 1.6         | 400    |
| `text-caption` | 14px | 1.5         | 400    |
| `text-label`   | 12px | 1.4         | 500    |

### Usage

```tsx
<Text className="text-hero text-foreground-heading font-serif">Hero</Text>
<Text className="text-h1 text-foreground-heading">Heading 1</Text>
<Text className="text-body text-foreground">Body text</Text>
<Text className="text-caption text-foreground-muted">Caption</Text>
```

## Spacing

Base unit: 4px

| Class  | Value |
| ------ | ----- |
| `p-1`  | 4px   |
| `p-2`  | 8px   |
| `p-3`  | 12px  |
| `p-4`  | 16px  |
| `p-5`  | 20px  |
| `p-6`  | 24px  |
| `p-8`  | 32px  |
| `p-10` | 40px  |
| `p-12` | 48px  |
| `p-16` | 64px  |

Works with all spacing utilities: `m-*`, `p-*`, `gap-*`, `space-*`, etc.

## Border Radius

| Class          | Value  |
| -------------- | ------ |
| `rounded-sm`   | 4px    |
| `rounded`      | 8px    |
| `rounded-md`   | 8px    |
| `rounded-lg`   | 12px   |
| `rounded-xl`   | 16px   |
| `rounded-pill` | 9999px |

## Shadows

```tsx
<View className="shadow-xs" />  // Subtle
<View className="shadow-sm" />  // Small
<View className="shadow-md" />  // Medium
<View className="shadow-lg" />  // Large
```

## Content Width

| Class            | Max Width |
| ---------------- | --------- |
| `max-w-readable` | 720px     |
| `max-w-content`  | 1024px    |
| `max-w-wide`     | 1280px    |
| `max-w-full`     | 1440px    |

## Utility Classes

### Buttons

```tsx
// Primary button
<TouchableOpacity className="btn-primary">
  <Text className="text-white font-medium">Primary</Text>
</TouchableOpacity>

// Secondary button
<TouchableOpacity className="btn-secondary">
  <Text className="text-foreground font-medium">Secondary</Text>
</TouchableOpacity>
```

### Cards

```tsx
<View className="card">
  <Text className="text-h3 text-foreground-heading">Card Title</Text>
  <Text className="text-body text-foreground">Card content</Text>
</View>
```

### Display Text

```tsx
<Text className="text-display">Display heading</Text>
```

## Transitions (Web)

```tsx
// Fast (150ms)
<View className="transition-all duration-fast" />

// Base (200ms)
<View className="transition-all duration-base" />

// Slow (300ms)
<View className="transition-all duration-slow" />
```

## Platform-Specific Styles

NativeWind provides platform utilities:

```tsx
// iOS only
<View className="ios:shadow-lg" />

// Android only
<View className="android:elevation-4" />

// Web only
<View className="web:hover:bg-primary-hover" />
```

## Best Practices

### Do

- Use semantic color tokens (`bg-background`, not `bg-[#F4F3EE]`)
- Use design system spacing (`p-4`, not `p-[15px]`)
- Combine classes logically
- Use dark mode variants for theme support

### Don't

- Don't use arbitrary values when design tokens exist
- Don't override design system colors with custom hex codes
- Don't forget dark mode support for visible elements
- Don't use inline styles when Tailwind classes are available

### Class Order Convention

1. Layout (flex, grid)
2. Sizing (w, h)
3. Spacing (m, p)
4. Background
5. Border
6. Text
7. Effects (shadow, opacity)

```tsx
<View className="w-full flex-1 rounded-lg bg-background-card p-4 shadow-sm">
  <Text className="font-serif text-h2 text-foreground-heading">Title</Text>
</View>
```

## CSS Variables

Colors are defined as CSS variables in `tailwind.config.js`:

```javascript
// Light mode (default)
':root': {
  '--color-primary': '218 119 86', // RGB values
  '--color-background': '244 243 238',
  // ...
}

// Dark mode
'.dark': {
  '--color-primary': '224 124 90',
  '--color-background': '26 26 26',
  // ...
}
```

Use with Tailwind's opacity modifier:

```tsx
<View className="bg-primary/50" /> // 50% opacity primary
```
