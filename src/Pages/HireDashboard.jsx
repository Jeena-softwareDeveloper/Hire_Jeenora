import React from 'react';
import { MdWork, MdAccountBalanceWallet } from "react-icons/md";
import { PropagateLoader } from 'react-spinners';
import { useDashboardLogic } from '../hooks/useDashboardLogic';
import DashboardStats from '../components/HireDashboard/component/DashboardStats';
import DashboardJobsTable from '../components/HireDashboard/component/DashboardJobsTable';
import DashboardInterviews from '../components/HireDashboard/component/DashboardInterviews';
import AnalyticsSection from '../components/HireDashboard/component/AnalyticsSection';
import { overrideStyle } from '../utils/utils';
import '../components/HireDashboard/css/HireDashboard.css';

function HireDashboard() {
    const { userInfo, analytics, recentJobs, loader, searchTerm, setSearchTerm, totalJobs } = useDashboardLogic();

    if (loader) {
        return (
            <div className='w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 font-["Outfit"]'>
                <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <MdWork className="text-2xl text-green-600" />
                    </div>
                </div>
                <PropagateLoader color='#166534' cssOverride={overrideStyle} />
                <p className="mt-4 text-gray-600">Loading your hiring dashboard...</p>
            </div>
        );
    }

    return (
        <div className="px-4 md:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen font-['Outfit']">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, {userInfo?.name || 'User'}! 👋</h1>
                    <p className="text-gray-600 mt-2">Here's your hiring overview for today</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 text-sm font-medium text-gray-700 shadow-sm">
                        <MdAccountBalanceWallet className="text-xl text-green-600" />
                        <span>Credits: {userInfo?.creditBalance || 0}</span>
                    </div>
                </div>
            </div>

            <DashboardStats analytics={analytics} />
            <div className="mb-6"><AnalyticsSection /></div>
            <DashboardJobsTable recentJobs={recentJobs} searchTerm={searchTerm} setSearchTerm={setSearchTerm} totalJobs={totalJobs} />
            <DashboardInterviews scheduledInterviews={analytics.scheduledInterviews} />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                body { font-family: 'Outfit', sans-serif; }
            `}</style>
        </div>
    );
}

export default HireDashboard;
