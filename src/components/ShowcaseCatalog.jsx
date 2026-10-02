import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Eye, 
  Play, 
  ArrowRight, 
  Film, 
  Layers, 
  Calendar, 
  MapPin, 
  MessageCircle, 
  Check, 
  Heart,
  Volume2,
  Camera,
  Compass,
  Clock
} from 'lucide-react';
import { LUXURY_WEBSITE_SAMPLES } from '../data/websiteSamples';
import { weddingAudio } from '../audio/WeddingAudioEngine';

export default function ShowcaseCatalog({ onSelectSample, onOpenReels, onBookWhatsApp, onOpenPricing }) {
  const [filterLang, setFilterLang] = useState('all'); // 'all' | 'hi' | 'en'

  // Live countdown to next upcoming wedding
  const [timeLeft, setTimeLeft] = useState({ days: 88, hours: 14, minutes: 22, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredSamples = filterLang === 'all' 
    ? LUXURY_WEBSITE_SAMPLES 
    : LUXURY_WEBSITE_SAMPLES.filter(s => s.language === filterLang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      
      {/* 1. HERO BRAND INTRO WITH KUSH INVITATIONS LOGO & EMBLEM */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-2">
        
        {/* Top Arch Motif & Logo Brand Display */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-[#C59B4E] via-[#E2C475] to-[#9A7228] shadow-xl shadow-[#6B1D2F]/15">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white">
              <img 
                src="/kush-logo.jpg" 
                alt="Kush Invitations" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2E6] border border-[#E2CEAB] text-[#6B1D2F] text-xs font-royal font-bold tracking-widest uppercase">
            <span>॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥</span>
            <span className="text-[#C59B4E]">•</span>
            <span>Kush Invitations</span>
          </div>
        </div>

        <h1 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#4A0F1E] leading-tight">
          Bespoke Digital Wedding Portals &amp;{' '}
          <span className="bg-gradient-to-r from-[#6B1D2F] via-[#C59B4E] to-[#6B1D2F] bg-clip-text text-transparent italic">
            Pre-Wedding Sagas
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[#7A263B] max-w-2xl mx-auto font-cormorant text-xl leading-relaxed">
          Inspired by royal Rajputana arches, sacred Vedic shlokas, and live shehnai symphonies. Handcrafted to celebrate <em>Your Story ♦ Our Design</em> with unmatched royal grandeur.
        </p>

        {/* Live Wedding Countdown Banner */}
        <div className="inline-block p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-md max-w-xl mx-auto">
          <p className="text-[11px] font-royal font-bold uppercase tracking-widest text-[#C59B4E] mb-2.5">
            ⏳ Live Auspicious Muhurtham Countdown Preview
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            <div className="p-2 sm:p-3 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB]">
              <span className="font-royal text-xl sm:text-2xl font-black text-[#6B1D2F]">{timeLeft.days}</span>
              <p className="text-[10px] font-royal uppercase tracking-wider text-[#7A263B]">Days</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB]">
              <span className="font-royal text-xl sm:text-2xl font-black text-[#6B1D2F]">{timeLeft.hours}</span>
              <p className="text-[10px] font-royal uppercase tracking-wider text-[#7A263B]">Hours</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB]">
              <span className="font-royal text-xl sm:text-2xl font-black text-[#6B1D2F]">{timeLeft.minutes}</span>
              <p className="text-[10px] font-royal uppercase tracking-wider text-[#7A263B]">Mins</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB]">
              <span className="font-royal text-xl sm:text-2xl font-black text-[#6B1D2F]">{timeLeft.seconds}</span>
              <p className="text-[10px] font-royal uppercase tracking-wider text-[#7A263B]">Secs</p>
            </div>
          </div>
        </div>

        {/* Key Feature Highlights */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#4A0F1E]">
          <span className="flex items-center gap-1.5 bg-white px-4 py-1.5 rounded-full border border-[#E2CEAB] shadow-sm font-royal">
            <Check size={14} className="text-[#C59B4E]" /> Live Shehnai &amp; Bollywood Audio
          </span>
          <span className="flex items-center gap-1.5 bg-white px-4 py-1.5 rounded-full border border-[#E2CEAB] shadow-sm font-royal">
            <Check size={14} className="text-[#C59B4E]" /> Complete Family Lineage &amp; Shlokas
          </span>
          <span className="flex items-center gap-1.5 bg-white px-4 py-1.5 rounded-full border border-[#E2CEAB] shadow-sm font-royal">
            <Check size={14} className="text-[#C59B4E]" /> 4K Pre-Wedding Film &amp; Photo Album
          </span>
          <span className="flex items-center gap-1.5 bg-white px-4 py-1.5 rounded-full border border-[#E2CEAB] shadow-sm font-royal">
            <Check size={14} className="text-[#C59B4E]" /> Instant WhatsApp Guest RSVP
          </span>
        </div>
      </section>

      {/* 2. 9:16 VIDEO REELS PROMO BANNER */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF2E6] border border-[#E2CEAB] text-[#6B1D2F] flex items-center justify-center font-bold text-2xl shrink-0">
            🎬
          </div>
          <div>
            <h3 className="font-royal text-lg font-bold text-[#4A0F1E]">
              9:16 Animated Video Invitation Reels
            </h3>
            <p className="text-xs text-[#7A263B]">
              Ready for Instagram Stories &amp; WhatsApp Status broadcasting with custom music.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenReels}
          className="px-5 py-2.5 bg-[#FAF2E6] hover:bg-[#F2E5D0] text-[#6B1D2F] border border-[#E2CEAB] rounded-full text-xs font-royal font-bold flex items-center gap-1.5 transition shrink-0"
        >
          <Film size={14} className="text-[#C59B4E]" />
          <span>Launch Reels Player</span>
        </button>
      </section>

      {/* 4. WEDDING SAMPLES CATALOG */}
      <section className="space-y-8">
        
        {/* Filter Tabs Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2CEAB] pb-4">
          <div>
            <h2 className="font-royal text-2xl sm:text-3xl font-black text-[#4A0F1E]">
              Live Wedding Portals &amp; Patrika Designs ({filteredSamples.length})
            </h2>
            <p className="text-xs text-[#7A263B] font-serif mt-1">
              Click any card to open the interactive live wedding website with music, ceremonies &amp; pre-wedding gallery.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#FAF2E6] p-1 rounded-full border border-[#E2CEAB] text-xs shadow-inner">
            {[
              { id: 'all', label: 'All Portals' },
              { id: 'hi', label: '🪷 Hindi & Vedic (हिंदी)' },
              { id: 'en', label: '🌸 English Luxury Palace' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  weddingAudio.playButtonClick();
                  setFilterLang(t.id);
                }}
                className={`px-4 py-1.5 rounded-full font-royal font-bold text-xs transition ${
                  filterLang === t.id
                    ? 'bg-[#6B1D2F] text-white shadow-sm'
                    : 'text-[#4A0F1E] hover:bg-stone-200/40'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSamples.map((sample) => (
            <div
              key={sample.id}
              className="group bg-white rounded-3xl border-2 border-[#E2CEAB] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#6B1D2F] transition-all flex flex-col justify-between"
            >
              {/* Card Thumbnail & Overlays */}
              <div className="relative aspect-[16/11] overflow-hidden cursor-pointer" onClick={() => onSelectSample(sample)}>
                <img
                  src={sample.thumbnail}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-royal font-bold uppercase tracking-wider bg-[#2C0812]/80 text-[#E2C475] border border-[#C59B4E]/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {sample.badge}
                  </span>
                  <span className="text-[10px] font-royal font-bold bg-white/90 text-[#6B1D2F] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Volume2 size={11} className="text-[#C59B4E]" />
                    <span>Live Audio</span>
                  </span>
                </div>

                {/* Bottom Overlay on Image: Couple Name & Date */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                  <p className="text-[11px] font-royal uppercase tracking-widest text-[#E2C475]">
                    {sample.category}
                  </p>
                  <h3 className="font-royal text-xl font-black drop-shadow">
                    {sample.couple}
                  </h3>
                  <p className="text-xs text-stone-200 flex items-center gap-1">
                    <Calendar size={12} className="text-[#C59B4E]" />
                    {sample.date}
                  </p>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#7A263B]">
                    <MapPin size={13} className="text-[#C59B4E] shrink-0" />
                    <span className="line-clamp-1">{sample.venue}</span>
                  </div>

                  <p className="font-cormorant italic text-sm text-[#4A0F1E] line-clamp-2 font-semibold">
                    "{sample.quote}"
                  </p>

                  {/* Pre-wedding photos indicator */}
                  <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#6B1D2F] font-royal font-bold">
                    <span className="bg-[#FAF2E6] px-2.5 py-0.5 rounded-full border border-[#E2CEAB]">
                      📸 Pre-Wedding Shoot Included
                    </span>
                    <span className="bg-[#FAF2E6] px-2.5 py-0.5 rounded-full border border-[#E2CEAB]">
                      💍 {sample.events?.length || 4} Multi-Day Ceremonies
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-[#E2CEAB] space-y-2">
                  <button
                    onClick={() => onSelectSample(sample)}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] text-[#FAF6F0] font-royal font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition border border-[#C59B4E]/30"
                  >
                    <Eye size={15} className="text-[#C59B4E]" />
                    <span>View Live Website &amp; Music</span>
                  </button>

                  <button
                    onClick={() => onBookWhatsApp(sample)}
                    className="w-full py-2.5 rounded-full bg-[#FAF2E6] hover:bg-[#F2E5D0] text-[#6B1D2F] border border-[#E2CEAB] font-royal font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                  >
                    <MessageCircle size={14} />
                    <span>Order On WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
