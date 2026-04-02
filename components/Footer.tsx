import React from 'react';
import Link from 'next/link';
import { Globe, Instagram, Youtube, Facebook, MessageCircle, Lock, ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" },
    { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/Mylearningplanet/", label: "Facebook" },
    { icon: <MessageCircle className="w-5 h-5" />, href:"https://wa.me/919899389313?text=Hi!%20I'm%20interested%20in%20My%20Learning%20Planet%20%E2%80%94%20a%20structured%20Math%20coaching%20program%20for%20Class%206%E2%80%9310%20students%20in%20Gurgaon.%0A%0ACould%20you%20share%20more%20details%20about%20the%20classes%2C%20fees%2C%20and%20how%20to%20enroll%3F", label: "WhatsApp" },
  ];

  const userPortals = [
    { name: "Student Portal", desc: "Classes, tests, notes", href: "#" },
    { name: "Parent Portal", desc: "Progress + reports", href: "#" },
    { name: "Teacher Panel", desc: "Batches + analytics", href: "#" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Curriculum", href: "/curriculum" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
    { name: "Book a Demo", href: "/contact" },
    { name: "App Preview", href: "/app-preview" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Blog", href: "/blog" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ];

  return (
    <footer className="relative bg-navy text-white pt-20 pb-10 overflow-hidden font-sans">
      {/* Subtle Math Symbols Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 select-none overflow-hidden">
        <span className="absolute top-10 left-[10%] text-6xl font-bold">÷</span>
        <span className="absolute top-40 right-[15%] text-7xl font-bold">+</span>
        <span className="absolute bottom-20 left-[20%] text-8xl font-bold">×</span>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-bold">√</span>
        <span className="absolute bottom-40 right-[10%] text-6xl font-bold">∑</span>
        <span className="absolute top-20 right-[40%] text-5xl font-bold">π</span>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Section 1: Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-8 h-8 text-primary" />
              <span className="font-display text-3xl font-bold">My Learning Planet</span>
            </div>
            <p className="text-gold font-medium text-base mb-4 tracking-wide uppercase">
              Clarity. Consistency. Measurable Growth.
            </p>
            <p className="text-[#5A6B82] text-base leading-relaxed mb-8">
              Gurgaon's most structured math learning platform for Classes 6–10.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="p-2 rounded-full border border-white/10 hover:border-gold hover:text-gold transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: User Portals */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-l-4 border-gold pl-3">User Portals</h4>
            <ul className="space-y-4">
              {userPortals.map((portal, idx) => (
                <li key={idx}>
                  <a href={portal.href} className="group flex items-start gap-3 hover:text-gold transition-colors">
                    <div className="mt-1 p-1 bg-white/5 rounded group-hover:bg-gold/10 transition-colors">
                      <Lock className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="font-semibold text-base">{portal.name}</p>
                      <p className="text-sm text-[#5A6B82]">{portal.desc}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Quick Links (2 Column Grid) */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-l-4 border-gold pl-3">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-base text-[#5A6B82] hover:text-gold transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-l-4 border-gold pl-3">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <span className="text-base text-[#5A6B82]">15th Floor, OCUS Quantum,
                  Sector 51, Gurgaon 122003</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a href="mailto:connect@mylearningplanet.in" className="text-base text-[#5A6B82] hover:text-gold transition-colors">
                  connect@mylearningplanet.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <a href="tel:+919899389313" className="text-base text-[#5A6B82] hover:text-gold transition-colors">
                  +91 9899389313
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[#5A6B82] text-center md:text-left">
            © {currentYear} My Learning Planet. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            {legalLinks.map((link, idx) => (
              <React.Fragment key={idx}>
                <Link href={link.href} className="text-sm text-[#5A6B82] hover:text-white transition-colors">
                  {link.name}
                </Link>
                {idx < legalLinks.length - 1 && (
                  <span className="text-[#5A6B82]/30 text-sm">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
