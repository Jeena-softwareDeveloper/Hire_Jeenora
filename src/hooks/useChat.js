import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import toast from 'react-hot-toast';

export const useGetSellerAdminMessages = () => {
    return useQuery({
        queryKey: ['sellerAdminMessages'],
        queryFn: async () => {
            const { data } = await api.get('/chat/seller/get-admin-messages', { withCredentials: true });
            return data.messages;
        },
    });
};

export const useSendSellerAdminMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (info) => {
            const { data } = await api.post('/chat/seller/support-message', info, { withCredentials: true });
            return data.message;
        },
        onSuccess: (newMessage) => {
            // Optimistic update or invalidation
            queryClient.setQueryData(['sellerAdminMessages'], (old) => old ? [...old, newMessage] : [newMessage]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to send message');
        },
    });
};

export const useGetCustomers = (sellerId) => {
    return useQuery({
        queryKey: ['chatCustomers', sellerId],
        queryFn: async () => {
            const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, { withCredentials: true });
            return data.customers;
        },
        enabled: !!sellerId,
    });
};

export const useGetCustomerMessages = (customerId) => {
    return useQuery({
        queryKey: ['customerMessages', customerId],
        queryFn: async () => {
            const { data } = await api.get(`/chat/seller/get-customer-message/${customerId}`, { withCredentials: true });
            return { messages: data.messages, currentCustomer: data.currentCustomer };
        },
        enabled: !!customerId,
    });
};

export const useSendCustomerMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (info) => {
            const { data } = await api.post('/chat/seller/send-message-to-customer', info, { withCredentials: true });
            return data.message;
        },
        onSuccess: (newMessage, variables) => {
            // variables.receverId is customerId
            const customerId = variables.receverId;

            // Update messages
            queryClient.setQueryData(['customerMessages', customerId], (old) => {
                if (!old) return { messages: [newMessage], currentCustomer: {} };
                return { ...old, messages: [...old.messages, newMessage] };
            });

            // Update customers list (reorder) - logic is complex to replicate exactly without invalidation, but invalidation is safer
            // queryClient.invalidateQueries(['chatCustomers']); // Optional: might be too frequent
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to send message');
        },
    });
};
