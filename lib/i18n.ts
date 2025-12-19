export type Language = 'en' | 'fr';

export interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

// Language context storage key
export const LANGUAGE_STORAGE_KEY = 'el-shrouq-language';

// Default language
export const DEFAULT_LANGUAGE: Language = 'en';

// Available languages
export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

// Get language from storage or browser
export function getLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
  if (stored && (stored === 'en' || stored === 'fr')) {
    return stored;
  }
  
  // Try to detect from browser
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'fr') return 'fr';
  
  return DEFAULT_LANGUAGE;
}

// Set language
export function setLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

// Helper to get translated text
export function t(translations: { en: string; fr: string }, lang: Language): string {
  return translations[lang] || translations.en || '';
}

