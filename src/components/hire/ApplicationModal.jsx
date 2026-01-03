import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux'; // REMOVED
import { FaTimes, FaCheckCircle, FaFileAlt, FaCoins } from 'react-icons/fa';
// import { apply_for_job, messageClear } from '../../../store/Reducers/jobReducer'; // REMOVED
import useAuthStore from '@/store/useAuthStore';
import { useApplyJob } from '../../hooks/useJobs';
// import toast from 'react-hot-toast';

const ApplicationModal = ({ job, onClose, onSuccess }) => {
    // const dispatch = useDispatch(); // REMOVED
    const userInfo = useAuthStore(state => state.userInfo);
    const refreshUser = useAuthStore(state => state.refreshUser);

    const applyMutation = useApplyJob();
    const loading = applyMutation.isPending;

    // Steps: 1=Check, 2=Resume, 3=Confirm, 4=Success
    const [step, setStep] = useState(1);
    const [selectedResume, setSelectedResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [answers, setAnswers] = useState({ noticePeriod: '', expectedSalary: '' });

    // Mock Resumes (In real app, fetch from Redux store or API)
    // Assuming userInfo has resumeUrl, we treat it as primary.
    // Ideally fetch from 'resume' slice.
    const resumes = userInfo?.resumeUrl ? [{ id: 'primary', name: 'Primary Resume', url: userInfo.resumeUrl }] : [];

    const handleApply = () => {
        const payload = {
            jobId: job._id,
            resumeId: selectedResume?.id || 'primary', // Use ID or assume primary
            coverLetter,
            answers
        };
        applyMutation.mutate(payload, {
            onSuccess: () => {
                setStep(4);
                refreshUser();
                if (onSuccess) onSuccess();
            }
        });
    };

    // Step 1: Eligibility Check
    useEffect(() => {
        if (step === 1) {
            if (userInfo?.creditBalance < job.application?.creditsRequired) {
                // Stay on step 1 to show error
            } else {
                // Auto proceed or let user click Next
            }
        }
    }, [step, userInfo, job]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-fadeIn">
            <div className="bg-white w-full max-w-xl rounded-[1rem] shadow-2xl border border-slate-100 overflow-hidden animate-slideUp">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-semibold text-gray-800">
                        {step === 1 && 'Eligibility Check'}
                        {step === 2 && 'Application Details'}
                        {step === 3 && 'Confirm Application'}
                        {step === 4 && 'Success'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    {step === 1 && (
                        <div className="space-y-6 text-center py-4">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 text-2xl">
                                <FaCoins />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Check Credits</h4>
                                <p className="text-gray-500 mb-6">Applying to <span className="font-semibold">{job.title}</span> requires credits.</p>

                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 inline-block w-full text-left">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600">Required Credits:</span>
                                        <span className="font-bold text-red-600">-{job.application?.creditsRequired}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                                        <span className="text-gray-600">Your Balance:</span>
                                        <span className={`font-bold ${userInfo?.creditBalance >= job.application?.creditsRequired ? 'text-green-600' : 'text-red-500'}`}>
                                            {userInfo?.creditBalance || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {userInfo?.creditBalance < job.application?.creditsRequired ? (
                                <div className="text-red-500 text-sm bg-red-50 p-3 rounded">
                                    Insufficient credits. Please purchase more to apply.
                                </div>
                            ) : (
                                <button onClick={() => setStep(2)} className="btn-premium w-full py-3 shadow-blue-500/20">
                                    Continue to Apply
                                </button>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Resume</label>
                                {resumes.length > 0 ? (
                                    <div className="space-y-2">
                                        {resumes.map((res, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setSelectedResume(res)}
                                                className={`p-3 border rounded-lg cursor-pointer flex items-center gap-3 ${selectedResume === res ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:bg-gray-50'}`}
                                            >
                                                <FaFileAlt className="text-gray-400" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-800">{res.name}</div>
                                                </div>
                                                {selectedResume === res && <FaCheckCircle className="text-blue-500" />}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center p-4 border border-dashed border-gray-300 rounded text-gray-500 text-sm">
                                        No resumes found. Please upload one in your profile.
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    rows="3"
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                    placeholder="Why are you a good fit?"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period (Days)</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                        value={answers.noticePeriod}
                                        onChange={(e) => setAnswers({ ...answers, noticePeriod: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary (LPA)</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                        value={answers.expectedSalary}
                                        onChange={(e) => setAnswers({ ...answers, expectedSalary: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(3)}
                                disabled={!selectedResume && resumes.length === 0}
                                className="btn-premium w-full py-3 shadow-blue-500/20 disabled:from-blue-100 disabled:to-emerald-100 disabled:text-blue-400 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                Review Application
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                                <FaCheckCircle className="text-blue-600 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-blue-900">Confirm Application</h4>
                                    <p className="text-sm text-blue-700 mt-1">
                                        You are applying to <strong>{job.company?.name}</strong> for <strong>{job.title}</strong>.
                                        This will deduct <strong>{job.application?.creditsRequired} credits</strong> from your balance.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm text-gray-700">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Resume:</span>
                                    <span className="font-medium">{selectedResume?.name || 'Default'}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Notice Period:</span>
                                    <span className="font-medium">{answers.noticePeriod || 'N/A'} Days</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Expected Salary:</span>
                                    <span className="font-medium">{answers.expectedSalary || 'N/A'} LPA</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button onClick={() => setStep(2)} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition">
                                    Edit
                                </button>
                                <button onClick={handleApply} disabled={loading} className="btn-premium flex-1 py-2.5 shadow-blue-500/20 disabled:from-blue-100 disabled:to-emerald-100 disabled:text-blue-400 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-70">
                                    {loading ? 'Applying...' : 'Confirm & Apply'}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 text-4xl mb-6">
                                <FaCheckCircle />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                            <p className="text-gray-500 mb-8 max-w-xs mx-auto">Your application has been sent to {job.company?.name}. Good luck!</p>

                            <div className="flex flex-col gap-3">
                                <button onClick={() => window.location.href = '/hire/job-tracking'} className="btn-premium w-full py-3 shadow-blue-500/20">
                                    Track Application
                                </button>
                                <button onClick={onClose} className="w-full text-gray-500 py-2 hover:text-gray-800">
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationModal;

