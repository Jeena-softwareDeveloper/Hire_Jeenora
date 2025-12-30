import { useQuery } from '@tanstack/react-query';
import api from '../api/api';

export const useGetDashboardAnalytics = (timeFrame = 'month') => {
    return useQuery({
        queryKey: ['dashboardAnalytics', timeFrame],
        queryFn: async () => {
            const { data } = await api.get(`/hire/employer/analytics?timeFrame=${timeFrame}`, { withCredentials: true });
            return data;
        }
    });
};
