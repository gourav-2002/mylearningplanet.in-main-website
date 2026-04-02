'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  ChevronDown, 
  UserCheck, 
  CreditCard, 
  BookOpen, 
  AlertCircle, 
  RefreshCw, 
  Gavel,
  Mail,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  Cookie
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const FloatingSymbol = ({ symbol, size, top, left, delay, duration, rotation }: any) => {
  return (
    <div 
      className="absolute text-white pointer-events-none select-none opacity-5 md:opacity-8 animate-float-updown"
      style={{ 
        fontSize: size, 
        top, 
        left, 
        animationDelay: delay,
        animationDuration: duration,
        transform: `rotate(${rotation})`
      }}
    >
      {symbol}
    </div>
  );
};

const KeyTermCard = ({ icon: Icon, title, desc, pillText, pillBg, pillColor, delay }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-[20px] border border-ice-blue p-8 text-center shadow-[0_4px_24px_rgba(18,81,170,0.08)] hover:-translate-y-1.5 hover:border-primary transition-all duration-300 group"
    >
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-display text-xl font-bold text-navy mb-3">{title}</h3>
      <p className="text-slate-gray font-sans text-sm leading-relaxed mb-6">{desc}</p>
      <div 
        className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
        style={{ backgroundColor: pillBg, color: pillColor }}
      >
        {pillText}
      </div>
    </motion.div>
  );
};

const parseAnswer = (answer: string): { intro: string; points: string[] } => {
  const cleaned = answer.replace(/\n/g, ' ').trim();
  const firstMatch = cleaned.search(/\(\d+\)\s/);
  if (firstMatch === -1) return { intro: cleaned, points: [] };
  const intro = cleaned.slice(0, firstMatch).trim();
  const rest = cleaned.slice(firstMatch);
  const parts = rest
    .split(/(?=\(\d+\)\s)/)
    .map((p) => p.replace(/^\(\d+\)\s*/, '').trim())
    .filter(Boolean);
  return { intro, points: parts };
};

const AccordionItem = ({ item, isOpen, onClick, index }: any) => {
  const Icon = item.icon;
  const { intro, points } = parseAnswer(item.answer);

  return (
    <div className={`border-b border-ice-blue last:border-0 transition-colors duration-300 ${isOpen ? 'bg-gradient-to-r from-ice-blue to-[#F8FAFF]' : ''}`}>
      <div
        onClick={() => onClick(index)}
        className="px-7 py-6 flex items-center gap-5 cursor-pointer hover:bg-[#F8FAFF] transition-colors group"
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-ice-blue text-primary'}`}>
          <Icon className="w-[18px] h-[18px]" />
        </div>
        <span className={`flex-1 font-sans font-bold text-base transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-navy'}`}>
          {item.title}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-ice-blue text-primary'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pl-[72px] pr-8 pb-8">
              {intro && (
                <p className="text-slate-gray font-sans text-base leading-[1.8] mb-4">
                  {intro}
                </p>
              )}
              {points.length > 0 && (
                <ul className="space-y-3 mb-6">
                  {points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-gray font-sans text-base leading-[1.8]">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex justify-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDFBF3] text-[#22A05A] font-sans text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  Reviewed March 2025
                </span>
              </div>
              <div className="mt-6 h-[1px] bg-ice-blue w-full"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TermsOfServicePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const heroSymbols = [
    { s: '＋', sz: '2rem', t: '10%', l: '5%', d: '0s', dur: '6s', r: '10deg' },
    { s: '×', sz: '3rem', t: '70%', l: '10%', d: '2s', dur: '8s', r: '20deg' },
    { s: '÷', sz: '2.5rem', t: '80%', l: '85%', d: '0.5s', dur: '5s', r: '-10deg' },
    { s: '√', sz: '4rem', t: '15%', l: '45%', d: '1.5s', dur: '9s', r: '5deg' },
    { s: 'π', sz: '2rem', t: '60%', l: '40%', d: '2.5s', dur: '6s', r: '12deg' },
    { s: '∑', sz: '3.5rem', t: '40%', l: '90%', d: '3s', dur: '10s', r: '-5deg' },
    { s: '∞', sz: '3rem', t: '50%', l: '5%', d: '2.2s', dur: '9s', r: '-20deg' },
    { s: 'θ', sz: '2.2rem', t: '10%', l: '30%', d: '2.8s', dur: '8s', r: '5deg' },
  ];

  const policyItems = [
    {
      icon: UserCheck,
      title: "1. Enrollment and Eligibility",
        answer: "By enrolling in My Learning Planet, you agree to the following eligibility terms for students who choose our platform for maths tuition in gurgaon.\n\n(1) Age Requirement: Our platform is designed for students in Classes 6 through 10. Enrollment must be completed by a parent or legal guardian who is at least 18 years of age.\n(2) Accurate Information: You agree to provide accurate and complete information during registration, including your full name, contact details, and your child's current academic class.\n(3) Account Responsibility: You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
      },
    {
      icon: CreditCard,
      title: "2. Fees and Payments",
      answer: "Our subscription model is designed to be transparent and fair:\n\n(1) Subscription Plans: We offer monthly and annual subscription plans for families who choose our platform for maths tuition in gurgaon through a structured and consistent learning system. Current pricing is displayed on our Pricing page and is inclusive of applicable taxes unless stated otherwise.\n(2) Payment Processing: All payments are processed through Razorpay, our secure third-party payment gateway. We do not store your credit card or banking information on our servers.\n(3) Billing Cycle: Monthly subscriptions are billed every 30 days from the date of enrollment. Annual subscriptions are billed once every 12 months.\n(4) Late Payments: Failure to pay the subscription fee by the due date may result in temporary suspension of access to live classes and the student app, including learning content such as maths coaching in gurgaon modules."
    },
    {
      icon: RefreshCw,
      title: "3. Cancellation and Refunds",
      answer: "We believe in a hassle-free cancellation process:\n\n(1) 7-Day Guarantee: New enrollments are covered by our 7-day full refund guarantee. If you are not satisfied within the first 7 days, we will refund your first month's fee in full.\n(2) Cancellation Notice: You can cancel your subscription at any time by providing 15 days written notice via WhatsApp or email. Your access will continue until the end of the current paid billing period.\n(3) No Partial Refunds: Outside of the 7-day guarantee window, we do not provide partial refunds for unused days in a billing cycle.\n(4) Annual Plans: Cancellation of an annual plan stops future renewals but does not entitle you to a refund for the remaining months beyond the 7-day window."
    },
    {
      icon: BookOpen,
      title: "4. Use of Platform and Content",
      answer: "Our content is created with care for educational purposes:\n\n(1) License: We grant you a limited, non-exclusive, non-transferable license to access and use the platform for personal, non-commercial educational purposes, including studying topics such as maths coaching in gurgaon.\n(2) Prohibited Actions: You agree not to: (a) Record, download, or redistribute live classes or recorded lectures; (b) Share your login credentials with others; (c) Use the platform for any commercial purpose; (d) Attempt to reverse engineer or disrupt the platform's security.\n(3) Content Ownership: All curriculum materials, videos, notes, and software are the intellectual property of My Learning Planet and are protected by copyright laws."
    },
    {
      icon: AlertCircle,
      title: "5. Code of Conduct",
      answer: "To maintain a positive learning environment, we expect all students and parents to:\n\n(1) Respectful Interaction: Behave respectfully during live classes and in any communication with educators and other students.\n(2) Academic Integrity: Complete tests and assessments honestly to ensure accurate progress tracking.\n(3) Appropriate Content: Do not share any inappropriate, offensive, or harmful content on the platform.\n(4) Suspension: We reserve the right to suspend or terminate accounts that violate this code of conduct without a refund."
    },
    {
      icon: ShieldCheck,
      title: "6. Privacy and Data Protection",
      answer: "Your privacy is paramount to us. Our collection and use of your data are governed by our Privacy Policy. By using our platform, you consent to the data practices described in the Privacy Policy. We implement industry-standard security measures to protect your information, but you acknowledge that no system is 100% secure while accessing learning resources, including content related to maths classes in gurgaon."
    },
    {
      icon: Scale,
      title: "7. Limitation of Liability",
      answer: "While we strive for excellence, My Learning Planet is provided 'as is' without warranties of any kind. We are not liable for outcomes related to specific academic results, including performance in areas such as 10 standard maths.\n\n(1) Technical interruptions beyond our control (e.g., internet outages, device failures).\n(2) Indirect or consequential damages arising from the use of the platform.\n(3) Academic results, as learning outcomes depend on the student's individual effort and participation."
    },
    {
      icon: Gavel,
      title: "8. Governing Law and Disputes",
      answer: "These terms are governed by the laws of India. Any disputes arising from these terms or your use of the platform shall be subject to the exclusive jurisdiction of the courts in Gurgaon, Haryana. We encourage you to reach out to us directly at connect@mylearningplanet.in to resolve any concerns before pursuing formal legal action related to your experience with our maths tuition in gurgaon."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="overflow-x-hidden font-sans bg-white">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-[#0A1F5E] to-[#1251AA] flex items-center justify-center overflow-hidden py-20 px-4">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          {heroSymbols.map((sym, i) => (
            <FloatingSymbol 
              key={i} 
              symbol={sym.s} 
              size={sym.sz} 
              top={sym.t} 
              left={sym.l} 
              delay={sym.d} 
              duration={sym.dur} 
              rotation={sym.r} 
            />
          ))}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <nav className="flex justify-center items-center gap-2 text-white/45 text-sm mb-8 font-sans">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>→</span>
            <span className="text-white">Terms of Service</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <Scale className="w-4 h-4 text-gold" />
            Fair. Clear. Professional.
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 relative inline-block">
            Terms of <span className="relative">
              Service
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C40 2 160 2 198 10" stroke="#F5A623" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
            Our terms are built on mutual respect and clarity. Here is the agreement between My Learning Planet and the families we serve who choose our platform for maths tuition in gurgaon.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-sans">
              Last Updated: March 2025
            </div>
            <div className="px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-sans">
              Effective: March 2025
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — KEY TERMS STRIP */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <KeyTermCard 
              icon={UserCheck}
              title="Fair Enrollment"
              desc="Simple registration process for parents. We only ask for what's needed to start your child's journey."
              pillText="Easy Onboarding ✓"
              pillBg="#EDFBF3"
              pillColor="#22A05A"
              delay={0.1}
            />
            <KeyTermCard 
              icon={CreditCard}
              title="Transparent Billing"
              desc="No hidden fees. Secure payments via Razorpay. Clear monthly or annual subscription options."
              pillText="No Hidden Costs ✓"
              pillBg="#FFF8EC"
              pillColor="#F5A623"
              delay={0.2}
            />
            <KeyTermCard 
              icon={RefreshCw}
              title="Easy Cancellation"
              desc="Cancel anytime with 15 days notice. 7-day full refund guarantee for all new enrollments."
              pillText="Zero Lock-in ✓"
              pillBg="#EAF1FF"
              pillColor="#1251AA"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 — TL;DR / SUMMARY CARD */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[760px] mx-auto bg-gradient-to-br from-ice-blue to-[#F0F5FF] rounded-[28px] border-2 border-primary p-8 md:p-12 shadow-[0_16px_64px_rgba(18,81,170,0.14)] relative overflow-hidden"
          >
            {/* Watermark */}
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[120px] opacity-[0.08] select-none pointer-events-none">
              ⚖️
            </div>

            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider mb-6">
                📋 TL;DR — The Short Version
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-10">
                Our Terms in Plain English
              </h2>

              <div className="space-y-6 mb-10">
                {[
                  "Enrollment must be done by a parent or guardian over 18.",
                  "Payments are secure and transparent — no hidden surprises.",
                  "You can cancel anytime with a 15-day notice via WhatsApp/Email.",
                  "Our content is for your child's personal learning only — no sharing or recording.",
                  "We expect respectful behavior from everyone in our live classes.",
                  "We protect your data according to our strict Privacy Policy."
                ].map((point, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-full bg-green/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-green" />
                    </div>
                    <p className="text-navy font-sans font-medium text-base md:text-lg leading-tight pt-1">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <div className="w-[60px] h-1 bg-gold mx-auto mb-4"></div>
                <p className="text-slate-gray font-sans text-sm italic">
                  The full legal terms are below. We've made them as readable as possible.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — MAIN POLICY ACCORDION */}
      <section className="py-24 bg-gradient-to-b from-[#F0F5FF] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Full Terms</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">Detailed Terms of Service</h2>
            <p className="text-slate-gray font-sans text-lg">Click any section to expand the full legal details.</p>
          </div>

          <div className="max-w-[800px] mx-auto bg-white rounded-[28px] shadow-[0_16px_64px_rgba(18,81,170,0.12)] border border-ice-blue overflow-hidden">
            {policyItems.map((item, idx) => (
              <AccordionItem 
                key={idx}
                item={item}
                index={idx}
                isOpen={openIndex === idx}
                onClick={toggleAccordion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CONTACT FOR QUESTIONS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-wider mb-4 block">Have Questions?</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">We Are Here to Clarify</h2>
            <p className="text-slate-gray font-sans text-lg max-w-2xl mx-auto">
              If any part of these terms is unclear, please reach out. We believe in open communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
            {/* Email Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[24px] border border-ice-blue p-8 text-center shadow-sm hover:-translate-y-1.5 hover:border-primary transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-2">Email Us</h3>
              <p className="text-primary font-sans font-bold text-base mb-2">connect@mylearningplanet.in</p>
              <p className="text-slate-gray font-sans text-base mb-6">Response within 24 hours</p>
              <a 
                href="mailto:connect@mylearningplanet.in"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-primary text-primary font-sans font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300"
              >
                Send Email <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>

            {/* WhatsApp Card */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="bg-white rounded-[28px] border border-green/20 p-8 text-center shadow-[0_10px_30px_rgba(34,160,90,0.08)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 group"
           >
             {/* Icon */}
             <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green/10 to-green/5 flex items-center justify-center mx-auto mb-6">
               <MessageCircle className="w-7 h-7 text-green" />
             </div>
           
             {/* Heading */}
             <h3 className="font-display text-xl font-bold text-navy mb-2">
               WhatsApp Us
             </h3>
           
             {/* Number */}
             <p className="text-green font-sans font-semibold text-base mb-1">
               +91 9899389313
             </p>
           
             {/* Subtext */}
             <p className="text-slate-gray font-sans text-sm mb-6">
               Response within minutes
             </p>
           
             {/* BUTTON (FIXED ✨) */}
             <a 
               href="https://wa.me/919899389313"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-black text-white font-sans font-semibold text-sm
               hover:-translate-y-0.5 active:scale-95
               transition-all duration-300 ease-out"
             >
               Open WhatsApp
               <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
             </a>
           </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — RELATED LEGAL PAGES */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-sans font-bold text-xs uppercase tracking-widest mb-4 block">Related Policies</span>
          <h2 className="font-display text-4xl font-bold text-navy mb-16">Other Legal Documents</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link href="/privacy-policy" className="bg-white rounded-[20px] border border-ice-blue p-8 text-center shadow-sm hover:-translate-y-1 hover:border-primary transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-sans font-bold text-lg text-navy mb-2">Privacy Policy</h4>
              <p className="text-slate-gray text-lg mb-6">How we protect your data</p>
              <span className="text-primary text-base font-bold flex items-center justify-center gap-1">Read Policy <ArrowRight className="w-3 h-3" /></span>
            </Link>

            <Link href="/refund-policy" className="bg-white rounded-[20px] border border-ice-blue p-8 text-center shadow-sm hover:-translate-y-1 hover:border-primary transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-6 h-6 text-green" />
              </div>
              <h4 className="font-sans font-bold text-lg text-navy mb-2">Refund Policy</h4>
              <p className="text-slate-gray text-lg mb-6">Refund and cancellation terms</p>
              <span className="text-primary text-base font-bold flex items-center justify-center gap-1">Read Policy <ArrowRight className="w-3 h-3" /></span>
            </Link>

            <Link href="/cookie-policy" className="bg-white rounded-[20px] border border-ice-blue p-8 text-center shadow-sm hover:-translate-y-1 hover:border-primary transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Cookie className="w-6 h-6 text-gold" />
              </div>
              <h4 className="font-sans font-bold text-lg text-navy mb-2">Cookie Policy</h4>
              <p className="text-slate-gray text-lg mb-6">How we use cookies</p>
              <span className="text-primary text-base font-bold flex items-center justify-center gap-1">Read Policy <ArrowRight className="w-3 h-3" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 — BOTTOM CTA BANNER */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A1F5E] to-[#1251AA] overflow-hidden">
        {/* Math Symbols Background */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <span className="absolute top-10 left-10 text-4xl text-white">∑</span>
          <span className="absolute bottom-10 right-10 text-4xl text-white">π</span>
          <span className="absolute top-1/2 left-1/4 text-3xl text-white">√</span>
          <span className="absolute bottom-1/4 right-1/3 text-5xl text-white">∞</span>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-8">
            <Scale className="w-8 h-8 text-gold" />
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Clarity Builds Better Learning.
          </h2>
          
          <p className="text-white/75 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-12">
            Questions about our terms? We answer personally — always.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link href="/contact"
              className="px-10 py-4 rounded-full bg-gold text-navy font-sans font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(245,166,35,0.4)] animate-pulse-slow"
            >
              ✦ Contact Us
            </Link>
            <Link href="/"
              className="px-10 py-4 rounded-full border-2 border-white text-white font-sans font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300"
            >
              Back to Home →
            </Link>
          </div>

          <p className="text-white/30 text-xs font-sans">
            © 2025 My Learning Planet. All rights reserved.
          </p>
        </div>
      </section>

      {/* Custom Styles for Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-updown {
          0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, 0deg)); }
          50% { transform: translateY(-20px) rotate(var(--tw-rotate, 0deg)); }
        }
        .animate-float-updown {
          animation: float-updown 6s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 20px rgba(245,166,35,0.4); }
          50% { box-shadow: 0 0 40px rgba(245,166,35,0.6); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
