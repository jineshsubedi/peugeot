import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import StudioVisualizer from './components/StudioVisualizer';
import SpecsModal from './components/SpecsModal';
import Heritage from './components/Heritage';
import EmiCalculator from './components/EmiCalculator';
import TestRideModal from './components/TestRideModal';
import Showroom from './components/Showroom';
import MediaTestimonials from './components/MediaTestimonials';
import DealerModal from './components/DealerModal';
import Footer from './components/Footer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isTestRideOpen, setIsTestRideOpen] = useState(false);
  const [selectedBikeForTestRide, setSelectedBikeForTestRide] = useState(null);
  const [selectedBikeForSpecs, setSelectedBikeForSpecs] = useState(null);
  const [isDealerModalOpen, setIsDealerModalOpen] = useState(false);
  const [selectedBikeForEmi, setSelectedBikeForEmi] = useState(null);

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

  const handleApplyPreApproval = ({ model, downPaymentBDT, emiBDT, tenureMonths }) => {
    setSelectedBikeForTestRide(model);
    setIsTestRideOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans selection:bg-[#00205B] selection:text-white">
      
      {/* Top Utility Bar */}
      <TopBar
        onOpenTestRide={() => handleOpenTestRide()}
        onOpenDealerModal={() => setIsDealerModalOpen(true)}
      />

      {/* Main Sticky Glass Navigation */}
      <Navbar
        onOpenTestRide={() => handleOpenTestRide()}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero Showcase Section */}
        <Hero
          onOpenTestRide={() => handleOpenTestRide()}
          onSelectModelForSpecs={(bike) => setSelectedBikeForSpecs(bike)}
        />

        {/* 2. Interactive Vehicle Range Catalog */}
        <Catalog
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onSelectModelForSpecs={(bike) => setSelectedBikeForSpecs(bike)}
          onOpenTestRide={(bike) => handleOpenTestRide(bike)}
        />

        {/* 3. Interactive Virtual Studio & 360 Color Customizer */}
        <StudioVisualizer
          onOpenTestRide={(bike) => handleOpenTestRide(bike)}
          onSelectModelForSpecs={(bike) => setSelectedBikeForSpecs(bike)}
        />

        {/* 4. Heritage & Story Section ("Since 1898") */}
        <Heritage />

        {/* 5. EMI & Finance Calculator */}
        <EmiCalculator
          selectedBikeForEmi={selectedBikeForEmi}
          onApplyPreApproval={handleApplyPreApproval}
        />

        {/* 6. Showroom & Dealer Locator */}
        <Showroom
          onOpenDealerModal={() => setIsDealerModalOpen(true)}
        />

        {/* 7. Media, News & Reviews */}
        <MediaTestimonials />

      </main>

      {/* Footer */}
      <Footer
        onOpenTestRide={() => handleOpenTestRide()}
        onOpenDealerModal={() => setIsDealerModalOpen(true)}
      />

      {/* Specs Modal */}
      <SpecsModal
        bike={selectedBikeForSpecs}
        onClose={() => setSelectedBikeForSpecs(null)}
        onOpenTestRide={(bike) => handleOpenTestRide(bike)}
        onOpenEmiForBike={(bike) => handleOpenEmiForBike(bike)}
      />

      {/* Test Ride Reservation Modal */}
      <TestRideModal
        isOpen={isTestRideOpen}
        onClose={() => setIsTestRideOpen(false)}
        initialBike={selectedBikeForTestRide}
      />

      {/* Dealer Inquiry Modal */}
      <DealerModal
        isOpen={isDealerModalOpen}
        onClose={() => setIsDealerModalOpen(false)}
      />

    </div>
  );
}
