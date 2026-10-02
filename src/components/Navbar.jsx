import React from 'react';
import { 
  Sparkles, 
  Film, 
  Layers, 
  CreditCard, 
  LayoutDashboard, 
  MessageCircle,
  Home
} from 'lucide-react';
import { weddingAudio } from '../audio/WeddingAudioEngine';

export default function Navbar({ activeTab, setActiveTab, onOpenLeadModal }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'showcase', label: 'Portals', fullLabel: 'Wedding Portals', icon: Layers, badge: '6' },
    { id: 'reels', label: 'Reels', fullLabel: '9:16 Video Reels', icon: Film, badge: 'Status' },
    { id: 'pricing', label: 'Pricing', fullLabel: 'Pricing & Packages', icon: CreditCard },
    { id: 'dashboard', label: 'RSVP', fullLabel: 'RSVP Portal', icon: LayoutDashboard }
  ];

  return (
    <>
      <header className="border-b border-[#E2CEAB] bg-[#FAF6F0]/95 backdrop-blur-md sticky top-0 z-40 shadow-sm transition-all">
        
        {/* Top Auspicious Micro-Bar */}
        <div className="bg-[#4A0F1E] text-[#E2C475] py-1 px-3 text-center text-[9px] sm:text-[11px] font-royal tracking-wider sm:tracking-widest uppercase border-b border-[#C59B4E]/30 flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span>॥ श्री गणेशाय नमः ॥</span>
          <span className="hidden sm:inline text-[#C59B4E]">•</span>
          <span className="hidden sm:inline">KUSH INVITATIONS • YOUR STORY ♦ OUR DESIGN</span>
          <span className="text-[#C59B4E]">•</span>
          <span className="truncate">ROYAL DIGITAL WEDDING PORTALS &amp; 9:16 REELS</span>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo & Title with User's Uploaded Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl overflow-hidden border-2 border-[#C59B4E] shadow-md shadow-[#6B1D2F]/15 group-hover:scale-105 transition-transform bg-white shrink-0">
              <img 
                src="/kush-logo.jpg" 
                alt="Kush Invitations Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-royal text-base sm:text-xl md:text-2xl font-black tracking-wider text-[#4A0F1E]">
                  KUSH
                </span>
                <span className="font-cormorant text-[11px] sm:text-xs md:text-sm font-bold tracking-widest text-[#C59B4E] uppercase">
                  INVITATIONS
                </span>
                <span className="hidden lg:inline text-[9px] bg-[#FAF2E6] text-[#6B1D2F] border border-[#E2CEAB] px-2 py-0.5 rounded-full font-royal font-bold tracking-widest uppercase">
                  HAUTE COUTURE
                </span>
              </div>
              <p className="text-[8px] sm:text-[10px] text-[#7A263B] font-royal tracking-wider sm:tracking-widest uppercase flex items-center gap-1 font-semibold">
                <span>YOUR STORY</span>
                <span className="text-[#C59B4E]">♦</span>
                <span>OUR DESIGN</span>
              </p>
            </div>
          </div>

          {/* Tablet & Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-[#FAF2E6] p-1 rounded-full border border-[#E2CEAB] text-xs shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    weddingAudio.playButtonClick();
                    setActiveTab(item.id);
                  }}
                  className={`relative flex items-center gap-1 px-2.5 lg:px-3.5 py-1.5 lg:py-2 rounded-full font-royal font-bold text-[11px] lg:text-xs transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#6B1D2F] to-[#4A0F1E] text-[#FAF6F0] shadow-md shadow-[#6B1D2F]/20'
                      : 'text-[#4A0F1E] hover:text-[#6B1D2F] hover:bg-white/60'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-[#C59B4E]' : 'text-[#7A263B]'} />
                  <span>{item.fullLabel || item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-[#C59B4E] text-[#2C0812]' : 'bg-[#E2CEAB]/50 text-[#6B1D2F]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: WhatsApp Inquiry */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenLeadModal}
              className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 md:px-5 py-2 bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] hover:from-[#541221] hover:to-[#2C0812] text-[#FAF6F0] rounded-full text-xs font-royal font-bold shadow-md shadow-[#6B1D2F]/20 border border-[#C59B4E]/40 transition active:scale-95 group"
            >
              <MessageCircle size={14} className="text-[#C59B4E] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Book Custom Portal</span>
              <span className="sm:hidden">Book</span>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile App-like Bottom Navigation Bar (Phones only < 768px) */}
      <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E2CEAB] py-1 px-2 shadow-2xl flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                weddingAudio.playButtonClick();
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition min-w-[56px] ${
                isActive ? 'text-[#6B1D2F] font-bold bg-[#FAF2E6] border border-[#E2CEAB]/60' : 'text-[#7A263B]'
              }`}
            >
              <div className="relative">
                <Icon size={18} className={isActive ? 'text-[#6B1D2F]' : 'text-[#7A263B]'} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#C59B4E] text-[#1E050C] rounded-full text-[8px] font-mono font-bold flex items-center justify-center">
                    {item.badge[0]}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-royal mt-0.5 leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
