import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import toast from 'react-hot-toast';

export const useGetNotifications = (queryParams) => {
    return useQuery({
        queryKey: ['notifications', queryParams],
        queryFn: async () => {
            const { data } = await api.get('/hire/notifications', { params: queryParams });
            return data;
        }
    });
};

export const useMarkNotificationRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.patch(`/hire/notifications/${id}/read`);
            return { ...data, id };
        },
        onSuccess: () => {
            // Invalidate to refresh count and list
            queryClient.invalidateQueries(['notifications']);
        }
    });
};

export const useMarkAllNotificationsRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { data } = await api.patch('/hire/notifications/mark-all-read');
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications']);
            toast.success('All notifications marked as read');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to mark all as read');
        }
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/hire/notifications/${id}`);
            return { ...data, id };
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications']);
            toast.success('Notification removed');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to delete notification');
        }
    });
};

export const useDeleteAllNotifications = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { data } = await api.delete('/hire/notifications/clear-all');
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications']);
            toast.success('All notifications cleared');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to clear notifications');
        }
    });
};
