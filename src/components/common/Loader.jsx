import React from 'react';
import { PropagateLoader } from 'react-spinners';
import logo from '@/assets/logo.png';

const Loader = ({ fullPage = true, message = 'Processing your request...' }) => {
    const loaderContent = (
        <div className="flex flex-col items-center justify-center gap-8 animate-fade-in">
            <div className="relative">
                {/* Modern subtle pulse background */}
                <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full animate-pulse" />

                <div className="relative flex flex-col items-center gap-6">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="Jeenora" className="h-10 w-auto object-contain" />
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-slate-800 tracking-tight">JEENORA</span>
                            <span className="text-2xl font-extrabold italic bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent ml-1">Hire</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <PropagateLoader color="#10b981" size={15} />
                        <p className="mt-4 text-slate-500 font-bold text-lg tracking-wide uppercase text-[12px]">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-md">
                {loaderContent}
            </div>
        );
    }

    return (
        <div className="w-full flex items-center justify-center p-12">
            {loaderContent}
        </div>
    );
};

export default Loader;
