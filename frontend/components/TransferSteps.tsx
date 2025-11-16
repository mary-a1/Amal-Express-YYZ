"use client";

import React, { useState } from "react";
import { Building2, Smartphone, Mail, Banknote } from 'lucide-react';

interface TransferStepsProps {
  finalPayAmount: number | null;
}

export default function TransferSteps({ finalPayAmount }: TransferStepsProps) {
  // State Management
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');

  // Navigation Functions
  const scrollToLocations = () => {
    const element = document.getElementById('locations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openDownloadApp = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    
    // iOS Detection
    if (/iPad|Mac|iPhone|iPod/.test(userAgent)) {
      window.open('https://apps.apple.com/in/app/wirenations/id6450109068', '_blank');
    }
    // Android Detection
    else if (/android/i.test(userAgent)) {
      window.open('https://play.google.com/store/apps/details?id=com.wirenations&hl=en_CA', '_blank');
    }
    // Desktop/Other - Default to Play Store
    else {
      window.open('https://play.google.com/store/apps/details?id=com.wirenations&hl=en_CA', '_blank');
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/14162450805', '_blank');
  };

  return (
    <div id="steps" className="bg-transparent text-white py-3 px-4 sm:py-3 sm:px-6 lg:px-8 lg:py-5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
            <span className="text-white">Send and Receive money</span>
          </h2>
          
          {/* Dynamic Subtitle Based on Active Tab */}
          <p className="text-center text-white mb-8 sm:text-xl max-w-3xl mx-auto">
            {activeTab === 'send' 
              ? 'Sending money with Amal Transfers is simple, transparent, and secure.'
              : 'Receiving money with Amal Transfers is simple, transparent, and secure.'
            }
          </p>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setActiveTab('send')}
              className={`px-8 py-3 rounded-lg font-semibold text-base sm:text-lg transition-all ${
                activeTab === 'send'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-transparent text-yellow-400 border-2 border-yellow-400'
              }`}
            >
              Send Money
            </button>
            <button
              onClick={() => setActiveTab('receive')}
              className={`px-8 py-3 rounded-lg font-semibold text-base sm:text-lg transition-all ${
                activeTab === 'receive'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-transparent text-yellow-400 border-2 border-yellow-400'
              }`}
            >
              Receive Money
            </button>
          </div>
        </div>

        {/* Conditional Content Based on Active Tab */}
        {activeTab === 'send' ? (
          // Send Money - 3 Cards
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Send Card 1: Send in Person */}
            <div className="bg-[#1a1a3e] rounded-2xl p-8 text-center flex flex-col items-center hover:bg-[#232350] transition-all duration-200">
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
                className="w-full bg-transparent text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Find a Location
              </button>
            </div>

            {/* Send Card 2: Send with Our App */}
            <div className="bg-[#1a1a3e] rounded-2xl p-8 text-center flex flex-col items-center hover:bg-[#232350] transition-all duration-200">
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
                className="w-full bg-transparent text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Download App
              </button>
            </div>

            {/* Send Card 3: Send by E-transfer */}
            <div className="bg-[#1a1a3e] rounded-2xl p-8 text-center flex flex-col items-center hover:bg-[#232350] transition-all duration-200">
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
                className="w-full bg-transparent text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        ) : (
          // Receive Money - 2 Cards
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            
            {/* Receive Card 1: Cash Pickup */}
            <div className="bg-[#1a1a3e] rounded-2xl p-8 text-center flex flex-col items-center hover:bg-[#232350] transition-all duration-200">
              <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mb-6">
                <Banknote className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-white text-xl font-bold mb-4">Cash Pickup</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                Pick up your cash in person from one of our authorized locations. 
                Bring a valid ID and your reference number to collect your funds quickly.
              </p>
              <button
                onClick={scrollToLocations}
                className="w-full bg-transparent text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Find a Location
              </button>
            </div>

            {/* Receive Card 2: Interac E-Transfer or Bank Deposit */}
            <div className="bg-[#1a1a3e] rounded-2xl p-8 text-center flex flex-col items-center hover:bg-[#232350] transition-all duration-200">
              <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-white text-xl font-bold mb-4">Interac E-Transfer or Bank Deposit</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                Contact us to confirm and claim your deposit through Interac e-Transfer 
                or direct bank deposit. Our team will guide you through the simple process.
              </p>
              <button
                onClick={openWhatsApp}
                className="w-full bg-transparent text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}