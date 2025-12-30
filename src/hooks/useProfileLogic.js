import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import {
    useGetProfile,
    useUpdateProfile,
    useUploadProfileImage,
    useRequestProfessionalEdit,
    useDeleteResume
} from "./useProfile";
import { useGetAllLocations, useGetDistrictsByState, useGetAllSkills } from "./useMetadata";
import { useGetMyResumes, useUploadNewResume, useDeleteMyResume, useSetPrimaryResume } from "./useResumes";

export const useProfileLogic = () => {
    const userInfo = useAuthStore((state) => state.userInfo);

    // Profile Hooks
    const { data: profileData, isLoading: profileLoading } = useGetProfile();
    const { mutate: updateProfile, isLoading: updateLoading } = useUpdateProfile();
    const { mutate: uploadProfileImage } = useUploadProfileImage();
    const { mutate: reqProfEdit, isLoading: editReqLoading } = useRequestProfessionalEdit();

    // Metadata Hooks
    const { data: locationsData } = useGetAllLocations();
    const { data: allSkillsData } = useGetAllSkills();
    const locations = locationsData || [];
    const allSkills = allSkillsData || [];

    // Resume Hooks
    const { data: resumesData, isLoading: resumeDataLoading } = useGetMyResumes();
    const { mutate: uploadNewResume, isLoading: uploadResumeLoading } = useUploadNewResume();
    const { mutate: deleteMyResume } = useDeleteMyResume();
    const { mutate: setPrimaryResume } = useSetPrimaryResume();

    // State
    const [selectedState, setSelectedState] = useState("");
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const { data: districtsData } = useGetDistrictsByState(selectedState);

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setForm(prev => ({ ...prev, location: "" }));
    };

    const [form, setForm] = useState({
        name: "", phone: "", headline: "", currentRole: "", totalExperience: "",
        location: "", expectedSalary: "", education: "", noticePeriod: "",
        skills: [], dateOfBirth: "", gender: "", summary: "", pincode: "",
        currentCompany: "", industry: "",
    });

    useEffect(() => {
        if (profileData) {
            const personalDetails = profileData.personalDetails || {};
            const professionalSummary = profileData.professionalSummary || {};
            const careerPreferences = profileData.careerPreferences || {};

            setForm({
                name: personalDetails.fullName || profileData.name || "",
                phone: personalDetails.phone || profileData.phone || "",
                headline: professionalSummary.professionalHeadline || profileData.headline || "",
                summary: professionalSummary.summary || "",
                currentRole: professionalSummary.currentRole || profileData.currentRole || "",
                totalExperience: professionalSummary.totalExperience || profileData.totalExperience || "",
                location: personalDetails.address?.city || profileData.location || "",
                expectedSalary: careerPreferences.salaryExpectations?.maxAnnual || profileData.expectedSalary || "",
                education: Array.isArray(profileData.education) && profileData.education[0]?.degree
                    ? `${profileData.education[0].degree} - ${profileData.education[0].institute || ''}`
                    : profileData.education || "",
                noticePeriod: professionalSummary.noticePeriod || profileData.noticePeriod || "",
                skills: profileData.skills?.technical || profileData.skills || [],
                dateOfBirth: personalDetails.dateOfBirth
                    ? new Date(personalDetails.dateOfBirth).toISOString().split('T')[0]
                    : "",
                gender: personalDetails.gender || "",
                pincode: personalDetails.address?.pincode || "",
                currentCompany: professionalSummary.currentCompany || "",
                industry: professionalSummary.industry || "",
            });
            setSelectedState(personalDetails.address?.state || "");
        }
    }, [profileData]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const payload = {
            personalDetails: {
                fullName: form.name, phone: form.phone, dateOfBirth: form.dateOfBirth,
                gender: form.gender, address: { state: selectedState, city: form.location, pincode: form.pincode }
            },
            professionalSummary: {
                professionalHeadline: form.headline, summary: form.summary, currentRole: form.currentRole,
                totalExperience: form.totalExperience, currentCompany: form.currentCompany,
                industry: form.industry, noticePeriod: form.noticePeriod
            },
            careerPreferences: { salaryExpectations: { maxAnnual: form.expectedSalary } }
        };
        updateProfile(payload);
        setIsEditing(false);
    };

    const addSkill = (skill) => {
        if (!form.skills.find(s => s.name === skill.name)) {
            setForm({
                ...form,
                skills: [...form.skills, { _id: skill._id || Date.now(), name: skill.name, level: 'Intermediate', years: 1 }]
            });
        }
        setNewSkill("");
    };

    const removeSkill = (skillId) => {
        setForm({ ...form, skills: form.skills.filter(skill => skill._id !== skillId) });
    };

    const handleSaveSkills = () => {
        const technicalSkills = form.skills.map(skill => ({ name: skill.name, level: 'Intermediate', years: 1 }));
        updateProfile({ skills: { technical: technicalSkills } });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/') || file.size > 3 * 1024 * 1024) return;
        const formData = new FormData();
        formData.append("image", file);
        uploadProfileImage(formData);
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (!file || file.size > 5 * 1024 * 1024) return;
        const formData = new FormData();
        formData.append("resume", file);
        uploadNewResume(formData);
    };

    const loading = profileLoading || updateLoading || editReqLoading || resumeDataLoading || uploadResumeLoading;

    return {
        userInfo, profileData, locations, allSkills, resumes: resumesData || [],
        selectedState, handleStateChange, activeTab, setActiveTab, isEditing, setIsEditing,
        newSkill, setNewSkill, showConfirmModal, setShowConfirmModal, districtsData,
        form, setForm, handleUpdate, addSkill, removeSkill, handleSaveSkills,
        handleImageUpload, handleResumeUpload, loading, reqProfEdit,
        deleteMyResume, setPrimaryResume
    };
};
