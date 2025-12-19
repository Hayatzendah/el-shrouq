'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { ArrowRight, CheckCircle2, Package, Thermometer, ShieldCheck, Carrot, Apple, Citrus, Leaf, Snowflake } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { translations } from '@/lib/translations';

export default function HomePage() {
  const { language } = useLanguage();

  // Memoize categories to avoid recalculation on every render
  const categories = useMemo(() => [
    {
      name: t(translations['home.categories.vegetables'], language),
      slug: 'vegetables',
      image: '/images/home/category-vegetables.jpg',
      examples: [
        t(translations['product.potatoes'], language),
        t(translations['product.onions'], language),
        t(translations['product.tomatoes'], language),
        t(translations['product.peppers'], language),
      ],
      color: 'bg-brand-green',
      icon: Carrot,
    },
    {
      name: t(translations['home.categories.fruits'], language),
      slug: 'fruits',
      image: '/images/home/category-fruits.jpg',
      examples: [
        t(translations['product.grapes'], language),
        t(translations['product.pomegranates'], language),
        t(translations['product.melons'], language),
        t(translations['product.mangoes'], language),
      ],
      color: 'bg-brand-orange',
      icon: Apple,
    },
    {
      name: t(translations['home.categories.citrus'], language),
      slug: 'citrus',
      image: '/images/home/category-citrus.jpg',
      examples: [
        t(translations['product.oranges'], language),
        t(translations['product.lemons'], language),
        t(translations['product.mandarins'], language),
        t(translations['product.grapefruit'], language),
      ],
      color: 'bg-brand-gold',
      icon: Citrus,
    },
    {
      name: t(translations['home.categories.medicinalPlants'], language),
      slug: 'medicinal-plants',
      image: '/images/home/category-berries.jpg',
      examples: [
        t(translations['product.herbs'], language),
        t(translations['product.spices'], language),
        t(translations['product.medicinalHerbs'], language),
      ],
      color: 'bg-purple-600',
      icon: Leaf,
    },
    {
      name: t(translations['home.categories.frozen'], language),
      slug: 'frozen',
      image: '/images/home/category-frozen.jpg',
      examples: [
        t(translations['product.frozenVegetables'], language),
        t(translations['product.frozenFruits'], language),
        t(translations['product.iqf'], language),
      ],
      color: 'bg-brand-teal',
      icon: Snowflake,
    },
  ], [language]);

  // Memoize quality features
  const qualityFeatures = useMemo(() => [
    {
      icon: ShieldCheck,
      title: t(translations['home.quality.inspection.title'], language),
      description: t(translations['home.quality.inspection.desc'], language),
      image: '/images/home/quality-inspection.jpg',
    },
    {
      icon: Package,
      title: t(translations['home.quality.packing.title'], language),
      description: t(translations['home.quality.packing.desc'], language),
      image: '/images/home/packing-cartons.jpg',
    },
    {
      icon: Thermometer,
      title: t(translations['home.quality.storage.title'], language),
      description: t(translations['home.quality.storage.desc'], language),
      image: '/images/home/cold-storage.webp.jpg',
    },
  ], [language]);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-teal to-brand-teal/80 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/home/home-hero-export-produce.jpg"
            alt="Fresh Produce"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              {t(translations['home.hero.title'], language)}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {t(translations['home.hero.subtitle'], language)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link href="/products" className="btn-primary text-center">
                {t(translations['home.hero.exploreProducts'], language)}
                <ArrowRight className="inline ml-2" size={20} />
              </Link>
              <Link href="/contact" className="btn-secondary text-center">
                {t(translations['home.hero.contactSales'], language)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-neutral-soft">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-teal mb-4">
              {t(translations['home.categories.title'], language)}
            </h2>
            <p className="text-neutral-text text-lg max-w-2xl mx-auto">
              {t(translations['home.categories.subtitle'], language)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.slug}
                className="card group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <category.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-teal mb-3">{category.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.examples.map((example) => (
                      <span key={example} className="chip bg-white border border-neutral-border text-neutral-text">
                        {example}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-gold font-semibold transition-colors"
                  >
                    {t(translations['home.categories.explore'], language)} {category.name}
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-teal mb-4">
              {t(translations['home.quality.title'], language)}
            </h2>
            <p className="text-neutral-text text-lg max-w-2xl mx-auto">
              {t(translations['home.quality.subtitle'], language)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="card animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-brand-orange mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-brand-teal mb-2">{feature.title}</h3>
                  <p className="text-neutral-text">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-neutral-soft rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-brand-green flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-brand-teal mb-1">{t(translations['home.quality.premiumSelection.title'], language)}</h4>
                    <p className="text-neutral-text text-sm">{t(translations['home.quality.premiumSelection.desc'], language)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-brand-green flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-brand-teal mb-1">{t(translations['home.quality.expertHandling.title'], language)}</h4>
                    <p className="text-neutral-text text-sm">{t(translations['home.quality.expertHandling.desc'], language)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-brand-green flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-brand-teal mb-1">{t(translations['home.quality.timelyDelivery.title'], language)}</h4>
                    <p className="text-neutral-text text-sm">{t(translations['home.quality.timelyDelivery.desc'], language)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-brand-green flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-brand-teal mb-1">{t(translations['home.quality.traceability.title'], language)}</h4>
                    <p className="text-neutral-text text-sm">{t(translations['home.quality.traceability.desc'], language)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home/home-cta-background.jpg"
            alt="Contact Us"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-teal/85" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t(translations['home.cta.title'], language)}
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            {t(translations['home.cta.subtitle'], language)}
          </p>
          <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
            {t(translations['home.cta.button'], language)}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
