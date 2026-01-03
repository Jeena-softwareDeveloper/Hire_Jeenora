import React from 'react';
import { MdVisibility, MdPeople, MdWork, MdOutlineTrendingUp, MdOutlineArrowUpward, MdOutlineArrowDownward } from 'react-icons/md';

const DashboardStats = ({ analytics }) => {
    const stats = [
        {
            label: "Job Views",
            value: analytics.views,
            icon: <MdVisibility />,
            color: "text-emerald-600",
            bg: "bg-gradient-to-br from-blue-50 to-emerald-50",
            subtext: "Track your job views",
            delay: "delay-100"
        },
        {
            label: "Applications",
            value: analytics.applications,
            icon: <MdPeople />,
            color: "text-blue-600",
            bg: "bg-blue-50",
            trend: analytics.applicationsTrend,
            trendLabel: "from last month",
            delay: "delay-200"
        },
        {
            label: "Hired Candidates",
            value: analytics.hires,
            icon: <MdWork />,
            color: "text-orange-600",
            bg: "bg-orange-50",
            trend: analytics.hiresTrend,
            trendLabel: "from last month",
            delay: "delay-300"
        },
        {
            label: "Open Positions",
            value: analytics.activeJobs,
            icon: <MdOutlineTrendingUp />,
            color: "text-purple-600",
            bg: "bg-purple-50",
            subtext: `${analytics.applications || 0} total applications`,
            delay: "delay-500"
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className={`bg-white rounded-xl p-3 md:p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group opacity-0 animate-fadeIn fill-mode-forwards ${stat.delay}`}
                    style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
                >
                    <div className="flex justify-between items-center">
                        <div className="min-w-0">
                            <p className="text-slate-500 text-[10px] font-medium mb-1 group-hover:text-blue-500 transition-colors truncate">{stat.label}</p>
                            <h3 className="text-lg md:text-2xl font-bold text-slate-800 leading-none">{stat.value || 0}</h3>
                        </div>
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl shrink-0 ${stat.bg} ${stat.color} flex items-center justify-center text-sm md:text-lg shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                            {stat.icon}
                        </div>
                    </div>


                </div>
            ))}
        </div>
    );
};

export default DashboardStats;

