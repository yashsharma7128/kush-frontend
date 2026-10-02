import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  Sparkles, 
  DollarSign, 
  ArrowRight, 
  Calculator, 
  ShieldCheck, 
  CheckCircle, 
  MessageCircle, 
  TrendingUp 
} from 'lucide-react';
import { PRICING_PACKAGES, ADDONS, CURRENCIES } from '../data/pricing';
import { weddingAudio } from '../audio/WeddingAudioEngine';

export default function PricingCalculator({ onOpenLeadModal }) {
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [selectedPackage, setSelectedPackage] = useState('bespoke');
  const [selectedAddons, setSelectedAddons] = useState(['whatsapp_broadcast', 'qr_printed_cards']);
  const [guestCount, setGuestCount] = useState(350);

  const curr = CURRENCIES[selectedCurrency] || CURRENCIES.INR;
  const pkg = PRICING_PACKAGES.find(p => p.id === selectedPackage) || PRICING_PACKAGES[1];

  const formatPrice = (inrVal) => {
    const converted = inrVal * curr.rate;
    if (selectedCurrency === 'USD' || selectedCurrency === 'GBP') {
      return `${curr.symbol}${converted.toFixed(0)}`;
    }
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const toggleAddon = (addonId) => {
    weddingAudio.playButtonClick();
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const packageTotalInr = pkg.baseInr;
  const addonsTotalInr = selectedAddons.reduce((sum, id) => {
    const add = ADDONS.find(a => a.id === id);
    return sum + (add ? add.priceInr : 0);
  }, 0);
  const grandTotalInr = packageTotalInr + addonsTotalInr;

  const traditionalCostInr = guestCount * 450;
  const savingsInr = Math.max(0, traditionalCostInr - grandTotalInr);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Header & Currency Switcher */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2E6] border border-[#E2CEAB] text-[#6B1D2F] text-xs font-royal font-bold">
          <Calculator size={14} className="text-[#C59B4E]" />
          <span>Kush Invitations • Packages &amp; Pricing</span>
        </div>
        <h2 className="font-royal text-3xl sm:text-5xl font-bold text-[#4A0F1E] leading-tight">
          Transparent Pricing &amp; High-ROI Packages
        </h2>
        <p className="text-sm text-[#7A263B] font-cormorant text-lg">
          Compare royal packages, calculate pre-wedding and add-on services, and see instant savings compared to traditional physical box printing.
        </p>

        {/* Currency Switcher */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="text-xs text-[#4A0F1E] font-royal font-semibold">Select Currency:</span>
          <div className="flex items-center bg-white p-1 rounded-full border border-[#E2CEAB] shadow-sm">
            {Object.keys(CURRENCIES).map((cKey) => (
              <button
                key={cKey}
                onClick={() => {
                  weddingAudio.playButtonClick();
                  setSelectedCurrency(cKey);
                }}
                className={`px-4 py-1 rounded-full text-xs font-royal font-bold transition ${
                  selectedCurrency === cKey
                    ? 'bg-[#6B1D2F] text-white shadow-sm'
                    : 'text-[#4A0F1E] hover:bg-stone-100'
                }`}
              >
                {cKey}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Main Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {PRICING_PACKAGES.map((p) => {
          const isSelected = selectedPackage === p.id;
          return (
            <div
              key={p.id}
              onClick={() => {
                weddingAudio.playButtonClick();
                setSelectedPackage(p.id);
              }}
              className={`relative p-7 rounded-3xl cursor-pointer transition-all flex flex-col justify-between border-2 ${
                isSelected
                  ? 'border-[#6B1D2F] bg-white shadow-xl shadow-[#6B1D2F]/10 scale-[1.02] ring-2 ring-[#C59B4E]'
                  : 'border-[#E2CEAB] hover:border-[#6B1D2F] bg-white shadow-sm'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#6B1D2F] to-[#C59B4E] text-white font-royal font-bold text-[10px] uppercase tracking-widest shadow-md">
                  ★ Most Popular Choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-royal font-bold text-[#C59B4E] uppercase tracking-wider">{p.badge}</span>
                  {isSelected && <span className="text-[#6B1D2F] font-royal font-bold text-xs bg-[#FAF2E6] px-2.5 py-0.5 rounded-full border border-[#E2CEAB]">Selected</span>}
                </div>

                <h3 className="font-royal text-xl font-bold text-[#4A0F1E] mb-1">{p.name}</h3>
                <p className="text-xs text-[#7A263B] mb-6">{p.tagline}</p>

                <div className="mb-6 pb-6 border-b border-[#FAF2E6]">
                  <span className="font-royal text-3xl sm:text-4xl font-extrabold text-[#6B1D2F]">
                    {formatPrice(p.baseInr)}
                  </span>
                  <span className="text-xs text-stone-500 ml-1">/ flat fee</span>
                </div>

                {/* Feature checklist */}
                <div className="space-y-3 text-xs text-[#4A0F1E]">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className="text-[#C59B4E] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  className={`w-full py-3 rounded-full text-xs font-royal font-bold transition shadow-md ${
                    isSelected ? 'bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] text-[#FAF6F0]' : 'bg-[#FAF2E6] text-[#6B1D2F] hover:bg-[#F2E5D0]'
                  }`}
                >
                  {isSelected ? 'Selected Plan' : 'Select Plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Quotation & ROI Calculator */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white border-2 border-[#E2CEAB] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 shadow-xl shadow-[#6B1D2F]/5">
        
        {/* Left: Add-ons */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h3 className="font-royal text-xl font-bold text-[#4A0F1E] mb-1">
              Add-On Services &amp; Broadcast Suite
            </h3>
            <p className="text-xs text-[#7A263B]">
              Enhance your invitation with custom domain names, pre-wedding shoot teasers, and physical gold-foil QR inserts.
            </p>
          </div>

          <div className="space-y-3">
            {ADDONS.map((addon) => {
              const isChecked = selectedAddons.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-4 rounded-2xl cursor-pointer border flex items-center justify-between transition ${
                    isChecked
                      ? 'border-[#6B1D2F] bg-[#FAF2E6] shadow-sm'
                      : 'border-[#E2CEAB] bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      isChecked ? 'bg-[#6B1D2F] border-[#6B1D2F] text-white' : 'border-stone-300'
                    }`}>
                      {isChecked && <Check size={14} className="stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium text-[#4A0F1E]">{addon.name}</span>
                  </div>
                  <span className="text-xs font-bold text-[#C59B4E]">
                    +{formatPrice(addon.priceInr)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Guest Count Slider */}
          <div className="pt-4 border-t border-[#FAF2E6] space-y-2">
            <div className="flex items-center justify-between text-xs font-royal">
              <span className="text-[#4A0F1E] font-semibold">Estimated Wedding Guest Count:</span>
              <span className="font-bold text-[#6B1D2F] text-sm">{guestCount} Guests</span>
            </div>
            <input
              type="range"
              min="50"
              max="1500"
              step="50"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full accent-[#6B1D2F] cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5 bg-[#FAF6F0] p-6 rounded-2xl border border-[#E2CEAB] flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] font-royal font-bold uppercase tracking-widest text-[#C59B4E]">
              Quotation Summary
            </span>

            <div className="space-y-3 mt-4 text-xs font-royal">
              <div className="flex items-center justify-between text-[#4A0F1E]">
                <span>Base Plan ({pkg.name}):</span>
                <span className="font-bold">{formatPrice(packageTotalInr)}</span>
              </div>
              <div className="flex items-center justify-between text-[#4A0F1E]">
                <span>Selected Add-ons ({selectedAddons.length}):</span>
                <span className="font-bold">{formatPrice(addonsTotalInr)}</span>
              </div>
              <div className="pt-3 border-t border-[#E2CEAB] flex items-center justify-between font-bold text-base text-[#4A0F1E]">
                <span>Total Fee:</span>
                <span className="text-[#6B1D2F] text-xl font-royal">{formatPrice(grandTotalInr)}</span>
              </div>
            </div>

            {/* Savings Box */}
            <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <TrendingUp size={15} />
                <span>Estimated Couple Savings:</span>
              </div>
              <p className="text-stone-600 text-[11px]">
                Physical box printing for {guestCount} guests costs approx <span className="font-bold text-stone-900">{formatPrice(traditionalCostInr)}</span>.
              </p>
              <div className="font-royal text-lg font-bold text-emerald-800 pt-1">
                You Save {formatPrice(savingsInr)} (90%+ Cost Reduction)
              </div>
            </div>
          </div>

          <button
            onClick={onOpenLeadModal}
            className="w-full py-3.5 bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] hover:from-[#541221] hover:to-[#2C0812] text-[#FAF6F0] rounded-full text-xs font-royal font-bold uppercase tracking-wider shadow-lg shadow-[#6B1D2F]/20 flex items-center justify-center gap-2 transition active:scale-95 border border-[#C59B4E]/40"
          >
            <MessageCircle size={15} className="text-[#C59B4E]" />
            <span>Request Formal Quote on WhatsApp</span>
          </button>
        </div>

      </div>

    </div>
  );
}
