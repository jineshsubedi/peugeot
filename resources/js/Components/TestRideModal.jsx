import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Calendar, Phone, Mail, User, MapPin, Bike } from 'lucide-react';
import confetti from 'canvas-confetti';
import axios from 'axios';
import { BIKE_MODELS } from '../data/bikesData';

export default function TestRideModal({ isOpen, onClose, initialBike, bikes, emiData }) {
  if (!isOpen) return null;

  const bikeOptions = bikes && bikes.length > 0 ? bikes : BIKE_MODELS;

  const defaultModelId = initialBike 
    ? (initialBike.id || initialBike.slug || bikeOptions[0].id || bikeOptions[0].slug) 
    : (bikeOptions[0].id || bikeOptions[0].slug);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Kathmandu',
    modelId: defaultModelId,
    rideDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    needFinance: !!emiData,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const cities = ['Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar', 'Bharatpur', 'Birgunj', 'Butwal', 'Dharan'];

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    
    const phoneClean = formData.phone.replace(/[\s-]/g, '');
    if (!phoneClean) {
      errs.phone = 'Mobile number is required';
    } else if (!/^(?:\+?977)?9[78]\d{8}$/.test(phoneClean)) {
      errs.phone = 'Please enter a valid Nepali mobile number (e.g. 9812345678 or +9779812345678)';
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('/api/test-ride', {
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        model_id: formData.modelId,
        ride_date: formData.rideDate,
        need_finance: formData.needFinance
      });
      
      const randomRef = `PNP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(randomRef);
      setSubmitted(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error('Submission failed', error);
      alert('Failed to submit booking request. Please try again.');
    }
  };

  const selectedModelObj = bikeOptions.find(b => (b.id === formData.modelId || b.slug === formData.modelId || b.name === formData.modelId));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel bg-[#0B132B] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-700 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation View */
          <div className="text-center space-y-6 py-6 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Reservation Confirmed</span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Product Booking Scheduled!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Our Peugeot Flagship Showroom representative in Durbar Marg will contact you shortly to confirm your reservation.
              </p>
            </div>

            <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 text-xs space-y-2 text-left">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Booking Reference:</span>
                <span className="font-extrabold text-cyan-300 tracking-wider">{bookingRef}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Vehicle Model:</span>
                <span className="font-bold text-white">
                  {selectedModelObj ? selectedModelObj.name : formData.modelId}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Preferred Date:</span>
                <span className="font-bold text-white">{formData.rideDate}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Showroom Location:</span>
                <span className="font-bold text-cyan-400">Durbar Marg, Kathmandu</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] to-[#00A3FF] border border-cyan-400/40 cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        ) : (
          /* Form View */
          <div className="space-y-6">
            
            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Official Reservation Portal</span>
              </div>
              <h3 className="text-2xl font-heading font-extrabold text-white">
                Book a Peugeot Product / Test Ride
              </h3>
              <p className="text-xs text-slate-300">
                Experience EURO-5 French engineering at our flagship Durbar Marg Kathmandu showroom.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bikash Shrestha"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none"
                />
                {errors.fullName && <span className="text-rose-400 text-[11px]">{errors.fullName}</span>}
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> Mobile (+977) *
                  </label>
                  <input
                    type="tel"
                    placeholder="9812345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none"
                  />
                  {errors.phone && <span className="text-rose-400 text-[11px]">{errors.phone}</span>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email *
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none"
                  />
                  {errors.email && <span className="text-rose-400 text-[11px]">{errors.email}</span>}
                </div>

              </div>

              {/* City & Model Selection Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* City */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> City / Region
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Bike className="w-3.5 h-3.5 text-cyan-400" /> Vehicle Model
                  </label>
                  <select
                    value={formData.modelId}
                    onChange={(e) => setFormData({ ...formData, modelId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none"
                  >
                    {bikeOptions.map((b) => (
                      <option key={b.id || b.slug} value={b.id || b.slug}>{b.name}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Ride Date */}
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Preferred Booking Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.rideDate}
                  onChange={(e) => setFormData({ ...formData, rideDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="needFinance"
                  checked={formData.needFinance}
                  onChange={(e) => setFormData({ ...formData, needFinance: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-400"
                />
                <label htmlFor="needFinance" className="text-xs text-slate-300 cursor-pointer">
                  Require financing / EMI assistance pre-approval
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] via-[#0055A5] to-[#00A3FF] border border-cyan-400/40 shadow-lg flex items-center justify-center gap-2 mt-4 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Confirm Reservation</span>
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
