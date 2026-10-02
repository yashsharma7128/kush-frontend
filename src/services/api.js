const API_BASE = '/api';

export const apiService = {
  // Fetch invitation by slug or id
  async getInvitation(slug = 'ananya-kabir') {
    try {
      const res = await fetch(`${API_BASE}/invitations/${slug}`);
      if (!res.ok) throw new Error('Failed to fetch invitation');
      return await res.json();
    } catch (err) {
      console.warn('API fallback to local data:', err);
      // Try localStorage
      const saved = localStorage.getItem('inverto_invitation');
      if (saved) return JSON.parse(saved);
      return null;
    }
  },

  // Save/Update customized invitation
  async saveInvitation(data) {
    try {
      const res = await fetch(`${API_BASE}/invitations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      localStorage.setItem('inverto_invitation', JSON.stringify(result.invitation || data));
      return result;
    } catch (err) {
      console.warn('Backend save failed, stored in localStorage:', err);
      localStorage.setItem('inverto_invitation', JSON.stringify(data));
      return { success: true, invitation: data, localOnly: true };
    }
  },

  // Submit RSVP
  async submitRsvp(rsvpData) {
    try {
      const res = await fetch(`${API_BASE}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpData)
      });
      if (!res.ok) throw new Error('RSVP submission failed');
      return await res.json();
    } catch (err) {
      console.warn('Backend RSVP failed, storing locally:', err);
      const existing = JSON.parse(localStorage.getItem('inverto_rsvps') || '[]');
      const newRsvp = {
        ...rsvpData,
        id: `rsvp-${Date.now()}`,
        submittedAt: new Date().toISOString()
      };
      existing.unshift(newRsvp);
      localStorage.setItem('inverto_rsvps', JSON.stringify(existing));
      return { success: true, message: 'RSVP saved successfully!', rsvp: newRsvp };
    }
  },

  // Fetch RSVPs
  async getRsvps(invitationId) {
    try {
      const url = invitationId ? `${API_BASE}/rsvps?invitationId=${invitationId}` : `${API_BASE}/rsvps`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch RSVPs');
      return await res.json();
    } catch (err) {
      const localRsvps = JSON.parse(localStorage.getItem('inverto_rsvps') || '[]');
      return localRsvps;
    }
  },

  // Submit Lead Inquiry
  async submitLead(leadData) {
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      return await res.json();
    } catch (err) {
      const leads = JSON.parse(localStorage.getItem('inverto_leads') || '[]');
      const newLead = { ...leadData, id: `lead-${Date.now()}`, createdAt: new Date().toISOString() };
      leads.unshift(newLead);
      localStorage.setItem('inverto_leads', JSON.stringify(leads));
      return { success: true, message: 'Inquiry received!', lead: newLead };
    }
  },

  // Get Agency Stats
  async getStats() {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      return await res.json();
    } catch (err) {
      return {
        activePortals: 4,
        totalRsvps: 28,
        confirmedGuests: 64,
        leadInquiries: 12,
        revenueEstimate: '$14,850'
      };
    }
  }
};
