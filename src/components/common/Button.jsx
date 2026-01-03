import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    className = '',
    icon: Icon,
    fullWidth = false
}) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-green-800 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed',
        secondary: 'bg-white text-green-800 border-2 border-green-800 hover:bg-green-50 disabled:border-gray-300 disabled:text-gray-400',
        danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 disabled:text-gray-400',
        outline: 'bg-white border border-gray-300 text-gray-700 hover:border-green-800 hover:text-green-800 disabled:border-gray-200'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2.5 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        >
            {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                <>
                    {Icon && <Icon className="text-lg" />}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;

