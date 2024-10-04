import React from "react";

const Navbar = () => {
  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 max-h-20 w-full flex justify-between items-center p-4 bg-gray-800 text-white">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img
            src="/path-to-logo/logo.png" // Replace with your logo path
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="text-lg font-semibold">Your Logo</span>
        </div>

        {/* Buttons on the right */}
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Deploy
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Run
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
