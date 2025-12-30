import React from 'react';

const Select = ({
    label,
    value,
    onChange,
    options = [],
    error,
    disabled = false,
    required = false,
    placeholder = 'Select an option',
    icon: Icon,
    className = '',
    ...props
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <Icon className="text-lg" />
                    </div>
                )}
                <select
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-green-800 focus:border-green-800 transition-all appearance-none ${error ? 'border-red-500' : 'border-gray-300'
                        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                    {...props}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((option, index) => (
                        <option key={index} value={option.value || option}>
                            {option.label || option}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Select;
