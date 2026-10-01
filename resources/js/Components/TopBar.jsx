import React from 'react';
import { MapPin, Phone, ShieldCheck, Download } from 'lucide-react';
import { SHOWROOM_INFO } from '../data/bikesData';

export default function TopBar({ onOpenTestRide }) {
  return (
    <div className="bg-[#04060A] text-slate-300 border-b border-slate-800/80 text-xs py-2 px-4 sm:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Side: Address & Phone */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-slate-300">
          <div className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#00A3FF] shrink-0" />
            <span className="font-medium truncate max-w-[280px] sm:max-w-none">
              {SHOWROOM_INFO.address}
            </span>
          </div>

          <a 
            href={`tel:${SHOWROOM_INFO.hotline}`} 
            className="flex items-center gap-1.5 hover:text-white transition-colors group"
          >
            <Phone className="w-3.5 h-3.5 text-[#00A3FF] group-hover:animate-bounce shrink-0" />
            <span className="font-semibold text-slate-200">{SHOWROOM_INFO.hotline}</span>
          </a>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Nepal Importer</span>
          </div>
        </div>

        {/* Right Side: Quick Action Link */}
        <div className="flex items-center gap-4 text-xs">
          <button 
            onClick={() => {
              alert("Peugeot Motocycles Nepal 2026 Official E-Brochure downloaded successfully!");
            }}
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors text-slate-300 font-medium cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>Download Official E-Brochure</span>
          </button>
        </div>
      </div>
    </div>
  );
}
