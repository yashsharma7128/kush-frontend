import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  Heart, 
  Sparkles, 
  Send, 
  Navigation, 
  ChevronRight, 
  ChevronLeft,
  Share2,
  CheckCircle,
  Camera,
  Play,
  QrCode,
  Music,
  Gift,
  ExternalLink
} from 'lucide-react';
import { weddingAudio } from '../audio/WeddingAudioEngine';
import { BOLLYWOOD_WEDDING_TRACKS } from '../data/audioTracks';

export default function SampleEntityView({ sample, onBack, onOpenRsvp, onBookWhatsApp }) {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState(sample.musicTrack || 'royal_mangalyam');
  const [activeGalleryTab, setActiveGalleryTab] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  // Live countdown timer state
  const [countdown, setCountdown] = useState({ days: 88, hours: 14, mins: 22, secs: 40 });

  const isHindi = sample.language === 'hi';

  useEffect(() => {
    weddingAudio.init();
    weddingAudio.startMusic(sample.musicTrack || 'royal_mangalyam');
    setIsAudioMuted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, mins: 59, secs: 59 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sample]);

  const handleToggleSound = () => {
    weddingAudio.init();
    if (isAudioMuted) {
      weddingAudio.startMusic(activeTrackId);
      setIsAudioMuted(false);
    } else {
      weddingAudio.stopMusic();
      setIsAudioMuted(true);
    }
  };

  const handleSwitchTrack = (trackId) => {
    setActiveTrackId(trackId);
    weddingAudio.startMusic(trackId);
    setIsAudioMuted(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#4A0F1E] selection:bg-[#6B1D2F] selection:text-[#FAF6F0] transition-colors duration-500 pb-20">
      
      {/* 1. TOP STICKY LUXURY CONTROL BAR */}
      <nav className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E2CEAB] px-2.5 sm:px-8 py-2.5 sm:py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3">
          
          {/* Back button */}
          <button
            onClick={() => {
              weddingAudio.playButtonClick();
              onBack();
            }}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF2E6] text-[#4A0F1E] text-xs font-royal font-bold transition active:scale-95 border border-[#E2CEAB] shadow-sm shrink-0"
          >
            <ArrowLeft size={14} className="text-[#C59B4E]" />
            <span className="text-[11px] sm:text-xs">{isHindi ? 'सभी पत्रिकाएं' : 'All Portals'}</span>
          </button>

          {/* Central Brand Seal */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <img src="/kush-logo.jpg" alt="Kush Logo" className="w-5 h-5 sm:w-6 sm:h-6 rounded-md border border-[#C59B4E] object-cover" />
            <div className="hidden sm:block text-center">
              <span className="font-royal text-xs font-black tracking-widest text-[#4A0F1E]">
                KUSH INVITATIONS
              </span>
              <p className="text-[9px] font-royal uppercase tracking-widest text-[#C59B4E] font-bold">
                Your Story ♦ Our Design
              </p>
            </div>
          </div>

          {/* Right Action buttons */}
          {/* Right Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-royal font-bold transition active:scale-95 border shadow-sm ${
                !isAudioMuted
                  ? 'bg-[#FAF2E6] text-[#6B1D2F] border-[#E2CEAB]'
                  : 'bg-white text-stone-400 border-stone-200'
              }`}
              title="Toggle Live Wedding Music"
            >
              {!isAudioMuted ? (
                <div className="flex items-center gap-1">
                  <Volume2 size={14} className="text-[#C59B4E]" />
                  <div className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 bg-[#6B1D2F] animate-sound-bar-1"></span>
                    <span className="w-0.5 bg-[#C59B4E] animate-sound-bar-2"></span>
                    <span className="w-0.5 bg-[#6B1D2F] animate-sound-bar-3"></span>
                  </div>
                </div>
              ) : (
                <VolumeX size={14} />
              )}
              <span className="hidden md:inline font-bold">
                {!isAudioMuted ? (isHindi ? 'शहनाई' : 'Music On') : 'Muted'}
              </span>
            </button>

            {/* Shagun QR Code */}
            <button
              onClick={() => setShowQrModal(true)}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#FAF2E6] text-[#4A0F1E] border border-[#E2CEAB] rounded-full text-xs font-royal font-bold transition"
              title="Digital Shagun &amp; Blessings QR"
            >
              <QrCode size={13} className="text-[#C59B4E]" />
              <span>Shagun QR</span>
            </button>

            {/* WhatsApp Order */}
            <button
              onClick={() => onBookWhatsApp(sample)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] text-[#FAF6F0] rounded-full text-xs font-royal font-bold shadow-md shadow-[#6B1D2F]/20 border border-[#C59B4E]/30 transition active:scale-95 shrink-0"
            >
              <MessageCircle size={13} className="text-[#C59B4E]" />
              <span className="text-[11px] sm:text-xs">{isHindi ? 'ऑर्डर करें' : 'Order This'}</span>
            </button>
          </div>

        </div>
      </nav>

      {/* 2. MAIN WEDDING PORTAL CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        
        {/* ========================================================================= */}
        {/* SECTION 1: AUSPICIOUS SHLOKAS, JHAROKHA ARCH CREST & HERO */}
        {/* ========================================================================= */}
        <section className="relative p-8 sm:p-14 rounded-3xl bg-white border-2 border-[#E2CEAB] text-center shadow-xl shadow-[#6B1D2F]/5 overflow-hidden space-y-6">
          
          {/* Subtle gold foil border ornament */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#C59B4E] via-[#E2C475] to-[#C59B4E]"></div>

          {/* Top Auspicious Shlokas */}
          <div className="text-xs sm:text-sm font-serif font-bold tracking-wider text-[#6B1D2F] border-b border-[#FAF2E6] pb-4 space-y-1 leading-relaxed">
            <p>{sample.shloka}</p>
          </div>

          {/* Jharokha Arch & Royal Monogram Crest */}
          <div className="relative py-2 flex flex-col items-center">
            
            {/* Hanging Lotus Tassel & Arch Graphic */}
            <div className="w-12 h-12 rounded-full bg-[#FAF2E6] border border-[#E2CEAB] flex items-center justify-center text-2xl shadow-sm mb-3">
              🪷
            </div>

            {/* Rajput Arch Monogram Frame */}
            <div className="w-64 sm:w-72 p-6 rounded-3xl bg-[#FAF6F0] border-2 border-[#E2CEAB] shadow-inner space-y-2 relative">
              <div className="font-royal text-2xl sm:text-3xl font-black text-[#6B1D2F] tracking-widest">
                {sample.coupleShort || (isHindi ? 'ल ✤ व' : 'A ✤ K')}
              </div>
              <div className="text-[11px] font-royal font-bold text-[#C59B4E] uppercase tracking-widest">
                {sample.hashtag}
              </div>
            </div>

          </div>

          {/* Main Couple Names */}
          <div className="space-y-2">
            <span className="text-[11px] font-royal font-bold uppercase tracking-widest text-[#C59B4E]">
              {isHindi ? '॥ शुभ विवाह महोत्सव ॥' : 'Together with their families'}
            </span>
            <h1 className="font-royal text-3xl sm:text-5xl font-black text-[#4A0F1E] tracking-wide">
              {sample.couple}
            </h1>
            <p className="font-royal text-base sm:text-lg text-[#6B1D2F] font-bold">
              {sample.date}
            </p>
          </div>

          <p className="font-cormorant italic text-base sm:text-lg text-[#7A263B] max-w-xl mx-auto leading-relaxed">
            "{sample.quote}"
          </p>

          {/* Live Countdown Box */}
          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E2CEAB] max-w-md mx-auto">
            <p className="text-[10px] font-royal font-bold uppercase tracking-widest text-[#C59B4E] mb-2">
              ⏳ Auspicious Muhurtham Countdown
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white border border-[#E2CEAB]">
                <span className="font-royal text-lg font-black text-[#6B1D2F]">{countdown.days}</span>
                <p className="text-[9px] font-royal uppercase text-[#7A263B]">Days</p>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E2CEAB]">
                <span className="font-royal text-lg font-black text-[#6B1D2F]">{countdown.hours}</span>
                <p className="text-[9px] font-royal uppercase text-[#7A263B]">Hours</p>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E2CEAB]">
                <span className="font-royal text-lg font-black text-[#6B1D2F]">{countdown.mins}</span>
                <p className="text-[9px] font-royal uppercase text-[#7A263B]">Mins</p>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E2CEAB]">
                <span className="font-royal text-lg font-black text-[#6B1D2F]">{countdown.secs}</span>
                <p className="text-[9px] font-royal uppercase text-[#7A263B]">Secs</p>
              </div>
            </div>
          </div>

          {/* RSVP Button */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenRsvp}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] text-[#FAF6F0] font-royal font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#6B1D2F]/20 hover:scale-105 active:scale-95 transition border border-[#C59B4E]/40"
            >
              ✉️ {isHindi ? 'उपस्थिति दर्ज करें (Confirm RSVP)' : 'Confirm Your RSVP'}
            </button>

            <button
              onClick={() => setShowQrModal(true)}
              className="px-6 py-3.5 rounded-full bg-[#FAF2E6] hover:bg-[#F2E5D0] text-[#6B1D2F] border border-[#E2CEAB] font-royal font-bold text-xs uppercase tracking-wider transition"
            >
              🎁 {isHindi ? 'डिजिटल शगुन व आशीर्वाद' : 'Digital Shagun'}
            </button>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: DEDICATED PRE-WEDDING SECTION (PHOTOS & 4K TEASER) */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-xl shadow-[#6B1D2F]/5 space-y-8">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2E6] border border-[#E2CEAB] text-[#6B1D2F] text-[11px] font-royal font-bold uppercase tracking-widest">
              <Camera size={13} className="text-[#C59B4E]" />
              <span>{isHindi ? 'प्री-वेडिंग उत्सव एवं मधुर स्मृतियां' : 'Pre-Wedding Saga & Memories'}</span>
            </div>
            <h2 className="font-royal text-2xl sm:text-4xl font-bold text-[#4A0F1E]">
              {isHindi ? 'अमर प्रेम गाथा' : 'The Pre-Wedding Journey'}
            </h2>
            <p className="text-xs sm:text-sm text-[#7A263B] font-cormorant text-lg max-w-xl mx-auto">
              {sample.preWeddingStory}
            </p>
          </div>

          {/* 4K Cinematic Video Teaser Preview Player */}
          {sample.videoUrl && (
            <div className="relative overflow-hidden rounded-2xl border-2 border-[#E2CEAB] bg-stone-900 aspect-video shadow-md group">
              {!isVideoPlaying ? (
                <>
                  <img 
                    src={sample.videoPoster || sample.thumbnail} 
                    alt="Pre-wedding poster" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] font-royal uppercase tracking-widest bg-[#C59B4E] text-[#2C0812] px-2.5 py-0.5 rounded-full w-max font-bold mb-1">
                      🎬 4K Cinematic Teaser
                    </span>
                    <h3 className="font-royal text-lg sm:text-xl font-bold">{sample.videoTitle || 'Pre-Wedding Cinematic Teaser'}</h3>
                  </div>

                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#6B1D2F]/90 text-[#FAF6F0] border-2 border-[#C59B4E] flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-95 transition backdrop-blur-sm cursor-pointer"
                    title="Play Video Teaser"
                  >
                    <Play size={24} className="text-[#C59B4E] ml-1 fill-[#C59B4E]" />
                  </button>
                </>
              ) : (
                <video 
                  src={sample.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          {/* Pre-Wedding Photo Gallery Grid */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-[#FAF2E6] pb-2">
              <h3 className="font-royal font-bold text-base text-[#4A0F1E] flex items-center gap-2">
                <span>📸</span>
                <span>{isHindi ? 'प्री-वेडिंग फोटो एलबम' : 'Pre-Wedding Photo Album'}</span>
              </h3>
              <span className="text-xs text-[#C59B4E] font-royal font-bold">
                {sample.preWeddingPhotos?.length || 4} Photos
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(sample.preWeddingPhotos || []).map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImg(photo.url)}
                  className="group relative rounded-2xl overflow-hidden border border-[#E2CEAB] aspect-square cursor-pointer shadow-sm hover:shadow-md hover:scale-105 transition-all"
                >
                  <img 
                    src={photo.url} 
                    alt={photo.caption || `Pre-wedding ${idx}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 text-white">
                    <p className="text-[10px] font-royal font-bold leading-tight">{photo.caption}</p>
                    <span className="text-[9px] text-[#E2C475] uppercase">{photo.tag || 'Shoot'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: FAMILY INVITATION & LINEAGE PATRIKA */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-xl shadow-[#6B1D2F]/5 space-y-8 text-center relative overflow-hidden">
          
          <div className="text-xs font-royal font-bold text-[#C59B4E] tracking-widest uppercase">
            {isHindi ? '॥ श्रीमद् कुंज बिहारिणी नमः ॥' : '|| Shrimat Kunj Biharine Namah ||'}
          </div>

          <div className="space-y-2">
            <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#4A0F1E]">
              {isHindi ? 'स्नेह निमंत्रण एवं कुल परम्परा' : 'Wedding Invitation & Family Blessings'}
            </h2>
            <p className="text-xs sm:text-sm text-[#7A263B] max-w-lg mx-auto">
              {isHindi 
                ? 'परमपिता परमात्मा की असीम अनुकंपा से हमारे प्रिय सुपुत्र / सुपुत्री के पावन परिणय संस्कार में आप सपरिवार सादर आमंत्रित हैं।'
                : 'Cordially invites you to grace the auspicious wedding ceremonies of our beloved children and bless their eternal beginning.'}
            </p>
          </div>

          {/* Family Lineage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            
            {/* Bride's Side */}
            <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E2CEAB] space-y-2 relative">
              <span className="text-[11px] font-royal font-bold text-[#FAF6F0] bg-[#6B1D2F] px-2.5 py-0.5 rounded-full">
                {isHindi ? 'कन्या पक्ष (Bride’s Side)' : 'Bride’s Side'}
              </span>
              <h3 className="font-royal text-xl font-bold text-[#4A0F1E] pt-1">
                {sample.sharmaFamily?.bride || 'Vaishali Sharma'}
              </h3>
              <div className="text-xs text-[#7A263B] space-y-1.5 font-serif">
                <p className="font-bold text-[#6B1D2F]">{sample.sharmaFamily?.grandparents}</p>
                <p>{sample.sharmaFamily?.parents}</p>
                <p className="text-stone-500 text-[11px]">{sample.sharmaFamily?.residence}</p>
              </div>
            </div>

            {/* Groom's Side */}
            <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E2CEAB] space-y-2 relative">
              <span className="text-[11px] font-royal font-bold text-[#FAF6F0] bg-[#6B1D2F] px-2.5 py-0.5 rounded-full">
                {isHindi ? 'वर पक्ष (Groom’s Side)' : 'Groom’s Side'}
              </span>
              <h3 className="font-royal text-xl font-bold text-[#4A0F1E] pt-1">
                {sample.gangawatFamily?.groom || 'Lakshay Gangawat'}
              </h3>
              <div className="text-xs text-[#7A263B] space-y-1.5 font-serif">
                <p className="font-bold text-[#6B1D2F]">{sample.gangawatFamily?.grandparents}</p>
                <p>{sample.gangawatFamily?.parents}</p>
                <p className="text-stone-500 text-[11px]">{sample.gangawatFamily?.residence}</p>
              </div>
            </div>

          </div>

          {/* Venue & Date Highlight */}
          <div className="p-4 rounded-2xl bg-[#FAF2E6] border border-[#E2CEAB] text-center space-y-1">
            <p className="font-royal font-bold text-sm text-[#4A0F1E]">{sample.date}</p>
            <p className="text-xs font-semibold text-[#6B1D2F]">📍 {sample.venue}</p>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: MULTI-DAY CEREMONIES & ITINERARY (मांगलिक कार्यक्रम) */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-xl shadow-[#6B1D2F]/5 space-y-8">
          
          <div className="text-center space-y-1">
            <div className="text-2xl text-[#C59B4E]">🪔 🌸 🪔</div>
            <span className="text-xs font-royal font-bold uppercase tracking-widest text-[#C59B4E]">
              {isHindi ? 'मांगलिक कार्यक्रम' : 'Wedding Ceremonies'}
            </span>
            <h2 className="font-royal text-2xl sm:text-4xl font-bold text-[#4A0F1E]">
              {isHindi ? 'विवाह उत्सव समय-सारणी' : 'Celebration Schedule'}
            </h2>
          </div>

          {/* Ceremony Cards */}
          <div className="space-y-4">
            {(sample.events || []).map((evt, idx) => (
              <div 
                key={idx} 
                className="p-5 sm:p-6 rounded-2xl bg-[#FAF6F0] border border-[#E2CEAB] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-[#FAF2E6] hover:border-[#6B1D2F]"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="font-royal font-bold text-base text-[#4A0F1E]">
                      {evt.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#7A263B] pl-8 font-serif leading-relaxed">
                    {evt.desc}
                  </p>
                  <p className="text-[11px] text-[#6B1D2F] pl-8 font-royal font-semibold">
                    👗 {isHindi ? 'परिधान (Dress Code):' : 'Dress Code:'} {evt.dressCode}
                  </p>
                </div>

                <div className="sm:text-right pl-8 sm:pl-0 shrink-0 space-y-1">
                  <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-royal font-bold text-[#6B1D2F] border border-[#E2CEAB] shadow-sm">
                    ⏰ {evt.time}
                  </span>
                  <p className="text-[11px] text-stone-500">{evt.date}</p>
                  <p className="text-[10px] text-stone-400">{evt.venue}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Venue GPS & Map Link */}
          <div className="p-6 rounded-2xl bg-[#FAF2E6] border border-[#E2CEAB] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-royal font-bold text-sm text-[#4A0F1E]">
                {isHindi ? 'विवाह स्थल एवं मार्ग निर्देश (GPS Direction)' : 'Venue & GPS Navigation'}
              </h4>
              <p className="text-xs text-[#7A263B] mt-0.5">{sample.venue}</p>
            </div>

            <a
              href={sample.googleMapsUrl || "https://maps.google.com"}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-white hover:bg-[#FAF6F0] text-[#6B1D2F] border border-[#E2CEAB] rounded-full text-xs font-royal font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Navigation size={14} className="text-[#C59B4E]" />
              <span>{isHindi ? 'गूगल मैप्स पर देखें' : 'Open in Google Maps'}</span>
            </a>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: PARIVAAR, COMPLIMENTS & BLESSINGS */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-xl shadow-[#6B1D2F]/5 text-center space-y-6">
          
          <div className="text-3xl text-[#C59B4E]">👑 🪷 👑</div>
          <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#4A0F1E]">
            {isHindi ? 'दर्शनाभिलाषी एवं स्वागतकर्ता' : 'With Best Compliments & Family Love'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif text-[#7A263B]">
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB] space-y-1">
              <p className="font-royal font-bold text-[#6B1D2F]">{isHindi ? 'दर्शनाभिलाषी:' : 'With Best Compliments:'}</p>
              <p>{sample.compliments?.withBestCompliments || 'Sharma & Gangawat Parivaar'}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB] space-y-1">
              <p className="font-royal font-bold text-[#6B1D2F]">{isHindi ? 'स्वागतकर्ता:' : 'Sharing The Joy:'}</p>
              <p>{sample.compliments?.sharingTheJoy || 'All Relatives & Friends'}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB] space-y-1">
              <p className="font-royal font-bold text-[#6B1D2F]">{isHindi ? 'स्नेही स्वजन:' : 'With Love:'}</p>
              <p>{sample.compliments?.withLove || 'Family Siblings and Dear Friends'}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E2CEAB] space-y-1">
              <p className="font-royal font-bold text-[#6B1D2F]">{isHindi ? 'विशेष आग्रह:' : 'Special Request:'}</p>
              <p>{sample.compliments?.specialRequest || 'Your blessings are our treasure.'}</p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenRsvp}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] text-[#FAF6F0] font-royal font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#6B1D2F]/20 hover:scale-105 active:scale-95 transition border border-[#C59B4E]/30"
            >
              ✉️ {isHindi ? 'शुभकामनाएं एवं उपस्थिति (RSVP)' : 'Send Blessings & RSVP'}
            </button>
          </div>

        </section>

        {/* 6. BOTTOM STUDIO ORDER CALLOUT */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FAF2E6] via-white to-[#FAF2E6] border-2 border-[#E2CEAB] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-royal text-lg font-bold text-[#4A0F1E]">
              {isHindi ? 'क्या आप ऐसा व्यक्तिगत विवाह पोर्टल बनवाना चाहते हैं?' : 'Want a customized Wedding Portal like this?'}
            </h3>
            <p className="text-xs text-[#7A263B]">
              {isHindi 
                ? 'हम आपके नाम, फोटो एलबम, प्री-वेडिंग वीडियो एवं परिवार विवरण के साथ 24 घंटे में तैयार कर देंगे।' 
                : 'Customized with your family lineage, pre-wedding album, music and RSVP within 24 hours.'}
            </p>
          </div>

          <button
            onClick={() => onBookWhatsApp(sample)}
            className="px-6 py-3 bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] text-[#FAF6F0] font-royal font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-[#6B1D2F]/20 flex items-center gap-2 transition active:scale-95 shrink-0 border border-[#C59B4E]/40"
          >
            <MessageCircle size={16} className="text-[#C59B4E]" />
            <span>{isHindi ? 'कुश इनविटेशन्स पर बुक करें' : 'Book on WhatsApp'}</span>
          </button>
        </div>

      </main>

      {/* 7. LIGHTBOX IMAGE MODAL */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={lightboxImg} alt="Enlarged" className="max-w-full max-h-[85vh] rounded-2xl object-contain border-2 border-[#C59B4E]" />
            <p className="text-center text-xs text-[#E2C475] mt-3 font-royal">
              Click anywhere to close
            </p>
          </div>
        </div>
      )}

      {/* 8. DIGITAL SHAGUN QR MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-[#E2CEAB] max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 font-bold"
            >
              ✕
            </button>
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF2E6] border border-[#E2CEAB] flex items-center justify-center text-xl">
              🎁
            </div>
            <h3 className="font-royal text-lg font-bold text-[#4A0F1E]">
              {isHindi ? 'डिजिटल शगुन एवं आशीर्वाद' : 'Digital Shagun & Blessings'}
            </h3>
            <p className="text-xs text-[#7A263B]">
              {isHindi ? 'आपकी उपस्थिति ही हमारा सबसे बड़ा उपहार है। यदि आप आशीर्वाद स्वरूप शगुन भेंट करना चाहते हैं:' : 'Your presence is our biggest blessing. If you wish to gift a token of love:'}
            </p>
            <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E2CEAB] inline-block">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=wedding.blessings@upi&pn=WeddingShagun" 
                alt="Shagun QR" 
                className="w-40 h-40 mx-auto"
              />
              <p className="text-[10px] font-mono font-bold text-[#6B1D2F] mt-2">
                UPI: wedding.blessings@upi
              </p>
            </div>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 bg-[#FAF2E6] text-[#6B1D2F] font-royal font-bold text-xs rounded-full border border-[#E2CEAB]"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
