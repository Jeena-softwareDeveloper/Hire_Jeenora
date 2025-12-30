import React, { useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";

const Notification = ({ message, type = "error", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "error"
      ? "bg-green-100 border-green-700 text-green-900"
      : "bg-green-100 border-green-700 text-green-900";

  return (
    <div
      className={`fixed top-5 right-5 max-w-xs sm:max-w-sm px-4 py-3 rounded-lg shadow-md border ${bgColor} z-50 flex items-center justify-between gap-3 animate-fadeIn`}
    >
      <span className="text-sm font-semibold">{message}</span>
      <FaTimesCircle
        className="cursor-pointer text-green-900 hover:text-green-900"
        onClick={onClose}
      />
    </div>
  );
};

export default Notification;
