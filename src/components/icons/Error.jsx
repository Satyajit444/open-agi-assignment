import React from "react";

const Error = ({ color, size }) => {
  return (
    <div className="rounded-full p-2 border-[1px] border-white bg-red-600 text-white">
      <svg
        className="w-3 h-3 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </div>
  );
};

export default Error;
