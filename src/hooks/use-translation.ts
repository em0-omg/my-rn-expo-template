import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { useLocales } from 'expo-localization';

import {
  getLocale,
  i18n,
  resolveLocale,
  setLocale,
  subscribeToLocale,
  syncDeviceLocale,
  type SupportedLocale,
} from '@/lib/i18n';

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
  // Re-renders every consumer when the locale changes, including via `setLocale`.
  const locale = useSyncExternalStore(subscribeToLocale, getLocale, getLocale);

  // `useLocales` keeps reporting the device preference while the app is running.
  const deviceLocales = useLocales();
  const deviceLocale = resolveLocale(deviceLocales[0]?.languageCode);

  useEffect(() => {
    syncDeviceLocale(deviceLocale);
  }, [deviceLocale]);

  const t = useCallback(
    (scope: string, options?: Record<string, string | number>) => {
      // `locale` is unused at runtime but ties the callback to the active locale,
      // so memoized consumers re-translate when it changes.
      void locale;
      return i18n.t(scope, options);
    },
    [locale]
  );

  return {
    t,
    locale,
    setLocale,
    i18n,
  };
}

export type { SupportedLocale };
