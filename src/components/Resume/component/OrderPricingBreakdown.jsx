import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';

const OrderPricingBreakdown = ({ currentPlan, serviceFee, tax, totalAmount }) => {
    const items = [
        { label: `${currentPlan.name} Plan`, value: currentPlan.price, bold: false },
        { label: 'Service Fee', value: serviceFee, bold: false },
        { label: 'Tax (GST 18%)', value: tax.toFixed(0), bold: false }
    ];

    return (
        <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Pricing Breakdown</h4>
            <div className="space-y-3">
                {items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="flex items-center gap-1 font-medium"><FaRupeeSign className="text-xs" />{item.value.toLocaleString()}</span>
                    </div>
                ))}
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                    <span>Total Amount</span>
                    <span className="flex items-center gap-1 text-green-800"><FaRupeeSign />{totalAmount.toFixed(0)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderPricingBreakdown;

