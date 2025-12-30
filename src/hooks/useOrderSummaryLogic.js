import { useState } from 'react';

export const useOrderSummaryLogic = (selectedEditor) => {
    const [selectedPlan, setSelectedPlan] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('card');

    const plans = {
        standard: {
            name: 'Standard', price: selectedEditor?.price || 0,
            features: ['Professional resume rewriting', 'ATS optimization', 'Industry-specific keywords', '48-hour delivery', '2 rounds of revisions', 'Cover letter template']
        },
        premium: {
            name: 'Premium', price: (selectedEditor?.price || 0) + 1000,
            features: ['Everything in Standard', 'LinkedIn profile optimization', 'Interview preparation guide', '24-hour delivery', 'Unlimited revisions for 14 days', '60-day support', 'Job search strategy session']
        },
        executive: {
            name: 'Executive', price: (selectedEditor?.price || 0) + 2000,
            features: ['Everything in Premium', 'Executive career coaching', 'Salary negotiation guide', '12-hour express delivery', '90-day premium support', 'Priority customer service', 'Personal career consultant']
        }
    };

    const serviceFee = 99;
    const tax = plans[selectedPlan].price * 0.18;
    const totalAmount = plans[selectedPlan].price + serviceFee + tax;

    return {
        selectedPlan, setSelectedPlan, paymentMethod, setPaymentMethod, plans,
        serviceFee, tax, totalAmount, currentPlan: plans[selectedPlan]
    };
};
