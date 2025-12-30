import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaRupeeSign, FaClock, FaBuilding, FaCheckCircle, FaChevronLeft, FaCoins } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import ApplicationModal from '../../../components/hire/ApplicationModal';
import { useGetJob, useGetMyApplications } from '../../../hooks/useJobs';
import api from '../../../api/api';
import '../css/JobDetails.css';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: job, isLoading: loading, error } = useGetJob(id);
    const { data: myApplications } = useGetMyApplications();
    // const { userInfo } = useAuthStore(state => state);

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [creditsCost, setCreditsCost] = useState(5);

    React.useEffect(() => {
        const fetchCredits = async () => {
            try {
                const { data } = await api.get('/hire/setting/credits');
                setCreditsCost(data.jobApplyCost);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCredits();
    }, []);

    // Check if already applied
    const isApplied = myApplications?.some(app => app.jobId?._id === id || app.jobId === id);

    if (loading) return <div className="h-screen flex justify-center items-center"><PropagateLoader color="#2563EB" /></div>;
    if (error) return <div className="h-screen flex justify-center items-center text-red-500">Failed to load job details</div>;
    if (!job) return null;

    return (
        <div className="bg-slate-50 min-h-screen py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors">
                    <FaChevronLeft className="mr-2" /> Back to Jobs
                </button>

                {/* Job Header */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {job.company?.logo ? (
                            <img
                                src={job.company.logo}
                                alt={job.company?.name}
                                className="w-20 h-20 rounded-lg object-cover border border-slate-100"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-lg bg-blue-600 text-white flex items-center justify-center text-3xl font-bold border border-slate-100 uppercase">
                                {job.company?.name?.charAt(0) || 'C'}
                            </div>
                        )}
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h1>
                            <div className="text-lg text-slate-700 font-medium mb-4">{job.company?.name}</div>

                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
                                <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-blue-500" /> {job.location?.city}, {job.location?.country} {job.location?.isRemote && '(Remote)'}</span>
                                <span className="flex items-center gap-1.5"><FaBriefcase className="text-blue-500" /> {job.jobType}</span>
                                <span className="flex items-center gap-1.5"><FaRupeeSign className="text-blue-500" /> {job.salary?.isDisclosed ? `₹${(job.salary?.min / 100000).toFixed(1)} - ${(job.salary?.max / 100000).toFixed(1)} LPA` : 'Not Disclosed'}</span>
                                <span className="flex items-center gap-1.5"><FaClock className="text-blue-500" /> Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                {isApplied ? (
                                    <button
                                        className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold cursor-default opacity-80"
                                    >
                                        Already Applied
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setShowApplyModal(true)}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                                    >
                                        Apply Now
                                    </button>
                                )}
                                {!isApplied && (
                                    <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-2">
                                        <FaCoins size={12} className="text-amber-500" />
                                        Requires <span className="font-bold text-slate-800">{job.application?.creditsRequired !== undefined ? job.application.creditsRequired : creditsCost} Credits</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Job Description</h2>
                            <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap">
                                {job.description}
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Requirements</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-2">Key Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {job.requirements?.mustHave?.map((skill, i) => (
                                            <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {job.requirements?.goodToHave?.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold text-slate-800 mb-2">Good to have</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {job.requirements?.goodToHave?.map((skill, i) => (
                                                <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-sm border border-slate-100">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><FaBuilding /> Company Info</h3>
                            <p className="text-slate-600 mb-4">{job.company?.about || 'No description available.'}</p>
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between py-2 border-b border-slate-50">
                                    <span className="text-slate-500">Industry</span>
                                    <span className="font-medium text-slate-800">{job.company?.industry || 'Technology'}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-50">
                                    <span className="text-slate-500">Company Size</span>
                                    <span className="font-medium text-slate-800">{job.company?.size || 'Not Specified'}</span>
                                </div>
                                {job.company?.website && (
                                    <div className="flex justify-between py-2 border-b border-slate-50">
                                        <span className="text-slate-500">Website</span>
                                        <a href={job.company.website.startsWith('http') ? job.company.website : `https://${job.company.website}`} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">Visit Site</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Application Modal */}
                {showApplyModal && (
                    <ApplicationModal
                        job={job}
                        onClose={() => setShowApplyModal(false)}
                        onSuccess={() => {
                            setShowApplyModal(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default JobDetails;
