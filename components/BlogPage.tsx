'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  BookOpen, 
  Target, 
  Clock, 
  User, 
  ArrowRight, 
  Mail, 
  Bell, 
  Sparkles, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Article {
  id: string;
  category: 'Math Tips' | 'Study Strategies' | 'Exam Prep';
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags?: string[];
  badge?: string;
  size: 'wide' | 'tall' | 'normal';
}

// --- Mock Data ---
const ARTICLES: Article[] = [
  {
    id: '1',
    category: 'Math Tips',
    title: "5 Mental Math Tricks Every Class 8 Student Should Know",
    excerpt: "Speed up your calculations and impress your teachers — these tricks work for every exam from school tests to competitive papers.",
    author: "Mitali",
    date: "March 15, 2025",
    readTime: "5 min",
    tags: ["Mental Math", "Speed Tricks", "Class 8"],
    size: 'wide'
  },
  {
    id: '2',
    category: 'Exam Prep',
    title: "The Ultimate 30-Day Revision Plan for Class 10 Maths Board Exam",
    excerpt: "A day-by-day structured revision schedule that covers every chapter — designed by Mitali based on NCERT weightage and past paper patterns.",
    author: "Mitali",
    date: "March 10, 2025",
    readTime: "12 min",
    tags: ["Class 10", "Board Exam", "Revision Plan"],
    badge: "Most Popular 🔥",
    size: 'tall'
  },
  {
    id: '3',
    category: 'Study Strategies',
    title: "Why Your Child Forgets What They Studied — And How to Fix It",
    excerpt: "The forgetting curve is real. Here is the science behind retention and a simple weekly revision habit that actually works.",
    author: "Mitali",
    date: "March 5, 2025",
    readTime: "6 min",
    size: 'normal'
  },
  {
    id: '4',
    category: 'Math Tips',
    title: "Geometry Made Easy — 10 Theorems You Must Know for Class 9",
    excerpt: "These 10 theorems appear in almost every Class 9 exam. Master them and geometry stops being intimidating.",
    author: "Mitali",
    date: "Feb 28, 2025",
    readTime: "7 min",
    size: 'normal'
  },
  {
    id: '5',
    category: 'Study Strategies',
    title: "How to Make a Study Timetable That You Will Actually Follow",
    excerpt: "Most timetables fail because they are unrealistic. Here is a framework for building one that works around your child's school schedule.",
    author: "Mitali",
    date: "Feb 20, 2025",
    readTime: "5 min",
    size: 'normal'
  },
  {
    id: '6',
    category: 'Exam Prep',
    title: "Class 9 Maths — Chapter-by-Chapter Weightage and What to Prioritize First",
    excerpt: "Not all chapters carry equal marks. Here is the data-backed priority order every Class 9 student should know before their exams begin.",
    author: "Mitali",
    date: "Feb 15, 2025",
    readTime: "9 min",
    tags: ["Class 9", "Exam Prep", "Chapter Weightage"],
    badge: "Editor's Pick ⭐",
    size: 'wide'
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

const ArticleCard = ({ article, index }: { article: Article, index: number, key?: React.Key }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const categoryColors = {
    'Math Tips': 'bg-primary',
    'Study Strategies': 'bg-green',
    'Exam Prep': 'bg-gold'
  };

  const categoryPillColors = {
    'Math Tips': 'bg-primary/10 text-primary',
    'Study Strategies': 'bg-green/10 text-green',
    'Exam Prep': 'bg-gold/10 text-gold'
  };

  return (
    <div 
      ref={cardRef}
      className={`group bg-white rounded-[24px] border border-ice-blue shadow-sm hover:shadow-xl hover:border-primary hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full relative ${
        article.size === 'wide' ? 'md:col-span-2' : article.size === 'tall' ? 'md:row-span-2' : ''
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Top Category Strip */}
      <div className={`h-1 w-full ${categoryColors[article.category]}`}></div>
      
      {/* Watermarks for specific cards */}
      {article.id === '1' && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[12rem] font-bold text-ice-blue/40 pointer-events-none select-none z-0">∑</div>}
      {article.id === '4' && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[12rem] font-bold text-ice-blue/40 pointer-events-none select-none z-0">π</div>}

      {/* Tall card visual portion */}
      {article.size === 'tall' && (
        <div className="bg-gradient-to-b from-[#FFF8EC] to-white p-8 flex flex-col items-center justify-center text-center border-b border-ice-blue">
          <div className="text-7xl mb-4 animate-float-slow">🎯</div>
          <span className="text-gold font-bold text-[10px] tracking-widest uppercase">Exam Ready</span>
        </div>
      )}

      {/* Wide card visual portion (Card F) */}
      {article.id === '6' && (
        <div className="absolute right-0 top-0 bottom-0 w-[35%] bg-[#FFF8EC] hidden md:flex flex-col items-center justify-center p-6 border-l border-ice-blue">
          <div className="space-y-4 w-full">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex items-center gap-3">
                 <div className="w-5 h-5 bg-white border-2 border-gold rounded flex items-center justify-center">
                   <div className="w-2.5 h-2.5 bg-gold rounded-sm"></div>
                 </div>
                 <div className="h-2 bg-gold/20 rounded-full flex-grow"></div>
               </div>
             ))}
          </div>
        </div>
      )}

      <div className={`p-8 flex flex-col flex-grow relative z-10 ${article.id === '6' ? 'md:w-[65%]' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${categoryPillColors[article.category]}`}>
            {article.category}
          </span>
          <div className="flex items-center gap-1.5 text-slate-gray text-[10px] font-medium">
            <Clock className="w-3 h-3" /> {article.readTime}
          </div>
        </div>

        {article.badge && (
          <div className="mb-3">
            <span className="bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
              {article.badge}
            </span>
          </div>
        )}

        <h3 className="font-display text-xl md:text-2xl text-navy font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
          {article.title}
        </h3>
        
        <p className="text-slate-gray text-sm leading-relaxed mb-6 flex-grow">
          {article.excerpt}
        </p>

        {article.tags && (
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map(tag => (
              <span key={tag} className="bg-ice-blue text-primary text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-6 border-t border-ice-blue flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-xs">
              {article.author[0]}
            </div>
            <div>
              <p className="text-[10px] font-bold text-navy">{article.author}</p>
              <p className="text-[9px] text-slate-gray">{article.date}</p>
            </div>
          </div>
          <Link href={`/blog/${article.id}`} className="text-primary font-bold text-xs flex items-center gap-1 group/link">
            Read More <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function BlogPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

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
            <span className="text-white">Blog and Resources</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-medium mb-8">
            <span>✦</span> Math Tips. Study Strategies. Exam Prep.
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-8 max-w-4xl mx-auto">
            Resources That Actually Help Your Child <span className="relative inline-block">
              Excel.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Practical tips, proven strategies and expert guidance — for students in Class 6–10 and parents looking for real, result-driven learning support through maths coaching in Gurgaon.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "📐 Math Tips and Tricks", color: "hover:shadow-blue-500/40" },
              { label: "📚 Study Strategies", color: "hover:shadow-green-500/40" },
              { label: "🎯 Exam Preparation", color: "hover:shadow-gold-500/40" }
            ].map((chip, i) => (
              <div 
                key={i} 
                className={`bg-white/10 border border-white/20 backdrop-blur-md px-6 py-2.5 rounded-full text-white text-sm font-bold transition-all duration-300 cursor-pointer ${chip.color} hover:bg-white/20`}
              >
                {chip.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — FEATURED ARTICLE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Featured Article</span>
          </div>

          <div className="max-w-6xl mx-auto bg-white rounded-[28px] overflow-hidden shadow-[0_24px_80px_rgba(18,81,170,0.15)] border border-ice-blue animate-reveal">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Side — Visual Panel */}
              <div className="lg:col-span-7 bg-gradient-to-br from-navy via-primary to-blue-600 p-10 md:p-16 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                <div className="absolute inset-0 z-0 opacity-10">
                   <FloatingSymbol symbol="＋" size="3rem" top="10%" left="10%" delay="0s" duration="8s" rotation="0deg" />
                   <FloatingSymbol symbol="√" size="5rem" top="60%" left="80%" delay="2s" duration="10s" rotation="15deg" />
                   <FloatingSymbol symbol="π" size="4rem" top="20%" left="70%" delay="1s" duration="7s" rotation="-10deg" />
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  <span className="bg-gold/20 border border-gold/40 text-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                    🎯 Exam Preparation
                  </span>
                  <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
                    8 min read
                  </span>
                </div>

                <div className="relative z-10 py-12 text-center">
                  <div className="font-display text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-none">
                    <span className="italic opacity-80">x</span> = 
                    <div className="inline-flex flex-col align-middle mx-2">
                      <span className="border-b-2 border-white pb-1">−b ± √(b²−4ac)</span>
                      <span className="pt-1">2a</span>
                    </div>
                  </div>
                  <div className="w-10 h-0.5 bg-gold mx-auto mt-8"></div>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-xl shadow-lg">
                    M
                  </div>
                  <div>
                    <p className="text-white font-bold">By Mitali</p>
                    <p className="text-white/60 text-xs">Founder, My Learning Planet</p>
                  </div>
                </div>
              </div>

              {/* Right Side — Content */}
              <div className="lg:col-span-5 p-10 md:p-12 flex flex-col justify-center">
                <span className="bg-ice-blue text-primary px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-6">
                  March 2025
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-navy font-bold mb-6 leading-tight">
                  How to Crack Class 10 Board Maths — A Complete Exam Strategy Guide
                </h2>
                <p className="text-slate-gray leading-relaxed mb-8">
                  The difference between a 70 and a 95 in board exams is not intelligence — it is strategy. Here is exactly how to prepare.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  {["✓ Chapter Priority List", "✓ Time Management", "✓ Last 30 Days Plan"].map(item => (
                    <span key={item} className="bg-ice-blue text-primary px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {item}
                    </span>
                  ))}
                </div>

                <Link href="/blog/class-10-strategy"
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold text-center shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-300"
                >
                  Read Full Article →
                </Link>
                <p className="mt-4 text-center text-[10px] text-slate-gray font-medium">
                  📖 8 min read · 1,240 words
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — BENTO GRID */}
      <section className="py-24 bg-gradient-to-b from-ice-blue/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">All Articles</span>
            <h2 className="font-display text-4xl md:text-5xl text-navy font-bold mb-4">Explore Our Full Library</h2>
            <p className="text-slate-gray max-w-2xl mx-auto">Practical knowledge written by Mitali — for students in Classes 6–10 and their parents.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {ARTICLES.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — CATEGORY SPOTLIGHT */}
      <section className="py-24 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-white/50 font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Explore by Category</span>
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold">Find What You Need</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Category 1 */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[24px] p-10 text-center hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <span className="bg-white/10 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                2 Articles
              </span>
              <h3 className="font-display text-2xl text-white font-bold mb-4">Math Tips and Tricks</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Shortcuts, mental math techniques and clever tricks that make calculations faster and exams easier.
              </p>
              <button className="w-full border border-white/30 text-white py-3 rounded-full font-bold text-sm hover:bg-white hover:text-navy transition-all">
                Explore Articles →
              </button>
            </div>

            {/* Category 2 — Featured */}
            <div className="bg-white/10 border border-gold/40 backdrop-blur-md rounded-[24px] p-10 text-center relative hover:bg-white/15 hover:-translate-y-2 transition-all duration-300 group shadow-2xl shadow-gold/10">
              <div className="absolute top-0 left-0 right-0 bg-gold text-navy text-[10px] font-bold uppercase tracking-widest py-2 rounded-t-[24px]">
                Most Read
              </div>
              <div className="w-20 h-20 bg-gold/20 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <span className="bg-white/10 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                2 Articles
              </span>
              <h3 className="font-display text-2xl text-white font-bold mb-4">Study Strategies</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Proven study frameworks, timetable methods and retention techniques that actually help students learn.
              </p>
              <button className="w-full bg-gold text-navy py-3 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-gold/20">
                Explore Articles →
              </button>
            </div>

            {/* Category 3 */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[24px] p-10 text-center hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-20 h-20 bg-green/20 border border-green/40 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-10 h-10 text-white" />
              </div>
              <span className="bg-white/10 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                2 Articles
              </span>
              <h3 className="font-display text-2xl text-white font-bold mb-4">Exam Preparation</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Revision plans, chapter weightage guides and exam-day strategies for total confidence.
              </p>
              <button className="w-full border border-white/30 text-white py-3 rounded-full font-bold text-sm hover:bg-white hover:text-navy transition-all">
                Explore Articles →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — NEWSLETTER */}
      <section className="py-24 bg-gradient-to-br from-primary to-navy relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
           {heroSymbols.slice(0, 6).map((sym, i) => (
            <FloatingSymbol key={i} {...sym} />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-navy shadow-xl">
                <Bell className="w-8 h-8" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-white font-bold leading-tight">
                Get New Articles Straight to Your Inbox.
              </h2>
              <p className="text-white/75 text-lg leading-relaxed">
                Join 500+ parents and students who get our weekly math tips, study strategies and exam guides — free, forever.
              </p>
              <div className="flex flex-wrap gap-6">
                {["✓ Weekly articles", "✓ No spam ever", "✓ Unsubscribe anytime"].map(item => (
                  <span key={item} className="text-white/70 text-sm font-medium">{item}</span>
                ))}
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-[28px] p-8 md:p-12 shadow-2xl">
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-6">
                  <p className="text-white font-bold text-lg mb-2">Subscribe — It's Free</p>
                  <div className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input 
                        type="email" 
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/15 border border-white/25 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-gold text-navy font-bold py-4 rounded-xl shadow-xl shadow-gold/20 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                    >
                      <span className="relative z-10">✦ Get Free Articles</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                    </button>
                  </div>
                  <p className="text-white/50 text-[10px] text-center">
                    No spam. Unsubscribe anytime. We respect your inbox.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8 animate-reveal">
                  <div className="w-20 h-20 bg-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">🎉 You are subscribed!</h3>
                  <p className="text-white/70">Check your inbox for a welcome gift from Mitali.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — TIP OF THE WEEK */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-ice-blue to-[#F0F5FF] rounded-[28px] border-2 border-primary p-10 md:p-16 relative overflow-hidden shadow-[0_8px_40px_rgba(18,81,170,0.12)]">
            <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 text-[10rem] opacity-[0.08] pointer-events-none select-none">💡</div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              <div className="lg:col-span-8 space-y-6">
                <span className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  💡 Tip of the Week
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-navy font-bold">
                  The 2-Minute Rule for Math Homework.
                </h2>
                <p className="text-charcoal leading-relaxed text-lg">
                  "If a math problem takes less than 2 minutes — do it immediately. Do not add it to a list. Do not skip it. Instant action on small problems builds the habit of not avoiding math. It sounds simple because it is — and it works every time."
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                    M
                  </div>
                  <div>
                    <p className="text-navy font-bold">Mitali</p>
                    <p className="text-slate-gray text-xs">Founder, My Learning Planet</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="w-48 h-48 rounded-full border-[6px] border-primary bg-white flex items-center justify-center relative shadow-2xl">
                  <div className="text-center">
                    <p className="font-display text-5xl text-navy font-bold">2:00</p>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Minutes</p>
                  </div>
                  {/* Tick marks */}
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-1 h-3 bg-primary/20 rounded-full" 
                      style={{ transform: `rotate(${i * 30}deg) translateY(-80px)` }}
                    ></div>
                  ))}
                </div>
                <div className="mt-8 bg-[#FFF8EC] border border-gold/30 text-gold px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  🔥 This week's most saved tip
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — BOTTOM CTA */}
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
          <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-6">Ready to See Structure in Action?</h2>
          <p className="text-white/75 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
            Reading tips is great. Experiencing our system is better. Book a free demo and see the difference structured math learning makes with our maths classes in Gurgaon.
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
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
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
