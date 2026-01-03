import React from 'react';
import { FaEdit } from 'react-icons/fa';

function PersonalInfoTab({
    form,
    isEditing,
    handleChange,
    handleStateChange,
    locations,
    districtsData,
    selectedState,
    loading,
    handleUpdate,
    setIsEditing
}) {
    return (
        <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.name || "Not provided"}
                        </div>
                    ) : (
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                            required
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.phone || "Not provided"}
                        </div>
                    ) : (
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                            required
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.dateOfBirth ? new Date(form.dateOfBirth).toLocaleDateString() : "Not provided"}
                        </div>
                    ) : (
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.gender || "Not provided"}
                        </div>
                    ) : (
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {selectedState || "Not provided"}
                        </div>
                    ) : (
                        <select
                            value={selectedState}
                            onChange={handleStateChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                        >
                            <option value="">Select State</option>
                            {locations.map((item) => (
                                <option key={item.state} value={item.state}>
                                    {item.state}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        City/District
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.location || "Not provided"}
                        </div>
                    ) : (
                        <select
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            disabled={!selectedState}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                        >
                            <option value="">Select District</option>
                            {(districtsData || []).map((dist) => (
                                <option key={dist._id} value={dist.name}>
                                    {dist.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode
                    </label>
                    {!isEditing ? (
                        <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900">
                            {form.pincode || "Not provided"}
                        </div>
                    ) : (
                        <input
                            type="text"
                            name="pincode"
                            value={form.pincode}
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

export default PersonalInfoTab;

