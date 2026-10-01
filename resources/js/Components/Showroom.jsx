import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Building2 } from 'lucide-react';
import { SHOWROOM_INFO } from '../data/bikesData';

export default function Showroom() {
  return (
    <section id="showroom" className="py-20 bg-[#06080D] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00205B]/60 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Flagship Experience Center</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            Visit Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Kathmandu Showroom</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Step into the world of French neo-retro luxury. Test ride the Django, Speedfight, or XP400 with our official sales advisors.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Flagship Details & Action Buttons */}
          <div className="lg:col-span-6 glass-panel bg-[#0B132B]/90 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6 shadow-2xl">
            
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Kathmandu Headquarters</span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                {SHOWROOM_INFO.name}
              </h3>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-[#00205B] text-cyan-300 border border-cyan-500/30 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white block">Location & Address</span>
                <p className="text-slate-300 leading-relaxed">{SHOWROOM_INFO.address}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white block">Opening Hours</span>
                <p className="text-slate-300">{SHOWROOM_INFO.hours}</p>
              </div>
            </div>

            {/* Hotline & Email */}
            <div className="flex items-start gap-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white block">Hotline & Customer Care</span>
                <p className="text-cyan-400 font-bold">{SHOWROOM_INFO.hotline}</p>
                <p className="text-slate-400 text-xs">{SHOWROOM_INFO.email}</p>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
              <a
                href={`tel:${SHOWROOM_INFO.hotline}`}
                className="py-3 px-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#00205B] hover:bg-[#003380] border border-cyan-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Flagship Store</span>
              </a>

              <a
                href="https://maps.google.com/?q=Durbar+Marg+Kathmandu"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Iframe */}
          <div className="lg:col-span-6 relative h-[420px] rounded-3xl overflow-hidden glass-panel border border-slate-700/80 shadow-2xl">
            <iframe
              title="Peugeot Showroom Location Map"
              src={SHOWROOM_INFO.googleMapsEmbed}
              className="w-full h-full border-0 filter grayscale contrast-125 invert-[0.9] hover:filter-none transition-all duration-500"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs flex items-center justify-between text-slate-300">
              <span className="font-semibold text-cyan-300">Durbar Marg (Ground Floor), Kathmandu</span>
              <a
                href="https://maps.google.com/?q=Durbar+Marg+Kathmandu"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                Open in Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
