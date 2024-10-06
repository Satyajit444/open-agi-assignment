import React, { useEffect, useState } from "react";

const Toast = ({ type, message, duration = 5000, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          onClose(); // Automatically close the toast when the progress reaches 100%
          return 100;
        }
        return oldProgress + 100 / (duration / 100); // Increase the progress based on the duration
      });
    }, 100);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [duration, onClose]);

  const toastStyles = {
    Error: "border-red-500 bg-red-100 text-red-700",
    Warning: "border-yellow-500 bg-yellow-100 text-yellow-700",
    Info: "border-blue-500 bg-blue-100 text-blue-700",
    Success: "border-green-500 bg-green-100 text-green-700",
    Notification: "border-purple-500 bg-purple-100 text-purple-700",
  };

  return (
    <div
      className={`max-w-xs w-full mb-4 rounded-md shadow-lg border-l-4 ${toastStyles[type]} p-4 relative`}
    >
      <div className="flex items-center">
        <div className="mr-2">
          <img
            src={`/svg/icon-${type.toLowerCase()}.svg`} // Assuming the icons are named like this
            alt={`${type} icon`}
            className="w-6 h-6"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">{type}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-1 bg-blue-500"
        style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
      ></div>
    </div>
  );
};

export default Toast;
