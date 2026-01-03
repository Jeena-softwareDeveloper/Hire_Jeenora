import React from "react";
import { FaEdit } from "react-icons/fa";
import { useProfileLogic } from "../hooks/useProfileLogic";
import ConfirmServiceModal from "../components/hire/ConfirmServiceModal";
import ProfileSidebar from "../components/Profile/component/ProfileSidebar";
import ProfilePersonalInfo from "../components/Profile/component/ProfilePersonalInfo";
import ProfileProfessionalInfo from "../components/Profile/component/ProfileProfessionalInfo";
import ProfileSkills from "../components/Profile/component/ProfileSkills";
import ProfileResumes from "../components/Profile/component/ProfileResumes";
import "../components/Profile/css/Profile.css";

function Profile() {
    const {
        userInfo, profileData, locations, allSkills, resumes,
        selectedState, handleStateChange, handleDistrictChange, activeTab, setActiveTab, isEditing, setIsEditing,
        newSkill, setNewSkill, showConfirmModal, setShowConfirmModal, districtsData,
        form, setForm, handleUpdate, addSkill, removeSkill, handleSaveSkills,
        handleImageUpload, handleResumeUpload, loading, reqProfEdit,
        deleteMyResume, setPrimaryResume
    } = useProfileLogic();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="bg-transparent">
            {/* Header Section - Same row on mobile */}
            <div className="flex flex-row justify-between items-center mb-6 gap-4 w-full">
                <div className="text-left shrink-0">
                    <h1 className="text-xl sm:text-3xl lg:text-xl font-black text-slate-900 uppercase tracking-tighter">My Profile</h1>
                </div>

                {/* Right Side: Profile Completion */}
                <div className="flex items-center justify-end shrink-0">
                    {profileData?.completionPercentage < 100 ? (
                        <div className="flex items-center gap-2 md:gap-4 max-w-xs md:max-w-xl">
                            <span className="hidden sm:inline text-[10px] font-black text-slate-700 uppercase tracking-widest whitespace-nowrap">Status</span>
                            <div className="w-16 md:w-32 lg:w-48 bg-white rounded-full h-1.5 md:h-2 shadow-inner border border-slate-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${profileData.completionPercentage || 0}%` }}></div>
                            </div>
                            <span className="text-[10px] font-black text-emerald-600 whitespace-nowrap">{Math.round(profileData.completionPercentage || 0)}%</span>
                        </div>
                    ) : (
                        <span className="text-emerald-600 font-black uppercase tracking-widest text-[9px] md:text-[10px] bg-emerald-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-emerald-100 whitespace-nowrap">100% Complete</span>
                    )}
                </div>
            </div>

            {/* Main Content Section */}
            <div className="w-full pb-8 lg:pb-12 pt-0">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <ProfileSidebar
                            profileData={profileData} userInfo={userInfo} form={form} loading={loading}
                            handleImageUpload={handleImageUpload} activeTab={activeTab} setActiveTab={setActiveTab}
                            resumes={resumes} setShowConfirmModal={setShowConfirmModal}
                        />

                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden min-h-[600px]">
                                <div className="border-b border-slate-100 px-8 py-6 flex justify-between items-center bg-white">
                                    <h3 className="text-base font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full inline-block"></span>
                                        {activeTab.replace(/([A-Z])/g, ' $1')} Details
                                    </h3>
                                    {activeTab !== "resume" && activeTab !== "skills" && !isEditing && (
                                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl hover:shadow-lg text-xs font-bold uppercase tracking-widest transition-all active:scale-95">
                                            <FaEdit /> Edit Details
                                        </button>
                                    )}
                                </div>

                                <div className="p-8">
                                    {activeTab === "personal" && (
                                        <ProfilePersonalInfo
                                            form={form} isEditing={isEditing} handleChange={handleChange}
                                            handleStateChange={handleStateChange} handleDistrictChange={handleDistrictChange}
                                            locations={locations}
                                            districtsData={districtsData} selectedState={selectedState}
                                            handleUpdate={handleUpdate} setIsEditing={setIsEditing} loading={loading}
                                        />
                                    )}
                                    {activeTab === "professional" && (
                                        <ProfileProfessionalInfo
                                            form={form} isEditing={isEditing} handleChange={handleChange}
                                            handleUpdate={handleUpdate} setIsEditing={setIsEditing} loading={loading}
                                        />
                                    )}
                                    {activeTab === "skills" && (
                                        <ProfileSkills
                                            form={form} newSkill={newSkill} setNewSkill={setNewSkill}
                                            filteredSkills={allSkills.filter(s => !newSkill || s.name.toLowerCase().includes(newSkill.toLowerCase()))}
                                            addSkill={addSkill} removeSkill={removeSkill} handleSaveSkills={handleSaveSkills}
                                            setForm={setForm} loading={loading}
                                        />
                                    )}
                                    {activeTab === "resume" && (
                                        <ProfileResumes
                                            resumes={resumes} handleResumeUpload={handleResumeUpload}
                                            setPrimaryResume={setPrimaryResume} deleteMyResume={deleteMyResume}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showConfirmModal && (
                    <ConfirmServiceModal
                        onClose={() => setShowConfirmModal(false)}
                        onConfirm={() => { reqProfEdit(profileData?._id); setShowConfirmModal(false); }}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
}

export default Profile;

