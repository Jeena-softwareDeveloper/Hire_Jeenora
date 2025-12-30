import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import api from '../api/api';
import useAuthStore from '../store/useAuthStore';
import { useGetCreditSettings } from './useAdminSettings';
import { socket } from '../utils/utils';

export const useSupportHubLogic = () => {
    const { userInfo } = useAuthStore(state => state);
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [newTicketSubject, setNewTicketSubject] = useState('');
    const [showNewTicketForm, setShowNewTicketForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'chat'
    const [showCostConfirm, setShowCostConfirm] = useState(false);

    const { data: creditSettings } = useGetCreditSettings();
    const scrollRef = useRef();

    useEffect(() => {
        if (!userInfo?._id) return;
        fetchTickets();
        socket.emit('add_hireuser', userInfo._id, userInfo);
    }, [userInfo]);

    useEffect(() => {
        socket.on('ticket_message_received', (data) => {
            setTickets(prev => {
                const updated = prev.map(t => {
                    if (t._id === data.ticketId) {
                        return {
                            ...t,
                            messages: [...t.messages, data.message],
                            lastMessageAt: data.message.timestamp
                        };
                    }
                    return t;
                });
                return updated.sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
            });

            if (selectedTicket?._id === data.ticketId) {
                setSelectedTicket(prev => ({
                    ...prev,
                    messages: [...prev.messages, data.message]
                }));
            }
        });

        socket.on('ticket_status_closed', (data) => {
            if (selectedTicket?._id === data.ticketId) {
                setSelectedTicket(prev => ({ ...prev, status: 'closed' }));
            }
            fetchTickets();
        });

        return () => {
            socket.off('ticket_message_received');
            socket.off('ticket_status_closed');
        };
    }, [selectedTicket?._id]);

    const fetchTickets = async () => {
        if (!userInfo?._id) return;
        try {
            const { data } = await api.get('/admin/chat-support/tickets');
            const myTickets = data.filter(t => t.userId?._id === userInfo._id || t.userId === userInfo._id);
            setTickets(myTickets);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleCreateTicket = async () => {
        if (!newTicketSubject.trim()) return;
        const cost = (tickets.length > 0 && creditSettings?.supportInquiryCost) ? creditSettings.supportInquiryCost : 0;
        if (cost > 0 && userInfo?.creditBalance < cost) {
            toast.error(`Insufficient Credits. Required: ${cost}, Available: ${userInfo?.creditBalance}`);
            return;
        }
        try {
            const payload = {
                userId: userInfo._id, subject: newTicketSubject,
                message: `Hello, I'm reaching out about ${newTicketSubject}.`
            };
            const { data } = await api.post('/admin/chat-support/tickets', payload);
            if (data.remainingCredits !== undefined) {
                useAuthStore.setState(state => ({ userInfo: { ...state.userInfo, creditBalance: data.remainingCredits } }));
            }
            setNewTicketSubject('');
            setShowNewTicketForm(false);
            setShowCostConfirm(false);
            fetchTickets();
            const createdTicket = data.ticket || data;
            setSelectedTicket(createdTicket);
            setViewMode('chat');
            toast.success('Conversation Started');
        } catch (error) {
            console.error(error);
            toast.error('Failed to start conversation');
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageInput.trim() || !selectedTicket) return;
        try {
            const payload = { senderId: userInfo._id, senderModel: 'HireUser', message: messageInput };
            await api.post(`/admin/chat-support/tickets/${selectedTicket._id}/message`, payload);
            setMessageInput('');
        } catch (error) { console.error(error); }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedTicket?.messages]);

    return {
        userInfo, tickets, selectedTicket, setSelectedTicket, messageInput, setMessageInput,
        newTicketSubject, setNewTicketSubject, showNewTicketForm, setShowNewTicketForm,
        loading, searchTerm, setSearchTerm, viewMode, setViewMode, showCostConfirm, setShowCostConfirm,
        creditSettings, scrollRef, handleCreateTicket, handleSendMessage
    };
};
