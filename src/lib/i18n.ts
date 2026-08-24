import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import { en, ja } from '@/locales';

export const SUPPORTED_LOCALES = ['en', 'ja'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/** Narrows an arbitrary language code to a locale this app ships translations for. */
export function resolveLocale(languageCode: string | null | undefined): SupportedLocale {
  return SUPPORTED_LOCALES.includes(languageCode as SupportedLocale)
    ? (languageCode as SupportedLocale)
    : 'en';
}

const i18n = new I18n({ en, ja });

i18n.defaultLocale = 'en';
// Enable fallback to default locale when a translation is missing
i18n.enableFallback = true;
i18n.locale = resolveLocale(getLocales()[0]?.languageCode);

// `i18n.locale` is mutable module state that React cannot see, so components
// subscribe here instead of reading it during render.
const listeners = new Set<() => void>();
let hasManualOverride = false;

export function subscribeToLocale(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function getLocale(): SupportedLocale {
  return i18n.locale as SupportedLocale;
}

function applyLocale(locale: SupportedLocale) {
  if (i18n.locale === locale) {
    return;
  }
  i18n.locale = locale;
  listeners.forEach((listener) => listener());
}

/** Explicit user choice. Wins over later device-language changes. */
export function setLocale(locale: SupportedLocale) {
  hasManualOverride = true;
  applyLocale(locale);
}

/** Follows the device language, unless the user has already chosen one. */
export function syncDeviceLocale(locale: SupportedLocale) {
  if (hasManualOverride) {
    return;
  }
  applyLocale(locale);
}

export { i18n };
