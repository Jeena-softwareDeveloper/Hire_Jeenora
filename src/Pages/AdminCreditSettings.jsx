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
            <div className="min-h-[80vh] flex items-center justify-center font-['Outfit']">
                <div className="flex flex-col items-center gap-4">
                    <FaSpinner className="text-4xl text-indigo-600 animate-spin" />
                    <p className="text-indigo-900 font-black uppercase tracking-widest text-xs">Accessing Neural Grid...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFF] py-12 px-6 font-['Outfit']">
            <div className="max-w-6xl mx-auto pb-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                                <FaDatabase size={18} />
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Control Matrix</h1>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Central Autonomous Economy Hub</p>
                    </div>

                    <div className="bg-white p-1.5 rounded-2xl shadow-xl shadow-indigo-100/50 border border-slate-100 flex items-center gap-2">
                        <button onClick={() => setActiveTab('economics')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'economics' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'}`}>Credit Economics</button>
                        <button onClick={() => setActiveTab('plans')} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'plans' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'}`}>Subscription Plans</button>
                    </div>
                </div>

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
                    className="w-full bg-[#0F172A] text-white py-6 rounded-[2rem] shadow-2xl flex items-center justify-center gap-4 hover:bg-slate-800 transition-all border-t border-white/10"
                >
                    {pending ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt className="text-indigo-400" />}
                    <span className="text-xs font-black uppercase tracking-[0.4em]">Commit All Modifications</span>
                </motion.button>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                body { font-family: 'Outfit', sans-serif; }
                input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
            `}</style>
        </div>
    );
}

export default AdminCreditSettings;
