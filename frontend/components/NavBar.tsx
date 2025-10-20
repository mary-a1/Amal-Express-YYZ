import React, { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <nav className="bg-transparent text-white border-b-2 border-yellow-500 ">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          <img src="logo-amal-express.png" alt="Amal Express Logo" className="h-20 w-auto" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <button onClick={() => scrollToSection('hero')} className="hover:text-yellow-400 transition font-bold text-xl">
            Home
          </button>
          <button onClick={() => scrollToSection('steps')} className="hover:text-yellow-400 transition font-bold text-xl">
            Transfer Steps
          </button>
          {/* <button onClick={() => scrollToSection('contact')} className="hover:text-yellow-400 transition font-bold text-xl">
            Contact
          </button> */}
          <button onClick={() => scrollToSection('locations')} className="bg-yellow-400 hover:bg-yellow-500 text-black py-2.5 px-6 lg:px-8 rounded-full transition font-bold text-xl">
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

      {/* Mobile Menu Dropdown - FIXED */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0D0C1D] px-4 py-4 space-y-3">
          <button onClick={() => scrollToSection('hero')} className="block w-full text-left hover:text-yellow-400 transition py-2 font-medium">
            Home
          </button>
          <button onClick={() => scrollToSection('steps')} className="block w-full text-left hover:text-yellow-400 transition py-2 font-medium">
            Transfer Steps
          </button>
          {/* <button onClick={() => scrollToSection('contact')} className="block w-full text-left hover:text-yellow-400 transition py-2 font-medium">
            Contact
          </button> */}
          <button onClick={() => scrollToSection('locations')} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full transition">
            Find Locations
          </button>
        </div>
      )}
    </nav>
  );
}