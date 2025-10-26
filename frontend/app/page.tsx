'use client';
import React, { useState } from 'react';
import Navbar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import CurrencyCalculator from '@/components/CurrencyCalculator';
import TransferSteps from '@/components/TransferSteps';
import StoreLocator from '@/components/StoreLocator';
import Footer from '@/components/Footer';

export default function Home() {
  const [finalPayAmount, setFinalPayAmount] = useState<number | null>(null);

  return (
    <main className="bg-[linear-gradient(160deg,#020024_0%,#050038_40%,#07002f_100%)] text-white min-h-screen font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* Hero + Calculator section */}
      <div className="flex flex-col-reverse md:flex-row justify-center items-start gap-8 px-4 py-12 max-w-7xl mx-auto">
        <HeroSection setFinalPayAmount={setFinalPayAmount}/>
      </div>

      {/* Transfer Steps */}
      <div className="flex justify-center px-4 py-12 max-w-7xl mx-auto">
        <TransferSteps finalPayAmount={finalPayAmount} />
      </div>
      
      {/* Leaflet Maps */}
        <div className="w-full max-w-7xl mx-auto">
        < StoreLocator/>
      </div>
      <Footer />
    </main>
  );
}
// 