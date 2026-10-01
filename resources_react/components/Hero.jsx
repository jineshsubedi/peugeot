import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Award, Zap, ChevronLeft, ChevronRight, CheckCircle2, Phone, Compass } from 'lucide-react';
import { BIKE_MODELS } from '../data/bikesData';

export default function Hero({ onOpenTestRide, onSelectModelForSpecs }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const heroModels = BIKE_MODELS.slice(0, 4);

  // Auto-play slide switcher every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroModels.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroModels.length]);

  const activeModel = heroModels[currentSlideIndex];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-8 pb-16 bg-[#06080D]">
      
      {/* Background Studio Radial Gradients & Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-[#00205B]/40 via-[#00A3FF]/20 to-transparent rounded-full blur-[150px] pointer-events-none animate-studio-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Background Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Text Content & CTAs */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          
          {/* Official Bangladesh Importer Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#00205B]/90 to-[#0F172A] border border-cyan-500/40 backdrop-blur-md shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">
              Official Peugeot Motocycles Importer — Bangladesh
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.1]"
          >
            French Sophistication Meets <span className="shimmer-text">Urban Agility</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            Pioneering two-wheeler excellence since <strong className="text-cyan-400 font-bold">1898</strong>. Experience EURO-5 French engineering, neo-retro elegance, and sport performance tailored for Dhaka highways.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <button
              onClick={onOpenTestRide}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] via-[#0055A5] to-[#00A3FF] border border-cyan-400/40 shadow-[0_0_25px_rgba(0,163,255,0.4)] hover:shadow-[0_0_40px_rgba(0,163,255,0.7)] transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Book a Test Ride</span>
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
            </button>

            <a
              href="#catalog"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Explore Full Range</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Quick Floating Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-3"
          >
            <div className="flex flex-col items-center lg:items-start space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Official</span>
              </div>
              <span className="text-[11px] text-slate-400">Gulshan Showroom</span>
            </div>

            <div className="flex flex-col items-center lg:items-start space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Award className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">3-Year</span>
              </div>
              <span className="text-[11px] text-slate-400">Factory Warranty</span>
            </div>

            <div className="flex flex-col items-center lg:items-start space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Genuine</span>
              </div>
              <span className="text-[11px] text-slate-400">Parts Guaranteed</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Flagship Vehicle Showcase Stage */}
        <div className="lg:col-span-6 relative">
          
          {/* Card Frame with Glassmorphism */}
          <div className="relative glass-panel bg-gradient-to-b from-slate-900/90 via-[#0B132B]/95 to-[#06080D] rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl overflow-hidden group">
            
            {/* Model Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-[#00205B] text-cyan-300 border border-cyan-500/30">
                {activeModel.badge}
              </span>
              <span className="text-2xl font-heading font-extrabold text-cyan-400">
                {activeModel.priceFormatted}
              </span>
            </div>

            {/* Model Cutout Image Stage with Framer Motion AnimatePresence */}
            <div className="relative h-64 sm:h-72 w-full flex items-center justify-center my-4">
              <div className="absolute w-60 h-60 rounded-full bg-cyan-500/20 blur-3xl group-hover:bg-cyan-500/35 transition-colors" />
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeModel.id}
                  src={activeModel.transparentCutout}
                  alt={activeModel.name}
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.05, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 max-h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] animate-float"
                />
              </AnimatePresence>
            </div>

            {/* Model Name & Specs Pill Row */}
            <div className="space-y-3">
              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  {activeModel.name}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {activeModel.tagline}
                </p>
              </div>

              {/* Key Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="block text-[10px] text-slate-400 uppercase">Engine</span>
                  <span className="font-bold text-slate-200">{activeModel.highlightSpecs[0].value}</span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="block text-[10px] text-slate-400 uppercase">Power</span>
                  <span className="font-bold text-slate-200">{activeModel.power.split('@')[0]}</span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="block text-[10px] text-slate-400 uppercase">Braking</span>
                  <span className="font-bold text-slate-200">{activeModel.braking.split(' ')[0]}</span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="block text-[10px] text-slate-400 uppercase">Warranty</span>
                  <span className="font-bold text-cyan-300">3 Years</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={() => onSelectModelForSpecs(activeModel)}
                  className="flex-1 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 transition-all text-center"
                >
                  View Specifications
                </button>
                <button
                  onClick={onOpenTestRide}
                  className="flex-1 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#00205B] hover:bg-[#003380] border border-cyan-500/40 transition-all text-center shadow-lg"
                >
                  Reserve Now
                </button>
              </div>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                {heroModels.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlideIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlideIndex((prev) => (prev === 0 ? heroModels.length - 1 : prev - 1))}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % heroModels.length)}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
