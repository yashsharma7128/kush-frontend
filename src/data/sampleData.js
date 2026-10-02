export const DEFAULT_INVITATION = {
  id: "ananya-kabir-2026",
  slug: "ananya-kabir",
  couple: {
    bride: "Ananya Sharma",
    groom: "Kabir Singhania",
    hashtag: "#AnanyaFoundHerKabir",
    tagline: "Two Souls, One Grand Journey of Forever",
    quote: "In the tapestry of life, the most beautiful chapters are written hand in hand.",
    story: "From our first meeting over rainy Mumbai coffees to magical sunsets overlooking Udaipur's Lake Pichola, our journey has been an extraordinary tapestry of laughter, shared dreams, and timeless love. We warmly invite you to celebrate our union as we begin our forever."
  },
  weddingDate: "2026-11-28",
  themeId: "emerald",
  musicTrack: "raga",
  audioAutoplay: true,
  venue: {
    name: "The Oberoi Udaivilas Palace",
    city: "Udaipur, Rajasthan",
    address: "Badi-Gorela-Mulla Talai Rd, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001",
    mapLink: "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur",
    airport: "Maharana Pratap Airport (UDR) - 45 mins",
    station: "Udaipur City Railway Station - 20 mins"
  },
  events: [
    {
      id: "e1",
      title: "Auspicious Ganesh Pooja & Haldi",
      date: "Nov 27, 2026",
      time: "10:30 AM onwards",
      venue: "Chandra Mahal Courtyard",
      dressCode: "Sunshine Yellow & Mustard Traditional Silk",
      desc: "Sacred rituals, auspicious blessings, marigold petal shower & lively haldi ceremonies."
    },
    {
      id: "e2",
      title: "The Grand Sangeet & Royal Gala",
      date: "Nov 27, 2026",
      time: "07:00 PM to Late Night",
      venue: "The Grand Ballroom & Lakeside Lawns",
      dressCode: "High-Glamour Lehengas, Tuxedos & Velvet Bandhgalas",
      desc: "An electric night of family choreography battles, live Sufi band, cocktails & gourmet feasts."
    },
    {
      id: "e3",
      title: "Sacred Pheras & Sunset Vows",
      date: "Nov 28, 2026",
      time: "04:30 PM Sunset Muhurtham",
      venue: "The Lake Pavilions & Floral Mandap",
      dressCode: "Royal Heritage Ivory, Emerald & Rose Gold Regalia",
      desc: "Witness the sacred seven vows under the crimson twilight sky."
    },
    {
      id: "e4",
      title: "The Imperial Reception Dinner",
      date: "Nov 28, 2026",
      time: "08:30 PM onwards",
      venue: "Mewar Terrace & Royal Gardens",
      dressCode: "Contemporary Black Tie & Haute Couture",
      desc: "Toast to love and new beginnings with international cuisines, live orchestra & fireworks."
    }
  ],
  itinerary: [
    { "time": "Day 1 - 02:00 PM", "title": "Guest Check-in & Royal Welcome Drink" },
    { "time": "Day 1 - 04:30 PM", "title": "Mehndi & High Tea by the Pool" },
    { "time": "Day 1 - 07:00 PM", "title": "Sangeet Extravaganza & Dinner" },
    { "time": "Day 2 - 10:30 AM", "title": "Haldi & Phoolon Ki Holi" },
    { "time": "Day 2 - 03:30 PM", "title": "Baraat Procession with Vintage Cars" },
    { "time": "Day 2 - 05:00 PM", "title": "Varmala & Sacred Pheras" },
    { "time": "Day 2 - 08:30 PM", "title": "Imperial Gala Dinner & Fireworks" }
  ],
  registry: {
    upiId: "singhania.wedding@oksbi",
    giftRegistryUrl: "https://registry.inverto.luxury/ananya-kabir",
    note: "Your presence and blessings are our greatest gift! If you wish to honour us with a token, our digital blessing portal is available."
  },
  gallery: [
    { "url": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80", "caption": "The Proposal at Sunset" },
    { "url": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", "caption": "Pre-Wedding Palace Memories" },
    { "url": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", "caption": "Laughter & Forever Promises" }
  ],
  rsvpDeadline: "2026-11-10",
  contact: {
    phone: "+91 98765 43210",
    email: "concierge@ananyakabir.com",
    whatsapp: "919876543210"
  }
};

export const SAMPLE_PORTFOLIO_CARDS = [
  {
    id: "port-1",
    title: "The Royal Udaipur Palace",
    couple: "Ananya & Kabir",
    themeId: "emerald",
    category: "Royal Heritage",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    highlights: ["Sitar & Shehnai Synthesizer", "Multi-Event RSVP", "Google Maps + Weather", "QR Print Generator"],
    location: "Udaipur, India"
  },
  {
    id: "port-2",
    title: "Amalfi Coastline Sunset",
    couple: "Seraphina & Lorenzo",
    themeId: "terracotta",
    category: "Destination Italy",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    highlights: ["Acoustic Romance Audio", "Flight Concierge & Travel Guide", "Bilingual RSVP English & Italian"],
    location: "Positano, Italy"
  },
  {
    id: "port-3",
    title: "Midnight Manhattan Black Tie",
    couple: "Victoria & Alexander",
    themeId: "midnight",
    category: "Metropolitan Gala",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    highlights: ["Canon Chimes Harmonic", "Dress Code Visual Board", "VIP Table Seating Allocator"],
    location: "New York City, USA"
  },
  {
    id: "port-4",
    title: "Tuscan Rose Garden Elegance",
    couple: "Kiara & Siddharth",
    themeId: "rosequartz",
    category: "Floral Serenade",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80",
    highlights: ["Piano Harmony Music", "Instant WhatsApp Guest Dispatch", "High-Res Photo Stream"],
    location: "Florence, Italy"
  }
];
