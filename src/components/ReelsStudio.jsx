import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Heart, 
  Calendar, 
  MapPin, 
  Share2, 
  Download, 
  Music, 
  ChevronRight, 
  ChevronLeft,
  Film,
  Send,
  ExternalLink
} from 'lucide-react';
import { weddingAudio } from '../audio/WeddingAudioEngine';
import { BOLLYWOOD_WEDDING_TRACKS } from '../data/audioTracks';

export default function ReelsStudio({ invitation, onOpenRsvp }) {
  const [selectedLang, setSelectedLang] = useState('hi'); // 'hi' | 'en'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedMusic, setSelectedMusic] = useState('royal_mangalyam');
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Hindi Wedding Reel Slides (Lakshay & Vaishali)
  const hindiSlides = [
    {
      id: 'h1',
      badge: '॥ श्री गणेशाय नमः ॥',
      heading: 'शुभ परिणय संस्कार',
      subheading: 'लक्ष्य संग वैशाली',
      details: '18 फ़रवरी 2025 • अछरोल बाग, जयपुर',
      bg: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      caption: 'प्रभु कृपा एवं परिवार के शुभाशीर्वाद से दो आत्माओं का पावन मिलन।'
    },
    {
      id: 'h2',
      badge: '🌸 हल्दी एवं मेहंदी उत्सव',
      heading: 'उमंग, उत्साह एवं मंगल गीत',
      subheading: 'शर्मा एवं गंगावत परिवार',
      details: 'जयपुर, राजस्थान',
      bg: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      caption: 'हरिद्रा लेपन, ढोलक की थाप एवं सखियों के संग आनंदमय पल।'
    },
    {
      id: 'h3',
      badge: '🪔 बारात, जयमाला एवं फेरे',
      heading: 'सप्तपदी एवं पावन सात वचन',
      subheading: 'सायं 5:15 से रात्रि शुभ लग्नानुसार',
      details: 'कमल मंडप, अछरोल बाग',
      bg: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      caption: 'अग्नि के समक्ष जीवन भर का पवित्र गठबंधन एवं वरमाला संस्कार।'
    },
    {
      id: 'h4',
      badge: '💌 सादर निमंत्रण',
      heading: 'आपकी उपस्थिति सादर प्रार्थनीय है',
      subheading: 'स्वागताकांक्षी: समस्त परिवार',
      details: '#LakshayWedsVaishali • जयपुर',
      bg: 'https://images.unsplash.com/photo-1609151162377-794fad3d102f?auto=format&fit=crop&w=800&q=80',
      caption: 'मांगलिक बेला पर आपका स्नेहिल शुभाशीर्वाद हमारे लिए अमूल्य है।'
    }
  ];

  // English Wedding Reel Slides
  const englishSlides = [
    {
      id: 'e1',
      badge: '✨ SAVE THE DATE',
      heading: 'The Royal Vivah',
      subheading: 'Ananya & Kabir',
      details: 'November 28, 2026 • Udaipur',
      bg: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      caption: 'Two souls unite in an eternal celebration of love.'
    },
    {
      id: 'e2',
      badge: '🌸 SANGEET & CELEBRATIONS',
      heading: 'Music, Dance & Joy',
      subheading: 'The Oberoi Udaivilas',
      details: 'Udaipur, Rajasthan',
      bg: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      caption: 'A night of vibrant family dances and live sufi melodies.'
    },
    {
      id: 'e3',
      badge: '🪔 SACRED PHERAS',
      heading: 'Seven Eternal Vows',
      subheading: 'Sunset Muhurtham',
      details: 'Lotus Pavilions',
      bg: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      caption: 'Solemnizing our vows under the starlit palace sky.'
    },
    {
      id: 'e4',
      badge: '💌 CORDIAL INVITATION',
      heading: 'We Await Your Blessings',
      subheading: 'Singhania & Sharma Families',
      details: '#AnanyaFoundHerKabir',
      bg: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      caption: 'Your presence will make our celebration complete.'
    }
  ];

  const slides = selectedLang === 'hi' ? hindiSlides : englishSlides;

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentSlide((s) => {
              const next = (s + 1) % slides.length;
              if (!isAudioMuted) {
                weddingAudio.playSlideTick();
              }
              return next;
            });
            return 0;
          }
          return prev + 2.5;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, slides.length, isAudioMuted]);

  const handleNext = () => {
    weddingAudio.playSlideTick();
    setProgress(0);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    weddingAudio.playSlideTick();
    setProgress(0);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTogglePlay = () => {
    weddingAudio.playButtonClick();
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    weddingAudio.playButtonClick();
    setCurrentSlide(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleMusicChange = (trackId) => {
    setSelectedMusic(trackId);
    weddingAudio.init();
    weddingAudio.startMusic(trackId);
  };

  const handleToggleAudio = () => {
    weddingAudio.init();
    if (isAudioMuted) {
      weddingAudio.startMusic(selectedMusic);
      setIsAudioMuted(false);
    } else {
      weddingAudio.stopMusic();
      setIsAudioMuted(true);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2E6] border border-[#E2CEAB] text-[#6B1D2F] text-xs font-royal font-bold">
          <Film size={14} className="text-[#C59B4E]" />
          <span>9:16 Vertical Video Reels (Instagram &amp; WhatsApp Status)</span>
        </div>
        <h2 className="font-royal text-3xl sm:text-4xl font-bold text-[#4A0F1E] leading-tight">
          Animated 9:16 Video Invitation Reels
        </h2>
        <p className="text-xs sm:text-sm text-[#7A263B] font-cormorant text-lg">
          Cinematic vertical video cards designed for social media broadcasts and personal family WhatsApp sharing.
        </p>

        {/* Language Switcher */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <button
            onClick={() => {
              setSelectedLang('hi');
              setCurrentSlide(0);
              setProgress(0);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-royal font-bold transition ${
              selectedLang === 'hi' 
                ? 'bg-[#6B1D2F] text-white shadow-sm' 
                : 'bg-white text-[#4A0F1E] border border-[#E2CEAB]'
            }`}
          >
            🪷 Hindi Reel Sample (हिंदी)
          </button>
          <button
            onClick={() => {
              setSelectedLang('en');
              setCurrentSlide(0);
              setProgress(0);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-royal font-bold transition ${
              selectedLang === 'en' 
                ? 'bg-[#6B1D2F] text-white shadow-sm' 
                : 'bg-white text-[#4A0F1E] border border-[#E2CEAB]'
            }`}
          >
            🌸 English Reel Sample
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: 9:16 Reel Viewport */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          <div className="relative w-full max-w-[340px] sm:max-w-[350px] h-[580px] sm:h-[620px] bg-[#FAF6F0] rounded-[38px] sm:rounded-[44px] p-3 shadow-2xl border-4 border-[#C59B4E] ring-4 ring-[#FAF2E6] overflow-hidden flex flex-col select-none">
            
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={currentSlideData.bg}
                alt="Reel Slide"
                className="w-full h-full object-cover transition-all duration-700 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C0812] via-[#4A0F1E]/70 to-[#6B1D2F]/80" />
            </div>

            {/* Top Progress Bars */}
            <div className="relative z-20 flex gap-1.5 px-3 pt-3">
              {slides.map((_, idx) => (
                <div key={idx} className="flex-1 h-1.5 bg-white/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E2C475] transition-all duration-100"
                    style={{
                      width: idx < currentSlide ? '100%' : idx === currentSlide ? `${progress}%` : '0%'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Top Reel Header Bar */}
            <div className="relative z-20 flex items-center justify-between px-3 pt-2 text-white text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl overflow-hidden border border-[#C59B4E] bg-white shadow-md">
                  <img src="/kush-logo.jpg" alt="Kush Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-royal font-bold text-[11px] leading-tight text-white">
                    {selectedLang === 'hi' ? 'वैशाली संग लक्ष्य' : 'Vaishali & Lakshay'}
                  </p>
                  <p className="text-[9px] text-[#E2C475] font-royal">🎵 Kush Invitations Studio</p>
                </div>
              </div>

              <button
                onClick={handleToggleAudio}
                className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white transition active:scale-95"
              >
                {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#E2C475]" />}
              </button>
            </div>

            {/* Tap Navigation */}
            <div className="relative z-10 flex-1 flex">
              <div className="w-1/2 h-full cursor-pointer" onClick={handlePrev} />
              <div className="w-1/2 h-full cursor-pointer" onClick={handleNext} />
            </div>

            {/* Slide Content */}
            <div className="relative z-20 p-5 space-y-2.5 text-center text-white">
              
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#E2C475] border border-white/30 text-[10px] font-royal font-bold tracking-widest uppercase">
                {currentSlideData.badge}
              </span>

              <h3 className="font-royal text-2xl font-black text-white leading-tight">
                {currentSlideData.heading}
              </h3>

              <div className="font-royal text-lg text-[#E2C475] font-bold">
                {currentSlideData.subheading}
              </div>

              <p className="text-xs text-stone-200 font-serif italic max-w-[260px] mx-auto">
                "{currentSlideData.caption}"
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenRsvp}
                  className="w-full py-2.5 rounded-full font-royal font-bold text-xs uppercase tracking-wider bg-[#FAF6F0] text-[#6B1D2F] shadow-xl active:scale-95 transition border border-[#C59B4E]"
                >
                  ✉️ {selectedLang === 'hi' ? 'विवाह पत्रिका खोलें एवं उपस्थिति दें' : 'Open Wedding Card & RSVP'}
                </button>
              </div>

            </div>

          </div>

          {/* Reel Controls */}
          <div className="flex items-center gap-3 mt-4 bg-white p-2 rounded-full border border-[#E2CEAB] shadow-sm">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full hover:bg-stone-50 text-[#4A0F1E] transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={handleTogglePlay}
              className="px-4 py-2 rounded-full bg-[#6B1D2F] hover:bg-[#4A0F1E] text-white font-royal font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-stone-50 text-[#4A0F1E] transition"
            >
              <ChevronRight size={18} />
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-full hover:bg-stone-50 text-[#4A0F1E] transition"
            >
              <RotateCcw size={16} />
            </button>
          </div>

        </div>

        {/* RIGHT: Wedding Soundtracks & WhatsApp Dispatch */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Soundtracks */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#E2CEAB] space-y-4 shadow-xl shadow-[#6B1D2F]/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-royal text-base font-bold text-[#4A0F1E] mb-0.5">
                  Wedding Soundtrack &amp; Mangal Dhun
                </h3>
                <p className="text-xs text-[#7A263B]">
                  Select traditional shehnai, acoustic romance, or celebratory dhol beats.
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#FAF2E6] text-[#6B1D2F] flex items-center justify-center">
                <Music size={16} className="text-[#C59B4E]" />
              </div>
            </div>

            <div className="space-y-2.5">
              {BOLLYWOOD_WEDDING_TRACKS.map((track) => (
                <div
                  key={track.id}
                  onClick={() => handleMusicChange(track.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer border flex items-center justify-between transition ${
                    selectedMusic === track.id
                      ? 'border-[#6B1D2F] bg-[#FAF2E6] shadow-sm'
                      : 'border-[#E2CEAB] bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{track.icon}</span>
                    <div>
                      <h4 className="font-royal font-bold text-xs text-[#4A0F1E]">{track.title}</h4>
                      <p className="text-[10px] text-[#7A263B]">{track.genre} • {track.mood}</p>
                    </div>
                  </div>

                  {selectedMusic === track.id && (
                    <span className="text-[10px] font-royal font-bold text-[#6B1D2F] bg-white px-2.5 py-0.5 rounded-full border border-[#E2CEAB]">
                      ▶ Active Track
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Share */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#E2CEAB] space-y-3 shadow-xl shadow-[#6B1D2F]/5">
            <h3 className="font-royal text-base font-bold text-[#4A0F1E]">
              WhatsApp Broadcast &amp; Video Export
            </h3>
            <p className="text-xs text-[#7A263B]">
              Share this 9:16 vertical animated card link directly to Instagram Stories or WhatsApp with 1 click.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `✨ View our Wedding Video Invitation Reel by Kush Invitations:\n${window.location.origin}/?tab=reels`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-royal font-bold rounded-full text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-200 transition active:scale-95"
              >
                <Send size={15} />
                <span>Share Reel on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  weddingAudio.playButtonClick();
                  alert("High-Resolution 9:16 MP4 video export is ready! Kush Invitations render queued.");
                }}
                className="py-3 px-5 rounded-full text-xs font-royal font-bold bg-[#FAF2E6] hover:bg-[#F2E5D0] text-[#6B1D2F] border border-[#E2CEAB] transition flex items-center justify-center gap-2"
              >
                <Download size={15} className="text-[#C59B4E]" />
                <span>Download 9:16 MP4</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
