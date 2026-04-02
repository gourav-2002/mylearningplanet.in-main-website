'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Video, 
  PlayCircle, 
  FileText, 
  ClipboardCheck, 
  TrendingUp, 
  MessageCircle, 
  BarChart2, 
  Bell, 
  Calendar, 
  Layout, 
  Users, 
  ClipboardList, 
  BarChart, 
  Settings, 
  Wifi, 
  Download, 
  Lock, 
  Zap, 
  RefreshCw,
  Rocket,
  ArrowRight,
  Globe,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const FloatingSymbol = ({ symbol, size, top, left, delay, duration, rotation }: any) => {
  return (
    <div 
      className="absolute text-white pointer-events-none select-none opacity-5 md:opacity-8 animate-float-updown"
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

const PhoneMockup = ({ type, tilt, delay, children }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: tilt }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={`relative w-[180px] h-[360px] bg-[#0A1628] rounded-[36px] border-[3px] border-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.50)] overflow-hidden animate-float-slow`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[20px] bg-black/40 rounded-b-[12px] z-20"></div>
      
      {/* Side Buttons */}
      <div className="absolute -right-[3px] top-20 w-[3px] h-10 bg-white/10 rounded-l-md"></div>
      <div className="absolute -right-[3px] top-36 w-[3px] h-16 bg-white/10 rounded-l-md"></div>
      
      {/* Screen Content */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[60px] h-[4px] bg-white/20 rounded-full z-20"></div>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-[24px] p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute bottom-[-20px] right-[-10px] text-[120px] font-display font-bold text-white/5 select-none pointer-events-none">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-display text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/60 font-sans text-base leading-relaxed">{desc}</p>
    </motion.div>
  );
};

const Milestone = ({ milestone, index, isLast }: any) => {
  const Icon = milestone.icon;
  const isCompleted = milestone.status === 'completed';
  const isInProgress = milestone.status === 'in-progress';
  
  return (
    <div className="relative flex flex-col items-center flex-1 min-w-[250px] md:min-w-0">
      {/* Connecting Line */}
      {!isLast && (
        <div className="absolute top-6 left-1/2 w-full h-[2px] border-t-2 border-dashed border-ice-blue hidden md:block"></div>
      )}
      
      {/* Dot */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.2 }}
        className={`relative z-10 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all duration-300 ${
          isCompleted ? 'bg-green' : isInProgress ? 'bg-gold animate-pulse' : 'bg-primary/20'
        }`}
      >
        <Icon className={`w-5 h-5 ${isCompleted || isInProgress ? 'text-white' : 'text-primary'}`} />
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: index % 2 === 0 ? -20 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.3 }}
        className={`mt-8 md:mt-0 ${index % 2 === 0 ? 'md:mb-16 md:mt-0 order-first' : 'md:mt-16 order-last'} bg-white rounded-2xl border border-ice-blue p-5 shadow-sm w-full max-w-[240px] text-center`}
      >
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
          isCompleted ? 'bg-green/10 text-green' : isInProgress ? 'bg-gold/10 text-gold' : 'bg-slate-gray/10 text-slate-gray'
        }`}>
          {milestone.statusLabel}
        </div>
        <h4 className="font-sans font-bold text-navy text-base mb-1">{milestone.title}</h4>
        <p className="text-slate-gray text-sm mb-2">{milestone.desc}</p>
        <div className="text-navy/40 text-xs font-bold">{milestone.date}</div>
      </motion.div>
    </div>
  );
};

export default function AppPreviewPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [waitlistSuccess, setWaitlistSuccess] = useState({ whatsapp: false, email: false });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // Countdown Logic
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 90);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const heroSymbols = [
    { s: '＋', sz: '2rem', t: '10%', l: '5%', d: '0s', dur: '6s', r: '10deg' },
    { s: '×', sz: '3rem', t: '70%', l: '10%', d: '2s', dur: '8s', r: '20deg' },
    { s: '÷', sz: '2.5rem', t: '80%', l: '85%', d: '0.5s', dur: '5s', r: '-10deg' },
    { s: '√', sz: '4rem', t: '15%', l: '45%', d: '1.5s', dur: '9s', r: '5deg' },
    { s: 'π', sz: '2rem', t: '60%', l: '40%', d: '2.5s', dur: '6s', r: '12deg' },
    { s: '∑', sz: '3.5rem', t: '40%', l: '90%', d: '3s', dur: '10s', r: '-5deg' },
    { s: '∞', sz: '3rem', t: '50%', l: '5%', d: '2.2s', dur: '9s', r: '-20deg' },
    { s: 'θ', sz: '2.2rem', t: '10%', l: '30%', d: '2.8s', dur: '8s', r: '5deg' },
  ];

  const studentFeatures = [
    { icon: Video, title: "Live Class Access", desc: "Join live classes directly from the app with one tap." },
    { icon: PlayCircle, title: "Recorded Lectures", desc: "Every class recorded and available within hours — never miss a lesson." },
    { icon: FileText, title: "Notes and Cheat Sheets", desc: "Chapter-wise notes and formula sheets always at your fingertips." },
    { icon: ClipboardCheck, title: "Tests and Assignments", desc: "Take weekly tests and view detailed results instantly." },
    { icon: TrendingUp, title: "Progress Tracking", desc: "See your own improvement trends, scores, and attendance." },
    { icon: MessageCircle, title: "Doubt Submission", desc: "Submit doubts before doubt sessions — never come unprepared." },
  ];

  const parentFeatures = [
    { icon: BarChart2, title: "Live Progress Dashboard", desc: "See test scores, attendance, and improvement trends updated in real time." },
    { icon: Bell, title: "Instant Notifications", desc: "Get notified the moment a test result or weekly report is available." },
    { icon: Calendar, title: "Attendance Tracking", desc: "Track which classes your child attended — daily and monthly view." },
    { icon: FileText, title: "Weekly Progress Reports", desc: "Automated detailed weekly report delivered every Monday morning." },
    { icon: MessageCircle, title: "Teacher Feedback", desc: "Read teacher notes and feedback summaries after every session." },
    { icon: TrendingUp, title: "Improvement Analytics", desc: "Visual graphs showing score trends across weeks and months." },
  ];

  const teacherFeatures = [
    { icon: Layout, title: "Curriculum Planner", desc: "Plan weekly topics, assign notes, and schedule tests for every batch." },
    { icon: Users, title: "Batch Management", desc: "Manage multiple student batches, attendance, and class schedules." },
    { icon: ClipboardList, title: "Test Creation Tools", desc: "Create and publish weekly tests directly from the panel." },
    { icon: BarChart, title: "Student Analytics", desc: "Deep analytics on every student's performance, gaps, and trends." },
    { icon: Bell, title: "Parent Communication", desc: "Send weekly reports and feedback directly from the panel." },
    { icon: Settings, title: "Platform Administration", desc: "Complete control over app content, user access, and settings." },
  ];

  const milestones = [
    { icon: CheckCircle2, status: 'completed', statusLabel: '✅ Completed', title: "Platform Website", desc: "Website fully designed and launched with all pages.", date: "March 2025" },
    { icon: RefreshCw, status: 'in-progress', statusLabel: '🔄 In Progress', title: "App Development", desc: "Student and Parent apps in active development.", date: "Q2 2025" },
    { icon: Rocket, status: 'coming-soon', statusLabel: '🚀 Coming Soon', title: "Beta Testing", desc: "Closed beta with enrolled students and parents.", date: "Q3 2025" },
    { icon: Calendar, status: 'planned', statusLabel: '📅 Planned', title: "Public Launch", desc: "Full public launch on App Store and Google Play.", date: "Mid 2025" },
  ];

  const handleWaitlistSubmit = (type: 'whatsapp' | 'email', e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistSuccess(prev => ({ ...prev, [type]: true }));
  };

  return (
    <div className="overflow-x-hidden font-sans bg-white">
      {/* SECTION 1 — CINEMATIC HERO */}
      <section className="relative min-h-screen bg-[#0A1F5E] flex items-center overflow-hidden py-20 px-4 md:px-12">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(18,81,170,0.50)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(245,166,35,0.07)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 40px)' }}></div>
          
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

          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] border border-white/5 rounded-full animate-spin-slow pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] border border-white/5 rounded-full animate-spin-slow-reverse pointer-events-none"></div>
        </div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center relative z-10">
          {/* Left Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="text-left"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap gap-3 mb-8">
              <div className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/35 text-gold text-xs font-bold flex items-center gap-2 animate-pulse-slow">
                🚀 Coming Soon
              </div>
              <div className="px-4 py-1.5 rounded-full bg-green/12 border border-green/30 text-green text-xs font-bold flex items-center gap-2">
                ✓ iOS + Android
              </div>
            </motion.div>

            <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-display text-5xl md:text-7xl font-normal text-white mb-6 leading-[1.1]">
              The App That <br />
              <span className="font-bold">Puts Learning</span> <br />
              <span className="font-bold italic relative">
                In Every Pocket.
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    d="M2 10C40 2 160 2 198 10" 
                    stroke="#F5A623" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-white/72 text-lg md:text-xl font-sans max-w-xl mb-10 leading-relaxed">
              Three powerful apps — for students, parents, and teachers — designed to deliver structured maths learning anytime, anywhere with complete clarity and progress tracking in Gurgaon.
            </motion.p>

            {/* Countdown Timer */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-10">
              <div className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Estimated Launch</div>
              <div className="inline-flex items-center gap-4 bg-white/7 border border-white/15 backdrop-blur-xl rounded-[20px] p-6 shadow-2xl">
                {[
                  { val: countdown.days, lbl: 'DAYS' },
                  { val: countdown.hours, lbl: 'HOURS' },
                  { val: countdown.mins, lbl: 'MINS' },
                  { val: countdown.secs, lbl: 'SECS' }
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    <div className="text-center min-w-[60px]">
                      <div className="text-white font-display text-3xl md:text-4xl font-bold">{String(item.val).padStart(2, '0')}</div>
                      <div className="text-white/55 text-[9px] font-bold tracking-widest mt-1">{item.lbl}</div>
                    </div>
                    {i < 3 && <div className="text-gold font-display text-2xl font-bold mb-4">:</div>}
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-4 inline-block px-3 py-1 rounded-full bg-gold/12 border border-gold/30 text-gold text-[10px] font-bold">
                🔥 Launch window: Mid 2025
              </div>
            </motion.div>

            {/* Waitlist CTA */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="max-w-md mb-12">
              <div className="text-white/65 text-sm font-medium mb-4">Be First to Know When We Launch</div>
              <AnimatePresence mode="wait">
                {!waitlistSuccess.whatsapp ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={(e) => handleWaitlistSubmit('whatsapp', e)}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <input 
                      type="tel" 
                      placeholder="Enter your WhatsApp number" 
                      required
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors"
                    />
                    <button className="bg-gold text-navy font-bold px-8 py-3.5 rounded-xl hover:scale-[1.03] transition-transform shadow-[0_0_20px_rgba(245,166,35,0.3)]">
                      Notify Me ✦
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green/10 border border-green/30 text-green px-6 py-3.5 rounded-xl font-bold flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    🎉 You are on the waitlist! We will notify you on WhatsApp.
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-3 text-white/45 text-[10px]">🔒 No spam. WhatsApp notification only when we launch.</div>
            </motion.div>

            {/* Store Buttons */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap gap-4">
              {[
                { icon: "🍎", name: "App Store" },
                { icon: "▶", name: "Google Play" }
              ].map((store, i) => (
                <div key={i} className="group relative">
                  <div className="bg-white/8 border border-white/20 rounded-[14px] px-6 py-3 flex items-center gap-3 opacity-70 cursor-not-allowed transition-all">
                    <span className="text-xl">{store.icon}</span>
                    <div className="text-left">
                      <div className="text-white font-bold text-xs leading-none">{store.name}</div>
                      <div className="text-white/50 text-[9px] mt-1">Coming Soon</div>
                    </div>
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-navy text-[10px] font-bold px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                    Launching Mid 2025
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content — Phone Mockup Cluster */}
          <div className="relative h-[500px] flex items-center justify-center mt-12 lg:mt-0">
            {/* Left Phone */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 z-10">
              <PhoneMockup tilt={-8} delay={1}>
                <div className="h-full bg-[#0A1F5E] p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-white font-bold text-[10px]">Parent Dashboard</div>
                    <Bell className="w-3 h-3 text-white/60" />
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-xs">A</div>
                    <div className="text-left">
                      <div className="text-white font-bold text-[10px]">Arjun S. · Class 9</div>
                      <div className="flex items-center gap-1 text-[8px] text-green"><div className="w-1.5 h-1.5 rounded-full bg-green"></div> Active</div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="relative w-24 h-24 mb-4">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#F5A623" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="36.7" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-white font-bold text-lg">87%</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <div className="bg-green/10 text-green text-[8px] font-bold p-2 rounded-lg text-center">Attendance: 94%</div>
                      <div className="bg-primary/20 text-white text-[8px] font-bold p-2 rounded-lg text-center">Last Test: 91/100</div>
                    </div>
                  </div>
                  <div className="bg-gold/10 text-gold text-[8px] font-bold p-2 rounded-lg text-center mt-4">📊 Weekly report ready</div>
                </div>
              </PhoneMockup>
            </div>

            {/* Center Phone */}
            <div className="relative z-30">
              <PhoneMockup tilt={0} delay={0}>
                <div className="h-full bg-primary p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-white" />
                      <div className="text-white font-bold text-[10px]">My Learning Planet</div>
                    </div>
                    <div className="text-white/60 text-[8px]">9:41</div>
                  </div>
                  <div className="bg-white/12 border border-white/15 rounded-2xl p-4 mb-4 text-left">
                    <div className="text-white font-bold text-xs mb-1">Good Morning, Arjun 👋</div>
                    <div className="text-white/65 text-[9px]">Class 9 · Week 14</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 text-left shadow-lg">
                    <div className="text-primary font-bold text-[8px] mb-1">Today's Class</div>
                    <div className="text-navy font-bold text-sm mb-2">Quadratic Equations</div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-green/10 text-green text-[8px] font-bold px-2 py-0.5 rounded-full">4:00 PM · Live</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] text-slate-gray">
                        <span>Week 14 of 48</span>
                        <span>29%</span>
                      </div>
                      <div className="w-full h-1.5 bg-ice-blue rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[29%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green/10 text-green text-[9px] font-bold p-3 rounded-xl text-center">Tests: 12 ✓</div>
                    <div className="bg-white/10 text-white text-[9px] font-bold p-3 rounded-xl text-center">Score: 87%</div>
                  </div>
                  <div className="bg-white/10 text-white text-[9px] font-bold p-2.5 rounded-full text-center">📄 This week's notes ready</div>
                </div>
              </PhoneMockup>
            </div>

            {/* Right Phone */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 z-10">
              <PhoneMockup tilt={8} delay={2}>
                <div className="h-full bg-gradient-to-b from-primary to-[#0A1F5E] p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
                  <div className="text-4xl mb-4">🚀</div>
                  <div className="text-white font-bold text-xs mb-1">Teacher Panel</div>
                  <div className="text-gold font-display italic text-lg mb-4">Coming Soon</div>
                  <div className="w-10 h-[1px] bg-gold mb-4"></div>
                  <p className="text-white/65 text-[9px] leading-relaxed max-w-[120px]">
                    Batch management, analytics, curriculum planner
                  </p>
                </div>
              </PhoneMockup>
            </div>

          
          </div>
        </div>
      </section>

      {/* SECTION 2 — APP TAB SHOWCASE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-primary font-bold text-xs tracking-[0.2em] mb-4">EXPLORE THE APPS</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">Online Maths Classes in Gurgaon Ecosystem <br/>Three Apps, One Powerful System</h2>
            <p className="text-slate-gray font-sans text-xl max-w-2xl mx-auto">
              Each app is designed for a specific user — working together as one seamless system.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-20">
            <div className="bg-ice-blue p-1.5 rounded-full inline-flex gap-1">
              {[
                { label: "📱 Student App", id: 0 },
                { label: "👨👩👧 Parent App", id: 1 },
                { label: "🧑🏫 Teacher Panel", id: 2 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-primary text-white shadow-[0_4px_16px_rgba(18,81,170,0.30)]' 
                      : 'text-slate-gray hover:text-navy'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto"
            >
              {/* Left — Feature List */}
              <div>
                {activeTab === 0 && (
                  <>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFF8EC] border border-gold text-gold text-xs font-bold mb-6">
                      For Students — Classes 6–10
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-navy mb-6">Everything a Student Needs — In One App</h3>
                    <p className="text-slate-gray text-lg mb-10">From live classes to recorded lectures, from notes to tests — the student app is a complete learning companion for structured learning and progress tracking, making it ideal for students searching for online maths classes near me.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      {studentFeatures.map((f, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-ice-blue flex items-center justify-center shrink-0">
                            <f.icon className="w-[18px] h-[18px] text-primary" />
                          </div>
                          <div>
                            <div className="font-bold text-navy text-lg mb-1">{f.title}</div>
                            <div className="text-slate-gray text-base leading-relaxed">{f.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 1 && (
                  <>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFF8EC] border border-gold text-gold text-xs font-bold mb-6">
                      For Parents — Full Visibility
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-navy mb-6">Always Know Where Your Child Stands</h3>
                    <p className="text-slate-gray text-lg mb-10">Real-time progress tracking, weekly reports, and instant notifications — the parent app keeps you fully informed, always.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      {parentFeatures.map((f, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-ice-blue flex items-center justify-center shrink-0">
                            <f.icon className="w-[18px] h-[18px] text-primary" />
                          </div>
                          <div>
                            <div className="font-bold text-navy text-lg mb-1">{f.title}</div>
                            <div className="text-slate-gray text-base leading-relaxed">{f.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 2 && (
                  <>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-gold/12 border border-gold text-gold text-xs font-bold mb-6">
                      For Educators — Coming Soon 🚀
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-navy mb-6">A Command Center for Structured Teaching</h3>
                    <p className="text-slate-gray text-lg mb-10">The teacher panel gives Mitali complete control over curriculum planning, batch management, test creation, and student analytics — all in one place for delivering effective mathematics online classes.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      {teacherFeatures.map((f, i) => (
                        <div key={i} className="flex gap-4 opacity-70">
                          <div className="w-10 h-10 rounded-full bg-ice-blue flex items-center justify-center shrink-0">
                            <f.icon className="w-[18px] h-[18px] text-primary" />
                          </div>
                          <div>
                            <div className="font-bold text-navy text-lg mb-1 flex items-center gap-2">
                              {f.title}
                              <span className="text-[8px] bg-gold/10 text-gold px-1.5 py-0.5 rounded-full">Soon</span>
                            </div>
                            <div className="text-slate-gray text-base leading-relaxed">{f.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex flex-wrap gap-3">
                  <div className="px-5 py-2.5 rounded-full bg-ice-blue text-primary text-sm font-bold">🍎 App Store — Coming Soon</div>
                  <div className="px-5 py-2.5 rounded-full bg-ice-blue text-primary text-sm font-bold">▶ Google Play — Coming Soon</div>
                </div>
              </div>

              {/* Right — Detailed Mockup */}
              <div className="flex justify-center">
                {activeTab === 0 && (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative w-[280px] h-[560px] bg-[#0A1628] rounded-[48px] border-[6px] border-white/15 shadow-2xl overflow-hidden animate-float-slow">
                    <div className="absolute inset-0 bg-primary p-6 flex flex-col">
                      <div className="flex justify-between items-center mb-8">
                        <div className="text-white font-bold text-xs">My Learning Planet</div>
                        <Bell className="w-4 h-4 text-white/60" />
                      </div>
                      <div className="bg-white rounded-3xl p-5 mb-6 shadow-xl text-left">
                        <div className="text-navy/40 font-bold text-[10px] mb-1">Today · Wednesday</div>
                        <div className="text-navy font-bold text-lg mb-3">Quadratic Equations</div>
                        <div className="text-slate-gray text-xs mb-4">4:00 PM – 5:30 PM</div>
                        <button className="w-full bg-primary text-white font-bold py-3 rounded-full text-xs hover:bg-primary/90 transition-colors">
                          Join Live Class
                        </button>
                      </div>
                      <div className="flex gap-2 mb-6">
                        <div className="bg-ice-blue text-primary text-[9px] font-bold px-3 py-1.5 rounded-full">📄 Week 14 Notes</div>
                        <div className="bg-ice-blue text-primary text-[9px] font-bold px-3 py-1.5 rounded-full">📄 Formula Sheet</div>
                      </div>
                      <div className="bg-[#EDFBF3] border border-green rounded-2xl p-4 mb-6 text-left">
                        <div className="text-green font-bold text-sm mb-1">Last Test: 91/100</div>
                        <div className="text-green/70 text-[10px]">Top 15% of batch 🏆</div>
                      </div>
                      <div className="mt-auto space-y-2">
                        <div className="flex justify-between text-[10px] text-white/60">
                          <span>Week 14 of 48 completed</span>
                          <span>29%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white w-[29%]"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative w-[280px] h-[560px] bg-[#0A1628] rounded-[48px] border-[6px] border-white/15 shadow-2xl overflow-hidden animate-float-slow">
                    <div className="absolute inset-0 bg-[#0A1F5E] p-6 flex flex-col">
                      <div className="flex justify-between items-center mb-8">
                        <div className="text-white font-bold text-xs">Parent Dashboard</div>
                        <div className="text-white/60 text-[10px]">Hello, Mrs. Sharma 👋</div>
                      </div>
                      <div className="bg-gold/10 border border-gold rounded-full px-4 py-2 flex items-center justify-between mb-8">
                        <div className="text-gold font-bold text-xs">Arjun S. · Class 9</div>
                        <ChevronDown className="w-4 h-4 text-gold" />
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="relative w-32 h-32 mb-6">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#F5A623" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="36.7" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-white font-display text-2xl font-bold">87%</div>
                            <div className="text-white/60 text-[8px] uppercase tracking-wider">Avg Score</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 w-full mb-8">
                          <div className="bg-white/5 p-2 rounded-xl text-center">
                            <div className="text-green font-bold text-xs">94%</div>
                            <div className="text-white/40 text-[7px] uppercase">Attendance</div>
                          </div>
                          <div className="bg-white/5 p-2 rounded-xl text-center">
                            <div className="text-primary font-bold text-xs">12</div>
                            <div className="text-white/40 text-[7px] uppercase">Tests Done</div>
                          </div>
                          <div className="bg-white/5 p-2 rounded-xl text-center">
                            <div className="text-gold font-bold text-xs">+23pts</div>
                            <div className="text-white/40 text-[7px] uppercase">Improve</div>
                          </div>
                        </div>
                        <div className="w-full bg-white/8 border border-white/15 rounded-2xl p-4 text-left">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-white font-bold text-xs">📊 Week 14 Report</div>
                            <div className="text-gold text-[10px] font-bold">View Full Report →</div>
                          </div>
                          <div className="text-white/55 text-[9px]">Delivered Monday 9:00 AM</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative w-full max-w-[440px] aspect-[1.6/1] bg-[#0A1628] rounded-[20px] border-[4px] border-white/15 shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-[#0A1628] p-5 flex flex-col">
                      {/* Browser Chrome */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-md h-6 flex items-center justify-center">
                          <div className="text-white/40 text-[8px]">Teacher Panel — My Learning Planet</div>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                          <div className="text-left">
                            <div className="text-white font-bold text-sm">Welcome, Mitali 👋</div>
                            <div className="text-white/55 text-[9px]">Week 14 · 3 Batches Active</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          <div className="bg-primary/20 p-3 rounded-xl">
                            <div className="text-primary font-bold text-lg">48</div>
                            <div className="text-white/40 text-[8px]">Students</div>
                          </div>
                          <div className="bg-gold/20 p-3 rounded-xl">
                            <div className="text-gold font-bold text-lg">3</div>
                            <div className="text-white/40 text-[8px]">Batches</div>
                          </div>
                          <div className="bg-green/20 p-3 rounded-xl">
                            <div className="text-green font-bold text-lg">12</div>
                            <div className="text-white/40 text-[8px]">Tests</div>
                          </div>
                        </div>
                        <div className="space-y-2 mb-6">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-2.5 bg-white/5 rounded-lg">
                              <div className="text-white text-[9px] font-bold">Class 9 · Batch {String.fromCharCode(64 + i)} · 16 students</div>
                              <div className="w-2 h-2 rounded-full bg-green"></div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-auto">
                          <div className="px-3 py-1.5 bg-white/8 rounded-md text-white text-[8px] font-bold">Create Test</div>
                          <div className="px-3 py-1.5 bg-white/8 rounded-md text-white text-[8px] font-bold">Send Report</div>
                          <div className="px-3 py-1.5 bg-white/8 rounded-md text-white text-[8px] font-bold">Add Notes</div>
                        </div>
                      </div>
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#0A1A28]/75 flex flex-col items-center justify-center text-center p-6 z-20">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
                      <div className="text-4xl mb-4">🚀</div>
                      <div className="text-gold font-display italic text-2xl mb-2">Coming Soon</div>
                      <div className="text-white/60 text-[10px]">Launching alongside the apps</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 3 — FEATURES GRID */}
      <section className="py-24 bg-[#0A1F5E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 40px)' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="text-white/45 font-bold text-xs tracking-[0.2em] mb-4 uppercase">WHY OUR APPS</div>
            <h2 className="font-display max-w-4xl mx-auto text-4xl md:text-5xl font-bold text-white mb-6">Built for Real Learning in Online Maths Classes Near You — Not Just Looks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard icon={Wifi} title="Works on Any Device" desc="Smartphone, tablet, or laptop — any device with a browser or the installed app works perfectly." index={0} />
            <FeatureCard icon={Bell} title="Instant Notifications" desc="Test results, weekly reports, class reminders — parents and students are always in the loop." index={1} />
            <FeatureCard icon={Download} title="Offline Notes Access" desc="Download notes and cheat sheets for offline access — continue learning anytime with our online maths tutor in Gurgaon, even without internet." index={2} />
            <FeatureCard icon={Lock} title="Secure and Private" desc="All data encrypted. Student information protected. Parents control account access completely." index={3} />
            <FeatureCard icon={Zap} title="Blazing Fast" desc="Lightweight apps built for Indian network conditions — smooth even on 4G connections." index={4} />
            <FeatureCard icon={RefreshCw} title="Always Up to Date" desc="New features and improvements are released regularly — making our online maths tutor in Gurgaon app better every month." index={5} />
          </div>
        </div>
      </section>

      {/* SECTION 4 — WAITLIST SECTION */}
      <section id="waitlist" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[760px] mx-auto bg-gradient-to-br from-ice-blue to-[#F0F5FF] rounded-[28px] border-2 border-primary p-8 md:p-16 shadow-[0_16px_64px_rgba(18,81,170,0.14)] relative overflow-hidden"
          >
            {/* Watermark */}
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[120px] opacity-[0.07] select-none pointer-events-none">
              🚀
            </div>

            <div className="relative z-10 text-center">
              <div className="text-4xl mb-6">🚀</div>
              <div className="text-primary font-bold text-xs tracking-[0.2em] mb-4">JOIN THE WAITLIST</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">Be First When the Apps Launch</h2>
              <p className="text-slate-gray font-sans text-lg mb-12">
                Join our waitlist and get notified on WhatsApp the moment our apps go live. Early access, first priority, zero hassle.
              </p>

              <div className="space-y-10 max-w-md mx-auto">
                {/* WhatsApp Option */}
                <div className="text-left">
                  <label className="block text-navy font-bold text-sm mb-3">Notify me on WhatsApp</label>
                  <AnimatePresence mode="wait">
                    {!waitlistSuccess.whatsapp ? (
                      <motion.form 
                        key="wa-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={(e) => handleWaitlistSubmit('whatsapp', e)}
                        className="flex gap-2"
                      >
                        <input 
                          type="tel" 
                          placeholder="WhatsApp Number" 
                          required
                          className="flex-1 bg-white border border-primary/20 rounded-xl px-5 py-3.5 text-navy placeholder:text-navy/30 focus:outline-none focus:border-primary shadow-sm transition-colors"
                        />
                        <button className="bg-primary text-white font-bold px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-colors">
                          Join Waitlist →
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div 
                        key="wa-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green/10 border border-green/30 text-green px-6 py-3.5 rounded-xl font-bold text-center"
                      >
                        ✓ WhatsApp Waitlist Joined!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-gray/20"></div></div>
                  <span className="relative px-4 bg-[#F4F8FF] text-slate-gray text-xs font-bold uppercase">or</span>
                </div>

                {/* Email Option */}
                <div className="text-left">
                  <label className="block text-slate-gray font-bold text-sm mb-3">Or notify me by Email</label>
                  <AnimatePresence mode="wait">
                    {!waitlistSuccess.email ? (
                      <motion.form 
                        key="email-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={(e) => handleWaitlistSubmit('email', e)}
                        className="flex gap-2"
                      >
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          required
                          className="flex-1 bg-white border border-primary/20 rounded-xl px-5 py-3.5 text-navy placeholder:text-navy/30 focus:outline-none focus:border-primary shadow-sm transition-colors"
                        />
                        <button className="bg-gold text-navy font-bold px-6 py-3.5 rounded-xl hover:bg-gold/90 transition-colors">
                          Notify Me
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div 
                        key="email-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green/10 border border-green/30 text-green px-6 py-3.5 rounded-xl font-bold text-center"
                      >
                        ✓ Email Waitlist Joined!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center gap-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/10 border border-green/30 text-green text-xs font-bold">
                  🟢 142 people already on the waitlist
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {["✓ No spam", "✓ WhatsApp only", "✓ Unsubscribe anytime"].map((chip, i) => (
                    <div key={i} className="px-4 py-1.5 rounded-full bg-[#F8FAFF] border border-ice-blue text-slate-gray text-[10px] font-bold">
                      {chip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — TIMELINE */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="text-primary font-bold text-xs tracking-[0.2em] mb-4 uppercase">LAUNCH ROADMAP</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">Our App Launch Timeline</h2>
          </div>

          <div className="max-w-6xl mx-auto overflow-x-auto pb-12">
            <div className="flex flex-col md:flex-row gap-8 md:gap-0 min-w-max md:min-w-0">
              {milestones.map((m, i) => (
                <Milestone 
                  key={i} 
                  milestone={m} 
                  index={i} 
                  isLast={i === milestones.length - 1} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — BOTTOM CTA BANNER */}
      <section className="relative py-32 bg-gradient-to-br from-[#0A1F5E] to-[#1251AA] overflow-hidden text-center">
        {/* Math Symbols Background */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          {heroSymbols.slice(0, 6).map((sym, i) => (
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

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-10"
          >
            <Rocket className="w-10 h-10 text-gold" />
          </motion.div>
          
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">
            The Apps Are Coming. <br /> Be Ready.
          </h2>

          <p className="text-white/75 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-12">
            Join the waitlist for our online maths classes in Gurgaon and get early access the moment we launch — plus a free extended trial exclusively for waitlist members.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-5 rounded-full bg-gold text-navy font-sans font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(245,166,35,0.4)] animate-pulse-slow"
            >
              ✦ Join the Waitlist
            </button>
            <Link href="/contact"
              className="px-12 py-5 rounded-full border-2 border-white text-white font-sans font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300"
            >
              Book a Demo →
            </Link>
          </div>

          <div className="text-white/45 text-lg font-medium">🔒 No spam. WhatsApp notification only.</div>
        </div>
      </section>

      {/* Custom Styles for Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-updown {
          0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, 0deg)); }
          50% { transform: translateY(-20px) rotate(var(--tw-rotate, 0deg)); }
        }
        .animate-float-updown {
          animation: float-updown 6s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 80s linear infinite;
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 60s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}} />
    </div>
  );
}
