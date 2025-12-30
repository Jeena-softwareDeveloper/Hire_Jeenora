import React from 'react';
import {
  FaStar,
  FaUser,
  FaClock,
  FaRupeeSign,
  FaCheck,
  FaBriefcase,
  FaEye,
  FaHeart
} from 'react-icons/fa';

const ResumeEditor = ({ editor, isSelected, onSelect, onViewProfile }) => {
  if (!editor) return null;

  const getSuccessRateColor = (rate) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div
      className={`bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 ${isSelected ? 'border-green-600 ring-1 ring-green-600 bg-green-50' : 'border-gray-200'
        }`}
    >
      <div className='flex items-center justify-start gap-5'>
        <div className="flex justify-center mb-4 relative">
          <div>
            <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold relative overflow-hidden">
              {editor.profileImageUrl ? (
                <img
                  src={editor.profileImageUrl}
                  alt={editor.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUser className="text-white text-2xl" />
              )}
            </div>
          </div>

          {editor.isOnline && (
            <div className="absolute bottom-1 right-8 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div className=''>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {editor.name}
          </h3>

          <p className="text-green-700 font-medium text-sm">
            {editor.specialization}
          </p>
        </div>

      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          <span className="text-sm font-medium text-gray-900">
            {(editor.rating || 0).toFixed(1)}
          </span>
        </div>
        <span className="text-gray-500 text-sm">
          ({editor.totalReviews || 0} reviews)
        </span>
      </div>

      {/* Key Features */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaBriefcase className="text-green-600" />
          <span>{editor.experience || 0} years experience</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaCheck className="text-blue-600" />
          <span>{editor.completedJobs || 0} jobs completed</span>
        </div>
        <div className={`flex items-center gap-2 text-sm font-medium ${getSuccessRateColor(editor.successRate || 0)}`}>
          <FaStar className="text-orange-500" />
          <span>{editor.successRate || 0}% success rate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-green-900 font-normal">
            <span>Original Credits: </span>
            <span className="font-medium ml-1">{(editor.originalPrice || 0).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Price Section */}

      <div className="flex items-center gap-1 text-gray-600 text-sm">
        <FaClock className="text-xs" />
        <span>{editor.deliveryTime || 'N/A'} days</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-green-700 font-bold text-lg">
            <span>{(editor.price || 0).toLocaleString()} Credits</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onViewProfile(editor)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-2"
        >
          <FaEye size={14} />
          View
        </button>
        <button
          onClick={() => onSelect(editor)}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
        >
          Select
        </button>
      </div>

      {/* Additional Info */}
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {editor.isVerified ? '✓ Verified' : 'Not Verified'}
        </span>
        <button className="text-gray-400 hover:text-red-500 transition-colors">
          <FaHeart className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default ResumeEditor;