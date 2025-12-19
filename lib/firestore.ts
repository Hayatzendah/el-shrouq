import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  getDocsFromCache,
} from 'firebase/firestore';
import { db } from './firebaseClient';
import { Season, Category, Product } from './types';

// ==================== SEASONS ====================

export async function getSeasons(useCache: boolean = true): Promise<Season[]> {
  const q = query(collection(db, 'seasons'), orderBy('order', 'asc'));
  
  if (useCache && typeof window !== 'undefined') {
    try {
      // Try to get from cache first
      const cacheSnapshot = await getDocsFromCache(q);
      if (cacheSnapshot && cacheSnapshot.size > 0) {
        return cacheSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Season));
      }
    } catch (error) {
      // Cache miss or error, fall through to server
      // This is expected if cache is not available yet
    }
  }
  
  // Get from server and cache automatically
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Season));
}

export async function getVisibleSeasons(): Promise<Season[]> {
  const seasons = await getSeasons();
  return seasons.filter((s) => s.isVisible);
}

export async function getSeasonById(id: string, useCache: boolean = true): Promise<Season | null> {
  const docRef = doc(db, 'seasons', id);
  
  // getDoc automatically uses cache if available, then falls back to server
  // With persistence enabled, it will use cached data when offline
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Season) : null;
}

export async function createSeason(data: Omit<Season, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'seasons'), data);
  return docRef.id;
}

export async function updateSeason(id: string, data: Partial<Season>): Promise<void> {
  const docRef = doc(db, 'seasons', id);
  await updateDoc(docRef, data);
}

export async function deleteSeason(id: string): Promise<void> {
  const docRef = doc(db, 'seasons', id);
  await deleteDoc(docRef);
}

// ==================== CATEGORIES ====================

export async function getCategories(useCache: boolean = true): Promise<Category[]> {
  const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
  
  if (useCache && typeof window !== 'undefined') {
    try {
      // Try to get from cache first
      const cacheSnapshot = await getDocsFromCache(q);
      if (cacheSnapshot && cacheSnapshot.size > 0) {
        return cacheSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Category));
      }
    } catch (error) {
      // Cache miss or error, fall through to server
      // This is expected if cache is not available yet
    }
  }
  
  // Get from server and cache automatically
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Category));
}

export async function getVisibleCategories(): Promise<Category[]> {
  const categories = await getCategories();
  return categories.filter((c) => c.isVisible);
}

export async function getCategoryById(id: string, useCache: boolean = true): Promise<Category | null> {
  const docRef = doc(db, 'categories', id);
  
  // getDoc automatically uses cache if available, then falls back to server
  // With persistence enabled, it will use cached data when offline
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Category) : null;
}

export async function createCategory(data: Omit<Category, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'categories'), data);
  return docRef.id;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  const docRef = doc(db, 'categories', id);
  await updateDoc(docRef, data);
}

export async function deleteCategory(id: string): Promise<void> {
  const docRef = doc(db, 'categories', id);
  await deleteDoc(docRef);
}

// ==================== PRODUCTS ====================

export async function getProducts(useCache: boolean = true): Promise<Product[]> {
  const q = query(collection(db, 'products'), orderBy('order', 'asc'));
  
  if (useCache && typeof window !== 'undefined') {
    try {
      // Try to get from cache first
      const cacheSnapshot = await getDocsFromCache(q);
      if (cacheSnapshot && cacheSnapshot.size > 0) {
        return cacheSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
      }
    } catch (error) {
      // Cache miss or error, fall through to server
      // This is expected if cache is not available yet
    }
  }
  
  // Get from server and cache automatically
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
}

export async function getVisibleProducts(): Promise<Product[]> {
  const products = await getProducts();
  const visibleSeasons = await getVisibleSeasons();
  const visibleCategories = await getVisibleCategories();

  const visibleSeasonIds = new Set(visibleSeasons.map((s) => s.id));
  const visibleCategoryIds = new Set(visibleCategories.map((c) => c.id));

  const filtered = products.filter((p) => {
    if (!p.isVisible) return false;
    if (!visibleCategoryIds.has(p.categoryId)) return false;
    const hasVisibleSeason = p.seasonIds.some((sid) => visibleSeasonIds.has(sid));
    return hasVisibleSeason;
  });

  // Sort by order (already sorted from getProducts, but ensure it)
  return filtered.sort((a, b) => (a.order || 999) - (b.order || 999));
}

export async function getProductBySlug(slug: string, useCache: boolean = true): Promise<Product | null> {
  const q = query(collection(db, 'products'), where('slug', '==', slug));
  
  if (useCache && typeof window !== 'undefined') {
    try {
      // Try to get from cache first
      const cacheSnapshot = await getDocsFromCache(q);
      if (cacheSnapshot && cacheSnapshot.size > 0) {
        const doc = cacheSnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Product;
      }
    } catch (error) {
      // Cache miss or error, fall through to server
      // This is expected if cache is not available yet
    }
  }
  
  // Get from server and cache automatically
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Product;
}

export async function getProductById(id: string, useCache: boolean = true): Promise<Product | null> {
  const docRef = doc(db, 'products', id);
  
  // getDoc automatically uses cache if available, then falls back to server
  // With persistence enabled, it will use cached data when offline
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Product) : null;
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const now = Timestamp.now();
  const docRef = await addDoc(collection(db, 'products'), {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
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
