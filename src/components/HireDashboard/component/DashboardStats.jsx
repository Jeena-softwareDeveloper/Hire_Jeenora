import React from 'react';
import { MdVisibility, MdPeople, MdWork, MdOutlineTrendingUp, MdOutlineArrowUpward, MdOutlineArrowDownward } from 'react-icons/md';

const DashboardStats = ({ analytics }) => {
    const stats = [
        { label: "Job Views", value: analytics.views, icon: <MdVisibility />, color: "green", trend: null },
        { label: "Applications", value: analytics.applications, icon: <MdPeople />, color: "blue", trend: analytics.applicationsTrend, trendLabel: "from last month" },
        { label: "Hired Candidates", value: analytics.hires, icon: <MdWork />, color: "orange", trend: analytics.hiresTrend, trendLabel: "from last month" },
        { label: "Open Positions", value: analytics.activeJobs, icon: <MdOutlineTrendingUp />, color: "purple", trend: null, subtext: `${analytics.applications || 0} total applications` }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value || 0}</h3>
                            {stat.trend !== null ? (
                                <div className="flex items-center mt-2">
                                    {stat.trend >= 0 ? <MdOutlineArrowUpward className={`text-${stat.color}-500 mr-1`} /> : <MdOutlineArrowDownward className="text-red-500 mr-1" />}
                                    <span className={`text-sm ${stat.trend >= 0 ? `text-${stat.color}-600` : 'text-red-600'}`}>
                                        {stat.trend > 0 ? '+' : ''}{stat.trend}% {stat.trendLabel}
                                    </span>
                                </div>
                            ) : stat.subtext ? (
                                <p className="text-sm text-gray-500 mt-2">{stat.subtext}</p>
                            ) : (
                                <p className="text-sm text-gray-500 mt-2">Track your {stat.label.toLowerCase()}</p>
                            )}
                        </div>
                        <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                            {React.cloneElement(stat.icon, { className: `text-xl text-${stat.color}-600` })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
