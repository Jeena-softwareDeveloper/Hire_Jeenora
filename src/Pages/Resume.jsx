import React from 'react';
import { FaArrowLeft, FaRocket } from 'react-icons/fa';
import { useResumeLogic } from '../hooks/useResumeLogic';
import ResumeSteps from '../components/Resume/component/ResumeSteps';
import ResumeChoice from '../components/Resume/component/ResumeChoice';
import ResumeSuccess from '../components/Resume/component/ResumeSuccess';
import ResumeBenefits from '../components/Resume/component/ResumeBenefits';
import ResumeEditorList from '../components/Resume/component/ResumeEditorList';
import ResumeUpload from '../components/Resume/component/ResumeUpload';
import JobSelection from '../components/Resume/component/JobSelection';
import OrderSummary from '../components/Resume/component/OrderSummary';
import EditorProfile from '../components/Resume/component/EditorProfile';
import '../components/Resume/css/Resume.css';

function Resume() {
    const {
        resumeEditors, availableJobs, currentStep, setCurrentStep, selectedEditor, setSelectedEditor,
        uploadedFile, setUploadedFile, selectedJob, setSelectedJob, analysisResult, setAnalysisResult,
        orderPlaced, showEditorProfile, setShowEditorProfile, resumeChoice, setResumeChoice,
        selectedEditorProfile, resumeDetails, steps, handleEditorSelect, handleResumeDetailsChange,
        handleViewEditorProfile, handleJobSelect, handleProceedToPayment, resetOrder,
        canProceedToNextStep, getDeliveryDate, handleResumeOptionSelect
    } = useResumeLogic();

    if (showEditorProfile && selectedEditorProfile) {
        return (
            <EditorProfile
                editor={selectedEditorProfile} onBack={() => setShowEditorProfile(false)}
                onSelect={() => { setSelectedEditor(selectedEditorProfile); setShowEditorProfile(false); setCurrentStep(2); setResumeChoice(null); }}
            />
        );
    }

    if (orderPlaced) return <ResumeSuccess selectedEditor={selectedEditor} deliveryDate={getDeliveryDate()} resetOrder={resetOrder} />;

    return (
        <div className="bg-transparent">
            {/* Header - Same row on mobile */}
            <div className="flex flex-row justify-between items-center mb-6 gap-4 w-full">
                <div className="text-left shrink-0">
                    <h1 className="text-xl sm:text-3xl lg:text-xl font-black text-slate-900 uppercase tracking-tighter">Professional Resume Editing</h1>
                </div>
            </div>

            <div className="w-full pb-8 lg:pb-12 pt-0">

                <ResumeSteps currentStep={currentStep} steps={steps} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {currentStep === 1 && <ResumeEditorList editors={resumeEditors} onSelectEditor={handleEditorSelect} selectedEditor={selectedEditor} onViewProfile={handleViewEditorProfile} />}
                        {currentStep === 2 && !resumeChoice && <ResumeChoice handleResumeOptionSelect={handleResumeOptionSelect} />}
                        {currentStep === 2 && resumeChoice === 'new' && (
                            <div className="space-y-4">
                                <ResumeUpload onFileUpload={setUploadedFile} currentFile={uploadedFile} onAnalysisComplete={setAnalysisResult} resumeDetails={resumeDetails} onDetailsChange={handleResumeDetailsChange} />
                                <div className="flex justify-end">
                                    <button onClick={() => { if (uploadedFile && resumeDetails.fullName) setCurrentStep(3); }} disabled={!uploadedFile} className={`px-6 py-2 rounded-lg font-semibold transition-colors ${uploadedFile ? 'bg-green-800 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>Continue to Job Selection</button>
                                </div>
                            </div>
                        )}
                        {currentStep === 3 && <JobSelection selectedJob={selectedJob} onJobSelect={handleJobSelect} userProfile={{}} initialSingleView={resumeChoice === 'existing'} jobs={availableJobs} />}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <ResumeUpload onFileUpload={setUploadedFile} currentFile={uploadedFile} onAnalysisComplete={setAnalysisResult} resumeDetails={resumeDetails} onDetailsChange={handleResumeDetailsChange} readOnly={true} />
                                <JobSelection selectedJob={selectedJob} onJobSelect={handleJobSelect} userProfile={{}} jobs={availableJobs} />
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <OrderSummary selectedEditor={selectedEditor} selectedJob={selectedJob} uploadedFile={uploadedFile} analysisResult={analysisResult} onProceedToPayment={currentStep === 4 ? handleProceedToPayment : null} onEditSelection={() => setCurrentStep(1)} />
                        <ResumeBenefits />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    {currentStep > 1 && (
                        <button onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium">
                            <FaArrowLeft /> Back to {steps[currentStep - 2]?.title}
                        </button>
                    )}
                    {currentStep < 4 && canProceedToNextStep() && (
                        <button onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))} className="ml-auto bg-green-800 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg">
                            Continue to {steps[currentStep]?.title}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Resume;

