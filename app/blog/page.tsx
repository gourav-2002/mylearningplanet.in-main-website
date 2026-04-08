import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ChevronRight,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Maths Coaching in Gurgaon | Tips, Guides & Learning Resources',

  description:
    'Looking for maths coaching in Gurgaon? Explore expert tips, study guides, and strategies by My Learning Planet to support maths classes in Gurgaon for Class 6–10 students.',

  keywords: [
    'maths coaching in gurgaon',
    'maths classes in gurgaon',
    'math study tips',
    'math learning resources',
    'online maths learning guides',
    'class 6 to 10 maths help'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.in/blog',
  },

  openGraph: {
    title: 'Maths Coaching in Gurgaon | My Learning Planet Blog',

    description:
      'Explore maths tips, guides, and expert strategies to support students in maths classes in Gurgaon with better learning outcomes.',

    url: 'https://www.mylearningplanet.in/blog',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Maths Coaching in Gurgaon | Blog',

    description:
      'Math tips, guides, and learning strategies for students in Gurgaon to improve performance in maths.',
  },
}

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

export default function Blog() {
  return (
    <div className="overflow-x-hidden font-sans bg-white">
      {/* SECTION 1 — HERO (Preserved design) */}
      <section className="relative bg-gradient-to-br from-[#0A1F5E] to-[#1251AA] py-24 md:py-32 overflow-hidden">
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
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F5A623]" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-sans">
            Practical tips, proven strategies and expert guidance — for students in Class 6–10 and parents looking for real, result-driven learning support.
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

      {/* SECTION 2 — LATEST INSIGHTS (New Cards Layout) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-[#5A6B82] font-bold text-sm tracking-[0.2em] uppercase mb-4 block">FROM OUR EDUCATORS</span>
            <div className="relative inline-block">
              <h2 className="font-display text-4xl md:text-5xl text-[#0A1F5E] font-bold pb-2">Latest Insights</h2>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F5A623] rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-white/30 animate-shimmer scale-x-150"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

            {/* Card 3: 10 Questions Daily */}
            <Link href="/blog/10-questions-daily-vs-3-hours-study" className="group flex flex-col lg:flex-row bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="lg:w-2/5 relative min-h-[200px] lg:min-h-full overflow-hidden bg-gradient-to-br from-[#0A1F5E] to-[#1251AA] flex items-center justify-center">
                <img
                  src="/10-questions-daily-vs-3-hours-study.webp"
                  alt="Why Your Child Keeps Forgetting Math Concepts"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="lg:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#5A6B82] text-[10px] font-bold uppercase tracking-tight mb-3">
                    <span>April 8, 2026</span>
                    <span className="text-[#F5A623]">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 6 min read
                    </div>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-[#0A1F5E] font-bold mb-3 leading-tight group-hover:text-[#1251AA] transition-colors line-clamp-2">
                    Why Solving 10 Questions Daily Beats 3 Hours of Cramming
                  </h3>
                  <p className="text-[#5A6B82] text-sm leading-relaxed mb-6 line-clamp-3 font-sans">
                    Struggling with 10th CBSE maths? Daily practice beats marathon study sessions — here's the science behind it and a practical plan to follow.
                  </p>
                </div>
                <div className="text-[#1251AA] text-xs font-bold flex items-center gap-1 uppercase group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>

            {/* Card 1: Why Child Forgets Math Concepts */}
            <Link href="/blog/why-child-forgets-math-concepts" className="group flex flex-col lg:flex-row bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="lg:w-2/5 relative min-h-[200px] lg:min-h-full overflow-hidden">
                <img
                  src="/why-child-forgets-math-concepts.webp"
                  alt="Why Your Child Keeps Forgetting Math Concepts"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <span className="absolute top-4 left-4 bg-[#EAF1FF] text-[#1251AA] px-3 py-1 rounded-full text-[10px] font-bold shadow-sm uppercase tracking-wider z-10">Study Tips</span>
              </div>
              <div className="lg:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#5A6B82] text-[10px] font-bold uppercase tracking-tight mb-3">
                    <span>April 1, 2026</span>
                    <span className="text-[#F5A623]">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 8 min read
                    </div>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-[#0A1F5E] font-bold mb-3 leading-tight group-hover:text-[#1251AA] transition-colors line-clamp-2">
                    Why Your Child Keeps Forgetting Math Concepts (And How Structure Fixes It)
                  </h3>
                  <p className="text-[#5A6B82] text-sm leading-relaxed mb-6 line-clamp-3 font-sans">
                    Most students understand the chapter in class — but forget it by exam day. Here's why that happens and how a structured system fixes it permanently.
                  </p>
                </div>
                <div className="text-[#1251AA] text-xs font-bold flex items-center gap-1 uppercase group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>

            {/* Card 2: Gurgaon Parent Guide */}
            <Link href="/blog/gurgaon-parent-guide-math-coaching-2026" className="group flex flex-col lg:flex-row bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="lg:w-2/5 relative min-h-[200px] lg:min-h-full overflow-hidden">
                <img
                  src="/gurgaon-parent-guide-math-coaching-2026.webp"
                  alt="The Gurgaon Parent's Guide"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <span className="absolute top-4 left-4 bg-[#EAF1FF] text-[#1251AA] px-3 py-1 rounded-full text-[10px] font-bold shadow-sm uppercase tracking-wider z-10">Parent Guide</span>
              </div>
              <div className="lg:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#5A6B82] text-[10px] font-bold uppercase tracking-tight mb-3">
                    <span>April 1, 2026</span>
                    <span className="text-[#F5A623]">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 7 min read
                    </div>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-[#0A1F5E] font-bold mb-3 leading-tight group-hover:text-[#1251AA] transition-colors line-clamp-2">
                    The Gurgaon Parent's Guide to Choosing the Right Math Coaching in 2026
                  </h3>
                  <p className="text-[#5A6B82] text-sm leading-relaxed mb-6 line-clamp-3 font-sans">
                    More coaching options than ever — but how do you choose the right one? A practical checklist built specifically for Gurgaon parents in 2026.
                  </p>
                </div>
                <div className="text-[#1251AA] text-xs font-bold flex items-center gap-1 uppercase group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* SECTION 3 — CTA BANNER */}
      <section className="py-20 bg-[#0A1F5E] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-[#F5A623] opacity-20 animate-pulse">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-6 inline-block bg-[#F5A623]/20 p-3 rounded-full">
            <Sparkles className="w-8 h-8 text-[#F5A623]" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-white font-bold mb-6">Ready to See Structure in Action?</h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-sans leading-relaxed">
            Reading tips is great. Experiencing our system is better. Book a free demo and see the difference structured math learning makes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="w-full sm:w-auto bg-[#F5A623] text-[#0A1F5E] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-[#F5A623]/20 flex items-center justify-center gap-2">
              ✦ Book a Free Demo
            </Link>
            <Link href="/curriculum" className="w-full sm:w-auto border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#0A1F5E] transition-all flex items-center justify-center gap-2 group">
              View Curriculum <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="mt-8 text-white/50 text-sm font-medium tracking-wide">
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
          animation: float-slow 6s infinite ease-in-out;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}