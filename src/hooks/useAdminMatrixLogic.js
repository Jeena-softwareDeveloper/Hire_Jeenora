import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useGetCreditSettings, useUpdateCreditSettings, useGetPlanSettings, useUpdatePlanSettings } from "./useAdminSettings";

export const useAdminMatrixLogic = () => {
    const [activeTab, setActiveTab] = useState('economics');
    const { data: initialCreditData, isLoading: credLoading } = useGetCreditSettings();
    const { data: initialPlanData, isLoading: planLoading } = useGetPlanSettings();
    const { mutate: updateCredits, isPending: credUpdating } = useUpdateCreditSettings();
    const { mutate: updatePlans, isPending: planUpdating } = useUpdatePlanSettings();

    const [creditSettings, setCreditSettings] = useState(null);
    const [planSettings, setPlanSettings] = useState(null);

    useEffect(() => {
        if (initialCreditData) setCreditSettings(initialCreditData);
    }, [initialCreditData]);

    useEffect(() => {
        if (initialPlanData?.data) setPlanSettings(initialPlanData.data);
    }, [initialPlanData]);

    const handleCommit = () => {
        if (creditSettings) {
            updateCredits(creditSettings, {
                onSuccess: () => toast.success("Economy Matrix Synchronized"),
                onError: () => toast.error("Failed to commit Economy changes")
            });
        }
        if (planSettings) {
            updatePlans(planSettings, {
                onSuccess: () => toast.success("Subscription Matrix Synchronized"),
                onError: () => toast.error("Failed to commit Plan changes")
            });
        }
    };

    const updateCreditField = (field, value) => {
        setCreditSettings(prev => ({ ...prev, [field]: value }));
    };

    const updatePlanField = (planKey, field, value) => {
        setPlanSettings(prev => ({
            ...prev,
            plans: {
                ...prev.plans,
                [planKey]: { ...prev.plans[planKey], [field]: value }
            }
        }));
    };

    const updatePlanFeatures = (planKey, featuresText) => {
        const featuresArray = featuresText.split('\n').filter(f => f.trim() !== '');
        updatePlanField(planKey, 'features', featuresArray);
    };

    const loading = credLoading || planLoading;
    const pending = credUpdating || planUpdating;

    return {
        activeTab, setActiveTab, creditSettings, setCreditSettings, planSettings, setPlanSettings,
        handleCommit, updateCreditField, updatePlanField, updatePlanFeatures, loading, pending
    };
};
