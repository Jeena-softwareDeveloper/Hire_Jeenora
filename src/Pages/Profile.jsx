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
        selectedState, handleStateChange, activeTab, setActiveTab, isEditing, setIsEditing,
        newSkill, setNewSkill, showConfirmModal, setShowConfirmModal, districtsData,
        form, setForm, handleUpdate, addSkill, removeSkill, handleSaveSkills,
        handleImageUpload, handleResumeUpload, loading, reqProfEdit,
        deleteMyResume, setPrimaryResume
    } = useProfileLogic();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-6 px-3 sm:px-6 lg:px-8 font-['Outfit']">
            <div className="max-w-[1400px] mx-auto lg:px-4">
                <div className="mb-6 sm:mb-8 text-center sm:text-left">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 border-l-4 border-green-800 pl-4 uppercase tracking-tighter">My Profile</h1>
                    <p className="mt-1 text-gray-500 text-xs font-bold uppercase tracking-widest">Manage your professional ecosystem</p>
                </div>

                {profileData?.completionPercentage < 100 && (
                    <div className="mb-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex justify-between mb-3">
                            <span className="text-xs font-black text-green-800 uppercase tracking-widest">Profile Completion</span>
                            <span className="text-xs font-black text-green-800">{Math.round(profileData.completionPercentage || 0)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-green-600 h-full transition-all duration-1000 ease-out" style={{ width: `${profileData.completionPercentage || 0}%` }}></div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <ProfileSidebar
                        profileData={profileData} userInfo={userInfo} form={form} loading={loading}
                        handleImageUpload={handleImageUpload} activeTab={activeTab} setActiveTab={setActiveTab}
                        resumes={resumes} setShowConfirmModal={setShowConfirmModal}
                    />

                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="border-b border-gray-100 px-6 py-5 flex justify-between items-center bg-gray-50/50">
                                <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest">
                                    {activeTab.replace(/([A-Z])/g, ' $1')} Details
                                </h3>
                                {activeTab !== "resume" && activeTab !== "skills" && !isEditing && (
                                    <button onClick={() => setIsEditing(true)} className="flex items-center px-4 py-2 bg-green-800 text-white rounded-xl hover:bg-green-700 text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">
                                        <FaEdit className="mr-2" /> Edit
                                    </button>
                                )}
                            </div>

                            <div className="p-6">
                                {activeTab === "personal" && (
                                    <ProfilePersonalInfo
                                        form={form} isEditing={isEditing} handleChange={handleChange}
                                        handleStateChange={handleStateChange} locations={locations}
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
    );
}

export default Profile;
