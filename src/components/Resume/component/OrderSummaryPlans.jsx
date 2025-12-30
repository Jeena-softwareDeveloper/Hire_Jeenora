import React from 'react';
import { FaRupeeSign, FaCheck } from 'react-icons/fa';

const OrderSummaryPlans = ({ plans, selectedPlan, setSelectedPlan }) => {
    return (
        <div className="border-b border-gray-200 pb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Choose Your Service Plan</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(plans).map(([key, plan]) => (
                    <div
                        key={key}
                        onClick={() => setSelectedPlan(key)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedPlan === key ? 'border-green-800 bg-green-50 scale-[1.02]' : 'border-gray-200 hover:border-green-800'}`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <span className={`font-semibold ${selectedPlan === key ? 'text-green-800' : 'text-gray-900'}`}>{plan.name}</span>
                            {key === 'premium' && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Popular</span>}
                        </div>
                        <div className="flex items-baseline gap-1 mb-3"><FaRupeeSign className="text-gray-600 text-sm" /><span className="text-2xl font-bold text-gray-900">{plan.price.toLocaleString()}</span></div>
                        <ul className="space-y-2 text-sm text-gray-600">
                            {plan.features.slice(0, 3).map((f, i) => (
                                <li key={i} className="flex items-center gap-2"><FaCheck className="text-green-800 text-xs shrink-0" /><span className="truncate">{f}</span></li>
                            ))}
                            {plan.features.length > 3 && <li className="text-green-800 text-xs">+{plan.features.length - 3} more</li>}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderSummaryPlans;
