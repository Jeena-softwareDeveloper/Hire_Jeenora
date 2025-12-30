import React from 'react';
import { FaCrown } from 'react-icons/fa';

const ResumeBenefits = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <FaCrown className="text-yellow-500" /> Why Choose Us?
                </h4>
                <ul className="space-y-3 text-sm text-blue-800">
                    {[
                        { bold: '3x', text: ' more interview calls guaranteed' },
                        { bold: 'ATS-optimized', text: ' formatting' },
                        { bold: 'Industry-specific', text: ' keywords' },
                        { bold: '48-hour', text: ' delivery guarantee' },
                        { bold: 'Unlimited', text: ' revisions' },
                        { bold: 'Money-back', text: ' guarantee' }
                    ].map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span><strong>{benefit.bold}</strong>{benefit.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-semibold text-green-900 mb-3">Need Help?</h4>
                <p className="text-green-800 text-sm mb-4">
                    Our support team is here to help you choose the right editor and answer any questions.
                </p>
                <button className="w-full bg-green-800 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default ResumeBenefits;
