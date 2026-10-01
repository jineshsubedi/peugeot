import React, { useState } from 'react';
import { Newspaper, Star, Play, Quote, ExternalLink, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS } from '../data/bikesData';

export default function MediaTestimonials() {
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const articles = [
    {
      id: 1,
      title: "Peugeot Motocycles Flagship Showroom Opens in Durbar Marg, Kathmandu",
      date: "September 2026",
      category: "Press Release",
      summary: "Official importer launches French premium scooter lineup including Django 125 and Speedfight 4+ with 3-year warranty in Nepal.",
      tag: "Official Launch"
    },
    {
      id: 2,
      title: "Django 125 Road Test: French Elegance on Kathmandu Highways",
      date: "August 2026",
      category: "Media Review",
      summary: "Comprehensive test drive review exploring the EURO-5 EFI engine, SBC synchro braking system, and retro vintage ergonomics.",
      tag: "Review"
    },
    {
      id: 3,
      title: "XP400 GT Maxi Adventure Scooter Lands in Nepal",
      date: "July 2026",
      category: "Product Reveal",
      summary: "Peugeot's 400cc 36.7HP crossover adventure maxi scooter arrives with 5-inch TFT GPS navigation and spoked Pirelli wheels.",
      tag: "Flagship"
    }
  ];

  return (
    <section id="media" className="py-20 bg-[#090B10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00205B]/60 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Media, News & Owner Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            What the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Press & Riders Say</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Read news coverage, watch Kathmandu road test reviews, and hear real experiences from Peugeot scooter owners.
          </p>
        </div>

        {/* Video & News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {articles.map((art) => (
            <div
              key={art.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/20">
                    {art.tag}
                  </span>
                  <span className="text-xs text-slate-500">{art.date}</span>
                </div>

                <h3 className="text-lg font-heading font-bold text-white hover:text-cyan-300 transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">{art.category}</span>
                <button
                  onClick={() => alert(`Opening official news article: ${art.title}`)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  Read Full <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Testimonials Header */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-heading font-bold text-white">
            Real Commuter Reviews in <span className="text-cyan-400">Nepal</span>
          </h3>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel bg-[#0B132B]/60 rounded-2xl p-6 border border-slate-800 relative space-y-4 shadow-lg"
            >
              <Quote className="w-8 h-8 text-cyan-500/20 absolute top-4 right-4" />

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "{t.text}"
              </p>

              <div className="pt-3 border-t border-slate-800/80">
                <div className="font-bold text-white text-sm">{t.name}</div>
                <div className="text-xs text-cyan-400 font-semibold">{t.model}</div>
                <div className="text-[11px] text-slate-400">{t.location}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
