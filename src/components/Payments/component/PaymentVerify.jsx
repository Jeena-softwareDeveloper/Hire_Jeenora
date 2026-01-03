import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useVerifyCreditPayment } from '../../../hooks/usePayment';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../../utils/utils';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import useAuthStore from '../../../store/useAuthStore';
import toast from 'react-hot-toast';

const PaymentVerify = () => {
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get('id');
    const navigate = useNavigate();
    const { refreshUser } = useAuthStore();
    const { mutate: verify, isLoading } = useVerifyCreditPayment();
    const [status, setStatus] = useState('verifying'); // verifying, success, error

    useEffect(() => {
        if (transactionId) {
            verify({ transactionId }, {
                onSuccess: (data) => {
                    setStatus('success');
                    toast.success(data.message);
                    refreshUser();
                    setTimeout(() => navigate('/hire/payments'), 3000);
                },
                onError: (err) => {
                    setStatus('error');
                    toast.error(err.response?.data?.error || "Verification failed");
                }
            });
        } else {
            setStatus('error');
        }
    }, [transactionId, verify, navigate, refreshUser]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 ">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-sm w-full text-center">
                {status === 'verifying' && (
                    <>
                        <PropagateLoader color='#4f46e5' cssOverride={overrideStyle} />
                        <h2 className="mt-12 text-xl font-black text-slate-900 uppercase tracking-tighter">Verifying Transaction</h2>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Checking payment status with PhonePe...</p>
                    </>
                )}

                {status === 'success' && (
                    <div className="animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <FaCheckCircle size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Payment Confirmed</h2>
                        <p className="text-slate-500 font-bold text-sm mt-3">Your wallet/plan has been successfully updated. Redirecting in 3 seconds...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <FaExclamationTriangle size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Payment Failed</h2>
                        <p className="text-slate-500 font-bold text-sm mt-3">We couldn't verify your payment. If amount was deducted, it will be refunded or contact support.</p>
                        <button
                            onClick={() => navigate('/hire/payments')}
                            className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px]"
                        >
                            Return to Billing
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentVerify;

