'use client'

import Link from 'next/link'
import { Globe, ArrowLeft, Home, Calculator, Ruler, GraduationCap } from 'lucide-react'
import { motion } from 'motion/react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden bg-white">
      {/* Background Decorative Elements (Math symbols) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 text-[#1251AA]"
        >
          <Calculator size={120} />
        </motion.div>
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-20 text-[#F5A623]"
        >
          <Ruler size={100} />
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 text-[#1251AA]"
        >
          <GraduationCap size={150} />
        </motion.div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#EAF1FF] text-[#1251AA] mb-8 shadow-sm"
        >
          <Globe className="w-10 h-10" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-7xl md:text-9xl font-bold text-[#0A1F5E] mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-2xl md:text-3xl font-bold text-charcoal mb-6"
        >
          Oops! This page is out of syllabus.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-lg text-[#5A6B82] mb-12 leading-relaxed"
        >
          The page you're looking for doesn't exist or has been moved. 
          Don't worry, we can help you find your way back to your learning path.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#1251AA] text-white font-sans font-bold px-8 py-4 rounded-full hover:bg-[#0A1F5E] transition-all duration-300 shadow-[0_4px_14px_rgba(18,81,170,0.25)] hover:shadow-[0_6px_20px_rgba(18,81,170,0.35)] hover:scale-[1.05]"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 font-sans font-medium text-[#1251AA] border-[1.5px] border-[#1251AA] px-8 py-4 rounded-full hover:bg-[#EAF1FF] transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Previous Page
          </button>
        </motion.div>
      </div>
    </div>
  )
}
