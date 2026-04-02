'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Star, 
  Quote, 
  ArrowRight, 
  PlayCircle, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  MessageCircle, 
  Mail,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';

// --- Components ---

const CountUp = ({ end, duration = 2, suffix = "" }: { end: number | string, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const endNum = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) : end;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = endNum / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= endNum) {
          setCount(endNum);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, endNum, duration]);

  return (
    <span ref={ref}>
      {count % 1 === 0 ? count : count.toFixed(1)}{suffix}
    </span>
  );
};

const MathSymbol = ({ symbol, size, top, left, rotate, delay, duration }: any) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.04, 0.08, 0.04],
      y: [0, -20, 0],
      rotate: [rotate, rotate + 10, rotate]
    }}
    transition={{ 
      duration: duration || 5, 
      repeat: Infinity, 
      delay: delay || 0,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none select-none text-white font-serif"
    style={{ fontSize: size, top, left, transform: `rotate(${rotate}deg)` }}
  >
    {symbol}
  </motion.span>
);

const TestimonialChip = ({ initials, color, text, stars }: any) => (
  <div className="bg-white border border-[#EAF1FF] rounded-full shadow-sm px-6 py-3.5 flex items-center gap-4 whitespace-nowrap hover:shadow-md transition-shadow cursor-default group">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${color}`}>
      {initials}
    </div>
    <span className="text-[#1A1A1A] font-sans font-medium text-sm">{text}</span>
    <div className="flex gap-0.5">
      {[...Array(stars)].map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
      ))}
    </div>
  </div>
);

export default function TestimonialsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  const mathSymbols = [
    { s: '＋', sz: '24px', t: '15%', l: '10%', r: 15, d: 0 },
    { s: '×', sz: '32px', t: '25%', l: '85%', r: -10, d: 1 },
    { s: '÷', sz: '28px', t: '65%', l: '15%', r: 45, d: 2 },
    { s: '√', sz: '40px', t: '80%', l: '80%', r: 0, d: 1.5 },
    { s: 'π', sz: '36px', t: '40%', l: '5%', r: -20, d: 3 },
    { s: '∑', sz: '44px', t: '10%', l: '70%', r: 10, d: 0.5 },
    { s: '∞', sz: '30px', t: '85%', l: '40%', r: 30, d: 2.5 },
    { s: 'θ', sz: '26px', t: '50%', l: '90%', r: -15, d: 1.2 },
    { s: '²', sz: '22px', t: '20%', l: '45%', r: 0, d: 3.5 },
    { s: '≈', sz: '34px', t: '70%', l: '60%', r: 25, d: 0.8 },
  ];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden selection:bg-[#1251AA]/20">
      {/* SECTION 1: CINEMATIC HERO */}
      <section className="relative min-h-[85vh] bg-[#0A1F5E] flex flex-col items-center justify-center overflow-hidden px-4 py-20">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          {/* Layer 1: Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-radial-gradient from-[#1251AA]/40 to-transparent opacity-60 blur-[100px]" />
          
          {/* Layer 2: Gold Glow */}
          <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] bg-radial-gradient from-[#F5A623]/10 to-transparent opacity-40 blur-[80px]" />

          {/* Layer 3: Math Grid */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} 
          />

          {/* Layer 4: Floating Symbols */}
          {mathSymbols.map((sym, i) => (
            <MathSymbol key={i} symbol={sym.s} size={sym.sz} top={sym.t} left={sym.l} rotate={sym.r} delay={sym.d} />
          ))}

          {/* Layer 5: Rotating Circles */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-white/45 font-sans text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Testimonials</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-6 py-2 mb-8"
          >
            <span className="text-white font-sans text-sm font-bold flex items-center gap-2">
              <Star className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
              Real Stories. Real Results. Real Families.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8"
          >
            <span className="block font-bold">200+ Students.</span>
            <span className="block font-normal">Families Who</span>
            <span className="relative inline-block font-bold italic">
              Believed in Structure.
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-[#F5A623]" viewBox="0 0 300 20" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                  d="M5,15 Q150,5 295,15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/72 font-sans text-lg md:text-xl max-w-4xl mx-auto mb-16 leading-relaxed"
          >
            These are not cherry-picked success stories. These are real families from Gurgaon who were searching for best maths classes near me and trusted our structured learning system — and saw their children transform with confidence and consistent progress.
          </motion.p>

          {/* Floating Quote Chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.4 },
              scale: { duration: 0.6, delay: 0.4 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-[20px] p-6 md:p-8 max-w-md shadow-2xl relative mb-16"
          >
            <Quote className="absolute -top-4 -left-4 w-10 h-10 text-[#F5A623] opacity-50" />
            <p className="text-white italic font-sans text-lg mb-4">
              "My daughter went from avoiding math to loving it."
            </p>
            <p className="text-white/60 text-sm font-sans">
              — Sunita V., Parent, Class 8
            </p>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
            {[
              { num: 200, label: "Students Taught", suffix: "+" },
              { num: 4.9, label: "Avg Rating", suffix: "★" },
              { num: 38, label: "Score Improvement", suffix: "%" },
              { num: 100, label: "Would Recommend", suffix: "%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="bg-white/8 border border-white/15 backdrop-blur-md rounded-full px-6 py-4 flex flex-col items-center justify-center"
              >
                <span className="text-white font-display text-2xl md:text-3xl font-bold">
                  <CountUp end={stat.num} suffix={stat.suffix} />
                </span>
                <span className="text-white/55 font-sans text-[10px] uppercase tracking-widest font-bold">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED TESTIMONIAL */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-[#1251AA] font-sans font-bold text-sm tracking-[0.2em] uppercase">
              Featured Story
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto bg-white rounded-[32px] border border-[#EAF1FF] shadow-[0_32px_80px_rgba(18,81,170,0.14)] overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Left: Visual Panel */}
            <div className="lg:w-[45%] bg-gradient-to-br from-[#0A1F5E] via-[#1251AA] to-[#1a6fd4] p-12 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              {/* Floating Symbols */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <span className="absolute top-10 left-10 text-4xl font-bold text-white">÷</span>
                <span className="absolute bottom-20 right-10 text-5xl font-bold text-white">√</span>
                <span className="absolute top-1/2 left-1/2 text-6xl font-bold text-white">π</span>
              </div>

              <div className="relative z-10">
                <div className="bg-[#F5A623]/20 border border-[#F5A623]/40 rounded-full px-4 py-1.5 inline-flex items-center gap-2 mb-12">
                  <span className="text-[#F5A623] font-sans text-xs font-bold uppercase tracking-wider">
                    🏆 Score Transformation Story
                  </span>
                </div>

                {/* Score Visual */}
                <div className="flex items-center justify-center gap-8 mb-12">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                      <span className="text-white font-display text-4xl font-bold">69</span>
                    </div>
                    <span className="text-white/55 font-sans text-[10px] uppercase font-bold">Before</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-[#F5A623] animate-pulse"
                  >
                    <ArrowRight className="w-8 h-8" />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-32 h-32 rounded-full bg-[#F5A623]/20 border-2 border-[#F5A623] flex items-center justify-center shadow-[0_0_30px_rgba(245,166,35,0.25)]">
                      <span className="text-[#F5A623] font-display text-5xl font-bold">95</span>
                    </div>
                    <span className="text-[#F5A623] font-sans text-[10px] uppercase font-bold">After</span>
                  </motion.div>
                </div>

                <div className="text-center">
                  <p className="text-white font-sans font-bold text-lg mb-2">+26 points in 4 months</p>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 bg-white/8 border border-white/15 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#F5A623] flex items-center justify-center text-[#0A1F5E] font-display font-bold text-lg">
                  A
                </div>
                <div>
                  <p className="text-white font-sans font-bold text-sm">Arjun S.</p>
                  <p className="text-white/60 font-sans text-[10px]">Class 9 · Gurgaon</p>
                </div>
              </div>
            </div>

            {/* Right: Content Panel */}
            <div className="lg:w-[55%] p-12 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[#5A6B82] font-sans text-sm font-medium uppercase tracking-wider">Parent Testimonial</span>
                <span className="bg-[#EAF1FF] text-[#1251AA] px-3 py-1 rounded-full font-sans text-[10px] font-bold">October 2024</span>
              </div>

              <Quote className="w-16 h-16 text-[#1251AA] opacity-10 mb-4" />
              
              <p className="font-display text-[#0A1F5E] text-2xl md:text-3xl italic leading-relaxed mb-12">
                "My son's scores improved from 69 to 95 in just 4 months. I had tried two other coaching centers before My Learning Planet — none of them gave me weekly reports, none of them had a fixed curriculum, and none of them made my son actually look forward to studying. The structure here is unlike anything I have experienced."
              </p>

              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-[#1251AA] flex items-center justify-center text-white font-sans font-bold">
                  AS
                </div>
                <div>
                  <p className="text-[#0A1F5E] font-sans font-bold">Aditi Sharma</p>
                  <p className="text-[#5A6B82] font-sans text-sm">Parent of Arjun, Class 9</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-10">
                <span className="bg-[#EDFBF3] text-[#22A05A] border border-[#22A05A]/20 px-4 py-2 rounded-full font-sans text-xs font-bold flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" />
                  +26 points
                </span>
                <span className="bg-[#EAF1FF] text-[#1251AA] px-4 py-2 rounded-full font-sans text-xs font-bold flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  4 months
                </span>
                <span className="bg-[#FFF8EC] text-[#F5A623] px-4 py-2 rounded-full font-sans text-xs font-bold flex items-center gap-2">
                  <Star className="w-3 h-3 fill-current" />
                  5 star rating
                </span>
              </div>

              <div className="w-16 h-0.5 bg-[#F5A623] rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: BENTO GRID */}
      <section className="py-24 bg-gradient-to-b from-[#F0F5FF] to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#1251AA] font-sans font-bold text-sm tracking-[0.2em] uppercase mb-4 block">
              More Stories
            </span>
            <h2 className="font-display text-[#0A1F5E] text-4xl md:text-5xl font-bold mb-6">
              Four More Families. Four More Transformations.
            </h2>
            <p className="text-[#5A6B82] font-sans text-lg">
              Every story is different. The result is always the same — clarity, structure, improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card A: Student Voice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[24px] border border-[#EAF1FF] shadow-[0_4px_28px_rgba(18,81,170,0.08)] overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:border-[#1251AA]/30 transition-all duration-300 relative group"
            >
              <div className="h-1 bg-[#22A05A] w-full" />
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-[#EDFBF3] text-[#22A05A] border border-[#22A05A]/20 px-3 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider">
                    🎓 Student Voice
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                    ))}
                  </div>
                </div>

                <Quote className="absolute top-12 right-8 w-16 h-16 text-[#EAF1FF] opacity-40 -z-0" />
                
                <p className="font-display text-[#0A1F5E] text-lg italic leading-relaxed mb-8 relative z-10">
                  "I used to dread math. Now I actually look forward to Mitali's classes. The weekly plan means I always know what I am learning — no surprises."
                </p>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#22A05A] flex items-center justify-center text-white font-sans font-bold">
                    R
                  </div>
                  <div>
                    <p className="text-[#0A1F5E] font-sans font-bold text-sm">Rohan M.</p>
                    <p className="text-[#5A6B82] font-sans text-[10px]">Class 8 · Student</p>
                  </div>
                </div>

                <div className="bg-[#EDFBF3] text-[#22A05A] px-4 py-2 rounded-full font-sans text-xs font-bold text-center">
                  Before: 61 → After: 84
                </div>
              </div>
            </motion.div>

            {/* Card B: Parent Testimonial (Wide) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-2 bg-white rounded-[24px] border border-[#EAF1FF] shadow-[0_4px_28px_rgba(18,81,170,0.08)] overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:border-[#1251AA]/30 transition-all duration-300 group"
            >
              <div className="h-1 bg-[#1251AA] w-full" />
              <div className="p-8 flex flex-col lg:flex-row gap-8">
                <div className="lg:w-[60%]">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-[#EAF1FF] text-[#1251AA] px-3 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider">
                      👨‍👩‍👧 Parent Story
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                      ))}
                    </div>
                  </div>

                  <Quote className="w-12 h-12 text-[#EAF1FF] opacity-40 mb-2" />
                  
                  <p className="font-display text-[#0A1F5E] text-xl italic leading-relaxed mb-8">
                    "The parent dashboard changed everything for us. Every Monday I get a full report — attendance, test score, what was taught, teacher feedback. No other coaching center ever gave us this level of visibility."
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1251AA] flex items-center justify-center text-white font-sans font-bold">
                      PK
                    </div>
                    <div>
                      <p className="text-[#0A1F5E] font-sans font-bold text-sm">Priya Kapoor</p>
                      <p className="text-[#5A6B82] font-sans text-[10px]">Parent, Class 7 · Gurgaon</p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[40%] bg-gradient-to-br from-[#EAF1FF] to-[#F0F5FF] rounded-2xl p-6 flex flex-col justify-center text-center">
                  <p className="text-[#0A1F5E] font-sans font-bold text-sm mb-4">Daughter's Progress</p>
                  <p className="text-[#1251AA] font-display text-4xl font-bold mb-2">71 → 89</p>
                  <p className="text-[#22A05A] font-sans font-bold text-sm mb-6">+18 points</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="relative h-2 bg-[#5A6B82]/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '71%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute inset-0 bg-[#5A6B82]/30"
                      />
                    </div>
                    <div className="relative h-2 bg-[#1251AA]/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '89%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="absolute inset-0 bg-[#1251AA]"
                      />
                    </div>
                  </div>
                  <p className="text-[#5A6B82] font-sans text-[10px]">3 months</p>
                </div>
              </div>
            </motion.div>

            {/* Card C: Score Improvement (Wide) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2 bg-white rounded-[24px] border border-[#EAF1FF] shadow-[0_4px_28px_rgba(18,81,170,0.08)] overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:border-[#1251AA]/30 transition-all duration-300 group"
            >
              <div className="h-1 bg-[#F5A623] w-full" />
              <div className="p-8 flex flex-col lg:flex-row gap-8">
                <div className="lg:w-[40%] bg-gradient-to-br from-[#FFF8EC] to-[#FFF3DC] rounded-2xl p-6 flex flex-col justify-center text-center">
                  <p className="text-[#0A1F5E] font-sans font-bold text-sm mb-6">Score Journey</p>
                  
                  <div className="flex items-end justify-center gap-4 h-32 mb-6">
                    {[
                      { h: '45%', l: 'M1', v: '45' },
                      { h: '58%', l: 'M2', v: '58' },
                      { h: '72%', l: 'M3', v: '72' },
                      { h: '91%', l: 'M4', v: '91' },
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 flex-1">
                        <span className="text-[#0A1F5E] font-sans font-bold text-[8px]">{bar.v}</span>
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: bar.h }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                          className="w-full bg-gradient-to-t from-[#F5A623] to-[#FFD700] rounded-t-md"
                        />
                        <span className="text-[#5A6B82] font-sans text-[8px]">{bar.l}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#F5A623]/10 text-[#F5A623] px-3 py-1 rounded-full font-sans text-[10px] font-bold">
                    Class 10 Board Preparation
                  </div>
                </div>

                <div className="lg:w-[60%]">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-[#FFF8EC] text-[#F5A623] border border-[#F5A623]/20 px-3 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider">
                      📈 Score Story
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                      ))}
                    </div>
                  </div>

                  <Quote className="w-12 h-12 text-[#FFF8EC] opacity-40 mb-2" />
                  
                  <p className="font-display text-[#0A1F5E] text-xl italic leading-relaxed mb-8">
                    "We enrolled our daughter in Class 10 — just 6 months before boards. I was nervous it was too late. The structured revision modules and weekly tests gave her a system she had never had before. She went from 68 to 91 in her pre-boards."
                  </p>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#F5A623] flex items-center justify-center text-[#0A1F5E] font-sans font-bold">
                      NV
                    </div>
                    <div>
                      <p className="text-[#0A1F5E] font-sans font-bold text-sm">Neha Verma</p>
                      <p className="text-[#5A6B82] font-sans text-[10px]">Parent, Class 10 · Gurgaon</p>
                    </div>
                  </div>

                  <div className="bg-[#FFF8EC] text-[#F5A623] border border-[#F5A623]/30 px-4 py-2 rounded-full font-sans text-xs font-bold inline-block">
                    Board exam result: 91/100
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card D: Family Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-[24px] border border-[#EAF1FF] shadow-[0_4px_28px_rgba(18,81,170,0.08)] overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:border-[#1251AA]/30 transition-all duration-300 relative group"
            >
              <div className="h-1 bg-[#0A1F5E] w-full" />
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-[#EAF1FF] text-[#0A1F5E] px-3 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider">
                    ❤️ Family Story
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                    ))}
                  </div>
                </div>

                <Quote className="absolute top-12 right-8 w-16 h-16 text-[#EAF1FF] opacity-40 -z-0" />
                
                <p className="font-display text-[#0A1F5E] text-lg italic leading-relaxed mb-8 relative z-10">
                  "Both my children are enrolled — Class 7 and Class 9. The consistency across both batches is remarkable. Same quality. Same structure. Same level of parent communication. Mitali treats every student like her own."
                </p>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#0A1F5E] flex items-center justify-center text-white font-sans font-bold">
                    AM
                  </div>
                  <div>
                    <p className="text-[#0A1F5E] font-sans font-bold text-sm">Amit Mehta</p>
                    <p className="text-[#5A6B82] font-sans text-[10px]">Parent of 2 students · Gurgaon</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="bg-[#EAF1FF] text-[#1251AA] px-3 py-1.5 rounded-full font-sans text-[10px] font-bold">Class 7 ✓</span>
                  <span className="bg-[#EAF1FF] text-[#1251AA] px-3 py-1.5 rounded-full font-sans text-[10px] font-bold">Class 9 ✓</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card E: Video Testimonial Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[24px] border-2 border-[#EAF1FF] shadow-[0_8px_40px_rgba(18,81,170,0.10)] overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Left: Video Player */}
            <div className="lg:w-1/2 bg-gradient-to-br from-[#0A1F5E] to-[#1251AA] p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[350px]">
              {/* Math Symbols */}
              <div className="absolute inset-0 pointer-events-none opacity-5">
                <span className="absolute top-10 left-10 text-4xl font-bold text-white">∑</span>
                <span className="absolute bottom-20 right-10 text-5xl font-bold text-white">∞</span>
                <span className="absolute top-1/2 left-1/4 text-6xl font-bold text-white">θ</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/15 border-[3px] border-white/40 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:bg-white/25 transition-all duration-300">
                  <PlayCircle className="w-10 h-10 text-white" />
                </div>
                <span className="text-white font-sans font-bold text-sm mt-4">Video Testimonial</span>
                <span className="text-white/55 font-sans text-[10px] mt-1 tracking-wider">2:34 minutes</span>
              </motion.button>

              <div className="absolute bottom-8 left-0 right-0 text-center">
                <div className="text-white/45 font-sans text-[10px] uppercase tracking-[0.2em] relative inline-block">
                  Coming Soon — Real parent video testimonials
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15">
                <div className="h-full bg-white/40 w-[35%]" />
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:w-1/2 p-10 flex flex-col justify-center">
              <span className="bg-[#EAF1FF] text-[#1251AA] px-4 py-1.5 rounded-full font-sans text-xs font-bold inline-block w-fit mb-6">
                🎥 Video Story
              </span>
              <h3 className="font-display text-[#0A1F5E] text-3xl font-bold mb-6">
                Hear It Directly from Gurgaon Parents
              </h3>
              <p className="text-[#5A6B82] font-sans text-base leading-relaxed mb-8">
                We are collecting video testimonials from our enrolled families. Real faces. Real voices. Real results — coming soon to this page.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { initial: 'S', color: 'bg-[#1251AA]', text: 'Parent of Class 10 student · Recording in progress...' },
                  { initial: 'R', color: 'bg-[#22A05A]', text: 'Parent of Class 8 student · Recording in progress...' },
                  { initial: 'M', color: 'bg-[#F5A623]', text: 'Parent of Class 9 student · Recording in progress...' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${row.color} flex items-center justify-center text-white font-bold text-xs`}>
                        {row.initial}
                      </div>
                      <span className="text-[#5A6B82] font-sans text-sm">{row.text}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#F5A623] font-sans text-[10px] font-bold uppercase tracking-wider">
                      <div className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
                      Recording soon
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#FFF8EC] border border-[#F5A623]/30 rounded-[14px] p-5 flex flex-col gap-1">
                <p className="text-[#0A1F5E] font-sans text-sm font-bold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#F5A623]" />
                  Want to share your story? Email us at connect@mylearningplanet.in
                </p>
                <p className="text-[#5A6B82] font-sans text-[10px] ml-6">
                  We feature real parent stories every month.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: LIVE RATINGS STRIP */}
      <section className="py-20 bg-[#0A1F5E] relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-white/45 font-sans font-bold text-xs tracking-[0.3em] uppercase mb-4 block">
              Overall Ratings
            </span>
            <h2 className="font-display text-white text-3xl md:text-4xl font-bold">
              What Our Community Says
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
            {[
              { val: "4.9", label: "Overall Rating", stars: 5 },
              { val: "100%", label: "Would Recommend", progress: 100 },
              { val: "38%", label: "Avg Score Improvement", arrow: true },
              { val: "4.8", label: "Teaching Quality", stars: 5 },
              { val: "4.9", label: "Parent Dashboard", stars: 5 },
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center w-full md:w-auto relative">
                {i > 0 && <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/10" />}
                
                <span className="text-white font-display text-4xl md:text-5xl font-bold mb-4">
                  <CountUp end={item.val} suffix={item.val.includes('%') ? '%' : ''} />
                </span>
                
                {item.stars && (
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(item.stars)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                    ))}
                  </div>
                )}

                {item.progress && (
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-[#22A05A]"
                    />
                  </div>
                )}

                {item.arrow && (
                  <motion.div
                    initial={{ y: 5, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-[#F5A623] mb-4"
                  >
                    <TrendingUp className="w-5 h-5" />
                  </motion.div>
                )}

                <span className="text-white/55 font-sans text-xs font-medium tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 text-center">
            <p className="text-white/35 font-sans text-[10px]">
              Based on feedback from 200+ enrolled families in Gurgaon · Updated March 2025
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: SCROLLING MARQUEE */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="text-center mb-16">
          <span className="text-[#1251AA] font-sans font-bold text-sm tracking-[0.2em] uppercase mb-4 block">
            Quick Wins
          </span>
          <h2 className="font-display text-[#0A1F5E] text-4xl font-bold">
            What Parents Say — In Their Own Words
          </h2>
        </div>

        <div className="space-y-8">
          {/* Row 1: Scrolls Left */}
          <div className="flex overflow-hidden group">
            <div className="flex gap-8 animate-scroll-left group-hover:pause">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8">
                  <TestimonialChip initials="AS" color="bg-[#F5A623]" text="Best decision for my child's math education." stars={5} />
                  <TestimonialChip initials="RK" color="bg-[#1251AA]" text="Weekly reports are a game changer for parents." stars={5} />
                  <TestimonialChip initials="PM" color="bg-[#22A05A]" text="My son actually enjoys math now. Never thought possible." stars={5} />
                  <TestimonialChip initials="NV" color="bg-[#0A1F5E]" text="From 68 to 91 in pre-boards. Mitali is exceptional." stars={5} />
                  <TestimonialChip initials="SK" color="bg-[#F5A623]" text="The structure is what sets this apart from everything else." stars={5} />
                  <TestimonialChip initials="AM" color="bg-[#1251AA]" text="Both my kids enrolled. Consistency across classes is remarkable." stars={5} />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolls Right */}
          <div className="flex overflow-hidden group">
            <div className="flex gap-8 animate-scroll-right group-hover:pause">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8">
                  <TestimonialChip initials="PK" color="bg-[#22A05A]" text="Parent dashboard shows me everything I need every week." stars={5} />
                  <TestimonialChip initials="VR" color="bg-[#0A1F5E]" text="Score went from 72 to 94 in one term. Unbelievable." stars={5} />
                  <TestimonialChip initials="MG" color="bg-[#F5A623]" text="My daughter says this is the first coaching that makes sense." stars={5} />
                  <TestimonialChip initials="DM" color="bg-[#1251AA]" text="Weekly tests keep her consistent. No last minute studying." stars={5} />
                  <TestimonialChip initials="KA" color="bg-[#22A05A]" text="Whatsapped at 9pm — demo was booked by 9:15pm. Incredible." stars={5} />
                  <TestimonialChip initials="TS" color="bg-[#0A1F5E]" text="Recorded lectures mean she never misses a lesson." stars={5} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: SHARE YOUR STORY */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[760px] mx-auto bg-gradient-to-br from-[#EAF1FF] to-[#F0F5FF] rounded-[28px] border-2 border-[#1251AA] shadow-[0_16px_64px_rgba(18,81,170,0.14)] p-10 md:p-16 relative overflow-hidden"
          >
            <Quote className="absolute top-0 right-0 w-[200px] h-[200px] text-[#1251AA] opacity-[0.03] -translate-y-1/4 translate-x-1/4" />
            
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-8">
                <Star className="w-8 h-8 fill-[#F5A623] text-[#F5A623]" />
              </div>
              
              <span className="text-[#1251AA] font-sans font-bold text-xs tracking-[0.3em] uppercase mb-4 block">
                Share Your Story
              </span>
              
              <h2 className="font-display text-[#0A1F5E] text-3xl md:text-4xl font-bold mb-6">
                Are You a My Learning Planet Parent?
              </h2>
              
              <p className="text-[#5A6B82] font-sans text-lg mb-12 leading-relaxed">
                If your child has experienced growth, improvement, or a positive change through our platform — we would love to feature your story. Real stories inspire real families looking for the best maths tutor in Gurgaon.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://wa.me/919899389313?text=Hi, I would like to share my testimonial for My Learning Planet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#22A05A] text-white font-sans font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#22A05A]/20 hover:shadow-xl hover:shadow-[#22A05A]/30 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Share on WhatsApp
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="mailto:connect@mylearningplanet.in"
                  className="w-full sm:w-auto border-2 border-[#1251AA] text-[#1251AA] font-sans font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#1251AA] hover:text-white transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Email Your Story
                </motion.a>
              </div>

              <p className="text-[#5A6B82] font-sans text-sm">
                We feature a new parent story every month. All testimonials are voluntary and published with full consent.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: BOTTOM CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0A1F5E] to-[#1251AA] relative overflow-hidden">
        {/* Floating Symbols */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <span className="absolute top-10 left-[15%] text-4xl font-bold text-white">＋</span>
          <span className="absolute bottom-20 right-[20%] text-5xl font-bold text-white">×</span>
          <span className="absolute top-1/2 left-1/2 text-6xl font-bold text-white">√</span>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[#F5A623] text-[#F5A623]" />
            ))}
          </div>

          <h2 className="font-display text-white text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto leading-tight">
            Ready to Write Your Own Success Story?
          </h2>

          <p className="text-white/75 font-sans text-lg md:text-xl max-w-4xl mx-auto mb-12">
            Join 200+ students already experiencing the My Learning Planet difference — structured, consistent, and measurable learning for those looking for the best maths tutor in Gurgaon for Classes 6–10.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact"
                className="bg-[#F5A623] text-[#0A1F5E] font-sans font-bold px-10 py-5 rounded-full text-lg shadow-xl shadow-[#F5A623]/20 hover:shadow-2xl hover:shadow-[#F5A623]/30 transition-all flex items-center gap-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative z-10">✦ Book a Free Demo</span>
              </Link>
            </motion.div>

            <Link href="/pricing"
              className="text-white border-2 border-white/30 font-sans font-bold px-10 py-5 rounded-full text-lg hover:bg-white hover:text-[#0A1F5E] transition-all"
            >
              View Pricing →
            </Link>
          </div>

          <p className="text-white/40 font-sans text-sm mt-10">
            Free • No commitment • 45-minute live class
          </p>
        </div>
      </section>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 35s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
