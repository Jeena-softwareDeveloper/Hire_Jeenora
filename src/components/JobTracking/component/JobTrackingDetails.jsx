import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaFileAlt, FaBuilding } from 'react-icons/fa';
import StatusBadge from '../../common/StatusBadge';

const JobTrackingDetails = ({ application }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 mb-2">{application.jobId?.title}</h1>
                        <h2 className="text-base text-blue-600 font-bold">{application.jobId?.company?.name}</h2>
                    </div>
                    <div className="flex flex-col items-end">
                        <StatusBadge status={application.currentStatus} />
                        <span className="text-[11px] text-slate-400 mt-3 font-bold uppercase tracking-wider">
                            Updated: {new Date(application.updatedAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                {application.statusHistory?.[application.statusHistory.length - 1]?.notes && (
                    <div className="mb-8 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50 text-sm text-slate-700">
                        <span className="font-black text-blue-900 block mb-2 text-xs uppercase tracking-widest">Feedback:</span>
                        {application.statusHistory[application.statusHistory.length - 1].notes}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-slate-500 text-xs border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2 font-bold"><FaMapMarkerAlt className="text-blue-400" /> {application.jobId?.location?.city}</div>
                    <div className="flex items-center gap-2 font-bold"><FaBriefcase className="text-blue-400" /> {application.jobId?.jobType}</div>
                    <div className="flex items-center gap-2 font-bold"><FaClock className="text-blue-400" /> Applied {new Date(application.createdAt).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2 font-bold"><FaFileAlt className="text-blue-400" /> ID: {application._id.slice(-6).toUpperCase()}</div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-sm font-black text-slate-900 mb-8 uppercase tracking-[0.2em] border-b border-slate-100 pb-4">Company Profile</h3>
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl border flex items-center justify-center bg-white shadow-sm p-2">
                        {application.jobId?.company?.logo ? <img src={application.jobId.company.logo} alt="Logo" className="w-full h-full object-contain" /> : <FaBuilding size={24} className="text-slate-300" />}
                    </div>
                    <div><div className="text-lg font-black text-slate-900">{application.jobId?.company?.name}</div><div className="text-sm text-slate-500 font-bold">{application.jobId?.title}</div></div>
                </div>
                <div className="space-y-6">
                    {[
                        { label: 'Position', val: application.jobId?.title },
                        { label: 'Work Location', val: application.jobId?.location?.city || 'Remote' }
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl">
                            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{item.label}</div>
                            <div className="text-sm font-bold text-slate-800">{item.val}</div>
                        </div>
                    ))}
                    <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Status</div>
                        <div className="mt-1"><StatusBadge status={application.currentStatus} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobTrackingDetails;

