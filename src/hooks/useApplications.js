import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import toast from 'react-hot-toast';

export const useGetMyApplications = (queryParams) => {
    return useQuery({
        queryKey: ['myApplications', queryParams],
        queryFn: async () => {
            const { data } = await api.get('/hire/applications/my', { params: queryParams });
            return data.applications;
        },
        keepPreviousData: true,
    });
};

export const useGetApplicationStats = () => {
    return useQuery({
        queryKey: ['applicationStats'],
        queryFn: async () => {
            const { data } = await api.get('/hire/applications/stats');
            return data.stats;
        },
    });
};

export const useWithdrawApplication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.post(`/hire/applications/${id}/withdraw`);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(['myApplications']);
            queryClient.invalidateQueries(['applicationStats']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Withdrawal failed');
        },
    });
};

export const useAddApplicationNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, note }) => {
            const { data } = await api.put(`/hire/applications/${id}/notes`, { note });
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(['myApplications']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to add note');
        },
    });
};

export const useGetJobMessages = (applicationId) => {
    return useQuery({
        queryKey: ['jobMessages', applicationId],
        queryFn: async () => {
            const { data } = await api.get(`/hire/applications/message/${applicationId}`);
            return data.messages;
        },
        enabled: !!applicationId,
    });
};

export const useSendJobMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (info) => {
            const { data } = await api.post(`/hire/applications/message`, info);
            return data.data; // Assuming format matches reducer payload
        },
        onSuccess: (newMessage, variables) => {
            // Optimistically update messages or invalidate
            // Variables has { applicationId, message }
            queryClient.setQueryData(['jobMessages', variables.applicationId], (old) => {
                return old ? [...old, newMessage] : [newMessage];
            });
            // Also invalidate to be sure?
            // queryClient.invalidateQueries(['jobMessages', variables.applicationId]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Message sending failed');
        },
    });
};
