import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Music, 
  Volume2, 
  VolumeX, 
  Share2, 
  Send, 
  Gift, 
  Clock, 
  Sparkles, 
  Check, 
  ExternalLink,
  ChevronRight,
  Navigation,
  Copy
} from 'lucide-react';
import { weddingAudio } from '../audio/WeddingAudioEngine';
import { THEMES } from '../data/themes';

export default function MobileMockup({ invitation, activeTheme, onOpenRsvp, onOpenQr }) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('events'); // 'events' | 'story' | 'venue' | 'gallery' | 'registry'
  const [copiedLink, setCopiedLink] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // Wedding Countdown
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
      } else {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [invitation.weddingDate]);

  const handleOpenEnvelope = () => {
    weddingAudio.playEnvelopeOpen();
    setEnvelopeOpen(true);
    // Start background music automatically
    weddingAudio.startMusic(invitation.musicTrack || 'raga');
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    weddingAudio.playButtonClick();
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSectionTab = (sec) => {
    weddingAudio.playButtonClick();
    setActiveSection(sec);
  };

  return (
    <div className="relative mx-auto w-full max-w-[400px] flex justify-center py-6">
      
      {/* Mobile Device Frame (iPhone Titanium Style) */}
      <div className="relative w-[360px] sm:w-[390px] h-[780px] bg-[#0c0d12] rounded-[52px] p-3 shadow-2xl border-[5px] border-slate-700/60 ring-1 ring-white/20 overflow-hidden flex flex-col">
        
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3 border border-white/10 shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
          <div className="w-2 h-2 rounded-full bg-blue-900/60 animate-pulse"></div>
        </div>

        {/* Mobile Viewport Screen */}
        <div className={`relative w-full h-full rounded-[42px] overflow-y-auto ${activeTheme.bgClass} text-stone-100 flex flex-col selection:bg-amber-400 selection:text-black transition-colors duration-300`}>
          
          {/* 1. CLOSED ENVELOPE OVERLAY IF NOT OPENED */}
          {!envelopeOpen ? (
            <div className={`absolute inset-0 z-40 ${activeTheme.surfaceClass} flex flex-col items-center justify-center p-6 text-center transition-all duration-700`}>
              
              {/* Gold Border Crest */}
              <div className="w-full max-w-[280px] border-2 border-dashed border-amber-400/40 rounded-3xl p-6 flex flex-col items-center bg-black/40 backdrop-blur-md shadow-2xl">
                
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-black flex items-center justify-center font-royal font-black text-2xl shadow-xl shadow-amber-500/30 mb-4 animate-float">
                  ✨
                </div>

                <p className="font-royal text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
                  Royal Wedding Invitation
                </p>

                <h3 className="font-royal text-xl font-bold text-white mb-2 leading-tight">
                  {invitation.couple.bride} <br />
                  <span className="text-amber-400 font-script text-2xl">&amp;</span> <br />
                  {invitation.couple.groom}
                </h3>

                <p className="text-[11px] text-stone-300 mb-6 font-serif italic">
                  cordially request the honour of your presence
                </p>

                {/* Wax Seal Button */}
                <button
                  onClick={handleOpenEnvelope}
                  className={`w-full py-3 px-4 rounded-xl font-royal font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 animate-pulse ${activeTheme.btnPrimary}`}
                >
                  ✉️ Tap to Unseal Invitation
                </button>

                <p className="text-[9px] text-stone-400 mt-3 font-mono">
                  🎵 Includes Live Web Audio Music
                </p>
              </div>

            </div>
          ) : null}

          {/* 2. INVITATION HEADER & HERO COVER */}
          <div className="relative pt-12 pb-6 px-5 text-center overflow-hidden border-b border-white/10">
            
            {/* Top Quick Actions */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${activeTheme.pillTag}`}>
                {invitation.couple.hashtag}
              </span>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={handleShare}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 transition"
                  title="Share Wedding Link"
                >
                  {copiedLink ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
                </button>
                <button 
                  onClick={onOpenQr}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 transition"
                  title="View Wedding QR Code"
                >
                  <Sparkles size={13} className="text-amber-300" />
                </button>
              </div>
            </div>

            {/* Monogram Crest */}
            <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 text-slate-950 flex items-center justify-center font-royal font-extrabold text-xl shadow-lg shadow-amber-500/20 mb-3">
              {invitation.couple.bride.charAt(0)}&amp;{invitation.couple.groom.charAt(0)}
            </div>

            {/* Couple Names */}
            <h2 className="font-royal text-2xl font-bold tracking-tight text-white leading-tight">
              {invitation.couple.bride}
            </h2>
            <div className="font-script text-3xl text-amber-300 my-0.5 leading-none">
              weds
            </div>
            <h2 className="font-royal text-2xl font-bold tracking-tight text-white leading-tight">
              {invitation.couple.groom}
            </h2>

            <p className="text-xs text-stone-300 font-serif italic mt-2 max-w-[260px] mx-auto">
              "{invitation.couple.quote}"
            </p>

            {/* Live Countdown Clock */}
            <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-4 gap-1.5">
              <div className="bg-black/40 p-1.5 rounded-lg border border-white/5">
                <div className="font-royal font-bold text-sm text-amber-300">{timeLeft.days}</div>
                <div className="text-[8px] uppercase tracking-wider text-stone-400">Days</div>
              </div>
              <div className="bg-black/40 p-1.5 rounded-lg border border-white/5">
                <div className="font-royal font-bold text-sm text-amber-300">{timeLeft.hours}</div>
                <div className="text-[8px] uppercase tracking-wider text-stone-400">Hours</div>
              </div>
              <div className="bg-black/40 p-1.5 rounded-lg border border-white/5">
                <div className="font-royal font-bold text-sm text-amber-300">{timeLeft.mins}</div>
                <div className="text-[8px] uppercase tracking-wider text-stone-400">Mins</div>
              </div>
              <div className="bg-black/40 p-1.5 rounded-lg border border-white/5">
                <div className="font-royal font-bold text-sm text-amber-300">{timeLeft.secs}</div>
                <div className="text-[8px] uppercase tracking-wider text-stone-400">Secs</div>
              </div>
            </div>

          </div>

          {/* 3. NAVIGATION SECTION TABS */}
          <div className="flex items-center justify-around bg-black/40 border-b border-white/10 p-1 text-[11px] font-medium sticky top-0 z-20 backdrop-blur-md">
            {[
              { id: 'events', label: 'Events' },
              { id: 'story', label: 'Story' },
              { id: 'venue', label: 'Venue' },
              { id: 'gallery', label: 'Photos' },
              { id: 'registry', label: 'Blessings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleSectionTab(tab.id)}
                className={`py-1 px-2 rounded-lg transition ${
                  activeSection === tab.id
                    ? 'text-amber-300 font-bold bg-amber-400/20 border border-amber-400/30'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 4. DYNAMIC SECTION CONTENTS */}
          <div className="p-4 space-y-4 flex-1">
            
            {/* TAB: EVENTS */}
            {activeSection === 'events' && (
              <div className="space-y-3">
                <div className="text-center mb-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">Celebration Schedule</span>
                </div>

                {invitation.events.map((event, idx) => (
                  <div 
                    key={event.id || idx}
                    className={`p-3.5 rounded-2xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} shadow-md space-y-2`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-royal font-bold text-xs text-white leading-tight">
                        {event.title}
                      </h4>
                      <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono shrink-0">
                        {event.date}
                      </span>
                    </div>

                    <div className="text-[11px] text-stone-300 space-y-1">
                      <div className="flex items-center gap-1.5 text-stone-400">
                        <Clock size={11} className="text-amber-400 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-400">
                        <MapPin size={11} className="text-amber-400 shrink-0" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-stone-300 italic border-t border-white/5 pt-1.5">
                      {event.desc}
                    </p>

                    <div className="bg-black/30 p-1.5 rounded-lg text-[9px] text-amber-200/90 flex items-center gap-1 border border-white/5">
                      <span className="font-semibold">👗 Dress Code:</span>
                      <span>{event.dressCode}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: STORY */}
            {activeSection === 'story' && (
              <div className={`p-4 rounded-2xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} text-center space-y-3`}>
                <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 mx-auto flex items-center justify-center">
                  <Heart size={18} />
                </div>
                <h4 className="font-royal text-sm font-bold text-white">Our Love Story</h4>
                <p className="text-xs text-stone-300 leading-relaxed font-serif italic">
                  "{invitation.couple.story}"
                </p>
                <div className="border-t border-white/10 pt-3 text-[11px] text-amber-300 font-royal font-semibold">
                  #ForeverAndAlways
                </div>
              </div>
            )}

            {/* TAB: VENUE */}
            {activeSection === 'venue' && (
              <div className={`p-4 rounded-2xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} space-y-3`}>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-amber-400" />
                  <div>
                    <h4 className="font-royal font-bold text-xs text-white">{invitation.venue.name}</h4>
                    <p className="text-[10px] text-stone-400">{invitation.venue.city}</p>
                  </div>
                </div>

                <p className="text-xs text-stone-300">
                  {invitation.venue.address}
                </p>

                <div className="bg-black/30 p-2.5 rounded-xl space-y-1.5 text-[10px] text-stone-300 border border-white/5">
                  <p>✈️ <strong>Airport:</strong> {invitation.venue.airport}</p>
                  <p>🚆 <strong>Railway:</strong> {invitation.venue.station}</p>
                </div>

                <a 
                  href={invitation.venue.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-2 px-3 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5 transition ${activeTheme.btnSecondary}`}
                >
                  <Navigation size={13} />
                  <span>Open Google Maps Directions</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}

            {/* TAB: GALLERY */}
            {activeSection === 'gallery' && (
              <div className="space-y-2.5">
                {invitation.gallery.map((img, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden border border-white/10 group shadow-md">
                    <img 
                      src={img.url} 
                      alt={img.caption} 
                      className="w-full h-36 object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] text-white font-medium">{img.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: REGISTRY */}
            {activeSection === 'registry' && (
              <div className={`p-4 rounded-2xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} text-center space-y-3`}>
                <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 mx-auto flex items-center justify-center">
                  <Gift size={18} />
                </div>
                <h4 className="font-royal text-sm font-bold text-white">Blessing &amp; Registry Portal</h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {invitation.registry.note}
                </p>
                {invitation.registry.upiId && (
                  <div className="bg-black/40 p-2.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-300">{invitation.registry.upiId}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(invitation.registry.upiId);
                        alert('UPI ID copied to clipboard!');
                      }}
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-[10px] text-stone-200"
                    >
                      Copy UPI
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* 5. BOTTOM FIXED RSVP ACTION BAR */}
          <div className="p-3 bg-[#080B12]/95 border-t border-white/10 sticky bottom-0 z-30">
            <button
              onClick={() => {
                weddingAudio.playButtonClick();
                onOpenRsvp();
              }}
              className={`w-full py-2.5 rounded-xl font-royal font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-95 transition ${activeTheme.btnPrimary}`}
            >
              <Send size={14} />
              <span>Confirm RSVP (Save Seat)</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
