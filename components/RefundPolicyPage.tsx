'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  CalendarCheck, 
  ShieldCheck, 
  RefreshCw, 
  ChevronDown, 
  Gift, 
  Calendar, 
  CreditCard, 
  AlertTriangle, 
  MessageCircle, 
  Scale,
  HeartHandshake,
  Mail,
  ArrowRight,
  FileText,
  Cookie,
  Clock
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

const PromiseCard = ({ icon: Icon, title, desc, pillText, pillBg, pillColor, accentColor, step, isCenter, subNote }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: step * 0.12 }}
      className={`bg-white rounded-[24px] border border-ice-blue p-10 text-center shadow-[0_8px_40px_rgba(18,81,170,0.10)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden ${isCenter ? 'border-2 border-primary shadow-[0_16px_56px_rgba(18,81,170,0.18)]' : ''}`}
    >
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }}></div>
      
      {isCenter && (
        <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-primary to-navy py-2 px-4 text-white text-[10px] font-bold uppercase tracking-widest">
          ⭐ Our Core Promise
        </div>
      )}

      <div className="absolute top-6 right-6 px-3 py-1 bg-slate-gray/10 text-slate-gray text-[10px] font-bold rounded-full" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
        Step {step}
      </div>

      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300`} style={{ background: `linear-gradient(135deg, ${pillBg}, #FFFFFF)` }}>
        <Icon className="w-8 h-8" style={{ color: accentColor }} />
      </div>

      <h3 className="font-display text-2xl font-bold text-navy mb-4">{title}</h3>
      <p className="text-slate-gray font-sans text-base leading-relaxed mb-8">{desc}</p>
      
      <div 
        className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
        style={{ backgroundColor: pillBg, color: pillColor, border: `1px solid ${pillColor}40` }}
      >
        {pillText}
      </div>
      <p className="text-slate-gray font-sans text-xs">{subNote}</p>
    </motion.div>
  );
};

const TimelineStage = ({ stage, index, isAbove }: any) => {
  const Icon = stage.icon;
  return (
    <div className="relative flex flex-col items-center flex-1">
      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: isAbove ? -20 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className={`absolute ${isAbove ? 'bottom-16' : 'top-16'} w-60 bg-white rounded-2xl border border-ice-blue p-5 shadow-sm text-center z-20`}
      >
        <div className="w-8 h-8 rounded-full bg-ice-blue flex items-center justify-center mx-auto mb-3">
          <Icon className="w-4 h-4" style={{ color: stage.color }} />
        </div>
        <h4 className="font-sans font-bold text-navy text-sm mb-1">{stage.title}</h4>
        <p className="text-slate-gray text-xs mb-2 leading-tight">{stage.desc}</p>
        <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${stage.color}15`, color: stage.color }}>
          {stage.tag}
        </div>
        {stage.important && (
          <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[8px] font-bold animate-pulse">
            Refund Window Open 🔓
          </div>
        )}
      </motion.div>

      {/* Dot */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.2 }}
        className="relative z-10 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all duration-300"
        style={{ backgroundColor: stage.color, boxShadow: `0 0 0 6px ${stage.color}25` }}
      >
        <span className="text-white font-display font-bold">{index + 1}</span>
      </motion.div>
    </div>
  );
};

const parseAnswer = (answer: string): { intro: string; points: string[] } => {
  const firstMatch = answer.search(/\(\d+\)\s/);
  if (firstMatch === -1) return { intro: answer, points: [] };
  const intro = answer.slice(0, firstMatch).trim();
  const rest = answer.slice(firstMatch);
  const parts = rest
    .split(/(?=\(\d+\)\s)/)
    .map((p) => p.replace(/^\(\d+\)\s*/, "").trim())
    .filter(Boolean);
  return { intro, points: parts };
};

const AccordionItem = ({ item, isOpen, onClick, index }: any) => {
  const Icon = item.icon;
  const { intro, points } = parseAnswer(item.answer);

  return (
    <div className={`border-b border-ice-blue last:border-0 transition-colors duration-300 ${isOpen ? "bg-gradient-to-r from-ice-blue to-[#F8FAFF]" : ""}`}>
      <div
        onClick={() => onClick(index)}
        className="px-8 py-7 flex items-center gap-6 cursor-pointer hover:bg-[#F8FAFF] transition-colors group"
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-primary text-white" : "bg-ice-blue text-primary"}`}>
          <Icon className="w-[18px] h-[18px]" />
        </div>
        <span className={`flex-1 font-sans font-bold text-base transition-colors duration-300 ${isOpen ? "text-primary" : "text-navy"}`}>
          {item.title}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-primary text-white rotate-180" : "bg-ice-blue text-primary"}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
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
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value) || 100;
      const duration = 2;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/7 border border-white/14 backdrop-blur-md rounded-[20px] p-7 text-center hover:bg-white/12 hover:border-white/25 hover:-translate-y-1.5 transition-all duration-300 group"
    >
      <Icon className="w-7 h-7 text-white/80 mx-auto mb-4" />
      <div className="text-white font-display text-3xl font-bold mb-1">
        {value.includes('Days') ? `${count} Days` : value.includes('%') ? `${count}%` : count === 0 && value === "0" ? "0" : value}
      </div>
      <div className="text-white/55 font-sans text-sm mb-3">{label}</div>
      <div className="w-8 h-0.5 bg-gold mx-auto rounded-full"></div>
    </motion.div>
  );
};

// Helper hook for scroll detection
function useInView(ref: any, options: any) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.once) observer.unobserve(entry.target);
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
  return isInView;
}

export default function RefundPolicyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const timelineRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: true, threshold: 0.2 });

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

  const timelineStages = [
    { icon: CalendarCheck, title: "Book Free Demo", desc: "Zero payment required", tag: "Day 0", color: "#22A05A" },
    { icon: CreditCard, title: "Enroll and Pay", desc: "₹4,000 first month", tag: "Day 1", color: "#1251AA" },
    { icon: Gift, title: "Experience Classes", desc: "Attend live classes, explore the app", tag: "Days 1–7", color: "#F5A623", important: true },
    { icon: MessageCircle, title: "Request if Needed", desc: "Email or WhatsApp us — we process immediately", tag: "Within Day 7", color: "#1251AA" },
    { icon: ShieldCheck, title: "Refund Processed", desc: "Full amount returned within 5–7 business days", tag: "Day 12–14", color: "#22A05A" },
  ];

  const policyItems = [
    {
      icon: Gift,
      title: "Free Demo Class — No Payment Required",
      answer: "Every family considering My Learning Planet is entitled to one free 45-minute demo class — no payment, no registration fee, and no commitment of any kind required. During the demo: (1) Your child will attend a live structured class conducted by Mitali — experiencing our teaching methodology firsthand. (2) You will receive an overview of the weekly curriculum structure and see how the parent dashboard works. (3) You can ask any questions about the platform, curriculum, fees, or schedule — directly to our team. The demo is completely free and carries zero obligation. We offer this because we are confident in our system and believe you should experience it before making any financial commitment to maths tuition fees in gurgaon. To book your free demo, contact us via WhatsApp at +91 9899389313 or fill out the form on our Contact page."
    },
    {
      icon: ShieldCheck,
      title: "7-Day Full Refund Guarantee",
      answer: "Our most important promise — if you enroll in My Learning Planet and are not fully satisfied within the first 7 days of your paid subscription, we will refund your complete first month fee with no questions asked. The terms of this guarantee are: (1) Eligibility: The 7-day refund applies to your first month subscription fee only — ₹4,000 for monthly subscribers or the prorated equivalent for annual subscribers. (2) How to claim: Send a WhatsApp message or email to connect@mylearningplanet.in stating that you would like to claim your refund. No lengthy forms, no explanations required. (3) Processing time: Your refund will be initiated within 2 business days of your request and credited to your original payment method within 5–7 business days depending on your bank. (4) No partial refunds within the 7-day window: If you request a refund on Day 3 or Day 7 — the full ₹4,000 is refunded regardless of how many classes your child attended. This is our unconditional promise to every new family."
    },
    {
      icon: Calendar,
      title: "Refunds After the 7-Day Window",
      answer: "After the initial 7-day refund window, our refund policy is as follows: (1) Monthly subscriptions: Fees paid for months beyond the first are non-refundable once the billing cycle has begun. If you cancel your monthly subscription with 15 days notice, your access continues until the end of your current billing cycle — no refund is issued for the remaining days. (2) Annual subscriptions: Annual subscription fees are non-refundable after the 7-day window. We strongly recommend starting with a monthly subscription if you are uncertain about a long-term commitment — you can always switch to annual later and save ₹8,000 per year. (3) Exceptional circumstances: We review refund requests beyond the 7-day window on a case-by-case basis in situations involving: documented medical emergencies affecting the enrolled student, relocation outside India, or extended technical failure on our platform preventing access for more than 7 consecutive days. Exceptional refund requests should be emailed to connect@mylearningplanet.in with relevant documentation."
    },
    {
      icon: RefreshCw,
      title: "Cancellation Policy",
      answer: "Cancelling your My Learning Planet subscription is simple and penalty-free: (1) Notice period: Provide 15 days written notice before your next billing date via WhatsApp or email. (2) How to cancel: Send a WhatsApp message to +91 9899389313 or email connect@mylearningplanet.in with your registered name, your child's name, and the word CANCEL. No forms, no calls required. (3) Access after cancellation: Your student and parent app access continues until the end of your current paid billing period — you will not lose access the moment you cancel. (4) No cancellation fees: There are absolutely no penalties, exit fees, or charges for cancelling your subscription at any time. (5) Re-enrollment: If you cancel and wish to re-enroll later, you are welcome to do so subject to batch availability. Your child’s previous progress data will be retained for 12 months to allow for smooth re-enrollment into our maths tuition in gurgaon. (6) Annual subscriptions: Cancellation of an annual subscription stops future renewals but does not entitle you to a refund for the remaining months beyond the 7-day window."
    },
    {
      icon: CreditCard,
      title: "Refund Processing and Payment Methods",
      answer: "Refunds are processed as follows: (1) Refund method: All refunds are credited to the original payment method used during enrollment — UPI, debit card, credit card, or net banking. We do not issue refunds via a different payment method or as cash. (2) Processing timeline: Refund initiation happens within 2 business days of your approved request. Credit to your account typically takes 5–7 business days after initiation — this timeline is controlled by your bank or payment provider, not by us. (3) UPI refunds: UPI refunds are typically the fastest — usually credited within 1–3 business days. (4) Credit card refunds: Credit card refunds may take 5–7 business days to appear on your statement depending on your card provider's processing cycles. (5) Confirmation: You will receive a WhatsApp and email confirmation when your refund has been initiated, along with a refund transaction reference number for your records. (6) GST: If you received a GST invoice, the refund will be issued for the full amount paid including any applicable taxes."
    },
    {
      icon: AlertTriangle,
      title: "Non-Refundable Items and Exceptions",
      answer: "The following are not covered by our refund policy: (1) Demo class: The free demo class involves no payment and therefore has no refund implications. (2) Subscription fees beyond the 7-day window: Monthly or annual fees paid beyond the first 7-day guarantee period are non-refundable under standard circumstances. (3) Individual class absences: Missing individual classes — even multiple classes — does not entitle you to a partial refund, as all classes are recorded and made available in the student app. (4) Change of mind after 7 days: Refunds are not issued for change of mind, schedule conflicts, or reduced usage after the 7-day window has passed. (5) Misuse or suspension: If an account is suspended due to violation of our Terms of Service — including misuse of platform content, sharing of login credentials, or abusive conduct — no refund will be issued regardless of timing. (6) Third-party costs: We are not responsible for any third-party costs incurred in connection with your use of our platform — including internet charges, device costs, or payment gateway fees while accessing our maths tuition in gurgaon."
    },
    {
      icon: MessageCircle,
      title: "How to Request a Refund",
      answer: "Requesting a refund is intentionally simple — we do not make it difficult: (1) WhatsApp: Send a message to +91 9899389313 with your registered parent name, your child's name, and the message 'Refund Request'. Our team will respond within 2 hours during working hours (Monday to Saturday, 9am to 8pm). (2) Email: Send an email to connect@mylearningplanet.in with the subject line 'Refund Request' and include your registered name and the email address used during enrollment. (3) What we need: Your name, your child’s name, and your preferred refund confirmation contact (WhatsApp or email). We do not require you to explain your reason for requesting a refund within the 7-day window — though your feedback is always welcome and helps us improve our learning system and resources, including areas like maths coaching in gurgaon content. (4) Confirmation: Once your refund is approved — which happens immediately for valid 7-day window requests — you will receive a confirmation message with a refund reference number. (5) Escalation: If you face any issue with your refund, email connect@mylearningplanet.in marked URGENT and we will personally resolve it within 24 hours."
    },
    {
      icon: Scale,
      title: "Disputes and Consumer Rights",
      answer: "We are committed to resolving all refund disputes fairly and quickly: (1) Internal resolution: Before pursuing any formal dispute, please contact us directly at connect@mylearningplanet.in — we resolve the vast majority of concerns within 48 hours through direct communication. (2) Consumer rights: As a consumer in Gurgaon, you are protected by the Consumer Protection Act 2019. Nothing in this refund policy limits or overrides your statutory rights under Indian consumer protection law. (3) Dispute escalation: If an internal resolution is not reached within 7 business days of your complaint, you may escalate to the National Consumer Disputes Redressal Commission (NCDRC) or your applicable State Consumer Forum. (4) Chargeback policy: If you initiate a chargeback through your bank or card provider without first attempting resolution with us, we reserve the right to provide transaction evidence to your payment provider demonstrating service delivery. We strongly encourage direct communication before any chargeback is initiated — it is always faster and simpler. (5) All disputes are subject to the jurisdiction of courts in 15th Floor, OCUS Quantum, Sector 51, Gurgaon 122003. This ensures a fair and transparent experience for all students accessing our learning resources, including support materials like maths coaching in gurgaon content."
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
            <span className="text-white">Refund Policy</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8">
            <span className="text-gold">💰</span> Fair. Transparent. No Drama.
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 relative inline-block">
            <span className="relative">
              Refund
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
            We built our refund policy the same way we built our curriculum — with complete clarity and zero hidden surprises for families who choose our platform for maths tuition fees in gurgaon. Here is exactly what you are entitled to.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {["7-Day Full Refund", "No Questions Asked", "Cancel Anytime"].map((chip, i) => (
              <div key={i} className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-sans font-bold animate-pulse-slow">
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — THREE PROMISE CARDS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <PromiseCard 
              icon={CalendarCheck}
              title="Try Before You Pay"
              desc="Every family gets a free 45-minute demo class before paying a single rupee. Experience the system, meet Mitali, see the curriculum — then decide."
              pillText="100% Free Demo ✓"
              pillBg="#EDFBF3"
              pillColor="#22A05A"
              accentColor="#22A05A"
              step={1}
              subNote="No card required for demo"
            />
            <PromiseCard 
              icon={ShieldCheck}
              title="7-Day Full Refund"
              desc="If you enroll and feel our system is not right for your child within the first 7 days — we refund your complete first month fee. No forms. No hassle. No questions asked."
              pillText="Full Refund Guaranteed ✓"
              pillBg="#EAF1FF"
              pillColor="#1251AA"
              accentColor="#1251AA"
              step={2}
              isCenter={true}
              subNote="Processed within 5-7 business days"
            />
            <PromiseCard 
              icon={RefreshCw}
              title="Cancel Anytime"
              desc="Not happy after the first month? Cancel your subscription anytime with just 15 days notice. No penalties. No lock-in. No drama — ever."
              pillText="No Lock-in Contract ✓"
              pillBg="#FFF8EC"
              pillColor="#F5A623"
              accentColor="#F5A623"
              step={3}
              subNote="Cancel via WhatsApp or Email"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 — VISUAL REFUND TIMELINE */}
      <section className="py-24 bg-gradient-to-b from-[#F0F5FF] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-widest mb-4 block">How It Works</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">Your Refund Journey — Step by Step</h2>
            <p className="text-slate-gray font-sans text-lg">
              From enrollment to refund — here is exactly what happens when you choose My Learning Planet for maths tuition fees in gurgaon, ensuring complete clarity at every step.
            </p>
          </div>

          <div className="max-w-7xl mx-auto bg-white rounded-[28px] border border-ice-blue shadow-[0_8px_40px_rgba(18,81,170,0.10)] p-12 md:p-20 relative overflow-hidden">
            {/* Timeline Line */}
            <div className="absolute text-xl md:text-2xl font-semibold top-1/2 left-0 w-full h-[3px] bg-ice-blue -translate-y-1/2 hidden md:block">
              <motion.div 
                ref={timelineRef}
                initial={{ width: 0 }}
                animate={{ width: isTimelineInView ? '100%' : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-[#22A05A] via-[#1251AA] to-[#F5A623]"
              ></motion.div>
            </div>

            {/* Stages */}
            <div className="flex text-xl md:text-2xl font-semibold flex-col md:flex-row justify-between items-center gap-24 md:gap-0 relative z-10 h-full md:h-80">
              {timelineStages.map((stage, idx) => (
                <TimelineStage 
                  key={idx} 
                  stage={stage} 
                  index={idx} 
                  isAbove={idx % 2 === 0} 
                />
              ))}
            </div>

            {/* Mobile Vertical Line */}
            <div className="absolute left-1/2 top-0 w-[3px] h-full bg-ice-blue -translate-x-1/2 md:hidden"></div>
          </div>

          <div className="mt-16 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-gradient-to-br from-[#FFF8EC] to-[#FFF3DC] border-2 border-gold rounded-2xl px-8 py-4 shadow-[0_4px_20px_rgba(245,166,35,0.15)]"
            >
              <p className="text-navy font-bold font-sans">
                ⚡ Most refund requests are processed within 3 business days — not the maximum 7.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — MAIN REFUND ACCORDION */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Full Policy</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">Complete Refund Policy Details</h2>
            <p className="text-slate-gray font-sans text-lg">Click any section for the complete details.</p>
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

      {/* SECTION 5 — QUICK REFUND FACTS STRIP */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 40px)' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-white/45 font-bold text-xs tracking-[0.2em] mb-4 uppercase">Quick Facts</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Everything at a Glance</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto mb-20">
            <FactCard icon={Gift} value="100%" label="Demo is Free" index={0} />
            <FactCard icon={ShieldCheck} value="7 Days" label="Refund Window" index={1} />
            <FactCard icon={RefreshCw} value="15 Days" label="Cancellation Notice" index={2} />
            <FactCard icon={Clock} value="5–7 Days" label="Refund Processing" index={3} />
            <FactCard icon={HeartHandshake} value="0" label="Cancellation Fees" index={4} />
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <div className="h-[1px] bg-white/10 w-full mb-12"></div>
            <div className="relative">
              <span className="text-gold font-display text-6xl absolute -top-8 left-0 opacity-40">"</span>
              <p className="text-white italic font-display text-xl md:text-2xl leading-relaxed mb-6 px-8">
                I asked for a refund on Day 5 — it was processed without any questions and credited back within 4 days. The level of trust this built actually made me re-enroll a month later.
              </p>
              <p className="text-white/55 font-sans text-sm">— Kavita Agarwal, Parent, Gurgaon</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CONTACT FOR REFUND QUESTIONS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-wider mb-4 block">Need Help?</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">We Make Refunds Easy</h2>
            <p className="text-slate-gray font-sans text-lg max-w-2xl mx-auto">
              Questions about our refund policy or want to request one — reach out and we respond personally, fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
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

            {/* Email Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[24px] border border-ice-blue p-8 text-center shadow-sm hover:-translate-y-1.5 hover:border-primary transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-2">Email Us</h3>
              <p className="text-primary font-sans font-bold text-base mb-1">connect@mylearningplanet.in</p>
              <p className="text-slate-gray font-sans text-base mb-1">Response within 24 hours</p>
              <p className="text-slate-gray font-sans text-[14px] mb-6 italic">Subject: Refund Request</p>
              <a 
                href="mailto:connect@mylearningplanet.in"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-primary text-primary font-sans font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300"
              >
                Send Email <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — RELATED LEGAL PAGES */}
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

            <Link href="/terms-of-service" className="bg-white rounded-[20px] border border-ice-blue p-8 text-center shadow-sm hover:-translate-y-1 hover:border-primary transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-gold" />
              </div>
              <h4 className="font-sans font-bold text-lg text-navy mb-2">Terms of Service</h4>
              <p className="text-slate-gray text-lg mb-6">Rules and conditions of use</p>
              <span className="text-primary text-base font-bold flex items-center justify-center gap-1">Read Policy <ArrowRight className="w-3 h-3" /></span>
            </Link>

            <Link href="/cookie-policy" className="bg-white rounded-[20px] border border-ice-blue p-8 text-center shadow-sm hover:-translate-y-1 hover:border-primary transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Cookie className="w-6 h-6 text-green" />
              </div>
              <h4 className="font-sans font-bold text-lg text-navy mb-2">Cookie Policy</h4>
              <p className="text-slate-gray text-lg mb-6">How we use cookies</p>
              <span className="text-primary text-base font-bold flex items-center justify-center gap-1">Read Policy <ArrowRight className="w-3 h-3" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8 — BOTTOM CTA BANNER */}
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
            Enroll With Complete Confidence.
          </h2>
          
          <p className="text-white/75 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-12">
            Free demo first. 7-day full refund. Cancel anytime. Zero risk — always.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link href="/contact"
              className="px-10 py-4 rounded-full bg-gold text-navy font-sans font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(245,166,35,0.4)] animate-pulse-slow"
            >
              ✦ Book a Free Demo
            </Link>
            <Link href="/pricing"
              className="px-10 py-4 rounded-full border-2 border-white text-white font-sans font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300"
            >
              View Pricing →
            </Link>
          </div>

          <p className="text-white/30 text-xs font-sans">
            Free demo · No payment today · Cancel anytime
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
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
