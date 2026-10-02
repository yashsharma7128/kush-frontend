import React, { useEffect, useRef } from 'react';
import { X, Download, Printer, Share2, Sparkles } from 'lucide-react';
import QRCode from 'qrcode';
import { weddingAudio } from '../audio/WeddingAudioEngine';

export default function QrCodeModal({ isOpen, onClose, invitation, activeTheme }) {
  const canvasRef = useRef(null);

  const inviteUrl = typeof window !== 'undefined' ? window.location.href : 'https://inverto.luxury';

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        inviteUrl,
        {
          width: 240,
          margin: 2,
          color: {
            dark: '#0A1A15',
            light: '#FAF6EE'
          }
        },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [isOpen, inviteUrl]);

  if (!isOpen) return null;

  const handleDownload = () => {
    weddingAudio.playButtonClick();
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `Wedding_QR_${invitation.slug || 'invite'}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  const handlePrint = () => {
    weddingAudio.playButtonClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`relative w-full max-w-md rounded-3xl ${activeTheme.surfaceClass} border ${activeTheme.cardBorder} p-6 sm:p-8 text-center shadow-2xl transition-all animate-in fade-in zoom-in duration-200`}>
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 transition"
        >
          <X size={16} />
        </button>

        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
              Stationery Print Ready QR Code
            </span>
            <h3 className="font-royal text-xl font-bold text-white mt-1">
              {invitation.couple.bride} &amp; {invitation.couple.groom}
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Insert this QR code onto physical wedding card inserts, sweet boxes, and guest welcome hampers.
            </p>
          </div>

          {/* QR Code Canvas Card */}
          <div className="bg-[#FAF6EE] p-4 rounded-2xl inline-block shadow-xl border-4 border-[#D4AF37]">
            <canvas ref={canvasRef} className="mx-auto rounded-lg"></canvas>
            <div className="mt-2 text-[10px] font-royal font-bold text-slate-900 tracking-wider">
              SCAN TO VIEW INTERACTIVE PORTAL &amp; RSVP
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleDownload}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md ${activeTheme.btnPrimary}`}
            >
              <Download size={14} />
              <span>Download High-Res PNG</span>
            </button>

            <button
              onClick={handlePrint}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${activeTheme.btnSecondary}`}
            >
              <Printer size={14} />
              <span>Print Preview</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
