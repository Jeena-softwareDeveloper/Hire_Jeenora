import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaLock, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from "../utils/utils";
import api from '../api/api';
import toast from 'react-hot-toast';
import logo from '@/assets/logo.png';
import Notification from '../utils/Notification';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [localError, setLocalError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        const emailParam = searchParams.get('email');

        if (!tokenParam || !emailParam) {
            toast.error('Invalid reset link');
            navigate('/hire/login');
            return;
        }

        setToken(tokenParam);
        setEmail(emailParam);

        // Verify token
        const verifyToken = async () => {
            try {
                await api.get(`/hire/password/verify-token?token=${tokenParam}&email=${emailParam}`);
                setIsValid(true);
            } catch (error) {
                toast.error('Invalid or expired reset link');
                setTimeout(() => navigate('/hire/login'), 2000);
            } finally {
                setValidating(false);
            }
        };

        verifyToken();
    }, [searchParams, navigate]);

    const validateForm = () => {
        if (!newPassword.trim() || !confirmPassword.trim()) {
            setLocalError("Both password fields are required");
            return false;
        }
        if (newPassword !== confirmPassword) {
            setLocalError("Passwords do not match");
            return false;
        }
        if (newPassword.length < 6) {
            setLocalError("Password must be at least 6 characters");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);

        if (!validateForm()) return;

        setLoading(true);

        try {
            await api.post('/hire/password/reset', {
                email,
                token,
                newPassword
            });

            toast.success('Password reset successfully!');
            setTimeout(() => navigate('/hire/login'), 1500);
        } catch (error) {
            const msg = error.response?.data?.error || 'Failed to reset password';
            setLocalError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    if (validating) {
        return (
            <div className='min-w-screen min-h-screen bg-green-50 flex justify-center items-center font-["Outfit"]'>
                <div className='text-center'>
                    <PropagateLoader color='#065f46' size={15} />
                    <p className='mt-4 text-green-800 font-semibold'>Verifying reset link...</p>
                </div>
            </div>
        );
    }

    if (!isValid) {
        return (
            <div className='min-w-screen min-h-screen bg-green-50 flex justify-center items-center font-["Outfit"]'>
                <div className='text-center bg-white p-8 rounded-2xl shadow-lg border border-red-200'>
                    <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <span className='text-red-600 text-3xl'>✕</span>
                    </div>
                    <h2 className='text-2xl font-bold text-gray-900 mb-2'>Invalid Reset Link</h2>
                    <p className='text-gray-600 mb-6'>This password reset link is invalid or has expired.</p>
                    <Link
                        to="/hire/forgot-password"
                        className='inline-block bg-green-900 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition'
                    >
                        Request New Link
                    </Link>
                </div>
            </div>
        );
    }

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

                    {/* Form */}
                    <div className='p-4 sm:p-6 lg:p-8'>
                        <h1 className='text-xl text-center mb-4 sm:text-2xl lg:text-3xl font-extrabold text-green-800 tracking-wide'>
                            Reset Your Password
                        </h1>
                        <p className='text-center text-green-600 mb-6 font-medium text-sm sm:text-base'>
                            Enter your new password below
                        </p>

                        <form onSubmit={handleSubmit}>
                            {/* New Password */}
                            <div className='mb-5'>
                                <label htmlFor="newPassword" className='block text-sm font-semibold text-green-900 mb-2'>
                                    New Password
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <FaLock className='h-5 w-5 text-green-800' />
                                    </div>
                                    <input
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        value={newPassword}
                                        className='pl-10 w-full px-3 py-3 border border-green-700 rounded-lg bg-green-50 text-green-900 placeholder-green-700 text-sm sm:text-base focus:border-green-700 focus:ring-0 focus:outline-none'
                                        type={showPassword ? "text" : "password"}
                                        name='newPassword'
                                        placeholder='Enter new password'
                                        id='newPassword'
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                        {showPassword ? (
                                            <FaEyeSlash className='h-5 w-5 text-green-800' />
                                        ) : (
                                            <FaEye className='h-5 w-5 text-green-800' />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className='mb-6'>
                                <label htmlFor="confirmPassword" className='block text-sm font-semibold text-green-900 mb-2'>
                                    Confirm Password
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <FaLock className='h-5 w-5 text-green-800' />
                                    </div>
                                    <input
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        value={confirmPassword}
                                        className='pl-10 w-full px-3 py-3 border border-green-700 rounded-lg bg-green-50 text-green-900 placeholder-green-700 text-sm sm:text-base focus:border-green-700 focus:ring-0 focus:outline-none'
                                        type={showConfirmPassword ? "text" : "password"}
                                        name='confirmPassword'
                                        placeholder='Re-enter new password'
                                        id='confirmPassword'
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                        {showConfirmPassword ? (
                                            <FaEyeSlash className='h-5 w-5 text-green-800' />
                                        ) : (
                                            <FaEye className='h-5 w-5 text-green-800' />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Button */}
                            <button
                                disabled={loading}
                                className='w-full bg-green-900 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2'
                            >
                                {loading ? (
                                    <PropagateLoader color='#fff' cssOverride={overrideStyle} size={10} />
                                ) : (
                                    <>
                                        Reset Password
                                        <FaLock className='w-4 h-4' />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Back to Login */}
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

export default ResetPassword;

