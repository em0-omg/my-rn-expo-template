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

# Type check (also runs on pre-push via lefthook)
npm run typecheck

# Format code
npm run format

# Reset to blank project (moves starter code to app-example/)
npm run reset-project
```

## Architecture

This is an Expo SDK 57 project using React Native 0.86 with file-based routing via expo-router.

### Tech Stack

- **Core**: Expo SDK 57, React Native 0.86, React 19.2, TypeScript 6.0
- **Routing**: expo-router (file-based routing with typed routes)
- **Styling**: NativeWind 4.2 + Tailwind CSS 3.4
- **State Management**: Zustand 5.0 + AsyncStorage (persistent storage)
- **Lists**: @shopify/flash-list 2.0 (high-performance list component)
- **Images**: expo-image (blurhash placeholders, caching, transitions)
- **i18n**: i18n-js + expo-localization
- **Navigation**: bundled with expo-router (import from `expo-router/react-navigation`)
- **Animation**: react-native-reanimated, react-native-gesture-handler
- **Dev Tools**: ESLint, Prettier, Lefthook (Git hooks)

### Version policy

Runtime package versions are owned by the Expo SDK, not by us. Use `npx expo install <pkg>` and
`npx expo install --fix` rather than `npm install`, and treat `npx expo-doctor` as the source of
truth. Several packages are deliberately _not_ on their npm `latest`:

| Package                    | Pinned  | Why not latest                                                            |
| -------------------------- | ------- | ------------------------------------------------------------------------- |
| `@shopify/flash-list`      | 2.0.2   | Pinned by SDK 57's `bundledNativeModules.json`                            |
| `async-storage`            | 2.2.0   | Pinned by SDK 57; 3.x leaves Expo's validated set                         |
| `eslint`                   | 9.x     | `eslint-plugin-react` (via `eslint-config-expo`) has no ESLint 10 support |
| `nativewind`/`tailwindcss` | 4.2/3.4 | NativeWind v5 is preview and "not intended for production use"            |

`eslint-config-expo` and `babel-preset-expo` track the SDK major version — bump them with the SDK.

### Directory Structure

All source code is located under the `src/` directory:

```
src/
├── app/           # expo-router file-based routing
├── components/    # React components
│   └── ui/        # UI primitives (icons, collapsible, etc.)
├── constants/     # Theme, colors, fonts
│   └── theme.ts   # Design system configuration
├── hooks/         # Custom React hooks
├── lib/           # Library configurations
│   └── i18n.ts    # Internationalization setup
├── locales/       # Translation files (en.ts, ja.ts)
└── stores/        # Zustand stores
    ├── app-store.ts     # App-wide state (initialization, user, loading)
    └── counter-store.ts # Example store with persistence
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
import { useAppStore } from '@/stores';
```

**Platform-specific files**: Use `.ios.tsx` / `.android.tsx` / `.web.ts` suffixes

- `components/ui/icon-symbol.ios.tsx` uses native SF Symbols
- `components/ui/icon-symbol.tsx` (fallback) uses MaterialIcons
- `hooks/use-color-scheme.web.ts` vs `hooks/use-color-scheme.ts`

**NativeWind Styling**: Use Tailwind CSS classes with NativeWind

```tsx
<View className="rounded-lg bg-background-card p-5 shadow-sm">
  <Text className="font-serif text-h2 text-foreground-heading">Title</Text>
</View>
```

**Zustand State Management**: Use individual selectors for performance

```tsx
// Good: Individual selectors
const count = useCounterStore((state) => state.count);
const increment = useCounterStore((state) => state.increment);

// With persistence via AsyncStorage
export const useCounterStore = create<CounterStore>()(
  devtools(
    persist((set) => ({/* ... */}), {
      name: 'counter-storage',
      storage: createJSONStorage(() => AsyncStorage),
    })
  )
);
```

**Theming**: Color scheme handling flows through:

1. `src/hooks/use-color-scheme.ts` - detects system preference
2. `src/hooks/use-theme-color.ts` - resolves colors from theme
3. `src/constants/theme.ts` - defines `Colors` (light/dark), `Fonts`, `Spacing`, etc.
4. `tailwind.config.js` - CSS variables for NativeWind
5. `global.css` - Base styles and utility classes

**Internationalization (i18n)**:

```tsx
import { useTranslation } from '@/hooks/use-translation';

function Component() {
  const { t, locale, setLocale } = useTranslation();
  return <Text>{t('home.welcome')}</Text>;
}
```

Supported locales: `en`, `ja`

`i18n.locale` is module state, so `src/lib/i18n.ts` exposes a subscription that `useTranslation`
reads through `useSyncExternalStore`. Change the language with the hook's `setLocale` — never by
assigning `i18n.locale` directly, which mutates during render and skips the re-render. An explicit
`setLocale` also takes precedence over later device-language changes.

**Themed components**: `ThemedText` and `ThemedView` wrap native components with automatic dark/light mode support.

**FlashList**: High-performance list component (drop-in replacement for FlatList). v2 sizes items
automatically — `estimatedItemSize` was removed and passing it is a type error.

```tsx
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  keyExtractor={(item) => item.id}
/>;
```

**expo-image**: High-performance image with blurhash placeholders

```tsx
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://example.com/photo.jpg' }}
  placeholder={{ blurhash: '|rF?hV%2WCj[ayj[...' }}
  contentFit="cover"
  transition={300}
  style={{ width: 100, height: 100 }}
/>;
```

### Enabled Experiments

- `typedRoutes`: Type-safe routing
- `reactCompiler`: React Compiler enabled

The New Architecture is mandatory from SDK 55 on, so `newArchEnabled` (and `edgeToEdgeEnabled`) are
no longer valid keys in `app.json`.

### Design System

This project uses an Anthropic-inspired design system:

- **Brand Color**: Terra Cotta (#da7756)
- **Typography**: Serif fonts prioritized for scholarly impression
- **Theming**: Light/Dark mode with CSS variables

See `.claude/rules/design-system-rule.md` for detailed guidelines.

### Rules

Additional development rules are located in `.claude/rules/`:

- `design-system-rule.md` - Color palette, typography, spacing, components
- `state-management-rule.md` - Zustand patterns and best practices
- `i18n-rule.md` - Internationalization guidelines
- `styling-rule.md` - NativeWind/Tailwind styling conventions
