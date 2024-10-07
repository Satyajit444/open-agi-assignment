import React, { useEffect, useState } from "react";
import ErrorIcon from "../icons/Error";
import WarningIcon from "../icons/Warning";
import SuccessIcon from "../icons/Success";
import InfoIcon from "../icons/Warning";
import NotificationIcon from "../icons/Success";

const Toast = ({ type = "info", message, title, duration = 3000, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          onClose();
          return 100;
        }
        return oldProgress + 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  const toastStyles = {
    error: { icon: <ErrorIcon />, color: "red" },
    warning: { icon: <WarningIcon />, color: "orange" },
    info: { icon: <InfoIcon />, color: "blue" },
    success: { icon: <SuccessIcon />, color: "green" },
    notification: { icon: <NotificationIcon />, color: "gray" },
  };

  const currentToastStyle = toastStyles[type];

  return (
    <div
      className={`max-w-sm w-full mb-4 rounded-md shadow-lg bg-white border-l-4 border-${currentToastStyle.color}-500 p-4 relative`}
    >
      <div className="flex items-start gap-3">
        <div className="mr-2">{currentToastStyle.icon}</div>
        <div>
          <p className="text-sm font-semibold text-${currentToastStyle.color}-500">
            {title}
          </p>
          <p className="text-sm text-${currentToastStyle.color}-500">
            {message}
          </p>
        </div>
        <button onClick={onClose} className="ml-auto">
          <svg
            fill="red"
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
      {/* Progress bar at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-${currentToastStyle.color}-500`}
          style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
        />
      </div>
    </div>
  );
};

export default Toast;
