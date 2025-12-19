// Simple cache utility with TTL (Time To Live)

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

const CACHE_PREFIX = 'el-shrouq-cache-';
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes default

/**
 * Get cached data
 */
export function getCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!cached) return null;

    const entry: CacheEntry<T> = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is expired
    if (now - entry.timestamp > entry.ttl) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }

    return entry.data;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

/**
 * Set cache data
 */
export function setCache<T>(key: string, data: T, ttl: number = DEFAULT_TTL): void {
  if (typeof window === 'undefined') return;

  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
  } catch (error) {
    console.error('Error setting cache:', error);
    // If storage is full, try to clear old entries
    clearExpiredCache();
  }
}

/**
 * Clear specific cache entry
 */
export function clearCache(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`${CACHE_PREFIX}${key}`);
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  if (typeof window === 'undefined') return;
  
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}

/**
 * Clear expired cache entries
 */
function clearExpiredCache(): void {
  if (typeof window === 'undefined') return;

  const keys = Object.keys(localStorage);
  const now = Date.now();

  keys.forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      try {
        const cached = localStorage.getItem(key);
        if (cached) {
          const entry: CacheEntry<any> = JSON.parse(cached);
          if (now - entry.timestamp > entry.ttl) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        // Remove invalid entries
        localStorage.removeItem(key);
      }
    }
  });
}

// Cache keys
export const CACHE_KEYS = {
  PRODUCTS: 'products',
  VISIBLE_PRODUCTS: 'visible-products',
  CATEGORIES: 'categories',
  VISIBLE_CATEGORIES: 'visible-categories',
  SEASONS: 'seasons',
  VISIBLE_SEASONS: 'visible-seasons',
} as const;

