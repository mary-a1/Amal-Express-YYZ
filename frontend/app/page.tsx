'use client';
import React, { useState } from 'react';
import Navbar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import TransferSteps from '@/components/TransferSteps';
import StoreLocator from '@/components/StoreLocator';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export default function Home() {
  const [finalPayAmount, setFinalPayAmount] = useState<number | null>(null);

  return (
    <main className="bg-[linear-gradient(160deg,#020024_0%,#050038_40%,#07002f_100%)] text-white min-h-screen font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* Hero + Calculator section */}
        <HeroSection setFinalPayAmount={setFinalPayAmount}/>
      {/* <div className="flex flex-col-reverse md:flex-row justify-center items-start gap-8 px-4 py-12 max-w-7xl mx-auto">
      </div> */}

      {/* Transfer Steps */}
        <TransferSteps finalPayAmount={finalPayAmount} />
      {/* <div className="flex justify-center px-4 py-12 max-w-7xl mx-auto">
      </div> */}
      
      {/* Leaflet Maps */}
        < StoreLocator/>
        {/* <div className="w-full max-w-7xl mx-auto">
      </div> */}

      {/* Contact Section */}
      <Contact/>
      
      {/* Footer Section */}
      <Footer />
    </main>
  );
}
