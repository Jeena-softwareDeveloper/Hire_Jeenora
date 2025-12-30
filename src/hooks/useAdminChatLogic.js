import { useState, useEffect, useRef, useMemo } from 'react';
import api from '../api/api';
import { socket } from '../utils/utils';
import toast from 'react-hot-toast';

export const useAdminChatLogic = (userInfo) => {
    const [tickets, setTickets] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('chat');
    const [statusFilter, setStatusFilter] = useState('all');
    const [mobileToggle, setMobileToggle] = useState(false);
    const messagesEndRef = useRef(null);

    const fetchTickets = async () => {
        try {
            const { data } = await api.get('/admin/chat-support/tickets');
            setTickets(data); setLoading(false);
        } catch (error) { console.error(error); setLoading(false); }
    };

    useEffect(() => {
        fetchTickets();
        if (userInfo?._id) socket.emit('add_admin', userInfo);
    }, [userInfo]);

    useEffect(() => {
        socket.on('ticket_message_received', (data) => {
            setTickets(prev => {
                const updated = prev.map(t => {
                    if (t._id === data.ticketId) {
                        return { ...t, messages: [...t.messages, data.message], lastMessageAt: data.message.timestamp };
                    }
                    return t;
                });
                return updated.sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
            });
            if (selectedTicket?._id === data.ticketId) {
                setSelectedTicket(prev => ({ ...prev, messages: [...prev.messages, data.message] }));
            }
        });
        socket.on('new_ticket_alert', (data) => {
            toast.success(`Operational Alert: ${data.subject}`); fetchTickets();
        });
        return () => { socket.off('ticket_message_received'); socket.off('new_ticket_alert'); };
    }, [selectedTicket?._id]);

    const userGroups = useMemo(() => {
        const userMap = {};
        tickets.forEach(ticket => {
            const uid = ticket.userId?._id; if (!uid) return;
            if (!userMap[uid]) userMap[uid] = { ...ticket.userId, tickets: [], totalRequests: 0, activeChannel: false, lastActivity: ticket.lastMessageAt || ticket.createdAt };
            userMap[uid].tickets.push(ticket); userMap[uid].totalRequests++;
            if (ticket.status === 'open') userMap[uid].activeChannel = true;
            if (new Date(ticket.lastMessageAt || ticket.createdAt) > new Date(userMap[uid].lastActivity)) userMap[uid].lastActivity = ticket.lastMessageAt || ticket.createdAt;
        });
        return Object.values(userMap).sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
    }, [tickets]);

    const handleSendMessage = async (e) => {
        e.preventDefault(); if (!messageInput.trim() || !selectedTicket) return;
        try {
            const msg = messageInput; setMessageInput('');
            await api.post(`/admin/chat-support/tickets/${selectedTicket._id}/message`, { senderId: userInfo._id, senderModel: 'admins', message: msg });
        } catch (error) { console.error(error); }
    };

    return {
        tickets, selectedUser, setSelectedUser, selectedTicket, setSelectedTicket, messageInput, setMessageInput, loading, searchTerm, setSearchTerm, activeTab, setActiveTab,
        statusFilter, setStatusFilter, mobileToggle, setMobileToggle, messagesEndRef, userGroups, handleSendMessage,
        stats: { open: tickets.filter(t => t.status === 'open').length, total: tickets.length }
    };
};
