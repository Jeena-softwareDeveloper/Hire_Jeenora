import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaRupeeSign, FaClock, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSaveJob } from '../../hooks/useJobs';

const JobCard = ({ job, isApplied, isSaved }) => {
    const navigate = useNavigate();
    const saveJobMutation = useSaveJob();

    const handleViewDetails = () => {
        navigate(`/hire/jobs/${job._id}`);
    };

    const handleSaveJob = (e) => {
        e.stopPropagation();
        saveJobMutation.mutate(job._id);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 hover:shadow-md transition-all relative">
            <button
                onClick={handleSaveJob}
                className="absolute top-5 right-5 text-slate-400 hover:text-blue-600 transition-colors"
            >
                {isSaved ? <FaBookmark className="text-blue-600" size={18} /> : <FaRegBookmark size={18} />}
            </button>
            <div className="flex justify-between items-start">
                {/* ... existing code ... */}
                <div className="flex gap-4">
                    {job.company?.logo ? (
                        <img
                            src={job.company.logo}
                            alt={job.company?.name}
                            className="w-12 h-12 rounded object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold uppercase">
                            {job.company?.name?.charAt(0) || 'C'}
                        </div>
                    )}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">{job.title}</h3>
                        <p className="text-slate-600 font-medium">{job.company?.name}</p>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1"><FaMapMarkerAlt size={12} /> {job.location?.city}{job.location?.isRemote ? ' • Remote' : ''}</span>
                            <span className="flex items-center gap-1"><FaBriefcase size={12} /> {job.jobType}</span>
                        </div>
                    </div>
                </div>
                {/* Match Score Placeholder - calculated logic needed based on user profile connection */}
                {/* <div className="text-right">
                    <span className="text-green-600 font-bold text-sm">85% Match</span>
                </div> */}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {job.requirements?.mustHave?.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4 border-slate-100">
                <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                        <FaRupeeSign size={12} />
                        {job.salary?.isDisclosed
                            ? `${(job.salary?.min / 100000).toFixed(1)} - ${(job.salary?.max / 100000).toFixed(1)} LPA`
                            : 'Not Disclosed'}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaClock size={12} /> {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex items-center gap-2">

                    <span className="text-xs text-slate-500">{job.application?.creditsRequired} Credits</span>
                    {isApplied ? (
                        <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded text-sm font-medium border border-green-100">
                            Already Applied
                        </span>
                    ) : (
                        <button
                            onClick={handleViewDetails}
                            className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                            View Details →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobCard;
