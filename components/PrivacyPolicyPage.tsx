'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Eye, 
  ChevronDown, 
  Database, 
  Target, 
  Share2, 
  Baby, 
  Cookie, 
  Clock, 
  UserCog, 
  RefreshCw,
  Mail,
  MessageCircle,
  ArrowRight,
  CheckCircle2
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

const TrustCard = ({ icon: Icon, title, desc, pillText, pillBg, pillColor, delay }: any) => {
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
      <p className="text-slate-gray font-sans text-base leading-relaxed mb-6">{desc}</p>
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
  const firstMatch = answer.search(/\(\d+\)\s/);
  if (firstMatch === -1) return { intro: answer, points: [] };
  const intro = answer.slice(0, firstMatch).trim();
  const rest = answer.slice(firstMatch);
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
    <div className={`border-bottom border-ice-blue last:border-0 transition-colors duration-300 ${isOpen ? 'bg-gradient-to-r from-ice-blue to-[#F8FAFF]' : ''}`}>
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
                  <CheckCircle2 className="w-3 h-3" />
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

export default function PrivacyPolicyPage() {
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
      icon: Database,
      title: "Information We Collect",
      answer: "We collect the following information when you register and use our platform: (1) Parent or guardian details — full name, email address, WhatsApp or phone number, and city of residence. (2) Child details — first name, current class, and academic performance data generated through tests and assessments on our platform. (3) Device and usage data — browser type, device type, IP address, and pages visited on our website — collected automatically through standard analytics tools. (4) Payment information — we collect only the information needed to process your subscription payment. We use Razorpay as our payment processor and do not store any card numbers or banking credentials on our servers. We collect only what is genuinely necessary to deliver our service effectively across our maths tuition in gurgaon platform — nothing more."
    },
    {
      icon: Target,
      title: "How We Use Your Information",
      answer: "We use the information we collect for the following purposes: (1) To deliver our service — scheduling and conducting live classes, sending recorded lecture access, administering weekly tests, and generating progress reports. (2) To operate the parent dashboard — displaying your child's attendance, test scores, and improvement trends in real time. (3) To communicate with you — sending weekly progress reports, class reminders, fee receipts, and important platform updates via WhatsApp and email. (4) To improve our platform — using aggregated, anonymised usage data to improve our curriculum, app experience, and teaching methods. (5) For billing and subscription management — processing your monthly or annual subscription payment and maintaining payment records. We never use your data for advertising, profiling, or any purpose beyond delivering and improving our service."
    },
    {
      icon: Share2,
      title: "Data Sharing and Third Parties",
      answer: "We do not sell, rent, or trade your personal information to any third party — ever. We share data only in the following limited circumstances: (1) Payment processing — your payment details are shared with Razorpay, our secure payment gateway, solely to process your subscription. Razorpay is PCI-DSS compliant and handles all payment data under their own strict privacy policy. (2) Communication tools — we use WhatsApp Business and standard email providers to send you progress reports and class updates. Only the information necessary to send these communications is used. (3) Legal compliance — we may disclose information if required to do so by Indian law, court order, or government authority. Outside of these three situations, your data stays with us and is used only to serve you and improve your learning experience, including access to content such as maths classes in gurgaon."
    },
    {
      icon: Shield,
      title: "How We Protect Your Data",
      answer: "We take data security seriously and implement the following measures to protect your information: (1) All data transmitted between your device and our servers is encrypted using industry-standard HTTPS and SSL protocols, ensuring secure access to learning content. (2) Our student and parent apps are built on secure infrastructure with access controls that limit who within our team can view student data. (3) Payment data is never stored on our servers — all payment processing is handled entirely by Razorpay's PCI-DSS certified systems. (4) Access to student performance data within our internal team is restricted to the educator and platform administrator only. (5) We conduct regular reviews of our data practices to ensure they remain secure and up to date. While no system can guarantee absolute security, we take every reasonable precaution to protect your personal information."
    },
    {
      icon: Baby,
      title: "Children's Privacy and Data",
      answer: "We are deeply committed to protecting the privacy of children who use our platform. Our service is designed for students in Classes 6 through 10, which typically includes children between the ages of 11 and 16. We handle children's data with the following additional care while supporting academic areas such as maths coaching in gurgaon: (1) We collect only the child's first name and class — no sensitive personal information is collected from the child directly. (2) All enrollment, consent, and communication is conducted with the parent or legal guardian — never directly with the child. (3) Student performance data — test scores, attendance records, and progress reports — is accessible only to the parent or guardian and the educator. (4) We do not display advertising to students on our platform. (5) We do not share any child-specific data with third parties for any purpose other than delivering the educational service. Parents can request deletion of their child's data at any time by contacting us directly."
    },
    {
      icon: Cookie,
      title: "Cookies and Tracking",
      answer: "Our website uses cookies and similar tracking technologies to improve your browsing experience. Here is what we use and why: (1) Essential cookies — required for the website to function correctly, including maintaining your login session on the student and parent apps. These cannot be disabled without affecting core functionality. (2) Analytics cookies — we use standard web analytics to understand how visitors use our website, which pages are most visited, and how we can improve. This data is aggregated and anonymised — we cannot identify individual users from it. (3) We do not use advertising cookies, retargeting pixels, or any tracking technology designed to serve you ads elsewhere on the internet. You can control cookie settings through your browser settings at any time. Disabling non-essential cookies will not affect your access to classes, the student app, or the parent dashboard."
    },
    {
      icon: Clock,
      title: "Data Retention",
      answer: "We retain your personal information for the following periods: (1) Account and profile data — kept for the duration of your active subscription plus 12 months after cancellation, in case you choose to re-enrol. (2) Student performance data — test scores, attendance records, and progress reports are retained for 24 months to allow you to track long-term improvement trends in areas such as maths coaching in gurgaon. (3) Payment records — retained for 7 years as required by Indian financial regulations and the Companies Act. (4) Communication records — WhatsApp and email communication logs are retained for 12 months. After the applicable retention period, your data is securely deleted from our systems. You may request early deletion of your data at any time — see the Your Rights section below."
    },
    {
      icon: UserCog,
      title: "Your Rights and Choices",
      answer: "As a user of My Learning Planet, you have the following rights regarding your personal data: (1) Right to access — you can request a copy of all personal data we hold about you and your child at any time. (2) Right to correction — if any information we hold is inaccurate or incomplete, you can request that we correct it immediately. (3) Right to deletion — you can request that we delete your personal data and your child's data from our systems. We will action this within 14 business days, subject to any legal retention obligations. (4) Right to withdraw consent — you can unsubscribe from marketing communications at any time by replying STOP to any WhatsApp message or clicking unsubscribe in any email. (5) Right to data portability — you can request an export of your child's performance data in a readable format. To exercise any of these rights, contact us at connect@mylearningplanet.in or WhatsApp us directly. We will respond within 7 business days."
    },
    {
      icon: RefreshCw,
      title: "Changes to This Policy",
      answer: "We may update this Privacy Policy from time to time to reflect changes in our services, technology, or legal requirements. When we make changes: (1) We will update the Effective Date at the top of this page so you always know when it was last revised. (2) For significant changes that affect how we use your data, we will notify you directly via WhatsApp or email at least 14 days before the changes take effect. (3) Continued use of our platform after the effective date of any changes constitutes your acceptance of the updated policy. (4) All previous versions of this policy are available on request by emailing connect@mylearningplanet.in. These updates help us continuously improve our systems and user experience across our maths tuition in gurgaon platform. We encourage you to review this policy periodically. If you have any concerns about any changes we make, please contact us directly — we are always happy to explain and discuss."
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
            <span className="text-white">Privacy Policy</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <Lock className="w-4 h-4 text-gold" />
            Your Privacy is Our Priority
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 relative inline-block">
            Privacy <span className="relative">
              Policy
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C40 2 160 2 198 10" stroke="#F5A623" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
            We are committed to protecting your personal data and your child's information — always. Here is exactly how we handle it across our maths tuition in gurgaon platform.
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

      {/* SECTION 2 — TRUST ANCHOR STRIP */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TrustCard 
              icon={Shield}
              title="Data Protected"
              desc="Your personal information and your child's data is never sold, shared, or misused — ever."
              pillText="Zero Data Selling ✓"
              pillBg="#EDFBF3"
              pillColor="#22A05A"
              delay={0.1}
            />
            <TrustCard 
              icon={Lock}
              title="Fully Transparent"
              desc="We explain exactly what data we collect, why we collect it, and how long we keep it — in plain language."
              pillText="Plain Language ✓"
              pillBg="#FFF8EC"
              pillColor="#F5A623"
              delay={0.2}
            />
            <TrustCard 
              icon={Eye}
              title="Your Control"
              desc="You can request to view, update, or delete your data at any time — no questions asked."
              pillText="Full Access Rights ✓"
              pillBg="#EAF1FF"
              pillColor="#1251AA"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 — QUICK SUMMARY CARD */}
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
              🔒
            </div>

            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider mb-6">
                📋 TL;DR — The Short Version
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-10">
                What This Policy Means in Plain English
              </h2>

              <div className="space-y-6 mb-10">
                {[
                  "We collect only what is needed to run the platform and teach your child effectively.",
                  "We never sell your data to advertisers, third parties, or anyone else.",
                  "Your child's information is treated with the highest level of care and protection.",
                  "We use secure payment processing — we never store card details ourselves.",
                  "You can request deletion of your data at any time by contacting us.",
                  "This policy applies to our website, student app, and parent dashboard app."
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
                  The full detailed policy is below. We recommend reading it — but the summary above covers the essentials.
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
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Full Policy</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">Our Complete Privacy Policy</h2>
            <p className="text-slate-gray font-sans text-lg">Click any section to expand the full details.</p>
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

      {/* SECTION 5 — CONTACT FOR PRIVACY QUESTIONS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-wider mb-4 block">Questions about your privacy?</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">We Are Always Here to Help</h2>
            <p className="text-slate-gray font-sans text-lg max-w-2xl mx-auto">
              If you have any questions about this policy or your data — reach out directly. We respond personally.
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
    href="https://wa.me/+919899389313"
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

      {/* SECTION 6 — BOTTOM CTA BANNER */}
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
            <Lock className="w-8 h-8 text-gold" />
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Your Trust is Everything to Us.
          </h2>
          
          <p className="text-white/75 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-12">
            Questions about your privacy? We answer personally — always.
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
