import React from 'react';
import { FaAward, FaRocket } from 'react-icons/fa';

const ResumeChoice = ({ handleResumeOptionSelect }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How would you like to proceed?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => handleResumeOptionSelect('existing')}
                    className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-xl hover:border-green-800 hover:bg-green-50 transition-all group"
                >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FaAward className="text-blue-600 text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">I have a Resume</h3>
                    <p className="text-gray-500 text-sm">Select an existing resume and tailor it for a specific job</p>
                </button>

                <button
                    onClick={() => handleResumeOptionSelect('new')}
                    className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-xl hover:border-green-800 hover:bg-green-50 transition-all group"
                >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FaRocket className="text-green-600 text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Upload New</h3>
                    <p className="text-gray-500 text-sm">Upload a new resume file to specificy requirements</p>
                </button>
            </div>
        </div>
    );
};

export default ResumeChoice;

