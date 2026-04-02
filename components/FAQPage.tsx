'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  MessageCircle, 
  Lightbulb, 
  CheckCircle, 
  ChevronDown, 
  CalendarCheck, 
  Phone, 
  Sparkles,
  Star,
  ArrowRight
} from 'lucide-react';

// --- Types ---
interface FAQItemData {
  category: string;
  categoryColor: string;
  question: string;
  answer: string;
}

// --- Mock Data ---
const FAQ_ITEMS: FAQItemData[] = [
  {
    category: "💰 Fees and Billing",
    categoryColor: "text-gold",
    question: "What is the fee and what exactly does it include?",
    answer: "The fee is ₹4,000 per month — and it includes everything, including live maths coaching in gurgaon five days a week., all recorded lecture backups, weekly unit tests, monthly milestone assessments, concept-level diagnostic reports, the student app with notes and worksheets, the parent dashboard app, weekly progress reports, doubt solving sessions twice a week, revision modules before exams, and teacher feedback summaries. There are no hidden charges, no registration fees, and no extras to pay for."
  },
  {
    category: "🔄 Policies",
    categoryColor: "text-slate-gray",
    question: "Is there a free demo before I have to pay anything?",
    answer: "Yes — always. We strongly encourage every parent to book a free 45-minute demo class before making any payment for our maths tuition near me program. You will experience the structured system live, see how Mitali teaches, and get a feel for the weekly roadmap. Only after the demo — and only if you love it — do we ask you to enrol. No payment is required at any point before or during the demo."
  },
  {
    category: "📚 Curriculum",
    categoryColor: "text-primary",
    question: "Is the curriculum aligned with my child's school syllabus?",
    answer: "Yes — our curriculum follows NCERT guidelines exactly for Classes 6 through 10. Every chapter, every topic, every sequence matches what schools teach. We then add the structure, weekly planning, and consistent testing that schools and most coaching centers do not provide. Your child will always be in sync with school exams while also building a stronger, more systematic understanding of every concept."
  },
  {
    category: "🎓 Teaching",
    categoryColor: "text-green",
    question: "Who teaches the classes and what are their qualifications?",
    answer: "All classes are taught by Mitali — the founder of My Learning Planet. Mitali has over 8 years of experience teaching mathematics to middle and secondary school students through structured maths coaching in gurgaon. She personally designs every lesson plan, every test, and every set of notes. This is not a platform with random guest teachers — your child gets the same consistent educator every single class, which is a core part of what makes our system work."
  },
  {
    category: "📱 Technology",
    categoryColor: "text-navy",
    question: "What apps do I get and how do they work?",
    answer: "You get access to two apps — the Student App and the Parent App. The Student App gives your child access to live class links, all recorded lectures, chapter-wise notes and cheat sheets, practice worksheets, and their test results and progress. The Parent App gives you a real-time dashboard showing your child's attendance, test scores, improvement trends, and weekly progress reports. Both apps are mobile-friendly and easy to use — no technical knowledge required."
  },
  {
    category: "📚 Curriculum",
    categoryColor: "text-primary",
    question: "Can my child join mid-year or mid-term?",
    answer: "Absolutely. We accept students at any point in the year for our maths coaching in gurgaon. When your child joins, we conduct a short 15-minute diagnostic assessment to understand exactly where they stand — which concepts are strong and which have gaps. Based on this, we onboard them smoothly into the right module. They will receive all notes and materials for the current module immediately, and we ensure they are caught up without any disruption to their progress or the existing batch."
  },
  {
    category: "🔄 Policies",
    categoryColor: "text-slate-gray",
    question: "What is your refund and cancellation policy?",
    answer: "We offer a 7-day full refund on your first month — no questions asked. If your child attends classes for the first week and you feel the system is not right for them, we will refund your payment completely. After the first week, you can cancel your subscription anytime with 15 days notice. There are no cancellation fees, no penalties, and no drama. We believe in earning your trust every month — not locking you into a contract."
  },
  {
    category: "🎓 Teaching",
    categoryColor: "text-green",
    question: "What happens if my child misses a class?",
    answer: "Nothing is ever truly missed at My Learning Planet. Every single live class is recorded in full quality and made available in the Student App within a few hours of the class ending. Your child can watch the recorded lecture at any time, pause and rewind as needed, and still complete the same practice worksheet and weekly test. Additionally, if a concept needs extra attention, our twice-weekly doubt sessions are the perfect place to get it cleared directly with Mitali."
  },
  {
    category: "📱 Technology",
    categoryColor: "text-navy",
    question: "What devices and internet speed do we need for live classes?",
    answer: "Any smartphone, tablet, or laptop with a stable internet connection works perfectly for our maths tuition near me classes. We recommend a minimum internet speed of 5 Mbps for smooth video quality — which is standard with most home broadband and 4G connections in Gurgaon. The Student App works on both Android and iOS. For the best live class experience, a laptop or tablet with a slightly larger screen is ideal, but a smartphone works just as well."
  },
  {
    category: "💰 Fees and Billing",
    categoryColor: "text-gold",
    question: "Is there an annual payment option and is there any discount?",
    answer: "Yes — we offer an annual payment option at ₹40,000 per year, which saves you ₹8,000 compared to paying monthly. That is effectively 2 months completely free. Annual payment also gives you priority enrollment in our maths coaching in gurgaon. early access to new resources, and a dedicated parent orientation session with Mitali. Payment can be made via UPI, debit card, credit card, net banking, or EMI — all processed securely through Razorpay."
  }
];

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

const FAQAccordionItem = ({ item, index, isOpen, onToggle }: { item: FAQItemData, index: number, isOpen: boolean, onToggle: () => void, key?: React.Key }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current?.scrollHeight || 'auto');
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const numberStr = (index + 1).toString().padStart(2, '0');

  return (
    <div className="border-b border-ice-blue last:border-0">
      {/* Question Row */}
      <div 
        onClick={onToggle}
        className={`flex items-center gap-6 px-8 py-7 cursor-pointer transition-all duration-300 ${isOpen ? 'bg-gradient-to-r from-ice-blue to-[#F8FAFF]' : 'hover:bg-[#F8FAFF]'}`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-ice-blue text-primary'}`}>
          {numberStr}
        </div>
        <h3 className={`flex-1 font-sans font-bold text-lg transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-navy'}`}>
          {item.question}
        </h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-ice-blue text-primary rotate-0'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      {/* Answer Panel */}
      <div 
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div ref={contentRef} className="pl-[4.5rem] pr-8 pb-7">
          <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 bg-ice-blue ${item.categoryColor}`}>
            {item.category}
          </div>
          <p className="text-charcoal leading-relaxed mb-4">
            {item.answer}
          </p>
          <div className="h-0.5 w-full bg-ice-blue"></div>
        </div>
      </div>
    </div>
  );
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            <span className="opacity-50">→</span>
            <span className="text-white">FAQ</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-medium mb-8">
            <span>✦</span> Quick Answers to Your Questions
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-8 max-w-4xl mx-auto">
            Everything You Want to Know — <span className="relative inline-block">
              Answered.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            We know parents have questions before enrolling their child in maths coaching in gurgaon. We have answered every one of them here — honestly and clearly.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {["10 Questions Answered", "Honest Answers", "No Fine Print"].map((chip, i) => (
              <div key={i} className="bg-white/10 border border-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-bold">
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — UNIQUE VISUAL INTRO STRIP */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white rounded-[20px] border border-ice-blue shadow-[0_4px_24px_rgba(18,81,170,0.08)] p-8 text-center hover:-translate-y-2 hover:border-primary transition-all duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-ice-blue to-[#F0F5FF] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-9 h-9 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-navy font-bold mb-4">Honest Answers</h3>
              <p className="text-slate-gray text-base leading-relaxed">
                No marketing fluff. Every answer here is written by Mitali personally — clear, direct and complete.
              </p>
            </div>

            {/* Card 2 — Featured */}
            <div className="bg-white rounded-[20px] border-2 border-ice-blue shadow-[0_8px_32px_rgba(18,81,170,0.12)] p-8 text-center relative hover:-translate-y-2 hover:border-primary transition-all duration-300 group scale-105 z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FFF8EC] to-[#FFF3DC] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-9 h-9 text-gold" />
              </div>
              <h3 className="font-display text-2xl text-navy font-bold mb-4">No Hidden Surprises</h3>
              <p className="text-slate-gray text-base leading-relaxed mb-6">
                Fees, refunds, policies, curriculum — we lay everything out openly so you can make a fully informed decision.
              </p>
              <div className="inline-block bg-[#FFF8EC] border border-gold text-gold px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Transparency First ✦
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[20px] border border-ice-blue shadow-[0_4px_24px_rgba(18,81,170,0.08)] p-8 text-center hover:-translate-y-2 hover:border-primary transition-all duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#EDFBF3] to-[#F0FFF4] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-9 h-9 text-green" />
              </div>
              <h3 className="font-display text-2xl text-navy font-bold mb-4">Still Have Questions?</h3>
              <p className="text-slate-gray text-base leading-relaxed mb-6">
                If your question is not here — just WhatsApp us. We respond within minutes and love talking to parents.
              </p>
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
          </div>
        </div>
      </section>

      {/* SECTION 3 — MAIN FAQ ACCORDION */}
      <section className="py-24 bg-gradient-to-b from-ice-blue/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Your Questions</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-gray">Click any question to expand the answer.</p>
          </div>

          <div className="max-w-[800px] mx-auto bg-white rounded-[28px] shadow-[0_16px_64px_rgba(18,81,170,0.12)] border border-ice-blue overflow-hidden">
            {FAQ_ITEMS.map((item, idx) => (
              <FAQAccordionItem 
                key={idx}
                item={item}
                index={idx}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — STILL HAVE QUESTIONS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Not Found Your Answer?</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold mb-4">We Are Always Here to Help</h2>
            <p className="text-slate-gray">Reach out directly and get a personal response from our team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* WhatsApp */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgba(18,81,170,0.10)] border-2 border-green p-10 text-center hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bg-green text-white text-[10px] font-bold uppercase tracking-widest py-2">
                ⚡ Fastest Response
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-[#EDFBF3] to-[#F0FFF4] rounded-full flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-10 h-10 text-green" />
              </div>
              <h3 className="font-display text-2xl text-navy font-bold mb-4">WhatsApp Us</h3>
              <p className="text-slate-gray text-base leading-relaxed mb-8">
                Send us a message and get a reply within minutes. Quickest way to get your question answered.
              </p>
              <a 
                href="https://wa.me/+919899389313" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-green text-white py-4 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-green/20"
              >
                Open WhatsApp →
              </a>
              <p className="mt-6 text-[10px] text-slate-gray font-medium uppercase tracking-widest">💬 Reply in minutes</p>
            </div>

            {/* Book a Demo */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgba(18,81,170,0.10)] border border-ice-blue p-10 text-center hover:-translate-y-2 hover:border-primary transition-all duration-300 group relative">
              <div className="absolute top-6 right-6 text-gold">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-ice-blue to-[#F0F5FF] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-navy font-bold mb-4">Book a Free Demo</h3>
              <p className="text-slate-gray text-base leading-relaxed mb-8">
                Sometimes seeing is believing. Book a free 45-minute demo class and get all your questions answered live.
              </p>
              <Link href="/contact"
                className="block w-full bg-primary text-white py-4 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20"
              >
                Schedule Demo →
              </Link>
              <p className="mt-6 text-[10px] text-slate-gray font-medium uppercase tracking-widest">🕒 Free • No commitment</p>
            </div>

            {/* Call Us */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgba(18,81,170,0.10)] border border-ice-blue p-10 text-center hover:-translate-y-2 hover:border-gold transition-all duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FFF8EC] to-[#FFF3DC] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-10 h-10 text-gold" />
              </div>
              <h3 className="font-display text-2xl text-navy font-bold mb-4">Call Us Directly</h3>
              <p className="text-slate-gray text-base leading-relaxed mb-8">
                Prefer a phone call? Speak directly with our team — we are available Monday to Saturday, 9am to 8pm.
              </p>
              <button className="w-full bg-gold text-navy py-4 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-gold/20">
                Call Now →
              </button>
              <p className="mt-6 text-[10px] text-slate-gray font-medium uppercase tracking-widest">📞 Mon–Sat, 9am–8pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — PARENT TRUST QUOTE STRIP */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="text-gold text-7xl font-display mb-8 leading-none">“</div>
          <p className="font-display text-2xl md:text-4xl text-white italic leading-relaxed mb-10 max-w-4xl mx-auto">
            I had so many questions before enrolling my daughter. Mitali answered every single one personally on WhatsApp before I even booked the demo. That level of care told me everything I needed to know.
          </p>
          <div className="flex flex-col items-center gap-4 mb-12">
            <p className="text-white/65 text-sm font-medium">— Priya Kapoor, Parent of Class 7 student, Gurgaon</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}
            </div>
          </div>

          <div className="h-px w-full bg-white/15 mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="font-display text-4xl text-white font-bold mb-2">2 Hours</p>
              <p className="text-white/65 text-xs uppercase tracking-widest">Demo confirmation time</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/15"></div>
            <div className="text-center">
              <p className="font-display text-4xl text-white font-bold mb-2">Minutes</p>
              <p className="text-white/65 text-xs uppercase tracking-widest">WhatsApp response time</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/15"></div>
            <div className="text-center">
              <p className="font-display text-4xl text-white font-bold mb-2">7 Days</p>
              <p className="text-white/65 text-xs uppercase tracking-widest">Full refund window</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — BOTTOM CTA BANNER */}
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
          <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-6">Ready to Stop Wondering and Start Seeing Results?</h2>
          <p className="text-white/75 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Book a free demo class and experience the My Learning Planet system — no payment, no commitment.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact"
              className="w-full sm:w-auto bg-gold text-navy px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-gold/20 hover:scale-105 transition-all duration-300 animate-pulse-subtle"
            >
              ✦ Book a Free Demo
            </Link>
            <Link href="/pricing"
              className="w-full sm:w-auto border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300"
            >
              View Pricing →
            </Link>
          </div>
          
          <p className="mt-8 text-white/50 text-sm">
            Free • No payment today • 45-minute live class
          </p>
        </div>
      </section>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, 0deg)); }
          50% { transform: translateY(-20px) rotate(var(--tw-rotate, 0deg)); }
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
      `}</style>
    </div>
  );
}
