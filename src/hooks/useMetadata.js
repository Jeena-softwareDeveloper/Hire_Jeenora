import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../api/api';

// --- Skills ---

export const useGetAllSkills = () => {
    return useQuery({
        queryKey: ['allSkills'],
        queryFn: async () => {
            const { data } = await api.get('/hire/skills');
            return data.skills || data.categories || data;
        }
    });
};

export const useGetSkillById = (id) => {
    return useQuery({
        queryKey: ['skill', id],
        queryFn: async () => {
            const { data } = await api.get(`/hire/skills/${id}`);
            return data.skill || data.category || data;
        },
        enabled: !!id
    });
};

// --- Locations ---

export const useGetAllLocations = () => {
    return useQuery({
        queryKey: ['allLocations'],
        queryFn: async () => {
            const { data } = await api.get('/hire/location');
            return data.locations;
        }
    });
};

export const useGetDistrictsByState = (stateName) => {
    return useQuery({
        queryKey: ['districts', stateName],
        queryFn: async () => {
            const { data } = await api.get(`/hire/location/state/${stateName}`);
            return data.districts;
        },
        enabled: !!stateName
    });
};

export const useAssignUserToDistrict = () => {
    return useMutation({
        mutationFn: async ({ districtId, userId }) => {
            const { data } = await api.post(`/hire/location/district/${districtId}`, { userId });
            return data;
        }
    });
};
