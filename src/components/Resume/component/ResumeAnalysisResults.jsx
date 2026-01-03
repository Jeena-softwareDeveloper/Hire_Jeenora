import React from 'react';
import { FaChartBar, FaCheck, FaRobot } from 'react-icons/fa';

const ResumeAnalysisResults = ({ result }) => {
    if (!result) return null;

    const getScoreColor = (s) => s >= 90 ? 'text-green-600' : s >= 80 ? 'text-yellow-600' : s >= 70 ? 'text-orange-600' : 'text-red-600';
    const getScoreBgColor = (s) => s >= 90 ? 'bg-green-100' : s >= 80 ? 'bg-yellow-100' : s >= 70 ? 'bg-orange-100' : 'bg-red-100';

    return (
        <div className="border border-purple-200 bg-purple-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <FaChartBar className="text-purple-800 text-xl" />
                    <h4 className="text-lg font-semibold text-gray-900">AI Resume Analysis</h4>
                </div>
                <div className={`px-3 py-1 rounded-full ${getScoreBgColor(result.score)} ${getScoreColor(result.score)} font-bold`}>{result.score}/100</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2"><FaCheck className="text-sm" /> Strengths</h5>
                    <ul className="space-y-2">
                        {result.strengths.map((s, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 shrink-0" />{s}</li>)}
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold text-orange-800 mb-3 flex items-center gap-2"><FaRobot className="text-sm" /> Improvements</h5>
                    <ul className="space-y-2">
                        {result.improvements.map((s, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 shrink-0" />{s}</li>)}
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-purple-200 text-center">
                <div><div className="text-2xl font-bold text-blue-800">{result.keywordMatch}%</div><div className="text-xs text-gray-600">Keywords</div></div>
                <div><div className="text-2xl font-bold text-green-800">{result.atsScore}%</div><div className="text-xs text-gray-600">ATS Score</div></div>
                <div><div className="text-lg font-bold text-purple-800">{result.readability}</div><div className="text-xs text-gray-600">Readability</div></div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200 text-sm text-purple-800 text-center">
                💡 <strong>Pro Tip:</strong> Our professional editors can increase your interview chances by 3x.
            </div>
        </div>
    );
};

export default ResumeAnalysisResults;

