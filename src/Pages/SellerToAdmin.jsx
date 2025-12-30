import React from 'react';
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
        <div className="flex h-[calc(100vh-80px)] bg-white overflow-hidden font-sans font-['Outfit']">
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
    );
};

export default SellerToAdmin;
