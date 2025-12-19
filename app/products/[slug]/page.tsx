'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductBySlug, Product, Category, Season } from '@/lib/phpApi';
import ProductDetailContent from '@/components/ProductDetailContent';

// Force static generation - page will be rendered client-side
export const dynamic = 'force-static';
export const dynamicParams = true;

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [validSeasons, setValidSeasons] = useState<(Season | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;
      
      try {
        setLoading(true);
        const fetchedProduct = await getProductBySlug(slug, true);
        
        if (!fetchedProduct || !fetchedProduct.isVisible) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setProduct(fetchedProduct);

        // Fetch category
        if (fetchedProduct.categoryId) {
          const fetchedCategory = await getCategoryById(fetchedProduct.categoryId, true);
          setCategory(fetchedCategory);
        }

        // Fetch seasons
        const seasons = await Promise.all(
          fetchedProduct.seasonIds.map((seasonId) => getSeasonById(seasonId, true))
        );
        const valid = seasons.filter((s) => s !== null && s.isVisible);
        setValidSeasons(valid);
      } catch (error) {
        console.error('Error fetching product:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
          <p className="text-neutral-text">Loading product...</p>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-teal mb-4">Product Not Found</h1>
          <p className="text-neutral-text mb-6">The product you're looking for doesn't exist or is not available.</p>
          <a href="/products" className="btn-primary inline-flex items-center gap-2">
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <ProductDetailContent product={product} category={category} validSeasons={validSeasons} />
    </div>
  );
}
