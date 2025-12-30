import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

const PlanMatrix = ({ settings, updateField, updateFeatures, updateMainField }) => {
    if (!settings) return null;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex items-center justify-between bg-white/50 p-6 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner"><FaShieldAlt /></div>
                    <div>
                        <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Global Subscription Status</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Toggle "Coming Soon" for Plans</p>
                    </div>
                </div>
                <button onClick={() => updateMainField('plansComingSoon', !settings.plansComingSoon)} className={`w-14 h-7 rounded-full transition-all relative ${settings.plansComingSoon ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${settings.plansComingSoon ? 'left-8' : 'left-1'}`}></div>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(settings.plans || {}).map(([key, plan]) => (
                    <div key={key} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest">{key} Package</h4>
                            <button onClick={() => updateField(key, 'active', !plan.active)} className={`w-10 h-5 rounded-full transition-all relative ${plan.active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${plan.active ? 'left-5.5' : 'left-0.5'}`}></div>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Price (₹)</label>
                                <input type="number" value={plan.price} onChange={(e) => updateField(key, 'price', Number(e.target.value))} className="w-full bg-slate-50 border-none rounded-xl h-12 px-4 text-xs font-black text-indigo-950 focus:ring-2 focus:ring-indigo-500/10" />
                            </div>
                            <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Validity (Days)</label>
                                <input type="number" value={plan.days} onChange={(e) => updateField(key, 'days', Number(e.target.value))} className="w-full bg-slate-50 border-none rounded-xl h-12 px-4 text-xs font-black text-indigo-950 focus:ring-2 focus:ring-indigo-500/10" />
                            </div>
                        </div>
                        <div>
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Plan Features (One per line)</label>
                            <textarea value={plan.features?.join('\n')} onChange={(e) => updateFeatures(key, e.target.value)} rows={4} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-[11px] font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500/10 no-scrollbar" placeholder="Enter features..." />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default PlanMatrix;
