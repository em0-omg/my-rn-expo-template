import { useCallback } from 'react';
import { useLocales } from 'expo-localization';
import { i18n } from '@/lib/i18n';

const SUPPORTED_LOCALES = ['en', 'ja'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Hook that provides translation functionality with automatic locale detection.
 *
 * @returns Object containing the translation function `t`, current locale, and locale setter
 *
 * @example
 * ```tsx
 * const { t, locale, setLocale } = useTranslation();
 *
 * // Basic usage
 * <Text>{t('home.welcome')}</Text>
 *
 * // With interpolation
 * <Text>{t('home.step1.description', { file: 'index.tsx', shortcut: 'cmd + d' })}</Text>
 *
 * // Change locale
 * setLocale('ja');
 * ```
 */
export function useTranslation() {
  // Get device locales - this hook automatically updates when device settings change
  const deviceLocales = useLocales();

  // Update i18n locale based on device preference
  const deviceLanguage = deviceLocales[0]?.languageCode ?? 'en';
  const resolvedLocale = SUPPORTED_LOCALES.includes(deviceLanguage as SupportedLocale)
    ? deviceLanguage
    : 'en';

  // Update i18n locale if it differs
  if (i18n.locale !== resolvedLocale) {
    i18n.locale = resolvedLocale;
  }

  // Translation function with proper typing
  const t = useCallback((scope: string, options?: Record<string, string | number>) => {
    return i18n.t(scope, options);
  }, []);

  // Locale setter for manual locale changes
  const setLocale = useCallback((locale: SupportedLocale) => {
    i18n.locale = locale;
  }, []);

  return {
    t,
    locale: i18n.locale,
    setLocale,
    i18n,
  };
}
