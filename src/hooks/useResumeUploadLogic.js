import { useState, useRef } from 'react';

export const useResumeUploadLogic = (onFileUpload, onAnalysisComplete) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault(); e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const processFile = (file) => {
        const validTypes = ['.pdf', '.doc', '.docx', '.txt'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!validTypes.includes(fileExtension)) {
            alert('Please upload PDF, DOC, or DOCX files only');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }
        simulateUploadProgress(file);
    };

    const simulateUploadProgress = (file) => {
        setUploadProgress(0); setIsAnalyzing(false); setAnalysisResult(null);
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    onFileUpload(file);
                    startAnalysis();
                    return 100;
                }
                return prev + 10;
            });
        }, 100);
    };

    const startAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const analysis = {
                score: Math.floor(Math.random() * 30) + 70,
                strengths: ['Clear work experience structure', 'Good use of action verbs', 'Appropriate length', 'Contact information complete'],
                improvements: ['Add more quantifiable achievements', 'Include relevant keywords', 'Improve professional summary', 'Optimize for ATS systems'],
                keywordMatch: 65, atsScore: 72, readability: 'Good'
            };
            setAnalysisResult(analysis); setIsAnalyzing(false);
            onAnalysisComplete?.(analysis);
        }, 3000);
    };

    const removeFile = () => {
        setUploadProgress(0); setIsAnalyzing(false); setAnalysisResult(null);
        onFileUpload(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return {
        dragActive, setDragActive, uploadProgress, isAnalyzing, analysisResult,
        fileInputRef, handleDrag, processFile, removeFile
    };
};
