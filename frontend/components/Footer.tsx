"use client";

import React from 'react';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const openWhatsApp = () => {
    window.open('https://wa.me/14162450805', '_blank');
  };

  const callPhone = () => {
    window.location.href = 'tel:+14162450805';
  };

  const sendEmail = () => {
    window.location.href = 'mailto:amaltransfers@gmail.com';
  };

  return (
    <footer className="bg-[linear-gradient(160deg,#020024_0%,#050038_40%,#07002f_100%)] text-white border-t border-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 m-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="flex items-center">
            <img
              src="/AMAL.png"
              alt="Amal Transfers Logo"
              className="h-12 sm:h-14 lg:h-16 w-auto"
            />
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-300 hover:text-yellow-400 transition text-base">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#locations" className="text-gray-300 hover:text-yellow-400 transition text-base">
                  Locations
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-gray-300 hover:text-yellow-400 transition text-base">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="/about#privacy" className="text-gray-300 hover:text-yellow-400 transition text-base">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/about#terms" className="text-gray-300 hover:text-yellow-400 transition text-base">
                  Terms and conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={openWhatsApp}
                  className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition text-base group"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <span>416-245-0805</span>
                </button>
              </li>
              <li>
                <button
                  onClick={callPhone}
                  className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition text-base"
                >
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <span>416-245-0805</span>
                </button>
              </li>
              <li>
                <button
                  onClick={sendEmail}
                  className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition text-base"
                >
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <span>amaltransfers@gmail.com</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Amal Express YYZ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}