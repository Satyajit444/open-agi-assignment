import React from "react";
import { useFormContext } from "../context/FormContext";

const Navbar = () => {
  const { handleNavButtonClick } = useFormContext();

  return (
    <nav className="fixed top-0 left-0 w-full p-4 bg-gray-800 text-white flex justify-between items-center">
      <div className="logo">Your Logo</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleNavButtonClick}
      >
        Submit All Forms
      </button>
    </nav>
  );
};

export default Navbar;
