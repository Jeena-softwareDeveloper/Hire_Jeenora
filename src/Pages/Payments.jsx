import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaLock, FaSpinner } from 'react-icons/fa';
import { usePaymentMatrixLogic } from '../hooks/usePaymentMatrixLogic';
import PaymentPlans from '../components/Payments/component/PaymentPlans';
import PaymentCredits from '../components/Payments/component/PaymentCredits';

const Payments = () => {
    const {
        activeTab, setActiveTab, creditSettings, planData, credits, setCredits,
        handleSelectPlan, handlePurchaseCredits, loading, isPlanMaintenance,
        isCreditMaintenance, credPending, planPending
    } = usePaymentMatrixLogic();

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center font-['Outfit']">
                <div className="flex flex-col items-center gap-4">
                    <FaSpinner className="text-4xl text-indigo-600 animate-spin" />
                    <p className="text-indigo-900 font-black uppercase tracking-widest text-xs">Synchronizing Ledgers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFF] py-12 px-6 font-['Outfit']">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                                <FaCreditCard size={18} />
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Financial Ecosystem</h1>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Secure Transaction & Resource Hub</p>
                    </div>

                    <div className="bg-white p-1.5 rounded-2xl shadow-xl shadow-indigo-100/30 border border-slate-100 flex items-center gap-2">
                        <button onClick={() => setActiveTab('subscriptions')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'subscriptions' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'}`}>Subscription Plans</button>
                        <button onClick={() => setActiveTab('credits')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'credits' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'}`}>Purchase Credits</button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'subscriptions' ? (
                        <PaymentPlans key="plans" planData={planData} handleSelectPlan={handleSelectPlan} isPlanMaintenance={isPlanMaintenance} planPending={planPending} />
                    ) : (
                        <PaymentCredits
                            key="credits" creditSettings={creditSettings} credits={credits}
                            setCredits={setCredits} handlePurchaseCredits={handlePurchaseCredits}
                            isCreditMaintenance={isCreditMaintenance} credPending={credPending}
                        />
                    )}
                </AnimatePresence>

                <div className="mt-20 border-t border-slate-100 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white"></div>)}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined by 10,000+ professionals this month</p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 px-6 py-3 bg-slate-50 rounded-full border border-slate-100">
                        <FaLock size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">256-Bit SSL Encrypted Secure Checkout</span>
                    </div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                body { font-family: 'Outfit', sans-serif; }
            `}</style>
        </div>
    );
};

export default Payments;
