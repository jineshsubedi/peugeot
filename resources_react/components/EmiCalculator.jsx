import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { BIKE_MODELS } from '../data/bikesData';

export default function EmiCalculator({ selectedBikeForEmi, onApplyPreApproval }) {
  const [selectedModelId, setSelectedModelId] = useState(selectedBikeForEmi ? selectedBikeForEmi.id : BIKE_MODELS[0].id);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30); // 30% default
  const [tenureMonths, setTenureMonths] = useState(24); // 24 months default
  const interestRatePerYear = 10.5; // 10.5% standard BDT bank interest rate

  const activeModel = BIKE_MODELS.find(b => b.id === selectedModelId) || BIKE_MODELS[0];
  const vehiclePrice = activeModel.priceBDT;

  // Calculation Logic
  const downPaymentBDT = Math.round((vehiclePrice * downPaymentPercent) / 100);
  const loanAmountBDT = vehiclePrice - downPaymentBDT;
  
  // Monthly interest rate calculation formula:
  // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const r = interestRatePerYear / 12 / 100;
  const n = tenureMonths;
  const emiBDT = loanAmountBDT > 0 
    ? Math.round((loanAmountBDT * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
    : 0;

  const totalPayableBDT = downPaymentBDT + (emiBDT * tenureMonths);
  const totalInterestBDT = (emiBDT * tenureMonths) - loanAmountBDT;

  return (
    <section id="finance" className="py-20 bg-[#090B10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00205B]/60 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Peugeot Finance Bangladesh</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">EMI & Loan Calculator</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Own your dream French scooter with flexible BDT financing plans, quick down payments, and partner bank instant pre-approvals.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 glass-panel bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            
            {/* 1. Vehicle Model Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                1. Select Peugeot Model:
              </label>
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3.5 text-sm font-semibold focus:border-cyan-400 focus:outline-none transition-colors"
              >
                {BIKE_MODELS.map((bike) => (
                  <option key={bike.id} value={bike.id}>
                    {bike.name} — {bike.priceFormatted}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Down Payment Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-300">
                  2. Down Payment ({downPaymentPercent}%):
                </span>
                <span className="font-extrabold text-cyan-400 text-sm">
                  BDT {downPaymentBDT.toLocaleString('en-BD')}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="70"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#00A3FF]"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>20% (Min BDT {(vehiclePrice * 0.2).toLocaleString()})</span>
                <span>70% (Max BDT {(vehiclePrice * 0.7).toLocaleString()})</span>
              </div>
            </div>

            {/* 3. Loan Tenure Tabs */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                3. Preferred Tenure:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[12, 24, 36].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setTenureMonths(months)}
                    className={`py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider border transition-all ${
                      tenureMonths === months
                        ? 'bg-[#00205B] text-cyan-300 border-cyan-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {months} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Note */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Partnered Bank Rate: <strong className="text-slate-200">10.5% p.a.</strong> (Subject to credit profile verification).</span>
            </div>

          </div>

          {/* Output Summary Card */}
          <div className="lg:col-span-5 glass-panel bg-gradient-to-b from-[#00205B]/90 via-[#0B132B] to-[#090B10] rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">Financial Breakdown</span>
                <span className="text-xs text-slate-400">BDT Currency</span>
              </div>

              {/* Monthly EMI Banner */}
              <div className="bg-slate-950/90 p-5 rounded-2xl border border-cyan-500/30 text-center mb-6 shadow-inner">
                <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Estimated Monthly Installment</span>
                <div className="text-3xl sm:text-4xl font-heading font-extrabold text-cyan-400">
                  BDT {emiBDT.toLocaleString('en-BD')} <span className="text-xs font-normal text-slate-400">/ mo</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Vehicle Price</span>
                  <span className="font-bold text-white">BDT {vehiclePrice.toLocaleString('en-BD')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Down Payment ({downPaymentPercent}%)</span>
                  <span className="font-bold text-cyan-300">BDT {downPaymentBDT.toLocaleString('en-BD')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Financed Amount</span>
                  <span className="font-bold text-slate-200">BDT {loanAmountBDT.toLocaleString('en-BD')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Est. Total Interest</span>
                  <span className="font-bold text-slate-300">BDT {Math.max(0, totalInterestBDT).toLocaleString('en-BD')}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onApplyPreApproval({ model: activeModel, downPaymentBDT, emiBDT, tenureMonths })}
              className="w-full py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border border-cyan-300/40 shadow-lg flex items-center justify-center gap-2 group active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-100" />
              <span>Apply for Financing Pre-Approval</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
