import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaEnvelope,
    FaLock,
    FaArrowRight,
    FaEye,
    FaEyeSlash,
    FaShieldAlt
} from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from "../../../utils/utils";
import useAuthStore from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import api from '../../../api/api';
import toast from 'react-hot-toast';
import logo from '@/assets/logo.png';
import loginBg from '@/assets/login_bg_green.png';
import Notification from '../../../utils/Notification';
import OTPInput from '../../common/OTPInput';
import Loader from '../../common/Loader';
import '../css/HireLogin.css';

const HireLogin = () => {
    const navigate = useNavigate();

    // Zustand Store
    const token = useAuthStore((state) => state.token);
    const userInfo = useAuthStore((state) => state.userInfo);
    const setAuth = useAuthStore((state) => state.setAuth);

    // OTP State
    const [showOTP, setShowOTP] = useState(false);
    const [pendingLogin, setPendingLogin] = useState(null);

    // React Query Mutation
    const { mutate, isPending: loader } = useMutation({
        mutationFn: async (loginData) => {
            const { data } = await api.post('/hire/auth/login', loginData, { withCredentials: true });
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            setAuth(data);
            navigate('/hire/dashboard', { replace: true });
        },
        onError: (error) => {
            const msg = error.response?.data?.error || 'Login failed';
            setLocalError(msg);
            toast.error(msg);
            setShowOTP(false);
        }
    });

    // Fixed: Use useCallback to prevent unnecessary re-renders
    const checkAuthAndRedirect = useCallback(() => {
        if (token && userInfo) {
            navigate('/hire/dashboard', { replace: true });
        }
    }, [token, userInfo, navigate]);

    useEffect(() => {
        checkAuthAndRedirect();
    }, [checkAuthAndRedirect]);

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const [localError, setLocalError] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [sendingOTP, setSendingOTP] = useState(false);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!state.email.trim() || !state.password.trim()) {
            setLocalError("Email and Password are required");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
            setLocalError("Please enter a valid email address");
            return false;
        }
        return true;
    };

    // Step 1: Send OTP
    const submit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        if (!validateForm()) return;

        // Save login data
        setPendingLogin(state);

        // Send OTP
        setSendingOTP(true);
        try {
            const response = await api.post('/hire/otp/send', {
                email: state.email,
                purpose: 'login'
            });

            if (response.data) {
                setShowOTP(true);
                toast.success('OTP sent to your email');
            }
        } catch (error) {
            const msg = error.response?.data?.error || 'Failed to send OTP';
            setLocalError(msg);
            toast.error(msg);
        } finally {
            setSendingOTP(false);
        }
    };

    // Step 2: After OTP verification, proceed with login
    const handleOTPVerified = () => {
        if (pendingLogin) {
            mutate(pendingLogin);
        }
    };

    // Cancel OTP and go back to form
    const handleCancelOTP = () => {
        setShowOTP(false);
        setPendingLogin(null);
    };

    // Fixed: Clear local error when user starts typing
    useEffect(() => {
        if (localError && (state.email || state.password)) {
            setLocalError(null);
        }
    }, [state.email, state.password, localError]);

    return (
        <div
            className='min-w-screen min-h-screen relative overflow-hidden flex justify-center items-center py-4 px-3 sm:px-4 lg:py-8 font-["Outfit"] bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            {(loader || sendingOTP) && (
                <Loader message={sendingOTP ? "Sending secure OTP..." : "Authenticating..."} />
            )}

            {/* Optional Overlay to ensure text readability if image is too bright */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

            <div className='w-full max-w-[480px] mx-auto relative z-10'>

                {/* Notification */}
                {localError && (
                    <div className="mb-4">
                        <Notification
                            message={localError}
                            type="error"
                            onClose={() => setLocalError(null)}
                        />
                    </div>
                )}

                {!showOTP ? (
                    /* Login Form Card */
                    <div className='bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-5 sm:p-6 lg:p-8'>

                        {/* Header Section - Reduced spacing */}
                        <div className="text-center mb-6">
                            <div className="flex justify-center items-center gap-2 mb-3">
                                <img
                                    src={logo}
                                    alt="Jeenora Logo"
                                    className="h-8 object-contain"
                                />
                                <span className="text-lg font-bold text-slate-800 tracking-tight">
                                    JEENORA <span className="text-emerald-500">Hire</span>
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-800 mb-1">
                                Welcome back <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
                            </h1>
                            <p className="text-slate-500 text-xs">
                                Log in to continue your career journey
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            {/* Email */}
                            <div className="space-y-1">
                                <label className="block text-xs font-semibold text-slate-700">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-4 w-4 text-teal-600 group-focus-within:text-teal-700 transition-colors" />
                                    </div>
                                    <input
                                        onChange={inputHandle}
                                        value={state.email}
                                        className="pl-9 w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 outline-none text-sm"
                                        type="email"
                                        name="email"
                                        placeholder="your@gmail.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <label className="block text-xs font-semibold text-slate-700">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-4 w-4 text-teal-600 group-focus-within:text-teal-700 transition-colors" />
                                    </div>
                                    <input
                                        onChange={inputHandle}
                                        value={state.password}
                                        className="pl-9 w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 outline-none text-sm"
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    >
                                        {passwordVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Security Note */}
                            <div className="flex justify-center items-center gap-1.5 text-[10px] text-slate-400 py-0.5">
                                <FaLock size={8} />
                                <span>Your data is securely encrypted</span>
                            </div>

                            {/* Submit Button */}
                            <button
                                disabled={sendingOTP || loader}
                                className="w-full bg-gradient-to-r from-[#2FA8E5] to-[#27CFA6] hover:from-[#2697d0] hover:to-[#22bc96] text-white font-bold py-3 rounded-lg shadow-[0_10px_20px_-10px_rgba(39,207,166,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-sm"
                            >
                                <div className="bg-white/20 p-1 rounded-full">
                                    <FaShieldAlt className="text-white text-xs" />
                                </div>
                                <span>Secure Login</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform w-3 h-3" />
                            </button>

                            {/* Footer Link 1: Forgot Password */}
                            <div className="text-center pt-1">
                                <Link
                                    to="/hire/forgot-password"
                                    className="text-xs font-medium text-slate-500 hover:text-teal-600 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                        </form>

                        {/* Divider */}
                        <div className="my-5 border-t border-slate-100"></div>

                        {/* Footer Link 2: Sign Up */}
                        <div className="text-center">
                            <Link
                                to="/hire/register"
                                className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-teal-700 font-medium transition-colors group"
                            >
                                New to Jeenora?
                                <span className="font-bold">Join Jeenora, land your dream job</span>
                                <FaArrowRight className="text-[10px] transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                    </div>
                ) : (
                    /* OTP Verification - Wrapper to maintain style if needed, or specific component */
                    <div className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 lg:p-10'>
                        <OTPInput
                            email={state.email}
                            purpose="login"
                            onVerified={handleOTPVerified}
                            onCancel={handleCancelOTP}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HireLogin;

