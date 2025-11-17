"use client";

import React from "react";
import CurrencyCalculator from "./CurrencyCalculator";
import { scrollToSection } from "@/utils/navigation";

interface HeroSectionProps {
  setFinalPayAmount: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function HeroSection({ setFinalPayAmount }: HeroSectionProps) {
  return (
    <section id="hero" className="text-white py-3 px-4 sm:py-3 lg:py-5  sm:px-6 lg:px-8">
      <div className=" max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-start">
        {/* Left Text Content - Contains CAD badge and all text */}
        <div className="space-y-6 order-1 lg:order-1">
          {/* CAD Badge - Hidden on mobile, shown on desktop */}
          <div className="pt-4">
            <span className="bg-yellow-400 text-black font-bold text-lg px-3 py-1.5 rounded-full tracking-wider">🇨🇦 $ CAD
            </span>
          </div>

          <h1 className="text-5xl sm:text-5xl lg:text-7xl font-extrabold leading-tight">
             Quick, Reliable{" "}
             Money {" "}
            <span className="text-yellow-400">Transfers.</span>
          </h1>
          <p className="text-base sm:text-xl text-white leading-relaxed">
            Fast, reliable, and affordable international transfers. No hidden fees.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105"
            onClick={() => scrollToSection('locations')}>
              Find Locations
            </button>
          </div>
        </div>

        {/* Calculator */}
        <div className="py-4 w-full order-1 lg:order-2">
          
          <CurrencyCalculator setFinalPayAmount={setFinalPayAmount} />
        </div>
      </div>
    </section>
  );
}