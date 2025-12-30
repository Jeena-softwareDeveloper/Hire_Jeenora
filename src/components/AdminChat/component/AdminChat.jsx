import React, { useEffect } from 'react';
import { FaPaperPlane, FaHistory, FaArrowLeft, FaTicketAlt, FaEnvelope, FaCheckDouble, FaShieldAlt } from 'react-icons/fa';
import { MdLogout, MdChatBubble, MdPersonSearch, MdSupportAgent } from 'react-icons/md';
import useAuthStore from '../../../store/useAuthStore';
import { useAdminChatLogic } from '../../../hooks/useAdminChatLogic';
import AdminChatStats from './AdminChatStats';
import AdminChatUserList from './AdminChatUserList';
import '../css/AdminChat.css';

const AdminChat = () => {
    const { userInfo } = useAuthStore();
    const {
        selectedUser, setSelectedUser, selectedTicket, setSelectedTicket, messageInput, setMessageInput, searchTerm, setSearchTerm,
        activeTab, setActiveTab, mobileToggle, setMobileToggle, messagesEndRef, userGroups, handleSendMessage, stats
    } = useAdminChatLogic(userInfo);

    useEffect(() => {
        if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [selectedTicket?.messages]);

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-6 bg-[#f0f2f5] p-6 antialiased overflow-hidden font-['Outfit']">
            <AdminChatStats open={stats.open} total={stats.total} />

            <div className="flex-1 flex gap-6 overflow-hidden relative">
                <div className={`${mobileToggle ? 'hidden lg:flex' : 'flex'} h-full shrink-0`}>
                    <AdminChatUserList userGroups={userGroups} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedUser={selectedUser} onSelectUser={(u) => { setSelectedUser(u); setSelectedTicket(null); setActiveTab('chat'); setMobileToggle(true); }} />
                </div>

                <div className={`${!mobileToggle ? 'hidden lg:flex' : 'flex'} flex-1 bg-white rounded-[3rem] shadow-xl border border-slate-100 flex-col overflow-hidden relative transition-all`}>
                    {selectedUser ? (
                        <>
                            <div className="px-10 py-4 border-b flex items-center justify-between bg-white shrink-0">
                                <div className="flex gap-6 items-center">
                                    <button onClick={() => setMobileToggle(false)} className="lg:hidden p-3 bg-slate-50 rounded-xl text-slate-400"><FaArrowLeft size={14} /></button>
                                    {[{ id: 'chat', label: 'Comms', icon: <MdChatBubble /> }, { id: 'history', label: 'Logs', icon: <FaHistory /> }, { id: 'profile', label: 'User', icon: <MdPersonSearch /> }].map(tab => (
                                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400'}`}>{tab.icon} <span>{tab.label}</span></button>
                                    ))}
                                </div>
                                <button className="p-4 bg-rose-50 rounded-2xl text-rose-600 hover:bg-rose-100"><MdLogout className="rotate-180" /></button>
                            </div>

                            <div className="flex-1 overflow-hidden flex flex-col">
                                {activeTab === 'chat' && (
                                    <>
                                        <div className="px-10 py-4 bg-slate-50 flex gap-4 overflow-x-auto no-scrollbar border-b shrink-0">
                                            {selectedUser.tickets.map(t => (
                                                <div key={t._id} onClick={() => setSelectedTicket(t)} className={`px-6 py-3 rounded-2xl cursor-pointer border shrink-0 ${selectedTicket?._id === t._id ? 'bg-white border-emerald-200 shadow-lg text-emerald-900 ring-2 ring-emerald-500/5' : 'bg-emerald-50 text-emerald-400 opacity-60'}`}><div className="flex items-center gap-3"><span className={`w-2 h-2 rounded-full ${t.status === 'open' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span><span className="text-[10px] font-black uppercase tracking-widest">{t.subject}</span></div></div>
                                            ))}
                                        </div>
                                        {selectedTicket ? (
                                            <>
                                                <div className="flex-1 overflow-y-auto p-12 space-y-8 bg-[#fafbff] custom-scrollbar">
                                                    {selectedTicket.messages.map((m, i) => (
                                                        <div key={i} className={`flex ${m.senderModel === 'admins' ? 'justify-end' : 'justify-start'}`}>
                                                            <div className={`px-8 py-5 shadow-lg max-w-[80%] ${m.senderModel === 'admins' ? 'bg-slate-900 text-white rounded-[2.5rem] rounded-tr-none' : 'bg-white text-slate-800 rounded-[2.5rem] rounded-tl-none border'}`}>
                                                                <p className="text-[14px] leading-relaxed font-medium">{m.message}</p>
                                                                <div className={`text-[9px] mt-4 flex items-center font-black uppercase tracking-widest ${m.senderModel === 'admins' ? 'justify-end text-slate-500' : 'text-emerald-300'}`}>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {m.senderModel === 'admins' && <FaCheckDouble className="ml-2 text-emerald-400" />}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div ref={messagesEndRef} />
                                                </div>
                                                <div className="p-10 bg-white border-t border-slate-50">
                                                    <form onSubmit={handleSendMessage} className="flex gap-6"><input type="text" className="flex-1 px-10 py-5 rounded-[2.25rem] bg-slate-50 border-none text-[14px] font-medium" placeholder="Message node..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} /><button disabled={!messageInput.trim()} className="bg-emerald-600 p-6 rounded-[2rem] text-white shadow-xl hover:scale-105 transition-all"><FaPaperPlane /></button></form>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex-1 flex flex-col items-center justify-center grayscale opacity-40"><MdChatBubble size={100} className="text-emerald-100 mb-6" /><h3 className="text-2xl font-black text-slate-800 uppercase">Inbound Link Ready</h3></div>
                                        )}
                                    </>
                                )}
                                {activeTab === 'profile' && (
                                    <div className="flex-1 p-16 bg-[#fcfcfd] overflow-y-auto custom-scrollbar flex flex-col items-center">
                                        <div className="w-40 h-40 rounded-[3rem] bg-emerald-600 text-white flex items-center justify-center text-7xl font-black shadow-2xl mb-8 uppercase">{selectedUser.name?.charAt(0)}</div>
                                        <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase mb-2">{selectedUser.name}</h2>
                                        <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em] mb-10">Node ID: {selectedUser._id?.toUpperCase()}</p>
                                        <div className="grid grid-cols-2 gap-6 w-full max-w-2xl"><div className="bg-white p-8 rounded-[2.5rem] border shadow-sm text-center"><div className="text-emerald-500 flex justify-center mb-4 text-xl"><FaEnvelope /></div><p className="text-[9px] font-black text-slate-300 uppercase mb-2 text-nowrap">EMAIL ADDRESS</p><p className="text-sm font-black text-slate-700 truncate">{selectedUser.email}</p></div><div className="bg-white p-8 rounded-[2.5rem] border shadow-sm text-center"><div className="text-emerald-500 flex justify-center mb-4 text-xl"><FaHistory /></div><p className="text-[9px] font-black text-slate-300 uppercase mb-2 text-nowrap">TOTAL TELEMETRY</p><p className="text-sm font-black text-slate-700">{selectedUser.totalRequests}</p></div></div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-20 grayscale opacity-30"><MdSupportAgent size={150} className="text-slate-100 mb-10" /><h2 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">Support Terminal</h2><p className="text-slate-400 text-sm font-bold uppercase tracking-[0.4em] mt-4 text-nowrap">Select User node to initialize session</p></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminChat;
