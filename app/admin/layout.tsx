'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, Calendar, FolderTree, LogOut } from 'lucide-react';
import AdminGuard from '@/components/AdminGuard';
import { logout } from '@/lib/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/admin/login';

  async function handleLogout() {
    await logout();
    router.push('/admin/login');
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/seasons', label: 'Seasons', icon: Calendar },
    { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-neutral-soft flex">
        {/* Sidebar */}
        <aside className="w-64 bg-brand-teal text-white fixed h-full overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">EL SHROUQ</h1>
            <p className="text-white/70 text-sm">Admin Dashboard</p>
          </div>

          <nav className="px-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white font-semibold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <link.icon size={20} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 mt-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors w-full"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          <div className="p-6 mt-auto">
            <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">
              ← Back to Website
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
