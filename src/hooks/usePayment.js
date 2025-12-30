import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../api/api';

export const useGetSubscription = () => {
    return useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            const { data } = await api.get('/hire/payment/subscription', { withCredentials: true });
            return data;
        }
    });
};

export const useCreateOrder = () => {
    return useMutation({
        queryKey: ['createOrder'],
        mutationFn: async ({ plan }) => {
            const { data } = await api.post('/hire/payment/create-order', { plan }, { withCredentials: true });
            return data;
        }
    });
};

export const useCreateCreditOrder = () => {
    return useMutation({
        queryKey: ['createCreditOrder'],
        mutationFn: async (credits) => {
            const { data } = await api.post('/hire/payment/create-credit-order', { credits }, { withCredentials: true });
            return data;
        }
    });
};

export const useVerifyCreditPayment = () => {
    return useMutation({
        queryKey: ['verifyPayment'],
        mutationFn: async (paymentData) => {
            const { data } = await api.post('/hire/payment/verify', paymentData, { withCredentials: true });
            return data;
        }
    });
};
