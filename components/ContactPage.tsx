'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Send, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Users, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

// --- Components ---

const FloatingSymbol = ({ symbol, size, top, left, delay, duration, rotation }: any) => (
  <motion.div 
    initial={{ y: 0, rotate: rotation }}
    animate={{ 
      y: [-20, 20, -20],
      rotate: [rotation, rotation + 10, rotation]
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay,
      ease: "linear" 
    }}
    className="absolute text-white pointer-events-none select-none opacity-10"
    style={{ 
      fontSize: size, 
      top, 
      left, 
    }}
  >
    {symbol}
  </motion.div>
);

const ContactCard = ({ icon: Icon, title, value, sub, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white rounded-[24px] p-8 shadow-[0_8px_40px_rgba(18,81,170,0.08)] border border-ice-blue hover:border-primary/30 transition-all duration-500 group"
  >
    <div className="w-16 h-16 rounded-full bg-ice-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <h3 className="font-display text-xl text-navy font-bold mb-2">{title}</h3>
    <p className="text-charcoal font-medium mb-1">{value}</p>
    <p className="text-sm text-slate-gray">{sub}</p>
  </motion.div>
);

const BenefitItem = ({ icon: Icon, text }: any) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <p className="text-slate-gray leading-relaxed">{text}</p>
  </div>
);

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    message: ''
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[+]?[\d\s\-().]{7,15}$/.test(phone);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required.';
    if (!formData.email.trim()) errors.email = 'Email is required.';
    else if (!validateEmail(formData.email)) errors.email = 'Please enter a valid email address.';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required.';
    else if (!validatePhone(formData.phone)) errors.phone = 'Please enter a valid phone number.';
    if (!formData.grade) errors.grade = 'Please select a grade.';
    if (!formData.message.trim()) errors.message = 'Message is required.';
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setFormState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.');
        setFormState('error');
      } else {
        setFormState('success');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setFormState('error');
    }
  };

  const heroSymbols = [
    { s: '＋', sz: '3rem', t: '15%', l: '10%', d: 0, dur: 8, r: 15 },
    { s: '－', sz: '2rem', t: '25%', l: '85%', d: 1, dur: 7, r: -10 },
    { s: '×', sz: '4rem', t: '75%', l: '15%', d: 2, dur: 9, r: 20 },
    { s: '÷', sz: '3rem', t: '85%', l: '80%', d: 0.5, dur: 6, r: -5 },
    { s: '√', sz: '5rem', t: '20%', l: '45%', d: 1.5, dur: 10, r: 5 },
    { s: 'π', sz: '2.5rem', t: '65%', l: '40%', d: 2.5, dur: 7, r: 12 },
    { s: '∑', sz: '4rem', t: '45%', l: '90%', d: 3, dur: 11, r: -8 },
    { s: '²', sz: '2.5rem', t: '10%', l: '75%', d: 1.2, dur: 8, r: 0 },
  ];

  return (
    <div className="bg-white">
      {/* SECTION 1 — HERO */}
      <section className="relative w-full bg-gradient-to-br from-navy to-primary py-24 md:py-32 overflow-hidden">
        {/* Floating Symbols Layer */}
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
          {/* Breadcrumb */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center gap-2 text-white/70 text-sm mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Contact Us</span>
          </motion.nav>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl md:text-7xl text-white font-bold mb-8 leading-tight"
          >
            Let's Start a <span className="text-gold">Conversation</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-ice-blue text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
          >
            Whether you're a parent looking for the best math coaching for your child or a student ready to conquer mathematics, My Learning Planet is here to guide you. Find the best maths tuition near me for Classes 6–10 with structured learning and expert support.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2 — CONTACT METHODS */}
      <section className="py-20 -mt-12 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactCard 
              icon={Phone}
              title="Call Us"
              value="+91 9899389313"
              sub="Available Mon-Sat, 10 AM - 7 PM"
              delay={0.4}
            />
            <ContactCard 
              icon={Mail}
              title="Email Us"
              value="connect@mylearningplanet.in"
              sub="We typically respond within 4 hours"
              delay={0.5}
            />
            <ContactCard 
              icon={MapPin}
              title="Visit Us"
              value="15th Floor, OCUS Quantum,
Sector 51, Gurgaon 122003"
              sub="Book a prior appointment for a campus tour"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE "REACH OUT" SPLIT SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[28px] p-8 md:p-12 shadow-[0_20px_60px_rgba(18,81,170,0.12)] border border-ice-blue"
            >
              <h2 className="font-display text-3xl text-navy font-bold mb-8">Send Us a Message</h2>
              
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy mb-4">Message Sent!</h3>
                    <p className="text-slate-gray mb-2">Thank you for reaching out, <strong>{formData.name}</strong>.</p>
                    <p className="text-slate-gray mb-8">We've sent a confirmation to <strong>{formData.email}</strong>. Our team will get back to you within 2–4 hours.</p>
                    <button
                      onClick={() => { setFormState('idle'); setFormData({ name: '', email: '', phone: '', grade: '', message: '' }); }}
                      className="text-primary font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Error banner */}
                    {formState === 'error' && (
                      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm font-medium">
                        {errorMsg}
                      </div>
                    )}

                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className={`w-full bg-ice-blue/30 border rounded-xl py-4 px-6 focus:ring-4 focus:ring-primary/10 transition-all outline-none ${fieldErrors.name ? 'border-red-400 focus:border-red-400' : 'border-ice-blue focus:border-primary'}`}
                        value={formData.name}
                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFieldErrors({ ...fieldErrors, name: '' }); }}
                      />
                      {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className={`w-full bg-ice-blue/30 border rounded-xl py-4 px-6 focus:ring-4 focus:ring-primary/10 transition-all outline-none ${fieldErrors.email ? 'border-red-400 focus:border-red-400' : 'border-ice-blue focus:border-primary'}`}
                        value={formData.email}
                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFieldErrors({ ...fieldErrors, email: '' }); }}
                      />
                      {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                    </div>

                    {/* Phone + Grade */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-navy uppercase tracking-wider">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          className={`w-full bg-ice-blue/30 border rounded-xl py-4 px-6 focus:ring-4 focus:ring-primary/10 transition-all outline-none ${fieldErrors.phone ? 'border-red-400 focus:border-red-400' : 'border-ice-blue focus:border-primary'}`}
                          value={formData.phone}
                          onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setFieldErrors({ ...fieldErrors, phone: '' }); }}
                        />
                        {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-navy uppercase tracking-wider">Student Grade</label>
                        <select
                          className={`w-full bg-ice-blue/30 border rounded-xl py-4 px-6 focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none ${fieldErrors.grade ? 'border-red-400 focus:border-red-400' : 'border-ice-blue focus:border-primary'}`}
                          value={formData.grade}
                          onChange={(e) => { setFormData({ ...formData, grade: e.target.value }); setFieldErrors({ ...fieldErrors, grade: '' }); }}
                        >
                          <option value="">Select Grade</option>
                          <option value="6">Class 6</option>
                          <option value="7">Class 7</option>
                          <option value="8">Class 8</option>
                          <option value="9">Class 9</option>
                          <option value="10">Class 10</option>
                        </select>
                        {fieldErrors.grade && <p className="text-red-500 text-xs mt-1">{fieldErrors.grade}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy uppercase tracking-wider">Your Message</label>
                      <textarea
                        rows={4}
                        placeholder="How can we help you?"
                        className={`w-full bg-ice-blue/30 border rounded-xl py-4 px-6 focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none ${fieldErrors.message ? 'border-red-400 focus:border-red-400' : 'border-ice-blue focus:border-primary'}`}
                        value={formData.message}
                        onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setFieldErrors({ ...fieldErrors, message: '' }); }}
                      />
                      {fieldErrors.message && <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full bg-primary text-white font-bold py-5 rounded-xl shadow-xl shadow-primary/20 hover:bg-navy transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-70"
                    >
                      {formState === 'submitting' ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Column: Why Connect With Us? */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:pt-12"
            >
              <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Why Connect With Us?</span>
              <h2 className="font-display text-4xl md:text-5xl text-navy font-bold mb-8 leading-tight">We're More Than Just a Math Platform.</h2>
              
              <div className="space-y-8 mb-12">
                <BenefitItem 
                  icon={Sparkles} 
                  text="Personalized guidance tailored to your child's unique learning pace and style — ideal for those searching for maths classes near me." 
                />
                <BenefitItem 
                  icon={Clock} 
                  text="Quick response times — we value your time and aim to resolve queries within hours." 
                />
                <BenefitItem 
                  icon={Calendar} 
                  text="Easy demo booking process to experience our structured learning system live, perfect for those looking for mathematics tutoring near me." 
                />
                <BenefitItem 
                  icon={Users} 
                  text="Join a community of 200+ successful students who have conquered their math fears." 
                />
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-br from-ice-blue to-white p-8 rounded-[24px] border border-ice-blue flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <div className="text-center">
                    <p className="text-primary font-bold text-xl leading-none">200+</p>
                    <p className="text-[10px] text-slate-gray uppercase font-bold">Students</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Student Success Count</h4>
                  <p className="text-sm text-slate-gray">Empowering students across Gurgaon to master mathematics with confidence.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — GOOGLE MAPS INTEGRATION */}
      <section className="py-24 bg-ice-blue/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-navy font-bold mb-4">Find Us on the Map</h2>
            <p className="text-slate-gray">Visit our learning center in the heart of Gurugram.</p>
          </div>
          
          <div className="w-full h-[500px] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.89796633632!2d76.76357462430314!3d28.423507239263523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="My Learning Planet Location"
            ></iframe>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <span className="text-navy font-medium">Gurugram, Haryana, India</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <span className="text-navy font-medium">Mon - Sat: 10:00 AM - 7:00 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-12 bg-navy">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-white font-display text-2xl font-bold mb-2">Ready to transform your math skills?</h3>
            <p className="text-white/60">Join Gurgaon's most structured math learning platform today.</p>
          </div>
          <Link href="/"
            className="bg-gold text-navy px-8 py-4 rounded-full font-bold hover:scale-105 transition-all flex items-center gap-2"
          >
            Explore Courses <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
