import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ChevronRight,
  Clock,
  Calendar,
  User,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Brain,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: "10th Maths Guide: Why Solving 10 Questions Daily Beats 3 Hours of Cramming | My Learning Planet",
  description:
    "Struggling with 10th CBSE maths? This 10th maths guide explains why solving just 10 questions daily builds stronger exam performance than 3-hour study marathons — with a practical daily plan inside.",
  keywords: [
    '10th maths guide',
    '10th cbse maths',
    '10th class trigonometry',
    'daily maths practice',
    'class 10 exam preparation',
    'maths study tips class 10',
    'My Learning Planet Gurgaon',
  ],
  alternates: {
    canonical:
      'https://www.mylearningplanet.in/blog/10-questions-daily-vs-3-hours-study',
  },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const questionSplit = [
  {
    type: 'Current chapter topic',
    count: '4–5',
    purpose: 'Stay on pace with syllabus',
  },
  {
    type: 'Previously covered chapter',
    count: '2–3',
    purpose: 'Spaced repetition, prevent forgetting',
  },
  {
    type: '10th class trigonometry / high-weightage topic',
    count: '2',
    purpose: 'Board exam priority',
  },
  {
    type: 'Application / word problem',
    count: '1',
    purpose: 'Builds real comprehension',
  },
]

const crammingTimeline = [
  {
    time: 'First 45 mins',
    icon: Zap,
    status: 'ok',
    label: 'Genuinely focused',
    detail: 'Some learning happens — energy is high, recall is active.',
  },
  {
    time: 'Next 60 mins',
    icon: TrendingUp,
    status: 'warn',
    label: 'Fatigue sets in',
    detail: 'Reading slows, retention drops sharply. Eyes on page, brain checked out.',
  },
  {
    time: 'Final 75 mins',
    icon: Brain,
    status: 'bad',
    label: 'Anxiety takes over',
    detail: 'Reading without absorbing. Starting fresh topics that can\'t consolidate overnight.',
  },
]

const highWeightageTopics = [
  {
    emoji: '📐',
    title: 'Real Numbers & Polynomials',
    body: 'These appear in both objective and descriptive sections. Daily practice on HCF/LCM problems and polynomial factorisation builds speed.',
  },
  {
    emoji: '📊',
    title: 'Quadratic Equations & Arithmetic Progressions',
    body: 'Heavy weightage in boards. Students who practice 2–3 AP or QE problems daily consistently outperform those who try to "finish the chapter" in one sitting.',
  },
  {
    emoji: '📐',
    title: '10th Class Trigonometry — The Chapter That Separates Toppers',
    body: '10th class trigonometry is where most students either gain big marks or lose them. Trigonometry is identity-based — students who see sin²θ + cos²θ = 1 and its derived forms every single day develop an instinct for which identity to apply and when. Students who cram them the night before mix them up under pressure.',
    highlight: true,
    tip: 'Daily tip: Pick one proof question and one application question from 10th class trigonometry every day for three weeks. Your speed and accuracy will be unrecognisable by the end.',
  },
  {
    emoji: '📊',
    title: 'Statistics & Probability',
    body: 'Often underestimated. These chapters offer guaranteed marks if practised regularly. The calculations are straightforward but easy to err in — daily repetition eliminates careless mistakes.',
  },
  {
    emoji: '📐',
    title: 'Coordinate Geometry & Mensuration',
    body: 'Formula-heavy. Daily practice here is less about understanding and more about speed and accuracy — you build that through repetition, not theory reading.',
  },
]

const weekOnePlan = [
  {
    days: 'Day 1–3',
    action:
      'Pick one chapter. Solve 10 questions from it daily. Start with NCERT exercises from your 10th maths guide — no pressure on difficulty yet.',
  },
  {
    days: 'Day 4–5',
    action:
      'Add a review round. Take 2 of your 10 questions from Day 1\'s chapter. You\'re now practising spaced repetition naturally.',
  },
  {
    days: 'Day 6–7',
    action:
      'Introduce a second chapter. Your 10 questions now span two topics and you have a real daily habit forming.',
  },
]

const faqs = [
  {
    q: 'Is 10 questions enough if my child is weak in maths?',
    a: 'Yes — in fact, for students who struggle, daily smaller doses are more important, not less. 10 manageable questions build confidence every day. Confidence is the foundation that harder problem-solving is built on. Pair this with structured coaching for the best results.',
  },
  {
    q: 'Which is better — NCERT or extra reference books?',
    a: 'Start with NCERT. For 10th CBSE maths, NCERT covers everything needed for board exams. Once you\'ve exhausted all NCERT exercises — which itself takes consistent daily practice — then add reference books. Most students never fully complete NCERT. Don\'t jump ahead prematurely.',
  },
  {
    q: 'How should I handle 10th class trigonometry if starting from scratch?',
    a: 'Begin with just the basic ratios and the Pythagorean identity. Spend the first three days only on these. Then introduce complementary angles. Build section by section, 2–3 questions per section daily. Never skip ahead in trigonometry — each concept builds directly on the last.',
  },
  {
    q: 'Can daily practice replace coaching?',
    a: 'Daily practice is the habit — coaching provides the structure. The best outcomes come when both work together. A good structured programme designs your weekly curriculum so your daily questions always align with what\'s coming next, preventing random practice and ensuring nothing is missed.',
  },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function DailyPracticeVsCramming() {
  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ── Breadcrumb ── */}
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
            10 Questions Daily vs 3 Hours Cramming
          </li>
        </ol>
      </nav>

      {/* ── Hero ── */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-ice-blue text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Study Strategy
            </span>
            <div className="flex items-center text-slate-gray text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center text-slate-gray text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>April 8, 2026</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-navy leading-tight mb-8">
            Why Solving 10 Questions Daily Beats Studying 3 Hours Before Exams — A 10th Maths Guide
          </h1>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* ── Article ── */}
          <article className="lg:w-2/3">
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-p:text-slate-gray prose-p:leading-relaxed">

              {/* Cover Image */}
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl mb-12">
                <img
                  src="/10-questions-daily-vs-3-hours-study.webp"
                  alt="Student solving maths questions daily at a desk — consistent practice for 10th CBSE maths"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Opening quote */}
              <blockquote className="border-l-4 border-gold bg-ice-blue/30 px-8 py-6 my-10 italic text-navy text-xl leading-relaxed">
                "Three hours of panic-studying the night before will never compete with ten focused questions solved every single day."
              </blockquote>

              {/* Intro */}
              <p className="text-xl font-medium text-navy/80 mb-8 font-sans">
                Every year, thousands of Class 10 students make the same mistake. They coast through the term, tell themselves they'll "start seriously" in February, and then spend the nights before board exams reading chapters they haven't touched since August. This 10th maths guide breaks down exactly why that approach fails — and what daily practice of just 10 questions actually does to your score.
              </p>

              {/* ── Section 1: Brain Science ── */}
              <h2 className="text-3xl font-bold mt-14 mb-6 text-navy">
                The Brain Science Behind Daily Practice vs. Last-Minute Cramming
              </h2>

              <p>
                When you solve a maths problem, your brain creates a neural pathway — a small groove in memory. Solve it once and the groove is shallow. Solve it again the next day, and it deepens. Solve it consistently over weeks, and that pathway becomes a superhighway: instant recall, pattern recognition, zero hesitation in the exam hall.
              </p>

              <p className='mt-4'>
                Last-minute cramming floods your brain with information it hasn't had time to process. You might recognise a formula at 11 PM the night before, but under pressure at 9 AM the next morning? Gone. This is called <strong>poor consolidation</strong> — and it's the silent killer of 10th CBSE maths scores.
              </p>

              <p>
                Daily practice, even 20–30 minutes, triggers <strong>spaced repetition</strong> — one of the most powerful learning techniques in cognitive science. Each day you return to a concept, your recall improves exponentially. Students who practise consistently don't just remember formulas. They <em>understand</em> them. In mathematics, that difference is everything.
              </p>

              {/* ── Section 2: Why 10 Questions ── */}
              <h2 className="text-3xl font-bold mt-14 mb-6 text-navy">
                Why 10 Questions? The Power of the Small Dose Method
              </h2>

              <p>Ten questions sounds almost too simple. But there's a clear reason this number works.</p>

              {/* 3-card grid */}
              <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-5 my-10">
                {[
                  {
                    icon: CheckCircle2,
                    heading: 'Achievable Every Day',
                    body: 'Committing to 3 hours daily is unsustainable. Ten questions is 20–30 minutes. It fits any schedule and actually gets done.',
                  },
                  {
                    icon: Brain,
                    heading: 'Forces Active Recall',
                    body: 'Solving is active work. Reading notes is passive. Active recall is 2–3× more effective for retention — research is unanimous on this.',
                  }
                ].map(({ icon: Icon, heading, body }) => (
                  <div
                    key={heading}
                    className="bg-ice-blue/40 border border-ice-blue rounded-2xl p-6 flex flex-col gap-3"
                  >
                    <Icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <p className="font-display font-bold text-navy text-lg">{heading}</p>
                    <p className="text-slate-gray text-sm leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              {/* ── Section 3: How to Structure ── */}
              <h2 className="text-3xl font-bold mt-14 mb-6 text-navy">
                How to Structure Your 10 Daily Questions for 10th CBSE Maths
              </h2>

              <p>
                Not all 10 questions should be random. Here's the split that maximises board exam preparation — the same logic behind how{' '}
                <Link href="/how-it-works" className="text-primary font-semibold hover:underline">
                  My Learning Planet structures weekly modules
                </Link>{' '}
                for every student.
              </p>

              {/* Question split table */}
              <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-ice-blue shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left px-5 py-4 font-semibold rounded-tl-2xl">Question Type</th>
                      <th className="text-center px-5 py-4 font-semibold">Count</th>
                      <th className="text-left px-5 py-4 font-semibold rounded-tr-2xl">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionSplit.map((row, i) => (
                      <tr
                        key={row.type}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-ice-blue/20'}
                      >
                        <td className="px-5 py-4 text-slate-gray font-medium">{row.type}</td>
                        <td className="px-5 py-4 text-center font-bold text-primary">{row.count}</td>
                        <td className="px-5 py-4 text-slate-gray">{row.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Section 4: High-Weightage Topics ── */}
              <h2 className="text-3xl font-bold mt-14 mb-6 text-navy">
                The High-Weightage Topics You Must Prioritise Daily
              </h2>

              <p>
                Your 10 daily questions should always include one or two from these chapters. They carry the most board exam weightage — and they reward consistent practice most.
              </p>

              <div className="not-prose flex flex-col gap-5 my-10">
                {highWeightageTopics.map((topic) => (
                  <div
                    key={topic.title}
                    className={`rounded-2xl border p-6 ${
                      topic.highlight
                        ? 'border-gold bg-gradient-to-r from-navy to-primary text-white shadow-xl'
                        : 'border-ice-blue bg-ice-blue/20'
                    }`}
                  >
                    <p
                      className={`font-display font-bold text-xl mb-2 ${
                        topic.highlight ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {topic.emoji} {topic.title}
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${
                        topic.highlight ? 'text-white/85' : 'text-slate-gray'
                      }`}
                    >
                      {topic.body}
                    </p>
                    {topic.tip && (
                      <div className="mt-4 bg-white/10 border border-white/20 rounded-xl px-5 py-4">
                        <p className="text-white/90 text-sm font-semibold">
                          💡 {topic.tip}
                        </p>
                      </div>
                    )}
                    {topic.highlight && (
                      <Link
                        href="/courses"
                        className="mt-5 inline-flex items-center gap-2 bg-gold text-navy text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-amber-400 transition-colors"
                      >
                        Explore our 10th class trigonometry programme
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* ── Section 5: The Cramming Trap ── */}
              <h2 className="text-3xl font-bold mt-14 mb-6 text-navy">
                The 3-Hour Cramming Trap: Why It Feels Productive But Isn't
              </h2>

              <p>
                Here's what actually happens inside a 3-hour last-minute session — broken down honestly:
              </p>

              <div className="not-prose flex flex-col gap-4 my-8">
                {crammingTimeline.map(({ time, icon: Icon, status, label, detail }) => (
                  <div
                    key={time}
                    className={`flex items-start gap-5 rounded-2xl border p-5 ${
                      status === 'ok'
                        ? 'border-success-green/30 bg-success-green/5'
                        : status === 'warn'
                        ? 'border-gold/40 bg-amber-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                        status === 'ok'
                          ? 'bg-success-green/15 text-success-green'
                          : status === 'warn'
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-red-100 text-red-500'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-gray mb-1">
                        {time}
                      </p>
                      <p className="font-display font-bold text-navy text-lg leading-tight mb-1">
                        {label}
                      </p>
                      <p className="text-slate-gray text-sm leading-relaxed">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="not-prose bg-gradient-to-r from-navy to-primary rounded-2xl px-8 py-7 my-10 shadow-xl">
                <p className="text-white text-lg font-sans leading-relaxed">
                  Compare that to <strong className="text-gold">10 quality questions daily for 60 days</strong> — that's{' '}
                  <strong className="text-gold">600 problems</strong> actively solved, consolidated, and stored in
                  long-term memory. The return on that time isn't close.
                </p>
              </div>

              {/* ── Section 6: Week 1 Plan ── */}
              <h2 className="text-3xl font-bold mt-14 mb-6 text-navy">
                Building the Daily Habit: A Practical Week-1 Plan
              </h2>

              <p>Theory doesn't create habits. Here's how to actually start:</p>

              <div className="not-prose flex flex-col gap-4 my-8">
                {weekOnePlan.map(({ days, action }, i) => (
                  <div key={days} className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm shadow">
                      {i + 1}
                    </div>
                    <div className="flex-1 border border-ice-blue rounded-2xl px-6 py-5 bg-ice-blue/10">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{days}</p>
                      <p className="text-slate-gray text-sm leading-relaxed">{action}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p>
                By the end of Week 1 you have a rhythm. By Week 3 it's automatic. By the time exams arrive you've solved 400–600 problems and reviewed them multiple times.{' '}
                <strong>No cramming required.</strong>
              </p>

              {/* ── Section 7: Parents ── */}
              <h2 className="text-3xl font-bold mt-14 mb-6 text-navy">
                What Parents Can Do to Support This Habit
              </h2>

              <p>
                The biggest mistake well-meaning parents make is checking on <em>quantity</em> — "Did you study for two hours today?" — rather than <em>quality</em>. Two hours of distracted reading is worth less than 25 minutes of focused problem-solving.
              </p>

              <p>Ask your child instead:</p>

              <ul className="space-y-2 my-6 list-none pl-0 not-prose">
                {[
                  '"Which 10 questions did you solve today?"',
                  '"Did anything confuse you?"',
                  '"What chapter are you reviewing tomorrow?"',
                ].map((q) => (
                  <li key={q} className="flex items-start gap-3 text-slate-gray">
                    <CheckCircle2 className="h-5 w-5 text-success-green mt-0.5 flex-shrink-0" />
                    <span className="text-base italic">{q}</span>
                  </li>
                ))}
              </ul>

              <p>
                These questions reinforce the daily habit and open real dialogue about progress. At{' '}
                <Link href="/for-parents" className="text-primary font-semibold hover:underline">
                  My Learning Planet
                </Link>
                , our parent dashboard gives you this visibility automatically — weekly assessments, topic-wise performance, and attendance tracking so you're always informed.
              </p>

              {/* Important-to-know box */}
              <div className="not-prose my-10 bg-gradient-to-r from-navy to-primary p-8 rounded-2xl text-white shadow-xl">
                <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-gold" />
                  Visibility Changes Everything
                </h3>
                <p className="text-white/90 leading-relaxed italic">
                  When parents can see exactly which topics their child is covering, where they're struggling, and whether their test scores are improving — they stop guessing and start supporting. That's the difference between a parent who nags and a parent who helps.
                </p>
                <Link
                  href="/for-parents"
                  className="mt-6 inline-flex items-center gap-2 bg-white text-primary font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gold hover:text-navy transition-all shadow"
                >
                  See how our parent dashboard works
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* ── FAQ ── */}
              <h2 className="text-3xl font-bold mt-14 mb-6 text-navy">Frequently Asked Questions</h2>

              <div className="not-prose flex flex-col gap-4 my-8">
                {faqs.map(({ q, a }) => (
                  <div key={q} className="border border-ice-blue rounded-2xl overflow-hidden">
                    <div className="bg-ice-blue/30 px-6 py-4">
                      <p className="font-display font-bold text-navy text-base">{q}</p>
                    </div>
                    <div className="px-6 py-5">
                      <p className="text-slate-gray text-sm leading-relaxed">{a}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Final Thought ── */}
              <h2 className="text-3xl font-bold mt-14 mb-6 text-navy">
                Final Thought: Consistency Beats Intensity, Every Single Time
              </h2>

              <p>
                The students who score 90+ in 10th CBSE maths aren't necessarily the smartest in the room. They're the most consistent. They solve their 10 questions on Monday. They solve them on Friday. They solve them when they don't feel like it.
              </p>

              <p>
                That consistency — built over months, not nights — is what shows up on exam day. If you're looking for a structured environment that builds this habit into your child's weekly routine, with a clear curriculum, weekly assessments, and transparent parent tracking,{' '}
                <Link href="/" className="text-primary font-semibold hover:underline">
                  My Learning Planet
                </Link>{' '}
                was built exactly for this.
              </p>

              <div className="not-prose bg-ice-blue/40 border border-ice-blue rounded-2xl px-8 py-7 my-10 text-center">
                <p className="font-display font-bold text-navy text-2xl mb-2">
                  📚 Every chapter. Every week. Every student. On track.
                </p>
                <p className="text-slate-gray text-sm mb-6">
                  Structured maths coaching for Class 6–10 students in Gurgaon.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-navy transition-colors shadow-lg"
                >
                  Book a Free Demo Class
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Author byline */}
              <p className="text-slate-gray text-sm italic mt-10">
                Written by Mitali, Lead Educator at My Learning Planet — structured mathematics coaching for Class 6–10 students in Gurgaon.
              </p>

              {/* Related Reading */}
              <div className="not-prose mt-14 border-t border-ice-blue pt-10">
                <p className="font-display font-bold text-navy text-xl mb-5">Related Reading</p>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      href: '/how-it-works',
                      label: 'How My Learning Planet\'s Weekly Module System Works',
                    },
                    {
                      href: '/courses',
                      label: 'Complete Class 10 Maths Syllabus Breakdown',
                    },
                    {
                      href: '/for-parents',
                      label: 'Parent Guide: Tracking Your Child\'s Progress',
                    },
                    {
                      href: '/blog/gurgaon-parent-guide-math-coaching-2026',
                      label: 'The Gurgaon Parent\'s Guide to Choosing the Right Math Coaching in 2026',
                    },
                  ].map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 group text-slate-gray hover:text-primary transition-colors text-sm font-medium"
                    >
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-primary opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:w-1/3">
            <div className="sticky top-8 space-y-8">

              {/* Author card */}
              <div className="bg-white border border-ice-blue p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold text-navy">Mitali</h4>
                    <p className="text-slate-gray text-sm">Lead Mathematics Educator</p>
                  </div>
                </div>
                <p className="text-slate-gray text-sm leading-relaxed">
                  Mitali leads curriculum design and live classes at My Learning Planet, Gurgaon. She has helped hundreds of Class 6–10 students build structured, lasting maths foundations.
                </p>
              </div>

              {/* Quick stats card */}
              <div className="bg-white border border-ice-blue p-6 rounded-2xl shadow-sm">
                <p className="font-display font-bold text-navy text-lg mb-5">By the Numbers</p>
                <div className="flex flex-col gap-4">
                  {[
                    { stat: '600+', label: 'Problems solved in 60 days of daily practice' },
                    { stat: '2–3×', label: 'More effective than passive reading' },
                    { stat: '20–30', label: 'Minutes a day is all it takes' },
                  ].map(({ stat, label }) => (
                    <div key={stat} className="flex items-center gap-4">
                      <span className="font-display font-bold text-3xl text-primary flex-shrink-0">{stat}</span>
                      <span className="text-slate-gray text-xs leading-snug">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-primary p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BookOpen className="h-24 w-24 transform group-hover:rotate-12 transition-transform" />
                </div>
                <h4 className="text-2xl font-display font-bold mb-4 relative z-10">
                  Want a Structured Daily Plan Built for Your Child?
                </h4>
                <p className="text-white/80 mb-8 text-sm leading-relaxed relative z-10">
                  My Learning Planet designs weekly question sets aligned to your child's syllabus — with tests, tracking, and a parent dashboard. All at ₹4,000/month.
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