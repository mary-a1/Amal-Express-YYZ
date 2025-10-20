// import Calculator from "@/components/Calculator";
// import CurrencyCalculator from "@/components/CurrencyCalculator";
// import HeroSection from "@/components/HeroSection";
// import Navbar from "@/components/NavBar";
// import TransferSteps from "@/components/TransferSteps";

// export default function Home() {
//   return (
//     <main className="bg-[#0D0C1D] text-white min-h-screen font-sans">
//       {/* Top Navigation */}
//       <Navbar />

//       {/* Hero + Calculator Side-by-Side */}
//       <div className="flex flex-col-reverse lg:flex-row justify-between items-start px-6 py-12 max-w-7xl mx-auto">
//         {/* Left: Hero Section */}
//         <div className="flex-1">
//           <HeroSection />
//         </div>

//         {/* Right: Calculator */}
//         {/* <div className="w-full max-w-md">
//           <CurrencyCalculator />
//         </div> */}
//       </div>

//       {/* Transfer Steps Instructional Section */}
//       <div className="flex justify-center px-4 py-12">
//         <TransferSteps />
//       </div>
//     </main>
//   );
// }

'use client';
import React, { useState } from 'react';
import Navbar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import CurrencyCalculator from '@/components/CurrencyCalculator';
import TransferSteps from '@/components/TransferSteps';
import StoreLocator from '@/components/StoreLocator';

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
        <div className="w-full max-w-7xl mx-auto py-12">
        < StoreLocator/>
      </div>
    </main>
  );
}
// 