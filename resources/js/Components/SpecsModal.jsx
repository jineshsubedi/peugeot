import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, Calculator, Gauge, Cpu, Disc, Fuel, Scale } from 'lucide-react';

export default function SpecsModal({ bike, onClose, onOpenTestRide, onOpenEmiForBike }) {
  if (!bike) return null;

  const [selectedColor, setSelectedColor] = useState(bike.colors[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel bg-[#0B132B] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          aria-label="Close Specs Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Transparent Scooter Image & Colors */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-64 sm:h-72 w-full flex items-center justify-center p-4 bg-gradient-to-b from-slate-950/80 to-transparent rounded-2xl border border-slate-800">
              <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full" />
              <img
                src={bike.transparentCutout}
                alt={bike.name}
                className="relative z-10 max-h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* Color Swatch Picker */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Available Factory Colorways:
              </span>
              <div className="flex items-center gap-3">
                {bike.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      selectedColor.name === color.name
                        ? 'border-cyan-400 bg-cyan-950/50 text-cyan-200 shadow-md'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-700"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Warranty Badge */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-950 border border-emerald-500/30 text-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Official Peugeot Warranty</span>
                <span className="text-slate-400">{bike.warranty} Coverage Included</span>
              </div>
            </div>
          </div>

          {/* Right Column: Full Technical Specifications */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header */}
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00205B] text-cyan-300 border border-cyan-500/30">
                {bike.category}
              </span>
              <h2 className="text-3xl font-heading font-extrabold text-white">{bike.name}</h2>
              <p className="text-sm text-slate-300">{bike.description}</p>
            </div>

            {/* Price Tag */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Standard Ride-Away Price (Kathmandu)</span>
                <span className="text-3xl font-heading font-extrabold text-cyan-400">{bike.priceFormatted}</span>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30 font-semibold">
                In Stock at Durbar Marg Showroom
              </span>
            </div>

            {/* Technical Specs Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Technical Specifications</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {bike.highlightSpecs.map((spec, i) => (
                  <div key={i} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400 font-medium">{spec.label}</span>
                    <span className="font-bold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenTestRide(bike);
                }}
                className="py-3 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] via-[#0055A5] to-[#00A3FF] border border-cyan-400/40 shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Book Test Ride</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenEmiForBike(bike);
                }}
                className="py-3 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>Calculate Monthly EMI</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
