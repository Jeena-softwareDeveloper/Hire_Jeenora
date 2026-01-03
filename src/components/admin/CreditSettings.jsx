import React, { useState, useEffect } from 'react';
import { useGetCreditSettings, useUpdateCreditSettings } from '../../hooks/useAdminSettings';
import { FaSave, FaCog, FaSpinner } from 'react-icons/fa';

const CreditSettings = () => {
    const { data: settings, isLoading } = useGetCreditSettings();
    const { mutate: updateSettings, isPending: isUpdating } = useUpdateCreditSettings();

    const [form, setForm] = useState({
        resumeEditCost: 0,
        jobApplyCost: 0,
        messageSendCost: 0
    });

    useEffect(() => {
        if (settings) {
            setForm({
                resumeEditCost: settings.resumeEditCost || 50,
                jobApplyCost: settings.jobApplyCost || 5,
                messageSendCost: settings.messageSendCost || 1
            });
        }
    }, [settings]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSettings(form);
    };

    if (isLoading) return <div className="p-4 flex items-center gap-2"><div className="animate-spin w-4 h-4 border-2 border-indigo-600 rounded-full border-t-transparent"></div> Loading settings...</div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-lg">
            <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                    <FaCog />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">Credit Settings</h3>
                    <p className="text-xs text-gray-500">Manage service costs and global fees</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Resume Edit Service Cost</label>
                    <div className="relative">
                        <input
                            type="number"
                            min="0"
                            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={form.resumeEditCost}
                            onChange={(e) => setForm({ ...form, resumeEditCost: Number(e.target.value) })}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">CREDITS</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 pl-1">Deducted when a candidate requests a professional edit.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Job Application</label>
                        <div className="relative">
                            <input
                                type="number"
                                min="0"
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={form.jobApplyCost}
                                onChange={(e) => setForm({ ...form, jobApplyCost: Number(e.target.value) })}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">CR</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Messaging</label>
                        <div className="relative">
                            <input
                                type="number"
                                min="0"
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={form.messageSendCost}
                                onChange={(e) => setForm({ ...form, messageSendCost: Number(e.target.value) })}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">CR</span>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="btn-premium w-full py-3"
                    >
                        {isUpdating ? <FaSpinner className="animate-spin" /> : <FaSave />}
                        Save Configuration
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreditSettings;

