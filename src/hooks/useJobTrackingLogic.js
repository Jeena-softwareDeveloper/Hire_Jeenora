import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useGetJobMessages, useSendJobMessage, useGetMyApplications } from './useApplications';
import { socket } from '../utils/utils';
import api from '../api/api';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

export const useJobTrackingLogic = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { userInfo } = useAuthStore();

    const [chatEnableCost, setChatEnableCost] = useState(0);
    const [isEnablingChat, setIsEnablingChat] = useState(false);
    const [showEnableConfirm, setShowEnableConfirm] = useState(false);
    const [activeView, setActiveView] = useState('details');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [messageInput, setMessageInput] = useState('');

    const scrollRef = useRef();

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const { data } = await api.get('/hire/setting/credits');
                setChatEnableCost(data.chatEnableCost || 10);
            } catch (error) { console.error(error); }
        };
        fetchCredits();
    }, []);

    const { data: myApplications = [] } = useGetMyApplications();
    const application = myApplications.find(a => a._id === id);
    const { data: messages = [], isLoading: messagesLoading } = useGetJobMessages(id);
    const sendMessageMutation = useSendJobMessage();

    useEffect(() => {
        if (application?.chatEnabled) setActiveView('chat');
        else setActiveView('details');
    }, [application?.chatEnabled]);

    useEffect(() => {
        if (!application) return;
        const joinData = { applicationId: application._id, userId: application.userId, role: 'user' };
        socket.emit('join_application_chat', joinData);
        api.put('/hire/applications/message/read', { applicationId: application._id }).catch(() => { });

        socket.on('new_job_message', (msg) => {
            if (msg.applicationId === application._id && msg.senderId !== application.userId) {
                queryClient.setQueryData(['jobMessages', application._id], (old) => old ? [...old, msg] : [msg]);
                api.put('/hire/applications/message/read', { applicationId: application._id }).catch(() => { });
            }
        });

        socket.on('chat_partner_status', (data) => {
            if (data.applicationId === application._id && data.userId !== application.userId && data.status === 'online') {
                socket.emit('join_application_chat', joinData);
            }
        });

        socket.on('message_read_update', (data) => {
            if (data.applicationId === application._id && data.readerId !== application.userId) {
                queryClient.setQueryData(['jobMessages', application._id], (old) => old ? old.map(m => ({ ...m, isRead: true })) : old);
            }
        });

        return () => {
            socket.emit('leave_application_chat', joinData);
            socket.off('new_job_message'); socket.off('chat_partner_status'); socket.off('message_read_update');
        };
    }, [application, queryClient]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        sendMessageMutation.mutate({ applicationId: application._id, message: messageInput }, { onSuccess: () => setMessageInput('') });
    };

    const handleEnableChat = async () => {
        if (isEnablingChat) return;
        setIsEnablingChat(true);
        try {
            const { data } = await api.post(`/hire/applications/${application._id}/enable-chat`);
            toast.success(data.message);
            queryClient.invalidateQueries(['myApplications']);
            useAuthStore.getState().refreshUser();
            setActiveView('chat');
        } catch (error) { toast.error(error.response?.data?.error || 'Failed to enable chat'); }
        finally { setIsEnablingChat(false); setShowEnableConfirm(false); }
    };

    return {
        id, navigate, application, messages, messagesLoading, activeView, setActiveView,
        messageInput, setMessageInput, isDropdownOpen, setIsDropdownOpen,
        showEnableConfirm, setShowEnableConfirm, chatEnableCost, isEnablingChat,
        handleSendMessage, handleEnableChat, scrollRef, userInfo
    };
};
