import { useState } from 'react';
import { useGetDashboardAnalytics } from './useDashboard';
import useAuthStore from '../store/useAuthStore';

export const useDashboardLogic = () => {
    const { userInfo } = useAuthStore(state => state);
    const { data: analyticsData, isLoading: loader } = useGetDashboardAnalytics('month');
    const [searchTerm, setSearchTerm] = useState('');

    const analytics = analyticsData?.data || {
        views: 0, applications: 0, hires: 0, profileScore: 0, conversionRate: 0,
        avgTimeToHire: 0, activeJobs: 0, scheduledInterviews: 0, screening: 0,
        interviews: 0, offers: 0
    };

    const recentJobs = analyticsData?.recentJobs || [];
    const filteredJobs = recentJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return {
        userInfo, analytics, recentJobs: filteredJobs, loader, searchTerm, setSearchTerm,
        totalJobs: analyticsData?.totalJobs || 0
    };
};
