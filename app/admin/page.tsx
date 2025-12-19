'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Calendar, FolderTree, Eye, EyeOff } from 'lucide-react';
import { getProducts, getSeasons, getCategories } from '@/lib/firestore';
import SeedButton from '@/components/SeedButton';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    visibleProducts: 0,
    totalSeasons: 0,
    visibleSeasons: 0,
    totalCategories: 0,
    visibleCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Disable cache for admin dashboard to always get fresh data
        const [products, seasons, categories] = await Promise.all([
          getProducts(false), // useCache = false
          getSeasons(false), // useCache = false
          getCategories(false), // useCache = false
        ]);

        setStats({
          totalProducts: products.length,
          visibleProducts: products.filter((p) => p.isVisible).length,
          totalSeasons: seasons.length,
          visibleSeasons: seasons.filter((s) => s.isVisible).length,
          totalCategories: categories.length,
          visibleCategories: categories.filter((c) => c.isVisible).length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Products',
      total: stats.totalProducts,
      visible: stats.visibleProducts,
      icon: Package,
      href: '/admin/products',
      color: 'bg-brand-orange',
    },
    {
      title: 'Seasons',
      total: stats.totalSeasons,
      visible: stats.visibleSeasons,
      icon: Calendar,
      href: '/admin/seasons',
      color: 'bg-brand-teal',
    },
    {
      title: 'Categories',
      total: stats.totalCategories,
      visible: stats.visibleCategories,
      icon: FolderTree,
      href: '/admin/categories',
      color: 'bg-brand-green',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
          <p className="text-neutral-text">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-teal mb-2">Dashboard</h1>
          <p className="text-neutral-text">Welcome to your admin panel</p>
        </div>
        {stats.totalProducts === 0 && <SeedButton />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div className="card p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center`}>
                  <card.icon className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-brand-teal mb-1">{card.total}</h3>
              <p className="text-neutral-muted mb-3">{card.title}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-brand-green">
                  <Eye size={16} />
                  <span>{card.visible} visible</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-muted">
                  <EyeOff size={16} />
                  <span>{card.total - card.visible} hidden</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-brand-teal mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/products"
              className="block px-4 py-3 bg-neutral-soft hover:bg-neutral-border rounded-xl transition-colors"
            >
              Manage Products
            </Link>
            <Link
              href="/admin/seasons"
              className="block px-4 py-3 bg-neutral-soft hover:bg-neutral-border rounded-xl transition-colors"
            >
              Manage Seasons
            </Link>
            <Link
              href="/admin/categories"
              className="block px-4 py-3 bg-neutral-soft hover:bg-neutral-border rounded-xl transition-colors"
            >
              Manage Categories
            </Link>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-brand-teal mb-4">System Info</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-muted">Database</span>
              <span className="text-brand-green font-semibold">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-muted">Last Updated</span>
              <span className="text-neutral-text">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-muted">Version</span>
              <span className="text-neutral-text">1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
