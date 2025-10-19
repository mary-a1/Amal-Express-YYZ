"use client";

import React from "react";
import CurrencyCalculator from "./CurrencyCalculator";

interface HeroSectionProps {
  setFinalPayAmount: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function HeroSection({ setFinalPayAmount }: HeroSectionProps) {
  return (
    <section className="bg-[#0D0C1D] text-white py-3 px-4 sm:py-3 lg:py-5  sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Text Content */}
        <div className="space-y-6 order-2 lg:order-1">
            <p className="font-bold text-xl">Welcome to Amal Express Canada  </p>
          <div className="">
            <span className="bg-yellow-400 text-black font-bold text-sm px-1 py-1.5 rounded-full tracking-wider">🇨🇦 $ CAD 
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Send Money Smarter, Faster,{" "}
            <span className="text-yellow-400">Everywhere.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            A simpler way to move money — transparent rates, no hidden fees, and
            transfers that just work.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105">
              Find Locations
            </button>
            <button className="border-2 border-yellow-400 text-white hover:bg-yellow-400 hover:text-black font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105">
              Get a Quote
            </button>
          </div>
        </div>

        {/* Calculator - NO extra wrapper */}
        <div className="w-full order-1 lg:order-2">
          <CurrencyCalculator setFinalPayAmount={setFinalPayAmount} />
        </div>
      </div>
    </section>
  );
}