import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MultilingualText } from './types';
import { Language } from './i18n';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get text based on language
export function getText(text: string | MultilingualText, lang: Language): string {
  if (typeof text === 'string') {
    return text; // Fallback for old data
  }
  return text[lang] || text.en || '';
}

// Get product name
export function getProductName(name: string | MultilingualText, lang: Language): string {
  return getText(name, lang);
}

// Get product description
export function getProductDesc(desc: string | MultilingualText, lang: Language): string {
  return getText(desc, lang);
}

// Get variety names
export function getVarietyNames(
  varieties: string[] | MultilingualText[] | undefined,
  lang: Language
): string[] {
  if (!varieties) return [];
  return varieties.map((v) => getText(v, lang));
}

// Category color mapping
export function getCategoryColorClasses(categoryName: string): string {
  const colors: Record<string, string> = {
    Vegetables: 'bg-brand-green/10 text-brand-green border-brand-green',
    Fruits: 'bg-brand-orange/10 text-brand-orange border-brand-orange',
    Citrus: 'bg-brand-gold/10 text-brand-gold border-brand-gold',
    'Medicinal Plants': 'bg-purple-600/10 text-purple-600 border-purple-600',
    Frozen: 'bg-brand-teal/10 text-brand-teal border-brand-teal',
  };
  return colors[categoryName] || 'bg-neutral-soft text-neutral-text border-neutral-border';
}
