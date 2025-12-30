import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

function SkillsTab({
    form,
    newSkill,
    setNewSkill,
    filteredSkills,
    addSkill,
    removeSkill,
    handleSaveSkills,
    setForm,
    loading
}) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                    <h4 className="text-lg font-semibold text-gray-900">Your Skills</h4>
                    <p className="text-sm text-gray-600">Add skills that match your expertise</p>
                </div>
                <button
                    onClick={handleSaveSkills}
                    disabled={loading}
                    className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                >
                    Save Skills
                </button>
            </div>

            {/* Skill Search */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Skills
                </label>
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Type to search skills..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                />
            </div>

            {/* Available Skills */}
            {newSkill && filteredSkills.length > 0 && (
                <div className="border border-gray-200 rounded-lg bg-white shadow-sm max-h-48 overflow-y-auto">
                    {filteredSkills.map(skill => (
                        <div
                            key={skill._id}
                            onClick={() => addSkill(skill)}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">{skill.name}</span>
                                <FaPlus className="text-green-600" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Selected Skills */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Selected Skills ({form.skills.length})
                    </label>
                    {form.skills.length > 0 && (
                        <button
                            onClick={() => setForm(prev => ({ ...prev, skills: [] }))}
                            className="text-xs text-red-600 hover:text-red-700"
                        >
                            Clear All
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 min-h-20 p-3 border border-gray-300 rounded-lg bg-gray-50">
                    {form.skills.length > 0 ? (
                        form.skills.map(skill => (
                            <div
                                key={skill._id}
                                className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100 text-green-800 border border-green-800"
                            >
                                <span className="text-sm">{skill.name}</span>
                                <button
                                    onClick={() => removeSkill(skill._id)}
                                    className="ml-2 text-green-800 hover:text-green-900"
                                >
                                    <FaMinus className="text-xs" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-full py-4 text-gray-500">
                            No skills added yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SkillsTab;
