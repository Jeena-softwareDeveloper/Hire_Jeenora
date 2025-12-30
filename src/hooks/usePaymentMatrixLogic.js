import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useCreateCreditOrder, useCreateOrder } from './usePayment';
import { useGetCreditSettings, useGetPlanSettings } from './useAdminSettings';

export const usePaymentMatrixLogic = () => {
    const [activeTab, setActiveTab] = useState('subscriptions'); // 'subscriptions' | 'credits'
    const { data: creditSettings, isLoading: creditLoading } = useGetCreditSettings();
    const { data: planData, isLoading: planLoading } = useGetPlanSettings();

    const { mutate: createCreditOrder, isPending: credPending } = useCreateCreditOrder();
    const { mutate: createPlanOrder, isPending: planPending } = useCreateOrder();

    const [credits, setCredits] = useState(30);

    useEffect(() => {
        if (creditSettings?.minPurchaseCredits) {
            setCredits(creditSettings.minPurchaseCredits);
        }
    }, [creditSettings]);

    const handleSelectPlan = (planKey) => {
        createPlanOrder({ plan: planKey }, {
            onSuccess: (data) => {
                if (data.url) window.location.href = data.url;
                else toast.error("Failed to initialize payment");
            },
            onError: (err) => toast.error(err.response?.data?.error || "Payment failed to initialize")
        });
    };

    const handlePurchaseCredits = () => {
        if (credits < (creditSettings?.minPurchaseCredits || 30)) {
            toast.error(`Minimum purchase is ${creditSettings?.minPurchaseCredits || 30} credits`);
            return;
        }
        createCreditOrder(credits, {
            onSuccess: (data) => {
                if (data.url) window.location.href = data.url;
                else toast.error("Failed to initialize payment");
            },
            onError: (err) => toast.error(err.response?.data?.error || "Payment failed to initialize")
        });
    };

    const loading = creditLoading || planLoading;
    const isPlanMaintenance = planData?.data?.plansComingSoon;
    const isCreditMaintenance = creditSettings?.creditsComingSoon;

    return {
        activeTab, setActiveTab, creditSettings, planData, credits, setCredits,
        handleSelectPlan, handlePurchaseCredits, loading, isPlanMaintenance,
        isCreditMaintenance, credPending, planPending
    };
};
