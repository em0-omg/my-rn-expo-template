# Internationalization (i18n) Rules

This project uses i18n-js with expo-localization for multi-language support.

## Core Setup

### Library Stack

- **expo-localization**: Detects device locale
- **i18n-js**: Translation library
- **useTranslation hook**: React hook for translations

### Configuration Files

```
src/
├── lib/
│   └── i18n.ts         # i18n instance configuration
├── locales/
│   ├── en.ts           # English translations
│   ├── ja.ts           # Japanese translations
│   └── index.ts        # Exports all locales
└── hooks/
    └── use-translation.ts  # React hook
```

## Supported Locales

Current supported locales:

- `en` - English (default/fallback)
- `ja` - Japanese

## Translation File Structure

### File Format

Each locale file exports a default object with nested translation keys:

```typescript
// src/locales/en.ts
export default {
  common: {
    learnMore: 'Learn more',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
  tabs: {
    home: 'Home',
    explore: 'Explore',
  },
  home: {
    welcome: 'Welcome!',
    step1: {
      title: 'Step 1: Try it',
      description: 'Edit {{file}} to see changes.',
    },
  },
};
```

### Key Naming Conventions

1. **Flat structure for simple strings**: `common.cancel`
2. **Nested for features/screens**: `home.step1.title`
3. **Use camelCase** for keys: `learnMore`, not `learn-more`
4. **Group by screen/feature**: `home.`, `explore.`, `modal.`

### Interpolation

Use double curly braces for variables:

```typescript
// Translation
description: ('Edit {{file}} to see changes. Press {{shortcut}} to open tools.',
  // Usage
  t('home.step1.description', { file: 'index.tsx', shortcut: 'cmd + d' }));
```

## useTranslation Hook

### API

```typescript
const { t, locale, setLocale, i18n } = useTranslation();
```

- `t(key, options?)`: Translation function
- `locale`: Current locale string
- `setLocale(locale)`: Manually change locale
- `i18n`: Raw i18n instance (rarely needed)

### Usage Examples

```tsx
import { useTranslation } from '@/hooks/use-translation';

function MyComponent() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <View>
      {/* Basic translation */}
      <Text>{t('home.welcome')}</Text>

      {/* With interpolation */}
      <Text>
        {t('home.step1.description', {
          file: 'index.tsx',
          shortcut: 'cmd + d',
        })}
      </Text>

      {/* Display current locale */}
      <Text>Current: {locale}</Text>

      {/* Language switcher */}
      <Button onPress={() => setLocale('ja')}>日本語</Button>
      <Button onPress={() => setLocale('en')}>English</Button>
    </View>
  );
}
```

## Adding a New Language

### Step 1: Create Translation File

```typescript
// src/locales/ko.ts
export default {
  common: {
    learnMore: '더 알아보기',
    // ... copy structure from en.ts
  },
  // ... all other keys
};
```

### Step 2: Export from Index

```typescript
// src/locales/index.ts
export { default as en } from './en';
export { default as ja } from './ja';
export { default as ko } from './ko'; // Add new export
```

### Step 3: Register in i18n.ts

Both the instance and `SUPPORTED_LOCALES` live in `src/lib/i18n.ts`, so this is the only code
change needed — `resolveLocale` and the `SupportedLocale` type follow automatically.

```typescript
// src/lib/i18n.ts
import { en, ja, ko } from '@/locales';

export const SUPPORTED_LOCALES = ['en', 'ja', 'ko'] as const; // Add new locale

const i18n = new I18n({
  en,
  ja,
  ko, // Add new locale
});
```

### Step 4: Update app.json

```json
{
  "expo": {
    "plugins": [
      [
        "expo-localization",
        {
          "supportedLocales": {
            "ios": ["en", "ja", "ko"],
            "android": ["en", "ja", "ko"]
          }
        }
      ]
    ]
  }
}
```

## Best Practices

### Do

- Keep translations organized by feature/screen
- Use meaningful, descriptive key names
- Include all keys in every locale file
- Use interpolation for dynamic content
- Test with different locales

### Don't

- Don't hardcode text strings in components
- Don't use array indices as keys
- Don't mix languages in the same key
- Don't forget to add keys to all locale files

### Type Safety

Translation keys are stringly-typed. For type safety, consider:

```typescript
// Define key type (optional)
type TranslationKey = 'common.learnMore' | 'common.cancel' | 'home.welcome';
// ... etc

// Or use const assertion in locale files
export default {
  common: {
    learnMore: 'Learn more',
  },
} as const;
```

## Fallback Behavior

The i18n instance is configured with:

```typescript
i18n.defaultLocale = 'en';
i18n.enableFallback = true;
```

If a translation key is missing:

1. Falls back to `en` locale
2. If still missing, returns the key itself

## Testing Translations

```typescript
// Verify all keys exist in all locales
import { en, ja } from '@/locales';

const enKeys = Object.keys(flattenObject(en));
const jaKeys = Object.keys(flattenObject(ja));

// Check for missing keys
const missingInJa = enKeys.filter((key) => !jaKeys.includes(key));
```
