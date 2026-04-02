'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop navigation links (Home is only in mobile)
  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Curriculum', href: '/curriculum' },
    { name: 'Mobile App', href: '/app-preview' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  // Mobile navigation links (Includes Home)
  const mobileNavLinks = [
    { name: 'Home', href: '/' },
    ...navLinks
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[72px] flex items-center ${
        isScrolled 
          ? 'bg-white/92 backdrop-blur-md shadow-[0_4px_24px_rgba(18,81,170,0.10)] border-b border-[#1251AA]/10' 
          : 'bg-white border-b border-[#1251AA]/5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-full">
        <nav className="relative flex items-center justify-between h-full">
          
          {/* LEFT: Logo */}
          <div className="flex-shrink-0 z-10">
            <Link href="/" className="flex items-center gap-[10px] group transition-transform duration-300 hover:scale-[1.02]">
              <Globe className="w-6 h-6 text-[#1251AA]" />
              <span className="font-sans font-bold text-lg text-[#0A1F5E]">
                My Learning Planet
              </span>
            </Link>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-[0.3rem] rounded-[8px] font-sans text-[15px] font-medium transition-all duration-200 group ${
                    isActive ? 'text-[#1251AA]' : 'text-[#0A1628] hover:text-[#1251AA] hover:bg-[#1251AA]/5'
                  }`}
                >
                  {link.name}
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#1251AA] rounded-[1px]"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 z-10">
            <Link
              href="/contact"
              className="font-sans font-medium text-[#1251AA] border-[1.5px] border-[#1251AA] px-5 py-2 rounded-full hover:bg-[#EAF1FF] transition-all duration-200"
            >
              Book a Demo
            </Link>
            <Link
              href="/contact"
              className="bg-[#1251AA] text-white font-sans font-bold px-6 py-2 rounded-full hover:bg-[#0A1F5E] hover:scale-[1.02] transition-all duration-200 shadow-[0_4px_14px_rgba(18,81,170,0.25)] hover:shadow-[0_6px_20px_rgba(18,81,170,0.35)]"
            >
              Enrol Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-[#0A1F5E] hover:bg-[#1251AA]/5 rounded-lg transition-colors z-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-[72px] left-0 right-0 bg-white border-b border-[#EAF1FF] shadow-[0_16px_40px_rgba(18,81,170,0.12)] lg:hidden overflow-hidden z-40"
          >
            <div className="flex flex-col py-2">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-6 py-4 font-sans font-medium text-[#0A1628] border-b border-[#EAF1FF] hover:bg-[#F8FAFF] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile CTAs */}
              <div className="p-6 flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="w-full py-3 rounded-full border-[1.5px] border-[#1251AA] text-[#1251AA] font-sans font-medium text-center hover:bg-[#EAF1FF] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book a Demo
                </Link>
                <Link
                  href="/contact"
                  className="w-full py-3 rounded-full bg-[#1251AA] text-white font-sans font-bold text-center hover:bg-[#0A1F5E] transition-colors shadow-lg shadow-[#1251AA]/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Enrol Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
