'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  ClipboardCheck, 
  BarChart2, 
  CalendarCheck, 
  Smartphone, 
  CheckCircle,
  Sparkles,
  X
} from 'lucide-react';

// --- Components ---

const FloatingSymbol = ({ symbol, size, top, left, delay, duration, rotation, type }: any) => {
  const animationClass = type === 'rotate' ? 'animate-float-rotate' : type === 'drift' ? 'animate-float-drift' : 'animate-float-updown';
  return (
    <div 
      className={`absolute text-white pointer-events-none select-none opacity-5 md:opacity-10 ${animationClass}`}
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

const StatBox = ({ number, label, suffix = "" }: { number: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasStarted.current) {
        hasStarted.current = true;
        let start = 0;
        const end = number;
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [number]);

  return (
    <div ref={ref} className="bg-[#F8FAFF] border border-ice-blue rounded-[14px] p-4 text-center">
      <div className="text-primary font-display text-2xl md:text-3xl font-bold">
        {count}{suffix}
      </div>
      <div className="text-slate-gray font-sans text-[10px] uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
};

const AnimatedBar = ({ height, label, score, delay }: { height: string, label: string, score: string, delay: string, key?: React.Key }) => {
  const [currentHeight, setCurrentHeight] = useState("0%");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setCurrentHeight(height);
        }, parseInt(delay));
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [height, delay]);

  return (
    <div className="flex flex-col items-center flex-1 h-full justify-end group">
      <span className="text-navy font-bold text-[10px] mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{score}</span>
      <div 
        ref={ref}
        className="w-full bg-gradient-to-t from-primary to-[#4A90D9] rounded-t-lg transition-all duration-1000 ease-out"
        style={{ height: currentHeight }}
      ></div>
      <span className="text-slate-gray text-[10px] mt-2 font-medium">{label}</span>
    </div>
  );
};

export default function HomePage() {
  const heroSymbols = [
    { s: '＋', sz: '2rem', t: '10%', l: '5%', d: '0s', dur: '6s', r: '10deg', ty: 'updown' },
    { s: '－', sz: '1.5rem', t: '20%', l: '80%', d: '1s', dur: '7s', r: '-15deg', ty: 'rotate' },
    { s: '×', sz: '3rem', t: '70%', l: '10%', d: '2s', dur: '8s', r: '20deg', ty: 'drift' },
    { s: '÷', sz: '2.5rem', t: '80%', l: '85%', d: '0.5s', dur: '5s', r: '-10deg', ty: 'updown' },
    { s: '√', sz: '4rem', t: '15%', l: '45%', d: '1.5s', dur: '9s', r: '5deg', ty: 'rotate' },
    { s: 'π', sz: '2rem', t: '60%', l: '40%', d: '2.5s', dur: '6s', r: '12deg', ty: 'drift' },
    { s: '∑', sz: '3.5rem', t: '40%', l: '90%', d: '3s', dur: '10s', r: '-5deg', ty: 'updown' },
    { s: '²', sz: '2rem', t: '5%', l: '70%', d: '1.2s', dur: '7s', r: '0deg', ty: 'rotate' },
    { s: '∞', sz: '3rem', t: '50%', l: '5%', d: '2.2s', dur: '9s', r: '-20deg', ty: 'drift' },
    { s: 'θ', sz: '2.2rem', t: '10%', l: '30%', d: '2.8s', dur: '8s', r: '5deg', ty: 'updown' },
    { s: '≈', sz: '2.5rem', t: '85%', l: '20%', d: '1.5s', dur: '7s', r: '15deg', ty: 'rotate' },
    { s: '∫', sz: '3rem', t: '30%', l: '15%', d: '0.8s', dur: '11s', r: '-10deg', ty: 'drift' },
    { s: '≠', sz: '2rem', t: '45%', l: '60%', d: '1.8s', dur: '7s', r: '25deg', ty: 'updown' },
    { s: 'Δ', sz: '2.5rem', t: '15%', l: '90%', d: '3.5s', dur: '9s', r: '-10deg', ty: 'rotate' },
    { s: 'ω', sz: '1.8rem', t: '75%', l: '50%', d: '4s', dur: '6s', r: '5deg', ty: 'drift' },
    { s: '³', sz: '1.5rem', t: '55%', l: '25%', d: '2.5s', dur: '8s', r: '-5deg', ty: 'updown' },
    { s: '√', sz: '2.5rem', t: '90%', l: '70%', d: '1s', dur: '10s', r: '10deg', ty: 'rotate' },
    { s: 'π', sz: '3rem', t: '5%', l: '15%', d: '0s', dur: '12s', r: '-20deg', ty: 'drift' },
    { s: '∑', sz: '2rem', t: '35%', l: '75%', d: '2s', dur: '7s', r: '15deg', ty: 'updown' },
    { s: '∞', sz: '2.5rem', t: '65%', l: '10%', d: '3s', dur: '9s', r: '-10deg', ty: 'rotate' },
  ];

  return (
    <div className="overflow-x-hidden font-sans bg-white">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen bg-navy flex items-center overflow-hidden py-20">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          {/* Layer 1: Glow Orb */}
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[120px] pointer-events-none"></div>
          {/* Layer 2: Soft Glow */}
          <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
          {/* Layer 3: Grid Lines */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          {/* Layer 4: Floating Symbols */}
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
              type={sym.ty}
            />
          ))}
          {/* Layer 5: Decorative Circles */}
          <div className="absolute top-[-100px] right-[-100px] w-[700px] h-[700px] border border-white/5 rounded-full pointer-events-none animate-slow-rotate"></div>
          <div className="absolute bottom-[-50px] left-[-50px] w-[400px] h-[400px] border border-white/5 rounded-full pointer-events-none animate-slow-rotate-reverse"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-[55%] text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-medium mb-8 animate-fade-up animate-pulse-glow">
                <span>📍 Gurgaon, India · Classes 6–10</span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8 animate-fade-up" style={{ animationDelay: '150ms' }}>
                <span className="block font-normal">Gurgaon's Most</span>
                <span className="block font-bold relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/85">
                  Structured Math
                  <svg className="absolute -bottom-4 left-0 w-full h-4 text-gold animate-draw-line" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </span>
                <span className="block font-normal mt-2">Learning System</span>
                <span className="block text-3xl md:text-4xl text-white/75 font-sans font-medium mt-4">for Classes 6–10</span>
              </h1>

              <p className="text-white/70 text-lg md:text-xl font-medium tracking-wide mb-10 animate-fade-up" style={{ animationDelay: '300ms' }}>
               Built for Families Searching for Maths Tuition Near You in Gurgaon
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12 animate-fade-up" style={{ animationDelay: '450ms' }}>
                {["200+ Students Enrolled", "38% Avg Score Improvement", "4.9★ Parent Rating"].map((chip, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
                    <span className="text-white/75 text-[12px] font-bold uppercase tracking-wider">{chip}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-12 animate-fade-up" style={{ animationDelay: '600ms' }}>
                <Link href="/contact" 
                  className="group relative w-full sm:w-auto bg-gold text-navy font-bold px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(245,166,35,0.35)] hover:scale-105 transition-all overflow-hidden"
                >
                  <span className="relative z-10">✦ Book a Free Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                </Link>
                <Link href="/curriculum" 
                  className="w-full sm:w-auto bg-white/5 border border-white/30 text-white font-medium px-8 py-4 rounded-full backdrop-blur-md hover:bg-white/15 transition-all"
                >
                  Explore Curriculum →
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 animate-fade-up" style={{ animationDelay: '750ms' }}>
                <div className="flex -space-x-3">
                  {['AS', 'RK', 'PM', 'NV'].map((init, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full border-2 border-navy flex items-center justify-center text-[10px] font-bold text-white ${['bg-primary', 'bg-gold', 'bg-green', 'bg-slate-gray'][i]}`}>
                      {init}
                    </div>
                  ))}
                </div>
                <span className="text-white/60 text-sm font-medium">Joined by 200+ students in Gurgaon</span>
              </div>
            </div>

            {/* Right Content — Floating Dashboard */}
            <div className="w-full lg:w-[45%] relative h-[500px] md:h-[600px] hidden md:block">
              {/* Main Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white/5 border border-white/20 backdrop-blur-2xl rounded-[24px] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.3)] z-20 animate-float-updown">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-red-500/60 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-500/60 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-green/60 rounded-full"></div>
                  </div>
                  <span className="text-white font-bold text-xs tracking-wider">STUDENT PROGRESS</span>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="grid grid-cols-4 text-[10px] text-white/40 font-bold uppercase tracking-widest border-b border-white/10 pb-2">
                    <span>STUDENT</span>
                    <span>SUBJECT</span>
                    <span>SCORE</span>
                    <span>STATUS</span>
                  </div>
                  {[
                    { n: 'Arjun S.', i: 'A', c: 'bg-gold', s: '94/100', st: 'Excellent', stc: 'text-green bg-green/10' },
                    { n: 'Priya K.', i: 'P', c: 'bg-primary', s: '87/100', st: 'Good', stc: 'text-primary bg-primary/10' },
                    { n: 'Rohan M.', i: 'R', c: 'bg-navy', s: '79/100', st: 'Improving', stc: 'text-gold bg-gold/10' },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-4 items-center text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${row.c}`}>{row.i}</div>
                        <span className="text-white font-medium">{row.n}</span>
                      </div>
                      <span className="text-white/60">Maths</span>
                      <span className="text-white font-bold">{row.s}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold w-fit ${row.stc}`}>{row.st}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-green font-bold text-[10px]">+38% avg improvement</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-gold text-[10px]">★</span>)}
                    <span className="text-white/60 text-[10px] ml-1">4.9 rating</span>
                  </div>
                </div>
              </div>

              {/* Floating Card 1: Week Plan */}
              <div className="absolute top-10 left-0 w-[220px] bg-white/10 border border-white/20 backdrop-blur-xl rounded-[20px] p-5 shadow-2xl z-30 animate-float-updown-delayed rotate-[-4deg]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white font-bold text-xs">📅 THIS WEEK</span>
                </div>
                <div className="space-y-3 mb-4">
                  {[
                    { t: 'Quadratic Equations', d: 'Mon-Tue', c: 'bg-primary' },
                    { t: 'Graphing Functions', d: 'Wed-Thu', c: 'bg-gold' },
                    { t: 'Weekly Test', d: 'Friday', c: 'bg-green' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.c}`}></div>
                        <span className="text-white text-[10px] font-medium">{item.t}</span>
                      </div>
                      <span className="text-white/40 text-[8px]">{item.d}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-green/20 text-green px-2 py-1 rounded-full text-[8px] font-bold w-fit">
                  Week 14 of 48
                </div>
              </div>

              {/* Floating Card 2: Stat */}
              <div className="absolute bottom-10 right-0 w-[180px] bg-gold/15 border border-gold/30 backdrop-blur-xl rounded-[16px] p-5 shadow-2xl z-30 animate-float-updown-slow rotate-[3deg]">
                <TrendingUp className="text-gold w-5 h-5 mb-2" />
                <div className="text-white font-display text-3xl font-bold mb-1">+38%</div>
                <div className="text-white/60 text-[8px] leading-tight mb-2">Average score improvement</div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-gold text-[8px]">★</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee Strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 py-4 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                {["Weekly Roadmap", "Regular Testing", "Parent Dashboard", "Structured Curriculum", "Proven Results", "Classes 6–10", "Gurgaon", "NCERT Aligned"].map((text, j) => (
                  <span key={j} className="text-white/20 font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                    {text} <span className="ml-12">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — PROBLEM STATEMENT */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-16">
            {/* Left: Sticky Label */}
            <div className="md:w-[40%] relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <span className="font-display text-[12rem] font-bold text-primary whitespace-nowrap select-none">THE PROBLEM</span>
              </div>
              <div className="relative z-10">
                <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Why Parents Choose Us</span>
                <h2 className="font-display text-4xl md:text-6xl text-navy font-bold leading-tight">This is the reality of most maths tuition near you</h2>
              </div>
            </div>

            {/* Right: Content */}
            <div className="md:w-[60%] space-y-12">
              {[
                { t: "Your child's coaching has no fixed weekly plan", d: "Topics change randomly — no roadmap, no structure, no predictability." },
                { t: "You have no idea what was taught last week", d: "Parent visibility is zero. You only find out at exam time." },
                { t: "Tests happen randomly — or not at all", d: "No consistent assessment means no reliable progress tracking." },
                { t: "Quality depends entirely on which teacher they got", d: "Inconsistency in teaching leads to inconsistency in results." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group animate-fade-in-left" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="w-10 h-10 bg-[#FFF0F0] rounded-full flex items-center justify-center shrink-0">
                    <X className="text-[#E53935] w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-navy font-bold text-xl mb-2">{item.t}</h3>
                    <p className="text-slate-gray italic text-base">{item.d}</p>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-navy to-primary rounded-[20px] p-8 flex items-center justify-between group cursor-pointer hover:shadow-xl transition-all">
                <h3 className="font-display text-white italic text-2xl">My Learning Planet fixes all four.</h3>
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy group-hover:translate-x-2 transition-transform">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE SOLUTION — 3 PILLARS */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-white/45 font-bold text-sm tracking-[0.2em] uppercase mb-4 block">The Solution</span>
            <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-6">Built on 3 Unbreakable Pillars</h2>
            <p className="text-white/65 text-lg max-w-2xl mx-auto">A modern, structured alternative to traditional mathematics tuition near me.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                n: '01', 
                i: BookOpen, 
                t: 'Academic System', 
                s: 'Predictable. Planned. Purposeful.', 
                d: 'Pre-defined yearly curriculum broken into weekly modules. Every student knows exactly what they are learning — this week, next week, all year.',
                f: ['Weekly Modules', 'Daily Lessons', 'Class 6–10']
              },
              { 
                n: '02', 
                i: ClipboardCheck, 
                t: 'Assessment System', 
                s: 'Test. Diagnose. Improve.', 
                d: 'Weekly tests, monthly evaluations and concept-level diagnostics. We catch gaps early — before they become problems.',
                f: ['Weekly Tests', 'Monthly Evals', 'Diagnostics'],
                featured: true
              },
              { 
                n: '03', 
                i: BarChart2, 
                t: 'Tracking System', 
                s: 'Visible. Real-time. Reliable.', 
                d: 'Parents get a real-time mobile dashboard — attendance, scores, improvement trends, teacher feedback. Full visibility. Always.',
                f: ['Parent Dashboard', 'Weekly Reports', 'Live Data']
              }
            ].map((pillar, i) => (
              <div 
                key={i} 
                className={`relative bg-white/5 border border-white/15 backdrop-blur-xl rounded-[28px] p-10 hover:bg-white/10 hover:border-white/25 hover:-translate-y-2 transition-all duration-400 group overflow-hidden ${pillar.featured ? 'shadow-[0_0_40px_rgba(18,81,170,0.3)]' : 'shadow-2xl'}`}
              >
                <div className="absolute top-0 left-10 w-12 h-1 bg-gold rounded-b-full"></div>
                <div className="absolute bottom-4 right-8 font-display text-8xl text-white/5 font-bold pointer-events-none select-none group-hover:scale-110 transition-transform">{pillar.n}</div>
                
                <div className="w-16 h-16 bg-white/10 border border-white/15 rounded-full flex items-center justify-center mb-8">
                  <pillar.i className="text-white w-7 h-7" />
                </div>

                <h3 className="font-display text-2xl text-white font-bold mb-2">{pillar.t}</h3>
                <p className="text-gold font-bold text-base uppercase tracking-wider mb-6">{pillar.s}</p>
                <p className="text-white/70 text-lg leading-relaxed mb-8">{pillar.d}</p>

                <div className="flex flex-wrap gap-2">
                  {pillar.f.map((tag, j) => (
                    <span key={j} className="bg-white/10 border border-white/15 px-3 py-1 rounded-full text-white/80 text-[12px] font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-40 md:mb-40">
            <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">The Process</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold">How It Works — Start to Results</h2>
          </div>

          <div className="relative max-w-6xl mx-auto pt-34 pb-44">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-ice-blue -translate-y-1/2 hidden md:block">
              <div className="h-full bg-primary transition-all duration-1000 ease-out animate-grow-width"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-0 relative">
              {[
                { i: CalendarCheck, t: 'Enroll and Assess', d: 'Quick diagnostic to place your child in the right batch.', pos: 'top' },
                { i: BookOpen, t: 'Weekly Curriculum Begins', d: 'Structured lessons — every week planned and purposeful.', pos: 'bottom' },
                { i: ClipboardCheck, t: 'Regular Testing', d: 'Weekly tests catch gaps before they become problems.', pos: 'top' },
                { i: Smartphone, t: 'Parent Reports', d: 'Weekly progress reports sent to your phone automatically.', pos: 'bottom' },
                { i: TrendingUp, t: 'Measurable Results', d: 'Real score improvement — tracked and visible every month.', pos: 'top' },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center relative">
                  {/* Step Dot */}
                  <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white font-display font-bold text-lg z-10 shadow-[0_0_0_8px_rgba(18,81,170,0.12)] mb-8 md:mb-0 md:absolute md:top-1/2 md:-translate-y-1/2 animate-bounce-in" style={{ animationDelay: `${i * 200}ms` }}>
                    {i + 1}
                  </div>

                  {/* Card */}
                  <div className={`bg-white border border-ice-blue rounded-[20px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-[240px] text-center md:absolute ${step.pos === 'top' ? 'md:bottom-[calc(50%+40px)]' : 'md:top-[calc(50%+40px)]'}`}>
                    <div className="w-11 h-11 bg-ice-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.i className="text-primary w-6 h-6" />
                    </div>
                    <h4 className="text-navy font-bold text-base mb-2">{step.t}</h4>
                    <p className="text-slate-gray text-base leading-relaxed">{step.d}</p>
                    {/* Connector */}
                    <div className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 bg-primary h-10 ${step.pos === 'top' ? 'top-full' : 'bottom-full'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-20 md:mt-40">
            <div className="bg-gradient-to-br from-[#FFF8EC] to-[#FFF3DC] border-2 border-gold rounded-[16px] px-8 py-4 shadow-[0_4px_20px_rgba(245,166,35,0.15)]">
              <p className="text-navy font-bold text-sm md:text-base">📈 Average student sees +38% score improvement within one term</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — SOCIAL PROOF — RESULTS */}
      <section className="py-24 bg-gradient-to-b from-ice-blue/30 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Real Results</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold">Numbers That Speak for Themselves</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left Column: Stats Visual */}
            <div className="lg:w-1/2 space-y-8">
              <div className="bg-white border border-ice-blue rounded-[24px] p-8 shadow-[0_8px_40px_rgba(18,81,170,0.1)]">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h4 className="text-navy font-bold text-lg">Test Score Progression</h4>
                    <p className="text-slate-gray text-base">Class 9 student — 6 month journey</p>
                  </div>
                  <div className="flex items-center gap-2 text-green font-bold text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-green font-bold text-base">+38% avg improvement</span>
                  </div>
                </div>

                <div className="h-[200px] flex items-end gap-4 mb-4">
                  {[
                    { h: '35%', s: '35' },
                    { h: '48%', s: '48' },
                    { h: '58%', s: '58' },
                    { h: '70%', s: '70' },
                    { h: '82%', s: '82' },
                    { h: '94%', s: '94' },
                  ].map((bar, i) => (
                    <AnimatedBar key={i} height={bar.h} label={`M${i+1}`} score={bar.s} delay={`${i * 100}`} />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatBox number={200} label="Students" suffix="+" />
                <StatBox number={4.9} label="Rating" suffix="★" />
                <StatBox number={38} label="Improvement" suffix="%" />
                <StatBox number={100} label="Structured" suffix="%" />
              </div>
            </div>

            {/* Right Column: Testimonials */}
            <div className="lg:w-1/2 relative">
              <div className="space-y-8">
                {/* Testimonial 1 */}
                <div className="bg-white border border-ice-blue border-l-4 border-l-gold rounded-[24px] p-8 shadow-[0_8px_40px_rgba(18,81,170,0.12)] relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-gold text-sm">★</span>)}
                  </div>
                  <p className="text-charcoal font-display italic text-lg leading-relaxed mb-6">
                    My son's scores went from 69 to 95 in just 4 months. We had tried multiple options while searching for mathematics tuition near me, but the structured system at My Learning Planet made all the difference. I wish we had found this earlier.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">AS</div>
                      <div>
                        <h5 className="text-navy font-bold text-sm">Aditi Sharma</h5>
                        <p className="text-slate-gray text-xs">Parent, Class 9 · Gurgaon</p>
                      </div>
                    </div>
                    <span className="bg-ice-blue text-[#5A6B82] px-3 py-1 rounded-full text-[8px] font-bold">October 2024</span>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="bg-white border border-ice-blue border-l-4 border-l-green rounded-[24px] p-8 shadow-[0_8px_40px_rgba(18,81,170,0.12)]">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-gold text-sm">★</span>)}
                  </div>
                  <p className="text-charcoal font-display italic text-lg leading-relaxed mb-6">
                    "The parent dashboard is incredible. Every Monday I get a full report — what was taught, how she scored, what needs work. While searching for maths tuition near me, we never found this level of transparency. No other coaching gives this."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-green rounded-full flex items-center justify-center text-white font-bold text-sm">PK</div>
                      <div>
                        <h5 className="text-navy font-bold text-sm">Priya Kapoor</h5>
                        <p className="text-slate-gray text-xs">Parent, Class 7 · Gurgaon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Chip */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-ice-blue rounded-full px-5 py-2 shadow-[0_8px_24px_rgba(18,81,170,0.12)] z-20 flex items-center gap-2">
                <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
                <span className="text-green font-bold text-xs">Currently accepting new students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CLASS OVERVIEW STRIP */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-white/45 font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Curriculum Overview</span>
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold">Structured for Every Class</h2>
              <p className="text-white/70 text-lg leading-relaxed mt-6 max-w-4xl mx-auto">
              From Class 6 to Class 10 — structured, trackable, and the only mathematics tutoring near you that maps every week in advance.
              </p>

 
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-6 pb-8 md:pb-0 snap-x">
            {[
              { c: '6', s: 'Foundation', t: ['Number System', 'Geometry', 'Algebra'] },
              { c: '7', s: 'Builder', t: ['Integers', 'Fractions', 'Data Handling'] },
              { c: '8', s: 'Developer', t: ['Rational Nos', 'Linear Eq', 'Mensuration'] },
              { c: '9', s: 'Thinker', t: ['Polynomials', 'Triangles', 'Statistics'] },
              { c: '10', s: 'Board Ready', t: ['Trigonometry', 'Real Nos', 'Probability'] },
            ].map((cls, i) => (
              <div 
                key={i} 
                className="min-w-[240px] md:min-w-0 snap-center bg-white/5 border border-white/15 backdrop-blur-md rounded-[20px] p-8 text-center hover:bg-white/10 hover:border-white/25 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="text-white font-display text-6xl font-bold mb-2">{cls.c}</div>
                <div className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Class</div>
                <div className="w-8 h-0.5 bg-gold mx-auto mb-4"></div>
                <div className="text-white font-bold text-lg mb-6">{cls.s}</div>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {cls.t.map((topic, j) => (
                    <span key={j} className="bg-white/10 text-white/80 text-[12px] px-2 py-1 rounded-full">{topic}</span>
                  ))}
                </div>
                <Link href="/curriculum" className="text-white/60 text-base font-medium group-hover:text-gold transition-colors">View Curriculum →</Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/curriculum" className="border border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-navy transition-all">
              Explore full curriculum →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 — TRUST WALL */}
      <section className="py-24 bg-gradient-to-br from-primary to-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 z-0 opacity-5">
          {heroSymbols.slice(0, 5).map((sym, i) => (
            <FloatingSymbol key={i} symbol={sym.s} size={sym.sz} top={sym.t} left={sym.l} delay={sym.d} duration={sym.dur} rotation={sym.r} type={sym.ty} />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* Left: Content */}
            <div className="lg:w-1/2 space-y-8">
              <div>
                <span className="text-white/45 font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Why Parents Trust Us</span>
                <h2 className="font-display text-4xl md:text-6xl text-white font-bold leading-tight">The Difference is the System</h2>
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
                Most coaching centers rely on a good teacher. We built a system that works regardless — structured curriculum, consistent testing, transparent tracking. When parents search for mathematics tutoring near me, this is the system they deserve to find.
              </p>
              <div className="space-y-4">
                {[
                  "Pre-defined weekly curriculum — no randomness",
                  "Weekly tests + monthly milestone evaluations",
                  "Real-time parent dashboard — always visible",
                  "Recorded classes — nothing ever missed",
                  "38% average improvement in one term"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle className="text-green w-5 h-5" />
                    <span className="text-white font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <Link href="/how-it-works" className="inline-block bg-gold text-navy font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform">
                ✦ See How It Works →
              </Link>
            </div>

            {/* Right: Comparison Table */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-white/5 border border-white/15 backdrop-blur-xl rounded-[24px] overflow-hidden shadow-2xl">
                <div className="bg-white/10 px-6 py-4 grid grid-cols-3 text-sm font-bold uppercase tracking-widest text-white/50">
                  <span>FEATURE</span>
                  <span className="text-gold">US ✦</span>
                  <span>OTHERS</span>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    { f: 'Fixed weekly curriculum', u: true, o: false },
                    { f: 'Parent progress tracking', u: true, o: false },
                    { f: 'Regular structured tests', u: true, o: '⚠️' },
                    { f: 'Recorded class backups', u: true, o: false },
                    { f: 'Score improvement tracking', u: true, o: false },
                  ].map((row, i) => (
                    <div key={i} className={`px-6 py-4 grid grid-cols-3 items-center text-base ${i % 2 === 0 ? 'bg-white/5' : ''}`}>
                      <span className="text-white/80">{row.f}</span>
                      <span className="text-green font-bold">✅</span>
                      <span className="text-red-500 font-bold">{row.o === '⚠️' ? '⚠️' : '❌'}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/40 px-6 py-4 grid grid-cols-3 items-center text-base">
                  <span className="text-white font-bold">Overall</span>
                  <span className="text-gold font-bold">System-driven</span>
                  <span className="text-red-400 font-medium">Teacher-dependent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-6 block">Ready to Start?</span>
          <h2 className="font-display text-5xl md:text-7xl text-navy font-bold mb-8 leading-tight">
            Your child deserves <br />
            <span className="relative inline-block text-primary">
              a roadmap.
              <svg className="absolute -bottom-4 left-0 w-full h-4 text-gold" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
          </h2>
          <p className="text-slate-gray text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Join 200+ students in Gurgaon who chose a better alternative to traditional maths tuition near me, now learning with structure, clarity, and measurable results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link href="/contact" 
              className="group relative w-full sm:w-auto bg-gradient-to-r from-primary to-navy text-white font-bold px-10 py-5 rounded-full shadow-[0_12px_40px_rgba(18,81,170,0.3)] hover:scale-105 transition-all overflow-hidden"
            >
              <span className="relative z-10">✦ Book a Free Demo Class</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </Link>
            <Link href="/pricing" 
              className="w-full sm:w-auto bg-white border-2 border-primary text-primary font-bold px-10 py-5 rounded-full hover:bg-ice-blue transition-all"
            >
              View Pricing →
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {["✓ Free · No payment today", "✓ 45-minute live demo", "✓ Cancel anytime"].map((chip, i) => (
              <div key={i} className="bg-[#F8FAFF] border border-ice-blue rounded-full px-4 py-1.5 text-navy text-base font-bold">
                {chip}
              </div>
            ))}
          </div>
        </div>

        {/* Watermark Text */}
        <div className="absolute bottom-[-50px] left-0 right-0 text-center pointer-events-none select-none opacity-[0.05] animate-fade-in-slow">
          <span className="font-display text-[10rem] md:text-[15rem] font-bold text-primary whitespace-nowrap">My Learning Planet</span>
        </div>
      </section>

      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes float-updown {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }
        .animate-float-updown {
          animation: float-updown 6s ease-in-out infinite;
        }
        @keyframes float-updown-delayed {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-15px) rotate(-4deg); }
        }
        .animate-float-updown-delayed {
          animation: float-updown-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        @keyframes float-updown-slow {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        .animate-float-updown-slow {
          animation: float-updown-slow 7s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, 0deg)); }
          50% { transform: translateY(-10px) rotate(calc(var(--tw-rotate, 0deg) + 10deg)); }
        }
        .animate-float-rotate {
          animation: float-rotate infinite ease-in-out;
        }
        @keyframes float-drift {
          0%, 100% { transform: translate(0, 0) rotate(var(--tw-rotate, 0deg)); }
          50% { transform: translate(15px, -10px) rotate(var(--tw-rotate, 0deg)); }
        }
        .animate-float-drift {
          animation: float-drift infinite ease-in-out;
        }
        @keyframes float-updown-simple {
          0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, 0deg)); }
          50% { transform: translateY(-15px) rotate(var(--tw-rotate, 0deg)); }
        }
        .animate-float-updown {
          animation: float-updown-simple infinite ease-in-out;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes draw-line {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .animate-draw-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
        @keyframes slow-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-rotate {
          animation: slow-rotate 60s linear infinite;
        }
        @keyframes slow-rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-slow-rotate-reverse {
          animation: slow-rotate-reverse 60s linear infinite;
        }
        @keyframes grow-width {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-grow-width {
          animation: grow-width 1.5s ease-out forwards;
        }
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }
        @keyframes fade-in-slow {
          from { opacity: 0; }
          to { opacity: 0.05; }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 2s ease-out forwards;
        }
        .animate-pulse-glow {
          box-shadow: 0 0 20px rgba(18, 81, 170, 0.2);
          animation: pulse-glow 3s infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(18, 81, 170, 0.2); }
          50% { box-shadow: 0 0 40px rgba(18, 81, 170, 0.4); }
        }
      `}</style>
    </div>
  );
}
