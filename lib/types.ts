// Firestore Data Models

export interface Season {
  id?: string;
  name: string;
  slug: string;
  order: number;
  isVisible: boolean;
  startMonth?: number;
  endMonth?: number;
}

export interface Category {
  id?: string;
  name: 'Vegetables' | 'Fruits' | 'Citrus' | 'Medicinal Plants' | 'Frozen';
  slug: string;
  order: number;
  isVisible: boolean;
  colorHex: string;
}

export interface MultilingualText {
  en: string;
  fr: string;
}

export interface Product {
  id?: string;
  name: string | MultilingualText;
  slug: string;
  categoryId: string;
  seasonIds: string[];
  shortDesc: string | MultilingualText;
  varieties?: string[] | MultilingualText[];
  image: string;
  gallery?: string[];
  isVisible: boolean;
  order?: number; // Display order (1, 2, 3, ...)
  createdAt?: any;
  updatedAt?: any;
}

export interface ProductWithDetails extends Product {
  category?: Category;
  seasons?: Season[];
}
