import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Bell, Play, Pause, Sparkles } from 'lucide-react';
import { weddingAudio } from '../audio/WeddingAudioEngine';
import { BOLLYWOOD_WEDDING_TRACKS } from '../data/audioTracks';

export default function AudioBar({ activeTheme }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('din_shagna_da');
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    weddingAudio.onStateChange = (playing, track) => {
      setIsPlaying(playing);
      setCurrentTrack(track);
    };

    const handleFirstGesture = () => {
      weddingAudio.init();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const handleToggle = () => {
    weddingAudio.init();
    const playing = weddingAudio.toggleMusic(currentTrack);
    setIsPlaying(playing);
  };

  const handleTrackChange = (trackId) => {
    weddingAudio.init();
    setCurrentTrack(trackId);
    weddingAudio.setTrack(trackId);
    if (!isPlaying) {
      weddingAudio.startMusic(trackId);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    weddingAudio.setVolume(val);
  };

  const handleTestChime = () => {
    weddingAudio.playChimeBell();
  };

  return (
    <aside aria-label="Audio Controls" className="sticky top-0 z-50 bg-[#080B12]/95 backdrop-blur-md border-b border-amber-400/25 px-3 sm:px-6 py-2 shadow-2xl transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Main Audio Button & Equalizer */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs transition-all shadow-lg active:scale-95 ${
              isPlaying
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 ring-2 ring-emerald-300'
                : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 ring-2 ring-amber-300 animate-pulse'
            }`}
            title="Play / Pause Bollywood Wedding Soundtrack"
          >
            {isPlaying ? <Volume2 size={16} className="animate-bounce" /> : <Play size={16} />}
            <span className="tracking-wide">
              {isPlaying ? 'PLAYING WEDDING MUSIC' : 'TAP TO PLAY WEDDING MUSIC'}
            </span>

            {/* Equalizer animation */}
            <div className={`flex gap-1 items-end h-3.5 ml-1 ${isPlaying ? 'flex' : 'hidden'}`}>
              <span className="w-1 bg-black animate-sound-bar-1 rounded-full"></span>
              <span className="w-1 bg-black animate-sound-bar-2 rounded-full"></span>
              <span className="w-1 bg-black animate-sound-bar-3 rounded-full"></span>
            </div>
          </button>

          {/* Test Chime */}
          <button
            onClick={handleTestChime}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-stone-200 rounded-lg text-[11px] border border-white/15 transition active:scale-95"
            title="Instant bell chime test"
          >
            <Bell size={13} className="text-amber-300" />
            <span>Test Chime</span>
          </button>
        </div>

        {/* Center/Right: Bollywood Wedding Soundtrack Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-black/60 p-1 rounded-lg border border-white/10 text-[11px] gap-1 overflow-x-auto max-w-[500px]">
            <span className="text-stone-400 px-1 hidden md:inline text-[10px] uppercase font-mono tracking-wider">Soundtrack:</span>
            {BOLLYWOOD_WEDDING_TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTrackChange(t.id)}
                className={`px-2 py-1 rounded transition text-[11px] whitespace-nowrap flex items-center gap-1 ${
                  currentTrack === t.id
                    ? 'bg-amber-400/30 text-amber-300 font-bold border border-amber-400/40 shadow-sm'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.title.split(' ')[0]} {t.title.split(' ')[1]}</span>
              </button>
            ))}
          </div>

          {/* Volume Slider */}
          <div className="hidden lg:flex items-center gap-1.5 bg-black/50 px-2.5 py-1.5 rounded-lg border border-white/10 text-[10px]">
            <Volume2 size={12} className="text-stone-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 accent-amber-400 cursor-pointer"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
            <span className="text-stone-400 font-mono text-[9px] w-6">{Math.round(volume * 100)}%</span>
          </div>
        </div>

      </div>
    </aside>
  );
}
