import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Smartphone, 
  Music, 
  CheckCircle, 
  QrCode, 
  Users, 
  Layers, 
  ShieldCheck, 
  DollarSign, 
  Globe,
  Sliders,
  Play
} from 'lucide-react';
import { weddingAudio } from '../audio/WeddingAudioEngine';

export default function Hero({ activeTheme, onStartCustomizing, onOpenPreview, onOpenPricing, onOpenLeadModal }) {
  const handlePlayMusic = () => {
    weddingAudio.init();
    weddingAudio.startMusic('raga');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* Dynamic Ambient Background Glows */}
      <div className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] ${activeTheme.glow1} rounded-full blur-[140px] pointer-events-none -z-10`} />
      <div className={`absolute top-60 right-10 w-[450px] h-[450px] ${activeTheme.glow2} rounded-full blur-[120px] pointer-events-none -z-10`} />

      <div className="max-w-6xl mx-auto text-center space-y-8">
        
        {/* Top High-Value Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-md text-amber-300 text-xs font-semibold uppercase tracking-widest animate-pulse">
          <Sparkles size={14} className="text-amber-400" />
          <span>Next-Gen Luxury Wedding Portals & Interactive RSVP SaaS</span>
        </div>

        {/* Grand Headline */}
        <h1 className="font-royal text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Transform Your Wedding Invitation Into An{' '}
          <span className={`bg-gradient-to-r ${activeTheme.headerGrad} bg-clip-text text-transparent italic font-serif`}>
            Unforgettable Digital Experience
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans">
          Ditch static PDF cards. Deliver high-fidelity orchestral audio, live GPS navigation, instant multi-event RSVP tracking, and bespoke luxury aesthetics crafted for modern royalty.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onStartCustomizing}
            className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all transform hover:-translate-y-0.5 active:scale-95 ${activeTheme.btnPrimary}`}
          >
            <Sliders size={18} />
            <span>Launch Live Customizer Studio</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onOpenPreview}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all ${activeTheme.btnSecondary}`}
          >
            <Smartphone size={18} className="text-amber-400" />
            <span>View Live Mobile Invitation</span>
          </button>

          <button
            onClick={handlePlayMusic}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-black/40 hover:bg-black/60 text-stone-300 border border-white/15 transition-all"
          >
            <Play size={16} className="text-amber-400" />
            <span>Play Wedding Raga</span>
          </button>
        </div>

        {/* Key Commercial Proof & Metrics Bar */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="font-royal text-2xl sm:text-3xl font-bold text-amber-300">99.4%</div>
            <p className="text-xs text-stone-400 mt-1">Instant RSVP Response Rate</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="font-royal text-2xl sm:text-3xl font-bold text-amber-300">100%</div>
            <p className="text-xs text-stone-400 mt-1">Zero-Fail Web Audio Synthesizer</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="font-royal text-2xl sm:text-3xl font-bold text-amber-300">₹0 Waste</div>
            <p className="text-xs text-stone-400 mt-1">Eco-Friendly & Paperless</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="font-royal text-2xl sm:text-3xl font-bold text-amber-300">1-Click</div>
            <p className="text-xs text-stone-400 mt-1">WhatsApp & QR Distribution</p>
          </div>
        </div>

      </div>

      {/* Feature Highlights Grid */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="text-center mb-12">
          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white">
            Why High-Profile Couples & Planners Choose Inverto
          </h2>
          <p className="text-sm text-stone-400 mt-2">
            Every feature engineered to eliminate guest coordination headaches and create breathtaking memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className={`p-6 rounded-2xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} transition-all hover:scale-[1.02] shadow-xl`}>
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-4">
              <Music size={24} />
            </div>
            <h3 className="font-royal text-lg font-bold text-white mb-2">
              Polyphonic Web Audio Synthesizer
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              No broken MP3 links or CORS errors. Live acoustic synthesis for Indian Ragas (Sitar & Shehnai), Royal Canon Chimes, Romantic Piano & Festive Dhol.
            </p>
          </div>

          {/* Card 2 */}
          <div className={`p-6 rounded-2xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} transition-all hover:scale-[1.02] shadow-xl`}>
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="font-royal text-lg font-bold text-white mb-2">
              Automated RSVP & Headcount CRM
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Real-time headcount tracking, dietary requirement filtering (Jain, Vegan, Gluten-Free), song requests, and 1-click CSV spreadsheet export for your caterers.
            </p>
          </div>

          {/* Card 3 */}
          <div className={`p-6 rounded-2xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} transition-all hover:scale-[1.02] shadow-xl`}>
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-4">
              <QrCode size={24} />
            </div>
            <h3 className="font-royal text-lg font-bold text-white mb-2">
              Printable QR & WhatsApp Blaster
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Generate crisp high-res QR codes for physical wedding sweet boxes and automate bulk WhatsApp invitations with personalized guest names.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
