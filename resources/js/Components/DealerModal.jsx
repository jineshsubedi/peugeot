import React, { useState } from 'react';
import { X, Building2, Send, CheckCircle2, Phone, Mail, User, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import axios from 'axios';

export default function DealerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: 'Pokhara',
    experienceYears: '3-5 years',
    showroomSpace: '1000-2000 sq ft',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/dealer-application', {
        business_name: formData.businessName,
        contact_person: formData.contactPerson,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        showroom_space: formData.showroomSpace
      });
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 60 });
    } catch (error) {
      console.error('Submission failed', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel bg-[#0B132B] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center space-y-6 py-6 animate-fadeIn">
            <div className="w-16 h-16 bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-heading font-bold text-white">Application Received!</h3>
              <p className="text-xs text-slate-300">
                Thank you for your interest in becoming an official Peugeot Motocycles dealer in Nepal. Our Dealer Network Development team will reach out to you within 48 hours.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#00205B]"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Partnership Opportunity</span>
              </div>
              <h3 className="text-2xl font-heading font-extrabold text-white">
                Become an Authorized Dealer
              </h3>
              <p className="text-xs text-slate-300">
                Join the Peugeot Motocycles Nepal retail expansion network across key provinces in Nepal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Business / Dealership Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Himalayan Motors"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+9779812345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Target City / Region</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Pokhara">Pokhara</option>
                    <option value="Lalitpur">Lalitpur</option>
                    <option value="Biratnagar">Biratnagar</option>
                    <option value="Bharatpur">Bharatpur</option>
                    <option value="Butwal">Butwal</option>
                    <option value="Birgunj">Birgunj</option>
                    <option value="Dharan">Dharan</option>
                    <option value="Kathmandu Outer">Kathmandu Outer (Bhaktapur/Kirtipur)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Proposed Showroom Space</label>
                  <select
                    value={formData.showroomSpace}
                    onChange={(e) => setFormData({ ...formData, showroomSpace: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="500-1000 sq ft">500 - 1,000 sq ft</option>
                    <option value="1000-2000 sq ft">1,000 - 2,000 sq ft</option>
                    <option value="2000+ sq ft">2,000+ sq ft (3S Center)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] to-[#00A3FF] border border-cyan-400/40 shadow-lg flex items-center justify-center gap-2 mt-4"
              >
                <Send className="w-4 h-4" />
                <span>Submit Dealership Application</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
