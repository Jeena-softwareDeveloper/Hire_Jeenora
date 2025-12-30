import React from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { RiMessage3Fill } from 'react-icons/ri';
import { MdChatBubble } from 'react-icons/md';
import moment from 'moment';
import toast from 'react-hot-toast';

const SupportSidebar = ({
    tickets,
    selectedTicket,
    setSelectedTicket,
    searchTerm,
    setSearchTerm,
    setViewMode,
    setShowNewTicketForm,
    loading,
    viewMode
}) => {
    const filteredTickets = tickets.filter(t => t.subject.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className={`w-full lg:w-[350px] border-r border-slate-100 flex flex-col bg-white transition-all duration-300 ${viewMode === 'chat' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4F46E5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                        <RiMessage3Fill size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">SupportHub</h2>
                </div>
                <button
                    onClick={() => {
                        if (tickets.length >= 3) {
                            toast.error("Maximum 3 conversations allowed. Delete old ones to start new.");
                            return;
                        }
                        setShowNewTicketForm(true);
                    }}
                    className="w-10 h-10 bg-[#4F46E5] text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                    <FaPlus size={14} />
                </button>
            </div>

            <div className="px-6 mb-6">
                <div className="relative group">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-600 focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-400 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-6 px-2">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="p-4 mx-4 animate-pulse flex gap-4 items-center">
                            <div className="w-12 h-12 bg-slate-50 rounded-full"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-3 bg-slate-50 rounded w-1/2"></div>
                                <div className="h-2 bg-slate-50 rounded w-full"></div>
                            </div>
                        </div>
                    ))
                ) : filteredTickets.length === 0 ? (
                    <div className="text-center py-20 px-10">
                        <MdChatBubble size={48} className="text-slate-100 mx-auto mb-4" />
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No conversations</p>
                    </div>
                ) : filteredTickets.map(ticket => {
                    const lastMsg = ticket.messages?.[ticket.messages.length - 1]?.message || 'Start conversation';
                    const isSelected = selectedTicket?._id === ticket._id;
                    return (
                        <div
                            key={ticket._id}
                            onClick={() => { setSelectedTicket(ticket); setViewMode('chat'); }}
                            className={`group p-4 mx-2 rounded-2xl cursor-pointer transition-all flex gap-4 items-center relative
                                ${isSelected ? 'bg-indigo-50' : 'hover:bg-slate-50'}
                            `}
                        >
                            <div className="relative shrink-0">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shadow-sm border-2 border-white
                                    ${isSelected ? 'bg-indigo-600 text-white' : 'bg-[#E0E7FF] text-indigo-700'}
                                `}>
                                    {ticket.subject?.charAt(0).toUpperCase() || 'S'}
                                </div>
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${ticket.status === 'open' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h4 className="font-bold text-slate-800 text-sm truncate uppercase tracking-tight">{ticket.subject}</h4>
                                    <span className="text-[10px] font-bold text-slate-400">{moment(ticket.lastMessageAt || ticket.createdAt).fromNow(true)}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate font-medium">{lastMsg}</p>
                            </div>
                            {isSelected && <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-600 rounded-r-full shadow-lg"></div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SupportSidebar;
