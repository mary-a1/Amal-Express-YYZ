import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <img src="/logo.svg" alt="Amal Express Logo" className="h-8 w-8" />
        <span className="font-bold text-xl text-gray-800">Amal Express</span>
      </div>

      <div className="hidden md:flex items-center space-x-6 text-gray-700">
        <a href="#" className="hover:text-blue-600">Home</a>
        <a href="#" className="hover:text-blue-600">About</a>
        <a href="#" className="hover:text-blue-600">Contact</a>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full">
          Find Locations
        </button>
      </div>
    </nav>
  );
}
