import React, { useEffect } from 'react';
import { FaArrowLeft, FaComments, FaFileAlt, FaChevronDown } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import { useJobTrackingLogic } from '../../../hooks/useJobTrackingLogic';
import JobTrackingDetails from './JobTrackingDetails';
import JobTrackingChat from './JobTrackingChat';

const JobTracking = () => {
    const {
        application, messages, messagesLoading, activeView, setActiveView,
        messageInput, setMessageInput, isDropdownOpen, setIsDropdownOpen,
        showEnableConfirm, setShowEnableConfirm, chatEnableCost, isEnablingChat,
        handleSendMessage, handleEnableChat, scrollRef, userInfo, navigate
    } = useJobTrackingLogic();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isDropdownOpen && !e.target.closest('.dropdown-container')) setIsDropdownOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen, setIsDropdownOpen]);

    if (messagesLoading || !application) return <div className="flex justify-center items-center min-h-[60vh]"><PropagateLoader color='#2563EB' /></div>;

    return (
        <div className="min-h-screen py-8 px-4 text-slate-900 ">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition text-sm font-bold"><FaArrowLeft size={14} /> Back to Applications</button>

                    <div className="relative dropdown-container">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 bg-white border border-slate-200 px-5 py-2.5 rounded-xl shadow-sm hover:border-blue-400 transition-all text-sm font-bold text-slate-700">
                            <span className="flex items-center gap-2">
                                {activeView === 'chat' ? <FaComments className="text-blue-500" /> : <FaFileAlt className="text-slate-400" />}
                                {activeView === 'chat' ? 'Chat View' : 'Details View'}
                            </span>
                            <FaChevronDown className={`text-[10px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-[100] py-2">
                                {[{ id: 'details', label: 'Details View', icon: FaFileAlt }, { id: 'chat', label: 'Chat View', icon: FaComments }].map(v => (
                                    <button key={v.id} onClick={() => { setActiveView(v.id); setIsDropdownOpen(false); }} className={`w-full text-left px-4 py-3 text-sm font-bold flex items-center gap-3 transition ${activeView === v.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                                        <v.icon size={14} /> {v.label} {v.id === 'chat' && !application.chatEnabled && <span className="text-[10px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded ml-auto">Locked</span>}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full transition-all duration-300">
                    {activeView === 'details' ? (
                        <JobTrackingDetails application={application} />
                    ) : (
                        <JobTrackingChat
                            application={application} messages={messages} userInfo={userInfo}
                            messageInput={messageInput} setMessageInput={setMessageInput} handleSendMessage={handleSendMessage}
                            showEnableConfirm={showEnableConfirm} setShowEnableConfirm={setShowEnableConfirm}
                            chatEnableCost={chatEnableCost} isEnablingChat={isEnablingChat} handleEnableChat={handleEnableChat}
                            scrollRef={scrollRef}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobTracking;

