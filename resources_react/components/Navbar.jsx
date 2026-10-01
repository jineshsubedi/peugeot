import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sparkles, Bike, Calculator, History, MapPin, Newspaper } from 'lucide-react';

export default function Navbar({ onOpenTestRide, activeCategory, onSelectCategory }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modelsDropdownOpen, setModelsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Models', href: '#catalog', hasDropdown: true },
    { name: 'Finance', href: '#finance' },
    { name: 'Heritage', href: '#heritage' },
    { name: 'Media & News', href: '#media' },
    { name: 'Showroom', href: '#showroom' },
  ];

  const modelCategories = [
    { name: 'All Range', key: 'all', subtitle: 'Explore full Bangladesh lineup' },
    { name: 'Neo-Retro Django', key: 'django', subtitle: 'Django 125 Classic & Caferacer' },
    { name: 'Sport Speedfight', key: 'speedfight', subtitle: 'Speedfight 4+ Sport 125' },
    { name: 'Adventure & Urban', key: 'xp400', subtitle: 'XP400 GT & Tweet 125 GT' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#090B10]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3' : 'bg-[#090B10]/70 backdrop-blur-md py-4'
    }`}>
      {/* French Tricolor Accent Line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 french-accent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Lion Shield */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/peugeot-lion.svg" 
              alt="Peugeot Motocycles Lion Shield" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(0,163,255,0.4)]"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-widest text-white uppercase group-hover:text-cyan-400 transition-colors">
                PEUGEOT
              </span>
              <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.2 bg-[#00205B] text-cyan-300 border border-cyan-500/30 rounded uppercase">
                BD
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase -mt-1">
              MOTOCYCLES
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          
          {/* Models Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setModelsDropdownOpen(true)}
            onMouseLeave={() => setModelsDropdownOpen(false)}
          >
            <a 
              href="#catalog"
              className="flex items-center gap-1.5 text-slate-200 hover:text-[#00A3FF] transition-colors py-2"
            >
              <span>Models</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${modelsDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </a>

            {/* Dropdown Menu Card */}
            {modelsDropdownOpen && (
              <div className="absolute top-full left-0 w-72 glass-panel bg-[#0B132B]/95 rounded-xl p-3 border border-slate-700/80 shadow-2xl backdrop-blur-2xl transition-all duration-200 animate-fadeIn">
                <div className="text-[11px] font-bold tracking-widest text-slate-400 uppercase px-3 py-1 mb-1 border-b border-slate-800">
                  Select Category
                </div>
                {modelCategories.map((cat) => (
                  <a
                    key={cat.key}
                    href="#catalog"
                    onClick={() => {
                      onSelectCategory(cat.key);
                      setModelsDropdownOpen(false);
                    }}
                    className={`block px-3 py-2.5 rounded-lg text-xs transition-all ${
                      activeCategory === cat.key 
                        ? 'bg-[#00205B] text-cyan-300 font-bold border border-cyan-500/30' 
                        : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-sm">{cat.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{cat.subtitle}</div>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#finance" className="text-slate-300 hover:text-[#00A3FF] transition-colors">
            Finance & EMI
          </a>
          <a href="#heritage" className="text-slate-300 hover:text-[#00A3FF] transition-colors">
            Heritage
          </a>
          <a href="#media" className="text-slate-300 hover:text-[#00A3FF] transition-colors">
            News & Reviews
          </a>
          <a href="#showroom" className="text-slate-300 hover:text-[#00A3FF] transition-colors">
            Showroom
          </a>
        </nav>

        {/* Primary CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenTestRide}
            className="relative group overflow-hidden px-6 py-2.5 rounded-lg font-heading font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-[#00205B] via-[#0055A5] to-[#00A3FF] border border-cyan-400/40 shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(0,163,255,0.6)] transition-all duration-300 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
              Book a Test Ride
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel bg-[#090B10]/95 border-b border-slate-800 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Navigation</div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-cyan-300 text-base font-semibold py-2 border-b border-slate-800/60"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestRide();
              }}
              className="w-full py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] to-[#00A3FF] border border-cyan-400/40 shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              Book a Test Ride
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
