import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'EL SHROUQ Import & Export | Egyptian Produce Export',
  description: 'Premium Egyptian agricultural products exported worldwide. Fresh vegetables, fruits, citrus, berries, and frozen produce.',
  keywords: 'egyptian export, produce export, vegetables, fruits, citrus, berries, frozen produce',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
