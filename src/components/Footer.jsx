import React from 'react';
import { 
  Phone, 
  Mail, 
  Instagram, 
  Star, 
  CreditCard, 
  Smartphone, 
  Clock, 
  MapPin, 
  MessageCircle, 
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { weddingAudio } from '../audio/WeddingAudioEngine';

export default function Footer({ onNavigate, onOpenLeadModal, onBookWhatsApp }) {
  const handleNav = (tabId) => {
    weddingAudio.playButtonClick();
    onNavigate(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 sm:mt-20 border-t border-[#E2CEAB] bg-[#1E050C] text-[#FAF6F0] selection:bg-[#C59B4E] selection:text-[#1E050C] pb-20 md:pb-8">
      
      {/* 1. TOP CTA PRE-FOOTER BANNER (Matching reference design) */}
      <div className="bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] border-b border-[#C59B4E]/30 py-10 sm:py-14 px-4 sm:px-8 text-center relative overflow-hidden">
        {/* Subtle decorative gold sparkles & arches */}
        <div className="hidden sm:block absolute top-2 left-6 text-[#C59B4E] opacity-25 text-3xl font-serif">❧</div>
        <div className="hidden sm:block absolute top-2 right-6 text-[#C59B4E] opacity-25 text-3xl font-serif">☙</div>

        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 relative z-10">
          <span className="text-[10px] sm:text-[11px] font-royal font-bold uppercase tracking-wider sm:tracking-widest text-[#E2C475] bg-[#2C0812]/80 px-3 sm:px-4 py-1 rounded-full border border-[#C59B4E]/40 inline-block">
            👑 Limited Time Royal Wedding Offer
          </span>

          <h2 className="font-royal text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight px-1">
            Ready for Your Royal Wedding Portal?
          </h2>

          <p className="text-xs sm:text-sm text-[#F5EFEB] font-cormorant text-base sm:text-xl max-w-2xl mx-auto px-2">
            Limited Time Festive Offer — Custom Personalized Domain, Live Shehnai Music &amp; 9:16 Video Reel Included Free with Every Package!
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
            <button
              onClick={() => onBookWhatsApp({ title: 'Kush Invitations Consultation' })}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#C59B4E] via-[#D4AF37] to-[#A37D2C] hover:from-[#E2C475] hover:to-[#C59B4E] text-[#1E050C] font-royal font-black text-xs uppercase tracking-widest rounded-full shadow-xl shadow-amber-950/40 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 border border-amber-200"
            >
              <MessageCircle size={16} />
              <span>Get Free Consultation</span>
            </button>

            <button
              onClick={onOpenLeadModal}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF6F0] font-royal font-bold text-xs uppercase tracking-wider rounded-full border border-[#C59B4E]/50 transition hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN 4-COLUMN FOOTER CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* COLUMN 1: Brand Logo, Tagline & Physical Address */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-[#C59B4E] bg-white shrink-0 shadow-md">
                <img src="/kush-logo.jpg" alt="Kush Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-royal text-base sm:text-lg font-black tracking-wider text-white">
                  KUSH INVITATIONS
                </h3>
                <p className="text-[10px] text-[#C59B4E] font-royal uppercase tracking-widest font-bold">
                  YOUR STORY ♦ OUR DESIGN
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-300 font-serif leading-relaxed">
              Bespoke royal digital wedding invitations, interactive 4K pre-wedding sagas, and 9:16 vertical video reels for couples celebrating across the globe.
            </p>

            <div className="space-y-1.5 pt-2 text-xs text-stone-300 font-serif border-t border-[#C59B4E]/20">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-[#C59B4E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white font-royal">Studio &amp; Design Atelier:</p>
                  <p>Suite 402, Royal Rajputana Palace Arcade,</p>
                  <p>Near Statue Circle, C-Scheme &amp; Civil Lines,</p>
                  <p>Jaipur, Rajasthan — 302001, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-4">
            <h4 className="font-royal text-xs uppercase tracking-widest text-[#E2C475] font-bold border-b border-[#C59B4E]/30 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-royal">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#E2C475] transition flex items-center gap-1.5 text-left">
                  <ArrowRight size={11} className="text-[#C59B4E]" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('showcase')} className="hover:text-[#E2C475] transition flex items-center gap-1.5 text-left">
                  <ArrowRight size={11} className="text-[#C59B4E]" />
                  <span>Wedding Portals</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('reels')} className="hover:text-[#E2C475] transition flex items-center gap-1.5 text-left">
                  <ArrowRight size={11} className="text-[#C59B4E]" />
                  <span>9:16 Video Reels</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-[#E2C475] transition flex items-center gap-1.5 text-left">
                  <ArrowRight size={11} className="text-[#C59B4E]" />
                  <span>Pricing &amp; Packages</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-[#E2C475] transition flex items-center gap-1.5 text-left">
                  <ArrowRight size={11} className="text-[#C59B4E]" />
                  <span>RSVP Portal</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenLeadModal} className="hover:text-[#E2C475] transition flex items-center gap-1.5 text-left">
                  <ArrowRight size={11} className="text-[#C59B4E]" />
                  <span>Book Consultation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Contact & Concierge */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-4">
            <h4 className="font-royal text-xs uppercase tracking-widest text-[#E2C475] font-bold border-b border-[#C59B4E]/30 pb-2">
              Contact &amp; Concierge
            </h4>

            <div className="space-y-2.5 text-xs text-stone-200">
              <a 
                href="https://api.whatsapp.com/send?phone=919829014567&text=Hello%20Kush%20Invitations"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#E2C475] transition"
              >
                <Phone size={14} className="text-[#C59B4E] shrink-0" />
                <span className="font-mono font-bold">+91 98290 14567</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-600/40 font-royal">WhatsApp</span>
              </a>

              <a 
                href="https://api.whatsapp.com/send?phone=919829089012&text=Hello%20Kush%20Invitations"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#E2C475] transition"
              >
                <Phone size={14} className="text-[#C59B4E] shrink-0" />
                <span className="font-mono font-bold">+91 98290 89012</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-600/40 font-royal">WhatsApp</span>
              </a>

              <a 
                href="mailto:concierge@kushinvitations.com"
                className="flex items-center gap-2 hover:text-[#E2C475] transition"
              >
                <Mail size={14} className="text-[#C59B4E] shrink-0" />
                <span className="font-mono text-[11px] truncate">concierge@kushinvitations.com</span>
              </a>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#E2C475] transition"
              >
                <Instagram size={14} className="text-[#C59B4E] shrink-0" />
                <span className="font-mono">@kushinvitations</span>
              </a>

              <div className="flex items-center gap-1.5 pt-1 text-[#E2C475] font-royal font-bold text-[11px]">
                <Star size={13} className="fill-[#E2C475] text-[#E2C475]" />
                <span>4.9 / 5.0 Rating (350+ Couples)</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Payment Methods & Turnaround */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h4 className="font-royal text-xs uppercase tracking-widest text-[#E2C475] font-bold border-b border-[#C59B4E]/30 pb-2">
              Payment Methods
            </h4>

            <div className="space-y-2.5">
              
              {/* Online Payment Card Box */}
              <div className="p-3 rounded-xl bg-white/5 border border-[#C59B4E]/40 flex items-center justify-between hover:bg-white/10 transition">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C59B4E]/20 text-[#E2C475] flex items-center justify-center shrink-0">
                    <CreditCard size={15} />
                  </div>
                  <div>
                    <p className="font-royal font-bold text-xs text-white">Online Cards</p>
                    <p className="text-[10px] text-stone-400">Debit, Credit &amp; Net Banking</p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  Instant
                </span>
              </div>

              {/* UPI Box */}
              <div className="p-3 rounded-xl bg-white/5 border border-[#C59B4E]/40 flex items-center justify-between hover:bg-white/10 transition">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C59B4E]/20 text-[#E2C475] flex items-center justify-center shrink-0">
                    <Smartphone size={15} />
                  </div>
                  <div>
                    <p className="font-royal font-bold text-xs text-white">UPI Payment</p>
                    <p className="text-[10px] text-stone-400">GPay • PhonePe • Paytm • BHIM</p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  0% Fee
                </span>
              </div>

              {/* Delivery Turnaround Box */}
              <div className="p-2.5 rounded-xl bg-[#2C0812] border border-[#C59B4E]/30 flex items-center gap-2 text-stone-300 text-[11px] font-royal">
                <Clock size={14} className="text-[#E2C475] shrink-0" />
                <span>Express Delivery: <strong>24 to 48 Hours</strong></span>
              </div>

            </div>
          </div>

        </div>

        {/* 3. SERVICE AREAS NOTICE */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#C59B4E]/20 space-y-2.5 text-[11px] font-serif text-stone-400">
          <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
            <span className="text-[#E2C475] font-royal font-bold uppercase tracking-wider shrink-0">
              📍 Local Service Areas:
            </span>
            <p className="leading-relaxed">
              <strong>Jaipur:</strong> C-Scheme, Civil Lines, Raja Park, Vaishali Nagar, Malviya Nagar, Mansarovar, Tonk Road, Bani Park, Jagatpura, Amer.
            </p>
          </div>
          <p className="leading-relaxed pl-2 sm:pl-4 border-l-2 border-[#C59B4E]/40">
            <strong>Destination Weddings Worldwide:</strong> Udaipur, Jodhpur, Delhi NCR, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai, Dubai (UAE), London (UK), New York (USA) &amp; Europe.
          </p>
        </div>

        {/* 4. COPYRIGHT & ATTRIBUTION BAR */}
        <div className="mt-8 pt-6 border-t border-[#C59B4E]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-royal text-stone-400 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-[#E2C475]">🪷</span>
            <span>&copy; 2026 Kush Invitations Luxury Studios. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px]">
            <span className="text-[#E2C475] font-bold">YOUR STORY ♦ OUR DESIGN</span>
            <span className="hidden sm:inline">•</span>
            <button onClick={() => handleNav('showcase')} className="hover:text-white">Portals</button>
            <span>•</span>
            <button onClick={() => handleNav('pricing')} className="hover:text-white">Pricing</button>
            <span>•</span>
            <button onClick={() => handleNav('dashboard')} className="hover:text-white">RSVP</button>
          </div>
        </div>

      </div>

    </footer>
  );
}
