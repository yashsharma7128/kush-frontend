import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ShowcaseCatalog from './components/ShowcaseCatalog';
import SampleEntityView from './components/SampleEntityView';
import ReelsStudio from './components/ReelsStudio';
import PricingCalculator from './components/PricingCalculator';
import AdminDashboard from './components/AdminDashboard';
import RsvpModal from './components/RsvpModal';
import LeadFormModal from './components/LeadFormModal';
import ParticleEffect from './components/ParticleEffect';
import Footer from './components/Footer';
import { DEFAULT_INVITATION } from './data/sampleData';
import { weddingAudio } from './audio/WeddingAudioEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'showcase' | 'reels' | 'pricing' | 'dashboard'
  const [selectedSample, setSelectedSample] = useState(null);
  const [invitation, setInvitation] = useState(DEFAULT_INVITATION);

  // Modals
  const [isRsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [isLeadModalOpen, setLeadModalOpen] = useState(false);

  // Handle selecting a sample -> opens as a separate standalone entity
  const handleSelectSample = (sample) => {
    weddingAudio.playButtonClick();
    setSelectedSample(sample);
  };

  // Back to catalog
  const handleBackToCatalog = () => {
    weddingAudio.playButtonClick();
    setSelectedSample(null);
  };

  // WhatsApp Booking
  const handleBookWhatsApp = (sample = null) => {
    weddingAudio.playButtonClick();
    const title = sample ? sample.title : 'पारंपरिक भारतीय विवाह पत्रिका';
    const text = encodeURIComponent(
      `✨ नमस्ते Kush Invitations! मुझे "${title}" डिजिटल विवाह पोर्टल, प्री-वेडिंग शूट एलबम एवं 9:16 वीडियो रील पैकेज बनवाना है। कृपया प्रक्रिया एवं कस्टमाइज़ेशन विवरण बताएं। (Your Story ♦ Our Design)`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // If a sample is clicked, render it as a STANDALONE SEPARATE ENTITY
  if (selectedSample) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] text-[#4A0F1E] font-sans selection:bg-[#6B1D2F] selection:text-[#FAF6F0]">
        <ParticleEffect />
        <SampleEntityView
          sample={selectedSample}
          onBack={handleBackToCatalog}
          onOpenRsvp={() => setRsvpModalOpen(true)}
          onBookWhatsApp={handleBookWhatsApp}
        />

        <RsvpModal
          isOpen={isRsvpModalOpen}
          onClose={() => setRsvpModalOpen(false)}
          invitation={invitation}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#4A0F1E] flex flex-col font-sans selection:bg-[#6B1D2F] selection:text-[#FAF6F0]">
      
      {/* 0. AMBIENT GOLD SPARKLES & ROSE PETALS EFFECT */}
      <ParticleEffect />

      {/* 1. ROYAL KUSH INVITATIONS HEADER */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          weddingAudio.playButtonClick();
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLeadModal={() => {
          weddingAudio.playButtonClick();
          setLeadModalOpen(true);
        }}
      />

      {/* 2. MAIN VIEWS */}
      <main className="flex-1">
        
        {/* VIEW 0: COMPREHENSIVE HOME PAGE */}
        {activeTab === 'home' && (
          <HomePage
            onSelectSample={handleSelectSample}
            onNavigate={(tab) => {
              weddingAudio.playButtonClick();
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLeadModal={() => {
              weddingAudio.playButtonClick();
              setLeadModalOpen(true);
            }}
            onBookWhatsApp={handleBookWhatsApp}
          />
        )}

        {/* VIEW 1: CATALOG SHOWCASE (ALL 6 SAMPLES) */}
        {activeTab === 'showcase' && (
          <ShowcaseCatalog
            onSelectSample={handleSelectSample}
            onOpenReels={() => {
              weddingAudio.playButtonClick();
              setActiveTab('reels');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookWhatsApp={handleBookWhatsApp}
            onOpenPricing={() => {
              weddingAudio.playButtonClick();
              setActiveTab('pricing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 2: 9:16 VIDEO REELS PLAYER */}
        {activeTab === 'reels' && (
          <ReelsStudio
            invitation={invitation}
            onOpenRsvp={() => setRsvpModalOpen(true)}
          />
        )}

        {/* VIEW 3: PRICING & PACKAGES */}
        {activeTab === 'pricing' && (
          <div className="pt-4">
            <PricingCalculator
              onOpenLeadModal={() => setLeadModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW 4: RSVP GUEST LIST DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="pt-4">
            <AdminDashboard
              invitation={invitation}
            />
          </div>
        )}

      </main>

      {/* 3. MULTI-COLUMN LUXURY FOOTER (WITH ADDRESS, CONTACT, ONLINE & UPI PAYMENTS) */}
      <Footer
        onNavigate={(tab) => {
          weddingAudio.playButtonClick();
          setActiveTab(tab);
        }}
        onOpenLeadModal={() => {
          weddingAudio.playButtonClick();
          setLeadModalOpen(true);
        }}
        onBookWhatsApp={handleBookWhatsApp}
      />

      {/* 4. MODALS */}
      <RsvpModal
        isOpen={isRsvpModalOpen}
        onClose={() => setRsvpModalOpen(false)}
        invitation={invitation}
      />

      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={() => setLeadModalOpen(false)}
      />

    </div>
  );
}
