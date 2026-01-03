import React from 'react';

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction, className = '' }) => {
    return (
        <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
            {Icon && (
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-gray-400 text-3xl" />
                </div>
            )}
            {title && <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>}
            {description && <p className="text-gray-600 max-w-md mx-auto mb-6">{description}</p>}
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;

