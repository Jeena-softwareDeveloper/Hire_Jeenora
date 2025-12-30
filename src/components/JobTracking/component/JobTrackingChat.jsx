import React from 'react';
import { FaComments, FaCoins, FaExclamationCircle, FaCheckCircle, FaBuilding, FaPaperPlane } from 'react-icons/fa';

const JobTrackingChat = ({ application, messages, userInfo, messageInput, setMessageInput, handleSendMessage, showEnableConfirm, setShowEnableConfirm, chatEnableCost, isEnablingChat, handleEnableChat, scrollRef }) => {
    return (
        <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col h-[750px] relative overflow-hidden animate-fade-in-up">
            {!application.chatEnabled && (
                <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center px-4">
                    {!showEnableConfirm ? (
                        <div className="animate-zoom-in">
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner mx-auto"><FaComments className="text-blue-600 text-3xl" /></div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3">Unlock Support Chat</h3>
                            <p className="text-base text-slate-500 mb-8 max-w-[320px] mx-auto font-medium">Start direct communication with the hiring team for priority updates.</p>
                            <button onClick={() => setShowEnableConfirm(true)} className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg font-black"><FaCoins /> Enable for {chatEnableCost} Credits</button>
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-blue-100 max-w-[400px] animate-zoom-in">
                            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6 mx-auto"><FaExclamationCircle className="text-amber-500 text-2xl" /></div>
                            <h3 className="text-xl font-black text-slate-900 mb-3">Permanent Activation</h3>
                            <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">This is a <span className="font-black text-slate-900 underline decoration-blue-500 underline-offset-4">one-time permanent unlock</span>. It will deduct <span className="font-bold text-slate-800">{chatEnableCost} credits</span>.</p>
                            <div className="flex flex-col gap-3 w-full">
                                <button onClick={handleEnableChat} disabled={isEnablingChat} className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-sm">
                                    {isEnablingChat ? <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" /> : 'Confirm & Proceed'}
                                </button>
                                <button onClick={() => setShowEnableConfirm(false)} disabled={isEnablingChat} className="w-full py-4 rounded-2xl text-slate-400 font-black text-sm">Cancel</button>
                            </div>
                        </div>
                    )}
                    <div className="mt-8 flex items-center gap-4 text-xs text-slate-400 font-black uppercase tracking-widest">
                        {['Secure', 'Direct', 'Priority'].map(txt => <div key={txt} className="flex items-center gap-1.5"><FaCheckCircle className="text-green-500" /> {txt}</div>)}
                    </div>
                </div>
            )}

            <div className="bg-blue-600 p-4 flex items-center gap-4 shadow-lg z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 overflow-hidden flex items-center justify-center text-xl backdrop-blur-md">
                    {application.jobId?.company?.logo ? <img src={application.jobId.company.logo} alt="" className="w-full h-full object-cover" /> : <span className="font-black text-white">{application.jobId?.company?.name?.charAt(0).toUpperCase() || <FaBuilding />}</span>}
                </div>
                <h3 className="text-base font-black text-white">{application.jobId?.company?.name || 'Recruiter'}</h3>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3 chat-bg custom-scrollbar" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundRepeat: 'repeat', backgroundColor: '#f8fafc', backgroundBlendMode: 'soft-light' }}>
                {messages.length > 0 ? messages.map((msg, i) => {
                    const isMe = (userInfo?._id && msg.senderId === userInfo?._id) || (!userInfo?._id && msg.senderRole === 'user');
                    return (
                        <div key={i} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                            <div className={`relative max-w-[85%] lg:max-w-[70%] px-4 py-2.5 text-sm rounded-2xl shadow-sm leading-relaxed ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                                <div className="font-medium">{msg.message}</div>
                                <div className={`flex items-center justify-end gap-1.5 mt-1.5 ${isMe ? 'opacity-70' : 'opacity-40'}`}>
                                    <span className="text-[10px] font-black uppercase tracking-tighter">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    {isMe && <span className="text-[10px] font-black">{msg.isRead ? '✓✓' : '✓'}</span>}
                                </div>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="flex flex-col items-center justify-center h-full"><div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white flex flex-col items-center"><FaComments size={40} className="text-blue-200 mb-3" /><p className="text-xs font-black text-slate-400 uppercase tracking-widest">No conversation yet</p></div></div>
                )}
                <div ref={scrollRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-3 items-center">
                <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Type your message here..." className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                <button type="submit" disabled={!messageInput.trim()} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${messageInput.trim() ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' : 'bg-slate-100 text-slate-300'}`}><FaPaperPlane size={18} /></button>
            </form>
        </div>
    );
};

export default JobTrackingChat;
