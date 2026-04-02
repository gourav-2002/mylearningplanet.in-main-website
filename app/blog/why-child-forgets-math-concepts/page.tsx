import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Clock, Calendar, User, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Why Your Child Keeps Forgetting Math Concepts (And How Structure Fixes It) | My Learning Planet',
  description: "Does your child forget math concepts as soon as the test arrives? Learn why an unstructured learning system is to blame and how My Learning Planet's structured approach fixes it.",
  keywords: [
    'child forgetting math',
    'math learning retention',
    'structured mathematics programme',
    'math study tips for kids',
    'forgetting curve in mathematics',
    'My Learning Planet'
  ],
  alternates: {
    canonical: 'https://www.mylearningplanet.com/blog/why-child-forgets-math-concepts',
  },
}

export default function BlogPost() {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Section */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ol className="flex items-center space-x-2 text-sm text-slate-gray font-sans">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <ChevronRight className="h-4 w-4" />
          <li>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </li>
          <ChevronRight className="h-4 w-4 text-slate-gray" />
          <li className="text-navy font-medium truncate max-w-[200px] sm:max-w-none">
            Why Your Child Keeps Forgetting Math Concepts
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-ice-blue text-primary px-3 py-1 rounded-full text-xs font-bold font-sans uppercase tracking-wider">
              Study Tips
            </span>
            <div className="flex items-center text-slate-gray text-sm font-sans">
              <Clock className="h-4 w-4 mr-1" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center text-slate-gray text-sm font-sans">
              <Calendar className="h-4 w-4 mr-1" />
              <span>April 1, 2026</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-navy leading-tight mb-8">
            Why Your Child Keeps Forgetting Math Concepts (And How Structure Fixes It)
          </h1>


        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-16">


          {/* Left Column: Blog Content */}
          <article className="lg:w-2/3">
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-p:font-sans prose-p:text-slate-gray prose-p:leading-relaxed">

              <div className="w-full rounded-2xl overflow-hidden shadow-2xl mb-12">
                <img
                  src="/why-child-forgets-math-concepts.jpg"
                  alt="Math concept illustration"
                  className="w-full h-full"
                />
              </div>
              <blockquote className="border-l-4 border-gold bg-ice-blue/30 px-8 py-6 my-10 italic text-navy font-sans text-xl leading-relaxed">
                "Every parent has faced this moment — your child understood the chapter perfectly last week. Then the test arrives, and it's like they never studied it at all."
              </blockquote>

              <p className="text-xl font-medium text-navy/80 mb-8 font-sans">
                It's one of the most frustrating experiences in a child's academic journey. They sit through class. They do the homework. They even say "I get it." But when exam day comes, the concepts vanish. Parents blame the child. The child feels defeated. And the real problem — an unstructured learning system — goes unaddressed.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">The Real Reason Forgetting Happens</h2>

              <p>
                The human brain doesn't retain information just because it was taught once. Memory consolidation requires spaced repetition, retrieval practice, and connected learning. Most coaching centres teach a topic, move on, and never return to it systematically. This creates what learning scientists call the "forgetting curve" — knowledge decays rapidly without reinforcement.
              </p>

              <p>
                When there's no fixed roadmap, no weekly revision plan, and no assessment tied back to previous concepts, students build knowledge on sand. Each new chapter feels disconnected from the last.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-navy">The 3 Signs Your Child's Coaching Lacks Structure</h2>

              <ul className="space-y-4 my-8 list-none pl-0">
                <li className="flex items-start gap-3 text-slate-gray font-sans">
                  <CheckCircle2 className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <span>No clear weekly syllabus shared with parents</span>
                </li>
                <li className="flex items-start gap-3 text-slate-gray font-sans">
                  <CheckCircle2 className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <span>Tests happen randomly, not on a fixed schedule</span>
                </li>
                <li className="flex items-start gap-3 text-slate-gray font-sans">
                  <CheckCircle2 className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <span>Previous topics are never revisited or linked to new ones</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-navy">What Structured Learning Actually Looks Like</h2>

              <p>
                A structured mathematics programme defines exactly what will be taught each week, how it connects to previous concepts, and when it will be assessed. Parents know the roadmap. Students know what's coming. And teachers are accountable to a system — not just their mood on a given day.
              </p>

              {/* Important to Know Box */}
              <div className="my-10 bg-gradient-to-r from-navy to-primary p-8 rounded-2xl text-white shadow-xl">
                <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-gold" />
                  The Structured Difference
                </h3>
                <p className="text-white/90 leading-relaxed font-sans italic">
                  At My Learning Planet, every student follows a pre-defined weekly curriculum. Topics are introduced, practised, tested, and revised in a deliberate cycle — so concepts move from short-term memory to long-term retention.
                </p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-navy">How Parents Can Help Right Now</h2>

              <ul className="space-y-4 my-8 list-none pl-0 font-sans">
                <li className="flex items-start gap-3 text-slate-gray">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-sm mt-1 flex-shrink-0">1</span>
                  <span>Ask your child's teacher for a written weekly syllabus</span>
                </li>
                <li className="flex items-start gap-3 text-slate-gray">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-sm mt-1 flex-shrink-0">2</span>
                  <span>Ensure tests are happening at least weekly, not just before exams</span>
                </li>
                <li className="flex items-start gap-3 text-slate-gray">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-sm mt-1 flex-shrink-0">3</span>
                  <span>Check if previous topics are being revised regularly</span>
                </li>
                <li className="flex items-start gap-3 text-slate-gray">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-sm mt-1 flex-shrink-0">4</span>
                  <span>Look for a platform that gives you visibility into your child's actual progress — not just attendance</span>
                </li>
              </ul>

              <p className="mt-12 text-navy/90 font-medium font-sans">
                Forgetting is not a flaw in your child. It's a flaw in the system around them. When the system is fixed — when learning is structured, tracked, and consistent — retention improves dramatically. That's not a promise. That's how the brain works.
              </p>
            </div>
          </article>

          {/* Right Column: Sidebar (Sticky) */}
          <aside className="lg:w-1/3">
            <div className="sticky top-8 space-y-8">

              {/* Author Card */}
              <div className="bg-white border border-ice-blue p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold text-navy">Mitali</h4>
                    <p className="text-slate-gray text-sm">Lead Mathematics Educator</p>
                  </div>
                </div>
                <p className="text-slate-gray text-sm leading-relaxed font-sans">
                  Mitali leads all curriculum design and live classes at My Learning Planet. With a structured, concept-first teaching approach, she helps Class 6–10 students build lasting mathematical foundations.
                </p>
              </div>


              {/* CTA Card */}
              <div className="bg-primary p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BookOpen className="h-24 w-24 transform group-hover:rotate-12 transition-transform" />
                </div>
                <h4 className="text-2xl font-display font-bold mb-4 relative z-10">See How Structure Changes Everything</h4>
                <p className="text-white/80 mb-8 text-sm leading-relaxed font-sans relative z-10">
                  My Learning Planet uses a pre-defined weekly curriculum with tests, revision cycles, and parent tracking — built so your child never falls behind silently.
                </p>
                <Link
                  href="/contact"
                  className="bg-white text-primary px-6 py-3 rounded-xl font-bold font-sans flex items-center justify-center gap-2 hover:bg-gold hover:text-navy transition-all shadow-lg relative z-10"
                >
                  Book a Free Demo Class
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
