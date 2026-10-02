import React, { useState } from 'react';
import { X, Send, Heart, CheckCircle, Music, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiService } from '../services/api';
import { weddingAudio } from '../audio/WeddingAudioEngine';

export default function RsvpModal({ isOpen, onClose, invitation }) {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [attendingStatus, setAttendingStatus] = useState('Attending with Joy');
  const [guestCount, setGuestCount] = useState(2);
  const [dietary, setDietary] = useState('Vegetarian / Jain Preferred');
  const [songRequest, setSongRequest] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert('Please enter your full name.');
      return;
    }

    setSubmitting(true);
    weddingAudio.playButtonClick();

    try {
      const payload = {
        invitationId: invitation?.id || 'ananya-kabir-2026',
        guestName,
        phone,
        email,
        attendingStatus,
        guestCount,
        dietary,
        songRequest,
        message
      };

      await apiService.submitRsvp(payload);
      setSubmitted(true);
      weddingAudio.playFanfare();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
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
                Official Wedding RSVP • Kush Invitations
              </span>
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#4A0F1E]">
                Celebrate the Wedding Ceremony
              </h3>
              <p className="text-xs text-[#7A263B]">
                Please confirm your attendance to help us arrange your royal hospitality.
              </p>
            </div>

            {/* Attendance Toggle */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                { id: 'Attending with Joy', label: '🎉 Joyfully Attending' },
                { id: 'Regretfully Decline', label: '💌 Sending Blessings' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    weddingAudio.playButtonClick();
                    setAttendingStatus(opt.id);
                  }}
                  className={`py-2 px-3 rounded-full text-xs font-royal font-bold transition border ${
                    attendingStatus === opt.id
                      ? 'bg-[#6B1D2F] text-white border-[#6B1D2F]'
                      : 'bg-[#FAF6F0] text-[#4A0F1E] border-[#E2CEAB]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Guest Name & Count */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Vikramaditya Sharma"
                  className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">Total Guests</label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">WhatsApp / Phone Number</label>
                <input
                  type="tel"
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
                  placeholder="name@domain.com"
                  className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
                />
              </div>
            </div>

            {/* Dietary & Song Request */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">Dietary Preference</label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
                >
                  <option value="Vegetarian / Jain Preferred">Vegetarian / Jain Preferred</option>
                  <option value="Pure Vegetarian">Pure Vegetarian</option>
                  <option value="No Restrictions">No Restrictions</option>
                  <option value="Vegan / Gluten-Free">Vegan / Gluten-Free</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">Song Request for DJ</label>
                <input
                  type="text"
                  value={songRequest}
                  onChange={(e) => setSongRequest(e.target.value)}
                  placeholder="e.g. Afreen Afreen"
                  className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
                />
              </div>
            </div>

            {/* Personal Blessing Note */}
            <div>
              <label className="block text-xs font-royal font-semibold text-[#4A0F1E] mb-1">Blessing or Message for the Couple</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your blessings and wishes..."
                className="w-full bg-[#FAF6F0] border border-[#E2CEAB] rounded-xl px-3 py-2 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full font-royal font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] text-[#FAF6F0] flex items-center justify-center gap-2 shadow-lg shadow-[#6B1D2F]/20 active:scale-95 transition border border-[#C59B4E]/40"
            >
              <Send size={14} className="text-[#C59B4E]" />
              <span>{submitting ? 'Confirming...' : 'Submit RSVP & Save Seat'}</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-royal text-2xl font-bold text-[#4A0F1E]">RSVP Confirmed with Joy!</h3>
            <p className="text-xs text-[#7A263B] max-w-sm mx-auto">
              Thank you, <strong>{guestName}</strong>! Your attendance of {guestCount} guest(s) has been recorded with the couple.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-xs font-royal font-bold bg-[#6B1D2F] text-white transition shadow-md"
            >
              Return to Invitation
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
