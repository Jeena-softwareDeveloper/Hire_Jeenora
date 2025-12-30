import React from 'react';
import { FaShieldAlt, FaChartBar } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';

const AdminChatStats = ({ open, total }) => {
    return (
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 no-scrollbar shrink-0">
            <div className="min-w-[200px] md:min-w-0 bg-white p-4 md:p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4 group shrink-0">
                <div className="p-3 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform"><FaShieldAlt /></div>
                <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Operational</p><h3 className="text-xl md:text-2xl font-black text-slate-800">{open}</h3></div>
            </div>
            <div className="min-w-[200px] md:min-w-0 bg-white p-4 md:p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4 group shrink-0">
                <div className="p-3 bg-slate-900 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform"><FaChartBar /></div>
                <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Volume</p><h3 className="text-xl md:text-2xl font-black text-slate-800">{total}</h3></div>
            </div>
            <div className="min-w-[200px] md:min-w-0 bg-slate-900 p-4 md:p-6 rounded-[2rem] shadow-2xl flex items-center justify-between group relative overflow-hidden shrink-0">
                <div className="relative z-10"><p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Integrity</p><h3 className="text-xl md:text-2xl font-black text-white">99.9%</h3></div>
                <MdSupportAgent size={60} className="absolute right-[-10px] bottom-[-10px] text-white/5" />
            </div>
        </div>
    );
};

export default AdminChatStats;
