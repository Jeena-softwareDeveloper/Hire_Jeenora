import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../api/api';

export const useGetAllEditors = () => {
    return useQuery({
        queryKey: ['allEditors'],
        queryFn: async () => {
            const { data } = await api.get('/hire/editors');
            return data;
        }
    });
};

export const useGetEditorById = (id) => {
    return useQuery({
        queryKey: ['editor', id],
        queryFn: async () => {
            const { data } = await api.get(`/hire/editors/${id}`);
            return data;
        },
        enabled: !!id
    });
};

export const useCreateResumeRequest = () => {
    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await api.post('/hire/resume-editor/request', payload);
            return data;
        }
    });
};
