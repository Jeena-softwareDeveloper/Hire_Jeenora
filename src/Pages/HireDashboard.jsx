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
            <div className='w-full min-h-screen flex flex-col justify-center items-center bg-gray-50/50 backdrop-blur-sm font-["Outfit"]'>
                <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center animate-pulse">
                        <MdWork className="text-2xl text-cyan-600" />
                    </div>
                </div>
                <PropagateLoader color='#06b6d4' cssOverride={overrideStyle} />
                <p className="mt-4 text-slate-600 font-medium tracking-wide">Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header Section - Same row on mobile */}
            <div className="flex flex-row justify-between items-center mb-6 gap-4 w-full">
                <div className="text-left">
                    <h1 className="text-xl sm:text-3xl lg:text-xl font-black text-slate-900 uppercase tracking-tighter">
                        Hi, {userInfo?.name?.split(' ')[0] || 'User'}!
                    </h1>
                </div>

                {/* Right Side: Credits */}
                <div className="flex items-center shrink-0">
                    <div className="flex items-center bg-gradient-to-r from-blue-500 to-emerald-500 px-3 py-1.5 rounded-full shadow-lg shadow-blue-500/30 gap-1.5 transition transform hover:scale-105">
                        <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <MdAccountBalanceWallet className="text-white text-[9px]" />
                        </div>
                        <span className="text-white font-bold text-[9px] uppercase tracking-wide whitespace-nowrap">{userInfo?.creditBalance || 0} Credits</span>
                    </div>
                </div>
            </div>

            {/* Main Content Section - Matches Profile.jsx wrapper */}
            <div className="w-full pb-8 lg:pb-12 pt-0 min-h-[calc(100vh-200px)]">
                {/* Stats Grid */}
                <DashboardStats analytics={analytics} />

                {/* Analytics Chart */}
                <div className="mt-8">
                    <AnalyticsSection />
                </div>

                {/* Tables Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {/* Jobs Table takes up 2 columns */}
                    <div className="lg:col-span-2">
                        <DashboardJobsTable recentJobs={recentJobs} searchTerm={searchTerm} setSearchTerm={setSearchTerm} totalJobs={totalJobs} />
                    </div>
                    {/* Interviews takes up 1 column */}
                    <div className="lg:col-span-1">
                        <DashboardInterviews scheduledInterviews={analytics.scheduledInterviews} />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default HireDashboard;

