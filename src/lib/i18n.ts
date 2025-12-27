import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import { en, ja } from '@/locales';

// Create i18n instance with translations
const i18n = new I18n({
  en,
  ja,
});

// Set default locale
i18n.defaultLocale = 'en';

// Set initial locale based on device settings
const deviceLocales = getLocales();
const deviceLanguage = deviceLocales[0]?.languageCode ?? 'en';

// Check if the device language is supported, fallback to 'en'
i18n.locale = ['en', 'ja'].includes(deviceLanguage) ? deviceLanguage : 'en';

// Enable fallback to default locale when a translation is missing
i18n.enableFallback = true;

export { i18n };
