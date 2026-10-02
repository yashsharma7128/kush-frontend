# 👑 Kush Invitations — Frontend Web Application

> **"Your Story ♦ Our Design"**  
> Bespoke Digital Wedding Portals, 4K Pre-Wedding Sagas & 9:16 Vertical Video Reels.

---

## 🌟 Highlights

- **Bespoke Royal Aesthetic**: Royal Rajputana arches, Sanskrit invocations (*॥ श्री गणेशाय नमः ॥*), gold shimmer gradients, and floating rose/marigold petals.
- **Embedded Pre-Wedding Experience**: 4K cinematic video teaser player, photo album with zoomable lightbox modal, and love story timeline.
- **Live Bollywood & Shehnai Audio Engine**: Web Audio synthesizer with shehnai, Mangalyam, and sitar symphonies with animated sound-wave equalizers.
- **9:16 Video Reels Studio**: Vertical animated stories for WhatsApp Status & Instagram Stories with tap-to-navigate slides.
- **1-Click WhatsApp RSVP**: Instant headcount and meal preference confirmation with confetti effects.
- **Real-Time Countdown**: Auspicious Muhurtham countdown timer ticking live.
- **Fully Responsive**: Optimized for phones (320px–640px) with app-like bottom navigation, tablets (768px–1024px), and desktops (1024px+).

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom royal maroon (`#6B1D2F`) & antique gold (`#C59B4E`) themes
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio**: Custom HTML5 / Web Audio API Engine
- **Effects**: HTML5 Canvas Particle Engine & Canvas-Confetti

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
The app will run at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Generates a minified, production-ready static bundle inside the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 One-Click Deployment

### Deploy to Vercel
1. Import this repository folder (`client/`) into [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Base directory: `client`.
3. Build command: `npm run build`.
4. Publish directory: `client/dist`.
5. Click **Deploy Site**.

---

## 📁 Project Architecture

```
client/
├── public/
│   ├── kush-logo.jpg            # Kush Invitations Official Brand Seal
│   └── favicon.svg
├── src/
│   ├── audio/
│   │   └── WeddingAudioEngine.js # Live Shehnai, Mangalyam & UI sound engine
│   ├── components/
│   │   ├── HomePage.jsx         # All-in-one portal overview & preview sections
│   │   ├── Navbar.jsx           # Royal header & mobile bottom navigation
│   │   ├── Footer.jsx           # 4-column footer (Address, Contacts, Cards & UPI)
│   │   ├── ShowcaseCatalog.jsx  # 6 luxury wedding portals catalog
│   │   ├── SampleEntityView.jsx # Dedicated wedding portal with Pre-Wedding section
│   │   ├── ReelsStudio.jsx      # 9:16 vertical video reel player
│   │   ├── PricingCalculator.jsx# Flat package & add-on ROI quotation calculator
│   │   ├── AdminDashboard.jsx   # RSVP management & catering spreadsheet
│   │   ├── RsvpModal.jsx        # Guest RSVP confirmation dialog
│   │   ├── LeadFormModal.jsx    # Consultation & quote booking modal
│   │   └── ParticleEffect.jsx   # Ambient golden sparkles & petal canvas
│   ├── data/
│   │   ├── websiteSamples.js    # Wedding couple samples & pre-wedding shoots
│   │   ├── pricing.js           # Packages and currencies
│   │   └── audioTracks.js       # Curated Bollywood & traditional audio tracks
│   ├── App.jsx                  # Main router & state manager
│   ├── main.jsx                 # Entrypoint
│   └── index.css                # Custom scrollbars, animations & fonts
├── index.html
├── tailwind.config.js
└── vite.config.js
```
