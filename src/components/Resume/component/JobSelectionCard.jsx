import React from 'react';
import { FaStar, FaHeart, FaRegHeart, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const JobSelectionCard = ({ job, isSelected, onClick, toggleFavorite, isFavorite, showAI }) => {
    const getMatchScoreColor = (s) => s >= 90 ? 'bg-green-100 text-green-800' : s >= 80 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';

    return (
        <div
            onClick={() => onClick(job)}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md group ${isSelected ? 'border-green-800 bg-green-50 scale-[1.02]' : 'border-gray-200 hover:border-green-800'} ${job.isHot ? 'ring-2 ring-yellow-200' : ''}`}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 truncate">{job.title}</h4>
                        {job.isHot && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex gap-1 items-center"><FaStar /> Hot</span>}
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{job.company.name || job.company}</p>
                    {showAI && <span className={`text-xs px-2 py-1 rounded-full ${getMatchScoreColor(job.matchScore)}`}>{job.matchScore}% match</span>}
                </div>
                <button onClick={(e) => toggleFavorite(job.id || job._id, e)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                </button>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2"><FaMapMarkerAlt className="mr-1 text-xs" /><span>{job.location.city || job.location}</span></div>
            <div className="flex flex-wrap gap-1 mb-3">
                {(job.skills || []).slice(0, 3).map((s, i) => <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{s}</span>)}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex gap-4"><span>{job.experience}</span><span className="font-medium text-green-800">{job.salary}</span></div>
                <div className="flex items-center gap-2 text-xs"><FaClock /><span>{job.posted || 'Recent'}</span></div>
            </div>
        </div>
    );
};

export default JobSelectionCard;

