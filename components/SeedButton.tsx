'use client';

import { useState } from 'react';
import { Database, Package } from 'lucide-react';
import { seedCompleteDatabase } from '@/lib/seedDataComplete';
import { clearAllCache } from '@/lib/cache';

export default function SeedButton() {
  const [loading, setLoading] = useState(false);

  async function handleSeed() {
    if (!confirm('This will add/update ALL products with images to your database (37 products). Continue?')) return;

    setLoading(true);
    try {
      const result = await seedCompleteDatabase();
      // Clear all cache after seeding
      clearAllCache();
      alert(
        `✅ Complete database seeded successfully!\n\nCategories: ${result.counts.categories}\nSeasons: ${result.counts.seasons}\nProducts Created: ${result.counts.productsCreated}\nProducts Updated: ${result.counts.productsUpdated}\nTotal Products: ${result.counts.totalProducts}\nOrder Range: ${result.counts.orderRange}`
      );
      window.location.reload();
    } catch (error) {
      console.error('Seed error:', error);
      alert('❌ Error seeding database. Check console for details.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSeed}
      disabled={loading}
      className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Package size={20} />
      {loading ? 'Seeding All Products...' : 'Seed All Products (37)'}
    </button>
  );
}
