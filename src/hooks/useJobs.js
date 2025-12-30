import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import toast from 'react-hot-toast';

export const useGetJobs = (queryParams) => {
    return useQuery({
        queryKey: ['jobs', queryParams],
        queryFn: async () => {
            const { data } = await api.get('/hire/jobs', { params: queryParams });
            return data;
        },
        keepPreviousData: true,
    });
};

export const useGetJob = (id) => {
    return useQuery({
        queryKey: ['job', id],
        queryFn: async () => {
            const { data } = await api.get(`/hire/jobs/${id}`);
            return data.job;
        },
        enabled: !!id,
    });
};

export const useGetMyApplications = () => {
    return useQuery({
        queryKey: ['myApplications'],
        queryFn: async () => {
            const { data } = await api.get('/hire/applications/my');
            return data.applications;
        },
    });
};

export const useGetSavedJobs = () => {
    return useQuery({
        queryKey: ['savedJobs'],
        queryFn: async () => {
            const { data } = await api.get('/hire/jobs/saved');
            return data.savedJobs;
        },
    });
};

export const useApplyJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await api.post('/hire/applications', payload);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(['myApplications']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Application failed');
        },
    });
};

export const useSaveJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (jobId) => {
            const { data } = await api.post('/hire/jobs/save', { jobId });
            return { ...data, jobId };
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(['savedJobs']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to save job');
        },
    });
};
