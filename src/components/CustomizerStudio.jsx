import React, { useState } from 'react';
import { 
  Sliders, 
  Save, 
  Sparkles, 
  Plus, 
  Trash2, 
  Calendar, 
  MapPin, 
  Music, 
  Palette, 
  Check, 
  Smartphone, 
  QrCode, 
  Share2,
  HelpCircle,
  Clock
} from 'lucide-react';
import { THEMES } from '../data/themes';
import { weddingAudio } from '../audio/WeddingAudioEngine';
import { apiService } from '../services/api';
import MobileMockup from './MobileMockup';

export default function CustomizerStudio({ 
  invitation, 
  setInvitation, 
  currentThemeKey, 
  setThemeKey, 
  onOpenRsvp, 
  onOpenQr 
}) {
  const [activeTab, setActiveTab] = useState('couple'); // 'couple' | 'events' | 'venue' | 'theme' | 'music'
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const activeTheme = THEMES[currentThemeKey] || THEMES.emerald;

  const handleCoupleChange = (field, value) => {
    setInvitation(prev => ({
      ...prev,
      couple: { ...prev.couple, [field]: value }
    }));
  };

  const handleVenueChange = (field, value) => {
    setInvitation(prev => ({
      ...prev,
      venue: { ...prev.venue, [field]: value }
    }));
  };

  const handleEventChange = (index, field, value) => {
    const updated = [...invitation.events];
    updated[index] = { ...updated[index], [field]: value };
    setInvitation(prev => ({ ...prev, events: updated }));
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: `e-${Date.now()}`,
      title: "Cocktail & Afterparty",
      date: "Nov 28, 2026",
      time: "10:30 PM onwards",
      venue: "Moonlight Lounge",
      dressCode: "Glamorous & Chic",
      desc: "Midnight dancing, DJ beats and celebratory signature cocktails."
    };
    setInvitation(prev => ({
      ...prev,
      events: [...prev.events, newEvent]
    }));
    weddingAudio.playButtonClick();
  };

  const handleDeleteEvent = (index) => {
    if (invitation.events.length <= 1) {
      alert("At least one wedding event is required.");
      return;
    }
    const updated = invitation.events.filter((_, i) => i !== index);
    setInvitation(prev => ({ ...prev, events: updated }));
    weddingAudio.playButtonClick();
  };

  const handleSaveToBackend = async () => {
    setSaving(true);
    weddingAudio.playButtonClick();
    try {
      const payload = {
        ...invitation,
        themeId: currentThemeKey
      };
      await apiService.saveInvitation(payload);
      setSaveSuccess(true);
      weddingAudio.playFanfare();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-2">
            <Sliders size={13} />
            <span>Interactive Live Invitation Builder</span>
          </div>
          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white">
            Customizer Studio
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Real-time live synchronized preview. Edit names, dates, ceremonies, and visual themes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenQr}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-stone-200 border border-white/15 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <QrCode size={14} className="text-amber-400" />
            <span>Printable QR</span>
          </button>

          <button
            onClick={handleSaveToBackend}
            disabled={saving}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition active:scale-95 shadow-lg ${
              saveSuccess 
                ? 'bg-emerald-500 text-slate-950 font-extrabold'
                : activeTheme.btnPrimary
            }`}
          >
            {saving ? (
              <span>Publishing...</span>
            ) : saveSuccess ? (
              <>
                <Check size={16} />
                <span>Published Live!</span>
              </>
            ) : (
              <>
                <Save size={15} />
                <span>Save &amp; Publish Portal</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Left Controls & Right Live Mobile Device */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Customizer Category Tabs */}
          <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10 text-xs overflow-x-auto">
            {[
              { id: 'couple', label: '💑 Couple & Story' },
              { id: 'theme', label: '🎨 Luxury Themes' },
              { id: 'events', label: '📅 Multi-Events' },
              { id: 'venue', label: '📍 Venue & Map' },
              { id: 'music', label: '🎵 Audio & Music' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  weddingAudio.playButtonClick();
                  setActiveTab(tab.id);
                }}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30 shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: COUPLE & STORY */}
          {activeTab === 'couple' && (
            <div className={`p-6 rounded-3xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} space-y-4 shadow-xl`}>
              <h3 className="font-royal text-base font-bold text-white flex items-center gap-2">
                <span>Couple Profiles &amp; Tagline</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Bride's Full Name</label>
                  <input
                    type="text"
                    value={invitation.couple.bride}
                    onChange={(e) => handleCoupleChange('bride', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    placeholder="e.g. Ananya Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Groom's Full Name</label>
                  <input
                    type="text"
                    value={invitation.couple.groom}
                    onChange={(e) => handleCoupleChange('groom', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    placeholder="e.g. Kabir Singhania"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Official Wedding Hashtag</label>
                  <input
                    type="text"
                    value={invitation.couple.hashtag}
                    onChange={(e) => handleCoupleChange('hashtag', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
                    placeholder="e.g. #AnanyaFoundHerKabir"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Wedding Date (For Countdown)</label>
                  <input
                    type="date"
                    value={invitation.weddingDate}
                    onChange={(e) => setInvitation(prev => ({ ...prev, weddingDate: e.target.value }))}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Invitation Quote / Tagline</label>
                <input
                  type="text"
                  value={invitation.couple.quote}
                  onChange={(e) => handleCoupleChange('quote', e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Couple's Love Story</label>
                <textarea
                  rows={3}
                  value={invitation.couple.story}
                  onChange={(e) => handleCoupleChange('story', e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: THEMES */}
          {activeTab === 'theme' && (
            <div className={`p-6 rounded-3xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} space-y-4 shadow-xl`}>
              <h3 className="font-royal text-base font-bold text-white">
                Choose Aesthetic Theme &amp; Color Palette
              </h3>
              <p className="text-xs text-stone-300">
                Instantly transforms the entire portal typography, buttons, gold foils, background ambience, and card finishes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {Object.entries(THEMES).map(([key, theme]) => {
                  const isSelected = currentThemeKey === key;
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        weddingAudio.playButtonClick();
                        setThemeKey(key);
                      }}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                        isSelected 
                          ? 'border-amber-400 bg-amber-400/10 shadow-lg scale-[1.02]' 
                          : 'border-white/10 hover:border-white/30 bg-black/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-white/40 shadow-sm"
                          style={{ backgroundColor: theme.dotColor }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-white truncate">{theme.name}</h4>
                          <p className="text-[10px] text-stone-400 truncate">{theme.tagline}</p>
                        </div>
                        {isSelected && <span className="text-amber-400 text-sm font-bold">✓</span>}
                      </div>

                      {/* Mini preview bar */}
                      <div className="h-2 rounded-full overflow-hidden flex">
                        <div className="w-1/3 bg-[#D4AF37]"></div>
                        <div className="w-1/3 bg-slate-900"></div>
                        <div className="w-1/3 bg-emerald-900"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: EVENTS */}
          {activeTab === 'events' && (
            <div className={`p-6 rounded-3xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} space-y-4 shadow-xl`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-royal text-base font-bold text-white">
                    Multi-Event Ceremonies ({invitation.events.length})
                  </h3>
                  <p className="text-xs text-stone-400">Haldi, Mehendi, Sangeet, Muhurtham, Reception</p>
                </div>
                <button
                  onClick={handleAddEvent}
                  className="px-3 py-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 rounded-xl text-xs font-bold flex items-center gap-1 transition"
                >
                  <Plus size={14} />
                  <span>Add Ceremony</span>
                </button>
              </div>

              <div className="space-y-4">
                {invitation.events.map((evt, idx) => (
                  <div key={evt.id || idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative group">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                        Ceremony #{idx + 1}
                      </span>
                      <button
                        onClick={() => handleDeleteEvent(idx)}
                        className="text-stone-500 hover:text-red-400 transition p-1"
                        title="Delete Event"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-300 mb-1">Event Title</label>
                        <input
                          type="text"
                          value={evt.title}
                          onChange={(e) => handleEventChange(idx, 'title', e.target.value)}
                          className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-300 mb-1">Date &amp; Time</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={evt.date}
                            onChange={(e) => handleEventChange(idx, 'date', e.target.value)}
                            className="w-full bg-black/60 border border-white/15 rounded-lg px-2.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                            placeholder="Nov 27"
                          />
                          <input
                            type="text"
                            value={evt.time}
                            onChange={(e) => handleEventChange(idx, 'time', e.target.value)}
                            className="w-full bg-black/60 border border-white/15 rounded-lg px-2.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                            placeholder="7:00 PM"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-300 mb-1">Venue Location</label>
                        <input
                          type="text"
                          value={evt.venue}
                          onChange={(e) => handleEventChange(idx, 'venue', e.target.value)}
                          className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-300 mb-1">Dress Code Recommendation</label>
                        <input
                          type="text"
                          value={evt.dressCode}
                          onChange={(e) => handleEventChange(idx, 'dressCode', e.target.value)}
                          className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                          placeholder="e.g. Royal Lehengas & Tuxedos"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: VENUE */}
          {activeTab === 'venue' && (
            <div className={`p-6 rounded-3xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} space-y-4 shadow-xl`}>
              <h3 className="font-royal text-base font-bold text-white">
                Destination Venue &amp; Navigation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Venue Palace / Hotel Name</label>
                  <input
                    type="text"
                    value={invitation.venue.name}
                    onChange={(e) => handleVenueChange('name', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">City / Region</label>
                  <input
                    type="text"
                    value={invitation.venue.city}
                    onChange={(e) => handleVenueChange('city', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Full Postal Address</label>
                <input
                  type="text"
                  value={invitation.venue.address}
                  onChange={(e) => handleVenueChange('address', e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Google Maps Direct Navigation URL</label>
                <input
                  type="text"
                  value={invitation.venue.mapLink}
                  onChange={(e) => handleVenueChange('mapLink', e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 5: MUSIC */}
          {activeTab === 'music' && (
            <div className={`p-6 rounded-3xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} space-y-4 shadow-xl`}>
              <h3 className="font-royal text-base font-bold text-white">
                Web Audio Synthesizer Soundtrack
              </h3>
              <p className="text-xs text-stone-300">
                Select the ambient synthesizer melody that automatically welcomes guests when they unseal the digital invitation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { id: 'raga', label: '🪕 Sitar & Shehnai Raga', desc: 'Raag Yaman traditional royal wedding raga' },
                  { id: 'chimes', label: '🔔 Royal Palace Canon Chimes', desc: 'Pachelbel Canon in D harmony' },
                  { id: 'piano', label: '🎹 Romantic Piano Arpeggios', desc: 'Modern acoustic love ballade' },
                  { id: 'dhol', label: '🥁 Festive Dhol Beats', desc: 'High-energy celebration & sangeet rhythm' }
                ].map((track) => (
                  <div
                    key={track.id}
                    onClick={() => {
                      setInvitation(prev => ({ ...prev, musicTrack: track.id }));
                      weddingAudio.init();
                      weddingAudio.setTrack(track.id);
                      weddingAudio.startMusic(track.id);
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      invitation.musicTrack === track.id
                        ? 'border-amber-400 bg-amber-400/15 shadow-md'
                        : 'border-white/10 hover:border-white/25 bg-black/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-xs text-white">{track.label}</h4>
                      {invitation.musicTrack === track.id && <span className="text-amber-400 text-xs font-bold">▶ Active</span>}
                    </div>
                    <p className="text-[10px] text-stone-400">{track.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Live Synchronized Device (5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="text-center mb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">
              Live Synchronized Mobile Viewport
            </span>
          </div>
          <MobileMockup 
            invitation={invitation}
            activeTheme={activeTheme}
            onOpenRsvp={onOpenRsvp}
            onOpenQr={onOpenQr}
          />
        </div>

      </div>

    </div>
  );
}
