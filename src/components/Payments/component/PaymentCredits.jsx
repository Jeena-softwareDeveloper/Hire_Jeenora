import React from 'react';
import { motion } from 'framer-motion';
import { FaDatabase, FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';

const PaymentCredits = ({ creditSettings, credits, setCredits, handlePurchaseCredits, isCreditMaintenance, credPending }) => {
    if (isCreditMaintenance) {
        return (
            <div className="bg-indigo-50/50 p-12 rounded-[2.5rem] border-2 border-dashed border-indigo-100 text-center">
                <FaDatabase className="text-4xl text-indigo-200 mx-auto mb-6" />
                <h3 className="text-xl font-black text-indigo-900 uppercase tracking-tighter mb-2">Credit Vault Maintenance</h3>
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest leading-loose">The economic ecosystem is being recalibrated. Back online soon.</p>
            </div>
        );
    }

    const services = [
        { label: "Job Applications", cost: creditSettings?.jobApplyCost, active: creditSettings?.jobApplyEnabled },
        { label: "Direct Messages", cost: creditSettings?.messageSendCost, active: creditSettings?.messageSendEnabled },
        { label: "Resume Services", cost: creditSettings?.resumeEditCost, active: creditSettings?.resumeEditEnabled },
        { label: "Inquiry Support", cost: creditSettings?.supportInquiryCost, active: true },
        { label: "Live Support", cost: creditSettings?.chatEnableCost, active: creditSettings?.chatEnableEnabled }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-8">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-100/20">
                    <h3 className="text-xl font-black text-indigo-950 uppercase tracking-tighter mb-8">Asset Acquisition</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Credit Volume</label>
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{credits} Credits</span>
                            </div>
                            <input type="range" min={creditSettings?.minPurchaseCredits || 30} max="1000" step="10" value={credits} onChange={(e) => setCredits(Number(e.target.value))} className="w-full h-1.5 bg-indigo-50 rounded-full appearance-none cursor-pointer accent-indigo-600" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Unit Price</p>
                                <p className="text-lg font-black text-indigo-950">₹{creditSettings?.perCreditCostINR}<span className="text-[10px] text-slate-400 ml-1">/ CR</span></p>
                            </div>
                            <div className="p-5 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200">
                                <p className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-1">Total Payable</p>
                                <p className="text-lg font-black text-white">₹{credits * (creditSettings?.perCreditCostINR || 0)}</p>
                            </div>
                        </div>
                        <button onClick={handlePurchaseCredits} disabled={credPending} className="w-full bg-[#1E1B4B] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl shadow-indigo-200">Initialize Transaction</button>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-5">
                <div className="bg-[#1E1B4B] p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8 relative z-10">Economic Utility Matrix</h4>
                    <div className="space-y-6 relative z-10">
                        {services.filter(s => s.active).map((service, i) => (
                            <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="flex items-center gap-3">
                                    <FaCheckCircle className="text-indigo-400" size={12} />
                                    <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">{service.label}</span>
                                </div>
                                <span className="text-[11px] font-black text-indigo-300 uppercase tracking-widest">{service.cost} CR</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCredits;
