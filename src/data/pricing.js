export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' }
};

export const PRICING_PACKAGES = [
  {
    id: "starter",
    name: "Classic Digital Invitation",
    badge: "Essential",
    baseInr: 9999,
    tagline: "Perfect for single-day weddings, intimate gatherings & engagement parties.",
    features: [
      "Custom Couple Story & Photo Cover",
      "Interactive Google Maps Venue Link",
      "1-Click Add to Google / Apple Calendar",
      "Web Audio Synthesizer (1 Track included)",
      "Standard RSVP Form (up to 150 guests)",
      "Mobile Responsive Viewport",
      "Hosted for 6 Months"
    ],
    popular: false
  },
  {
    id: "bespoke",
    name: "Bespoke Multi-Event Portal",
    badge: "Most Popular",
    baseInr: 24999,
    tagline: "Designed for grand 2-3 day celebrations (Haldi, Mehendi, Sangeet, Wedding, Reception).",
    features: [
      "Everything in Classic, plus:",
      "Up to 6 Sub-Event Portals & Dress Codes",
      "All 4 Luxury Audio Tracks (Raga, Chimes, Piano, Dhol)",
      "Dietary Preference & Song Request Filters",
      "Full RSVP & Guest List CSV Export",
      "Digital Envelope Opening Sound FX",
      "High-Resolution Photo Gallery & Registry",
      "Printable High-Res QR Code Kit",
      "Hosted for 1 Year + Custom Subdomain"
    ],
    popular: true
  },
  {
    id: "royal",
    name: "Royal Concierge & Whitelabel",
    badge: "Agency Elite",
    baseInr: 49999,
    tagline: "The ultimate white-glove VIP experience with custom domain and WhatsApp guest broadcast.",
    features: [
      "Everything in Bespoke, plus:",
      "Custom Top-Level Domain (e.g., ananyakabir.wedding)",
      "Automated WhatsApp Bulk Guest Dispatch",
      "Dedicated RSVP Concierge Manager",
      "VIP Seating & Hotel Room Allocator",
      "Custom Orchestral Audio Composition",
      "Bilingual Language Support (Hindi / English / Italian)",
      "Lifetime Archive & Video Invitation Reel (9:16)"
    ],
    popular: false
  }
];

export const ADDONS = [
  { id: "whatsapp_broadcast", name: "WhatsApp 1-Click Guest Blast (500 Contacts)", priceInr: 4999 },
  { id: "custom_domain", name: "Custom Domain (.com / .wedding for 1 yr)", priceInr: 2999 },
  { id: "qr_printed_cards", name: "Physical Gold-Foil QR Card Inserts (Pack of 100)", priceInr: 3999 },
  { id: "reels_video", name: "Custom 9:16 Animated Video Invitation Reel", priceInr: 6999 }
];
