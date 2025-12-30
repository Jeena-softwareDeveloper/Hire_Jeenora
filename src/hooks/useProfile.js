import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import toast from 'react-hot-toast';

// --- Profile CRUD ---

export const useGetProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await api.get('/hire/profile/me');
            return data.profile; // Assuming data.profile is where the object lives based on reducer
        }
    });
};

export const useCreateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (profileData) => {
            const { data } = await api.post('/hire/user/profile', profileData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['profile']);
            toast.success('Profile created successfully');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to create profile');
        }
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (profileData) => {
            const { data } = await api.put('/hire/profile/me', profileData);
            return data.profile;
        },
        onSuccess: (newProfile) => {
            queryClient.setQueryData(['profile'], newProfile);
            toast.success('Profile updated successfully');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to update profile');
        }
    });
};

export const useDeleteProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { data } = await api.delete('/hire/user/profile');
            return data;
        },
        onSuccess: () => {
            queryClient.setQueryData(['profile'], null);
            toast.success('Profile deleted');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to delete profile');
        }
    });
};

// --- Profile Image ---

export const useUploadProfileImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await api.post('/hire/user/profile/image', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return data.profile;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['profile']);
            toast.success('Image uploaded');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Image upload failed');
        }
    });
};

export const useDeleteProfileImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { data } = await api.delete('/hire/user/profile/image');
            return data.profile;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['profile']);
            toast.success('Image removed');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to remove image');
        }
    });
};

// --- Single Resume (Profile attached) ---

export const useUploadResume = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await api.post('/hire/user/profile/resume', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return data.profile;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['profile']);
            toast.success('Resume uploaded');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to upload resume');
        }
    });
};

export const useDeleteResume = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { data } = await api.delete('/hire/user/profile/resume');
            return data.profile;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['profile']);
            toast.success('Resume deleted');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to delete resume');
        }
    });
};


// --- Skills ---

export const useGetUserSkills = () => {
    return useQuery({
        queryKey: ['userSkills'],
        queryFn: async () => {
            const { data } = await api.get('/hire/user/skills');
            return data.skills;
        }
    });
};

export const useAddSkillToProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (skillId) => {
            // Need current skills to simulate the logic or backend handles it?
            // The reducer logic did a "get state" check.
            // Ideally backend handles uniqueness, but here we likely rely on backend PUT to just take the list or skillId?
            // The reducer: const updatedSkills = [...currentSkills, skillId]; await api.put...
            // It seems the API expects the FULL LIST of skills in 'skills' field.

            // This is tricky without existing data.
            // For now, let's assume we pass the LIST to this mutation or the mutation handles fetching.
            // Actually, best pattern is to let the component pass the NEW list.
            // But to keep API simple for caller:
            const currentProfile = queryClient.getQueryData(['profile']);
            const currentSkills = currentProfile?.skills?.map(s => s._id) || [];
            if (currentSkills.includes(skillId)) throw new Error("Skill already added");

            const updatedSkills = [...currentSkills, skillId];
            const { data } = await api.put("/hire/user/profile", { skills: updatedSkills });
            return data.profile;
        },
        onSuccess: (newProfile) => {
            queryClient.setQueryData(['profile'], newProfile);
            toast.success('Skill added');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || err.message || 'Failed to add skill');
        }
    });
};

export const useRemoveSkillFromProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (skillId) => {
            const currentProfile = queryClient.getQueryData(['profile']);
            const currentSkills = currentProfile?.skills?.map(s => s._id) || [];
            const updatedSkills = currentSkills.filter(id => id !== skillId);

            const { data } = await api.put("/hire/user/profile", { skills: updatedSkills });
            return data.profile;
        },
        onSuccess: (newProfile) => {
            queryClient.setQueryData(['profile'], newProfile);
            toast.success('Skill removed');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to remove skill');
        }
    });
};

export const useRequestProfessionalEdit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId) => {
            const { data } = await api.post("/hire/resume-requests", { userId });
            return data;
        },
        onSuccess: () => {
            // Optimistically update profile to show enabled
            queryClient.setQueryData(['profile'], (old) => old ? { ...old, resumeEditorEnabled: true } : old);
            toast.success('Professional edit requested');
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || 'Failed to request edit');
        }
    });
};
