'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, 
  ClipboardCheck, 
  BarChart2, 
  FileText, 
  PenTool, 
  RefreshCw, 
  BarChart, 
  ArrowRight, 
  Check, 
  X, 
  Sparkles,
  ChevronRight,
  MessageCircle,
  TrendingUp,
  Star,
  Award,
  Calendar,
  User,
  Smartphone
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

// Floating Symbol Component
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

// Step Component for Section 3
const StepItem = ({ step, index }: { step: any, index: number }) => {
  const isEven = index % 2 !== 0;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`relative flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-24 lg:mb-40 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${isEven ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Content Side */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg mb-4 ${step.badgeColor}`}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="font-display text-3xl md:text-4xl text-navy font-bold leading-tight">
          {step.title}
        </h3>
        <p className="text-slate-gray text-lg leading-relaxed">
          {step.description}
        </p>
        <ul className="space-y-3">
          {step.features.map((f: string, i: number) => (
            <li key={i} className="flex items-center gap-3 text-navy font-medium">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${step.badgeColor}`}>
                <Check className="w-3 h-3" />
              </div>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual Side */}
      <div className="w-full lg:w-1/2">
        <div className="relative group">
          {/* Decorative Background Shape */}
          <div className={`absolute -inset-4 rounded-[32px] opacity-10 blur-xl group-hover:opacity-20 transition-opacity ${step.badgeColor}`}></div>
          
          {/* Visual Card */}
          <div className="relative bg-white rounded-[24px] p-8 shadow-[0_20px_50px_rgba(10,31,94,0.12)] border border-ice-blue overflow-hidden">
            {step.visual}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HowItWorksPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const heroSymbols = [
    { s: '＋', sz: '2rem', t: '10%', l: '5%', d: '0s', dur: '6s', r: '10deg' },
    { s: '－', sz: '1.5rem', t: '20%', l: '80%', d: '1s', dur: '7s', r: '-15deg' },
    { s: '×', sz: '3rem', t: '70%', l: '10%', d: '2s', dur: '8s', r: '20deg' },
    { s: '÷', sz: '2.5rem', t: '80%', l: '85%', d: '0.5s', dur: '5s', r: '-10deg' },
    { s: '√', sz: '4rem', t: '15%', l: '45%', d: '1.5s', dur: '9s', r: '5deg' },
    { s: 'π', sz: '2rem', t: '60%', l: '40%', d: '2.5s', dur: '6s', r: '12deg' },
    { s: '∑', sz: '3.5rem', t: '40%', l: '90%', d: '3s', dur: '10s', r: '-5deg' },
    { s: '²', sz: '2rem', t: '5%', l: '70%', d: '1.2s', dur: '7s', r: '0deg' },
  ];

  const steps = [
    {
      title: "Enroll and Initial Assessment",
      description: "Every journey starts with understanding the baseline. We begin with a comprehensive diagnostic test to identify specific concept gaps — ideal for students searching for the best maths classes near me.",
      badgeColor: "bg-primary",
      features: ["Concept-level diagnostic test", "Detailed gap analysis report", "Personalized batch recommendation"],
      visual: (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-navy">Diagnostic Report</h4>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Student: Aarav S.</span>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Algebra', val: 60, color: 'bg-amber-500' },
              { label: 'Geometry', val: 75, color: 'bg-primary' },
              { label: 'Arithmetic', val: 90, color: 'bg-success' }
            ].map((bar, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-gray">
                  <span>{bar.label}</span>
                  <span>{bar.val}%</span>
                </div>
                <div className="h-2 bg-ice-blue rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.val}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${bar.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-xl text-center">
            <p className="text-success font-bold text-sm">Recommended: Class 8 Batch A</p>
          </div>
        </div>
      )
    },
    {
      title: "Weekly Structured Curriculum",
      description: "No more random teaching. Our pre-defined weekly roadmap ensures every topic is covered systematically with ample time for revision.",
      badgeColor: "bg-gold",
      features: ["Fixed weekly topic schedule", "Daily lesson objectives", "Structured homework modules"],
      visual: (
        <div className="space-y-4">
          <div className="bg-navy text-white p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-70">Current Module</p>
              <p className="font-bold">Week 12 — Algebra</p>
            </div>
            <Calendar className="w-5 h-5 text-gold" />
          </div>
          <div className="space-y-2">
            {[
              { day: 'Mon', topic: 'Linear Equations Intro', status: 'Concept' },
              { day: 'Tue', topic: 'Solving for X & Y', status: 'Practice' },
              { day: 'Wed', topic: 'Word Problems', status: 'Application' },
              { day: 'Thu', topic: 'Advanced Substitution', status: 'Mastery' },
              { day: 'Fri', topic: 'Weekly Unit Test', status: 'Assessment' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-ice-blue/50 rounded-lg border border-ice-blue">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-navy w-8">{item.day}</span>
                  <span className="text-sm text-navy">{item.topic}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.status === 'Assessment' ? 'bg-primary text-white' : 'bg-white text-primary border border-primary/20'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Regular Testing and Evaluation",
      description: "We don’t wait for exams to find gaps. Our maths tuition in Gurgaon includes weekly tests and monthly milestones to keep students on track and parents informed.",
      badgeColor: "bg-success",
      features: ["Weekly unit assessments", "Monthly milestone tests", "Peer-benchmarking analytics"],
      visual: (
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-ice-blue" />
              <motion.circle 
                cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray={364.4}
                initial={{ strokeDashoffset: 364.4 }}
                whileInView={{ strokeDashoffset: 364.4 * (1 - 0.87) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-primary" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-navy">87</span>
              <span className="text-[10px] text-slate-gray font-bold uppercase">/ 100</span>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-navy">Unit Test: Linear Equations</h4>
            <div className="flex justify-center gap-2">
              <span className="bg-success/10 text-success text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Award className="w-3 h-3" /> Top 10% of batch
              </span>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full">Rank: 2</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-ice-blue">
            <div className="text-left">
              <p className="text-[10px] text-slate-gray font-bold uppercase">Accuracy</p>
              <p className="font-bold text-navy">92%</p>
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-gray font-bold uppercase">Speed</p>
              <p className="font-bold text-navy">Avg</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Parent Dashboard and Reports",
      description: "Full transparency. Parents get a real-time dashboard to track attendance, test scores, and teacher feedback every single week.",
      badgeColor: "bg-navy",
      features: ["Real-time score tracking", "Attendance monitoring", "Direct teacher feedback"],
      visual: (
        <div className="flex justify-center">
          {/* Mobile Phone Frame */}
          <div className="w-48 h-96 bg-navy rounded-[32px] p-3 shadow-2xl relative border-4 border-slate-700">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-navy rounded-b-xl z-10"></div>
            <div className="bg-white h-full rounded-[24px] overflow-hidden flex flex-col">
              <div className="bg-primary p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="text-[10px] font-bold">Parent Portal</span>
                </div>
                <p className="text-xs font-bold">Aarav's Progress</p>
              </div>
              <div className="p-3 space-y-3 flex-grow overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-ice-blue p-2 rounded-lg text-center">
                    <p className="text-[8px] text-slate-gray uppercase font-bold">Attendance</p>
                    <p className="text-xs font-bold text-navy">92%</p>
                  </div>
                  <div className="bg-ice-blue p-2 rounded-lg text-center">
                    <p className="text-[8px] text-slate-gray uppercase font-bold">Last Test</p>
                    <p className="text-xs font-bold text-navy">87/100</p>
                  </div>
                </div>
                <div className="bg-success/10 p-2 rounded-lg border border-success/20">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[8px] text-success font-bold uppercase">Growth</p>
                    <TrendingUp className="w-3 h-3 text-success" />
                  </div>
                  <p className="text-[10px] font-bold text-navy">+12% this month</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] text-slate-gray font-bold uppercase">Teacher Note</p>
                  <div className="bg-gray-50 p-2 rounded-lg text-[9px] text-navy italic">
                    "Aarav is showing great focus in Algebra. Needs to practice word problems more."
                  </div>
                </div>
              </div>
              <div className="p-2 border-t border-gray-100 flex justify-around">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Doubt Solving and Support",
      description: "Learning doesn’t stop after class. Our system is designed for students searching for the best maths classes near me, with dedicated doubt-solving sessions and chat support to ensure no question goes unanswered.",
      badgeColor: "bg-primary",
      features: ["Dedicated doubt sessions", "24/7 chat support access", "One-on-one concept clearing"],
      visual: (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-ice-blue">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">M</div>
              <div>
                <p className="text-xs font-bold text-navy">Mitali (Teacher)</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                  <span className="text-[8px] text-success font-bold uppercase">Live Now</span>
                </div>
              </div>
            </div>
            <MessageCircle className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-4 flex-grow">
            <div className="flex justify-end">
              <div className="bg-ice-blue p-3 rounded-2xl rounded-tr-none max-w-[80%]">
                <p className="text-xs text-navy">Ma'am, I'm stuck on Q4 from the worksheet. Why do we flip the sign here?</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-primary text-white p-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-md">
                <p className="text-xs">Great question! We flip the inequality sign whenever we multiply or divide by a negative number. Watch this quick clip...</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-ice-blue p-3 rounded-2xl rounded-tr-none max-w-[80%]">
                <p className="text-xs text-navy">Ah, got it! Thanks Ma'am. 🙌</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-ice-blue flex items-center gap-2">
            <div className="flex-grow bg-gray-50 rounded-full h-8 px-4 flex items-center text-[10px] text-slate-gray italic">Type your doubt...</div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Results and Growth",
      description: "The end goal is measurable improvement. We track growth from day 1 to day 100, ensuring every student reaches their potential.",
      badgeColor: "bg-gold",
      features: ["Quarterly growth analysis", "Final exam readiness", "Confidence building"],
      visual: (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="font-bold text-navy mb-4">Overall Performance Growth</h4>
            <div className="flex items-center justify-center gap-8">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-gray font-bold uppercase">Before</p>
                <p className="text-2xl font-bold text-slate-gray">62</p>
              </div>
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-gold"
              >
                <ArrowRight className="w-8 h-8" />
              </motion.div>
              <div className="space-y-1">
                <p className="text-[10px] text-success font-bold uppercase">After</p>
                <p className="text-4xl font-bold text-success">94</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Attendance', val: '96%' },
              { label: 'Tests Taken', val: '12' },
              { label: 'Batch Rank', val: '2' }
            ].map((stat, i) => (
              <div key={i} className="bg-ice-blue/50 p-2 rounded-lg text-center border border-ice-blue">
                <p className="text-[8px] text-slate-gray uppercase font-bold">{stat.label}</p>
                <p className="text-xs font-bold text-navy">{stat.val}</p>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-ice-blue">
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-gold fill-gold" />)}
            </div>
            <p className="text-[10px] text-navy italic text-center">
              "The transformation in my son's confidence is unbelievable. Highly recommend!"
            </p>
            <p className="text-[8px] text-slate-gray font-bold text-center mt-1">— Mrs. Sharma, Parent</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="overflow-x-hidden font-sans bg-white">
      {/* SECTION 1 — HERO */}
      <section className="relative bg-gradient-to-br from-navy to-primary py-24 md:py-32 overflow-hidden">
        {/* Floating Math Symbols */}
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
            <span className="text-white">How It Works</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-medium mb-8">
            <span>✦</span> The System Behind the Results
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-8 max-w-6xl mx-auto">
           Best Maths Coaching in Gurgaon That Delivers <span className="relative inline-block">
              Predictable Results
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span> 
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
           No guesswork. No randomness. Just a clear, structured learning journey with the best maths coaching in Gurgaon that every student and parent can trust.
          </p>

          {/* Trust Strip */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-white/60 text-base md:text-sm font-medium">
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Weekly Roadmap</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Regular Testing</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Parent Dashboard</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Proven Results</div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — 3 PILLARS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-[0.15em] uppercase mb-4 block">The Foundation</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold mb-4">3 Core Pillars Behind Our Maths Tuition in Gurgaon</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Academic System",
                desc: "Pre-defined yearly curriculum broken into clear weekly modules. You always know what will be taught — and when.",
                features: ["Weekly topic plan", "Daily lesson structure", "Class 6–10 roadmap"],
                accent: "border-primary",
                num: "01"
              },
              {
                icon: <ClipboardCheck className="w-8 h-8" />,
                title: "Assessment System",
                desc: "Weekly tests, monthly evaluations, concept-level diagnostics — gaps are caught early, not at exam time.",
                features: ["Weekly unit tests", "Monthly milestone evaluation", "Diagnostic reports"],
                accent: "border-gold",
                num: "02"
              },
              {
                icon: <BarChart2 className="w-8 h-8" />,
                title: "Tracking System",
                desc: "Parents get a real-time dashboard showing attendance, scores, and weekly improvement trends — making our maths tuition in Gurgaon completely transparent and trackable.",
                features: ["Parent mobile dashboard", "Weekly progress reports", "Teacher feedback summaries"],
                accent: "border-success",
                num: "03"
              }
            ].map((pillar, i) => (
              <div key={i} className={`group relative bg-white rounded-[24px] p-8 shadow-[0_10px_40px_rgba(18,81,170,0.08)] border-t-4 ${pillar.accent} hover:-translate-y-2 hover:border-primary transition-all duration-300`}>
                <div className="absolute top-6 right-8 text-4xl font-display font-bold text-ice-blue group-hover:text-primary/10 transition-colors">
                  {pillar.num}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-ice-blue flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-xl text-navy mb-4">{pillar.title}</h3>
                <p className="text-slate-gray leading-relaxed mb-8 text-lg">
                  {pillar.desc}
                </p>
                <ul className="space-y-3">
                  {pillar.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-navy font-medium text-lg">
                      <Check className="w-4 h-4 text-success" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — STEP BY STEP JOURNEY */}
      <section ref={containerRef} className="py-24 bg-gradient-to-b from-ice-blue/30 to-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <span className="text-primary font-bold text-sm tracking-[0.15em] uppercase mb-4 block">How It Works</span>
            <h2 className="font-display text-4xl md:text-6xl text-navy font-bold mb-4">Your Child's Journey — Step by Step</h2>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Animated Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 hidden lg:block">
              <div className="w-full h-full border-l-2 border-dashed border-ice-blue"></div>
              <motion.div 
                style={{ scaleY: pathLength }}
                className="absolute top-0 left-0 w-full h-full border-l-2 border-primary origin-top"
              />
            </div>

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, i) => (
                <StepItem key={i} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — COMPARISON TABLE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold">My Learning Planet vs Traditional Coaching</h2>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <div className="min-w-[800px] bg-white rounded-[24px] shadow-[0_20px_60px_rgba(10,31,94,0.1)] border border-ice-blue overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ice-blue">
                    <th className="p-6 bg-gray-50 text-navy font-bold text-base">Feature</th>
                    <th className="p-6 bg-primary text-white font-bold text-center text-base relative">
                      My Learning Planet ✦
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gold"></div>
                    </th>
                    <th className="p-6 bg-gray-50 text-slate-gray font-bold text-center text-base">Traditional Coaching</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: "Fixed Weekly Curriculum", mlp: "Pre-defined roadmap for entire year", trad: "Teaching pace is often random" },
                    { f: "Parent Progress Tracking", mlp: "Real-time dashboard + weekly reports", trad: "Limited visibility until exams" },
                    { f: "Regular Structured Testing", mlp: "Weekly unit tests + Monthly milestones", trad: "Inconsistent testing schedules" },
                    { f: "Concept-level Diagnostics", mlp: "Detailed gap analysis for every student", trad: "Generic feedback only" },
                    { f: "Recorded Backup Classes", mlp: "Every class recorded for revision", trad: "Missed classes are lost" },
                    { f: "Doubt Solving Sessions", mlp: "Dedicated slots + chat support", trad: "Difficult to get individual attention" },
                    { f: "Measurable Score Improvement", mlp: "Average 38% improvement tracked", trad: "Unpredictable results" }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-ice-blue hover:bg-ice-blue/10 transition-colors">
                      <td className="p-6 text-navy font-semibold text-base">{row.f}</td>
                      <td className="p-6 bg-primary/5 border-l-2 border-primary">
                        <div className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-success shrink-0" />
                          <span className="text-navy text-base font-medium">{row.mlp}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-start gap-3 opacity-60">
                          <X className="w-5 h-5 text-red-500 shrink-0" />
                          <span className="text-slate-gray text-base">{row.trad}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHAT YOU GET */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold">Everything Your Child Needs — Included</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <FileText />, title: "Notes and Cheat Sheets", tags: ["PDF", "Printable", "Topic-wise"] },
              { icon: <PenTool />, title: "Practice Worksheets", tags: ["Weekly", "Graded", "Concept-wise"] },
              { icon: <RefreshCw />, title: "Revision Modules", tags: ["Pre-exam", "Structured", "Complete"] },
              { icon: <BarChart />, title: "Detailed Test Reports", tags: ["Weekly", "Monthly", "Parent copy"] }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[24px] p-8 shadow-[0_10px_30px_rgba(18,81,170,0.05)] border border-transparent hover:border-primary hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-navy text-white flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">{item.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="bg-ice-blue text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section className="py-24 bg-navy relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-white/50 font-bold text-sm tracking-[0.15em] uppercase mb-4 block">What Parents Say</span>
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold">Trusted by 200+ Families</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The weekly roadmap changed everything. My daughter finally knows what to expect every week — and so do I.",
                name: "Neha Gupta",
                info: "Parent Class 8",
                initials: "NG"
              },
              {
                quote: "Scores went from 58 to 91 in one term. The structure, the testing, the dashboard — all outstanding.",
                name: "Rahul Mehta",
                info: "Parent Class 9",
                initials: "RM"
              },
              {
                quote: "Finally a coaching that tells me exactly what my son learned this week and how he performed. Pure clarity.",
                name: "Sunita Verma",
                info: "Parent Class 7",
                initials: "SV"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[24px] p-8 border-l-4 border-l-gold">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-gold fill-gold" />)}
                </div>
                <p className="text-white/90 italic text-lg leading-relaxed mb-8">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white text-lg font-bold">{t.name}</p>
                    <p className="text-white/50 text-base">{t.info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA BANNER */}
      <section className="py-24 bg-gradient-to-br from-navy to-primary relative overflow-hidden">
        {/* Floating Symbols */}
        <div className="absolute inset-0 z-0 opacity-10">
          <FloatingSymbol symbol="π" size="5rem" top="20%" left="10%" delay="0s" duration="10s" rotation="10deg" />
          <FloatingSymbol symbol="√" size="8rem" top="60%" left="80%" delay="2s" duration="12s" rotation="-15deg" />
          <FloatingSymbol symbol="∑" size="6rem" top="10%" left="70%" delay="1s" duration="8s" rotation="20deg" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center text-gold animate-pulse">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-6">Ready to Start the Journey?</h2>
          <p className="text-white/75 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Book a free demo class for the best maths coaching in Gurgaon and experience the My Learning Planet system firsthand.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => router.push('/contact')}
              className="w-full sm:w-auto bg-gold text-navy px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-gold/20 hover:scale-105 transition-all duration-300 animate-pulse-subtle"
            >
              ✦ Book a Free Demo
            </button>
            <button 
              onClick={() => router.push('/curriculum')}
              className="w-full sm:w-auto border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Curriculum <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <p className="mt-8 text-white/50 text-sm">
            Free • No commitment • 45-minute live class
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
      `}</style>
    </div>
  );
}
