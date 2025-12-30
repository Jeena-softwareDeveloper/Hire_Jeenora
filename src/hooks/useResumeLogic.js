import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useUploadNewResume } from './useResumes';
import { useCreateResumeRequest, useGetAllEditors } from './useResumeEditor';
import { useGetJobs } from './useJobs';

export const useResumeLogic = () => {
    const { data: resumeEditorsData } = useGetAllEditors();
    const resumeEditors = resumeEditorsData || [];
    const { data: jobsData } = useGetJobs({ status: 'active', limit: 20 });
    const availableJobs = jobsData?.jobs || [];

    const uploadResumeMutation = useUploadNewResume();
    const createRequestMutation = useCreateResumeRequest();

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedEditor, setSelectedEditor] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showEditorProfile, setShowEditorProfile] = useState(false);
    const [resumeChoice, setResumeChoice] = useState(null);
    const [selectedEditorProfile, setSelectedEditorProfile] = useState(null);

    const [resumeDetails, setResumeDetails] = useState({
        fullName: '', email: '', phone: '', experienceLevel: '',
        linkedIn: '', portfolio: ''
    });

    const steps = [
        { number: 1, title: 'Choose Editor', description: 'Select your resume expert' },
        { number: 2, title: 'Resume Option', description: 'Upload or Select' },
        { number: 3, title: 'Select Job', description: 'Choose target position' },
        { number: 4, title: 'Review & Pay', description: 'Confirm and checkout' }
    ];

    const handleEditorSelect = (editor) => {
        setSelectedEditor(editor);
        setCurrentStep(2);
        setResumeChoice(null);
    };

    const handleResumeDetailsChange = (e) => {
        const { name, value } = e.target;
        setResumeDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleViewEditorProfile = (editor) => {
        setSelectedEditorProfile(editor);
        setShowEditorProfile(true);
    };

    const handleJobSelect = (job) => {
        setSelectedJob(job);
        setCurrentStep(4);
    };

    const handleProceedToPayment = async () => {
        if (!selectedEditor || !selectedJob) {
            toast.error("Please complete all steps");
            return;
        }
        if (resumeChoice === 'new' && !uploadedFile) {
            toast.error("Please upload your resume file.");
            return;
        }
        if (resumeChoice === 'new' && !resumeDetails.fullName) {
            toast.error("Please provide your full name for the resume.");
            return;
        }

        const toastId = toast.loading("Processing your request...");
        try {
            let resumeId = null;
            if (resumeChoice === 'new') {
                const formData = new FormData();
                formData.append('resume', uploadedFile);
                formData.append('title', uploadedFile.name);
                const resume = await uploadResumeMutation.mutateAsync(formData);
                resumeId = resume._id;
            } else {
                resumeId = "existing_resume_id_placeholder";
            }

            await createRequestMutation.mutateAsync({
                currentResumeId: resumeId,
                targetRole: selectedJob.title || "Custom Role",
                requirements: "Please improve my resume for this role.",
                editorId: selectedEditor._id || selectedEditor.id,
                jobId: selectedJob.id || null,
                candidateDetails: resumeDetails
            });

            toast.success("Order placed successfully!", { id: toastId });
            setOrderPlaced(true);
        } catch (error) {
            const msg = error?.response?.data?.error || "Failed to process order";
            toast.error(msg, { id: toastId });
        }
    };

    const resetOrder = () => {
        setOrderPlaced(false);
        setCurrentStep(1);
        setSelectedEditor(null);
        setUploadedFile(null);
        setSelectedJob(null);
        setAnalysisResult(null);
        setResumeChoice(null);
        setResumeDetails({ fullName: '', email: '', phone: '', experienceLevel: '', linkedIn: '', portfolio: '' });
    };

    const canProceedToNextStep = () => {
        switch (currentStep) {
            case 1: return selectedEditor !== null;
            case 2: return resumeChoice === 'existing' || (resumeChoice === 'new' && uploadedFile !== null);
            case 3: return selectedJob !== null;
            default: return false;
        }
    };

    const getDeliveryDate = () => {
        if (!selectedEditor) return '';
        const days = parseInt(selectedEditor.deliveryTime) || 3;
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return {
        resumeEditors, availableJobs, currentStep, setCurrentStep, selectedEditor, setSelectedEditor,
        uploadedFile, setUploadedFile, selectedJob, setSelectedJob, analysisResult, setAnalysisResult,
        orderPlaced, setOrderPlaced, showEditorProfile, setShowEditorProfile, resumeChoice, setResumeChoice,
        selectedEditorProfile, setSelectedEditorProfile, resumeDetails, setResumeDetails,
        steps, handleEditorSelect, handleResumeDetailsChange, handleViewEditorProfile,
        handleJobSelect, handleProceedToPayment, resetOrder, canProceedToNextStep, getDeliveryDate,
        handleResumeOptionSelect: (option) => {
            setResumeChoice(option);
            if (option === 'existing') {
                setUploadedFile({ name: 'Existing Resume.pdf' });
                setCurrentStep(3);
            }
        }
    };
};
