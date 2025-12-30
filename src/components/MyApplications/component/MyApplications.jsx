import React, { useState, useEffect } from 'react';
import { socket } from '../../../utils/utils';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaBriefcase, FaCircle } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useGetMyApplications, useGetApplicationStats } from '../../../hooks/useApplications';
import '../css/MyApplications.css';

const MyApplications = () => {
    // const dispatch = useDispatch(); // REMOVED
    const queryClient = useQueryClient();

    const [filters, setFilters] = useState({
        status: 'All',
        search: '',
        sort: 'recent'
    });

    const { data: myApplications = [], isLoading: appsLoading } = useGetMyApplications(filters);
    const { data: stats } = useGetApplicationStats();

    // Combined loading state if needed, or just prioritize app loading
    const loading = appsLoading;

    useEffect(() => {
        socket.on('application_status_update', (data) => {
            // dispatch(update_application_status_realtime(data)); // REMOVED
            toast.success(`Application status updated to ${data.status.replace('_', ' ')}`);
            queryClient.invalidateQueries(['myApplications']);
            queryClient.invalidateQueries(['applicationStats']);
        });

        return () => {
            socket.off('application_status_update');
        };
    }, [queryClient]);

    // --- Horizontal Stepper Component ---
    const ApplicationStepper = ({ currentStatus }) => {
        const steps = ['Applied', 'Under Review', 'Interview', 'Final Decision'];

        // Map backend status to step index [0, 1, 2, 3]
        const getStepIndex = (status) => {
            if (!status) return 0;
            switch (status) {
                case 'applied': return 0;
                case 'viewed': return 1;
                case 'interview_scheduled':
                case 'interview_completed': return 2;
                case 'offer_extended':
                case 'offer_accepted':
                case 'rejected':
                case 'withdrawn':
                case 'hired': return 3;
                default: return 0;
            }
        };

        const currentStepIndex = getStepIndex(currentStatus);

        // Determine color for the final step based on rejection/hiring
        // const getStepColor... removed

        return (
            <div className="flex items-center w-full max-w-md relative mt-4 md:mt-0">
                {steps.map((step, index) => {
                    const isActive = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const isFinal = index === steps.length - 1;

                    return (
                        <div key={index} className="relative flex-1 flex flex-col items-center">
                            {/* Line Connector within the loop (except for last item) */}
                            {!isFinal && (
                                <div className={`absolute top-[7px] left-1/2 w-full h-[2px] -z-0 ${index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}></div>
                            )}

                            {/* Circle Dot */}
                            <div className={`w-4 h-4 rounded-full border-2 bg-white z-10 flex items-center justify-center transition-colors duration-300 ${isActive ? (isCurrent ? 'bg-blue-600 border-blue-600' : 'bg-blue-600 border-blue-600') : 'border-gray-300'
                                }`}>
                                {/* Inner dot for current active step only? Or just full color */}
                                {isActive && <div className="w-full h-full rounded-full bg-blue-600" />}
                            </div>

                            {/* Label */}
                            <span className={`text-[10px] md:text-xs font-medium mt-2 absolute top-5 w-max ${isActive ? 'text-slate-800' : 'text-slate-400'
                                }`}>
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const ApplicationCard = ({ app }) => {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-4 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Left Side: Info */}
                    <div className="flex items-center gap-5 w-full md:w-auto">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center border border-slate-100 bg-slate-50 text-blue-600 font-bold overflow-hidden">
                            {app.jobId?.company?.logo ? (
                                <img
                                    src={app.jobId.company.logo}
                                    alt="Logo"
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.parentElement.innerHTML = app.jobId?.company?.name?.charAt(0) || 'C' }}
                                />
                            ) : (
                                <span>{app.jobId?.company?.name?.charAt(0) || 'C'}</span>
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 hover:text-blue-600 cursor-pointer transition">
                                {app.jobId?.title || 'Job Title'}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-slate-500 text-sm mt-1">
                                <span className="font-medium text-slate-700">{app.jobId?.company?.name || 'Company'}</span>
                                <span className="text-slate-300">•</span>
                                <span className="flex items-center gap-1">
                                    <FaMapMarkerAlt size={11} className="text-slate-400" />
                                    {app.jobId?.location?.city || 'Location'}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="flex items-center gap-1">
                                    <FaBriefcase size={11} className="text-slate-400" />
                                    {app.jobId?.jobType || 'Full-time'}
                                </span>
                            </div>
                            <div className="text-xs text-slate-400 mt-2 font-medium">
                                Applied: {new Date(app.createdAt).toLocaleDateString()} <span className="mx-1">•</span> ID: {app._id?.slice(-6).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Stepper and Actions */}
                    <div className="w-full md:w-1/2 flex flex-col items-end justify-between h-full">
                        <ApplicationStepper currentStatus={app.currentStatus} />
                        <div className="mt-8"> {/* Spacer container */}
                            <a
                                href={`/hire/tracking/${app._id}`}
                                className="bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm flex items-center gap-2"
                            >
                                Job Tracking →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen bg-slate-50"><PropagateLoader color='#2563EB' /></div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">My Applications</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="text-slate-500 text-xs font-semibold mb-1">Applications Sent</div>
                        <div className="text-2xl font-bold text-slate-900">{stats?.total || 0}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="text-slate-500 text-xs font-semibold mb-1">Recruiter Actions</div>
                        <div className="text-2xl font-bold text-slate-900">{stats?.viewed || 0}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="text-slate-500 text-xs font-semibold mb-1">Shortlisted</div>
                        <div className="text-2xl font-bold text-slate-900">{stats?.shortlisted || 0}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="text-slate-500 text-xs font-semibold mb-1">Interviews</div>
                        <div className="text-2xl font-bold text-slate-900">{stats?.interview || 0}</div>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-white rounded-xl border border-slate-200 p-2 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Tabs */}
                    <div className="flex overflow-x-auto no-scrollbar w-full md:w-auto">
                        {['All', 'Active', 'Under Review', 'Interview', 'Rejected'].map(t => (
                            <button
                                key={t}
                                onClick={() => setFilters({ ...filters, status: t })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filters.status === t
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Search & Filter Button */}
                    <div className="flex gap-3 w-full md:w-auto items-center">
                        <div className="relative flex-1 md:w-72">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                            <input
                                type="text"
                                placeholder="Search applications..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 placeholder-slate-400 transition"
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm">
                            <FaFilter size={12} className="text-slate-500" /> Filter
                        </button>
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                    {myApplications.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <FaBriefcase size={24} />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">No applications found</h3>
                            <p className="text-slate-500 mb-6 max-w-sm mx-auto">We couldn't find any applications matching your current filters.</p>
                            <button
                                onClick={() => setFilters({ ...filters, status: 'All', search: '' })}
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        myApplications.map(app => (
                            <ApplicationCard key={app._id} app={app} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyApplications;
