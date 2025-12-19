'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getVisibleProducts, getVisibleSeasons, getVisibleCategories, Product, Season, Category } from '@/lib/phpApi';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProductName } from '@/lib/utils';

export default function ProductsPage() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Try to get from cache first
        const cachedProducts = getCache<Product[]>(CACHE_KEYS.VISIBLE_PRODUCTS);
        const cachedSeasons = getCache<Season[]>(CACHE_KEYS.VISIBLE_SEASONS);
        const cachedCategories = getCache<Category[]>(CACHE_KEYS.VISIBLE_CATEGORIES);

        if (cachedProducts && cachedSeasons && cachedCategories) {
          // Use cached data
          setProducts(cachedProducts);
          setSeasons(cachedSeasons);
          setCategories(cachedCategories);
          setLoading(false);
          return;
        }

        // Fetch from Firestore if not in cache
        const [productsData, seasonsData, categoriesData] = await Promise.all([
          getVisibleProducts(),
          getVisibleSeasons(),
          getVisibleCategories(),
        ]);

        // Cache the data (5 minutes TTL)
        setCache(CACHE_KEYS.VISIBLE_PRODUCTS, productsData, 5 * 60 * 1000);
        setCache(CACHE_KEYS.VISIBLE_SEASONS, seasonsData, 5 * 60 * 1000);
        setCache(CACHE_KEYS.VISIBLE_CATEGORIES, categoriesData, 5 * 60 * 1000);

        setProducts(productsData);
        setSeasons(seasonsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Get category and seasons for each product
  const productsWithDetails = products.map((product) => {
    const category = categories.find((c) => c.id === product.categoryId);
    const productSeasons = seasons.filter((s) => product.seasonIds.includes(s.id || ''));
    return { ...product, category, seasons: productSeasons };
  });

  // Filter products
  const filteredProducts = productsWithDetails.filter((product) => {
    // Season filter
    if (selectedSeason !== 'all' && !product.seasonIds.includes(selectedSeason)) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
      return false;
    }
    // Search filter
    if (searchQuery) {
      const productName = getProductName(product.name, language);
      if (!productName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
          <p className="text-neutral-text">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/products/products-hero-assortment.jpg"
          alt="Our Products"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-teal/70" />
        <div className="container-custom relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up">Our Products</h1>
          <p className="text-xl text-white/90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Premium Egyptian produce for international markets
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-neutral-border sticky top-20 z-40 shadow-sm">
        <div className="container-custom py-6">
          {/* Season Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedSeason('all')}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                selectedSeason === 'all'
                  ? 'bg-brand-teal text-white'
                  : 'bg-neutral-soft text-neutral-text hover:bg-neutral-border'
              }`}
            >
              All Seasons
            </button>
            {seasons.map((season) => (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season.id || '')}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  selectedSeason === season.id
                    ? 'bg-brand-teal text-white'
                    : 'bg-neutral-soft text-neutral-text hover:bg-neutral-border'
                }`}
              >
                {season.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-neutral-border rounded-xl bg-white text-neutral-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-border rounded-xl bg-white text-neutral-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-neutral-soft">
        <div className="container-custom">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-text text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-neutral-text">
                Showing <span className="font-semibold text-brand-teal">{filteredProducts.length}</span> products
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${(index % 9) * 0.05}s` }}
                  >
                    <ProductCard
                      product={product}
                      category={product.category}
                      seasons={product.seasons}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
