import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Product, Category, Season } from '@/lib/types';
import { getCategoryColorClasses, getProductName, getProductDesc } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  category?: Category;
  seasons?: Season[];
}

export default function ProductCard({ product, category, seasons }: ProductCardProps) {
  const { language } = useLanguage();
  const productName = getProductName(product.name, language);
  const productDesc = getProductDesc(product.shortDesc, language);

  return (
    <div className="card group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={productName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-teal mb-2">{productName}</h3>
        <p className="text-neutral-text text-sm mb-4 line-clamp-2">{productDesc}</p>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {category && (
            <span className={`chip border ${getCategoryColorClasses(category.name)}`}>
              {category.name}
            </span>
          )}
          {seasons?.slice(0, 2).map((season) => (
            <span
              key={season.id}
              className="chip bg-neutral-soft text-neutral-text border border-neutral-border"
            >
              {season.name}
            </span>
          ))}
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-gold font-semibold transition-colors"
        >
          View Details
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
