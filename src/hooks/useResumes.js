import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import toast from 'react-hot-toast';

export const useGetMyResumes = () => {
    return useQuery({
        queryKey: ['myResumes'],
        queryFn: async () => {
            const { data } = await api.get('/hire/resumes/list');
            return data.resumes;
        }
    });
};

export const useUploadNewResume = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await api.post('/hire/resumes/upload', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return data.resume;
        },
        onSuccess: () => {
            // Optimistic updates could be complex with list, easier to invalidate
            queryClient.invalidateQueries(['myResumes']);
            toast.success('Resume uploaded successfully');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to upload resume');
        }
    });
};

export const useDeleteMyResume = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (resumeId) => {
            const { data } = await api.delete(`/hire/resumes/${resumeId}`);
            return data;
        },
        onSuccess: (data, resumeId) => {
            queryClient.setQueryData(['myResumes'], (old) => {
                return old ? old.filter(r => r._id !== resumeId) : old;
            });
            toast.success('Resume deleted');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to delete resume');
        }
    });
};

export const useSetPrimaryResume = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (resumeId) => {
            const { data } = await api.put(`/hire/resumes/${resumeId}/primary`);
            return data;
        },
        onSuccess: (data, resumeId) => {
            queryClient.setQueryData(['myResumes'], (old) => {
                if (!old) return old;
                return old.map(r => ({
                    ...r,
                    isPrimary: r._id === resumeId
                }));
            });
            toast.success('Primary resume updated');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to set primary resume');
        }
    });
};
