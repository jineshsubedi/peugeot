import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Calendar, Phone, Mail, User, MapPin, Bike, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIKE_MODELS } from '../data/bikesData';

export default function TestRideModal({ isOpen, onClose, initialBike, emiData }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Dhaka',
    modelId: initialBike ? initialBike.id : BIKE_MODELS[0].id,
    rideDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days ahead default
    needFinance: !!emiData,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const cities = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    
    // Validate BD Phone Number
    const phoneClean = formData.phone.replace(/[\s-]/g, '');
    if (!phoneClean) {
      errs.phone = 'Mobile number is required';
    } else if (!/^(?:\+8801|01)[3-9]\d{8}$/.test(phoneClean)) {
      errs.phone = 'Please enter a valid Bangladeshi mobile number (e.g. 01712345678 or +8801712345678)';
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate random booking code
    const randomRef = `PBD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomRef);
    setSubmitted(true);

    // Fire Confetti Animation
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel bg-[#0B132B] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-700 transition-colors z-10"
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
                Test Ride Scheduled!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Our Peugeot Flagship Showroom representative in Gulshan-2 will contact you shortly to confirm your slot.
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
                  {BIKE_MODELS.find(b => b.id === formData.modelId)?.name}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Preferred Date:</span>
                <span className="font-bold text-white">{formData.rideDate}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Showroom Location:</span>
                <span className="font-bold text-cyan-400">NB Tower, Gulshan-2, Dhaka</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] to-[#00A3FF] border border-cyan-400/40"
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
                Book a Peugeot Test Ride
              </h3>
              <p className="text-xs text-slate-300">
                Experience EURO-5 French engineering at our flagship Gulshan-2 Dhaka showroom.
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
                  placeholder="e.g. Tanvir Ahmed"
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
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> Mobile (+880) *
                  </label>
                  <input
                    type="tel"
                    placeholder="01712345678"
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
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> District / City
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
                    {BIKE_MODELS.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Ride Date */}
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Preferred Test Ride Date
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
                className="w-full py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] via-[#0055A5] to-[#00A3FF] border border-cyan-400/40 shadow-lg flex items-center justify-center gap-2 mt-4 active:scale-95 transition-all"
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
