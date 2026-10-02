import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle, MessageCircle } from 'lucide-react';
import { apiService } from '../services/api';
import { weddingAudio } from '../audio/WeddingAudioEngine';

export default function LeadFormModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [pkg, setPkg] = useState('Bespoke Multi-Event Portal');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || (!email.trim() && !phone.trim())) {
      alert('Please enter your name and phone or email.');
      return;
    }

    setSubmitting(true);
    weddingAudio.playButtonClick();

    try {
      await apiService.submitLead({
        name,
        email,
        phone,
        weddingDate,
        package: pkg,
        message
      });
      setSubmitted(true);
      weddingAudio.playFanfare();
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-[#E2CEAB] p-6 sm:p-8 shadow-2xl my-8 transition-all animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF2E6] hover:bg-[#F2E5D0] text-[#6B1D2F] transition"
        >
          <X size={16} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-royal font-bold uppercase tracking-widest text-[#C59B4E]">
                Consultation &amp; Booking • Kush Invitations
              </span>
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#4A0F1E]">
                Book Your Wedding Invitation
              </h3>
              <p className="text-xs text-[#7A263B]">
                Let our royal design studio craft a bespoke luxury digital experience for your wedding.
              </p>
            </div>

            <div>
              <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pooja Sharma"
                className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">Wedding Date</label>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">Preferred Package</label>
                <select
                  value={pkg}
                  onChange={(e) => setPkg(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
                >
                  <option value="Classic Digital Invitation">Classic Digital Invitation</option>
                  <option value="Bespoke Multi-Event Portal">Bespoke Multi-Event Portal &amp; Pre-Wedding</option>
                  <option value="Royal Concierge & Whitelabel">Royal Concierge &amp; Whitelabel</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">Special Requirements or Venue Details</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your wedding venue, city, or ceremony requirements..."
                className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] hover:from-[#541221] hover:to-[#2C0812] text-[#FAF6F0] rounded-full text-xs font-royal font-bold uppercase tracking-wider shadow-lg shadow-[#6B1D2F]/20 flex items-center justify-center gap-2 transition active:scale-95 border border-[#C59B4E]/40"
            >
              <Send size={14} className="text-[#C59B4E]" />
              <span>{submitting ? 'Submitting...' : 'Submit Inquiry & Get Instant Proposal'}</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-royal text-2xl font-bold text-[#4A0F1E]">Inquiry Received!</h3>
            <p className="text-xs text-[#7A263B] max-w-sm mx-auto">
              Thank you, <strong>{name}</strong>! Kush Invitations will contact you on WhatsApp shortly.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-xs font-royal font-bold bg-[#6B1D2F] text-white transition shadow-md"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
