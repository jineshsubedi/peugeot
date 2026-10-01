import React from 'react';
import { Facebook, Instagram, Youtube, ShieldCheck, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { SHOWROOM_INFO } from '../data/bikesData';

export default function Footer({ onOpenTestRide, onOpenDealerModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040508] text-slate-400 text-xs border-t border-slate-800/80 relative">
      
      {/* French Accent Line */}
      <div className="h-1 french-accent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/peugeot-lion.svg" alt="Peugeot Logo" className="w-8 h-10 object-contain" />
              <div>
                <span className="font-heading font-extrabold text-xl text-white tracking-widest block uppercase">
                  PEUGEOT
                </span>
                <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase">
                  MOTOCYCLES BANGLADESH
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Official distributor of Peugeot Motocycles in Bangladesh. Delivering French neo-retro luxury, EURO-5 engineering performance, and 3-year warranty protection.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 transition-colors"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Models Range</h4>
            <ul className="space-y-2">
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Django 125 Classic</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Django 125 Caferacer</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Speedfight 4+ Sport</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">XP400 GT Maxi Adventure</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Tweet 125 GT Urban</a></li>
            </ul>
          </div>

          {/* Col 4: Ownership & Service */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Ownership & Services</h4>
            <ul className="space-y-2">
              <li><a href="#finance" className="hover:text-cyan-400 transition-colors">EMI Loan Calculator</a></li>
              <li><button onClick={onOpenTestRide} className="hover:text-cyan-400 transition-colors text-left">Book a Test Ride</button></li>
              <li><button onClick={onOpenDealerModal} className="hover:text-cyan-400 transition-colors text-left">Dealer Network Application</button></li>
              <li><a href="#heritage" className="hover:text-cyan-400 transition-colors">Peugeot Heritage (1898)</a></li>
              <li><a href="#showroom" className="hover:text-cyan-400 transition-colors">Dhaka Flagship Showroom</a></li>
            </ul>
          </div>

          {/* Col 5: Showroom Address */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Gulshan Showroom</h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{SHOWROOM_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-white font-semibold">{SHOWROOM_INFO.hotline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{SHOWROOM_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer Banner */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-1 text-[11px] text-slate-500 mb-8">
          <p><strong className="text-slate-400">Ride-Away Price Terms:</strong> All prices listed are standard ex-showroom Bangladesh Taka (BDT) rates including applicable duties. Registration, insurance, and road tax fees may vary according to BRTA regulations.</p>
          <p><strong className="text-slate-400">Warranty Policy:</strong> Official 3-Year / 30,000 KM manufacturer limited warranty valid across authorized Peugeot service centers in Bangladesh.</p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 Peugeot Motocycles Bangladesh. All Rights Reserved. Inspired by peugeotmotocycles.com.bd</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}
