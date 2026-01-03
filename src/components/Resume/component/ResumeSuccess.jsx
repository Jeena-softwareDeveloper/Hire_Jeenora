import React from 'react';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const ResumeSuccess = ({ selectedEditor, deliveryDate, resetOrder }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full">
                <div className="bg-white rounded-2xl shadow-xl border border-green-200 p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCheckCircle className="text-green-800 text-4xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
                    <p className="text-gray-600 mb-8 text-lg">
                        Your resume has been sent to <strong>{selectedEditor?.name}</strong> for professional editing.
                        You'll receive your enhanced resume by <strong>{deliveryDate}</strong>.
                    </p>
                    <button
                        onClick={resetOrder}
                        className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold mx-auto"
                    >
                        <FaArrowLeft /> Create New Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeSuccess;

