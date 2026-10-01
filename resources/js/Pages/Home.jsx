import React, { useState, useEffect } from 'react';
import TopBar from '../Components/TopBar';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Catalog from '../Components/Catalog';
import ProductDetailsModal from '../Components/ProductDetailsModal';
import Heritage from '../Components/Heritage';
import EmiCalculator from '../Components/EmiCalculator';
import TestRideModal from '../Components/TestRideModal';
import Showroom from '../Components/Showroom';
import MediaTestimonials from '../Components/MediaTestimonials';
import Footer from '../Components/Footer';
import { BIKE_MODELS } from '../data/bikesData';

export default function Home({ dbProducts = [] }) {
  // Use database products if available, fallback to static dataset
  const activeProducts = dbProducts && dbProducts.length > 0 ? dbProducts : BIKE_MODELS;

  const [activeCategory, setActiveCategory] = useState('all');
  const [isTestRideOpen, setIsTestRideOpen] = useState(false);
  const [selectedBikeForTestRide, setSelectedBikeForTestRide] = useState(null);
  const [selectedBikeForSpecs, setSelectedBikeForSpecs] = useState(null);
  const [selectedBikeForEmi, setSelectedBikeForEmi] = useState(null);

  // Theme Management (Dark / Light mode)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenTestRide = (bike = null) => {
    setSelectedBikeForTestRide(bike);
    setIsTestRideOpen(true);
  };

  const handleOpenEmiForBike = (bike) => {
    setSelectedBikeForEmi(bike);
    const financeElem = document.getElementById('finance');
    if (financeElem) {
      financeElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyPreApproval = ({ model }) => {
    setSelectedBikeForTestRide(model);
    setIsTestRideOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#00205B] selection:text-white transition-colors duration-300 ${
      theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-[#06080D] text-slate-100'
    }`}>
      
      {/* Top Utility Bar */}
      <TopBar
        onOpenTestRide={() => handleOpenTestRide()}
      />

      {/* Main Sticky Glass Navigation */}
      <Navbar
        onOpenTestRide={() => handleOpenTestRide()}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero Showcase Section */}
        <Hero
          bikes={activeProducts}
          onOpenTestRide={(bike) => handleOpenTestRide(bike)}
          onSelectModelForSpecs={(bike) => setSelectedBikeForSpecs(bike)}
        />

        {/* 2. Interactive Vehicle Range Catalog */}
        <Catalog
          bikes={activeProducts}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onSelectModelForSpecs={(bike) => setSelectedBikeForSpecs(bike)}
          onOpenTestRide={(bike) => handleOpenTestRide(bike)}
        />

        {/* 3. Heritage & Story Section ("Since 1898") */}
        <Heritage />

        {/* 5. EMI & Finance Calculator */}
        <EmiCalculator
          bikes={activeProducts}
          selectedBikeForEmi={selectedBikeForEmi}
          onApplyPreApproval={handleApplyPreApproval}
        />

        {/* 6. Showroom & Dealer Locator */}
        <Showroom />

        {/* 7. Media, News & Reviews */}
        <MediaTestimonials />

      </main>

      {/* Footer */}
      <Footer
        onOpenTestRide={() => handleOpenTestRide()}
      />

      {/* Enhanced Product Details & Specs Modal */}
      <ProductDetailsModal
        bike={selectedBikeForSpecs}
        onClose={() => setSelectedBikeForSpecs(null)}
        onOpenTestRide={(bike) => handleOpenTestRide(bike)}
      />

      {/* Test Ride / Product Booking Modal */}
      <TestRideModal
        isOpen={isTestRideOpen}
        onClose={() => setIsTestRideOpen(false)}
        initialBike={selectedBikeForTestRide}
        bikes={activeProducts}
      />

    </div>
  );
}
