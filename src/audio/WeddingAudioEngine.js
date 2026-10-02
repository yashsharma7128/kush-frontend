/**
 * WeddingAudioEngine - Hybrid Web Audio Synthesizer + Bollywood Audio Player
 * Plays real Bollywood wedding instrumentals with zero-fail Web Audio synthesis backup.
 */

import { BOLLYWOOD_WEDDING_TRACKS } from '../data/audioTracks';

class WeddingAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.currentTrack = 'raga'; // or Bollywood track ID
    this.volume = 0.5;
    this.timer = null;
    this.stepIndex = 0;
    this.onStateChange = null;
    this.htmlAudio = null;
    this.isUsingRealAudio = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(e => console.error('AudioContext resume failed:', e));
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.htmlAudio) {
      this.htmlAudio.volume = this.volume;
    }
  }

  // --- SAFE OSCILLATOR HELPER ---
  playTone(freq, type = 'sine', duration = 0.5, delay = 0, gainLevel = 0.2, detune = 0) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      const startTime = this.ctx.currentTime + delay;
      const stopTime = startTime + duration;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);
      if (detune) osc.detune.setValueAtTime(detune, startTime);

      // Safe exponential ramp
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(stopTime);
    } catch (e) {
      console.warn('Tone error:', e);
    }
  }

  // --- SOUND EFFECTS (SFX) ---
  playChimeBell() {
    this.init();
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    freqs.forEach((f, i) => {
      this.playTone(f, 'sine', 1.2, i * 0.08, 0.15);
      this.playTone(f * 2, 'triangle', 0.8, i * 0.08 + 0.02, 0.05);
    });
  }

  playEnvelopeOpen() {
    this.init();
    const chord = [329.63, 392.00, 493.88, 587.33, 783.99];
    chord.forEach((f, i) => {
      this.playTone(f, 'sine', 0.9, i * 0.06, 0.12);
    });
  }

  playSlideTick() {
    this.init();
    this.playTone(1100, 'sine', 0.06, 0, 0.09);
    this.playTone(880, 'triangle', 0.05, 0.02, 0.06);
  }

  playButtonClick() {
    this.init();
    this.playTone(880, 'triangle', 0.06, 0, 0.08);
  }

  playFanfare() {
    this.init();
    const notes = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 659.25, d: 0.15, t: 0.15 },
      { f: 783.99, d: 0.25, t: 0.30 },
      { f: 1046.50, d: 0.6, t: 0.50 },
      { f: 1318.51, d: 0.8, t: 0.65 }
    ];
    notes.forEach(n => {
      this.playTone(n.f, 'triangle', n.d, n.t, 0.2);
      this.playTone(n.f * 1.5, 'sine', n.d * 0.8, n.t, 0.08);
    });
  }

  // --- MUSIC PLAYBACK (HYBRID STREAMING + SYNTHESIS) ---
  startMusic(trackId = null) {
    this.init();
    if (trackId) {
      this.currentTrack = trackId;
    }

    // Stop existing audio
    this.stopMusic(false);
    this.isPlaying = true;

    // Check if it matches a curated Bollywood track with audioUrl
    const bTrack = BOLLYWOOD_WEDDING_TRACKS.find(t => t.id === this.currentTrack);

    if (bTrack && bTrack.audioUrl) {
      try {
        if (!this.htmlAudio) {
          this.htmlAudio = new Audio();
          this.htmlAudio.loop = true;
        }
        this.htmlAudio.src = bTrack.audioUrl;
        this.htmlAudio.volume = this.volume;
        this.htmlAudio.play()
          .then(() => {
            this.isUsingRealAudio = true;
            if (this.onStateChange) this.onStateChange(true, this.currentTrack);
          })
          .catch((err) => {
            console.warn('HTML Audio playback failed, falling back to Web Audio synthesis:', err);
            this.startSynthesizedTrack(bTrack.synthTrack || 'raga');
          });
        return;
      } catch (e) {
        console.warn('Audio streaming error, falling back:', e);
      }
    }

    // Default or Fallback to Web Audio synthesis
    this.startSynthesizedTrack(this.currentTrack);
  }

  startSynthesizedTrack(synthName) {
    this.isUsingRealAudio = false;
    this.stepIndex = 0;
    this.scheduleNextLoop(synthName);
    if (this.onStateChange) this.onStateChange(true, this.currentTrack);
  }

  stopMusic(notify = true) {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.htmlAudio) {
      this.htmlAudio.pause();
    }
    if (notify && this.onStateChange) {
      this.onStateChange(false, this.currentTrack);
    }
  }

  toggleMusic(trackId = null) {
    if (this.isPlaying) {
      this.stopMusic();
    } else {
      this.startMusic(trackId || this.currentTrack);
    }
    return this.isPlaying;
  }

  setTrack(trackId) {
    this.currentTrack = trackId;
    if (this.isPlaying) {
      this.startMusic(trackId);
    } else if (this.onStateChange) {
      this.onStateChange(this.isPlaying, this.currentTrack);
    }
  }

  scheduleNextLoop(overrideSynth = null) {
    if (!this.isPlaying) return;

    const track = overrideSynth || this.currentTrack;

    if (track === 'raga' || track === 'din_shagna_da' || track === 'royal_mangalyam') {
      this.playRagaStep();
    } else if (track === 'chimes' || track === 'madhanya_flute') {
      this.playChimesStep();
    } else if (track === 'piano' || track === 'kudmayi_romance') {
      this.playPianoStep();
    } else if (track === 'dhol' || track === 'sangeet_dhol') {
      this.playDholStep();
    } else {
      this.playRagaStep();
    }
  }

  // 1. Traditional Sitar & Shehnai Raga (Yaman / Bhairavi Scale)
  playRagaStep() {
    const melody = [
      { f: 277.18, dur: 0.8, type: 'triangle' }, // Sa
      { f: 349.23, dur: 0.6, type: 'sine' },     // Ga
      { f: 392.00, dur: 0.7, type: 'triangle' }, // Ma#
      { f: 415.30, dur: 0.9, type: 'sine' },     // Pa
      { f: 466.16, dur: 0.5, type: 'triangle' }, // Dha
      { f: 523.25, dur: 0.7, type: 'sine' },     // Ni
      { f: 554.37, dur: 1.2, type: 'triangle' }, // Sa'
      { f: 523.25, dur: 0.6, type: 'sine' },
      { f: 466.16, dur: 0.6, type: 'triangle' },
      { f: 415.30, dur: 0.8, type: 'sine' },
      { f: 349.23, dur: 0.7, type: 'triangle' },
      { f: 311.13, dur: 0.6, type: 'sine' },
      { f: 277.18, dur: 1.4, type: 'triangle' }
    ];

    if (this.stepIndex % 4 === 0) {
      this.playTone(138.59, 'sine', 2.5, 0, 0.08);
      this.playTone(207.65, 'sine', 2.2, 0.1, 0.06);
      this.playTone(277.18, 'triangle', 2.0, 0.2, 0.05);
    }

    const note = melody[this.stepIndex % melody.length];
    this.playTone(note.f, note.type, note.dur, 0, 0.18);
    this.playTone(note.f * 1.5, 'sine', note.dur * 0.7, 0.05, 0.04);

    this.stepIndex = (this.stepIndex + 1) % melody.length;
    this.timer = setTimeout(() => {
      this.scheduleNextLoop();
    }, 450);
  }

  // 2. Royal Palace Canon Chimes
  playChimesStep() {
    const progression = [
      [261.63, 329.63, 392.00],
      [196.00, 246.94, 293.66],
      [220.00, 261.63, 329.63],
      [164.81, 196.00, 246.94],
      [174.61, 220.00, 261.63],
      [130.81, 164.81, 196.00],
      [174.61, 220.00, 261.63],
      [196.00, 246.94, 293.66]
    ];

    const currentChord = progression[this.stepIndex % progression.length];
    currentChord.forEach((f, idx) => {
      this.playTone(f * 2, 'sine', 1.6, idx * 0.12, 0.12);
      this.playTone(f * 4, 'triangle', 1.0, idx * 0.12 + 0.04, 0.04);
    });

    this.stepIndex = (this.stepIndex + 1) % progression.length;
    this.timer = setTimeout(() => {
      this.scheduleNextLoop();
    }, 900);
  }

  // 3. Romantic Acoustic Piano
  playPianoStep() {
    const arpeggio = [
      523.25, 659.25, 783.99, 1046.50,
      440.00, 523.25, 659.25, 880.00,
      349.23, 440.00, 523.25, 698.46,
      392.00, 493.88, 587.33, 783.99
    ];

    const note = arpeggio[this.stepIndex % arpeggio.length];
    this.playTone(note, 'triangle', 0.7, 0, 0.16);
    this.playTone(note * 0.5, 'sine', 0.9, 0, 0.1);

    this.stepIndex = (this.stepIndex + 1) % arpeggio.length;
    this.timer = setTimeout(() => {
      this.scheduleNextLoop();
    }, 280);
  }

  // 4. Festive Dhol Beats
  playDholStep() {
    const isHeavyBeat = this.stepIndex % 4 === 0;
    const isSnareTap = this.stepIndex % 2 === 1;

    if (isHeavyBeat) {
      this.playTone(85, 'sine', 0.35, 0, 0.35);
      this.playTone(110, 'triangle', 0.25, 0.02, 0.2);
    }

    if (isSnareTap) {
      this.playTone(480, 'square', 0.08, 0, 0.08);
      this.playTone(620, 'triangle', 0.06, 0.02, 0.06);
    }

    const festiveMelody = [440, 493.88, 554.37, 659.25];
    const melNote = festiveMelody[this.stepIndex % festiveMelody.length];
    this.playTone(melNote, 'sine', 0.2, 0.05, 0.09);

    this.stepIndex = (this.stepIndex + 1) % 16;
    this.timer = setTimeout(() => {
      this.scheduleNextLoop();
    }, 220);
  }
}

export const weddingAudio = new WeddingAudioEngine();
export default weddingAudio;
