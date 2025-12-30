import React from "react";
import { FaFilePdf, FaUpload } from "react-icons/fa";

function ProfileResumes({ resumes, handleResumeUpload, setPrimaryResume, deleteMyResume }) {
    return (
        <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FaFilePdf className="text-gray-400 text-3xl mx-auto mb-3" />
                <p className="text-gray-700 font-medium mb-2">Upload New Resume</p>
                <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX up to 5MB</p>
                <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
                    <FaUpload className="mr-2" /> Choose File
                    <input type="file" onChange={handleResumeUpload} accept=".pdf,.doc,.docx" className="hidden" />
                </label>
            </div>

            <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Resumes ({resumes.length})</h4>
                <div className="space-y-3">
                    {resumes.map((resume) => (
                        <div key={resume._id} className={`p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between ${resume.isPrimary ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-center gap-3 mb-3 sm:mb-0">
                                <FaFilePdf className={`text-lg ${resume.isPrimary ? 'text-green-600' : 'text-gray-400'}`} />
                                <div>
                                    <p className="font-medium text-gray-900">{resume.resumeTitle}</p>
                                    <p className="text-xs text-gray-500">Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm">View</a>
                                {!resume.isPrimary && (
                                    <button onClick={() => setPrimaryResume(resume._id)} className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm">Make Primary</button>
                                )}
                                <button onClick={() => deleteMyResume(resume._id)} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfileResumes;
