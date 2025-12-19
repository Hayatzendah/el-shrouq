'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { translations } from '@/lib/translations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  return (
    <footer className="bg-brand-teal text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">EL SHROUQ</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {t(translations['footer.description'], language)}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t(translations['footer.quickLinks'], language)}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  {t(translations['nav.home'], language)}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  {t(translations['nav.about'], language)}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors">
                  {t(translations['nav.products'], language)}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  {t(translations['nav.contact'], language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t(translations['footer.contactUs'], language)}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white/80 text-sm">{t(translations['contact.phone.primary'], language)}: 01023498590</div>
                  <div className="text-white/80 text-sm">{t(translations['contact.phone.sales'], language)}: 01034490529</div>
                  <div className="text-white/80 text-sm">{t(translations['contact.phone.support'], language)}: 01034490525</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@el-shrouq.com"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  info@el-shrouq.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Egypt</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/70 text-sm">
            &copy; {currentYear} {t(translations['footer.copyright'], language)}
          </p>
        </div>
      </div>
    </footer>
  );
}
