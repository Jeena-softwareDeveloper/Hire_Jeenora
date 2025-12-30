import React, { useState } from 'react';
import { useGetJobs, useGetMyApplications, useGetSavedJobs } from '../../../hooks/useJobs';
import JobCard from '../../../components/hire/JobCard';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaBriefcase, FaMoneyBill } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import '../css/Jobs.css';

const Jobs = () => {
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        experienceMin: '',
        experienceMax: '',
        salaryMin: '',
        salaryMax: '',
        jobType: [],
        page: 1,
        limit: 10
    });

    const { data: jobsData, isLoading: jobsLoading } = useGetJobs(filters);
    const { data: myApplications } = useGetMyApplications();
    const { data: savedJobs } = useGetSavedJobs();

    const jobs = jobsData?.jobs || [];
    const totalJobs = jobsData?.total || 0;
    const pages = Math.ceil(totalJobs / filters.limit);

    const handlePageChange = (newPage) => {
        setFilters({ ...filters, page: newPage });
    };

    const isJobApplied = (jobId) => {
        return myApplications?.some(app => app.jobId?._id === jobId || app.jobId === jobId);
    };

    const isJobSaved = (jobId) => {
        return savedJobs?.some(job => job._id === jobId || job === jobId);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Find Your Dream Job</h1>
                            <p className="text-gray-600 text-sm mt-1">Browse thousands of job opportunities</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <select
                                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white"
                            >
                                <option value="recent">Most Recent</option>
                                <option value="salary_high">Highest Salary</option>
                                <option value="salary_low">Lowest Salary</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col gap-6">
                    {/* Main Content */}
                    <div className="w-full">

                        {/* Loading State */}
                        {jobsLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <PropagateLoader color="#10B981" />
                                <span className="ml-3 text-gray-600">Loading jobs...</span>
                            </div>
                        ) : (
                            <>
                                {/* Job List */}
                                <div className="space-y-4">
                                    {jobs.length > 0 ? (
                                        jobs.map(job => (
                                            <JobCard
                                                key={job._id}
                                                job={job}
                                                isApplied={isJobApplied(job._id)}
                                                isSaved={isJobSaved(job._id)}
                                            />
                                        ))
                                    ) : (
                                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FaBriefcase className="text-2xl text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                                            <p className="text-gray-600 mb-4">
                                                Try adjusting your filters or search terms
                                            </p>
                                            <button
                                                onClick={() => setFilters({
                                                    search: '',
                                                    location: '',
                                                    experienceMin: '',
                                                    experienceMax: '',
                                                    salaryMin: '',
                                                    salaryMax: '',
                                                    jobType: [],
                                                    page: 1,
                                                    limit: 10
                                                })}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                            >
                                                Reset Filters
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Pagination */}
                                {pages > 1 && (
                                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                                        <button
                                            onClick={() => handlePageChange(Math.max(1, filters.page - 1))}
                                            disabled={filters.page === 1}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>

                                        {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                                            let pageNum;
                                            if (pages <= 5) {
                                                pageNum = i + 1;
                                            } else if (filters.page <= 3) {
                                                pageNum = i + 1;
                                            } else if (filters.page >= pages - 2) {
                                                pageNum = pages - 4 + i;
                                            } else {
                                                pageNum = filters.page - 2 + i;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`px-4 py-2 border rounded-lg ${filters.page === pageNum
                                                        ? 'bg-green-600 text-white border-green-600'
                                                        : 'border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => handlePageChange(Math.min(pages, filters.page + 1))}
                                            disabled={filters.page === pages}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;