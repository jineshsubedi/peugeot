import React, { useState } from 'react';
import { History, Award, Sparkles, Shield, Flame, CheckCircle } from 'lucide-react';
import { HERITAGE_TIMELINE } from '../data/bikesData';

export default function Heritage() {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(1);

  return (
    <section id="heritage" className="py-20 bg-[#06080D] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background Decorative Lion Graphic */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none w-[600px] h-[600px]">
        <img src="/peugeot-lion.svg" alt="Background Peugeot Lion" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00205B]/60 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
            <History className="w-3.5 h-3.5" />
            <span>French Legacy Since 1898</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            World’s Oldest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Two-Wheeler Brand</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-normal">
            For over 128 years, Peugeot Motocycles has pioneered French automotive craftsmanship. From the 1898 Paris Motor Show to modern Dhaka boulevards.
          </p>
        </div>

        {/* Interactive Timeline Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          {HERITAGE_TIMELINE.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTimelineIndex(idx)}
              className={`cursor-pointer glass-panel p-6 rounded-2xl border transition-all duration-300 ${
                activeTimelineIndex === idx
                  ? 'bg-[#0B132B] border-cyan-400 shadow-[0_0_25px_rgba(0,163,255,0.2)] scale-105'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-2xl font-heading font-extrabold ${activeTimelineIndex === idx ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {item.year}
                </span>
                {activeTimelineIndex === idx && (
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                )}
              </div>
              <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Side-by-Side Comparison: Vintage Roots vs Modern Performance */}
        <div className="glass-panel bg-gradient-to-b from-[#0B132B]/80 to-slate-950/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              The Evolution of French Luxury: <span className="text-cyan-400">1955 S55 Heritage vs 2026 Django EURO-5</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* 1955 Vintage Heritage Column */}
            <div className="bg-slate-950/70 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> 1955 Heritage Icon (Peugeot S55)
                </span>
                <span className="text-xs text-slate-500">Parisian Vintage</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Dual seat vintage leather saddle architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Front luggage trunk integrated into body shell</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Handcrafted pressed-steel aerodynamic bodywork</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Original Lion badge mounted on front grille</span>
                </li>
              </ul>
            </div>

            {/* 2026 Modern EURO-5 Performance Column */}
            <div className="bg-[#00205B]/40 p-6 rounded-2xl border border-cyan-500/40 space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> 2026 Modern Engineering (Django 125)
                </span>
                <span className="text-xs text-cyan-400 font-bold">EURO-5 EFI</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>EasyMotion 125cc EURO-5 Electronic Fuel Injection (EFI)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>SBC / ABS synchronized dual-disc breaking for safety</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Full LED lion signature daytime running lights (DRL)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>12V device charging port & glove box storage</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
