/**
 * PHP API Client for Next.js
 * Replaces Firebase calls with PHP backend
 */

// Update this URL when deploying to Hostinger
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/el-shrouq/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const result: ApiResponse<T> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'API request failed');
    }

    return result.data as T;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// ==================== TYPES ====================

export interface Season {
  id: string;
  name: string;
  slug: string;
  order: number;
  isVisible: boolean;
  startMonth?: number;
  endMonth?: number;
}

export interface Category {
  id: string;
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
  id: string;
  name: MultilingualText;
  slug: string;
  categoryId: string;
  seasonIds: string[];
  shortDesc: MultilingualText;
  varieties?: MultilingualText;
  image: string;
  gallery?: string[];
  isVisible: boolean;
  order?: number;
  category?: {
    name: string;
    slug: string;
    colorHex: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// ==================== SEASONS ====================

export async function getSeasons(): Promise<Season[]> {
  return fetchApi<Season[]>('/seasons/read.php');
}

export async function getVisibleSeasons(): Promise<Season[]> {
  return getSeasons(); // API already filters visible items
}

// ==================== CATEGORIES ====================

export async function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>('/categories/read.php');
}

export async function getVisibleCategories(): Promise<Category[]> {
  return getCategories(); // API already filters visible items
}

// ==================== PRODUCTS ====================

export async function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>('/products/read.php');
}

export async function getVisibleProducts(): Promise<Product[]> {
  return getProducts(); // API already filters visible items
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await fetchApi<Product>(`/products/read_single.php?slug=${encodeURIComponent(slug)}`);
  } catch (error) {
    return null;
  }
}

// ==================== HELPERS ====================

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
