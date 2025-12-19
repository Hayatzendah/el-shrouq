import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Vision',
      description: 'To be the leading Egyptian agricultural exporter recognized for consistent quality and reliability in international markets.',
    },
    {
      icon: Eye,
      title: 'Mission',
      description: 'To deliver premium Egyptian produce to global markets through excellence in selection, handling, and logistics.',
    },
    {
      icon: Award,
      title: 'Values',
      description: 'Quality, Transparency, Commitment, Innovation, and Long-term Partnerships.',
    },
  ];

  const facilities = [
    {
      title: 'Modern Facilities',
      description: 'State-of-the-art sorting and packing facilities',
      image: '/images/about/about-hero-packinghouse.jpg',
    },
    {
      title: 'Strategic Logistics',
      description: 'Efficient supply chain management',
      image: '/images/about/about-logistics-container.jpg',
    },
    {
      title: 'Dedicated Team',
      description: 'Experienced professionals at every stage',
      image: '/images/about/about-team-work.jpg',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/about/about-farm-field.jpg"
          alt="About EL SHROUQ"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-teal/70" />
        <div className="container-custom relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up">About EL SHROUQ</h1>
          <p className="text-xl md:text-2xl text-white/90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Excellence in Egyptian Agricultural Export
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-teal mb-8 text-center">
              Who We Are
            </h2>
            <div className="space-y-6 text-lg text-neutral-text leading-relaxed">
              <p>
                We are <strong className="text-brand-teal">EL SHROUQ for Agricultural Export</strong>, dedicated to delivering the finest Egyptian agricultural products to global markets through a comprehensive system that focuses on selecting the best crops from trusted sources, followed by sorting, processing, and packaging according to each client's and market's requirements.
              </p>
              <p>
                We believe that quality is not a single step, but a chain that begins in the field and continues through meticulous monitoring of processing, packaging, and cold chain logistics, ending with the shipment arriving in optimal condition.
              </p>
              <p>
                Our goal is to build long-term partnerships based on commitment, transparency, and flexibility in meeting orders, whether for fresh or frozen shipments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="section-padding bg-neutral-soft">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <div
                key={item.title}
                className="card p-8 text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-bold text-brand-teal mb-4">{item.title}</h3>
                <p className="text-neutral-text leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Logistics */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-teal mb-4">
              Our Infrastructure
            </h2>
            <p className="text-neutral-text text-lg max-w-2xl mx-auto">
              Modern facilities and efficient operations ensure the highest quality standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={facility.title}
                className="card group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-teal mb-2">{facility.title}</h3>
                  <p className="text-neutral-text">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-brand-teal to-brand-teal/90 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Why Choose Us</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold text-2xl">✓</span>
                    <span>Direct relationships with trusted farms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold text-2xl">✓</span>
                    <span>Advanced quality control systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold text-2xl">✓</span>
                    <span>Flexible packaging and labeling options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold text-2xl">✓</span>
                    <span>Competitive pricing and reliable shipping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold text-2xl">✓</span>
                    <span>Full compliance with international standards</span>
                  </li>
                </ul>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xl mb-6">
                  Ready to partner with us for your agricultural import needs?
                </p>
                <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
                  Get in Touch
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
