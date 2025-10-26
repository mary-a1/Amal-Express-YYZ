"use client";

import React from 'react';
import { scrollToSection } from '@/utils/navigation'; // or '@/lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[linear-gradient(160deg,#020024_0%,#050038_40%,#07002f_100%)] text-white border-t border-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 m-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="logo-amal-express.png" alt="Amal Express" className="h-12 w-auto" />
              <div>
                <p className="text-yellow-400 text-sm font-bold tracking-wide">YYZ Toronto</p>
              </div>
            </div>
            <p className="text-gray-300 text-base mb-4 leading-relaxed">
              A simpler way to move money — transparent rates, no hidden fees, and transfers that just work.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lgmb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('hero')} className="text-gray-400 text-lg hover:text-yellow-400 transition">
                  Home
                </button>
              </li>
              <li>
                <a href="/about" className="text-gray-400 text-lg hover:text-yellow-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('steps')} className="text-gray-400 text-lg hover:text-yellow-400 transition">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('locations')} className="text-gray-400 text-lg hover:text-yellow-400 transition">
                  Find Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lgmb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📧</span>
                <a href="mailto:remit@amaltransfers.ca" className="hover:text-yellow-400 text-lg transition">
                  remit@amaltransfers.ca
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                <a href="tel:416-245-0805" className="hover:text-yellow-400 text-lg transition">
                  416-245-0805
                </a>
              </li>
              <li className="flex items-start text-lg">
                <span className="mr-2">📍</span>
                <span>Toronto, ON (YYZ)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-base text-gray-300">
          <p>&copy; {currentYear} Amal Express YYZ. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}