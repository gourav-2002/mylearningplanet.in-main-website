'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  PenTool, 
  ClipboardCheck, 
  BarChart2, 
  FileText, 
  Video, 
  RefreshCw, 
  Download, 
  Plus, 
  Minus, 
  Sparkles, 
  Trophy, 
  Star, 
  Award,
  CheckCircle2,
  Calculator,
  Shapes,
  TrendingUp,
  Grid,
  Pi,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface TopicModule {
  week: string;
  icon: React.ReactNode;
  name: string;
  concepts: string[];
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
}

interface ClassData {
  id: string;
  label: string;
  subtitle: string;
  description: string;
  stats: { topics: number; weeks: number; tests: number };
  modules: TopicModule[];
}

// --- Data ---
const CLASSES_DATA: ClassData[] = [
  {
    id: '6',
    label: 'Class 6',
    subtitle: 'Foundation Builder',
    description: 'Focuses on transitioning from basic arithmetic to structured mathematical thinking and logical reasoning.',
    stats: { topics: 12, weeks: 42, tests: 40 },
    modules: [
      { week: 'Wk 1–4', icon: <Calculator className="w-6 h-6" />, name: 'Number System', concepts: ['Knowing our Numbers', 'Whole Numbers', 'Playing with Numbers'], difficulty: 'Foundational' },
      { week: 'Wk 5–8', icon: <Pi className="w-6 h-6" />, name: 'Fractions & Decimals', concepts: ['Fractional Parts', 'Decimal Representation', 'Operations on Decimals'], difficulty: 'Intermediate' },
      { week: 'Wk 9–12', icon: <Calculator className="w-6 h-6" />, name: 'Basic Algebra', concepts: ['Introduction to Variables', 'Simple Expressions', 'Matchstick Patterns'], difficulty: 'Intermediate' },
      { week: 'Wk 13–16', icon: <Shapes className="w-6 h-6" />, name: 'Geometry Basics', concepts: ['Points, Lines, Planes', 'Angles & Triangles', 'Elementary Shapes'], difficulty: 'Foundational' },
      { week: 'Wk 17–20', icon: <Grid className="w-6 h-6" />, name: 'Mensuration', concepts: ['Perimeter of Polygons', 'Area of Rectangles', 'Unit Conversions'], difficulty: 'Intermediate' },
      { week: 'Wk 21–24', icon: <TrendingUp className="w-6 h-6" />, name: 'Data Handling', concepts: ['Recording Data', 'Pictographs', 'Bar Graphs'], difficulty: 'Foundational' },
    ]
  },
  {
    id: '7',
    label: 'Class 7',
    subtitle: 'Concept Strengthener',
    description: 'Deepens the understanding of abstract concepts and introduces more complex algebraic and geometric relationships.',
    stats: { topics: 14, weeks: 42, tests: 45 },
    modules: [
      { week: 'Wk 1–4', icon: <Calculator className="w-6 h-6" />, name: 'Integers', concepts: ['Properties of Addition', 'Multiplication Rules', 'Division of Integers'], difficulty: 'Foundational' },
      { week: 'Wk 5–8', icon: <Pi className="w-6 h-6" />, name: 'Rational Numbers', concepts: ['Equivalent Rationals', 'Standard Form', 'Comparison'], difficulty: 'Intermediate' },
      { week: 'Wk 9–12', icon: <Calculator className="w-6 h-6" />, name: 'Algebraic Expressions', concepts: ['Terms & Coefficients', 'Like & Unlike Terms', 'Addition & Subtraction'], difficulty: 'Intermediate' },
      { week: 'Wk 13–16', icon: <Shapes className="w-6 h-6" />, name: 'Lines and Angles', concepts: ['Related Angles', 'Pairs of Lines', 'Transversals'], difficulty: 'Intermediate' },
      { week: 'Wk 17–20', icon: <Shapes className="w-6 h-6" />, name: 'Triangles', concepts: ['Exterior Angle Property', 'Angle Sum Property', 'Pythagoras Theorem'], difficulty: 'Advanced' },
      { week: 'Wk 21–24', icon: <TrendingUp className="w-6 h-6" />, name: 'Statistics', concepts: ['Mean, Median, Mode', 'Chance & Probability', 'Double Bar Graphs'], difficulty: 'Foundational' },
    ]
  },
  {
    id: '8',
    label: 'Class 8',
    subtitle: 'Core Developer',
    description: 'Mathematics class 8 is a critical year for building the core logic required for higher-level mathematics and competitive foundations.',
    stats: { topics: 15, weeks: 42, tests: 50 },
    modules: [
      { week: 'Wk 1–4', icon: <Calculator className="w-6 h-6" />, name: 'Linear Equations', concepts: ['Variable on one side', 'Variable on both sides', 'Word Problems'], difficulty: 'Intermediate' },
      { week: 'Wk 5–8', icon: <Shapes className="w-6 h-6" />, name: 'Quadrilaterals', concepts: ['Polygons', 'Parallelograms', 'Special Quadrilaterals'], difficulty: 'Intermediate' },
      { week: 'Wk 9–12', icon: <Pi className="w-6 h-6" />, name: 'Exponents', concepts: ['Laws of Exponents', 'Negative Powers', 'Standard Form'], difficulty: 'Advanced' },
      { week: 'Wk 13–16', icon: <Grid className="w-6 h-6" />, name: 'Mensuration Adv.', concepts: ['Surface Area of Cubes', 'Volume of Cylinders', 'Trapezium Area'], difficulty: 'Advanced' },
      { week: 'Wk 17–20', icon: <Calculator className="w-6 h-6" />, name: 'Algebraic Identities', concepts: ['Standard Identities', 'Factorization', 'Division of Polynomials'], difficulty: 'Advanced' },
      { week: 'Wk 21–24', icon: <TrendingUp className="w-6 h-6" />, name: 'Graphs and Data', concepts: ['Pie Charts', 'Histograms', 'Line Graphs'], difficulty: 'Intermediate' },
    ]
  },
  {
    id: '9',
    label: 'Class 9',
    subtitle: 'Advanced Thinker',
    description: 'Mathematics class 9 introduces formal proofs and rigorous mathematical structures, strengthening logical thinking and problem-solving skills.',
    stats: { topics: 16, weeks: 44, tests: 55 },
    modules: [
      { week: 'Wk 1–4', icon: <Calculator className="w-6 h-6" />, name: 'Number Systems', concepts: ['Irrational Numbers', 'Real Numbers', 'Laws of Radicals'], difficulty: 'Intermediate' },
      { week: 'Wk 5–8', icon: <Calculator className="w-6 h-6" />, name: 'Polynomials', concepts: ['Remainder Theorem', 'Factor Theorem', 'Algebraic Identities'], difficulty: 'Advanced' },
      { week: 'Wk 9–12', icon: <Grid className="w-6 h-6" />, name: 'Coordinate Geometry', concepts: ['Cartesian System', 'Plotting Points', 'Quadrant Analysis'], difficulty: 'Foundational' },
      { week: 'Wk 13–16', icon: <Shapes className="w-6 h-6" />, name: 'Triangles Advanced', concepts: ['Congruence Rules', 'Inequalities', 'CPCT Applications'], difficulty: 'Advanced' },
      { week: 'Wk 17–20', icon: <Grid className="w-6 h-6" />, name: 'Surface Areas', concepts: ['Cones & Spheres', 'Hemispheres', 'Combined Solids'], difficulty: 'Advanced' },
      { week: 'Wk 21–24', icon: <TrendingUp className="w-6 h-6" />, name: 'Prob. & Stats', concepts: ['Frequency Polygons', 'Empirical Probability', 'Data Interpretation'], difficulty: 'Intermediate' },
    ]
  },
  {
    id: '10',
    label: 'Class 10',
    subtitle: 'Board Ready',
    description: 'Mathematics class 10 focuses on board exam excellence while building strong higher-order thinking skills.',
    stats: { topics: 15, weeks: 40, tests: 60 },
    modules: [
      { week: 'Wk 1–4', icon: <Calculator className="w-6 h-6" />, name: 'Real Numbers', concepts: ['Euclid\'s Lemma', 'Fundamental Theorem', 'Irrationality Proofs'], difficulty: 'Intermediate' },
      { week: 'Wk 5–8', icon: <Calculator className="w-6 h-6" />, name: 'Polynomials Adv.', concepts: ['Relationship of Zeroes', 'Division Algorithm', 'Cubic Polynomials'], difficulty: 'Advanced' },
      { week: 'Wk 9–12', icon: <Calculator className="w-6 h-6" />, name: 'Quadratic Eq.', concepts: ['Factorization Method', 'Quadratic Formula', 'Nature of Roots'], difficulty: 'Advanced' },
      { week: 'Wk 13–16', icon: <TrendingUp className="w-6 h-6" />, name: 'Arithmetic Prog.', concepts: ['nth Term Formula', 'Sum of n Terms', 'Application Problems'], difficulty: 'Intermediate' },
      { week: 'Wk 17–20', icon: <Pi className="w-6 h-6" />, name: 'Trigonometry', concepts: ['Ratios & Identities', 'Heights & Distances', 'Complementary Angles'], difficulty: 'Advanced' },
      { week: 'Wk 21–24', icon: <Shapes className="w-6 h-6" />, name: 'Circles & Areas', concepts: ['Tangents to Circle', 'Sector & Segment Area', 'Combined Figures'], difficulty: 'Advanced' },
    ]
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

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
  <div className="border-b border-ice-blue last:border-0">
    <button 
      onClick={onClick}
      className="w-full py-6 px-8 flex items-center justify-between text-left group transition-colors hover:bg-ice-blue/10"
    >
      <span className="font-sans font-bold text-navy text-lg">{question}</span>
      <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
        {isOpen ? <Plus className="w-6 h-6 text-primary" /> : <Plus className="w-6 h-6 text-primary" />}
      </div>
    </button>
    <div 
      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-height-1000 opacity-100' : 'max-height-0 opacity-0'}`}
      style={{ maxHeight: isOpen ? '500px' : '0' }}
    >
      <div className="px-8 pb-8 text-slate-gray text-base leading-relaxed">
        {answer}
      </div>
    </div>
  </div>
);

export default function CurriculumPage() {
  const [activeTab, setActiveTab] = useState('6');
  const [openFaq, setOpenFaq] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const activeClass = CLASSES_DATA.find(c => c.id === activeTab) || CLASSES_DATA[0];

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

  return (
    <div className="overflow-x-hidden font-sans bg-white">
      {/* SECTION 1 — HERO */}
      <section className="relative bg-gradient-to-br from-navy to-primary py-24 md:py-32 overflow-hidden">
        {/* Floating Symbols */}
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
            <span className="text-white">Curriculum</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-medium mb-8">
            <span>✦</span> Structured for Classes 6–10
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-8 max-w-7xl mx-auto">
            Clarity-Driven Curriculum for Maths Classes in Gurgaon <span className="relative inline-block">
              — Not Confusion
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Every topic. Every week. Planned upfront — so your child always knows what comes next with our maths classes in Gurgaon.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {["5 Classes Covered", "40+ Weekly Modules", "100% NCERT Aligned"].map((chip, i) => (
              <div key={i} className="bg-white/10 border border-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-bold">
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTERACTIVE CLASS TABS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-[0.15em] uppercase mb-4 block">Explore the Curriculum</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold mb-4">What Your Child Will Master</h2>
            <p className="text-slate-gray text-lg max-w-2xl mx-auto">Click any class to explore the full structured curriculum</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-16">
            <div className="bg-ice-blue p-1.5 rounded-full inline-flex overflow-x-auto no-scrollbar max-w-full">
              {CLASSES_DATA.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => setActiveTab(cls.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === cls.id 
                      ? 'bg-primary text-white shadow-[0_4px_16px_rgba(18,81,170,0.35)]' 
                      : 'text-slate-gray hover:text-primary'
                  }`}
                >
                  {cls.label}
                </button>
              ))}
            </div>
          </div>

          {/* Class Overview Card */}
          <div 
            key={activeTab}
            className="bg-white rounded-[24px] shadow-[0_8px_40px_rgba(18,81,170,0.10)] border border-ice-blue p-8 md:p-12 animate-reveal"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column */}
              <div className="lg:col-span-4 space-y-8">
                <div>
                  <h3 className="font-display text-6xl md:text-7xl text-primary font-bold relative inline-block">
                    {activeClass.label}
                    <div className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-gold rounded-full"></div>
                  </h3>
                  <p className="text-2xl font-display text-navy font-bold mt-4">{activeClass.subtitle}</p>
                </div>
                
                <p className="text-slate-gray leading-relaxed">
                  {activeClass.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <div className="bg-ice-blue text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                    {activeClass.stats.topics} Topics
                  </div>
                  <div className="bg-ice-blue text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                    {activeClass.stats.weeks} Weeks
                  </div>
                  <div className="bg-ice-blue text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                    {activeClass.stats.tests} Tests
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-navy font-bold text-sm uppercase tracking-widest">Curriculum Completion Roadmap</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-3 bg-ice-blue rounded-full overflow-hidden flex">
                      <div className="w-1/3 h-full bg-primary border-r border-white/20"></div>
                      <div className="w-1/3 h-full bg-primary/60 border-r border-white/20"></div>
                      <div className="w-1/3 h-full bg-primary/20"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-gray uppercase tracking-tighter">
                    <span>Term 1</span>
                    <span>Term 2</span>
                    <span>Term 3</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300">
                  <Download className="w-5 h-5" /> Download Syllabus PDF
                </button>
              </div>

              {/* Right Column - Modules Grid */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeClass.modules.map((mod, i) => (
                    <div 
                      key={i}
                      className="bg-[#F7F9FC] border border-ice-blue rounded-[20px] p-6 hover:bg-ice-blue/30 hover:border-primary transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                          {mod.icon}
                        </div>
                        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                          {mod.week}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-navy mb-3">{mod.name}</h4>
                      <ul className="space-y-2 mb-4">
                        {mod.concepts.map((c, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-base text-slate-gray">
                            <div className="w-1.5 h-1.5 bg-primary/30 rounded-full"></div>
                            {c}
                          </li>
                        ))}
                      </ul>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        mod.difficulty === 'Foundational' ? 'bg-success/10 text-success' :
                        mod.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-600' :
                        'bg-red-500/10 text-red-600'
                      }`}>
                        {mod.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — CURRICULUM FLOW */}
      <section className="py-24 bg-gradient-to-b from-ice-blue/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-primary font-bold text-sm tracking-[0.15em] uppercase mb-4 block">Our Approach</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold">Not Just Topics — A Complete System</h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
              {/* Stage 1 */}
              <div className="w-full lg:w-64 bg-white p-6 rounded-[24px] shadow-sm border border-ice-blue text-center relative z-10">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-primary/20">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-navy mb-2">Weekly Module</h4>
                <p className="text-base text-slate-gray">Each topic broken into focused weekly lessons with clear outcomes</p>
              </div>

              {/* Arrow 1 */}
              <div className="hidden lg:block flex-grow relative h-1">
                <div className="absolute inset-0 border-t-2 border-dashed border-primary/30"></div>
                <div className="absolute top-0 left-0 h-full bg-primary animate-flow-dot"></div>
              </div>
              <div className="lg:hidden text-primary animate-bounce">
                <Plus className="w-6 h-6 rotate-45" />
              </div>

              {/* Stage 2 */}
              <div className="w-full lg:w-64 bg-white p-6 rounded-[24px] shadow-sm border border-ice-blue text-center relative z-10">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-gold/20">
                  <PenTool className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-navy mb-2">Practice & Notes</h4>
                <p className="text-base text-slate-gray">Notes, cheat sheets and worksheets released every week</p>
              </div>

              {/* Arrow 2 */}
              <div className="hidden lg:block flex-grow relative h-1">
                <div className="absolute inset-0 border-t-2 border-dashed border-primary/30"></div>
                <div className="absolute top-0 left-0 h-full bg-primary animate-flow-dot" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="lg:hidden text-primary animate-bounce">
                <Plus className="w-6 h-6 rotate-45" />
              </div>

              {/* Stage 3 */}
              <div className="w-full lg:w-64 bg-white p-6 rounded-[24px] shadow-sm border border-ice-blue text-center relative z-10">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-success/20">
                  <ClipboardCheck className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-navy mb-2">Weekly Test</h4>
                <p className="text-base text-slate-gray">Unit test every Friday to lock in the week's learning</p>
              </div>

              {/* Arrow 3 */}
              <div className="hidden lg:block flex-grow relative h-1">
                <div className="absolute inset-0 border-t-2 border-dashed border-primary/30"></div>
                <div className="absolute top-0 left-0 h-full bg-primary animate-flow-dot" style={{ animationDelay: '2s' }}></div>
              </div>
              <div className="lg:hidden text-primary animate-bounce">
                <Plus className="w-6 h-6 rotate-45" />
              </div>

              {/* Stage 4 */}
              <div className="w-full lg:w-64 bg-white p-6 rounded-[24px] shadow-sm border border-ice-blue text-center relative z-10">
                <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-navy/20">
                  <BarChart2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-navy mb-2">Parent Report</h4>
                <p className="text-base text-slate-gray">Detailed result and feedback report sent to parents every weekend</p>
              </div>
            </div>

            <div className="mt-16 bg-gradient-to-r from-ice-blue to-white border border-primary/20 rounded-[24px] p-8 text-center shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-navy">Every 4 weeks = 1 complete module. Every 3 modules = 1 term review.</p>
                  <p className="text-slate-gray mt-1">Structure that never breaks — 52 weeks a year.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — NCERT ALIGNMENT STRIP */}
      <section className="py-24 bg-navy text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-gold font-bold text-sm tracking-[0.15em] uppercase">100% NCERT Aligned</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                Looking for a Maths Institute Near Me? Built on NCERT, Enhanced with Structure
              </h2>
              <p className="text-white/75 text-lg leading-relaxed">
                Our curriculum follows NCERT guidelines for Classes 6–10 exactly — then adds the structure, testing, and tracking that NCERT alone does not provide. Whether you're searching for mathematics classes near me or a structured learning system your child can rely on, My Learning Planet keeps them consistently school-exam ready.
              </p>
              <ul className="space-y-4">
                {[
                  "NCERT chapter sequence maintained",
                  "School exam pattern followed",
                  "Board exam foundation built from Class 6"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg text-white/80">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
              <div className="relative bg-white/5 border border-white/20 backdrop-blur-xl rounded-[24px] p-8 md:p-10 shadow-2xl">
                <h3 className="text-2xl font-bold mb-8">Curriculum Coverage</h3>
                <div className="space-y-6">
                  {CLASSES_DATA.map((cls, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>{cls.label}</span>
                        <span>100%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full w-full animate-width-reveal"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex justify-center">
                  <span className="bg-success/20 text-success border border-success/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                    Fully Mapped to NCERT 2024–25
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — LEARNING RESOURCES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-[0.15em] uppercase mb-4 block">What Comes With Every Class</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold">Resources Included — Every Week</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <FileText className="w-8 h-8" />, 
                title: "Structured Notes", 
                desc: "Topic-wise crisp notes designed by Mitali — clear, visual, easy to revise.", 
                pills: ["PDF", "Weekly", "Printable"],
                color: "from-blue-500 to-primary"
              },
              { 
                icon: <PenTool className="w-8 h-8" />, 
                title: "Practice Worksheets", 
                desc: "Graded worksheets from basic to advanced — released every week alongside the topic.", 
                pills: ["Graded", "Concept-wise", "Weekly"],
                color: "from-amber-400 to-gold"
              },
              { 
                icon: <Video className="w-8 h-8" />, 
                title: "Recorded Lectures", 
                desc: "Every live class is recorded and available — so students never miss a lesson.", 
                pills: ["HD Quality", "Always Available", "Chapter-wise"],
                color: "from-green-400 to-success"
              },
              { 
                icon: <RefreshCw className="w-8 h-8" />, 
                title: "Revision Modules", 
                desc: "Pre-exam revision modules that cover every topic systematically — no last-minute panic.", 
                pills: ["Pre-exam", "Complete", "Structured"],
                color: "from-navy to-slate-800"
              }
            ].map((res, i) => (
              <div key={i} className="bg-white border border-ice-blue rounded-[24px] p-8 shadow-sm hover:shadow-xl hover:border-primary hover:-translate-y-2 transition-all duration-300 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${res.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {res.icon}
                </div>
                <h4 className="text-xl font-bold text-navy mb-4">{res.title}</h4>
                <p className="text-lg text-slate-gray leading-relaxed mb-6">{res.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {res.pills.map((pill, idx) => (
                    <span key={idx} className="bg-ice-blue text-primary text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — OLYMPIAD CALLOUT */}
      <section className="relative py-24 bg-gradient-to-br from-navy via-primary to-blue-600 overflow-hidden">
        {/* Floating Symbols */}
        <div className="absolute inset-0 z-0 opacity-10">
          <FloatingSymbol symbol="∑" size="5rem" top="20%" left="10%" delay="0s" duration="10s" rotation="10deg" />
          <FloatingSymbol symbol="π" size="8rem" top="60%" left="80%" delay="2s" duration="12s" rotation="-15deg" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-gold font-bold text-sm tracking-[0.15em] uppercase">Going Beyond the Basics</span>
              <h2 className="font-display text-4xl md:text-5xl text-white font-bold leading-tight">
                Preparing for Olympiads, NTSE and JEE Foundation?
              </h2>
              <p className="text-white/75 text-lg leading-relaxed">
                Our curriculum builds a strong foundation from Class 6, giving students a clear advantage in Olympiads, NTSE, and future JEE preparation. A structured approach today leads to greater confidence tomorrow, making us a reliable choice for parents searching for mathematics classes near me.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Math Olympiad Ready", "NTSE Foundation", "JEE Head Start"].map((badge, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-bold">
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-[24px] p-8 md:p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-navy shadow-lg">
                  <Trophy className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Students Have Achieved</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-4">
                    <Star className="w-6 h-6 text-gold fill-gold" />
                    <span className="text-white/80 font-medium">Olympiad Selections</span>
                  </div>
                  <span className="text-2xl font-bold text-white">12+</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-4">
                    <Award className="w-6 h-6 text-success" />
                    <span className="text-white/80 font-medium">NTSE Stage 1 Qualifiers</span>
                  </div>
                  <span className="text-2xl font-bold text-white">8</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    <span className="text-white/80 font-medium">Top 5% in Class 10 Boards</span>
                  </div>
                  <span className="text-2xl font-bold text-white">95%</span>
                </div>
              </div>
              <p className="mt-8 text-center text-white/50 text-xs italic">Results from 2023–24 batch</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FAQ ACCORDION */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-[0.15em] uppercase mb-4 block">Common Questions</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold">Curriculum FAQs</h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-[24px] shadow-[0_8px_40px_rgba(18,81,170,0.08)] border border-ice-blue overflow-hidden">
            <FAQItem 
              question="Is the curriculum aligned with my child's school syllabus?" 
              answer="Yes — our curriculum follows NCERT guidelines exactly for Classes 6–10, ensuring your child is always in sync with school exams while gaining additional structured practice, ideal for those searching for a maths institute near me."
              isOpen={openFaq === 0}
              onClick={() => setOpenFaq(openFaq === 0 ? -1 : 0)}
            />
            <FAQItem 
              question="How many topics are covered per week?" 
              answer="Each week covers one focused topic or concept — broken into daily lessons, practice, and a Friday test. This ensures deep understanding rather than surface-level coverage."
              isOpen={openFaq === 1}
              onClick={() => setOpenFaq(openFaq === 1 ? -1 : 1)}
            />
            <FAQItem 
              question="Can my child join mid-year?" 
              answer="Absolutely. We conduct a short diagnostic assessment to identify where your child stands, then onboard them smoothly into the right module without disrupting their progress — ideal for those searching for a maths institute near me."
              isOpen={openFaq === 2}
              onClick={() => setOpenFaq(openFaq === 2 ? -1 : 2)}
            />
            <FAQItem 
              question="What if my child misses a class?" 
              answer="Every live class is recorded and made available in the student app within a few hours. No class is ever truly missed."
              isOpen={openFaq === 3}
              onClick={() => setOpenFaq(openFaq === 3 ? -1 : 3)}
            />
            <FAQItem 
              question="Is this curriculum suitable for board exam preparation?" 
              answer="Yes — especially for Class 10. Our structured approach from Class 6 builds a strong foundation, and our Class 9–10 curriculum is specifically designed around board exam patterns."
              isOpen={openFaq === 4}
              onClick={() => setOpenFaq(openFaq === 4 ? -1 : 4)}
            />
          </div>
        </div>
      </section>

      {/* SECTION 8 — BOTTOM CTA */}
      <section className="py-24 bg-gradient-to-br from-navy to-primary relative overflow-hidden">
        {/* Floating Symbols */}
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
          <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-6">Find the Right Class for Your Child</h2>
          <p className="text-white/75 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Book a free demo and we will guide you to the perfect starting point for our maths classes in Gurgaon.
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
        @keyframes flow-dot {
          0% { left: 0; width: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; width: 20px; opacity: 0; }
        }
        .animate-flow-dot {
          animation: flow-dot 3s infinite linear;
          width: 20px;
          height: 2px;
          border-radius: 999px;
          box-shadow: 0 0 10px #1251AA;
        }
        @keyframes width-reveal {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-width-reveal {
          animation: width-reveal 1.5s ease-out forwards;
        }
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px 10px rgba(245, 166, 35, 0); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite ease-in-out;
        }
        .animate-reveal {
          animation: reveal 0.6s ease-out forwards;
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
