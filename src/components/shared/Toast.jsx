import React, { useEffect, useState } from "react";
import ErrorIcon from "../icons/Error";
import WarningIcon from "../icons/Warning";
import SuccessIcon from "../icons/Success";
import InfoIcon from "../icons/Warning"; 
import NotificationIcon from "../icons/Success"; 

const Toast = ({ type = "Info", message, duration = 5000, onClose }) => {
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

  const currentToastStyle = toastStyles[type] || toastStyles.info; 

  return (
    <div
      className={`max-w-xs w-full mb-4 rounded-md shadow-lg border-l-4 border-${currentToastStyle.color} p-4 relative bg-white`}
    >
      <div className="flex items-center">
        <div className="mr-2">{currentToastStyle.icon}</div>{" "}
        {/* Render the icon here */}
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
