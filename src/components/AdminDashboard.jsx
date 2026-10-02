import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Download, 
  Search, 
  CheckCircle, 
  Clock, 
  MessageCircle, 
  Mail, 
  Phone, 
  Sparkles, 
  Music, 
  Filter,
  Send,
  ExternalLink
} from 'lucide-react';
import { apiService } from '../services/api';
import { weddingAudio } from '../audio/WeddingAudioEngine';

export default function AdminDashboard({ invitation }) {
  const [rsvps, setRsvps] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [guestNameInput, setGuestNameInput] = useState('');
  const [generatedWaLink, setGeneratedWaLink] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [rsvpsData, statsData] = await Promise.all([
        apiService.getRsvps(invitation?.id || 'ananya-kabir-2026'),
        apiService.getStats()
      ]);
      setRsvps(rsvpsData);
      setStats(statsData);

      fetch('/api/leads')
        .then(r => r.json())
        .then(d => setLeads(Array.isArray(d) ? d : []))
        .catch(() => {});
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadCsv = () => {
    weddingAudio.playButtonClick();
    window.open(`/api/rsvps/export/csv?invitationId=${invitation?.id || 'ananya-kabir-2026'}`, '_blank');
  };

  const handleGeneratePersonalizedLink = () => {
    if (!guestNameInput.trim()) return;
    weddingAudio.playButtonClick();
    const encodedName = encodeURIComponent(guestNameInput.trim());
    const inviteUrl = `${window.location.origin}/?guest=${encodedName}`;
    const text = encodeURIComponent(
      `✨ Dear ${guestNameInput.trim()},\n\nWe cordially invite you to celebrate our royal wedding at ${invitation?.venue?.name || 'Jaipur'}.\n\nPlease view our interactive digital invitation & RSVP portal handcrafted by Kush Invitations here:\n${inviteUrl}`
    );
    const waUrl = `https://api.whatsapp.com/send?text=${text}`;
    setGeneratedWaLink(waUrl);
  };

  const filteredRsvps = rsvps.filter(r => {
    const matchesSearch = 
      (r.guestName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.phone || '').includes(searchQuery);

    const matchesDiet = 
      dietaryFilter === 'all' || 
      (r.dietary || '').toLowerCase().includes(dietaryFilter.toLowerCase());

    return matchesSearch && matchesDiet;
  });

  const totalHeadcount = rsvps.reduce((acc, curr) => acc + (Number(curr.guestCount) || 1), 0);
  const jainVegCount = rsvps.filter(r => (r.dietary || '').toLowerCase().includes('veg') || (r.dietary || '').toLowerCase().includes('jain')).length;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E2CEAB]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF2E6] border border-[#E2CEAB] text-[#6B1D2F] text-xs font-royal font-bold mb-2">
            <LayoutDashboard size={13} className="text-[#C59B4E]" />
            <span>Kush Invitations • RSVP &amp; Hospitality Center</span>
          </div>
          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#4A0F1E]">
            Guest RSVP &amp; Hospitality Dashboard
          </h2>
          <p className="text-xs text-[#7A263B] font-serif mt-1">
            Manage your verified guest attendees, dietary meals, and export catering spreadsheets.
          </p>
        </div>

        {/* CSV Export Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadCsv}
            className="px-5 py-2.5 rounded-full text-xs font-royal font-bold bg-gradient-to-r from-[#6B1D2F] via-[#541221] to-[#3B0B16] text-[#FAF6F0] flex items-center gap-2 transition active:scale-95 shadow-md shadow-[#6B1D2F]/20 border border-[#C59B4E]/40"
          >
            <Download size={14} className="text-[#C59B4E]" />
            <span>Export Guest List (CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7A263B] font-medium font-royal">Total RSVPs</span>
            <Users size={16} className="text-[#6B1D2F]" />
          </div>
          <div className="font-royal text-2xl sm:text-3xl font-bold text-[#4A0F1E]">{rsvps.length}</div>
          <p className="text-[10px] text-emerald-700 mt-1 font-mono">● Verified Submissions</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7A263B] font-medium font-royal">Total Headcount</span>
            <CheckCircle size={16} className="text-[#C59B4E]" />
          </div>
          <div className="font-royal text-2xl sm:text-3xl font-bold text-[#6B1D2F]">{totalHeadcount}</div>
          <p className="text-[10px] text-stone-500 mt-1">Confirmed Attending Guests</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7A263B] font-medium font-royal">Dietary Meals</span>
            <Filter size={16} className="text-[#C59B4E]" />
          </div>
          <div className="font-royal text-2xl sm:text-3xl font-bold text-[#C59B4E]">{jainVegCount}</div>
          <p className="text-[10px] text-stone-500 mt-1">Jain / Pure Veg / Allergies</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-[#E2CEAB] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7A263B] font-medium font-royal">Studio Leads</span>
            <Sparkles size={16} className="text-[#6B1D2F]" />
          </div>
          <div className="font-royal text-2xl sm:text-3xl font-bold text-[#4A0F1E]">{leads.length || 1}</div>
          <p className="text-[10px] text-[#6B1D2F] mt-1">Prospective Inquiries</p>
        </div>
      </div>

      {/* WhatsApp Dispatcher */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border-2 border-[#E2CEAB] space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-[#4A0F1E]">
          <MessageCircle size={18} className="text-emerald-600" />
          <h3 className="font-royal text-sm font-bold">1-Click WhatsApp Personalized Invitation Dispatcher</h3>
        </div>
        <p className="text-xs text-[#7A263B]">
          Enter a guest's family name to generate a pre-filled, elegant WhatsApp invitation message with their personalized link.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={guestNameInput}
            onChange={(e) => setGuestNameInput(e.target.value)}
            placeholder="e.g. Sharma Family, Jaipur"
            className="flex-1 min-w-[200px] sm:min-w-[240px] bg-[#FAF6F0] border border-[#E2CEAB] rounded-full px-4 py-2.5 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
          />
          <button
            onClick={handleGeneratePersonalizedLink}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-royal font-bold rounded-full text-xs flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-emerald-200"
          >
            <Send size={14} />
            <span>Generate WhatsApp Invite</span>
          </button>
        </div>

        {generatedWaLink && (
          <div className="p-3.5 bg-[#FAF2E6] rounded-2xl border border-emerald-400 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-emerald-900 truncate max-w-lg font-mono">
              Ready to send on WhatsApp for "{guestNameInput}"
            </span>
            <a
              href={generatedWaLink}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-royal font-bold flex items-center gap-1"
            >
              <span>Send via WhatsApp</span>
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>

      {/* Guest RSVP Table */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border-2 border-[#E2CEAB] space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-royal text-base font-bold text-[#4A0F1E]">Confirmed Guest List ({filteredRsvps.length})</h3>
            <p className="text-xs text-[#7A263B]">Manage dietary needs, song requests, and ceremonial attendance.</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guest by name, phone..."
                className="bg-[#FAF6F0] border border-[#E2CEAB] rounded-full pl-9 pr-3 py-1.5 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none w-52"
              />
            </div>

            <select
              value={dietaryFilter}
              onChange={(e) => setDietaryFilter(e.target.value)}
              className="bg-[#FAF6F0] border border-[#E2CEAB] rounded-full px-3 py-1.5 text-xs text-[#4A0F1E] focus:border-[#6B1D2F] focus:outline-none"
            >
              <option value="all">All Diets</option>
              <option value="veg">Vegetarian</option>
              <option value="jain">Jain</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E2CEAB]">
          <table className="w-full text-left text-xs text-[#4A0F1E]">
            <thead className="bg-[#FAF2E6] text-[#6B1D2F] uppercase text-[10px] font-royal tracking-wider border-b border-[#E2CEAB]">
              <tr>
                <th className="py-3 px-4">Guest Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4 text-center">Guests</th>
                <th className="py-3 px-4">Dietary Preference</th>
                <th className="py-3 px-4">Song Request</th>
                <th className="py-3 px-4">Blessing Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF2E6]">
              {filteredRsvps.length > 0 ? (
                filteredRsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-[#FAF6F0] transition">
                    <td className="py-3 px-4 font-semibold text-[#4A0F1E] font-royal">
                      {rsvp.guestName}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">
                      <div>{rsvp.phone}</div>
                      <div className="text-[10px] text-stone-500">{rsvp.email}</div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-[#6B1D2F]">
                      {rsvp.guestCount}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2E6] text-[#6B1D2F] text-[10px] font-medium border border-[#E2CEAB]">
                        {rsvp.dietary}
                      </span>
                    </td>
                    <td className="py-3 px-4 italic text-[#7A263B] text-[11px]">
                      {rsvp.songRequest ? `🎵 ${rsvp.songRequest}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-[#4A0F1E] text-[11px] max-w-xs truncate" title={rsvp.message}>
                      {rsvp.message || '—'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    No RSVPs match the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
