'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronDown,
  Layout,
  Eye,
  RefreshCw,
  TrendingUp,
  GraduationCap,
  Star,
  MapPin,
  Smartphone,
  Rocket,
  Sprout,
  Sparkles,
  XCircle
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

const Counter = ({ end, label, suffix = "", duration = 2000 }: { end: number | string, label: string, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasStarted.current) {
        hasStarted.current = true;
        let start = 0;
        const endVal = typeof end === 'string' ? parseFloat(end) : end;
        const increment = endVal / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= endVal) {
            setCount(endVal);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.5 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={countRef} className="flex flex-col items-center">
      <div className="text-white font-display text-4xl md:text-5xl font-bold">
        {count}{suffix}
      </div>
      <div className="text-white/65 font-sans text-sm mt-1">{label}</div>
    </div>
  );
};

const TimelineItem = ({ year, title, desc, icon: Icon, color, side, quote, stat }: any) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative flex items-center justify-between mb-16 w-full group ${side === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'
        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`}
    >
      {/* Center Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-4 rounded-full z-10 shadow-[0_0_0_6px_rgba(18,81,170,0.10)] group-hover:scale-125 transition-transform" style={{ borderColor: color }}></div>

      {/* Content Card */}
      <div className={`w-full md:w-[45%] bg-white rounded-[24px] p-8 shadow-[0_8px_32px_rgba(18,81,170,0.10)] border border-ice-blue hover:shadow-xl transition-all duration-300`}>
        <div className="inline-block px-4 py-1 rounded-full text-white font-bold text-sm mb-4" style={{ backgroundColor: color }}>
          {year}
        </div>
        <div className="text-3xl mb-4">
          <Icon className="w-10 h-10" style={{ color: color }} />
        </div>
        <h3 className="font-display text-2xl text-navy font-bold mb-3">{title}</h3>
        <p className="text-slate-gray text-base leading-relaxed mb-4">{desc}</p>

        {stat && (
          <div className="inline-block bg-ice-blue text-primary px-3 py-1 rounded-full text-sm font-bold mb-2">
            {stat}
          </div>
        )}

        {quote && (
          <p className="text-gold font-display italic text-base mt-4">
            "{quote}"
          </p>
        )}
      </div>

      {/* Spacer for desktop */}
      <div className="hidden md:block w-[45%]"></div>
    </div>
  );
};

export default function AboutUsPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(Math.max((windowHeight - rect.top) / rect.height, 0), 1);
      setLineHeight(scrollProgress * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
  ];

  return (
    <div className="overflow-x-hidden font-sans bg-white">
      {/* SECTION 1 — CINEMATIC HERO */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-navy to-primary flex flex-col items-center justify-center overflow-hidden py-20">
        {/* Layer 1: Symbols */}
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

        {/* Layer 2: Geometric Shapes */}
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] border-2 border-white/5 rounded-full pointer-events-none animate-slow-rotate z-1"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] border-2 border-white/5 rounded-full pointer-events-none animate-slow-rotate-reverse z-1"></div>

        {/* Layer 3: Content */}
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <nav className="flex items-center gap-2 text-white/45 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>→</span>
            <span className="text-white">About Us</span>
          </nav>

          <div className="bg-white/10 border border-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-bold mb-8 animate-fade-in">
            ✦ Our Story, Our Mission, Our People
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
            <span className="block font-normal">Didn't Build Just Another Platform</span>
            <span className="block font-bold italic relative inline-block mt-2">
              We Built the Best Maths Tutor in Gurgaon
              <svg className="absolute -bottom-4 left-0 w-full h-4 text-gold" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            We built a system. A structure. A promise — the kind of clarity and support you'd only expect from the best maths tuition in Gurgaon, so every student always knows what comes next.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-[16px] p-6 flex flex-col items-center min-w-[160px] hover:bg-white/15 transition-colors">
              <Counter end={200} label="Students Taught" suffix="+" />
            </div>
            <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-[16px] p-6 flex flex-col items-center min-w-[160px] hover:bg-white/15 transition-colors">
              <Counter end={38} label="Avg Score Improvement" suffix="%" />
            </div>
            <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-[16px] p-6 flex flex-col items-center min-w-[160px] hover:bg-white/15 transition-colors">
              <Counter end={4.9} label="Parent Rating" suffix="★" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 text-white/50 animate-bounce">
            <ChevronDown className="w-6 h-6" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM WE NOTICED */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12">
          {/* Sticky Label */}
          <div className="md:w-20 relative">
            <div className="md:sticky md:top-32 flex justify-center">
              <h2 className="md:rotate-90 md:whitespace-nowrap text-primary font-bold text-sm tracking-[0.5em] uppercase origin-center">
                The Problem
              </h2>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-12">
              <span className="bg-ice-blue text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                Why We Exist
              </span>
              <h2 className="font-display text-4xl md:text-6xl text-navy font-bold leading-tight max-w-4xl">
                The Way Maths Is Taught Was Broken. We Saw It.
                <br />We Rebuilt It with the Best Maths Coaching in Gurgaon.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {[
                { title: "No Fixed Roadmap", desc: "Topics taught randomly — students never knew what was coming next or whether they were on track.", icon: "?", color: "red" },
                { title: "Zero Parent Visibility", desc: "Parents had absolutely no way to track their child's progress between exams. Weeks of silence.", icon: "👁", color: "red" },
                { title: "Inconsistent Testing", desc: "Tests happened randomly — or not at all. No reliable way to measure if a student was actually improving.", icon: "≠", color: "red" },
                { title: "Teacher-Dependent Quality", desc: "If you got a good teacher, great. If not, too bad. Quality varied wildly from batch to batch.", icon: "?", color: "red" }
              ].map((prob, i) => (
                <div key={i} className="bg-gradient-to-br from-[#FFF5F5] to-white border border-[#FFE0E0] border-l-4 border-l-[#E53935] rounded-[20px] p-8 relative overflow-hidden group hover:shadow-lg transition-all">
                  <div className="w-10 h-10 bg-[#FFF0F0] text-[#E53935] rounded-full flex items-center justify-center mb-6">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-navy font-bold text-xl mb-3">{prob.title}</h3>
                  <p className="text-slate-gray text-base leading-relaxed relative z-10">{prob.desc}</p>
                  <div className="absolute right-4 bottom-4 text-8xl font-bold text-[#FFE0E0]/30 pointer-events-none select-none group-hover:scale-110 transition-transform">
                    {prob.icon}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-navy to-primary rounded-[20px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 group cursor-pointer">
              <h3 className="font-display text-white italic text-2xl md:text-3xl">So we built the solution.</h3>
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy group-hover:translate-x-2 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR STORY TIMELINE */}
      <section className="py-24 bg-gradient-to-b from-ice-blue/30 to-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Our Journey</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold">From One Classroom to a Movement</h2>
          </div>

          <div ref={timelineRef} className="relative max-w-5xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-ice-blue z-0">
              <div
                className="w-full bg-gradient-to-b from-primary via-gold to-green transition-all duration-300"
                style={{ height: `${lineHeight}%` }}
              ></div>
            </div>

            <div className="space-y-4">
              <TimelineItem
                year="2022"
                title="The Idea Is Born"
                desc="Mitali noticed a pattern — bright students failing not because of lack of ability, but because coaching had no structure. She started designing a proper weekly system during her own free time."
                icon={Sprout}
                color="#1251AA"
                side="left"
                quote="What if every student always knew what comes next?"
              />
              <TimelineItem
                year="2023"
                title="First Batch. First Proof."
                desc="Mitali launched a small pilot batch of 12 students in Gurgaon with her structured approach. By the end of the term, the average score improvement was 34%. Parents searching for the best maths tutor in Gurgaon didn't have to search anymore — word spread on its own."
                icon={GraduationCap}
                color="#F5A623"
                side="right"
                stat="+34% improvement — first batch ever"
              />
              <TimelineItem
                year="2024"
                title="The Platform Goes Digital"
                desc="With 50+ students and growing demand, My Learning Planet launched its student app and parent dashboard — bringing structured maths coaching in Gurgaon into the digital age. For the first time, parents could track their child's progress in real time, right from their phone."
                icon={Smartphone}
                color="#22A05A"
                side="left"
                stat="50+ students. 2 apps launched."
              />
              <TimelineItem
                year="2025 →"
                title="My Learning Planet — Official Launch"
                desc="The full platform launched publicly — offering a complete curriculum for Classes 6–10, structured testing, and parent tracking. Today, maths coaching in Gurgaon has a new standard, with 200+ students across the city, and the journey is just beginning."
                icon={Rocket}
                color="#0A1F5E"
                side="right"
                stat="200+ students. Growing every month."
                quote="This is only the beginning."
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — MEET MITALI */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-[-200px] right-[-200px] w-[900px] h-[800px] border border-white/5 rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 z-0 opacity-5">
          <FloatingSymbol symbol="＋" size="3rem" top="10%" left="10%" delay="0s" duration="8s" rotation="0deg" />
          <FloatingSymbol symbol="×" size="2rem" top="80%" left="20%" delay="2s" duration="10s" rotation="20deg" />
          <FloatingSymbol symbol="√" size="4rem" top="40%" left="85%" delay="1s" duration="9s" rotation="-10deg" />
          <FloatingSymbol symbol="π" size="2.5rem" top="70%" left="70%" delay="3s" duration="7s" rotation="15deg" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-white/50 font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Meet Your Educator</span>
          </div>

          <div className="max-w-[900px] mx-auto bg-white/5 border border-white/15 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.30)] animate-reveal">
            {/* Card Top Strip */}
            <div className="bg-gradient-to-r from-primary to-navy px-10 py-4 flex justify-between items-center">
              <span className="text-white font-bold text-lg">My Learning Planet — Lead Educator</span>
              <span className="bg-gold text-navy px-3 py-1 rounded-full text-[14px] font-bold uppercase tracking-widest">🏆 Founder</span>
            </div>

            <div className="p-10 md:p-12">
              <div className="flex flex-col md:flex-row gap-12">
                {/* Left Column */}
                <div className="md:w-[35%] space-y-6">
                  <div className="relative group">
                    <img
                      src="/mitali-mehrotra.jpg"
                      alt="Mitali - Founder"
                      className="w-full object-cover rounded-[20px] border-4 border-white/15 shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-primary/20 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-[10px] p-3 flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-white" />
                      <span className="text-white text-lg font-medium">B.Ed Mathematics</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[10px] p-3 flex items-center gap-3">
                      <Star className="w-5 h-5 text-gold" />
                      <span className="text-white text-lg font-medium">8+ Years Experience</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[10px] p-3 flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gold" />
                      <span className="text-white text-lg font-medium">Based in Gurgaon</span>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="md:w-[65%] flex flex-col">
                  <div className="mb-8">
                    <h2 className="font-display text-5xl md:text-7xl text-white font-bold relative inline-block">
                      Mitali
                      <svg className="absolute -bottom-2 left-0 w-full h-2 text-gold" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                      </svg>
                    </h2>
                    <p className="text-white/65 text-lg font-medium mt-4">Founder and Lead Educator — My Learning Planet</p>
                  </div>

                  <div className="space-y-6 text-white/80 leading-relaxed mb-10 text-base">
                    <p>Mitali has spent over 8 years watching bright students struggle — not because math is hard, but because nobody gave them a clear path forward. That observation became an obsession. That obsession became My Learning Planet.</p>
                    <p>Her teaching philosophy is built on one belief: structure removes fear. When a student knows exactly what they are learning this week, how they will be tested, and where they stand — they stop dreading math and start mastering it.</p>
                    <p>Every curriculum module, every test, every note in the student app — Mitali designed it herself. This is not a franchise. It is a personal promise.</p>
                  </div>

                  <div className="bg-gold/10 border-l-4 border-gold rounded-r-[12px] p-6 relative">
                    <div className="text-gold text-5xl font-display absolute top-2 left-4 opacity-30">“</div>
                    <p className="text-white italic font-display text-xl relative z-10 pl-6">
                      Math is not hard. Unclear teaching is. Give every student a roadmap — and watch them find their own way.
                    </p>
                    <p className="text-white/55 text-xs mt-4 pl-6">— Mitali, Founder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Bottom Strip */}
            <div className="bg-white/5 border-t border-white/10 px-10 py-6 flex flex-wrap gap-8 justify-center md:justify-start">
              <div className="flex flex-col">
                <span className="text-white font-display text-2xl font-bold">8+</span>
                <span className="text-white/55 text-[12px] uppercase tracking-widest">Years Teaching</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block"></div>
              <div className="flex flex-col">
                <span className="text-white font-display text-2xl font-bold">200+</span>
                <span className="text-white/55 text-[12px] uppercase tracking-widest">Students Mentored</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block"></div>
              <div className="flex flex-col">
                <span className="text-white font-display text-2xl font-bold">38%</span>
                <span className="text-white/55 text-[12px] uppercase tracking-widest">Avg Score Improvement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — OUR VALUES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">What We Stand For</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold mb-4">The Principles That Drive Everything</h2>
            <p className="text-slate-gray max-w-2xl text-lg mx-auto">Every decision we make — curriculum, testing, tracking — comes back to these four beliefs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Value 1 */}
            <div className="bg-gradient-to-br from-ice-blue to-[#F0F5FF] rounded-[24px] border border-ice-blue p-10 relative group hover:-translate-y-2 transition-all shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Layout className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-3xl text-navy font-bold mb-4">Structure First</h3>
              <p className="text-slate-gray leading-relaxed mb-6">Every lesson planned. Every week mapped. No randomness — ever. Students thrive when they know what to expect.</p>
              <p className="text-primary italic font-bold text-sm">✦ Predictability is our product</p>
              <div className="absolute bottom-4 right-8 font-display text-8xl text-primary/5 font-bold pointer-events-none select-none">01</div>
            </div>

            {/* Value 2 */}
            <div className="bg-gradient-to-br from-[#FFF8EC] to-[#FFF3DC] rounded-[24px] border border-gold/20 p-10 relative group hover:-translate-y-2 transition-all shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-display text-3xl text-navy font-bold mb-4">Parent Transparency</h3>
              <p className="text-slate-gray leading-relaxed mb-6">Parents are never left guessing. Real-time dashboard, weekly reports, teacher feedback — full visibility always.</p>
              <p className="text-gold italic font-bold text-sm">✦ No surprises. Ever.</p>
              <div className="absolute bottom-4 right-8 font-display text-8xl text-gold/5 font-bold pointer-events-none select-none">02</div>
            </div>

            {/* Value 3 */}
            <div className="bg-gradient-to-br from-[#EDFBF3] to-[#F0FFF4] rounded-[24px] border border-green/20 p-10 relative group hover:-translate-y-2 transition-all shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 bg-green/10 rounded-full flex items-center justify-center mb-6">
                <RefreshCw className="w-8 h-8 text-green" />
              </div>
              <h3 className="font-display text-3xl text-navy font-bold mb-4">Consistency Engine</h3>
              <p className="text-slate-gray leading-relaxed mb-6">Same quality. Same methodology. Every batch. Every class. Every week. Consistency is what builds trust over time.</p>
              <p className="text-green italic font-bold text-sm">✦ Same great system — always</p>
              <div className="absolute bottom-4 right-8 font-display text-8xl text-green/5 font-bold pointer-events-none select-none">03</div>
            </div>

            {/* Value 4 */}
            <div className="bg-gradient-to-br from-ice-blue to-[#E8EFFF] rounded-[24px] border border-ice-blue p-10 relative group hover:-translate-y-2 transition-all shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 bg-navy/10 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-navy" />
              </div>
              <h3 className="font-display text-3xl text-navy font-bold mb-4">Measurable Growth</h3>
              <p className="text-slate-gray leading-relaxed mb-6">We track everything — scores, attendance, improvement trends. Not just effort. Real, visible, measurable results.</p>
              <p className="text-navy italic font-bold text-sm">✦ Numbers never lie</p>
              <div className="absolute bottom-4 right-8 font-display text-8xl text-navy/5 font-bold pointer-events-none select-none">04</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — STATS WALL */}
      <section className="py-24 bg-gradient-to-br from-primary to-navy relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-[700px] h-[700px] border border-white/5 rounded-full"></div>
        </div>
        <div className="absolute inset-0 z-0 opacity-5">
          <FloatingSymbol symbol="∑" size="4rem" top="20%" left="10%" delay="0s" duration="10s" rotation="0deg" />
          <FloatingSymbol symbol="∞" size="3rem" top="70%" left="80%" delay="2s" duration="12s" rotation="15deg" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-white/45 font-bold text-sm tracking-[0.3em] uppercase mb-6 block">By The Numbers</span>
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-16">Real Impact. Real Numbers.</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto mb-20">
            <div className="flex flex-col items-center">
              <Counter end={200} label="Students Taught" suffix="+" />
              <div className="w-10 h-0.5 bg-gold mt-4 rounded-full"></div>
            </div>
            <div className="flex flex-col items-center">
              <Counter end={38} label="Avg Score Improvement" suffix="%" />
              <div className="w-10 h-0.5 bg-gold mt-4 rounded-full"></div>
            </div>
            <div className="flex flex-col items-center">
              <Counter end={4.9} label="Parent Rating" suffix="★" />
              <div className="w-10 h-0.5 bg-gold mt-4 rounded-full"></div>
            </div>
            <div className="flex flex-col items-center">
              <Counter end={3} label="Years of Structured Teaching" suffix="+" />
              <div className="w-10 h-0.5 bg-gold mt-4 rounded-full"></div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="text-gold text-6xl font-display mb-6 leading-none">“</div>
            <p className="text-white italic font-display text-2xl md:text-3xl leading-relaxed mb-6">
              My son went from dreading math to actually looking forward to class. The structure, the tracking, the teacher — everything changed.
            </p>
            <p className="text-white/55 text-sm">— Rahul Mehta, Parent, Gurgaon, Class 9</p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — VISION STATEMENT */}
      <section className="py-32 bg-white flex flex-col items-center text-center">
        <div className="container mx-auto px-4">
          <span className="text-primary font-bold text-sm tracking-[0.5em] uppercase mb-12 block">Our Vision</span>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-navy leading-tight mb-12">
              <span className="block mb-2">To become the most</span>
              <span className="block font-bold italic mb-2">trusted structured math</span>
              <span className="block mb-2">learning platform</span>
              <span className="block relative inline-block">
                in Gurgaon.
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-gold/30 rounded-full"></div>
              </span>
            </h2>

            <div className="w-20 h-0.5 bg-gold mx-auto mb-12"></div>

            <p className="text-slate-gray text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Where every student has a roadmap. Where every parent has visibility. Where every week has a purpose — this is what maths tuition in Gurgaon should always have been.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8 — BOTTOM CTA BANNER */}
      <section className="py-24 bg-gradient-to-br from-navy to-primary relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <FloatingSymbol symbol="π" size="5rem" top="20%" left="10%" delay="0s" duration="10s" rotation="10deg" />
          <FloatingSymbol symbol="√" size="8rem" top="60%" left="80%" delay="2s" duration="12s" rotation="-15deg" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center text-gold animate-pulse">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-6">Be Part of the Story.</h2>
          <p className="text-white/75 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Join 200+ students and families already learning with the best maths tutor in Gurgaon — structured, clear, and with measurable results.
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
              Explore Curriculum →
            </Link>
          </div>

          <p className="mt-8 text-white/50 text-sm">
            Free • No commitment • 45-minute live class
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
          animation: slow-rotate-reverse 40s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
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
