import React from 'react';

const CandidateDetailsForm = ({ resumeDetails, onDetailsChange, readOnly }) => {
    if (!resumeDetails) return null;

    const fields = [
        { name: 'fullName', label: 'Full Name *', type: 'text', placeholder: 'John Doe' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
        { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 9876543210' },
        {
            name: 'experienceLevel', label: 'Experience Level', type: 'select', options: [
                { value: 'Entry Level', label: 'Entry Level (0-2 years)' },
                { value: 'Mid Level', label: 'Mid Level (3-5 years)' },
                { value: 'Senior Level', label: 'Senior Level (5-8 years)' },
                { value: 'Expert', label: 'Expert (8+ years)' }
            ]
        },
        { name: 'linkedIn', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/in/...' },
        { name: 'portfolio', label: 'Portfolio / Website', type: 'url', placeholder: 'https://...' }
    ];

    return (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Candidate Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field, i) => (
                    <div key={i}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                        {field.type === 'select' ? (
                            <select name={field.name} value={resumeDetails[field.name]} onChange={onDetailsChange} disabled={readOnly} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 disabled:bg-gray-100">
                                <option value="">Select Experience</option>
                                {field.options.map((opt, idx) => <option key={idx} value={opt.value}>{opt.label}</option>)}
                            </select>
                        ) : (
                            <input type={field.type} name={field.name} value={resumeDetails[field.name]} onChange={onDetailsChange} disabled={readOnly} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 disabled:bg-gray-100" placeholder={field.placeholder} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandidateDetailsForm;

