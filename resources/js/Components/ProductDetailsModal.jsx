import React, { useState, useEffect } from 'react';
import { X, Sparkles, Shield, Zap, Gauge, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ProductDetailsModal({ bike, onClose, onOpenTestRide }) {
  if (!bike) return null;

  const [activeTab, setActiveTab] = useState('Engine Type');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Normalize color variants
  const colorVariants = bike.colors && bike.colors.length > 0 ? bike.colors : [
    { color_name: 'Default Color', hex_code: '#00205B', accent_hex: '#00A3FF', image_url: bike.image_url || bike.image }
  ];

  const currentVariant = colorVariants[selectedColorIndex] || colorVariants[0];

  // Group specs by group name
  const specGroups = bike.specifications && bike.specifications.length > 0 
    ? bike.specifications.reduce((acc, spec) => {
        const group = spec.spec_group || 'Engine Type';
        if (!acc[group]) acc[group] = [];
        acc[group].push(spec);
        return acc;
      }, {})
    : {
        'Engine Type': [
          { spec_key: 'Engine Type', spec_value: bike.engine || 'Single Cylinder 4-Stroke' },
          { spec_key: 'Emission Standard', spec_value: 'EURO-5' },
          { spec_key: 'Max Power', spec_value: bike.power || '10.6 HP' },
          { spec_key: 'Max Torque', spec_value: bike.torque || '9.3 Nm' },
          { spec_key: 'Fuel Supply', spec_value: bike.fuel_system || bike.fuelSystem || 'EFI (Electronic Fuel Injection)' },
          { spec_key: 'Fuel Consumption', spec_value: '2.3 L / 100 km' },
          { spec_key: 'Top Speed', spec_value: bike.top_speed || bike.topSpeed || '95 km/h' },
        ],
        'Trim And Rear Chassis': [
          { spec_key: 'Front Suspension', spec_value: 'Hydraulic Telescopic Fork 32mm' },
          { spec_key: 'Rear Suspension', spec_value: 'Hydraulic Shock Absorber' },
          { spec_key: 'Braking System', spec_value: bike.braking || 'SBC Synchro Disc Brakes' },
        ],
        'Dimensions': [
          { spec_key: 'Seat Height', spec_value: '770 mm' },
          { spec_key: 'Fuel Tank', spec_value: '8.5 Litres' },
          { spec_key: 'Warranty', spec_value: bike.warranty || '3 Years / 30,000 KM' },
        ],
        'Others': [
          { spec_key: 'Lighting', spec_value: 'Full LED Lion Signature DRL' },
          { spec_key: 'Mileage', spec_value: bike.mileage || '45 km/L' }
        ]
      };

  const specTabNames = Object.keys(specGroups);

  useEffect(() => {
    if (specTabNames.length > 0) {
      setActiveTab(specTabNames[0]);
    }
  }, [bike]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#090B10] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-6 text-white">
        
        {/* French Accent Line */}
        <div className="h-1 french-accent" />

        {/* Top Sticky Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-[#0B132B]/90 backdrop-blur-md sticky top-0 z-20">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              {bike.category || 'Peugeot Scooter'}
            </span>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl tracking-wide text-white mt-1">
              {bike.name}
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-8 space-y-10 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Hero Showcase & Design Ticker */}
          <div className="relative rounded-2xl overflow-hidden glass-panel p-6 sm:p-8 border border-slate-800 text-center">
            
            {/* Ticker Banner */}
            <div className="font-heading font-black text-xs sm:text-sm tracking-widest text-slate-500 uppercase mb-6 flex items-center justify-center gap-3">
              <span>DESIGN</span>
              <span className="text-cyan-500">•</span>
              <span>COMFORT & PRACTICALITY</span>
              <span className="text-cyan-500">•</span>
              <span>SPORT DNA</span>
            </div>

            {/* Vehicle Showcase Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Product Image */}
              <div className="lg:col-span-7 relative flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-transparent blur-3xl rounded-full" />
                <img
                  src={currentVariant.image_url || bike.image}
                  alt={bike.name}
                  className="relative z-10 max-h-80 object-contain drop-shadow-[0_20px_40px_rgba(0,163,255,0.3)] transition-all duration-500 hover:scale-105"
                />
              </div>

              {/* Product Overview & Price */}
              <div className="lg:col-span-5 text-left space-y-4">
                {bike.badge && (
                  <span className="inline-block px-3 py-1 bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-full">
                    {bike.badge}
                  </span>
                )}
                
                <h3 className="font-heading font-bold text-2xl text-white leading-tight">
                  {bike.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {bike.description || bike.tagline}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Official Nepal Price</div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-cyan-400">
                    NPR {Number(bike.price_npr || bike.priceNPR || 370000).toLocaleString('en-NP')}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Include 3 Years Warranty / 30,000 KM</div>
                </div>

                {/* Color Selector Swatches */}
                {colorVariants.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-slate-300 mb-2">
                      Color Variant: <span className="text-cyan-400">{currentVariant.color_name || currentVariant.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {colorVariants.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColorIndex(idx)}
                          className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                            selectedColorIndex === idx ? 'border-cyan-400 scale-110 shadow-lg' : 'border-slate-700 opacity-70 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c.hex_code || c.hex }}
                          title={c.color_name || c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTA */}
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenTestRide) onOpenTestRide(bike);
                  }}
                  className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] via-[#0055A5] to-[#00A3FF] border border-cyan-400/40 shadow-lg hover:shadow-cyan-500/40 flex items-center justify-center gap-2 btn-cta cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  Book Now / Request Test Ride
                </button>
              </div>

            </div>
          </div>

          {/* Section 2: TECHNICAL SPECIFICATIONS (Reference Screenshot Layout) */}
          <div className="space-y-6">
            
            <div className="text-center">
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl uppercase tracking-widest text-cyan-400">
                TECHNICAL SPECIFICATIONS
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Precision French engineering built for Nepal riding conditions
              </p>
            </div>

            {/* Key Highlight Metrics (3 Big Stats) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              
              <div className="p-6 rounded-2xl glass-panel border border-slate-800">
                <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Displacement / Engine</div>
                <div className="font-heading font-black text-3xl text-white">
                  {bike.engine ? bike.engine.split(' ')[0] + ' ' + (bike.engine.split(' ')[1] || 'CC') : '125 CC'}
                </div>
                <div className="text-[11px] text-cyan-400 mt-1">EURO-5 EFI Engine</div>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-slate-800">
                <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Max Power</div>
                <div className="font-heading font-black text-3xl text-white">
                  {bike.power || '10.6 HP'}
                </div>
                <div className="text-[11px] text-cyan-400 mt-1">Instant Throttle Response</div>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-slate-800">
                <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Max Torque</div>
                <div className="font-heading font-black text-3xl text-white">
                  {bike.torque || '9.3 Nm'}
                </div>
                <div className="text-[11px] text-cyan-400 mt-1">Smooth Urban Pulling Power</div>
              </div>

            </div>

            {/* Specification Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800 pb-4">
              {specTabNames.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Specification Details Grid */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(specGroups[activeTab] || []).map((spec, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase mb-0.5">
                      {spec.spec_key}
                    </div>
                    <div className="font-heading font-bold text-sm text-cyan-300">
                      {spec.spec_value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 3: Feature Highlights Showcase */}
          {bike.features && bike.features.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="font-heading font-extrabold text-xl uppercase tracking-widest text-white">
                  PREMIUM FEATURES & HIGHLIGHTS
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bike.features.map((feat, idx) => (
                  <div key={idx} className="glass-panel rounded-2xl overflow-hidden border border-slate-800 p-4 space-y-3">
                    {feat.image_url && (
                      <img
                        src={feat.image_url}
                        alt={feat.title}
                        className="w-full h-40 object-cover rounded-xl border border-slate-800"
                      />
                    )}
                    <h4 className="font-heading font-bold text-sm text-cyan-400 uppercase">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Available Color Variants Thumbnails */}
          {colorVariants.length > 0 && (
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4 text-center">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-300">
                Available Colors in Nepal
              </h4>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {colorVariants.map((variant, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`cursor-pointer p-3 rounded-2xl border transition-all text-center group ${
                      selectedColorIndex === idx ? 'border-cyan-400 bg-cyan-950/40' : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <img
                      src={variant.image_url || bike.image}
                      alt={variant.color_name}
                      className="w-24 h-20 object-contain mx-auto group-hover:scale-105 transition-transform"
                    />
                    <div className="text-[11px] font-bold text-slate-300 mt-2">
                      {variant.color_name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-[#0B132B]/90 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Peugeot Motocycles Nepal Flagship Store • Durbar Marg
          </div>
          <button
            onClick={() => {
              onClose();
              if (onOpenTestRide) onOpenTestRide(bike);
            }}
            className="px-6 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] to-[#00A3FF] border border-cyan-400/40 shadow-lg cursor-pointer"
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
}
