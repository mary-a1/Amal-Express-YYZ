"use client";

import React from 'react';
import { MapPin, MessageCircle, Headphones, Phone } from 'lucide-react';

export default function Contact() {
  const openWhatsApp = () => {
    window.open('https://wa.me/14162450805', '_blank');
  };

  const callPhone = () => {
    window.location.href = 'tel:+14162450805';
  };

  const openGoogleMaps = () => {
    const address = encodeURIComponent('#4-2086 Lawrence Avenue West, Toronto ON M9N 3Z9');
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
  };

  return (
    <section id="contact" className=" text-white py-3 px-4 sm:py-3 sm:px-6 lg:px-8 lg:py-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6 lg:gap-16 items-center">

          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Contact Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-md">
              We're here to help with your money transfer needs. Whether you want to
              send funds, track a transfer, or learn more about our services, our team
              is ready to assist you.
            </p>
          </div>

          {/* Right Side - Contact Cards */}
          <div className="space-y-6">

            {/* Card 1: Head Office */}
            <div
              onClick={openGoogleMaps}
              className="bg-[#1a1a3e] rounded-2xl p-6 flex items-start gap-4 hover:bg-[#232350] transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#070724] rounded-full flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-yellow-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Head Office</h3>
                <p className="text-lg text-gray-300 font-medium">Amal Transfer</p>
                <p className="text-base text-gray-400 mt-1">
                  #4-2086 Lawrence Avenue West, Toronto ON M9N 3Z9
                </p>
              </div>
            </div>

            {/* Card 2: Chat On WhatsApp */}
            <div
              onClick={openWhatsApp}
              className="bg-[#1a1a3e] rounded-2xl p-6 flex items-start gap-4 hover:bg-[#232350] transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#070724] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-yellow-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Chat On Whatsapp</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    callPhone();
                  }}
                  className="text-lg text-gray-300 hover:text-yellow-400 transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  416-245-0805
                </button>
              </div>
            </div>

            {/* Card 3: Online Support */}
            <div className="bg-[#1a1a3e] rounded-2xl p-6 flex items-start gap-4 hover:bg-[#232350] transition-colors">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#070724] rounded-full flex items-center justify-center">
                  <Headphones className="w-7 h-7 text-yellow-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Online Support</h3>
                <p className="text-base text-gray-400">
                  You can contact us directly at{' '}
                  <button
                    onClick={callPhone}
                    className="text-gray-300 hover:text-yellow-400 transition"
                  >
                    416-245-0805
                  </button>
                  {' '}or send us a message on WhatsApp for quick assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}