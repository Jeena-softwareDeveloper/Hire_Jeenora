import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from "jwt-decode";
import api from '../api/api';

const returnRole = (token) => {
    if (!token) return '';
    try {
        const decodeToken = jwtDecode(token);
        const expireTime = new Date(decodeToken.exp * 1000);
        if (new Date() > expireTime) {
            localStorage.removeItem('jeenora_hire_auth');
            sessionStorage.removeItem('jeenora_hire_auth');
            return '';
        } else {
            let role = decodeToken.role?.toLowerCase() || '';
            const normalized = role.replace(/_|-/g, '');
            if (normalized === 'jobseeker' || normalized === 'hire' || normalized === 'hireuser') {
                return 'hireuser';
            }
            return normalized;
        }
    } catch (error) {
        console.error('Token decode error:', error);
        return '';
    }
};

const initialState = {
    userInfo: null,
    token: null,
    role: '',
    isAuthenticated: false,
    isHire: false,
    loader: false,
    errorMessage: '',
    successMessage: ''
};

const useAuthStore = create(
    persist(
        (set, get) => ({
            ...initialState,

            // Actions
            setLoader: (status) => set({ loader: status }),
            setMessage: (type, message) => set({ [type === 'success' ? 'successMessage' : 'errorMessage']: message }),
            clearMessage: () => set({ successMessage: '', errorMessage: '' }),

            setAuth: (data) => {
                const { token } = data;
                const userInfo = data.userInfo || data.user;
                let role = returnRole(token);

                // Normalize role for frontend consistency
                if (role === 'job_seeker' || role === 'job-seeker' || role === 'hire') {
                    role = 'hireuser';
                }

                if (userInfo && userInfo.role) {
                    const normalizedRole = userInfo.role.toLowerCase().replace(/_|-/g, '');
                    if (normalizedRole === 'jobseeker' || normalizedRole === 'hire' || normalizedRole === 'hireuser') {
                        userInfo.role = 'hireuser';
                    } else {
                        userInfo.role = normalizedRole;
                    }
                }

                if (role) {
                    localStorage.setItem('authToken', token);
                    set({
                        token,
                        userInfo,
                        role,
                        isAuthenticated: true,
                        isHire: role === 'hireuser',
                        errorMessage: '',
                        loader: false
                    });
                    // Also set axios default header if needed, though usually handled by interceptors
                } else {
                    // Invalid token
                    get().logout();
                }
            },

            updateUser: (userInfo) => set({ userInfo }),

            refreshUser: async () => {
                try {
                    const { data } = await api.get('/hire/user/profile', { withCredentials: true });
                    set({ userInfo: data.userInfo || data.user });
                } catch (error) {
                    console.error("Refresh user failed", error);
                }
            },


            logout: async () => {
                set({ loader: true });
                try {
                    await api.get('/logout', { withCredentials: true });
                } catch (error) {
                    console.error('Logout API call failed', error);
                }

                // Clear local/session storage manually just in case, though persist middleware handles the state
                localStorage.removeItem('jeenora_hire_auth');
                sessionStorage.removeItem('jeenora_hire_auth');
                localStorage.removeItem('authToken');
                sessionStorage.removeItem('authToken');

                set({ ...initialState, loader: false });
            },

            // Helper to check token validity on mount/init
            checkAuth: () => {
                const { token } = get();
                if (token) {
                    const role = returnRole(token);
                    if (!role) {
                        get().logout();
                    }
                }
            }
        }),
        {
            name: 'jeenora_hire_auth', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
            partialize: (state) => ({
                userInfo: state.userInfo,
                token: state.token,
                role: state.role,
                isAuthenticated: state.isAuthenticated,
                isHire: state.isHire
            }), // Only persist these fields
        }
    )
);

export default useAuthStore;
