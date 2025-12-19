/**
 * Firestore API Wrapper
 * This file provides Firebase-compatible functions using PHP API backend
 */

import {
  getSeasons as phpGetSeasons,
  getCategories as phpGetCategories,
  getProducts as phpGetProducts,
  getVisibleProducts as phpGetVisibleProducts,
  getProductBySlug as phpGetProductBySlug,
  getProductById as phpGetProductById,
  createProduct as phpCreateProduct,
  updateProduct as phpUpdateProduct,
  deleteProduct as phpDeleteProduct,
  generateSlug as phpGenerateSlug,
  Season,
  Category,
  Product,
} from './phpApi';
import { Season as SeasonType, Category as CategoryType, Product as ProductType } from './types';

// Seasons
export async function getSeasons(useCache: boolean = false): Promise<SeasonType[]> {
  return phpGetSeasons();
}

export async function getVisibleSeasons(useCache: boolean = false): Promise<SeasonType[]> {
  return phpGetSeasons();
}

export async function getSeasonById(id: string, useCache: boolean = false): Promise<SeasonType | null> {
  const seasons = await getSeasons();
  return seasons.find(s => s.id === id) || null;
}

export async function createSeason(data: Partial<SeasonType>): Promise<string> {
  // TODO: Implement PHP API endpoint for seasons
  throw new Error('Season creation not yet implemented in PHP API');
}

export async function updateSeason(id: string, data: Partial<SeasonType>): Promise<void> {
  // TODO: Implement PHP API endpoint for seasons
  throw new Error('Season update not yet implemented in PHP API');
}

export async function deleteSeason(id: string): Promise<void> {
  // TODO: Implement PHP API endpoint for seasons
  throw new Error('Season deletion not yet implemented in PHP API');
}

// Categories
export async function getCategories(useCache: boolean = false): Promise<CategoryType[]> {
  return phpGetCategories();
}

export async function getVisibleCategories(useCache: boolean = false): Promise<CategoryType[]> {
  return phpGetCategories();
}

export async function getCategoryById(id: string, useCache: boolean = false): Promise<CategoryType | null> {
  const categories = await getCategories();
  return categories.find(c => c.id === id) || null;
}

export async function createCategory(data: Partial<CategoryType>): Promise<string> {
  // TODO: Implement PHP API endpoint for categories
  throw new Error('Category creation not yet implemented in PHP API');
}

export async function updateCategory(id: string, data: Partial<CategoryType>): Promise<void> {
  // TODO: Implement PHP API endpoint for categories
  throw new Error('Category update not yet implemented in PHP API');
}

export async function deleteCategory(id: string): Promise<void> {
  // TODO: Implement PHP API endpoint for categories
  throw new Error('Category deletion not yet implemented in PHP API');
}

// Products
export async function getProducts(useCache: boolean = false): Promise<ProductType[]> {
  return phpGetProducts();
}

export async function getVisibleProducts(useCache: boolean = false): Promise<ProductType[]> {
  return phpGetVisibleProducts();
}

export async function getProductBySlug(slug: string, useCache: boolean = false): Promise<ProductType | null> {
  return phpGetProductBySlug(slug);
}

export async function getProductById(id: string, useCache: boolean = false): Promise<ProductType | null> {
  return phpGetProductById(id);
}

export async function createProduct(data: Partial<ProductType>): Promise<string> {
  return phpCreateProduct(data);
}

export async function updateProduct(id: string, data: Partial<ProductType>): Promise<void> {
  return phpUpdateProduct(id, data);
}

export async function deleteProduct(id: string): Promise<void> {
  return phpDeleteProduct(id);
}

// Utilities
export function generateSlug(name: string): string {
  return phpGenerateSlug(name);
}

