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

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
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

async function postApi<T>(endpoint: string, data: any): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result: ApiResponse<T> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'API request failed');
    }

    return result;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

async function putApi(endpoint: string, data: any): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'API request failed');
    }

    return result;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

async function deleteApi(endpoint: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'API request failed');
    }

    return result;
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

export async function getProductById(id: string): Promise<Product | null> {
  try {
    return await fetchApi<Product>(`/products/read_single.php?id=${encodeURIComponent(id)}`);
  } catch (error) {
    return null;
  }
}

export async function createProduct(data: any): Promise<string> {
  const response = await postApi('/products/create.php', {
    name_en: data.name_en || data.name,
    name_fr: data.name_fr || data.name,
    slug: data.slug,
    category_id: data.categoryId || data.category_id,
    short_desc_en: data.short_desc_en || data.shortDesc,
    short_desc_fr: data.short_desc_fr || data.shortDesc,
    varieties_en: data.varieties_en || (data.varieties ? data.varieties.split(',').map((v: string) => v.trim()) : []),
    varieties_fr: data.varieties_fr || (data.varieties ? data.varieties.split(',').map((v: string) => v.trim()) : []),
    image: data.image,
    gallery: data.gallery || [],
    is_visible: data.isVisible !== undefined ? data.isVisible : true,
    display_order: data.order || 0,
    season_ids: data.seasonIds || []
  });
  return response.id;
}

export async function updateProduct(id: string, data: any): Promise<void> {
  const updateData: any = { id };

  if (data.name_en || data.name) updateData.name_en = data.name_en || data.name;
  if (data.name_fr || data.name) updateData.name_fr = data.name_fr || data.name;
  if (data.slug) updateData.slug = data.slug;
  if (data.categoryId || data.category_id) updateData.category_id = data.categoryId || data.category_id;
  if (data.short_desc_en || data.shortDesc) updateData.short_desc_en = data.short_desc_en || data.shortDesc;
  if (data.short_desc_fr || data.shortDesc) updateData.short_desc_fr = data.short_desc_fr || data.shortDesc;

  if (data.varieties_en || data.varieties) {
    updateData.varieties_en = data.varieties_en || (data.varieties ? data.varieties.split(',').map((v: string) => v.trim()) : []);
  }
  if (data.varieties_fr || data.varieties) {
    updateData.varieties_fr = data.varieties_fr || (data.varieties ? data.varieties.split(',').map((v: string) => v.trim()) : []);
  }

  if (data.image !== undefined) updateData.image = data.image;
  if (data.gallery !== undefined) updateData.gallery = data.gallery;
  if (data.isVisible !== undefined) updateData.is_visible = data.isVisible;
  if (data.order !== undefined) updateData.display_order = data.order;
  if (data.seasonIds !== undefined) updateData.season_ids = data.seasonIds;

  await putApi('/products/update.php', updateData);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteApi(`/products/delete.php?id=${encodeURIComponent(id)}`);
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload/image.php`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Upload failed');
    }

    // Return full URL
    const baseUrl = API_BASE_URL.replace('/api', '');
    return baseUrl + result.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
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
