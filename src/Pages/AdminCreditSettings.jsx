import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDatabase, FaCreditCard, FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import { useAdminMatrixLogic } from "../hooks/useAdminMatrixLogic";
import CreditMatrix from "../components/AdminCreditSettings/component/CreditMatrix";
import PlanMatrix from "../components/AdminCreditSettings/component/PlanMatrix";

function AdminCreditSettings() {
    const {
        activeTab, setActiveTab, creditSettings, planSettings, setPlanSettings,
        handleCommit, updateCreditField, updatePlanField, updatePlanFeatures, loading, pending
    } = useAdminMatrixLogic();

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center ">
                <div className="flex flex-col items-center gap-4">
                    <FaSpinner className="text-4xl text-indigo-600 animate-spin" />
                    <p className="text-indigo-900 font-black uppercase tracking-widest text-xs">Accessing Neural Grid...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent">
            {/* Header - Matches Profile.jsx */}
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 mb-6 flex items-center">
                <div className="text-left">
                    <h1 className="text-xl sm:text-3xl lg:text-xl font-black text-slate-900 uppercase tracking-tighter">Control Matrix</h1>
                </div>

                <div className="lg:col-span-2 bg-transparent flex items-center justify-end">
                    <div className="bg-white p-1.5 rounded-2xl shadow-xl shadow-indigo-100/50 border border-slate-100 flex items-center gap-2">
                        <button onClick={() => setActiveTab('economics')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'economics' ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-slate-600'}`}>Credit Economics</button>
                        <button onClick={() => setActiveTab('plans')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'plans' ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-slate-600'}`}>Subscription Plans</button>
                    </div>
                </div>
            </div>

            <div className="w-full pb-8 lg:pb-12 pt-0 min-h-[calc(100vh-200px)]">
                <div className="max-w-6xl mx-auto pb-32">

                    <AnimatePresence mode="wait">
                        {activeTab === 'economics' ? (
                            <CreditMatrix key="credits" settings={creditSettings} updateField={updateCreditField} />
                        ) : (
                            <PlanMatrix
                                key="plans"
                                settings={planSettings}
                                updateField={updatePlanField}
                                updateFeatures={updatePlanFeatures}
                                updateMainField={(f, v) => setPlanSettings(prev => ({ ...prev, [f]: v }))}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 z-50">
                    <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={handleCommit} disabled={pending}
                        className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-6 rounded-[2rem] shadow-2xl flex items-center justify-center gap-4 hover:shadow-blue-500/20 transition-all border-t border-white/10"
                    >
                        {pending ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt className="text-white/80" />}
                        <span className="text-xs font-black uppercase tracking-[0.4em]">Commit All Modifications</span>
                    </motion.button>
                </div>

                <style>{`
                input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
            `}</style>
            </div>
        </div>
    );
}

export default AdminCreditSettings;

