import React, { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent text-white ">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          <img src="logo-amal-express.png" alt="Amal Express Logo" className="h-20 w-auto" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <a href="#" className="hover:text-yellow-400 transition">Home</a>
          <a href="#" className="hover:text-yellow-400 transition">About</a>
          <a href="#" className="hover:text-yellow-400 transition">Contact</a>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 lg:px-6 rounded-full transition">
            Find Locations
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden bg-yellow-400 text-black px-3 py-2 rounded font-bold"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <a href="#" className="hover:text-yellow-400 transition text-base font-medium">Home</a>
          <a href="#" className="hover:text-yellow-400 transition text-base font-medium">About</a>
          <a href="#" className="hover:text-yellow-400 transition text-base font-medium">Locations</a>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 px-6 lg:px-8 rounded-full transition text-base">
            Find Locations
          </button>
        </div>
      )}
    </nav>
  );
}