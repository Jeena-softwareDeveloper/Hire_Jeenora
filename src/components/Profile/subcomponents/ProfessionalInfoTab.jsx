import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';

function ProfessionalInfoTab({
    form,
    isEditing,
    handleChange,
    loading,
    handleUpdate,
    setIsEditing
}) {
    return (
        <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Headline
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.headline || "Not provided"}
                        </div>
                    ) : (
                        <input
                            type="text"
                            name="headline"
                            value={form.headline}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                            placeholder="e.g. Senior Software Engineer"
                        />
                    )}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Summary
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 whitespace-pre-wrap">
                            {form.summary || "Not provided"}
                        </div>
                    ) : (
                        <textarea
                            name="summary"
                            rows={4}
                            value={form.summary}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Company
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.currentCompany || "Not provided"}
                        </div>
                    ) : (
                        <input
                            type="text"
                            name="currentCompany"
                            value={form.currentCompany}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.industry || "Not provided"}
                        </div>
                    ) : (
                        <input
                            type="text"
                            name="industry"
                            value={form.industry}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Role
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.currentRole || "Not provided"}
                        </div>
                    ) : (
                        <input
                            type="text"
                            name="currentRole"
                            value={form.currentRole}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience (Years)
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.totalExperience ? `${form.totalExperience} years` : "Not provided"}
                        </div>
                    ) : (
                        <input
                            type="number"
                            name="totalExperience"
                            value={form.totalExperience}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Salary (LPA)
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.expectedSalary ? `₹${form.expectedSalary} LPA` : "Not provided"}
                        </div>
                    ) : (
                        <div className="relative">
                            <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="expectedSalary"
                                value={form.expectedSalary}
                                onChange={handleChange}
                                className="w-full pl-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notice Period
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.noticePeriod || "Not provided"}
                        </div>
                    ) : (
                        <select
                            name="noticePeriod"
                            value={form.noticePeriod}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                        >
                            <option value="">Select Notice Period</option>
                            <option value="Immediate">Immediate</option>
                            <option value="15 days">15 days</option>
                            <option value="30 days">30 days</option>
                            <option value="60 days">60 days</option>
                            <option value="90 days">90 days</option>
                        </select>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.education || "Not provided"}
                        </div>
                    ) : (
                        <input
                            type="text"
                            name="education"
                            value={form.education}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                        />
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 text-sm"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            )}
        </form>
    );
}

export default ProfessionalInfoTab;
