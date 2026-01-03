import React from "react";
import { FaPencilAlt, FaMapMarkerAlt, FaUser, FaUserTie, FaBriefcase, FaFilePdf } from "react-icons/fa";

function ProfileSidebar({
    profileData,
    userInfo,
    form,
    loading,
    handleImageUpload,
    activeTab,
    setActiveTab,
    resumes,
    setShowConfirmModal
}) {
    const getInitials = (name) => {
        return name?.split(" ").slice(0, 2).map(word => word.charAt(0)).join("").toUpperCase() || "U";
    };

    const imageUrl = profileData?.personalDetails?.profilePicture || profileData?.user?.profileImageUrl || userInfo?.image || userInfo?.profileImageUrl;

    return (
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Profile Card */}
            <div className="bg-transparent p-4">
                <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl border-2 sm:border-4 border-white shadow-md overflow-hidden">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                getInitials(form.name || profileData?.user?.name || profileData?.name || userInfo?.name)
                            )}
                        </div>
                        <label className="absolute -bottom-0 -right-1 w-6 h-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg ring-2 ring-white hover:scale-110 transition-transform">
                            <FaPencilAlt className="text-[10px]" />
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={loading} />
                        </label>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-base sm:text-lg font-semibold text-slate-800 truncate">{form.name || "Your Name"}</h2>
                        <p className="text-xs text-slate-500 truncate">{form.currentRole || "Add your role"}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <FaMapMarkerAlt className="text-emerald-600 text-xs" />
                            <span className="text-xs text-slate-400 truncate">{form.location || "Add location"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-transparent p-2">
                <nav className="flex flex-col space-y-1">
                    {[
                        { id: 'personal', icon: <FaUser />, label: 'Personal Info' },
                        { id: 'professional', icon: <FaUserTie />, label: 'Professional Info' },
                        { id: 'skills', icon: <FaBriefcase />, label: 'Skills & Expertise' },
                        { id: 'resume', icon: <FaFilePdf />, label: 'Resume' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id ? "bg-gradient-to-r from-blue-50 to-emerald-50 text-emerald-700 border-l-4 border-emerald-500 shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`}
                        >
                            <span className={`mr-3 transition-colors ${activeTab === tab.id ? "text-emerald-600" : "text-slate-400"}`}>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Resume Services */}
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50/50 rounded-lg shadow-sm border border-emerald-100/50 p-4">
                <h4 className="text-md font-semibold text-slate-800 mb-2">Resume Services</h4>
                <p className="text-xs text-slate-500 mb-4">Get your resume reviewed by professionals</p>
                {profileData?.resumeEditorEnabled ? (
                    <div className="w-full py-2 rounded-lg text-sm font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center gap-2">
                        ✓ Service Activated
                    </div>
                ) : (
                    <button
                        onClick={() => setShowConfirmModal(true)}
                        disabled={!profileData?.resumeUrl && resumes.length === 0}
                        className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${(!profileData?.resumeUrl && resumes.length === 0) ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:shadow-lg active:scale-95"}`}
                    >
                        Request Professional Edit
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProfileSidebar;

