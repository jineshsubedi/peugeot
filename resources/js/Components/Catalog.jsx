import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, SlidersHorizontal, Info } from 'lucide-react';
import { BIKE_MODELS } from '../data/bikesData';

export default function Catalog({ bikes, activeCategory, onSelectCategory, onSelectModelForSpecs, onOpenTestRide }) {
  const [selectedColorMap, setSelectedColorMap] = useState({});

  const bikeList = bikes && bikes.length > 0 ? bikes : BIKE_MODELS;

  const categories = [
    { id: 'all', label: 'All Range' },
    { id: 'django', label: 'Neo-Retro (Django)' },
    { id: 'speedfight', label: 'Sport / Street (Speedfight)' },
    { id: 'xp400', label: 'Maxi / Adventure (XP400 / Tweet)' }
  ];

  const filteredBikes = activeCategory === 'all'
    ? bikeList
    : bikeList.filter(b => (b.category_key || b.categoryKey) === activeCategory);

  const handleColorSelect = (bikeId, colorObj) => {
    setSelectedColorMap(prev => ({ ...prev, [bikeId]: colorObj }));
  };

  return (
    <section id="catalog" className="py-24 bg-[#06080D] relative">
      
      {/* Background Accent Radial Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00205B]/80 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider shadow-md">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Peugeot Motocycles Range</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            Explore the <span className="shimmer-text">Nepal Lineup</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-normal">
            From iconic neo-retro Parisian scooters to high-powered adventure Maxi machines. Built with EURO-5 EFI engine technology & 3-year warranty.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00205B] via-[#0055A5] to-[#00A3FF] text-white border border-cyan-400/50 shadow-[0_0_25px_rgba(0,163,255,0.4)] scale-105'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Card Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredBikes.map((bike) => {
              const colors = bike.colors && bike.colors.length > 0 ? bike.colors : [
                { color_name: 'Default', name: 'Default', hex_code: '#00205B', hex: '#00205B', image_url: bike.image, previewUrl: bike.image }
              ];
              const activeColor = selectedColorMap[bike.id] || colors[0];

              const priceNpr = bike.price_npr || bike.priceNPR || 370000;
              const formattedPrice = bike.priceFormatted || `NPR ${Number(priceNpr).toLocaleString('en-NP')}`;

              return (
                <motion.div
                  layout
                  key={bike.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel glass-card-hover rounded-3xl p-6 flex flex-col justify-between relative group border border-slate-800"
                >
                  
                  <div>
                    {/* Badge & Color Swatches Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#00205B] text-cyan-300 border border-cyan-500/30">
                        {bike.category}
                      </span>
                      
                      {/* Color Swatch Dots */}
                      <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800">
                        {colors.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => handleColorSelect(bike.id, c)}
                            className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                              (activeColor.color_name || activeColor.name) === (c.color_name || c.name) ? 'border-cyan-400 scale-125 shadow-sm' : 'border-slate-700 opacity-70 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: c.hex_code || c.hex }}
                            title={c.color_name || c.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Scooter Image Container */}
                    <div className="relative h-60 w-full flex items-center justify-center my-4 py-2 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950/60 to-transparent border border-slate-900">
                      <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                      
                      <img
                        src={activeColor.image_url || activeColor.previewUrl || bike.image}
                        alt={bike.name}
                        className="relative z-10 max-h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.75)] group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Active Color Name Pill */}
                      <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                        {activeColor.color_name || activeColor.name}
                      </span>
                    </div>

                    {/* Bike Name & Tagline */}
                    <div className="space-y-1 mb-4">
                      <h3 className="text-2xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {bike.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium line-clamp-2">
                        {bike.tagline}
                      </p>
                    </div>

                    {/* Specs Pill Row */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-6">
                      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">Engine</span>
                        <span className="font-bold text-slate-200">{bike.engine ? bike.engine.split(' ')[0] + ' ' + (bike.engine.split(' ')[1] || '') : '125 cc'}</span>
                      </div>
                      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">Power</span>
                        <span className="font-bold text-slate-200">{bike.power ? bike.power.split('@')[0] : '10.6 HP'}</span>
                      </div>
                      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">Fuel System</span>
                        <span className="font-bold text-slate-200">{bike.fuel_system || bike.fuelSystem || 'EFI'}</span>
                      </div>
                      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">Braking</span>
                        <span className="font-bold text-cyan-300">{bike.braking ? bike.braking.split(' ')[0] : 'Disc'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: NPR Price & Action Buttons */}
                  <div className="space-y-3 pt-3 border-t border-slate-800/80">
                    
                    {/* Price Display */}
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400 font-semibold uppercase">Official Price</span>
                      <span className="text-2xl font-heading font-extrabold text-cyan-400">
                        {formattedPrice}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => onSelectModelForSpecs(bike)}
                        className="py-3 px-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-cyan-300 border border-slate-700/80 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-cyan-400" />
                        <span>View Specs</span>
                      </button>

                      <button
                        onClick={() => onOpenTestRide(bike)}
                        className="py-3 px-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] to-[#0055A5] hover:from-[#003380] hover:to-[#00A3FF] border border-cyan-500/40 shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                        <span>Book Ride</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
