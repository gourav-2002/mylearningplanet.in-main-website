import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Clock, Calendar, User, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: "The Gurgaon Parent's Guide to Choosing the Right Math Coaching in 2026 | My Learning Planet",
  description: "In 2026, Gurgaon parents have more coaching options than ever. Use our comprehensive checklist to find a structured math programme that delivers results for your child.",
  keywords: [
    'math coaching in gurgaon',
    'best math classes for class 6-10 in gurgaon',
    'choosing math coaching centre',
    'gurgaon parent guide education',
    'structured math learning gurgaon',
    'My Learning Planet Gurgaon'
  ],
  alternates: {
    canonical: 'https://www.mylearningplanet.in/blog/gurgaon-parent-guide-math-coaching-2026',
  },
}

export default function GurgaonParentGuide() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Breadcrumb Section */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-50">
        <ol className="flex items-center space-x-2 text-sm text-slate-gray">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <ChevronRight className="h-4 w-4" />
          <li>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </li>
          <ChevronRight className="h-4 w-4 text-slate-gray" />
          <li className="text-navy font-medium truncate max-w-[200px] sm:max-w-none uppercase tracking-tighter">
            The Gurgaon Parent's Guide (2026)
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-ice-blue text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Parent Guide
            </span>
            <div className="flex items-center text-slate-gray text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>7 min read</span>
            </div>
            <div className="flex items-center text-slate-gray text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>April 1, 2026</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-navy leading-tight mb-8">
            The Gurgaon Parent's Guide to Choosing the Right Math Coaching in 2026
          </h1>

          {/* Hero Image Placeholder with Gradient */}
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left Column: Blog Content */}
          <article className="lg:w-2/3">
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-p:text-slate-gray prose-p:leading-relaxed">

              {/* Image Placeholder matching the first blog post update */}
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl mb-12">
                <img
                  src="/gurgaon-parent-guide-math-coaching-2026.webp"
                  alt="Parents discussing education options"
                  className="w-full h-full"
                />
              </div>

              <blockquote className="border-l-4 border-gold bg-ice-blue/30 px-8 py-6 my-10 italic text-navy text-xl leading-relaxed">
                "In 2026, Gurgaon parents have more coaching options than ever before. More options should mean better outcomes — but for most families, it just means more confusion."
              </blockquote>

              <p className="text-xl font-medium text-navy/80 mb-8 font-sans">
                DLF, Sushant Lok, Sector 56, South City — every neighbourhood in Gurgaon now has at least three or four math coaching options within walking distance. Add to that the flood of online platforms, YouTube tutors, and app-based learning tools, and the decision becomes genuinely overwhelming. This guide cuts through the noise with a clear, honest checklist — built specifically for Gurgaon parents in 2026.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-navy">Why 2026 Is Different</h2>

              <p>
                The post-COVID coaching landscape in Gurgaon has changed dramatically. Parents today are more aware, more demanding, and less willing to pay for coaching that doesn't show measurable results. At the same time, a new generation of structured, tech-enabled platforms has emerged — offering something traditional coaching centres never could: full transparency into what your child is learning, week by week.
              </p>

              <p className='mt-4'>
                The challenge is knowing how to separate genuine quality from good marketing. Any centre can promise "best results" and "expert faculty." Very few can show you a structured weekly curriculum, a parent dashboard, and consistent assessment data before you even enroll.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-navy line-clamp-1">The 2026 Gurgaon Parent Checklist</h2>

              <ul className="space-y-4 my-8 list-none pl-0">
                <li className="flex items-start gap-4 text-slate-gray">
                  <CheckCircle2 className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <span>Does the coaching centre share a written weekly syllabus upfront?</span>
                </li>
                <li className="flex items-start gap-4 text-slate-gray">
                  <CheckCircle2 className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <span>Are tests conducted on a fixed, regular schedule — not just before exams?</span>
                </li>
                <li className="flex items-start gap-4 text-slate-gray">
                  <CheckCircle2 className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <span>Can you as a parent track your child's progress in real time?</span>
                </li>
                <li className="flex items-start gap-4 text-slate-gray">
                  <CheckCircle2 className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <span>Is the teaching methodology standardised — or does it depend entirely on one teacher's style?</span>
                </li>
                <li className="flex items-start gap-4 text-slate-gray">
                  <CheckCircle2 className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <span>Are previous topics systematically revised, or is each class standalone?</span>
                </li>
                <li className="flex items-start gap-4 text-slate-gray">
                  <CheckCircle2 className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <span>Is there a clear parent communication system beyond WhatsApp forwards?</span>
                </li>
                <li className="flex items-start gap-4 text-slate-gray">
                  <CheckCircle2 className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <span>Does the centre offer both online and offline flexibility?</span>
                </li>
                <li className="flex items-start gap-4 text-slate-gray">
                  <CheckCircle2 className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <span>Is pricing transparent with no hidden fees?</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-navy">Red Flags to Watch Out For</h2>

              <ul className="space-y-4 my-8 list-disc pl-6 text-slate-gray">
                <li><strong>"We follow the school syllabus"</strong> with no further detail — vague and unaccountable</li>
                <li><strong>No structured test schedule</strong> — means no real assessment of your child's progress</li>
                <li><strong>Teacher changes frequently</strong> — sign of poor systems, over-dependence on individuals</li>
                <li><strong>No parent reporting beyond occasional calls</strong> — you're flying blind</li>
                <li><strong>Discount pressure tactics during admission</strong> — focus on enrollment, not outcomes</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-navy">What Good Math Coaching Actually Delivers in 2026</h2>

              <p>
                The best math coaching in Gurgaon in 2026 is not about the fanciest classroom or the most Instagram-worthy study centre. It is about systems. A pre-defined curriculum. Weekly tests. Monthly evaluations. A parent dashboard that shows you exactly where your child stands — not just "doing well" or "needs improvement" but actual data, actual topics, actual trends.
              </p>

              <p className='mt-4'>
                When a centre invests in building these systems, it signals something important: they are accountable to outcomes, not just attendance.
              </p>

              {/* Important to Know Box */}
              <div className="my-10 bg-gradient-to-r from-navy to-primary p-8 rounded-2xl text-white shadow-xl">
                <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-gold" />
                  The Gurgaon Standard Is Rising
                </h3>
                <p className="text-white/90 leading-relaxed italic">
                  Parents in Gurgaon are among the most informed in India when it comes to their children's education. In 2026, settling for unstructured coaching is a choice — not a necessity. Structured, trackable, tech-enabled math learning is now available locally.
                </p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-navy">Questions to Ask Before You Enroll</h2>

              <ul className="space-y-4 my-8 list-disc pl-6 text-slate-gray">
                <li>Can I see the full year curriculum before paying?</li>
                <li>How will I receive weekly updates on my child's progress?</li>
                <li>What happens if my child misses a class — is there a catch-up system?</li>
                <li>How are tests structured and how are results shared with parents?</li>
                <li>What is your batch size and how is individual attention ensured?</li>
              </ul>

              <p className="mt-12 text-navy/90 font-medium italic">
                Choosing math coaching in Gurgaon in 2026 should not be a leap of faith. With the right checklist, the right questions, and the right expectations, you can find a programme that genuinely moves the needle for your child — not just one that keeps them busy for two hours every evening.
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
                <p className="text-slate-gray text-sm leading-relaxed">
                  Mitali leads curriculum design and live classes at My Learning Planet, Gurgaon. She has helped hundreds of Class 6–10 students build structured, lasting math foundations.
                </p>
              </div>



              {/* CTA Card */}
              <div className="bg-primary p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BookOpen className="h-24 w-24 transform group-hover:rotate-12 transition-transform" />
                </div>
                <h4 className="text-2xl font-display font-bold mb-4 relative z-10">See What Structured Math Coaching Looks Like</h4>
                <p className="text-white/80 mb-8 text-sm leading-relaxed relative z-10">
                  My Learning Planet offers Gurgaon parents full curriculum visibility, weekly tests, and a real-time parent dashboard — all at ₹4,000/month.
                </p>
                <Link
                  href="/contact"
                  className="bg-white text-primary px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gold hover:text-navy transition-all shadow-lg relative z-10"
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
