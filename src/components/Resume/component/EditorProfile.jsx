import React from 'react';
import { FaArrowLeft, FaStar, FaCheckCircle, FaBriefcase, FaGraduationCap, FaClock, FaRupeeSign, FaCertificate } from 'react-icons/fa';

const EditorProfile = ({ editor, onBack, onSelect }) => {
    if (!editor) return null;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header Banner */}
            <div className="h-48 bg-gradient-to-r from-green-800 to-emerald-800 relative">
                <button
                    onClick={onBack}
                    className="absolute top-6 left-6 flex items-center gap-2 text-white bg-black/20 hover:bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm transition-all"
                >
                    <FaArrowLeft /> Back to Editors
                </button>
            </div>

            {/* Profile Info */}
            <div className="px-8 pb-8">
                <div className="relative -mt-20 mb-6 flex flex-col md:flex-row items-end md:items-end gap-6">
                    <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
                        {editor.profileImageUrl ? (
                            <img
                                src={editor.profileImageUrl}
                                alt={editor.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-4xl font-bold uppercase">' + (editor.name?.charAt(0) || 'E') + '</span>'; }}
                            />
                        ) : (
                            <span className="text-4xl font-bold uppercase">{editor.name?.charAt(0) || 'E'}</span>
                        )}
                    </div>
                    <div className="flex-1 pb-4">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{editor.name}</h1>
                        <p className="text-xl text-green-700 font-medium mb-2">{editor.specialization}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> {editor.rating} Rating</span>
                            <span className="flex items-center gap-1"><FaBriefcase /> {editor.experience} Years Exp.</span>
                            <span className="flex items-center gap-1"><FaCheckCircle className="text-green-600" /> {editor.completedJobs} Jobs Done</span>
                        </div>
                    </div>
                    <div className="pb-4">
                        <button
                            onClick={onSelect}
                            className="bg-green-800 text-white px-8 py-3 rounded-xl hover:bg-green-700 shadow-lg font-semibold flex items-center gap-2"
                        >
                            Hire Now - ₹{editor.price}
                        </button>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">About Me</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {editor.bio || "No bio available."}
                            </p>
                        </section>

                        {/* Expertise */}
                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Expertise</h3>
                            <div className="flex flex-wrap gap-2">
                                {editor.expertise && editor.expertise.map((skill, idx) => (
                                    <span key={idx} className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Experiences */}
                        {editor.workExperience && (
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Experience</h3>
                                <div className="space-y-4">
                                    {editor.workExperience.map((exp, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="mt-1"><FaBriefcase className="text-gray-400" /></div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{exp.role}</h4>
                                                <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-4">Why hire me?</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-gray-600">
                                    <FaClock className="text-blue-500" />
                                    <span>Delivers in {editor.deliveryTime} days</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-600">
                                    <FaRupeeSign className="text-green-500" />
                                    <span>Starting at ₹{editor.price}</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-600">
                                    <FaCertificate className="text-purple-500" />
                                    <span>Certified Resume Writer</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorProfile;
