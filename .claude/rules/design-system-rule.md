# Design System Rules

This project follows the Claude Platform Documentation design system (Anthropic-inspired). All UI components and styles must adhere to these guidelines.

## Brand Identity

- **Design Concept**: Human-Centered AI

- **Key Message**: Helpful, Harmless, Honest

- **Primary Brand Color**: Terra Cotta (#da7756)

## Color Palette

### Light Mode

#### Primary Colors

| Name | HEX | Usage |

| ------------- | --------- | -------------------------- |

| Terra Cotta | `#da7756` | Brand color, accents, CTAs |

| Crail | `#C15F3C` | Primary actions, buttons |

| Primary Hover | `#c46644` | Hover states |

#### Background Colors

| Name | HEX | Usage |

| ------ | --------- | ------------------------- |

| Pampas | `#F4F3EE` | Main background |

| Cream | `#eeece2` | Website background |

| White | `#FFFFFF` | Cards, content background |

#### Text Colors

| Name | HEX | Usage |

| ------------ | --------- | ----------------------- |

| Primary Text | `#3d3929` | Body text |

| Black | `#000000` | Headings, emphasis |

| Cloudy | `#B1ADA1` | Secondary text, borders |

### Dark Mode

| Name | HEX | Usage |

| ------------------ | --------- | -------------------------- |

| Dark Background | `#1a1a1a` | Main background |

| Near Black | `#0d0d0d` | Deepest background |

| Charcoal Grey | `#2d2d2d` | Card background |

| Dark Surface | `#333333` | Surface elements |

| Light Text | `#e5e5e5` | Body text |

| Muted Text | `#999999` | Secondary text |

| Terra Cotta (Dark) | `#e07c5a` | Accent (slightly brighter) |

## Typography

### Font Families

- **Display/Headings**: Serif fonts (Georgia, Cambria, Times New Roman)

- **Body**: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`

- **Code**: `"SF Mono", Monaco, Consolas, "Source Code Pro", monospace`

### Font Size Scale

| Usage | Size | Line Height | Weight |

| ------------ | ------- | ----------- | ------- |

| Hero | 48-64px | 1.1-1.2 | 600-700 |

| H1 | 32-40px | 1.2-1.3 | 600 |

| H2 | 24-28px | 1.3 | 600 |

| H3 | 20-22px | 1.4 | 600 |

| H4 | 18px | 1.4 | 600 |

| Body (large) | 18px | 1.6-1.7 | 400 |

| Body | 16px | 1.6-1.7 | 400 |

| Caption | 14px | 1.5 | 400 |

| Label | 12-13px | 1.4 | 500 |

## Spacing System

Base unit: **4px** or **8px**

| Token | Value | Usage |

| -------- | ----- | ------------------------ |

| space-1 | 4px | Minimum spacing |

| space-2 | 8px | Inline elements |

| space-3 | 12px | Small groups |

| space-4 | 16px | Standard padding |

| space-5 | 20px | Card padding |

| space-6 | 24px | Section elements |

| space-8 | 32px | Component spacing |

| space-10 | 40px | Section spacing (small) |

| space-12 | 48px | Section spacing (medium) |

| space-16 | 64px | Section spacing (large) |

### Content Width

| Usage | Max Width |

| ------------------- | ----------- |

| Readability optimal | 680-720px |

| Content area | 960-1024px |

| Wide layout | 1200-1280px |

| Full width | 1440px |

## Border Radius

| Usage | Value |

| ---------------- | ------- |

| Small buttons | 4-6px |

| Standard buttons | 8px |

| Cards | 8-12px |

| Input fields | 6-8px |

| Modals | 12-16px |

| Pills | 9999px |

| Avatars | 50% |

## Shadows

### Light Mode

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);

--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);

--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
```

### Dark Mode

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);

--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);

--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
```

## Interactions

### Buttons

- **Primary**: Background `#da7756`, white text, 8px radius

- **Primary Hover**: Background `#c46644`

- **Secondary**: Transparent background, `#B1ADA1` border

- **Padding**: 12px 24px

- **Font Weight**: 500

### Transitions

```css
--transition-fast: 0.15s ease;

--transition-base: 0.2s ease;

--transition-slow: 0.3s ease;
```

## Responsive Breakpoints

| Name | Value | Usage |

| ---- | ------ | -------------------------------- |

| sm | 640px | Mobile |

| md | 768px | Tablet (portrait) |

| lg | 1024px | Tablet (landscape), small laptop |

| xl | 1280px | Desktop |

| 2xl | 1536px | Large displays |

## Design Principles

1. **Warmth and Trust**: Use terra cotta orange for warmth, intelligence, and creativity. Avoid cold tech blues/purples.

2. **Clean and Readable**: Reduce cognitive load with clean backgrounds, ample whitespace, and clear visual hierarchy.

3. **Accessibility**: Maintain WCAG AA contrast ratios, clear focus states, and appropriate font sizes.

4. **Consistency**: Use CSS variables for unified management, component-based design, and systematic spacing.

## Implementation Notes

- Always use CSS variables for colors, spacing, and typography

- Support both light and dark modes

- Prioritize serif fonts for a scholarly, research-oriented impression

- Maintain warm, human-centered aesthetic over cold tech appearance
