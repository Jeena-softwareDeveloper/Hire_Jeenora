import React from 'react';
import useAuthStore from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaLock, FaSpinner } from 'react-icons/fa';
import { usePaymentMatrixLogic } from '../hooks/usePaymentMatrixLogic';
import PaymentPlans from '../components/Payments/component/PaymentPlans';
import PaymentCredits from '../components/Payments/component/PaymentCredits';

const Payments = () => {
    const { userInfo } = useAuthStore(state => state);
    const {
        activeTab, setActiveTab, creditSettings, planData, credits, setCredits,
        handleSelectPlan, handlePurchaseCredits, loading, isPlanMaintenance,
        isCreditMaintenance, credPending, planPending
    } = usePaymentMatrixLogic();

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center ">
                <div className="flex flex-col items-center gap-4">
                    <FaSpinner className="text-4xl text-indigo-600 animate-spin" />
                    <p className="text-indigo-900 font-black uppercase tracking-widest text-xs">Synchronizing Ledgers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-transparent">
            {/* Header - Same row on mobile */}
            <div className="flex flex-row justify-between items-center mb-6 gap-4 w-full">
                <div className="text-left shrink-0">
                    <h1 className="text-xl sm:text-3xl lg:text-xl font-black text-slate-900 uppercase tracking-tighter">Finance Hub</h1>
                </div>

                <div className="flex items-center justify-end gap-2 md:gap-3 shrink-0">
                    {/* Compact Tabs - Hidden on smallest mobile if needed */}
                    <div className="bg-white p-1 rounded-lg border border-slate-100 flex items-center gap-1 shadow-sm">
                        <button onClick={() => setActiveTab('subscriptions')} className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'subscriptions' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Plans</button>
                        <button onClick={() => setActiveTab('credits')} className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'credits' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Credits</button>
                    </div>

                    {/* Credit Balance Pill */}
                    <div className="hidden sm:flex items-center bg-gradient-to-r from-blue-500 to-emerald-500 px-3 py-1.5 rounded-lg shadow-lg shadow-blue-500/30 gap-1.5">
                        <span className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-wide whitespace-nowrap">{userInfo?.creditBalance || 0} Credits</span>
                    </div>
                </div>
            </div>

            <div className="w-full pb-8 lg:pb-12 pt-0">
                <div className="max-w-[1400px] mx-auto">
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
            </div>
        </div>
    );
};

export default Payments;

