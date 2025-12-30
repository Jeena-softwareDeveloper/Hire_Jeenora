import React from 'react';
import { FaPaperPlane, FaArrowLeft, FaEllipsisV, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { RiMessage3Fill } from 'react-icons/ri';
import moment from 'moment';

const SupportChat = ({
    selectedTicket,
    setSelectedTicket,
    setViewMode,
    userInfo,
    messageInput,
    setMessageInput,
    handleSendMessage,
    scrollRef,
    viewMode
}) => {
    if (!selectedTicket) {
        return (
            <div className={`flex-1 flex flex-col items-center justify-center p-20 text-center ${viewMode === 'list' ? 'hidden lg:flex' : 'flex'}`}>
                <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mb-8 border border-white shadow-xl relative animate-bounce-slow">
                    <RiMessage3Fill size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-4">Welcome to SupportHub</h2>
                <p className="text-slate-400 text-[14px] font-medium max-w-sm leading-relaxed mb-10">Select a conversation from the sidebar or start a new inquiry to get assistance.</p>
            </div>
        );
    }

    return (
        <div className={`flex-1 flex flex-col bg-white transition-all duration-300 ${viewMode === 'list' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/95 sticky top-0 z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => setViewMode('list')} className="lg:hidden p-2 text-slate-400 hover:text-slate-600"><FaArrowLeft /></button>
                    <div className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shadow-sm">
                        {selectedTicket.subject?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-900 leading-tight">{selectedTicket.subject}</h3>
                        <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${selectedTicket.status === 'open' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{selectedTicket.status === 'open' ? 'Active now' : 'Archived'}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-5 text-slate-300">
                    <FaInfoCircle className="cursor-pointer hover:text-slate-500" />
                    <FaEllipsisV className="cursor-pointer hover:text-slate-500" />
                    <FaTimes className="cursor-pointer hover:text-red-500" onClick={() => setSelectedTicket(null)} />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#FDFDFF] custom-scrollbar">
                {selectedTicket.messages.map((msg, i) => {
                    const isMe = msg.senderId === userInfo._id;
                    return (
                        <div key={i} className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                            {!isMe && <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold shrink-0 self-start mt-1">JH</div>}
                            <div className="max-w-[75%] lg:max-w-[65%]">
                                <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-[13px] font-medium leading-relaxed ${isMe ? 'bg-[#4F46E5] text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}>
                                    {msg.message}
                                </div>
                                <span className={`text-[10px] font-bold text-slate-400 mt-2 block ${isMe ? 'text-right' : 'text-left'}`}>{moment(msg.timestamp).format('HH:mm')}</span>
                            </div>
                        </div>
                    );
                })}
                <div ref={scrollRef} />
            </div>

            <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                {selectedTicket.status === 'closed' ? (
                    <div className="text-center bg-slate-50 py-4 rounded-2xl text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">This conversation has ended</div>
                ) : (
                    <form onSubmit={handleSendMessage} className="relative flex items-center gap-4">
                        <input type="text" className="flex-1 pl-6 pr-6 py-4 rounded-2xl bg-slate-50 border-none text-[14px] font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-400" placeholder="Write a message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                        <button disabled={!messageInput.trim()} className="bg-[#4F46E5] w-12 h-12 rounded-2xl text-white shadow-lg flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50"><FaPaperPlane size={16} /></button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SupportChat;
