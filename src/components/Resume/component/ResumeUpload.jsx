import React from 'react';
import { FaTimes, FaCheck, FaFilePdf, FaFileWord, FaRobot, FaSpinner, FaEye, FaDownload } from 'react-icons/fa';
import { useResumeUploadLogic } from '../../../hooks/useResumeUploadLogic';
import ResumeUploadDropzone from './ResumeUploadDropzone';
import CandidateDetailsForm from './CandidateDetailsForm';
import ResumeAnalysisResults from './ResumeAnalysisResults';

const ResumeUpload = ({ onFileUpload, currentFile, onAnalysisComplete, resumeDetails, onDetailsChange, readOnly = false }) => {
  const {
    dragActive, uploadProgress, isAnalyzing, analysisResult, fileInputRef,
    handleDrag, processFile, removeFile
  } = useResumeUploadLogic(onFileUpload, onAnalysisComplete);

  const getFileIcon = (name) => {
    const ext = name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <FaFilePdf className="text-red-500 text-2xl" />;
    return <FaFileWord className="text-blue-500 text-2xl" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 font-['Outfit']">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Upload Your Resume</h3>
          <p className="text-gray-600 mt-1">Instant AI-powered analysis and improvements</p>
        </div>
        {currentFile && !isAnalyzing && (
          <button onClick={removeFile} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"><FaTimes /> Remove</button>
        )}
      </div>

      {!currentFile ? (
        <ResumeUploadDropzone
          dragActive={dragActive} handleDrag={handleDrag} fileInputRef={fileInputRef}
          handleDrop={(e) => { e.preventDefault(); e.stopPropagation(); if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }}
          handleChange={(e) => { if (e.target.files[0]) processFile(e.target.files[0]); }}
        />
      ) : (
        <div className="space-y-6">
          <div className="border border-green-200 bg-green-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getFileIcon(currentFile.name)}
                <div><p className="font-medium text-gray-900">{currentFile.name}</p><p className="text-sm text-gray-600">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p></div>
              </div>
              <div className="flex items-center gap-2"><FaCheck className="text-green-800" /><span className="text-sm text-green-800 font-medium">Uploaded</span></div>
            </div>
            {uploadProgress < 100 && (
              <div className="mt-3"><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-800 h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} /></div></div>
            )}
          </div>

          <CandidateDetailsForm resumeDetails={resumeDetails} onDetailsChange={onDetailsChange} readOnly={readOnly} />

          {isAnalyzing && (
            <div className="border border-blue-200 bg-blue-50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-3"><FaRobot className="text-blue-800 text-xl" /><span className="text-blue-800 font-medium">AI Analysis in Progress</span></div>
              <FaSpinner className="animate-spin text-blue-800 text-2xl mx-auto" />
            </div>
          )}

          <ResumeAnalysisResults result={analysisResult} />

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"><FaEye /> Preview</button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"><FaDownload /> Download</button>
            <button onClick={removeFile} className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"><FaTimes /> Upload New</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;