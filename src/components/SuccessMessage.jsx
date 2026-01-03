import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessMessage = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-center">
          <FaCheckCircle className="text-green-600 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-green-800 font-medium text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-green-600 hover:text-green-800 transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
