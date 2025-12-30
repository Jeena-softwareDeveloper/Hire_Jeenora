import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineCalendarToday } from 'react-icons/md';

const DashboardInterviews = ({ scheduledInterviews }) => {
    if (scheduledInterviews <= 0) return null;

    return (
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">Upcoming Interviews</h3>
                <p className="text-gray-600 text-sm">Scheduled candidate evaluations</p>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <MdOutlineCalendarToday className="text-2xl text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{scheduledInterviews} Interviews Scheduled</h4>
                <p className="text-gray-600 mt-2">Check your calendar for detailed candidate evaluation slots.</p>
            </div>

            <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <Link to="/hire/jobs" className="text-green-700 hover:text-green-900 font-medium flex items-center justify-center gap-2">
                    <MdOutlineCalendarToday /> Schedule New Interview
                </Link>
            </div>
        </div>
    );
};

export default DashboardInterviews;
