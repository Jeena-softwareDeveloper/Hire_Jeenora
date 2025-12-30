import { useMutation } from '@tanstack/react-query';
import api from '../api/api';
import toast from 'react-hot-toast';

export const useActiveStripeAccount = () => {
    return useMutation({
        mutationFn: async (activeCode) => {
            const { data } = await api.put(`/seller/active-stripe-connect/${activeCode}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || 'Account activated successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to activate account');
        }
    });
};
