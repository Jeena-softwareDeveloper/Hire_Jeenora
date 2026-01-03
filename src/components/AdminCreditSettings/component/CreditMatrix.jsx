import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaGem, FaStar, FaCrown, FaShieldAlt } from "react-icons/fa";

const CreditMatrix = ({ settings, updateField }) => {
    if (!settings) return null;

    const items = [
        { label: "Job Application", field: "jobApplyCost", enabled: "jobApplyEnabled", icon: <FaRocket /> },
        { label: "Direct Messaging", field: "messageSendCost", enabled: "messageSendEnabled", icon: <FaGem /> },
        { label: "Resume Services", field: "resumeEditCost", enabled: "resumeEditEnabled", icon: <FaStar /> },
        { label: "Chat Activation", field: "chatEnableCost", enabled: "chatEnableEnabled", icon: <FaCrown /> }
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex items-center justify-between bg-white/50 p-6 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shadow-inner"><FaShieldAlt /></div>
                    <div>
                        <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Global Marketplace Status</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Toggle Maintenance Mode</p>
                    </div>
                </div>
                <button onClick={() => updateField('creditsComingSoon', !settings.creditsComingSoon)} className={`w-14 h-7 rounded-full transition-all relative ${settings.creditsComingSoon ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${settings.creditsComingSoon ? 'left-8' : 'left-1'}`}></div>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 group hover:border-indigo-100 transition-all shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shadow-inner">{item.icon}</div>
                                <span className="text-[10px] font-black text-indigo-950 uppercase tracking-widest">{item.label} COST</span>
                            </div>
                            <button onClick={() => updateField(item.enabled, !settings[item.enabled])} className={`w-10 h-5 rounded-full transition-all relative ${settings[item.enabled] ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${settings[item.enabled] ? 'left-5.5' : 'left-0.5'}`}></div>
                            </button>
                        </div>
                        <input type="number" value={settings[item.field]} onChange={(e) => updateField(item.field, Number(e.target.value))} className="w-full bg-slate-50 border-none rounded-xl h-12 px-4 text-xs font-black text-indigo-950 focus:ring-2 focus:ring-indigo-500/10 transition-all font-mono" />
                    </div>
                ))}
            </div>

            <div className="bg-[#1E1B4B] p-8 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-3 gap-8 shadow-2xl">
                {[
                    { label: "Min Purchase (CR)", field: "minPurchaseCredits" },
                    { label: "Cost/CR (INR)", field: "perCreditCostINR" },
                    { label: "Sign-up Bonus (CR)", field: "initialFreeCredits" }
                ].map((input, i) => (
                    <div key={i}>
                        <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-3 block">{input.label}</label>
                        <input type="number" value={settings[input.field]} onChange={(e) => updateField(input.field, Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white text-xs font-bold focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none font-mono" />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default CreditMatrix;

