import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { FaHeadset, FaTimes, FaMinus, FaPaperPlane } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import { useGetSellerAdminMessages, useSendSellerAdminMessage } from '../../hooks/useChat';
import { socket } from '../../utils/utils';
import useAuthStore from '../../store/useAuthStore';

const SupportWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const nodeRef = useRef(null);

    const scrollRef = useRef();
    const queryClient = useQueryClient();
    const [text, setText] = useState('');
    const { userInfo } = useAuthStore(state => state);

    // Fetch messages logic (same as SellerToAdmin)
    const { data: seller_admin_message = [] } = useGetSellerAdminMessages();
    const sendMessageMutation = useSendSellerAdminMessage();

    const send = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        sendMessageMutation.mutate({
            senderId: userInfo._id,
            receverId: '',
            message: text,
            senderName: userInfo.name
        }, {
            onSuccess: (msg) => {
                setText('');
                socket.emit('send_message_hire_to_admin', msg);
            }
        });
    };

    useEffect(() => {
        socket.on('receved_admin_message', msg => {
            queryClient.setQueryData(['sellerAdminMessages'], (old) => old ? [...old, msg] : [msg]);
        });
        return () => {
            socket.off('receved_admin_message');
        };
    }, [queryClient]);

    useEffect(() => {
        if (isOpen && !isMinimized) {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [seller_admin_message, isOpen, isMinimized]);

    // Toggle widget
    const toggleOpen = () => {
        setIsOpen(!isOpen);
        setIsMinimized(false);
    };

    if (!isOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={toggleOpen}
                    className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    title="Support Chat"
                >
                    <FaHeadset size={24} />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </button>
            </div>
        );
    }

    return (
        <Draggable nodeRef={nodeRef} handle=".widget-header">
            <div
                ref={nodeRef}
                className={`fixed z-50 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200 flex flex-col transition-all duration-300 ${isMinimized ? 'h-14 w-60 bottom-6 right-6' : 'w-80 sm:w-96 bottom-6 right-20 h-[500px]'}`}
                style={{ position: 'fixed' }} // Draggable needs fixed/absolute
            >
                {/* Header */}
                <div className="widget-header bg-green-700 text-white p-3 flex justify-between items-center cursor-move select-none">
                    <div className="flex items-center gap-2">
                        <FaHeadset />
                        <span className="font-semibold">Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-gray-200">
                            <FaMinus size={12} />
                        </button>
                        <button onClick={toggleOpen} className="hover:text-gray-200">
                            <FaTimes size={14} />
                        </button>
                    </div>
                </div>

                {/* Body (only if not minimized) */}
                {!isMinimized && (
                    <>
                        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
                            <div className="space-y-3">
                                {seller_admin_message.length === 0 && (
                                    <p className="text-center text-gray-400 text-xs mt-4">Start a conversation with support...</p>
                                )}
                                {seller_admin_message.map((m, i) => (
                                    <div key={i} className={`flex w-full ${userInfo._id === m.senderId ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            ref={i === seller_admin_message.length - 1 ? scrollRef : null}
                                            className={`max-w-[80%] rounded-lg p-3 text-sm shadow-sm ${userInfo._id === m.senderId
                                                ? 'bg-green-600 text-white rounded-br-none'
                                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                                }`}
                                        >
                                            <p>{m.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <form onSubmit={send} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-100 border-none outline-none text-sm px-3 py-2 rounded-full focus:ring-1 focus:ring-green-500"
                            />
                            <button
                                type="submit"
                                className="w-9 h-9 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                                <FaPaperPlane size={14} />
                            </button>
                        </form>
                    </>
                )}
            </div>
        </Draggable>
    );
};

export default SupportWidget;

