import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  Film, 
  CreditCard, 
  LayoutDashboard, 
  MessageCircle, 
  ArrowRight, 
  Eye, 
  Calendar, 
  MapPin, 
  Volume2, 
  Camera, 
  Clock, 
  Check, 
  Heart, 
  ShieldCheck, 
  Star,
  QrCode,
  Music,
  Users
} from 'lucide-react';
import { LUXURY_WEBSITE_SAMPLES } from '../data/websiteSamples';
import { PRICING_PACKAGES } from '../data/pricing';
import { weddingAudio } from '../audio/WeddingAudioEngine';

export default function HomePage({ onSelectSample, onNavigate, onOpenLeadModal, onBookWhatsApp }) {
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

  const featuredSamples = LUXURY_WEBSITE_SAMPLES.slice(0, 3);

  const handleNav = (tabId) => {
    weddingAudio.playButtonClick();
    onNavigate(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-14 sm:space-y-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: BRAND EMBLEM & SANSKRIT INVOCATION */}
      {/* ========================================================================= */}
      <section className="text-center space-y-5 sm:space-y-6 max-w-4xl mx-auto pt-2 sm:pt-4">
        
        {/* Brand Emblem */}
        <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3">
          <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-[#C59B4E] via-[#E2C475] to-[#9A7228] shadow-2xl shadow-[#6B1D2F]/20 hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-white">
              <img 
                src="/kush-logo.jpg" 
                alt="Kush Invitations Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#FAF2E6] border border-[#E2CEAB] text-[#6B1D2F] text-[10px] sm:text-xs font-royal font-bold tracking-wider sm:tracking-widest uppercase">
            <span>॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥</span>
            <span className="text-[#C59B4E]">•</span>
            <span>Kush Invitations</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="font-royal text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#4A0F1E] leading-tight px-1">
            Bespoke Digital Wedding Portals &amp;{' '}
            <span className="bg-gradient-to-r from-[#6B1D2F] via-[#C59B4E] to-[#6B1D2F] bg-clip-text text-transparent italic block sm:inline">
              Pre-Wedding Sagas
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#7A263B] max-w-2xl mx-auto font-cormorant text-base sm:text-xl leading-relaxed px-2">
            Inspired by royal Rajputana arches, sacred Vedic shlokas, and live shehnai symphonies. Handcrafted to celebrate <em>Your Story ♦ Our Design</em> with unmatched royal grandeur.
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="inline-block w-full max-w-md sm:max-w-xl p-3 sm:p-5 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-md mx-auto">
          <p className="text-[10px] sm:text-[11px] font-royal font-bold uppercase tracking-widest text-[#C59B4E] mb-2 sm:mb-2.5">
            ⏳ Live Auspicious Muhurtham Countdown Preview
          </p>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3 text-center">
            <div className="p-1.5 sm:p-3 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB]">
              <span className="font-royal text-lg sm:text-2xl font-black text-[#6B1D2F]">{timeLeft.days}</span>
              <p className="text-[9px] sm:text-[10px] font-royal uppercase tracking-wider text-[#7A263B]">Days</p>
            </div>
            <div className="p-1.5 sm:p-3 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB]">
              <span className="font-royal text-lg sm:text-2xl font-black text-[#6B1D2F]">{timeLeft.hours}</span>
              <p className="text-[9px] sm:text-[10px] font-royal uppercase tracking-wider text-[#7A263B]">Hours</p>
            </div>
            <div className="p-1.5 sm:p-3 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB]">
              <span className="font-royal text-lg sm:text-2xl font-black text-[#6B1D2F]">{timeLeft.minutes}</span>
              <p className="text-[9px] sm:text-[10px] font-royal uppercase tracking-wider text-[#7A263B]">Mins</p>
            </div>
            <div className="p-1.5 sm:p-3 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB]">
              <span className="font-royal text-lg sm:text-2xl font-black text-[#6B1D2F]">{timeLeft.seconds}</span>
              <p className="text-[9px] sm:text-[10px] font-royal uppercase tracking-wider text-[#7A263B]">Secs</p>
            </div>
          </div>
        </div>

        {/* Action Buttons (Full width on mobile, grouped on tablet/desktop) */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
          <button
            onClick={() => handleNav('showcase')}
            className="w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] hover:from-[#541221] hover:to-[#2C0812] text-[#FAF6F0] font-royal font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-[#6B1D2F]/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition border border-[#C59B4E]/40"
          >
            <Layers size={16} className="text-[#C59B4E]" />
            <span>Explore 6 Wedding Portals</span>
          </button>

          <button
            onClick={() => handleNav('reels')}
            className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-white hover:bg-[#FAF2E6] text-[#4A0F1E] font-royal font-bold text-xs uppercase tracking-wider rounded-full border border-[#E2CEAB] flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition shadow-sm"
          >
            <Film size={16} className="text-[#C59B4E]" />
            <span>Watch 9:16 Video Reels</span>
          </button>

          <button
            onClick={() => onBookWhatsApp({ title: 'Kush Invitations Inquiry' })}
            className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-[#FAF2E6] hover:bg-[#F2E5D0] text-[#6B1D2F] font-royal font-bold text-xs uppercase tracking-wider rounded-full border border-[#E2CEAB] flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition shadow-sm"
          >
            <MessageCircle size={16} className="text-[#C59B4E]" />
            <span>Book On WhatsApp</span>
          </button>
        </div>

        {/* Feature Highlights Pills */}
        <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-[#4A0F1E]">
          <span className="flex items-center gap-1.5 bg-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#E2CEAB] shadow-sm font-royal">
            <Check size={14} className="text-[#C59B4E]" /> Live Shehnai Audio
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#E2CEAB] shadow-sm font-royal">
            <Check size={14} className="text-[#C59B4E]" /> Complete Family Lineage &amp; Shlokas
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#E2CEAB] shadow-sm font-royal">
            <Check size={14} className="text-[#C59B4E]" /> Pre-Wedding Photo Album &amp; 4K Teaser
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#E2CEAB] shadow-sm font-royal">
            <Check size={14} className="text-[#C59B4E]" /> Instant WhatsApp Guest RSVP
          </span>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION 1: FEATURED WEDDING PORTALS (PREVIEW) */}
      {/* ========================================================================= */}
      <section className="space-y-6 sm:space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E2CEAB] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF2E6] border border-[#E2CEAB] text-[#6B1D2F] text-[10px] font-royal font-bold uppercase tracking-widest mb-1">
              <Layers size={12} className="text-[#C59B4E]" />
              <span>Live Portals Collection</span>
            </div>
            <h2 className="font-royal text-xl sm:text-2xl md:text-3xl font-black text-[#4A0F1E]">
              Featured Wedding Portal Samples
            </h2>
            <p className="text-xs text-[#7A263B] font-serif mt-0.5">
              Click any portal to experience the live website with music, ceremonies, pre-wedding album, and RSVP.
            </p>
          </div>

          <button
            onClick={() => handleNav('showcase')}
            className="self-start sm:self-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#FAF2E6] hover:bg-[#F2E5D0] text-[#6B1D2F] border border-[#E2CEAB] font-royal font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
          >
            <span>View All 6 Designs</span>
            <ArrowRight size={14} className="text-[#C59B4E]" />
          </button>
        </div>

        {/* 3 Featured Cards: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredSamples.map((sample) => (
            <div
              key={sample.id}
              className="group bg-white rounded-3xl border-2 border-[#E2CEAB] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#6B1D2F] transition-all flex flex-col justify-between"
            >
              {/* Thumbnail with Overlay */}
              <div 
                className="relative aspect-[16/11] overflow-hidden cursor-pointer" 
                onClick={() => {
                  weddingAudio.playButtonClick();
                  onSelectSample(sample);
                }}
              >
                <img
                  src={sample.thumbnail}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-royal font-bold uppercase tracking-wider bg-[#2C0812]/80 text-[#E2C475] border border-[#C59B4E]/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {sample.badge}
                  </span>
                  <span className="text-[10px] font-royal font-bold bg-white/90 text-[#6B1D2F] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Volume2 size={11} className="text-[#C59B4E]" />
                    <span>Live Audio</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                  <p className="text-[11px] font-royal uppercase tracking-widest text-[#E2C475]">
                    {sample.category}
                  </p>
                  <h3 className="font-royal text-lg sm:text-xl font-black drop-shadow">
                    {sample.couple}
                  </h3>
                  <p className="text-xs text-stone-200 flex items-center gap-1">
                    <Calendar size={12} className="text-[#C59B4E]" />
                    {sample.date}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#7A263B]">
                    <MapPin size={13} className="text-[#C59B4E] shrink-0" />
                    <span className="line-clamp-1">{sample.venue}</span>
                  </div>

                  <p className="font-cormorant italic text-sm text-[#4A0F1E] line-clamp-2 font-semibold">
                    "{sample.quote}"
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-[#6B1D2F] font-royal font-bold">
                    <span className="bg-[#FAF2E6] px-2.5 py-0.5 rounded-full border border-[#E2CEAB]">
                      📸 Pre-Wedding Shoot Inside
                    </span>
                    <span className="bg-[#FAF2E6] px-2.5 py-0.5 rounded-full border border-[#E2CEAB]">
                      💍 {sample.events?.length || 4} Ceremonies
                    </span>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-3 border-t border-[#E2CEAB]">
                  <button
                    onClick={() => {
                      weddingAudio.playButtonClick();
                      onSelectSample(sample);
                    }}
                    className="w-full py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] text-[#FAF6F0] font-royal font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition border border-[#C59B4E]/30"
                  >
                    <Eye size={15} className="text-[#C59B4E]" />
                    <span>View Live Website &amp; Music</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION 2: WHAT'S INSIDE EVERY INVITATION (FEATURE SPOTLIGHT) */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-white via-[#FAF6F0] to-white p-6 sm:p-10 md:p-12 rounded-3xl border-2 border-[#E2CEAB] shadow-lg space-y-6 sm:space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
          <div className="text-xl sm:text-2xl text-[#C59B4E]">❦ ❧</div>
          <h2 className="font-royal text-xl sm:text-3xl md:text-4xl font-bold text-[#4A0F1E]">
            What's Inside Every Kush Invitation
          </h2>
          <p className="text-xs sm:text-sm text-[#7A263B] font-cormorant text-base sm:text-lg">
            Not just a flat digital card, but a complete interactive experience celebrating your love and family lineage.
          </p>
        </div>

        {/* 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: '📸',
              title: 'Pre-Wedding Photo Album & 4K Teaser',
              desc: 'High-resolution photo gallery with zoomable lightbox and embedded cinematic teaser video from your pre-wedding shoot.'
            },
            {
              icon: '🪕',
              title: 'Live Shehnai & Sitar Symphonies',
              desc: 'Ambient audio player with authentic live shehnai, Mangalyam, and romantic melodies that play as soon as guests open the link.'
            },
            {
              icon: '🗓️',
              title: 'Multi-Day Ceremonies & GPS Maps',
              desc: 'Detailed itinerary for Haldi, Mehendi, Sangeet, Pheras, and Reception with timings, dress codes, and Google Maps navigation.'
            },
            {
              icon: '👑',
              title: 'Family Lineage & Vedic Shlokas',
              desc: 'Complete Kanya Paksha & Var Paksha lineage cards with grandparents, parents, ancestral residence, and Sanskrit blessings.'
            },
            {
              icon: '✉️',
              title: 'Interactive 1-Click WhatsApp RSVP',
              desc: 'Guest headcount, dietary meal preferences (Jain/Pure Veg), and instant confetti confirmation synced with your dashboard.'
            },
            {
              icon: '🎁',
              title: 'Digital Shagun & Gift UPI QR',
              desc: 'Integrated QR code modal allowing guests across India and overseas to send digital shagun and heartfelt blessings directly.'
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2CEAB] space-y-2 shadow-sm hover:border-[#6B1D2F] hover:shadow-md transition-all"
            >
              <div className="text-2xl sm:text-3xl mb-1">{item.icon}</div>
              <h4 className="font-royal font-bold text-sm sm:text-base text-[#4A0F1E]">{item.title}</h4>
              <p className="text-xs text-[#7A263B] leading-relaxed font-serif">{item.desc}</p>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 3: 9:16 VIDEO REELS STUDIO TEASER */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden p-6 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-r from-[#FFFDFB] via-[#FAF6F0] to-[#FAF2E6] border-2 border-[#E2CEAB] shadow-xl shadow-[#6B1D2F]/5 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        <div className="space-y-3 sm:space-y-4 lg:w-3/5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF2E6] border border-[#E2CEAB] text-[#6B1D2F] text-[10px] sm:text-[11px] font-royal font-bold tracking-widest uppercase">
            <Film size={13} className="text-[#C59B4E]" />
            <span>9:16 Vertical Video Reels</span>
          </div>

          <h2 className="font-royal text-xl sm:text-3xl md:text-4xl font-black text-[#4A0F1E] leading-tight">
            Animated 9:16 Video Invitation Reels for WhatsApp &amp; Instagram
          </h2>

          <p className="text-xs sm:text-sm text-[#7A263B] font-serif leading-relaxed">
            Broadcast your wedding dates with animated vertical cards tailored for WhatsApp Status and Instagram Stories. Includes synchronized shehnai audio, auspicious shlokas, and interactive tap navigation.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs font-royal font-bold text-[#6B1D2F]">
            <span className="flex items-center gap-1">
              <Check size={14} className="text-[#C59B4E]" /> Hindi &amp; English Script Options
            </span>
            <span className="flex items-center gap-1">
              <Check size={14} className="text-[#C59B4E]" /> 4K Ultra-HD MP4 Video Render
            </span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleNav('reels')}
              className="w-full sm:w-auto px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] hover:from-[#541221] hover:to-[#2C0812] text-[#FAF6F0] font-royal font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-[#6B1D2F]/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition border border-[#C59B4E]/40"
            >
              <Film size={15} className="text-[#C59B4E]" />
              <span>Launch 9:16 Reels Studio</span>
            </button>
          </div>
        </div>

        {/* Visual Mockup Preview - responsive scaling */}
        <div className="lg:w-2/5 flex justify-center">
          <div 
            onClick={() => handleNav('reels')}
            className="w-48 sm:w-56 h-72 sm:h-80 rounded-[32px] sm:rounded-[36px] overflow-hidden border-4 border-[#C59B4E] shadow-2xl relative cursor-pointer group hover:scale-105 transition-transform"
          >
            <img 
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80" 
              alt="Reels preview" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C0812] via-transparent to-black/40 flex flex-col justify-between p-3.5 sm:p-4 text-white">
              <span className="text-[9px] font-royal bg-[#C59B4E] text-[#1E050C] px-2 py-0.5 rounded-full font-bold w-max">
                9:16 Animated
              </span>
              <div className="text-center space-y-1">
                <p className="font-royal font-bold text-xs sm:text-sm">लक्ष्य संग वैशाली</p>
                <p className="text-[9px] sm:text-[10px] text-[#E2C475]">Click to Play Reel →</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION 4: PRICING & PACKAGES TEASER */}
      {/* ========================================================================= */}
      <section className="space-y-6 sm:space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E2CEAB] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF2E6] border border-[#E2CEAB] text-[#6B1D2F] text-[10px] font-royal font-bold uppercase tracking-widest mb-1">
              <CreditCard size={12} className="text-[#C59B4E]" />
              <span>Transparent Pricing</span>
            </div>
            <h2 className="font-royal text-xl sm:text-2xl md:text-3xl font-black text-[#4A0F1E]">
              Bespoke Packages &amp; Pricing
            </h2>
            <p className="text-xs text-[#7A263B] font-serif mt-0.5">
              Flat, all-inclusive rates with zero hidden fees. Save over 90% compared to traditional box printing.
            </p>
          </div>

          <button
            onClick={() => handleNav('pricing')}
            className="self-start sm:self-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#FAF2E6] hover:bg-[#F2E5D0] text-[#6B1D2F] border border-[#E2CEAB] font-royal font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
          >
            <span>Full Pricing Calculator</span>
            <ArrowRight size={14} className="text-[#C59B4E]" />
          </button>
        </div>

        {/* 3 Pricing Packages: 1 col on mobile, 3 col on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              className={`p-6 sm:p-7 rounded-3xl bg-white border-2 flex flex-col justify-between transition-all ${
                pkg.popular 
                  ? 'border-[#6B1D2F] shadow-xl shadow-[#6B1D2F]/10 ring-2 ring-[#C59B4E]' 
                  : 'border-[#E2CEAB] shadow-sm hover:border-[#6B1D2F]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-royal font-bold text-[#C59B4E] uppercase tracking-wider">{pkg.badge}</span>
                  {pkg.popular && (
                    <span className="text-[10px] font-royal font-bold bg-[#FAF2E6] text-[#6B1D2F] px-2.5 py-0.5 rounded-full border border-[#E2CEAB]">
                      ★ Most Popular
                    </span>
                  )}
                </div>

                <h3 className="font-royal text-lg sm:text-xl font-bold text-[#4A0F1E] mb-1">{pkg.name}</h3>
                <p className="text-xs text-[#7A263B] mb-4">{pkg.tagline}</p>

                <div className="mb-4 pb-4 border-b border-[#FAF2E6]">
                  <span className="font-royal text-2xl sm:text-3xl font-extrabold text-[#6B1D2F]">
                    ₹{pkg.baseInr.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-500 ml-1">/ flat fee</span>
                </div>

                <div className="space-y-2 text-xs text-[#4A0F1E] font-serif">
                  {pkg.features.slice(0, 4).map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check size={14} className="text-[#C59B4E] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleNav('pricing')}
                  className="w-full py-2.5 rounded-full text-xs font-royal font-bold uppercase tracking-wider bg-[#FAF2E6] hover:bg-[#F2E5D0] text-[#6B1D2F] border border-[#E2CEAB] transition"
                >
                  View Package Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION 5: RSVP PORTAL & GUEST HOSPITALITY TEASER */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="space-y-2 sm:w-3/5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF2E6] border border-[#E2CEAB] text-[#6B1D2F] text-[10px] font-royal font-bold uppercase tracking-widest">
            <LayoutDashboard size={12} className="text-[#C59B4E]" />
            <span>Guest Management &amp; Analytics</span>
          </div>

          <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#4A0F1E]">
            Real-Time RSVP Portal &amp; Catering Spreadsheet
          </h3>

          <p className="text-xs sm:text-sm text-[#7A263B] font-serif">
            Track confirmed guest headcounts, special dietary requirements (Jain &amp; Pure Veg), song requests for the DJ, and export ready-to-use CSV spreadsheets for your caterers and venue planners.
          </p>
        </div>

        <button
          onClick={() => handleNav('dashboard')}
          className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] text-[#FAF6F0] rounded-full text-xs font-royal font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-105 transition shrink-0 border border-[#C59B4E]/30"
        >
          <LayoutDashboard size={15} className="text-[#C59B4E]" />
          <span>Launch RSVP Dashboard</span>
        </button>

      </section>

    </div>
  );
}
