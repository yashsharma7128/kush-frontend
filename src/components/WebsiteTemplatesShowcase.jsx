import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Plane, 
  BookOpen, 
  Layers, 
  Calendar, 
  MapPin, 
  Clock, 
  Heart, 
  ChevronRight, 
  ChevronLeft,
  Navigation,
  ExternalLink,
  Check,
  Send,
  Music,
  Share2,
  Luggage,
  Sun
} from 'lucide-react';
import { weddingAudio } from '../audio/WeddingAudioEngine';
import { THEMES } from '../data/themes';

export default function WebsiteTemplatesShowcase({ invitation, currentThemeKey, onOpenRsvp, onOpenQr }) {
  const [activeLayout, setActiveLayout] = useState('scroll'); // 'scroll' | 'magazine' | 'boardingpass' | 'storybook' | 'celestial'
  const [bookPage, setBookPage] = useState(0);
  const activeTheme = THEMES[currentThemeKey] || THEMES.emerald;

  const layouts = [
    { id: 'scroll', name: '👑 Royal Palace Heritage', tag: 'Traditional Vivah & Grand Scroll' },
    { id: 'magazine', name: '📰 Vogue Editorial & Magazine', tag: 'Haute Couture Double-Column Spread' },
    { id: 'boardingpass', name: '✈️ Destination Boarding Pass', tag: 'Aviation Flight Ticket & Travel Portal' },
    { id: 'storybook', name: '📖 Royal Storybook Journal', tag: 'Interactive Flipping Chapters' },
    { id: 'celestial', name: '🌌 Celestial Midnight Luxe', tag: 'Starlight Constellations & Black Tie' }
  ];

  // Storybook chapters
  const storyPages = [
    {
      chapter: 'Chapter I',
      title: 'The Serendipitous Meeting',
      date: 'Autumn in Mumbai',
      text: 'What started as a spontaneous conversation over monsoon rain and warm artisanal coffee blossomed into an unbreakable bond of shared dreams and endless laughter.',
      quote: '“In a room full of art, I would still stare at you.”'
    },
    {
      chapter: 'Chapter II',
      title: 'The Proposal Under Crimson Skies',
      date: 'Sunset at Lake Pichola, Udaipur',
      text: 'Surrounded by shimmering palace reflections and soft sitar melodies, Kabir asked the question that made eternity feel like home. With tears of joy, Ananya said yes.',
      quote: '“Two souls, one destiny written in the stars.”'
    },
    {
      chapter: 'Chapter III',
      title: 'The Sacred Seven Vows & Celebrations',
      date: 'November 27-28, 2026',
      text: 'We now step together into the sacred mandap to pledge our seven eternal promises. We cordially request your presence and blessings to grace our new beginning.',
      quote: '“Together is our favorite place to be.”'
    }
  ];

  const handleLayoutSwitch = (lId) => {
    weddingAudio.playButtonClick();
    setActiveLayout(lId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Top Template Selector Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono">
          <Layers size={14} />
          <span>5 Curated Invitation Website Archetypes</span>
        </div>
        <h2 className="font-royal text-3xl sm:text-5xl font-bold text-white leading-tight">
          Explore 5 Distinct Website Designs
        </h2>
        <p className="text-xs sm:text-sm text-stone-300">
          Every celebration has a unique soul. Switch between completely different architectural layouts tailored for Royal Indian Vivahs, European Destination Flights, Vogue Editorials, or Interactive Storybooks.
        </p>
      </div>

      {/* 5 Archetype Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap bg-black/40 p-2 rounded-2xl border border-white/10 max-w-4xl mx-auto">
        {layouts.map((l) => (
          <button
            key={l.id}
            onClick={() => handleLayoutSwitch(l.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center ${
              activeLayout === l.id
                ? 'bg-amber-400 text-slate-950 shadow-lg scale-105'
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{l.name}</span>
            <span className={`text-[9px] font-mono font-normal ${activeLayout === l.id ? 'text-slate-800' : 'text-stone-500'}`}>
              {l.tag.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* RENDER SELECTED DESIGN LAYOUT */}
      <div className="transition-all duration-300">
        
        {/* ========================================================================= */}
        {/* DESIGN 1: ROYAL PALACE HERITAGE (Grand Infinite Scroll) */}
        {/* ========================================================================= */}
        {activeLayout === 'scroll' && (
          <div className={`p-6 sm:p-12 rounded-3xl ${activeTheme.surfaceClass} border-2 ${activeTheme.cardBorder} shadow-2xl space-y-12`}>
            
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full ${activeTheme.pillTag}`}>
                ROYAL HERITAGE WEDDING
              </span>
              <h3 className="font-royal text-3xl sm:text-6xl font-black text-white">
                {invitation.couple.bride} <br />
                <span className="text-amber-400 font-script text-4xl sm:text-5xl">&amp;</span> <br />
                {invitation.couple.groom}
              </h3>
              <p className="font-serif italic text-sm text-stone-300">
                "{invitation.couple.quote}"
              </p>
            </div>

            {/* Ceremonies Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {invitation.events.map((evt, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-royal font-bold text-base text-white">{evt.title}</h4>
                    <span className="text-[10px] font-mono bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">{evt.date}</span>
                  </div>
                  <p className="text-xs text-stone-300">{evt.desc}</p>
                  <div className="text-[11px] text-amber-200">
                    👗 <strong>Dress Code:</strong> {evt.dressCode}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={onOpenRsvp}
                className={`px-8 py-3.5 rounded-2xl font-royal font-bold text-xs uppercase tracking-widest shadow-xl transition active:scale-95 ${activeTheme.btnPrimary}`}
              >
                Confirm Royal RSVP
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DESIGN 2: VOGUE EDITORIAL & LUXURY MAGAZINE */}
        {/* ========================================================================= */}
        {activeLayout === 'magazine' && (
          <div className="p-6 sm:p-12 rounded-3xl bg-[#0F0F12] border-2 border-white/20 shadow-2xl text-stone-100 font-serif space-y-8">
            
            {/* Magazine Masthead */}
            <div className="border-b-2 border-white/30 pb-4 text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">THE WEDDING ISSUE • VOL. XXIV</span>
              <h1 className="font-royal text-4xl sm:text-7xl font-extrabold tracking-tight text-white uppercase mt-1">
                VOWS &amp; COUTURE
              </h1>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-stone-400 border-t border-white/10 pt-2 mt-2 font-mono">
                <span>NOVEMBER 2026</span>
                <span>DESTINATION: UDAIPUR PALACE</span>
                <span>EXCLUSIVE INVITATION</span>
              </div>
            </div>

            {/* Editorial 2-Column Spread */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">Front Page Story</span>
                <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white leading-tight">
                  The Union of {invitation.couple.bride} and {invitation.couple.groom}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                  {invitation.couple.story}
                </p>
                
                <div className="p-4 rounded-xl bg-white/5 border-l-4 border-amber-400 text-xs italic font-serif text-amber-200">
                  "Dress Code: High-Glamour Lehengas, Tuxedos, and Royal Velvets. An unforgettable night of Sufi rhythms and lakeside banquets."
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenRsvp}
                    className="px-6 py-3 bg-white text-black font-sans font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-stone-200 transition"
                  >
                    RSVP to the Haute Gala
                  </button>
                </div>
              </div>

              <div className="md:col-span-5 relative h-80 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                  alt="Couple Cover"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-3 left-3 right-3 p-2 bg-black/70 backdrop-blur-md rounded-lg text-[10px] font-mono text-stone-300">
                  Editorial Photography by Inverto Studios
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* DESIGN 3: DESTINATION BOARDING PASS & AIRPORT TICKET */}
        {/* ========================================================================= */}
        {activeLayout === 'boardingpass' && (
          <div className="p-4 sm:p-8 rounded-3xl bg-[#0B1520] border-2 border-blue-400/30 shadow-2xl space-y-6">
            
            {/* Boarding Pass Ticket Container */}
            <div className="bg-[#FAF6EE] text-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 flex flex-col md:flex-row">
              
              {/* Main Ticket (8 cols) */}
              <div className="p-6 sm:p-8 md:w-2/3 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-slate-400 space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                  <div className="flex items-center gap-2">
                    <Plane size={20} className="text-blue-900" />
                    <span className="font-royal font-black text-base text-blue-950 tracking-wider">
                      ROYAL DESTINATION AIRWAYS
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-400/30 px-2 py-0.5 rounded text-amber-900">
                    FIRST CLASS BOARDING PASS
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">PASSENGER NAME</p>
                    <p className="font-bold text-slate-900">Distinguished Guest</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">FLIGHT NO.</p>
                    <p className="font-bold font-mono text-blue-900">INV-2026</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">DESTINATION</p>
                    <p className="font-bold text-slate-900">UDR (Udaipur)</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">DATE</p>
                    <p className="font-bold font-mono text-slate-900">{invitation.weddingDate}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 space-y-1 text-xs">
                  <p className="font-bold text-blue-950 font-royal">
                    {invitation.couple.bride} &amp; {invitation.couple.groom}'s Vivah
                  </p>
                  <p className="text-slate-600 text-[11px]">
                    📍 Venue: {invitation.venue.name}, {invitation.venue.city}
                  </p>
                </div>

                {/* Barcode Strip */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="font-mono text-2xl tracking-[6px] font-black text-slate-800">
                    ||| | |||| || | ||||| ||| ||
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">GATE 01 • SEAT VIP</span>
                </div>
              </div>

              {/* Stub (4 cols) */}
              <div className="p-6 sm:p-8 md:w-1/3 bg-[#F0EBE0] flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500">TRAVEL STUB</span>
                  <h4 className="font-royal font-bold text-sm text-slate-900 mt-1">
                    {invitation.couple.bride.split(' ')[0]} &amp; {invitation.couple.groom.split(' ')[0]}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1">Udaipur Palace Vivah</p>
                  <p className="text-[10px] font-mono text-blue-900 mt-2 font-bold">RSVP REQUIRED FOR BOARDING</p>
                </div>

                <button
                  onClick={onOpenRsvp}
                  className="w-full py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-mono font-bold text-xs rounded-xl shadow-md transition active:scale-95"
                >
                  Confirm Seat RSVP
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* DESIGN 4: ROYAL FAIRY TALE STORYBOOK JOURNAL (Interactive Flipping) */}
        {/* ========================================================================= */}
        {activeLayout === 'storybook' && (
          <div className="p-6 sm:p-12 rounded-3xl bg-[#160E08] border-2 border-amber-500/30 shadow-2xl text-stone-100 space-y-8">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Interactive Wedding Journal</span>
              <h2 className="font-royal text-3xl sm:text-4xl font-bold text-white">
                The Chronicles of {invitation.couple.bride.split(' ')[0]} &amp; {invitation.couple.groom.split(' ')[0]}
              </h2>
            </div>

            {/* Book Spine Card */}
            <div className="max-w-2xl mx-auto bg-[#26170F] rounded-3xl p-6 sm:p-10 border-2 border-amber-400/40 shadow-2xl space-y-6 relative">
              
              <div className="flex items-center justify-between border-b border-amber-400/20 pb-3">
                <span className="font-mono text-amber-300 text-xs font-bold">{storyPages[bookPage].chapter}</span>
                <span className="text-[11px] text-stone-400 font-serif italic">{storyPages[bookPage].date}</span>
              </div>

              <div className="space-y-4 text-center">
                <h3 className="font-royal text-2xl font-bold text-white">
                  {storyPages[bookPage].title}
                </h3>
                <p className="text-sm text-stone-200 font-serif leading-relaxed italic">
                  "{storyPages[bookPage].text}"
                </p>
                <div className="text-xs text-amber-300 font-serif">
                  {storyPages[bookPage].quote}
                </div>
              </div>

              {/* Page Stepper Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-amber-400/20">
                <button
                  onClick={() => {
                    weddingAudio.playSlideTick();
                    setBookPage((p) => Math.max(0, p - 1));
                  }}
                  disabled={bookPage === 0}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 text-xs text-stone-200 disabled:opacity-30 flex items-center gap-1 transition"
                >
                  <ChevronLeft size={14} />
                  <span>Previous Chapter</span>
                </button>

                <span className="text-[11px] font-mono text-stone-400">
                  {bookPage + 1} of {storyPages.length}
                </span>

                <button
                  onClick={() => {
                    weddingAudio.playSlideTick();
                    setBookPage((p) => Math.min(storyPages.length - 1, p + 1));
                  }}
                  disabled={bookPage === storyPages.length - 1}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs disabled:opacity-30 flex items-center gap-1 transition"
                >
                  <span>Next Chapter</span>
                  <ChevronRight size={14} />
                </button>
              </div>

            </div>

            <div className="text-center pt-2">
              <button
                onClick={onOpenRsvp}
                className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-royal font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition active:scale-95"
              >
                Sign the Royal Guestbook (RSVP)
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* DESIGN 5: CELESTIAL MIDNIGHT & BLACK TIE GALA */}
        {/* ========================================================================= */}
        {activeLayout === 'celestial' && (
          <div className="p-6 sm:p-12 rounded-3xl bg-[#04060A] border-2 border-slate-700/60 shadow-2xl text-stone-100 space-y-10 relative overflow-hidden">
            
            {/* Background Starlight Glimmer */}
            <div className="text-center space-y-3 max-w-2xl mx-auto relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-[4px] text-amber-300">
                ✦ CELESTIAL BLACK TIE SOIREE ✦
              </span>
              <h2 className="font-royal text-3xl sm:text-6xl font-extrabold text-white tracking-wider">
                {invitation.couple.bride.toUpperCase()} <br />
                <span className="text-amber-400 font-serif italic text-2xl sm:text-4xl">&amp;</span> <br />
                {invitation.couple.groom.toUpperCase()}
              </h2>
              <p className="text-xs text-stone-400 font-mono">
                COORDINATES: {invitation.venue.city.toUpperCase()} • {invitation.weddingDate}
              </p>
            </div>

            {/* Starlight Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto relative z-10">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-1">
                <span className="text-amber-400 text-lg">🍾</span>
                <h4 className="font-royal font-bold text-xs text-white">Imperial Banquet</h4>
                <p className="text-[10px] text-stone-400">Champagne Toast &amp; Caviar</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-1">
                <span className="text-amber-400 text-lg">🎻</span>
                <h4 className="font-royal font-bold text-xs text-white">Midnight Symphony</h4>
                <p className="text-[10px] text-stone-400">Live Orchestral Suite</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-1">
                <span className="text-amber-400 text-lg">🎆</span>
                <h4 className="font-royal font-bold text-xs text-white">Lakeside Fireworks</h4>
                <p className="text-[10px] text-stone-400">Illuminated Palace Sky</p>
              </div>
            </div>

            <div className="text-center pt-2 relative z-10">
              <button
                onClick={onOpenRsvp}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-royal font-bold text-xs uppercase tracking-widest rounded-xl shadow-xl transition active:scale-95"
              >
                Accept Starlight Invitation
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
