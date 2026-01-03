import React from 'react';

const StatusBadge = ({ status }) => {
    const safeStatus = status || 'applied';
    const styles = {
        applied: 'bg-blue-100 text-blue-700',
        viewed: 'bg-purple-100 text-purple-700',
        shortlisted: 'bg-indigo-100 text-indigo-700',
        interview_scheduled: 'bg-orange-100 text-orange-700',
        interview_completed: 'bg-amber-100 text-amber-700',
        offer_extended: 'bg-yellow-100 text-yellow-700',
        offer_accepted: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
        withdrawn: 'bg-gray-100 text-gray-700',
        pending: 'bg-yellow-100 text-yellow-700',
        approved: 'bg-green-100 text-green-700',
        active: 'bg-green-100 text-green-700',
        inactive: 'bg-gray-100 text-gray-700',
        open: 'bg-blue-100 text-blue-700',
        closed: 'bg-red-100 text-red-700',
        resolved: 'bg-green-100 text-green-700',
    };

    return (
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize ${styles[safeStatus] || styles.applied}`}>
            {safeStatus.replace('_', ' ')}
        </span>
    );
};

export default StatusBadge;

