'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Package, Calendar } from 'lucide-react';
import { Product, Category, Season } from '@/lib/types';
import { getCategoryColorClasses, getProductName, getProductDesc, getVarietyNames } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductDetailContentProps {
  product: Product;
  category: Category | null;
  validSeasons: (Season | null)[];
}

export default function ProductDetailContent({ product, category, validSeasons }: ProductDetailContentProps) {
  const { language } = useLanguage();
  const productName = getProductName(product.name, language);
  const productDesc = getProductDesc(product.shortDesc, language);
  const varieties = getVarietyNames(product.varieties, language);

  return (
    <>
      {/* Product Hero */}
      <section className="bg-neutral-soft py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={product.image}
                alt={productName}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Info */}
            <div className="animate-slide-up">
              <div className="flex flex-wrap gap-2 mb-4">
                {category && (
                  <span className={`chip border ${getCategoryColorClasses(category.name)}`}>
                    {category.name}
                  </span>
                )}
                {validSeasons.map((season) => (
                  <span
                    key={season!.id}
                    className="chip bg-white border border-neutral-border text-neutral-text"
                  >
                    <Calendar size={14} className="inline mr-1" />
                    {season!.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-brand-teal mb-4">
                {productName}
              </h1>

              <p className="text-lg text-neutral-text leading-relaxed mb-6">
                {productDesc}
              </p>

              {varieties.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-brand-teal mb-3 flex items-center gap-2">
                    <Package size={20} />
                    {language === 'fr' ? 'Variétés Disponibles' : 'Available Varieties'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {varieties.map((variety, index) => (
                      <span
                        key={index}
                        className="chip bg-brand-gold/10 text-brand-gold border border-brand-gold/20"
                      >
                        {variety}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href={`/contact?product=${product.slug}`}
                className="btn-primary inline-flex items-center gap-2"
              >
                {language === 'fr' ? 'Demander un Devis' : 'Request Quote'}
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {product.gallery && product.gallery.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-brand-teal mb-8 text-center">
              {language === 'fr' ? 'Galerie Produit' : 'Product Gallery'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {product.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Image src={image} alt={`${productName} ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Additional Info */}
      <section className="section-padding bg-neutral-soft">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <Image
                src="/images/products/product-sizes-grades.jpg"
                alt={language === 'fr' ? 'Tailles et Qualités' : 'Sizes and Grades'}
                width={400}
                height={300}
                className="rounded-xl mb-6 w-full"
              />
              <h3 className="text-2xl font-bold text-brand-teal mb-3">
                {language === 'fr' ? 'Tailles & Qualités' : 'Sizes & Grades'}
              </h3>
              <p className="text-neutral-text leading-relaxed">
                {language === 'fr'
                  ? 'Nous proposons diverses tailles et qualités pour répondre aux exigences de votre marché. Tri et classement personnalisés disponibles sur demande.'
                  : 'We offer various sizes and quality grades to match your market requirements. Custom sorting and grading available upon request.'}
              </p>
            </div>

            <div className="card p-8">
              <Image
                src="/images/products/product-packaging-options.jpg"
                alt={language === 'fr' ? 'Options d\'Emballage' : 'Packaging Options'}
                width={400}
                height={300}
                className="rounded-xl mb-6 w-full"
              />
              <h3 className="text-2xl font-bold text-brand-teal mb-3">
                {language === 'fr' ? 'Options d\'Emballage' : 'Packaging Options'}
              </h3>
              <p className="text-neutral-text leading-relaxed">
                {language === 'fr'
                  ? 'Solutions d\'emballage flexibles incluant cartons, caisses et conteneurs en vrac. Services d\'étiquetage et de marquage personnalisés disponibles.'
                  : 'Flexible packaging solutions including cartons, crates, and bulk containers. Custom labeling and branding services available.'}
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-brand-teal to-brand-teal/90 rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              {language === 'fr' ? 'Intéressé par ce Produit?' : 'Interested in This Product?'}
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Contactez notre équipe commerciale pour des spécifications détaillées, tarifs et options d\'expédition'
                : 'Contact our sales team for detailed specifications, pricing, and shipping options'}
            </p>
            <Link
              href={`/contact?product=${product.slug}`}
              className="btn-secondary inline-flex items-center gap-2"
            >
              {language === 'fr' ? 'Obtenir un Devis' : 'Get a Quote'}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

