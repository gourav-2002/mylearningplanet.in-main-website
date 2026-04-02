'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Globe, 
  Server, 
  HardDrive, 
  ShieldCheck, 
  BarChart2, 
  Settings, 
  Info, 
  ToggleRight, 
  Clock, 
  RefreshCw, 
  ChevronDown, 
  AlertTriangle, 
  MessageCircle, 
  Mail, 
  ArrowRight, 
  FileText, 
  Cookie as CookieIcon 
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

const CookieTypeCard = ({ icon: Icon, title, subtitle, desc, badge, accentColor, examples, bottomNote, step }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: step * 0.12 }}
      className="bg-white rounded-[24px] border border-ice-blue p-10 shadow-[0_8px_40px_rgba(18,81,170,0.10)] hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_16px_56px_rgba(18,81,170,0.15)] transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }}></div>
      
      <div className="flex justify-between items-start mb-8">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} style={{ background: `linear-gradient(135deg, ${accentColor}15, #FFFFFF)` }}>
          <Icon className="w-8 h-8" style={{ color: accentColor }} />
        </div>
        <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
          {badge}
        </div>
      </div>

      <h3 className="font-display text-2xl font-bold text-navy mb-2">{title}</h3>
      <p className="font-sans text-sm font-bold mb-4" style={{ color: accentColor }}>{subtitle}</p>
      <p className="text-slate-gray font-sans text-sm leading-relaxed mb-8">{desc}</p>
      
      <div className="bg-[#F8FAFF] rounded-xl p-5 mb-6">
        <h4 className="font-sans font-bold text-navy text-[10px] uppercase tracking-widest mb-4">Examples</h4>
        <div className="space-y-3">
          {examples.map((ex: any, i: number) => (
            <div key={i} className="flex justify-between items-center text-[10px] font-sans">
              <span className="text-slate-gray">{ex.name}</span>
              <span className="text-primary font-medium">{ex.purpose}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 rounded-full text-[10px] font-bold text-center" style={{ backgroundColor: `${accentColor}10`, color: accentColor }}>
        {bottomNote}
      </div>
    </motion.div>
  );
};

const parseAnswer = (answer: string): { intro: string; points: string[] } => {
  const pointRegex = /\(\d+\)\s/g;
  const firstMatch = answer.search(pointRegex);
  if (firstMatch === -1) return { intro: answer, points: [] };

  const intro = answer.slice(0, firstMatch).trim();
  const rest = answer.slice(firstMatch);
  const parts = rest.split(/(?=\(\d+\)\s)/).map(p => p.replace(/^\(\d+\)\s*/, '').trim()).filter(Boolean);
  return { intro, points: parts };
};

const AccordionItem = ({ item, isOpen, onClick, index }: any) => {
  const Icon = item.icon;
  const { intro, points } = parseAnswer(item.answer);

  return (
    <div className={`border-b border-ice-blue last:border-0 transition-colors duration-300 ${isOpen ? 'bg-gradient-to-r from-ice-blue to-[#F8FAFF]' : ''}`}>
      <div
        onClick={() => onClick(index)}
        className="px-8 py-7 flex items-center gap-6 cursor-pointer hover:bg-[#F8FAFF] transition-colors group"
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
            transition={{ duration: 0.4, ease: "easeInOut" }}
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

const FactCard = ({ icon: Icon, value, label, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/7 border border-white/14 backdrop-blur-md rounded-[20px] p-8 text-center hover:bg-white/12 hover:border-white/25 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute bottom-[-20px] right-[-10px] text-white/5 font-display text-8xl font-bold pointer-events-none select-none">
        {index + 1}
      </div>
      <Icon className="w-7 h-7 text-white mx-auto mb-5" />
      <div className="text-white font-display text-4xl font-bold mb-1">{value}</div>
      <div className="text-white/55 font-sans text-sm mb-4">{label}</div>
      <div className="w-8 h-0.5 bg-gold mx-auto rounded-full"></div>
    </motion.div>
  );
};

// --- Main Page ---

export default function CookiePolicyPage() {
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
      icon: Info,
      title: "What Are Cookies and How Do We Use Them",
      answer: "Cookies are small text files that are placed on your device — smartphone, tablet, or computer — when you visit our website or use our student and parent apps. They are universally used across the internet to make websites and apps function correctly and improve user experience. At My Learning Planet, a structured math tuition platform, we use cookies for three specific purposes: (1) To keep you logged in to the student app and parent dashboard without requiring you to sign in on every visit. (2) To understand how parents and students use our website — which pages are most visited, where people spend time, and where we can improve the experience. This data is aggregated and anonymised — we cannot identify individual users from it. (3) To remember your preferences — such as notification settings, display preferences, and your last viewed class or report. We do not use cookies for advertising, profiling, or tracking your activity on other websites. Our cookie use is minimal, purposeful, and clearly explained in this policy."
    },
    {
      icon: ShieldCheck,
      title: "Essential Cookies — Required for Platform Function",
      answer: "Essential cookies are strictly necessary for My Learning Planet to function. These cannot be disabled because without them, core features of our platform simply do not work. Essential cookies we use include: (1) Authentication cookies: When you log in to the student app or parent dashboard, an authentication cookie is set to keep you logged in during your session and across visits. Without this cookie, you would need to enter your password every time you open the app. (2) Security cookies: We use CSRF (Cross-Site Request Forgery) protection cookies to secure your account from unauthorized actions. These run invisibly in the background and protect every form submission on our platform. (3) Session management: Session cookies track your activity within a single visit to ensure features like test submissions and progress tracking work correctly without losing data. (4) Language preference: A cookie stores your language or regional settings so the platform displays correctly for your location. All essential cookies are first-party cookies — set directly by My Learning Planet — and do not involve any third party. These cookies support the seamless functioning of our online maths classes in gurgaon platform and are automatically deleted when you close your browser or within 30 days, whichever comes first."
    },
    {
      icon: BarChart2,
      title: "Analytics Cookies — Understanding Platform Usage",
      answer: "Analytics cookies help us understand how our website and apps are being used — so we can make them better for students and parents. The analytics cookies we use: (1) Google Analytics: We use Google Analytics to collect anonymised data about website visits — including which pages are viewed most, how long visitors spend on each page, and the general geographic region of visitors (city level only, never specific address). Google Analytics data is aggregated — we cannot identify you as an individual from this data. (2) Session analytics: Internal session tracking helps us understand how students navigate the student app — including engagement with different topics such as maths classes in gurgaon content — which features are used most and where improvements are needed. (3) Performance monitoring: Basic performance cookies help us detect if pages are loading slowly or if any features are malfunctioning — allowing us to fix issues quickly. You can opt out of analytics cookies at any time by adjusting your browser settings or using the Google Analytics opt-out browser add-on available at tools.google.com/dlpage/gaoptout. Opting out of analytics cookies will not affect your access to any feature of our platform."
    },
    {
      icon: Settings,
      title: "Preference Cookies — Remembering Your Settings",
      answer: "Preference cookies allow our platform to remember choices you have made on previous visits — creating a more personalised and convenient experience without requiring you to reconfigure settings every time. Preference cookies we use include: (1) Login persistence: A cookie remembers your login status so enrolled students and parents do not need to sign in every time they open the app on their own device. This cookie is set only when you choose 'Remember Me' during login. (2) Dashboard preferences: If you customise how your parent dashboard displays — such as sorting by date or viewing specific report sections — a cookie remembers this preference for your next visit. (3) Notification settings: Your notification preferences — such as whether you want WhatsApp or email notifications — are stored in a preference cookie so you do not have to reconfigure them. (4) Last viewed content: The student app uses a preference cookie to remember the last class or note you viewed, so you can continue from where you left off. These features help provide a smoother experience across our math tuition platform. All preference cookies can be disabled through your browser settings. Disabling them means you may need to reconfigure your preferences on each visit."
    },
    {
      icon: Globe,
      title: "Third-Party Cookies",
      answer: "My Learning Planet uses a small number of carefully selected third-party services that may set their own cookies on your device. We only work with third parties whose cookie practices meet our standards of transparency and privacy. As a platform offering maths tuition in Gurgaon, we ensure that these services align with our commitment to data protection. Third parties that may set cookies include: (1) Google Analytics (analytics.google.com): Sets cookies to provide anonymised website usage analytics. Google's cookie policy is available at policies.google.com/technologies/cookies. (2) Razorpay (razorpay.com): Our payment processor may set session cookies during the payment process to ensure secure and uninterrupted transaction processing. These cookies are deleted immediately after your payment is complete. Razorpay's privacy policy is available at razorpay.com/privacy. (3) YouTube (for future video content): If we embed video testimonials or tutorial content from YouTube, YouTube may set cookies on your device when you interact with the video player. We do not currently embed YouTube videos but may do so in future. We do not work with any advertising networks, retargeting platforms, or data brokers. No third-party cookie on our platform is used to serve you advertisements on other websites."
    },
    {
      icon: ToggleRight,
      title: "How to Control and Manage Cookies",
      answer: "You have full control over cookies through your browser settings. Here is how to manage cookies on the most common browsers: (1) Google Chrome: Settings → Privacy and Security → Cookies and Other Site Data. You can block all cookies, allow only first-party cookies, or manage cookies site by site. (2) Mozilla Firefox: Settings → Privacy and Security → Cookies and Site Data. Firefox also offers Enhanced Tracking Protection which blocks many third-party cookies automatically. (3) Safari (iPhone/iPad/Mac): Settings → Safari → Privacy and Security. Enable 'Block All Cookies' or 'Prevent Cross-Site Tracking'. (4) Microsoft Edge: Settings → Cookies and Site Permissions → Cookies and Site Data. You can choose to block third-party cookies while allowing essential cookies. Important: Blocking essential cookies will prevent you from logging in to the student app or parent dashboard. Blocking analytics and preference cookies will not affect your access to classes, notes, tests, or any core features of our platform, including our structured math tuition programs. You can also use browser extensions such as uBlock Origin or Privacy Badger to control which cookies are set across all websites you visit."
    },
    {
      icon: Clock,
      title: "Cookie Duration — How Long They Last",
      answer: "Different cookies last for different periods of time. Here is a breakdown of cookie duration on our platform: (1) Session cookies: These last only for the duration of your browser session and are automatically deleted when you close your browser. They are used for security functions and active session management. (2) Authentication cookies (Remember Me): If you choose to stay logged in, this cookie lasts for 30 days before requiring you to log in again. It is automatically renewed each time you actively use the platform. (3) Analytics cookies: Google Analytics cookies typically last between 24 hours and 2 years depending on the specific cookie. Aggregate analytics data is retained by us for 26 months before being deleted. (4) Preference cookies: These last for 90 days and are renewed automatically when you actively use the platform. (5) Third-party payment cookies (Razorpay): Session-only — deleted immediately after your payment transaction is complete. You can delete all cookies at any time through your browser settings regardless of their set duration. Clearing cookies will log you out of the student and parent apps and reset your preferences."
    },
    {
      icon: RefreshCw,
      title: "Updates to This Cookie Policy",
      answer: "We may update this Cookie Policy from time to time as our platform evolves and as cookie regulations in India and internationally are updated. When we make changes: (1) We update the Effective Date shown at the top of this page so you always know when it was last revised. (2) For significant changes to how we use cookies — particularly if we add new cookie categories — we will notify enrolled families via WhatsApp and email at least 14 days before the change takes effect. (3) Minor updates — such as correcting descriptions, adding clarity, or updating third-party links — will be made without individual notification but will always be reflected in the updated Effective Date. (4) Continued use of our platform after any update to this policy constitutes your acceptance of the revised cookie terms. (5) All previous versions of this Cookie Policy are available on request by emailing connect@mylearningplanet.in. These updates help us continuously improve our online maths classes in gurgaon learning experience. We encourage you to review this policy periodically. If you ever have questions about any changes, please reach out to us directly — we are always happy to explain."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="overflow-x-hidden font-sans bg-white">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-[#0A1F5E] to-[#1251AA] flex items-center justify-center overflow-hidden py-24 px-4">
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
          <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] border border-white/5 rounded-full pointer-events-none"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <nav className="flex justify-center items-center gap-2 text-white/45 text-sm mb-8 font-sans">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>→</span>
            <span className="text-white">Cookie Policy</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8">
            <span className="text-gold">🍪</span> Simple. Honest. In Plain English.
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 relative inline-block">
            <span className="relative">
              Cookie
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  d="M2 10C40 2 160 2 198 10" 
                  stroke="#F5A623" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
              </svg>
            </span> Policy
          </h1>

          <p className="text-white/75 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-12 leading-relaxed">
            Cookies help us make My Learning Planet work better for you and your child, especially while using our online maths classes in gurgaon learning platform. Here is exactly what we use, why we use it, and how you stay in control.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {["No Ad Tracking", "Your Control", "Plain Language"].map((chip, i) => (
              <div key={i} className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-sans font-bold animate-pulse-glow">
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHAT IS A COOKIE — VISUAL EXPLAINER */}
      {/* <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Cookies Explained</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">What Exactly Is a Cookie?</h2>
          </div>

          <div className="max-w-5xl mx-auto bg-gradient-to-br from-ice-blue to-[#F0F5FF] rounded-[28px] border-2 border-primary shadow-[0_16px_64px_rgba(18,81,170,0.14)] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-1/2 right-[-20px] -translate-y-1/2 text-navy/5 text-[140px] pointer-events-none select-none">🍪</div>
            
            <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
         
              <div className="w-full lg:w-1/2">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
               
                  <div className="bg-white rounded-2xl border border-ice-blue shadow-sm p-5 text-center w-full md:w-36">
                    <Globe className="w-6 h-6 text-primary mx-auto mb-3" />
                    <div className="font-sans font-bold text-navy text-xs mb-1">Your Browser</div>
                    <div className="text-slate-gray text-[10px]">Visits our website</div>
                  </div>

                
                  <div className="hidden md:block flex-1 h-[2px] bg-primary/20 relative">
                    <div className="absolute top-1/2 left-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2 animate-flow-dot"></div>
                  </div>
                  <div className="md:hidden text-primary/30">↓</div>

                
                  <div className="bg-primary rounded-2xl p-5 text-center w-full md:w-36">
                    <Server className="w-6 h-6 text-white mx-auto mb-3" />
                    <div className="font-sans font-bold text-white text-xs mb-1">Our Server</div>
                    <div className="text-white/70 text-[10px]">Sends a small file</div>
                  </div>

                 
                  <div className="hidden md:block flex-1 h-[2px] bg-primary/20 relative">
                    <div className="absolute top-1/2 left-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2 animate-flow-dot"></div>
                  </div>
                  <div className="md:hidden text-primary/30">↓</div>

              
                  <div className="bg-white rounded-2xl border border-ice-blue shadow-sm p-5 text-center w-full md:w-36">
                    <HardDrive className="w-6 h-6 text-green mx-auto mb-3" />
                    <div className="font-sans font-bold text-navy text-xs mb-1">Your Device</div>
                    <div className="text-green text-[10px]">Stores the cookie</div>
                  </div>
                </div>
                <p className="text-center text-slate-gray font-sans text-[10px] italic mt-10">
                  This whole process takes milliseconds and makes your experience smoother.
                </p>
              </div>

           
              <div className="w-full lg:w-1/2">
                <h3 className="font-display text-3xl font-bold text-navy mb-6">A Cookie is Just a Tiny Text File</h3>
                <div className="space-y-4 text-slate-gray font-sans text-base leading-relaxed mb-8">
                  <p>When you visit our website, your browser saves a small text file on your device. This file — called a cookie — helps the website remember things about your visit.</p>
                  <p>For example, cookies help you stay logged in to the student or parent app without typing your password every time.</p>
                  <p>Cookies cannot run programs, carry viruses, or access other files on your device. They are simply small pieces of data — nothing more.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["📁 Text file only", "🔒 Cannot access your device", "⚡ Makes experience faster"].map((chip, i) => (
                    <div key={i} className="px-4 py-1.5 rounded-full bg-ice-blue text-primary font-sans text-xs font-bold">
                      {chip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* SECTION 3 — COOKIE TYPES VISUAL GRID */}
      {/* <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-widest mb-4 block">Types We Use</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">The Cookies We Use — and Why</h2>
            <p className="text-slate-gray font-sans text-lg">We use only three types of cookies — each with a clear and honest purpose.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
            <CookieTypeCard 
              icon={ShieldCheck}
              title="Essential Cookies"
              subtitle="Required for the platform to work"
              desc="These cookies are absolutely necessary for our website and apps to function. Without them, you cannot log in, access classes, or use the student and parent apps."
              badge="Always On"
              accentColor="#22A05A"
              step={1}
              examples={[
                { name: "session_token", purpose: "Keeps you logged in" },
                { name: "app_language", purpose: "Remembers your language" },
                { name: "csrf_token", purpose: "Protects your account security" }
              ]}
              bottomNote="🔒 Cannot be disabled — required for login"
            />
            <CookieTypeCard 
              icon={BarChart2}
              title="Analytics Cookies"
              subtitle="Help us understand usage patterns"
              desc="These cookies tell us which pages are visited most, how long people spend on each section, and where we can improve the experience. All data is anonymised."
              badge="Optional"
              accentColor="#1251AA"
              step={2}
              examples={[
                { name: "_ga", purpose: "Google Analytics page views" },
                { name: "_session_id", purpose: "Session duration tracking" },
                { name: "page_views", purpose: "Popular content tracking" }
              ]}
              bottomNote="✓ Anonymised data only — no personal identification"
            />
            <CookieTypeCard 
              icon={Settings}
              title="Preference Cookies"
              subtitle="Remember your settings"
              desc="These cookies remember your preferences so you do not have to set them every visit — like staying logged in, your preferred class view, or notification settings."
              badge="Optional"
              accentColor="#F5A623"
              step={3}
              examples={[
                { name: "user_prefs", purpose: "Saves display preferences" },
                { name: "notif_setting", purpose: "Notification preferences" },
                { name: "last_class", purpose: "Remembers last viewed class" }
              ]}
              bottomNote="⚙️ Can be disabled in browser settings"
            />
          </div>

          <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#FFF8EC] to-[#FFF3DC] border-2 border-gold rounded-[20px] p-8 flex items-center gap-6 shadow-[0_4px_20px_rgba(245,166,35,0.12)]">
            <AlertTriangle className="w-10 h-10 text-gold flex-shrink-0" />
            <p className="text-navy font-sans font-bold leading-relaxed">
              We do NOT use advertising cookies, retargeting pixels, or any tracking technology that follows you across other websites to serve you ads. Zero. None.
            </p>
          </div>
        </div>
      </section> */}

      {/* SECTION 4 — MAIN COOKIE ACCORDION */}
      <section className="py-24 bg-gradient-to-b from-[#F0F5FF] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Full Policy</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">Complete Cookie Policy Details</h2>
            <p className="text-slate-gray font-sans text-lg">Click any section to expand full details.</p>
          </div>

          <div className="max-w-[850px] mx-auto bg-white rounded-[28px] shadow-[0_16px_64px_rgba(18,81,170,0.12)] border border-ice-blue overflow-hidden">
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

      {/* SECTION 5 — COOKIE CONTROL PANEL */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-widest mb-4 block">Your Controls</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">Manage Your Cookie Preferences</h2>
            <p className="text-slate-gray font-sans text-lg">Here is a simple overview of what you can and cannot turn off — and what happens when you do.</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-[24px] border border-ice-blue shadow-[0_8px_40px_rgba(18,81,170,0.10)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#0A1F5E] to-[#1251AA]">
                    <th className="p-5 text-white font-sans font-bold text-sm">Cookie Type</th>
                    <th className="p-5 text-white font-sans font-bold text-sm">Purpose</th>
                    <th className="p-5 text-white font-sans font-bold text-sm">Can Disable?</th>
                    <th className="p-5 text-white font-sans font-bold text-sm">Impact if Disabled</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  <tr className="border-b border-ice-blue bg-white">
                    <td className="p-5">
                      <div className="flex items-center gap-2 font-bold text-navy">
                        <ShieldCheck className="w-4 h-4 text-green" /> Essential
                      </div>
                    </td>
                    <td className="p-5 text-slate-gray">Login, security, session</td>
                    <td className="p-5">
                      <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">❌ No — Required</span>
                    </td>
                    <td className="p-5 text-red-600 font-medium">Cannot log in or use apps</td>
                  </tr>
                  <tr className="border-b border-ice-blue bg-[#F8FAFF]">
                    <td className="p-5">
                      <div className="flex items-center gap-2 font-bold text-navy">
                        <BarChart2 className="w-4 h-4 text-primary" /> Analytics
                      </div>
                    </td>
                    <td className="p-5 text-slate-gray">Usage improvement</td>
                    <td className="p-5">
                      <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">✅ Yes — Optional</span>
                    </td>
                    <td className="p-5 text-green-600 font-medium">No impact on features</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-5">
                      <div className="flex items-center gap-2 font-bold text-navy">
                        <Settings className="w-4 h-4 text-gold" /> Preference
                      </div>
                    </td>
                    <td className="p-5 text-slate-gray">Remember settings</td>
                    <td className="p-5">
                      <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">✅ Yes — Optional</span>
                    </td>
                    <td className="p-5 text-gold font-medium">Reset preferences each visit</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-[#F8FAFF] p-5 text-center text-slate-gray font-sans text-base italic">
              To disable optional cookies — open your browser settings → Privacy → Cookies. See Section 6 above for step-by-step browser instructions.
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-[#FFF8EC] border-2 border-gold rounded-2xl px-8 py-4 shadow-sm">
              <p className="text-navy font-sans font-bold">
                🚫 We never use advertising cookies — no ad tracking. Ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — QUICK FACTS STRIP */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 40px)' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-white/45 font-bold text-xs tracking-[0.2em] mb-4 uppercase">Quick Facts</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Our Cookie Promise at a Glance</h2>
          </div>

          <div className="grid grid-cols-2 text-lg md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <FactCard icon={CookieIcon} value="3" label="Types of Cookies Used" index={0} />
            <FactCard icon={ShieldCheck} value="0" label="Advertising Cookies" index={1} />
            <FactCard icon={Globe} value="2" label="Third Party Services" index={2} />
            <FactCard icon={ToggleRight} value="100%" label="Your Control" index={3} />
          </div>

          <div className="h-[1px] bg-white/10 w-full mb-8"></div>
          <p className="text-center text-white/45 font-sans text-base">
            Our cookie use is minimal and purposeful — only what is needed to make your experience great.
          </p>
        </div>
      </section>

      {/* SECTION 7 — CONTACT FOR COOKIE QUESTIONS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-wider mb-4 block">Questions?</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">Ask Us Anything About Cookies</h2>
            <p className="text-slate-gray font-sans text-lg max-w-2xl mx-auto">
              Privacy and data questions deserve real answers. Contact us and we respond personally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[640px] mx-auto">
            {/* WhatsApp Card */}
            <div className="bg-white rounded-[24px] border-2 border-green/25 p-8 text-center shadow-[0_4px_24px_rgba(34,160,90,0.08)] hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green/10 to-green/5 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-7 h-7 text-green" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-2">WhatsApp Us</h3>
              <p className="text-green font-sans font-bold text-base mb-1"> +91 9899389313</p>
              <p className="text-slate-gray font-sans text-xs mb-6">Response within minutes</p>
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
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-[24px] border border-ice-blue p-8 text-center shadow-sm hover:-translate-y-1.5 hover:border-primary transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-2">Email Us</h3>
              <p className="text-primary font-sans font-bold text-base mb-1">connect@mylearningplanet.in</p>
              <p className="text-slate-gray font-sans text-xs mb-6">Response within 24 hours</p>
              <a 
                href="mailto:connect@mylearningplanet.in"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-primary text-primary font-sans font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300"
              >
                Send Email →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — RELATED LEGAL PAGES */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-sans font-bold text-xs uppercase tracking-widest mb-4 block">Related Policies</span>
          <h2 className="font-display text-4xl font-bold text-navy mb-16">Other Legal Documents</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link href="/privacy-policy" className="bg-white rounded-[20px] border border-ice-blue p-8 text-center shadow-sm hover:-translate-y-1 hover:border-primary transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-sans text-lg font-bold text-navy mb-2">Privacy Policy</h4>
              <p className="text-slate-gray text-base mb-6">How we protect your data</p>
              <span className="text-primary text-base font-bold flex items-center justify-center gap-1">Read Policy <ArrowRight className="w-3 h-3" /></span>
            </Link>

            <Link href="/terms-of-service" className="bg-white rounded-[20px] border border-ice-blue p-8 text-center shadow-sm hover:-translate-y-1 hover:border-primary transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-gold" />
              </div>
              <h4 className="font-sans text-lg font-bold text-navy mb-2">Terms of Service</h4>
              <p className="text-slate-gray text-base mb-6">Rules and conditions</p>
              <span className="text-primary text-base font-bold flex items-center justify-center gap-1">Read Policy <ArrowRight className="w-3 h-3" /></span>
            </Link>

            <Link href="/refund-policy" className="bg-white rounded-[20px] border border-ice-blue p-8 text-center shadow-sm hover:-translate-y-1 hover:border-primary transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-6 h-6 text-green" />
              </div>
              <h4 className="font-sans text-lg font-bold text-navy mb-2">Refund Policy</h4>
              <p className="text-slate-gray text-base mb-6">Refund and cancellation terms</p>
              <span className="text-primary text-base font-bold flex items-center justify-center gap-1">Read Policy <ArrowRight className="w-3 h-3" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9 — BOTTOM CTA BANNER */}
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
            <ShieldCheck className="w-8 h-8 text-gold" />
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8">
            Questions About Privacy or Cookies?
          </h2>
          
          <p className="text-white/75 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-12">
            We believe transparency builds trust. Reach out anytime — our team responds personally.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link href="/contact"
              className="px-10 py-4 rounded-full bg-gold text-navy font-sans font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(245,166,35,0.4)] animate-pulse-glow"
            >
              ✦ Contact Us
            </Link>
            <Link href="/"
              className="px-10 py-4 rounded-full border-2 border-white text-white font-sans font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300"
            >
              Back to Home →
            </Link>
          </div>
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
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 rgba(255,255,255,0); }
          50% { opacity: 0.8; box-shadow: 0 0 20px rgba(255,255,255,0.2); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        @keyframes flow-dot {
          0% { left: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-flow-dot {
          animation: flow-dot 2s linear infinite;
        }
      `}} />
    </div>
  );
}
