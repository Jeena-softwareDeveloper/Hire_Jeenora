import React from 'react';
import { FaUpload } from 'react-icons/fa';

const ResumeUploadDropzone = ({ dragActive, handleDrag, handleDrop, handleChange, fileInputRef }) => {
    return (
        <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive ? 'border-green-800 bg-green-50 scale-[1.02]' : 'border-gray-300 bg-gray-50'}`}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUpload className="text-green-800 text-2xl" />
            </div>
            <p className="text-gray-600 mb-2 text-lg font-medium">Drag & drop your resume here</p>
            <p className="text-gray-500 mb-6">or click to browse files from your computer</p>
            <input ref={fileInputRef} type="file" onChange={handleChange} accept=".pdf,.doc,.docx,.txt" className="hidden" id="resume-upload" />
            <label htmlFor="resume-upload" className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors cursor-pointer font-medium">
                <FaUpload /> Choose File
            </label>
            <p className="text-xs text-gray-500 mt-4">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
        </div>
    );
};

export default ResumeUploadDropzone;
