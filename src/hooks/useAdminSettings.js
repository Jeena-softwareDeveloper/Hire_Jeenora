import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import toast from 'react-hot-toast';

export const useGetCreditSettings = () => {
    return useQuery({
        queryKey: ['creditSettings'],
        queryFn: async () => {
            const { data } = await api.get('/hire/setting/credits');
            return data;
        }
    });
};

export const useUpdateCreditSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (settings) => {
            const { data } = await api.put('/hire/setting/credits', settings);
            return data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['creditSettings'], data.settings);
            toast.success('Settings updated successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to update settings');
        }
    });
};

export const useGetPlanSettings = () => {
    return useQuery({
        queryKey: ['planSettings'],
        queryFn: async () => {
            const { data } = await api.get('/hire/setting/plans');
            return data;
        }
    });
};

export const useUpdatePlanSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (settings) => {
            const { data } = await api.put('/hire/setting/plans', settings);
            return data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['planSettings'], data.settings);
            toast.success('Plans updated successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to update plans');
        }
    });
};
