import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetSavedJobs, useGetMyApplications } from '../../../hooks/useJobs';
import JobCard from '../../../components/hire/JobCard';
import { PropagateLoader } from 'react-spinners';
import { FaBookmark, FaSearch, FaFilter, FaMapMarkerAlt, FaTimes, FaBriefcase } from 'react-icons/fa';
import '../css/SavedJobs.css';

const SavedJobs = () => {
    const { data: savedJobsData, isLoading: loading } = useGetSavedJobs();
    const { data: myApplications } = useGetMyApplications();
    const savedJobs = savedJobsData || [];

    const [filters, setFilters] = useState({
        search: '',
        location: '',
        jobType: [],
        sortBy: 'recent'
    });

    const isJobApplied = (jobId) => {
        return myApplications?.some(app => app.jobId?._id === jobId || app.jobId === jobId);
    };

    const filteredJobs = savedJobs.filter(job => {
        const searchText = filters.search.toLowerCase();
        const matchesSearch = filters.search === '' ||
            job.title?.toLowerCase().includes(searchText) ||
            job.company?.name?.toLowerCase().includes(searchText);

        const matchesLocation = filters.location === '' ||
            job.location?.city?.toLowerCase().includes(filters.location.toLowerCase());

        const matchesType = filters.jobType.length === 0 || filters.jobType.includes(job.jobType);

        return matchesSearch && matchesLocation && matchesType;
    });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (filters.sortBy === 'recent') return new Date(b.postedDate) - new Date(a.postedDate);
        if (filters.sortBy === 'salary_high') return (b.salary?.max || 0) - (a.salary?.max || 0);
        return 0;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <PropagateLoader color='#10B981' />
                <span className="ml-3 text-gray-600">Loading saved jobs...</span>
            </div>
        );
    }

    return (
        <div>
            {/* Header - Same row on mobile */}
            <div className="flex flex-row justify-between items-center mb-6 gap-4 w-full">
                <div className="text-left shrink-0">
                    <h1 className="text-xl sm:text-3xl lg:text-xl font-black text-slate-900 uppercase tracking-tighter">Saved Jobs</h1>
                </div>

                <div className="flex items-center justify-end shrink-0">
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className="hidden sm:inline text-[10px] font-black text-slate-500 uppercase tracking-widest">Sort</span>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                            className="px-2 py-1.5 md:px-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-[9px] md:text-[10px] font-bold uppercase tracking-wide bg-white shadow-sm text-slate-600 outline-none"
                        >
                            <option value="recent">Recent</option>
                            <option value="salary_high">Salary</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full pb-8 lg:pb-12 pt-0">
                <div className="flex flex-col gap-6">
                    {/* Main Content */}
                    <div className="w-full">
                        {/* Job List */}
                        {savedJobs.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaBookmark className="text-2xl text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved jobs yet</h3>
                                <p className="text-gray-600 mb-6">
                                    Save jobs you're interested in by clicking the bookmark icon
                                </p>
                                <Link
                                    to="/hire/jobs"
                                    className="btn-premium inline-flex max-w-max mx-auto"
                                >
                                    Browse Jobs
                                </Link>
                            </div>
                        ) : filteredJobs.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaSearch className="text-2xl text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
                                <p className="text-gray-600 mb-4">
                                    Try adjusting your filters or search terms
                                </p>
                                <button
                                    onClick={() => setFilters({
                                        search: '',
                                        location: '',
                                        jobType: [],
                                        sortBy: 'recent'
                                    })}
                                    className="btn-premium"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sortedJobs.map((job) => (
                                    <JobCard
                                        key={job._id}
                                        job={job}
                                        isApplied={isJobApplied(job._id)}
                                        isSaved={true}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedJobs;
