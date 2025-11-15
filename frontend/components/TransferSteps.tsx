"use client";

import React, { useState } from "react";
import { Building2, Smartphone, Mail } from 'lucide-react'; // ← NEW: Import icons

interface TransferStepsProps {
  finalPayAmount: number | null;
}

export default function TransferSteps({ finalPayAmount }: TransferStepsProps) {
  // ← NEW: Add state for toggle
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');

  // ← NEW: Function to scroll to locations
  const scrollToLocations = () => {
    const element = document.getElementById('locations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ← NEW: Function to open app store (detects iOS vs Android)
  const openDownloadApp = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    
    // Check if iOS
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.open('https://apps.apple.com/in/app/wirenations/id6450109068', '_blank');
    }
    // Check if Android
    else if (/android/i.test(userAgent)) {
      window.open('https://play.google.com/store/apps/details?id=com.wirenations&hl=en_CA', '_blank');
    }
    // Default to Play Store for desktop/other
    else {
      window.open('https://play.google.com/store/apps/details?id=com.wirenations&hl=en_CA', '_blank');
    }
  };

  // ← NEW: Function to open WhatsApp
  const openWhatsApp = () => {
    window.open('https://wa.me/14162450805', '_blank');
  };

  return (
    <>
      {/* ← MODIFIED: Changed from "3 Easy Steps" to "Send and Receive money" */}
      <div id="steps" className="bg-transparent text-white py-3 px-4 sm:py-3 sm:px-6 lg:px-8 lg:py-5">
        <div className="max-w-7xl mx-auto">
          {/* ← MODIFIED: New header with toggle buttons */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
              <span className="text-white">Send and Receive money</span>
            </h2>
            <p className="text-center text-white mb-2 sm:text-xl max-w-3xl mx-auto">
              Sending money with Amal Transfers is simple, transparent, and secure.
            </p>
            <p className="text-center text-white mb-8 sm:text-xl max-w-3xl mx-auto">
              Follow these steps to complete your transfer in minutes.
            </p>

            {/* ← NEW: Toggle Buttons */}
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setActiveTab('send')}
                className={`px-8 py-3 rounded-lg font-semibold text-base sm:text-lg transition-all ${
                  activeTab === 'send'
                    ? 'bg-yellow-400 text-black'
                    : 'bg-transparent text-yellow-400 border-2 border-[#F5C32C]'
                }`}
              >
                Send Money
              </button>
              <button
                onClick={() => setActiveTab('receive')}
                className={`px-8 py-3 rounded-lg font-semibold text-base sm:text-lg transition-all ${
                  activeTab === 'receive'
                    ? 'bg-yellow-400 text-black'
                    : 'bg-transparent text-yellow-400 border-2 border-[#F5C32C]'
                }`}
              >
                Receive Money
              </button>
            </div>
          </div>

          {/* ← NEW: Conditional content based on active tab */}
          {activeTab === 'send' ? (
            // ← MODIFIED: New card design for Send Money
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: Send in Person */}
              <div className="bg-[#111229] rounded-2xl p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-white text-xl font-bold mb-4">Send in Person</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                  Visit one of our authorized branches to send money safely and quickly.
                  Our staff will verify your ID and complete the transfer for you.
                </p>
                <button
                  onClick={scrollToLocations}
                  className="w-full bg-transparent text-yellow-400 border-2 border-[#F5C32C] hover:bg-yellow-400 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  Find a Location
                </button>
              </div>

              {/* Card 2: Send with Our App */}
              <div className="bg-[#111229] rounded-2xl p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mb-6">
                  <Smartphone className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-white text-xl font-bold mb-4">Send with Our App</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                  Download the Wirenations app to send money anytime, anywhere.
                  Enjoy instant transfers, secure login, and full transaction tracking.
                </p>
                <button
                  onClick={openDownloadApp}
                  className="w-full bg-transparent text-yellow-400 border-2 border-[#F5C32C] hover:bg-yellow-400 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  Download App
                </button>
              </div>

              {/* Card 3: Send by E-transfer */}
              <div className="bg-[#111229] rounded-2xl p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mb-6">
                  <Mail className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-white text-xl font-bold mb-4">Send by E-transfer</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                  Prefer Interac e-Transfer? Contact us to set up your e-Transfer
                  profile and start sending right away.
                </p>
                <button
                  onClick={openWhatsApp}
                  className="w-full bg-transparent text-yellow-400 border-2 border-[#F5C32C] hover:bg-yellow-400 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  Contact Us
                </button>
              </div>
            </div>
          ) : (
            // ← NEW: Receive Money placeholder
            <div className="text-center py-16">
              <div className="max-w-md mx-auto bg-[#111229] rounded-2xl p-12">
                <Mail className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                <h3 className="text-white text-2xl font-bold mb-4">
                  Receive Money options coming soon.
                </h3>
                <p className="text-gray-300 text-base">
                  We're working on adding receive money features. Stay tuned for updates!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}