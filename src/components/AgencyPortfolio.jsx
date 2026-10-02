import React from 'react';
import { Sparkles, ArrowRight, Music, MapPin, Eye, Check } from 'lucide-react';
import { SAMPLE_PORTFOLIO_CARDS } from '../data/sampleData';
import { weddingAudio } from '../audio/WeddingAudioEngine';

export default function AgencyPortfolio({ activeTheme, onSelectSample, onOpenPreview }) {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono">
          <Sparkles size={13} />
          <span>Curated Architectural Portfolio</span>
        </div>
        <h2 className="font-royal text-3xl sm:text-4xl font-bold text-white">
          Explore Real Destination Wedding Portals
        </h2>
        <p className="text-xs sm:text-sm text-stone-400">
          Each bespoke portal combines tailored typography, rich Web Audio scores, and high-converting guest hospitality features.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SAMPLE_PORTFOLIO_CARDS.map((item) => (
          <div
            key={item.id}
            className={`group rounded-3xl overflow-hidden ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5`}
          >
            {/* Image Header */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <span className="absolute top-3 left-3 text-[10px] bg-black/60 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full font-mono border border-white/10">
                {item.category}
              </span>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="flex items-center gap-1 text-[10px] text-stone-300">
                  <MapPin size={11} className="text-amber-400" />
                  <span>{item.location}</span>
                </div>
                <h3 className="font-royal font-bold text-base leading-tight mt-0.5">{item.couple}</h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-stone-200">{item.title}</p>
                <div className="space-y-1">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] text-stone-400">
                      <span className="text-amber-400 text-xs">✦</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    weddingAudio.playButtonClick();
                    onSelectSample(item.themeId);
                    onOpenPreview();
                  }}
                  className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${activeTheme.btnPrimary}`}
                >
                  <Eye size={13} />
                  <span>Explore Live Portal</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
