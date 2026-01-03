import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineSearch, MdFilterList, MdWork, MdOutlineArrowUpward } from 'react-icons/md';

const DashboardJobsTable = ({ recentJobs, searchTerm, setSearchTerm, totalJobs }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Active Job Postings</h3>
                    <p className="text-gray-600 text-sm">Manage your current job openings</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search jobs..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Job Title</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Applications</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 text-nowrap">Posted Date</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {recentJobs.length > 0 ? (
                            recentJobs.map((job) => (
                                <tr key={job._id} className="hover:bg-gray-50 transition-colors text-nowrap">
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{job.title}</p>
                                            <p className="text-sm text-gray-500">{job.location || 'Remote'}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">{job.applicationsCount || 0}</span>
                                            <span className="text-xs text-gray-500">candidates</span>
                                            {job.applicationsCount > 0 && <MdOutlineArrowUpward className="text-green-500 text-sm" />}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {job.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-900">{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : '--'}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <Link to={`/hire/jobs/${job._id}`} className="px-3 py-1 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition-colors">View</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-12 text-center text-nowrap">
                                    <MdWork className="text-2xl text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">No active job postings found</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {recentJobs.length > 0 && (
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Showing {recentJobs.length} of {totalJobs} jobs</p>
                    <Link to="/hire/jobs" className="px-4 py-2 text-green-700 hover:text-green-900 font-medium flex items-center gap-2">View All Jobs <MdOutlineArrowUpward className="transform rotate-90" /></Link>
                </div>
            )}
        </div>
    );
};

export default DashboardJobsTable;

