# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Start development server (opens options for iOS, Android, web)
npx expo start

# Run on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Lint
npm run lint

# Reset to blank project (moves starter code to app-example/)
npm run reset-project
```

## Architecture

This is an Expo SDK 54 project using React Native 0.81 with file-based routing via expo-router.

### Directory Structure

All source code is located under the `src/` directory:

```
src/
├── app/           # expo-router file-based routing
├── components/    # React components
│   └── ui/        # UI primitives (icons, collapsible, etc.)
├── constants/     # Theme, colors, fonts
└── hooks/         # Custom React hooks
```

### Routing Structure

- `src/app/_layout.tsx` - Root layout with ThemeProvider and Stack navigator
- `src/app/(tabs)/` - Tab-based navigation group
  - `_layout.tsx` - Tab bar configuration with HapticTab buttons
  - `index.tsx` - Home tab
  - `explore.tsx` - Explore tab
- `src/app/modal.tsx` - Modal screen presented over tabs

### Key Patterns

**Path aliases**: Use `@/` to import from `src/` directory (configured in tsconfig.json)

```typescript
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
```

**Platform-specific files**: Use `.ios.tsx` / `.android.tsx` / `.web.ts` suffixes

- `components/ui/icon-symbol.ios.tsx` uses native SF Symbols
- `components/ui/icon-symbol.tsx` (fallback) uses MaterialIcons
- `hooks/use-color-scheme.web.ts` vs `hooks/use-color-scheme.ts`

**Theming**: Color scheme handling flows through:

1. `src/hooks/use-color-scheme.ts` - detects system preference
2. `src/hooks/use-theme-color.ts` - resolves colors from theme
3. `src/constants/theme.ts` - defines `Colors` (light/dark) and `Fonts` (per-platform)

**Themed components**: `ThemedText` and `ThemedView` wrap native components with automatic dark/light mode support.

### Enabled Experiments

- `typedRoutes`: Type-safe routing
- `reactCompiler`: React Compiler enabled
- `newArchEnabled`: React Native New Architecture
