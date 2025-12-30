import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ResumeSteps = ({ currentStep, steps }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center flex-1">
                        <div className="flex items-center">
                            <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${currentStep >= step.number
                                ? 'bg-green-800 border-green-800 text-white transform scale-110'
                                : 'bg-white border-gray-300 text-gray-500'
                                }`}>
                                {currentStep > step.number ? (
                                    <FaCheckCircle className="text-lg" />
                                ) : (
                                    <span className="text-lg font-bold">{step.number}</span>
                                )}
                            </div>
                            <div className="ml-4 hidden lg:block">
                                <p className={`text-sm font-semibold ${currentStep >= step.number ? 'text-green-800' : 'text-gray-500'}`}>
                                    {step.title}
                                </p>
                                <p className="text-xs text-gray-500">{step.description}</p>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-1 mx-4 transition-all ${currentStep > step.number ? 'bg-green-800' : 'bg-gray-200'}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResumeSteps;
