import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from "../utils/utils";
import api from '../api/api';
import toast from 'react-hot-toast';
import logo from '@/assets/logo.png';
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
        <div className='min-w-screen min-h-screen bg-green-50 flex justify-center items-center py-4 px-3 sm:px-4 lg:py-8 font-["Outfit"]'>
            <div className='w-full max-w-md mx-auto relative'>

                {/* Notification */}
                {localError && (
                    <Notification
                        message={localError}
                        type="error"
                        onClose={() => setLocalError(null)}
                    />
                )}

                <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg border border-green-500 overflow-hidden'>

                    {/* Header */}
                    <div className='bg-green-900 py-4 sm:py-5 px-4 sm:px-8'>
                        <div className='flex items-center justify-center gap-3 sm:gap-4'>
                            <img
                                src={logo}
                                alt="Jeenora Logo"
                                className='h-12 sm:h-14 lg:h-16 object-contain'
                                style={{
                                    transform: 'scale(1.6)',
                                    transformOrigin: 'center',
                                }}
                            />
                            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wide'>
                                Jeenora <span className='text-green-300'>Hire</span>
                            </h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div className='p-4 sm:p-6 lg:p-8'>
                        {/* Step 1: Email Input */}
                        {step === 1 && (
                            <>
                                <h1 className='text-xl text-center mb-4 sm:text-2xl lg:text-3xl font-extrabold text-green-800 tracking-wide'>
                                    Forgot Password?
                                </h1>
                                <p className='text-center text-green-600 mb-6 font-medium text-sm sm:text-base'>
                                    Enter your email to receive an OTP
                                </p>

                                <form onSubmit={handleSendOTP}>
                                    <div className='mb-6'>
                                        <label htmlFor="email" className='block text-sm font-semibold text-green-900 mb-2'>
                                            Email Address
                                        </label>
                                        <div className='relative'>
                                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                                <FaEnvelope className='h-5 w-5 text-green-800' />
                                            </div>
                                            <input
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                className='pl-10 w-full px-3 py-3 border border-green-700 rounded-lg bg-green-50 text-green-900 placeholder-green-700 text-sm sm:text-base focus:border-green-700 focus:ring-0 focus:outline-none'
                                                type="email"
                                                name='email'
                                                placeholder='your@gmail.com'
                                                id='email'
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        disabled={loading}
                                        className='w-full bg-green-900 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2'
                                    >
                                        {loading ? (
                                            <PropagateLoader color='#fff' cssOverride={overrideStyle} size={10} />
                                        ) : (
                                            <>
                                                Send OTP
                                                <FaEnvelope className='w-4 h-4' />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}

                        {/* Step 2: OTP Verification */}
                        {step === 2 && (
                            <>
                                <h1 className='text-xl text-center mb-2 sm:text-2xl lg:text-3xl font-extrabold text-green-800 tracking-wide'>
                                    Verification
                                </h1>
                                <p className='text-center text-green-600 mb-6 font-medium text-sm sm:text-base'>
                                    Enter the OTP sent to {email}
                                </p>

                                <OTPInput
                                    email={email}
                                    purpose="password-reset"
                                    onVerified={handleOtpVerified}
                                />

                                <div className='mt-4 text-center'>
                                    <button
                                        onClick={() => setStep(1)}
                                        className='text-sm text-green-700 hover:text-green-900 underline'
                                    >
                                        Change Email
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Step 3: Success Message */}
                        {step === 3 && (
                            <div className='text-center py-4'>
                                <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                                    <FaCheckCircle className='text-green-800 text-4xl' />
                                </div>
                                <h2 className='text-2xl font-bold text-gray-900 mb-4'>Check Your Email</h2>
                                <p className='text-gray-600 mb-2'>
                                    We've sent a password reset link to:
                                </p>
                                <p className='text-green-800 font-semibold text-lg mb-6'>
                                    {email}
                                </p>
                                <div className='bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left'>
                                    <p className='text-blue-800 text-sm'>
                                        <strong>ℹ️ Next Step:</strong> Click the link in your email to set a new password. The link expires in 10 minutes.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Back to Login (Always Visible) */}
                        <div className='flex items-center justify-center mt-6'>
                            <Link
                                to="/hire/login"
                                className='flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold'
                            >
                                <FaArrowLeft className='w-3 h-3' />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
