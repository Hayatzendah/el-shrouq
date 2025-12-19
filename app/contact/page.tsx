'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Mail, Phone, MessageSquare } from 'lucide-react';

function ContactForm() {
  const searchParams = useSearchParams();
  const [productName, setProductName] = useState('');

  useEffect(() => {
    const product = searchParams.get('product');
    if (product) {
      setProductName(product);
    }
  }, [searchParams]);

  return (
    <div className="card p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <h2 className="text-2xl font-bold text-brand-teal mb-6">Send Us a Message</h2>

      <form action="https://formspree.io/f/xeoyyyzv" method="POST" className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-text mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-neutral-text mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full px-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
              placeholder="Your Company"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-text mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-text mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
              placeholder="+1234567890"
            />
          </div>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-neutral-text mb-2">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="w-full px-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
            placeholder="Your Country"
          />
        </div>

        <div>
          <label htmlFor="product" className="block text-sm font-medium text-neutral-text mb-2">
            Product Interest
          </label>
          <input
            type="text"
            id="product"
            name="product"
            defaultValue={productName}
            className="w-full px-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
            placeholder="e.g., Potatoes, Oranges"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-text mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal resize-none"
            placeholder="Tell us about your requirements..."
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Send Message
        </button>

        <p className="text-sm text-neutral-muted text-center">
          We typically respond within 24 hours
        </p>
      </form>
    </div>
  );
}

export default function ContactPage() {

  const contactMethods: Array<{
    icon: any;
    title: string;
    items: Array<{ label: string; value: string; link?: string }>;
  }> = [
    {
      icon: Phone,
      title: 'Phone & WhatsApp',
      items: [
        { label: 'Primary', value: '01023498590', link: 'tel:+201023498590' },
        { label: 'Sales', value: '01034490529', link: 'https://wa.me/201034490529' },
        { label: 'Support', value: '01034490525', link: 'https://wa.me/201034490525' },
      ],
    },
    {
      icon: Mail,
      title: 'Email',
      items: [
        { label: 'General Inquiries', value: 'info@el-shrouq.com', link: 'mailto:info@el-shrouq.com' },
      ],
    },
    {
      icon: MessageSquare,
      title: 'Business Hours',
      items: [
        { label: 'Sunday - Thursday', value: '9:00 AM - 6:00 PM' },
        { label: 'Saturday', value: '10:00 AM - 3:00 PM' },
      ],
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/contact/contact-hero-support.jpg"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-teal/70" />
        <div className="container-custom relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up">Contact Us</h1>
          <p className="text-xl text-white/90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Get in touch for quotes, samples, and export consultation
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-teal mb-8">Get In Touch</h2>

              {contactMethods.map((method, index) => (
                <div
                  key={method.title}
                  className="card p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-brand-teal mb-3">{method.title}</h3>
                      <div className="space-y-2">
                        {method.items.map((item, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-sm text-neutral-muted">{item.label}</span>
                            {item.link ? (
                              <a
                                href={item.link}
                                className="text-neutral-text hover:text-brand-orange font-medium transition-colors"
                                target={item.link.startsWith('http') ? '_blank' : undefined}
                                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                              >
                                {item.value}
                              </a>
                            ) : (
                              <span className="text-neutral-text font-medium">{item.value}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="card p-6 bg-gradient-to-br from-brand-teal to-brand-teal/90 text-white">
                <h3 className="text-xl font-bold mb-3">Why Contact Us?</h3>
                <ul className="space-y-2 text-white/90">
                  <li>✓ Competitive pricing and flexible terms</li>
                  <li>✓ Free samples available for serious buyers</li>
                  <li>✓ Custom packaging and labeling options</li>
                  <li>✓ Expert consultation on export requirements</li>
                  <li>✓ Reliable shipping and logistics support</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Suspense fallback={<div className="card p-8"><p className="text-center">Loading form...</p></div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
