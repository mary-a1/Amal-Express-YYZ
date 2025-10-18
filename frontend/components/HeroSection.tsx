"use client";

import React from "react";
import CurrencyCalculator from "./CurrencyCalculator";

interface HeroSectionProps {
  setFinalPayAmount: React.Dispatch<React.SetStateAction<number | null>>;

}

export default function HeroSection({ setFinalPayAmount }: HeroSectionProps) {
  return (
    // <section className="bg-[#0D0C1D] text-white py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Send Money Smarter, Faster, <br />
            <span className="text-yellow-400">Everywhere.</span>
          </h1>
          <p className="text-lg text-gray-300">
            A simpler way to move money — transparent rates, no hidden fees, and
            transfers that just work.
          </p>

          {/* How It Works Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-left">
            <div>
              <h2 className="text-yellow-400 font-bold text-2xl mb-2">1</h2>
              <h3 className="font-semibold">Enter your amount</h3>
              <p className="text-gray-400 text-sm">
                Choose how much to send or receive — we’ll show exchange rates
                instantly.
              </p>
            </div>
            <div>
              <h2 className="text-yellow-400 font-bold text-2xl mb-2">2</h2>
              <h3 className="font-semibold">E-transfer your total</h3>
              <p className="text-gray-400 text-sm">
                Send the total in CAD to remit@amaltransfers.ca including your
                recipient’s name.
              </p>
            </div>
            <div>
              <h2 className="text-yellow-400 font-bold text-2xl mb-2">3</h2>
              <h3 className="font-semibold">We deliver your funds</h3>
              <p className="text-gray-400 text-sm">
                Once your e-transfer arrives we process and confirm your
                transfer right away.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Placeholder (Calculator or Image goes here later) */}
        <div className="relative"> 
          {/* We can insert <CurrencyCalculator /> here later */}
          <div className="bg-white text-black rounded-xl shadow-lg p-6 md:p-8">
            <CurrencyCalculator setFinalPayAmount={setFinalPayAmount}/>
          </div>
        </div>
      </div>
    // </section>
  );
}
