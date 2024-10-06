import React from "react";
import { useFormContext } from "../context/FormContext";
import { useToast } from "../context/ToastContext";

const Navbar = () => {
  const { handleNavButtonClick } = useFormContext();
  const { showToast } = useToast();
const handleDeploy =()=>{
  showToast({
    toastType: "success",
    message: "This is a warning message",
  });
}
  return (
    <nav className="fixed top-0 left-0 w-full p-4 bg-gray-800 text-white flex justify-between items-center">
      <div className="logo">Your Logo</div>
      <button onClick={handleDeploy}>Deploy</button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleNavButtonClick}
      >
        Run
      </button>
    </nav>
  );
};

export default Navbar;
