import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCrown, FaCheckCircle, FaBolt } from 'react-icons/fa';

const PaymentPlans = ({ planData, handleSelectPlan, isPlanMaintenance, planPending }) => {
    if (isPlanMaintenance) {
        return (
            <div className="bg-indigo-50/50 p-12 rounded-[2.5rem] border-2 border-dashed border-indigo-100 text-center">
                <FaRocket className="text-4xl text-indigo-200 mx-auto mb-6" />
                <h3 className="text-xl font-black text-indigo-900 uppercase tracking-tighter mb-2">Subscription Engine Rebooting</h3>
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest leading-loose">New professional ecosystem packages arriving soon.</p>
            </div>
        );
    }

    const plans = [
        { key: 'free', icon: <FaRocket />, color: 'indigo' },
        { key: 'basic', icon: <FaBolt />, color: 'indigo' },
        { key: 'pro', icon: <FaCrown />, color: 'emerald', highlight: true },
        { key: 'elite', icon: <FaCrown />, color: 'indigo' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p, i) => {
                const data = planData?.data?.plans?.[p.key];
                if (!data?.active) return null;
                return (
                    <motion.div key={p.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`relative bg-white p-8 rounded-[2.5rem] border ${p.highlight ? 'border-emerald-500 shadow-2xl shadow-emerald-500/10' : 'border-slate-100'} flex flex-col`}>
                        {p.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>}
                        <div className={`w-12 h-12 ${p.highlight ? 'bg-emerald-500 text-white' : 'bg-indigo-50 text-indigo-600'} rounded-2xl flex items-center justify-center mb-6`}>{p.icon}</div>
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-1">{p.key}</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-3xl font-black text-slate-900">₹{data.price}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ {data.days} Days</span>
                        </div>
                        <div className="flex-1 space-y-4 mb-8">
                            {data.features?.map((f, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" size={14} />
                                    <span className="text-xs font-bold text-slate-600 leading-tight">{f}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => handleSelectPlan(p.key)} disabled={planPending} className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${p.highlight ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-xl shadow-emerald-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200'}`}>Initialize Order</button>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default PaymentPlans;
