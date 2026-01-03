import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from "../utils/utils";
import api from '../api/api';
import toast from 'react-hot-toast';
import logo from '@/assets/logo.png';
import loginBg from '@/assets/login_bg_green.png';
import Notification from '../utils/Notification';
import '../components/HireLogin/css/HireLogin.css';

import OTPInput from '../components/common/OTPInput';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Success
    const [otpSent, setOtpSent] = useState(false);
    const [localError, setLocalError] = useState(null);

    const validateEmail = () => {
        if (!email.trim()) {
            setLocalError("Email is required");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setLocalError("Please enter a valid email address");
            return false;
        }
        return true;
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLocalError(null);

        if (!validateEmail()) return;

        setLoading(true);

        try {
            await api.post('/hire/otp/send', {
                email,
                purpose: 'password-reset'
            });

            setOtpSent(true);
            setStep(2);
            toast.success('OTP sent to your email!');
        } catch (error) {
            const msg = error.response?.data?.error || 'Failed to send OTP';
            setLocalError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    // Callback when OTP is verified
    const handleOtpVerified = async () => {
        setLoading(true);
        try {
            // Trigger sending the reset link
            await api.post('/hire/password/send-link', { email });
            setStep(3); // Show Check Email screen
            toast.success('Verified! Reset link sent to your email.');
        } catch (error) {
            const msg = error.response?.data?.error || 'Failed to send reset link';
            setLocalError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className='min-w-screen min-h-screen relative overflow-hidden flex justify-center items-center py-6 px-4 font-["Outfit"] bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px]" />

            <div className='w-full max-w-[500px] mx-auto relative z-10'>

                {/* Error Notification */}
                {localError && (
                    <div className="mb-6 animate-fade-in">
                        <Notification
                            message={localError}
                            type="error"
                            onClose={() => setLocalError(null)}
                        />
                    </div>
                )}

                <div className='bg-white/70 backdrop-blur-3xl rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/60 p-8 sm:p-10 lg:p-12 relative overflow-hidden'>
                    {/* Decorative radial gradient for glass effect */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/20 blur-3xl rounded-full -mr-10 -mt-10" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/20 blur-3xl rounded-full -ml-10 -mb-10" />

                    {/* Step 1: Email Input */}
                    {step === 1 && (
                        <>
                            {/* Header Section */}
                            <div className="text-center mb-8">
                                <div className="flex justify-center items-center gap-2 mb-6">
                                    <img
                                        src={logo}
                                        alt="Jeenora Logo"
                                        className="h-8 object-contain"
                                    />
                                    <span className="text-lg font-bold text-slate-800 tracking-tight">
                                        JEENORA <span className="text-emerald-500">Hire</span>
                                    </span>
                                </div>

                                <div className="mb-4 relative inline-block">
                                    {/* Shield Effect Background */}
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-[20px] rotate-45 mx-auto flex items-center justify-center shadow-lg shadow-emerald-100/50">
                                        <div className="-rotate-45 transform">
                                            <FaEnvelope className="text-teal-600 text-2xl" />
                                        </div>
                                    </div>
                                </div>

                                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                                    Forgot your password? 😉
                                </h1>
                                <p className="text-slate-500 text-sm">
                                    No worries! Enter your email to receive an OTP.
                                </p>
                            </div>

                            <form onSubmit={handleSendOTP} className="space-y-6">
                                <div className="space-y-2">
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FaEnvelope className="h-5 w-5 text-teal-600 group-focus-within:text-teal-700 transition-colors" />
                                        </div>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            className="pl-12 w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 outline-none text-base shadow-sm"
                                            type="email"
                                            name='email'
                                            placeholder='your@gmail.com'
                                            autoFocus
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={loading}
                                    className='w-full bg-gradient-to-r from-[#2FA8E5] to-[#27CFA6] hover:from-[#2697d0] hover:to-[#22bc96] text-white font-bold py-3.5 rounded-xl shadow-[0_10px_20px_-10px_rgba(39,207,166,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group'
                                >
                                    {loading ? (
                                        <PropagateLoader color='#fff' cssOverride={overrideStyle} size={10} />
                                    ) : (
                                        <>
                                            <div className="bg-white/20 p-1 rounded-full">
                                                <FaShieldAlt className="text-white text-xs" />
                                            </div>
                                            <span>Send Reset Code</span>
                                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === 2 && (
                        <div className="animate-fade-in-up">
                            {/* OTP Component handles UI details, we just wrap it if needed or let it sit in the glass card */}
                            <OTPInput
                                email={email}
                                purpose="password-reset"
                                onVerified={handleOtpVerified}
                                onCancel={() => setStep(1)}
                            />
                        </div>
                    )}

                    {/* Step 3: Success Message */}
                    {step === 3 && (
                        <div className='text-center py-4 animate-fade-in-up'>
                            <div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-emerald-100/50 shadow-lg'>
                                <FaCheckCircle className='text-emerald-500 text-4xl' />
                            </div>
                            <h2 className='text-2xl font-bold text-slate-800 mb-2'>Check Your Email 📬</h2>
                            <p className='text-slate-500 mb-6 text-sm'>
                                We've sent a password reset link to:<br />
                                <span className="font-bold text-slate-800 text-base">{email}</span>
                            </p>

                            <div className='bg-blue-50/80 border border-blue-100 rounded-xl p-4 mb-8 text-left'>
                                <p className='text-blue-700 text-xs sm:text-sm leading-relaxed'>
                                    <strong className="block mb-1">ℹ️ Next Step:</strong>
                                    Click the link in your email to set a new password. The link expires in 2 minutes.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Back to Login (Only show on Step 1 & 3 to avoid cluttering OTP screen which has its own cancel) */}
                    {step !== 2 && (
                        <div className='flex items-center justify-center mt-8'>
                            <Link
                                to="/hire/login"
                                className='flex items-center gap-2 text-slate-500 hover:text-teal-600 font-medium transition-colors text-sm group'
                            >
                                <FaArrowLeft className='w-3 h-3 group-hover:-translate-x-1 transition-transform' />
                                Back to Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

