import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Volume2, Sparkles, Sun, Moon, Flame, Check, ShieldCheck, ArrowRight, RotateCw } from 'lucide-react';
import { BIKE_MODELS } from '../data/bikesData';

export default function StudioVisualizer({ bikes = [], onOpenTestRide, onSelectModelForSpecs }) {
  const activeBikeList = bikes && bikes.length > 0 ? bikes : BIKE_MODELS;

  const getModelColors = (model) => {
    if (model?.colors && model.colors.length > 0) {
      return model.colors.map(c => ({
        name: c.color_name || c.name || 'Color Variant',
        hex: c.hex_code || c.hex || '#00205B',
        accentHex: c.accent_hex || c.accentHex || '#00A3FF',
        previewUrl: c.image_url || c.previewUrl || model.image || ''
      }));
    }
    return [{ name: 'Default Finish', hex: '#00205B', accentHex: '#00A3FF', previewUrl: model?.image || '' }];
  };

  const [selectedModel, setSelectedModel] = useState(activeBikeList[0]);
  const [selectedColor, setSelectedColor] = useState(() => getModelColors(activeBikeList[0])[0]);
  const [lightingMode, setLightingMode] = useState('cyber'); // 'cyber', 'studio', 'gold'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    const colors = getModelColors(model);
    setSelectedColor(colors[0]);
  };

  const handlePlayEngineSound = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 3000);
  };

  // Lighting environment background styles
  const lightingBgMap = {
    cyber: 'from-[#00205B]/80 via-[#0B132B] to-[#06080D] border-cyan-500/40',
    studio: 'from-slate-900 via-[#0F172A] to-[#06080D] border-slate-700/60',
    gold: 'from-[#2A1D08]/90 via-[#0F172A] to-[#06080D] border-amber-500/40'
  };

  const lightingGlowMap = {
    cyber: 'bg-cyan-500/25 blur-3xl',
    studio: 'bg-slate-400/15 blur-3xl',
    gold: 'bg-amber-500/25 blur-3xl'
  };

  return (
    <section className="py-20 bg-[#06080D] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00205B]/80 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <Palette className="w-3.5 h-3.5" />
            <span>Interactive Virtual Studio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            Customize Your <span className="shimmer-text">Peugeot Colorway</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Switch lighting environments, preview factory paint finishes, and test ride your personalized French scooter in Nepal.
          </p>
        </div>

        {/* Studio Canvas Area */}
        <div className={`glass-panel bg-gradient-to-b ${lightingBgMap[lightingMode]} rounded-3xl p-6 sm:p-10 border transition-all duration-700 shadow-2xl relative`}>
          
          {/* Top Control Bar: Lighting Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/80">
            
            {/* Model Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {activeBikeList.map((model) => (
                <button
                  key={model.id || model.slug}
                  onClick={() => handleSelectModel(model)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    (selectedModel.id || selectedModel.slug) === (model.id || model.slug)
                      ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md scale-105'
                      : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {model.name}
                </button>
              ))}
            </div>

            {/* Studio Environment Toggles */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setLightingMode('cyber')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  lightingMode === 'cyber' ? 'bg-[#00205B] text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cyber Night</span>
              </button>

              <button
                onClick={() => setLightingMode('studio')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  lightingMode === 'studio' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Day Studio</span>
              </button>

              <button
                onClick={() => setLightingMode('gold')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  lightingMode === 'gold' ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Vintage Gold</span>
              </button>
            </div>

          </div>

          {/* Main Stage Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: Colorways & Customizer Controls */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
                  {selectedModel.category}
                </span>
                <h3 className="text-3xl font-heading font-extrabold text-white">
                  {selectedModel.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedModel.description}
                </p>
              </div>

              {/* Color Swatch Picker */}
              <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-300">Selected Finish:</span>
                  <span className="font-semibold text-cyan-300">{selectedColor.name}</span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {getModelColors(selectedModel).map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`relative p-3 rounded-xl border flex items-center gap-2 text-xs transition-all cursor-pointer ${
                        selectedColor.name === color.name
                          ? 'border-cyan-400 bg-cyan-950/60 shadow-[0_0_15px_rgba(0,163,255,0.4)] scale-105'
                          : 'border-slate-800 bg-slate-900 hover:border-slate-700 opacity-80'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-slate-600 shadow-md shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-medium text-slate-200">{color.name}</span>
                      {selectedColor.name === color.name && (
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Engine Sound Simulator Trigger */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Engine Sound Experience</span>
                  <span className="text-[11px] text-slate-400">{selectedModel.soundNote || 'Purring EURO-5 4-stroke engine exhaust note'}</span>
                </div>
                
                <button
                  onClick={handlePlayEngineSound}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 animate-pulse'
                      : 'bg-slate-900 text-cyan-400 border-slate-700 hover:bg-slate-800'
                  }`}
                  aria-label="Play Engine Sound"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Top Speed</span>
                  <span className="font-bold text-cyan-300">{selectedModel.top_speed || selectedModel.topSpeed || '95 km/h'}</span>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Est. Mileage</span>
                  <span className="font-bold text-emerald-400">{selectedModel.mileage || '45 km/L'}</span>
                </div>
              </div>

            </div>

            {/* Right Side: Virtual Showcase Stage with Studio Lighting */}
            <div className="lg:col-span-8 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
              
              {/* Studio Glow Spotlights */}
              <div className={`absolute w-80 h-80 rounded-full transition-all duration-700 ${lightingGlowMap[lightingMode]}`} />
              
              {/* Scooter Cutout Image with Framer Motion Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedModel.id || selectedModel.slug}-${selectedColor.name}`}
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 w-full flex items-center justify-center p-4"
                >
                  <img
                    src={selectedColor.previewUrl || selectedModel.image_url || selectedModel.image || selectedModel.transparentCutout}
                    alt={selectedModel.name}
                    className="max-h-[340px] sm:max-h-[400px] object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Feature Badges & Price Tag */}
              <div className="absolute top-4 left-4 glass-panel bg-slate-950/90 px-4 py-2 rounded-2xl border border-cyan-500/40 text-xs text-slate-300 z-20 shadow-2xl backdrop-blur-md">
                <span className="text-[10px] text-cyan-300 block uppercase font-bold tracking-wider">Standard Ride-Away Price</span>
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  {selectedModel.priceFormatted || `NPR ${Number(selectedModel.price_npr || selectedModel.priceNPR || 370000).toLocaleString('en-NP')}`}
                </span>
              </div>

              <div className="absolute top-4 right-4 glass-panel bg-slate-950/80 px-3.5 py-2 rounded-full border border-cyan-500/30 text-xs font-bold text-cyan-300 flex items-center gap-1.5 z-20 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>EURO-5 Certified</span>
              </div>

            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              * Configure your scooter colorway and test ride at <strong className="text-white">Durbar Marg Flagship Showroom</strong>.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onSelectModelForSpecs(selectedModel)}
                className="flex-1 sm:flex-initial py-3 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80"
              >
                View Full Specs
              </button>
              
              <button
                onClick={() => onOpenTestRide(selectedModel)}
                className="flex-1 sm:flex-initial py-3 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] via-[#0055A5] to-[#00A3FF] border border-cyan-400/40 shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Book This Model</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
