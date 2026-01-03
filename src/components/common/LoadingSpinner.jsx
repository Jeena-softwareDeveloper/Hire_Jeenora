import React from 'react';
import { PropagateLoader } from 'react-spinners';

const LoadingSpinner = ({ color = '#2563EB', size = 15, message = 'Loading...' }) => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
            <PropagateLoader color={color} size={size} />
            {message && <p className="text-slate-600 font-medium">{message}</p>}
        </div>
    );
};

export default LoadingSpinner;

