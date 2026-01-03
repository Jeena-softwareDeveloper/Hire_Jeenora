import React from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useSupportHubLogic } from '../hooks/useSupportHubLogic';
import SupportSidebar from '../components/SellerToAdmin/component/SupportSidebar';
import SupportChat from '../components/SellerToAdmin/component/SupportChat';
import SupportModals from '../components/SellerToAdmin/component/SupportModals';
import '../components/SellerToAdmin/css/SellerToAdmin.css';

const SellerToAdmin = () => {
    const {
        userInfo, tickets, selectedTicket, setSelectedTicket, messageInput, setMessageInput,
        newTicketSubject, setNewTicketSubject, showNewTicketForm, setShowNewTicketForm,
        loading, searchTerm, setSearchTerm, viewMode, setViewMode, showCostConfirm, setShowCostConfirm,
        creditSettings, scrollRef, handleCreateTicket, handleSendMessage
    } = useSupportHubLogic();

    return (
        <div className="flex-1 bg-transparent flex flex-col min-h-0">
            {/* Header - Unified Single Row */}
            <div className="flex flex-row justify-between items-center mb-6 gap-4 w-full">
                <div className="text-left shrink-0">
                    <h1 className="text-xl sm:text-3xl lg:text-xl font-black text-slate-900 uppercase tracking-tighter">Support Hub</h1>
                </div>

                <div className="flex items-center justify-end gap-3 shrink-0">
                    {/* Search - Desktop only or hidden on mobile to save space */}
                    <div className="relative group max-w-xs hidden md:flex">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-[10px]" />
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            className="w-full pl-8 pr-4 py-2 bg-white border border-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-600 focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-400 outline-none shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => {
                            if (tickets.length >= 3) {
                                toast.error("Maximum 3 conversations allowed.");
                                return;
                            }
                            setShowNewTicketForm(true);
                        }}
                        className="btn-premium px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest"
                    >
                        <FaPlus size={10} className="hidden sm:inline" /> New Ticket
                    </button>
                </div>
            </div>

            <div className="flex-1 flex bg-white font-sans rounded-lg shadow-sm border border-slate-100">
                {/* Sidebar of Conversations */}
                <SupportSidebar
                    tickets={tickets} selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket}
                    searchTerm={searchTerm} setSearchTerm={setSearchTerm} setViewMode={setViewMode}
                    setShowNewTicketForm={setShowNewTicketForm} loading={loading} viewMode={viewMode}
                />

                {/* Main Conversation Window */}
                <SupportChat
                    selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket}
                    setViewMode={setViewMode} userInfo={userInfo} messageInput={messageInput}
                    setMessageInput={setMessageInput} handleSendMessage={handleSendMessage}
                    scrollRef={scrollRef} viewMode={viewMode}
                />

                {/* Application Modals */}
                <SupportModals
                    showNewTicketForm={showNewTicketForm} setShowNewTicketForm={setShowNewTicketForm}
                    showCostConfirm={showCostConfirm} setShowCostConfirm={setShowCostConfirm}
                    newTicketSubject={newTicketSubject} setNewTicketSubject={setNewTicketSubject}
                    handleCreateTicket={handleCreateTicket} creditSettings={creditSettings}
                    tickets={tickets}
                />

                <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
            `}</style>
            </div>
        </div>
    );
};

export default SellerToAdmin;

