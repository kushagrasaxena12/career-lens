import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import DecisionsSection from '../components/landing/DecisionsSection';
import HowItWorks from '../components/landing/HowItWorks';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
      <LandingNavbar />
      <main>
        <Hero />
        <DecisionsSection />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
