import React from 'react';
import { FaStar } from 'react-icons/fa';

const OrderDetailsSection = ({ selectedEditor, selectedJob, uploadedFile, analysisResult }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center text-white font-semibold">
                        {selectedEditor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div><p className="font-semibold text-gray-900">{selectedEditor.name}</p><p className="text-sm text-gray-600">{selectedEditor.specialization}</p></div>
                </div>
                <div className="flex items-center gap-2 text-green-800"><FaStar className="text-yellow-400" /><span className="font-semibold">{selectedEditor.rating}</span></div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg flex justify-between">
                <div><p className="font-semibold text-gray-900">{selectedJob.title}</p><p className="text-sm text-gray-600">{selectedJob.company.name || selectedJob.company} • {selectedJob.location.city || selectedJob.location}</p></div>
                <div className="text-right"><p className="text-sm text-gray-600">Match Score</p><p className="font-semibold text-green-800">{selectedJob.matchScore}%</p></div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                <div><p className="font-semibold text-gray-900 truncate">{uploadedFile.name}</p><p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p></div>
                {analysisResult && (
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${analysisResult.score >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {analysisResult.score}/100
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetailsSection;
