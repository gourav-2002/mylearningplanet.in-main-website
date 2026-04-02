'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Calendar, 
  ClipboardCheck, 
  Smartphone, 
  CreditCard, 
  Shield, 
  Info, 
  RefreshCw, 
  ChevronDown, 
  Sparkles, 
  Star,
  ChevronRight
} from 'lucide-react';

// --- Components ---

const FloatingSymbol = ({ symbol, size, top, left, delay, duration, rotation }: any) => (
  <div 
    className="absolute text-white pointer-events-none select-none opacity-10 animate-float-slow"
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

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
  <div className="border-b border-ice-blue last:border-0">
    <button 
      onClick={onClick}
      className="w-full py-6 px-8 flex items-center justify-between text-left group transition-colors hover:bg-ice-blue/10"
    >
      <span className="font-sans font-bold text-navy text-lg">{question}</span>
      <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
        <ChevronDown className="w-6 h-6 text-primary" />
      </div>
    </button>
    <div 
      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div className="px-8 pb-8 text-slate-gray leading-relaxed">
        {answer}
      </div>
    </div>
  </div>
);

const SectionHeader = ({ label, heading, subtext, light = false }: any) => (
  <div className="text-center mb-16">
    <span className={`${light ? 'text-gold' : 'text-primary'} font-bold text-sm tracking-[0.15em] uppercase mb-4 block`}>
      {label}
    </span>
    <h2 className={`font-display text-4xl md:text-5xl ${light ? 'text-white' : 'text-navy'} font-bold mb-4`}>
      {heading}
    </h2>
    {subtext && <p className={`${light ? 'text-white/70' : 'text-slate-gray'} max-w-2xl mx-auto`}>{subtext}</p>}
  </div>
);

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pricingCardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (pricingCardRef.current) {
      observer.observe(pricingCardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const heroSymbols = [
    { s: '＋', sz: '2rem', t: '10%', l: '5%', d: '0s', dur: '6s', r: '10deg' },
    { s: '－', sz: '1.5rem', t: '20%', l: '80%', d: '1s', dur: '7s', r: '-15deg' },
    { s: '×', sz: '3rem', t: '70%', l: '10%', d: '2s', dur: '8s', r: '20deg' },
    { s: '÷', sz: '2.5rem', t: '80%', l: '85%', d: '0.5s', dur: '5s', r: '-10deg' },
    { s: '√', sz: '4rem', t: '15%', l: '45%', d: '1.5s', dur: '9s', r: '5deg' },
    { s: 'π', sz: '2rem', t: '60%', l: '40%', d: '2.5s', dur: '6s', r: '12deg' },
    { s: '∑', sz: '3.5rem', t: '40%', l: '90%', d: '3s', dur: '10s', r: '-5deg' },
    { s: '²', sz: '2rem', t: '5%', l: '70%', d: '1.2s', dur: '7s', r: '0deg' },
    { s: '∞', sz: '3rem', t: '50%', l: '5%', d: '2.2s', dur: '9s', r: '-20deg' },
    { s: 'θ', sz: '2.2rem', t: '10%', l: '30%', d: '2.8s', dur: '8s', r: '5deg' },
    { s: '≈', sz: '2.5rem', t: '85%', l: '20%', d: '1.5s', dur: '7s', r: '15deg' },
    { s: '∫', sz: '3rem', t: '30%', l: '15%', d: '0.8s', dur: '11s', r: '-10deg' },
  ];

  const features = [
    "Live online classes (5 days/week)",
    "All recorded lecture backups",
    "Structured weekly curriculum",
    "Weekly unit tests + evaluation",
    "Monthly milestone assessment",
    "Concept-level diagnostic reports",
    "Student app access (notes + tests)",
    "Parent dashboard app access",
    "Weekly progress reports",
    "Doubt solving sessions (2x/week)",
    "Notes, cheat sheets + worksheets",
    "Revision modules (pre-exam)",
    "Teacher feedback summaries",
    "Olympiad and NTSE prep foundation"
  ];

  const valueRows = [
    { item: "Live Online Classes (20/month)", market: "₹3,000–5,000" },
    { item: "Weekly Tests + Assessments", market: "₹500–1,000" },
    { item: "Student App Access", market: "₹300–800" },
    { item: "Parent Dashboard App", market: "₹200–500" },
    { item: "Study Notes + Worksheets", market: "₹300–600" },
    { item: "Doubt Solving Sessions", market: "₹500–1,000" },
    { item: "Recorded Lecture Backups", market: "₹400–800" },
    { item: "Monthly Progress Reports", market: "₹200–400" },
  ];

  return (
    <div className="overflow-x-hidden font-sans bg-white">
      {/* SECTION 1 — HERO */}
      <section className="relative bg-gradient-to-br from-navy to-primary py-24 md:py-32 overflow-hidden">
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
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <nav className="flex justify-center items-center gap-2 text-white/50 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Pricing</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-medium mb-8">
            <span>✦</span> Simple. Transparent. No Hidden Fees.
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-8 max-w-4xl mx-auto">
            One Plan. <span className="relative inline-block">
              Everything
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span> Included.
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-12">
            No confusing tiers. No hidden charges. Just one powerful plan with transparent maths tuition fees in Gurgaon that gives your child everything they need to excel in mathematics with structured learning and expert guidance.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {["₹4,000 / month", "All Classes 6–10", "Cancel Anytime"].map((chip, i) => (
              <div key={i} className="bg-white/10 border border-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-bold">
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — UNIQUE PRICING HERO CARD */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            label="Our Plan"
            heading="Everything Your Child Needs — In One Plan"
          />

          <div 
            ref={pricingCardRef}
            className={`max-w-[780px] mx-auto bg-white rounded-[32px] border-2 border-primary shadow-[0_24px_80px_rgba(18,81,170,0.18)] overflow-hidden relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
          >
            {/* Top Accent Banner */}
            <div className="bg-gradient-to-r from-navy to-primary px-8 py-4 flex justify-between items-center">
              <span className="text-white font-bold text-lg">Most Popular Plan ✦</span>
              <span className="bg-gold text-navy font-bold text-[15px] px-3 py-1 rounded-full uppercase tracking-wider">
                🏆 Best Value
              </span>
            </div>

            {/* Card Body */}
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Side */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-2">
                    <span className="text-slate-gray text-xs uppercase tracking-widest font-bold">Monthly Subscription</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-3xl text-primary font-bold">₹</span>
                      <span className="font-display text-6xl md:text-7xl text-navy font-bold tracking-tighter">4,000</span>
                      <span className="text-slate-gray font-medium">/month</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-[#EDFBF3] text-success px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 bg-success rounded-full text-lg"></div>
                      All inclusive — no extras
                    </div>
                    <p className="text-slate-gray text-base italic mt-2">Pay annually and save ₹8,000 — ₹40,000/year</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-navy font-bold text-sm uppercase tracking-widest">Everything in this plan:</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-[#EDFBF3] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                          </div>
                          <span className="text-base text-slate-gray leading-tight">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Visual Panel */}
                <div className="lg:col-span-5">
                  <div className="bg-gradient-to-br from-ice-blue to-[#F0F5FF] rounded-[20px] p-6 h-full flex flex-col justify-between border border-ice-blue">
                    <div className="space-y-6">
                      <h4 className="text-navy font-bold text-sm uppercase tracking-widest">Your Child Gets</h4>
                      <div className="space-y-4">
                        {[
                          { icon: <Calendar className="w-5 h-5 text-primary" />, title: "5 Live Classes / Week", desc: "Monday to Friday structured sessions" },
                          { icon: <ClipboardCheck className="w-5 h-5 text-success" />, title: "Weekly Tests Included", desc: "No extra charges for assessments" },
                          { icon: <Smartphone className="w-5 h-5 text-gold" />, title: "2 Apps Included", desc: "Student app + Parent dashboard" }
                        ].map((item, i) => (
                          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm flex items-start gap-4 border border-ice-blue/50">
                            <div className="flex-shrink-0 mt-1">{item.icon}</div>
                            <div>
                              <p className="text-sm font-bold text-navy leading-none mb-1">{item.title}</p>
                              <p className="text-[10px] text-slate-gray leading-tight">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 bg-white border border-ice-blue rounded-xl p-3 shadow-sm flex items-center gap-2">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-[10px] font-bold text-navy uppercase tracking-tight">4.9 rated by 200+ parents</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Bottom */}
            <div className="bg-[#F8FAFF] border-t border-ice-blue p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <p className="text-lg font-bold text-navy mb-1">Ready to start?</p>
                <p className="text-base text-slate-gray">Book your free demo — no payment needed today.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link href="/contact"
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-300 animate-pulse-subtle text-center"
                >
                  ✦ Book a Free Demo
                </Link>
                <Link href="/contact"
                  className="bg-gold text-navy px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-gold/20 hover:scale-105 transition-all duration-300 text-center"
                >
                  Enrol Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — VALUE BREAKDOWN */}
      <section className="py-24 bg-gradient-to-b from-ice-blue/30 to-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            label="Break It Down"
            heading="What ₹4,000 Actually Gets You"
            subtext="When you add it all up — this is what you would pay separately elsewhere."
          />

          <div className="max-w-[720px] mx-auto bg-white rounded-[24px] shadow-[0_8px_40px_rgba(18,81,170,0.10)] border border-ice-blue overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-ice-blue">
                    <th className="py-4 px-6 text-[13px] font-bold text-navy uppercase tracking-widest">What You Get</th>
                    <th className="py-4 px-6 text-[13px] font-bold text-navy uppercase tracking-widest">Market Price</th>
                    <th className="py-4 px-6 text-[13px] font-bold text-navy uppercase tracking-widest">With Us</th>
                  </tr>
                </thead>
                <tbody>
                  {valueRows.map((row, i) => (
                    <tr key={i} className={`border-b border-ice-blue/50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFF]'}`}>
                      <td className="py-4 px-6 text-base font-medium text-navy">{row.item}</td>
                      <td className="py-4 px-6 text-base text-red-500 line-through opacity-60 font-mono">{row.market}</td>
                      <td className="py-4 px-6 text-base font-bold text-success flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Included
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gradient-to-r from-navy to-primary text-white">
                    <td className="py-6 px-6 font-bold">Total Market Value</td>
                    <td className="py-6 px-6 font-mono opacity-70 line-through">₹5,400–10,100/mo</td>
                    <td className="py-6 px-6">
                      <span className="font-display text-2xl font-bold text-gold">₹4,000/month</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="bg-gradient-to-r from-[#FFF8EC] to-[#FFFDF5] border-2 border-gold rounded-2xl px-8 py-4 shadow-[0_4px_20px_rgba(245,166,35,0.20)] text-center">
              <p className="text-navy font-bold">
                💰 You save up to <span className="text-primary">₹6,100</span> every month compared to buying separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW BILLING WORKS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            label="Billing and Payment"
            heading="Simple. Transparent. Flexible."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                icon: <CreditCard className="w-8 h-8 text-primary" />, 
                title: "Monthly Billing", 
                desc: "Pay month to month — no long lock-ins. Cancel anytime with 15 days notice. Full flexibility for your family.",
                badge: "No lock-in contract",
                badgeColor: "bg-success/10 text-success"
              },
              { 
                icon: <Calendar className="w-8 h-8 text-gold" />, 
                title: "Annual Option", 
                desc: "Pay annually and save 2 months — ₹40,000/year instead of ₹48,000. Best value for committed learners.",
                badge: "Save ₹8,000/year",
                badgeColor: "bg-gold/10 text-gold"
              },
              { 
                icon: <Shield className="w-8 h-8 text-success" />, 
                title: "Secure Payments", 
                desc: "All payments processed securely via Razorpay — UPI, net banking, debit and credit cards all accepted.",
                badge: "Razorpay secured 🔒",
                badgeColor: "bg-primary/10 text-primary"
              }
            ].map((card, i) => (
              <div key={i} className="bg-white border border-ice-blue rounded-[24px] p-8 shadow-sm hover:shadow-xl hover:border-primary hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-16 h-16 bg-ice-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h4 className="text-xl font-bold text-navy mb-4">{card.title}</h4>
                <p className="text-base text-slate-gray leading-relaxed mb-6">{card.desc}</p>
                <span className={`text-[13px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-ice-blue rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <Info className="w-6 h-6 text-primary flex-shrink-0" />
            <p className="text-lg text-slate-gray">
              📋 A formal fee receipt is provided for every payment. GST invoice available on request.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — REFUND POLICY */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="container mx-auto px-4">
          <SectionHeader 
            label="Our Promise"
            heading="Honest Policy. No Fine Print."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <CheckCircle2 className="w-10 h-10 text-success" />, 
                title: "Free Demo First", 
                desc: "Always book a free 45-minute demo class before paying anything. No payment required to experience the system.",
                tag: "Zero Risk",
                borderColor: "border-success"
              },
              { 
                icon: <RefreshCw className="w-10 h-10 text-primary" />, 
                title: "7-Day Refund", 
                desc: "Not satisfied in the first 7 days? We refund your full first month fee — no questions asked.",
                tag: "Full Refund",
                borderColor: "border-primary"
              },
              { 
                icon: <Calendar className="w-10 h-10 text-gold" />, 
                title: "Easy Cancellation", 
                desc: "Cancel your subscription anytime with 15 days notice. No hidden charges, no penalties, no drama.",
                tag: "Anytime Cancel",
                borderColor: "border-gold"
              }
            ].map((card, i) => (
              <div key={i} className={`bg-white border-t-4 ${card.borderColor} rounded-[24px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}>
                <div className="mb-6">{card.icon}</div>
                <h4 className="text-xl font-bold text-navy mb-4">{card.title}</h4>
                <p className="text-base text-slate-gray leading-relaxed mb-6">{card.desc}</p>
                <span className={`text-[13px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-ice-blue text-primary`}>
                  {card.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-white/50 font-bold text-sm tracking-[0.15em] uppercase mb-4 block">Parents Love the Value</span>
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold">Worth Every Rupee.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-x-auto no-scrollbar snap-x">
            {[
              {
                quote: "For ₹4,000 we are getting live classes, recorded backups, weekly tests, parent reports and a dashboard. I was paying more for just tuition earlier with no tracking at all.",
                name: "Priya Kapoor",
                info: "Parent Class 7, Gurgaon",
                initials: "PK"
              },
              {
                quote: "The value is incredible. My son gets everything — notes, tests, doubt sessions, and I get a weekly report on my phone. All in one fee. No extras.",
                name: "Amit Sharma",
                info: "Parent Class 9, Gurgaon",
                initials: "AS"
              },
              {
                quote: "We tried three different coaching centers before this. None of them gave us parent visibility or structured testing. My Learning Planet gives us everything at a fair price.",
                name: "Sunita Mehta",
                info: "Parent Class 8, Gurgaon",
                initials: "SM"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[24px] p-8 border-l-4 border-l-gold snap-center min-w-[300px]">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}
                </div>
                <p className="text-white/80 italic leading-relaxed mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-lg">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-base text-white/50">{t.info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — FAQ ACCORDION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            label="Pricing Questions"
            heading="Frequently Asked Questions"
          />

          <div className="max-w-[800px] mx-auto bg-white rounded-[24px] shadow-[0_8px_40px_rgba(18,81,170,0.08)] border border-ice-blue overflow-hidden">
            <FAQItem 
              question="Is there any registration or admission fee?" 
              answer="No — there is absolutely no registration or admission fee. You only pay the ₹4,000 monthly subscription after your free demo class, with transparent maths tuition fees in Gurgaon."
              isOpen={openFaq === 0}
              onClick={() => setOpenFaq(openFaq === 0 ? -1 : 0)}
            />
            <FAQItem 
              question="What is included in the ₹4,000 plan?" 
              answer="Everything — live classes 5 days a week, all recorded backups, weekly tests, monthly assessments, student app, parent dashboard app, notes, worksheets, doubt sessions, and weekly progress reports. No hidden extras."
              isOpen={openFaq === 1}
              onClick={() => setOpenFaq(openFaq === 1 ? -1 : 1)}
            />
            <FAQItem 
              question="Can I try before paying?" 
              answer="Yes — always. Book a free 45-minute demo class for our maths tuition in Gurgaon program. Experience the system, meet the educator, and then decide — no payment required."
              isOpen={openFaq === 2}
              onClick={() => setOpenFaq(openFaq === 2 ? -1 : 2)}
            />
            <FAQItem 
              question="What payment methods are accepted?" 
              answer="We accept UPI, all major debit and credit cards, net banking, and EMI options — all securely processed through Razorpay for our maths tuition in Gurgaon programs.."
              isOpen={openFaq === 3}
              onClick={() => setOpenFaq(openFaq === 3 ? -1 : 3)}
            />
            <FAQItem 
              question="Is there a discount for paying annually?" 
              answer="Yes — choose our annual plan for online maths classes in Gurgaon at ₹40,000 and save ₹8,000 compared to monthly billing. That’s effectively 2 months free."
              isOpen={openFaq === 4}
              onClick={() => setOpenFaq(openFaq === 4 ? -1 : 4)}
            />
            <FAQItem 
              question="What if my child does not like it in the first week?" 
              answer="We offer a full 7-day refund on your first month — no questions asked. Experience our structured online maths classes in Gurgaon with confidence and see real results before you fully commit."
              isOpen={openFaq === 5}
              onClick={() => setOpenFaq(openFaq === 5 ? -1 : 5)}
            />
          </div>
        </div>
      </section>

      {/* SECTION 8 — BOTTOM CTA */}
      <section className="py-24 bg-gradient-to-br from-navy to-primary relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <FloatingSymbol symbol="π" size="5rem" top="20%" left="10%" delay="0s" duration="10s" rotation="10deg" />
          <FloatingSymbol symbol="√" size="8rem" top="60%" left="80%" delay="2s" duration="12s" rotation="-15deg" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center text-gold animate-pulse">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>
          <h2 className="font-display text-4xl md:text-6xl max-w-4xl mx-auto text-white font-bold mb-6">Start with a Free Demo — Pay Only When You Love It.</h2>
          <p className="text-white/75 text-lg md:text-xl mb-12 max-w-4xl mx-auto">
            Join 200+ students already learning with structure, clarity, and measurable results, supported by transparent maths tuition fees in Gurgaon and a program designed for Classes 6–10.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact"
              className="w-full sm:w-auto bg-gold text-navy px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-gold/20 hover:scale-105 transition-all duration-300 animate-pulse-subtle"
            >
              ✦ Book a Free Demo
            </Link>
            <Link href="/curriculum"
              className="w-full sm:w-auto border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300"
            >
              View Curriculum →
            </Link>
          </div>
          
          <p className="mt-8 text-white/50 text-sm">
            Free • No payment today • 45-minute live class
          </p>
        </div>
      </section>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(var(--tw-rotate)); }
          50% { transform: translateY(-20px) rotate(var(--tw-rotate)); }
        }
        .animate-float-slow {
          animation: float-slow infinite ease-in-out;
        }
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px 10px rgba(245, 166, 35, 0); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite ease-in-out;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
