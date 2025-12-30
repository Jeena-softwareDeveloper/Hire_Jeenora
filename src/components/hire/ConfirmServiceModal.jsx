import React, { useState, useEffect } from 'react';
import { FaTimes, FaCoins, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useGetCreditSettings } from '../../hooks/useAdminSettings';
import useAuthStore from '../../store/useAuthStore';

const ConfirmServiceModal = ({ onClose, onConfirm, loading }) => {
    const { data: settings, isLoading: settingsLoading } = useGetCreditSettings();
    const userInfo = useAuthStore(state => state.userInfo);
    const refreshUser = useAuthStore(state => state.refreshUser);

    // Default to 50 if loading or not set (fallback matches backend)
    const cost = settings?.resumeEditCost || 50;
    const hasEnoughCredits = (userInfo?.creditBalance || 0) >= cost;

    // Refresh user to get latest balance when modal opens
    useEffect(() => {
        refreshUser();
    }, []);

    if (settingsLoading) {
        return (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-fadeIn">
                <div className="bg-white p-6 rounded-xl shadow-xl flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600 font-medium">Checking costs...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-fadeIn">
            <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-slideUp relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors"
                >
                    <FaTimes size={14} />
                </button>

                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 shadow-sm">
                        <FaCoins size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Service Request</h3>
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                        You are about to request a professional resume edit.
                        This service uses credits from your balance.
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500 font-medium text-sm">Service Cost</span>
                            <span className="text-indigo-600 font-bold text-lg">-{cost} Credits</span>
                        </div>
                        <div className="h-px bg-gray-200 w-full mb-4"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-medium text-sm">Your Balance</span>
                            <span className={`font-bold text-lg ${hasEnoughCredits ? 'text-green-600' : 'text-red-500'}`}>
                                {userInfo?.creditBalance || 0} Credits
                            </span>
                        </div>
                    </div>

                    {!hasEnoughCredits && (
                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-start gap-3 text-left">
                            <FaExclamationTriangle className="mt-0.5 shrink-0" />
                            <p className="text-sm font-medium">Insufficient credits. Please top up your wallet to proceed.</p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={!hasEnoughCredits || loading}
                            className={`flex-1 py-3.5 rounded-xl text-white font-bold text-sm shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 transition-all
                                ${!hasEnoughCredits || loading
                                    ? 'bg-gray-300 cursor-not-allowed shadow-none'
                                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
                                }
                            `}
                        >
                            {loading ? 'Processing...' : 'Confirm & Pay'}
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
                .animate-slideUp { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </div>
    );
};

export default ConfirmServiceModal;
