import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaLock, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from "../utils/utils";
import api from '../api/api';
import toast from 'react-hot-toast';
import loginBg from '@/assets/login_bg_green.png';
import Loader from '../components/common/Loader';
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
            <div className='min-w-screen min-h-screen relative overflow-hidden flex justify-center items-center bg-cover bg-center font-["Outfit"]' style={{ backgroundImage: `url(${loginBg})` }}>
                <Loader message="Verifying secure link..." />
            </div>
        );
    }

    if (!isValid) {
        return (
            <div className='min-w-screen min-h-screen relative overflow-hidden flex justify-center items-center bg-cover bg-center font-["Outfit"]' style={{ backgroundImage: `url(${loginBg})` }}>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px]" />
                <div className='relative z-10 w-full max-w-[480px] text-center bg-white/70 backdrop-blur-3xl p-12 rounded-[32px] shadow-xl border border-red-100/50'>
                    <div className='w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12 shadow-lg'>
                        <span className='text-rose-600 text-4xl font-black -rotate-12'>✕</span>
                    </div>
                    <h2 className='text-2xl font-black text-slate-800 mb-3'>Link Expired ⏳</h2>
                    <p className='text-slate-500 mb-8 font-medium'>This password reset link is invalid or has expired for security reasons.</p>
                    <Link
                        to="/hire/forgot-password"
                        className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-blue-500/25'
                    >
                        Request New Link
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div
            className='min-w-screen min-h-screen relative overflow-hidden flex justify-center items-center py-8 px-4 font-["Outfit"] bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            {loading && <Loader message="Updating your password..." />}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px]" />

            <div className='w-full max-w-[500px] mx-auto relative z-10'>
                {/* Notification */}
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
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 blur-3xl rounded-full -mr-10 -mt-10" />

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="flex justify-center items-center gap-2 mb-8">
                            <img
                                src={logo}
                                alt="Jeenora Logo"
                                className="h-9 object-contain"
                            />
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-slate-800 tracking-tight">
                                    JEENORA
                                </span>
                                <span className="text-2xl font-extrabold italic bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent ml-1">Hire</span>
                            </div>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2">
                            Secure New Password 🔐
                        </h1>
                        <p className="text-slate-500 font-medium text-[15px]">
                            Enter your robust new credentials below
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">New Password</label>
                            <div className='relative group'>
                                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                    <FaLock className='h-5 w-5 text-blue-500 group-focus-within:text-blue-600 transition-colors' />
                                </div>
                                <input
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    value={newPassword}
                                    className='pl-12 w-full px-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none font-medium'
                                    type={showPassword ? "text" : "password"}
                                    placeholder='••••••••'
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600'>
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Confirm Password</label>
                            <div className='relative group'>
                                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                    <FaLock className='h-5 w-5 text-emerald-500 group-focus-within:text-emerald-600 transition-colors' />
                                </div>
                                <input
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    className='pl-12 w-full px-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none font-medium'
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='••••••••'
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600'>
                                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={loading}
                            className='w-full h-[60px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-3 rounded-2xl shadow-[0_12px_24px_-8px_rgba(37,99,235,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group'
                        >
                            <span className="text-lg tracking-wide">Update Password</span>
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className='flex items-center justify-center mt-10'>
                        <Link
                            to="/hire/login"
                            className='flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors text-sm group'
                        >
                            <FaArrowLeft className='w-3 h-3 group-hover:-translate-x-1 transition-transform' />
                            Back to Secure Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

