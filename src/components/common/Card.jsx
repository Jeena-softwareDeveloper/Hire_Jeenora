import React from 'react';

const Card = ({ children, className = '', padding = 'md', hover = false, onClick }) => {
    const baseStyles = 'bg-white rounded-xl shadow-sm border border-gray-200';

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    const hoverStyles = hover ? 'hover:shadow-md transition-shadow cursor-pointer' : '';
    const clickableStyles = onClick ? 'cursor-pointer' : '';

    return (
        <div
            className={`${baseStyles} ${paddings[padding]} ${hoverStyles} ${clickableStyles} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
