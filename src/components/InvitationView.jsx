import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Music, 
  Sparkles, 
  Send, 
  Share2, 
  Gift, 
  Navigation, 
  ExternalLink,
  ChevronDown,
  Volume2,
  VolumeX
} from 'lucide-react';
import { weddingAudio } from '../audio/WeddingAudioEngine';
import { THEMES } from '../data/themes';

export default function InvitationView({ invitation, currentThemeKey, onOpenRsvp, onOpenQr }) {
  const [activeTheme, setActiveTheme] = useState(THEMES[currentThemeKey] || THEMES.emerald);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    setActiveTheme(THEMES[currentThemeKey] || THEMES.emerald);
  }, [currentThemeKey]);

  useEffect(() => {
    const targetDate = new Date(invitation.weddingDate || '2026-11-28T16:30:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [invitation.weddingDate]);

  const handleToggleAudio = () => {
    weddingAudio.init();
    const playing = weddingAudio.toggleMusic(invitation.musicTrack || 'raga');
    setIsPlaying(playing);
  };

  const handleAddToCalendar = (event) => {
    weddingAudio.playButtonClick();
    const text = encodeURIComponent(`${invitation.couple.bride} & ${invitation.couple.groom}'s ${event.title}`);
    const details = encodeURIComponent(`${event.desc}\nDress Code: ${event.dressCode}\nVenue: ${event.venue}`);
    const location = encodeURIComponent(`${event.venue}, ${invitation.venue.city}`);
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&location=${location}`;
    window.open(calUrl, '_blank');
  };

  return (
    <div className={`min-h-screen ${activeTheme.bgClass} text-stone-100 selection:bg-amber-400 selection:text-black py-8 px-4 transition-colors duration-500`}>
      
      {/* Floating Action Audio Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleToggleAudio}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold shadow-2xl hover:scale-105 active:scale-95 transition"
        >
          {isPlaying ? <Volume2 size={16} className="animate-bounce" /> : <VolumeX size={16} />}
          <span>{isPlaying ? 'Melody Playing' : 'Play Music'}</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Top Royal Monogram Card */}
        <div className={`relative p-8 sm:p-12 rounded-3xl ${activeTheme.surfaceClass} border-2 ${activeTheme.cardBorder} text-center space-y-6 shadow-2xl overflow-hidden`}>
          
          <div className="flex items-center justify-between">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${activeTheme.pillTag}`}>
              {invitation.couple.hashtag}
            </span>
            <button
              onClick={onOpenQr}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 transition"
              title="QR Code"
            >
              <Sparkles size={16} className="text-amber-400" />
            </button>
          </div>

          {/* Crest */}
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 text-slate-950 flex items-center justify-center font-royal font-black text-3xl shadow-xl shadow-amber-500/20 animate-float">
            {invitation.couple.bride.charAt(0)}&amp;{invitation.couple.groom.charAt(0)}
          </div>

          <div>
            <p className="font-royal text-xs uppercase tracking-widest text-amber-300 font-semibold mb-2">
              The Royal Wedding of
            </p>
            <h1 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {invitation.couple.bride}
            </h1>
            <div className="font-script text-4xl sm:text-5xl text-amber-300 my-1">
              and
            </div>
            <h1 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {invitation.couple.groom}
            </h1>
          </div>

          <p className="font-serif italic text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            "{invitation.couple.quote}"
          </p>

          {/* Countdown Clock */}
          <div className="pt-6 border-t border-white/10 max-w-md mx-auto grid grid-cols-4 gap-2.5">
            <div className="bg-black/50 p-3 rounded-2xl border border-white/10">
              <div className="font-royal font-bold text-xl sm:text-2xl text-amber-300">{timeLeft.days}</div>
              <div className="text-[9px] uppercase tracking-wider text-stone-400">Days</div>
            </div>
            <div className="bg-black/50 p-3 rounded-2xl border border-white/10">
              <div className="font-royal font-bold text-xl sm:text-2xl text-amber-300">{timeLeft.hours}</div>
              <div className="text-[9px] uppercase tracking-wider text-stone-400">Hours</div>
            </div>
            <div className="bg-black/50 p-3 rounded-2xl border border-white/10">
              <div className="font-royal font-bold text-xl sm:text-2xl text-amber-300">{timeLeft.mins}</div>
              <div className="text-[9px] uppercase tracking-wider text-stone-400">Mins</div>
            </div>
            <div className="bg-black/50 p-3 rounded-2xl border border-white/10">
              <div className="font-royal font-bold text-xl sm:text-2xl text-amber-300">{timeLeft.secs}</div>
              <div className="text-[9px] uppercase tracking-wider text-stone-400">Secs</div>
            </div>
          </div>

          {/* RSVP Direct Trigger */}
          <div className="pt-4">
            <button
              onClick={onOpenRsvp}
              className={`px-8 py-3.5 rounded-2xl font-royal font-bold text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${activeTheme.btnPrimary}`}
            >
              ✉️ Confirm Your RSVP Attendance
            </button>
          </div>

        </div>

        {/* Story Section */}
        <div className={`p-8 sm:p-10 rounded-3xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} text-center space-y-4 shadow-xl`}>
          <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 mx-auto flex items-center justify-center">
            <Heart size={22} />
          </div>
          <h2 className="font-royal text-2xl font-bold text-white">Our Journey to Forever</h2>
          <p className="font-serif italic text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            "{invitation.couple.story}"
          </p>
        </div>

        {/* Ceremonial Events Schedule */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Celebration Schedule</span>
            <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white">Ceremonies &amp; Itinerary</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {invitation.events.map((evt, idx) => (
              <div
                key={evt.id || idx}
                className={`p-6 rounded-3xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} flex flex-col justify-between space-y-4 shadow-lg`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-royal text-base font-bold text-white leading-tight">
                      {evt.title}
                    </h3>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono px-2 py-0.5 rounded shrink-0">
                      {evt.date}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-stone-300">
                    <div className="flex items-center gap-2">
                      <Clock size={13} className="text-amber-400 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-amber-400 shrink-0" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 italic pt-1">
                    {evt.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[10px] text-amber-200">
                    👗 <strong>Dress Code:</strong> {evt.dressCode}
                  </div>
                  <button
                    onClick={() => handleAddToCalendar(evt)}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-semibold text-stone-200 flex items-center gap-1 transition"
                  >
                    <Calendar size={11} />
                    <span>Add to Calendar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venue & Navigation */}
        <div className={`p-8 sm:p-10 rounded-3xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xl`}>
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Destination Venue</span>
            <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white leading-tight">
              {invitation.venue.name}
            </h2>
            <p className="text-xs text-stone-300">
              {invitation.venue.address}
            </p>

            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/10 space-y-1.5 text-xs text-stone-300">
              <p>✈️ <strong>Nearest Airport:</strong> {invitation.venue.airport}</p>
              <p>🚆 <strong>Nearest Station:</strong> {invitation.venue.station}</p>
            </div>

            <a
              href={invitation.venue.mapLink}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${activeTheme.btnPrimary}`}
            >
              <Navigation size={14} />
              <span>Get GPS Directions</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl h-64">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
              alt="Venue Palace"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Memories in Frames</span>
            <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white">Pre-Wedding Gallery</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {invitation.gallery.map((img, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden group border border-white/10 h-60 shadow-lg">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs text-white font-medium">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer RSVP Callout */}
        <div className={`p-8 sm:p-12 rounded-3xl ${activeTheme.surfaceClass} border-2 ${activeTheme.cardBorder} text-center space-y-4 shadow-2xl`}>
          <h2 className="font-royal text-2xl sm:text-4xl font-bold text-white">
            We Await Your Presence &amp; Blessings
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
            Please let us know your travel plans and attendance details to help us ensure your comfortable stay.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenRsvp}
              className={`px-8 py-3.5 rounded-2xl font-royal font-bold text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${activeTheme.btnPrimary}`}
            >
              ✉️ Confirm RSVP Attendance
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
