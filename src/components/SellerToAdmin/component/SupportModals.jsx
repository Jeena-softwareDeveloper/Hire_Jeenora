import React from 'react';
import { FaTimes, FaCheckDouble } from 'react-icons/fa';

const SupportModals = ({
    showNewTicketForm,
    setShowNewTicketForm,
    showCostConfirm,
    setShowCostConfirm,
    newTicketSubject,
    setNewTicketSubject,
    handleCreateTicket,
    creditSettings,
    tickets
}) => {
    if (!showNewTicketForm) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-fadeIn">
            <div className="bg-white w-full max-w-md rounded-lg shadow-2xl border border-white overflow-hidden transform animate-in zoom-in-95 duration-200">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">New Inquiry</h3>
                    <button onClick={() => { setShowNewTicketForm(false); setShowCostConfirm(false); }} className="w-9 h-9 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100"><FaTimes size={12} /></button>
                </div>

                {!showCostConfirm ? (
                    <div className="p-8">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-3 block">What do you need help with?</label>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const cost = (tickets.length > 0 && creditSettings?.supportInquiryCost) ? creditSettings.supportInquiryCost : 0;
                            cost > 0 ? setShowCostConfirm(true) : handleCreateTicket();
                        }}>
                            <input type="text" required className="w-full px-6 py-4 rounded-lg bg-slate-50 border-none text-[15px] font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-300 mb-8" placeholder="e.g. Account Help" value={newTicketSubject} onChange={(e) => setNewTicketSubject(e.target.value)} autoFocus />
                            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 rounded-lg text-[13px] font-bold shadow-xl shadow-blue-500/20 transition-all hover:shadow-blue-500/40 active:scale-95">Start Conversation</button>
                        </form>
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl mx-auto flex items-center justify-center mb-4 text-indigo-600"><FaCheckDouble size={28} /></div>
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight mb-2">Technical Resource Fee</h4>
                        <p className="text-slate-400 text-[13px] font-medium mb-8">This inquiry will use <span className="text-indigo-600 font-bold">{creditSettings?.supportInquiryCost} credits</span> from your balance.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setShowCostConfirm(false)} className="flex-1 bg-slate-50 py-4 rounded-lg text-[13px] font-bold text-slate-400">Cancel</button>
                            <button onClick={handleCreateTicket} className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 rounded-lg text-[13px] font-bold shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 active:scale-95">Confirm</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportModals;

