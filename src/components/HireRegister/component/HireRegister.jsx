import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    User,
    Mail,
    Phone,
    Lock,
    ArrowRight,
    Shield,
    Rocket
} from "lucide-react";
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
import '../css/HireRegister.css';

const HireRegister = () => {
    const navigate = useNavigate();

    // Zustand Store
    const token = useAuthStore((state) => state.token);
    const userInfo = useAuthStore((state) => state.userInfo);
    const setAuth = useAuthStore((state) => state.setAuth);

    // OTP State
    const [showOTP, setShowOTP] = useState(false);
    const [pendingRegistration, setPendingRegistration] = useState(null);

    // React Query Mutation for Registration
    const { mutate, isPending: loader } = useMutation({
        mutationFn: async (registerData) => {
            const { data } = await api.post('/hire/auth/register', registerData, { withCredentials: true });
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            setAuth(data);
            navigate('/hire/dashboard');
        },
        onError: (error) => {
            const msg = error.response?.data?.error || 'Registration failed';
            setLocalError(msg);
            toast.error(msg);
            setShowOTP(false);
        }
    });

    const [state, setState] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const [isChecked, setIsChecked] = useState(false);
    const [localError, setLocalError] = useState(null);
    const [sendingOTP, setSendingOTP] = useState(false);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const checkAuthAndRedirect = useCallback(() => {
        if (token && userInfo) {
            navigate('/hire/dashboard', { replace: true });
        }
    }, [token, userInfo, navigate]);

    useEffect(() => {
        checkAuthAndRedirect();
    }, [checkAuthAndRedirect]);

    // Local validation before submission
    const validateForm = () => {
        if (!state.fullName.trim() || !state.email.trim() || !state.password.trim() || !state.phoneNumber.trim()) {
            setLocalError("All fields are required");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
            setLocalError("Please enter a valid email address");
            return false;
        }
        if (state.password.length < 6) {
            setLocalError("Password must be at least 6 characters");
            return false;
        }
        return true;
    };

    // Step 1: Send OTP
    const submit = async (e) => {
        e.preventDefault();
        setLocalError(null);

        if (!isChecked) {
            setLocalError('Please agree to the terms and conditions');
            return;
        }
        if (!validateForm()) return;

        // Save registration data
        setPendingRegistration({ ...state, agreeTerms: isChecked });

        // Send OTP
        setSendingOTP(true);
        try {
            const response = await api.post('/hire/otp/send', {
                email: state.email,
                purpose: 'signup'
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

    // Step 2: After OTP verification, proceed with registration
    const handleOTPVerified = () => {
        if (pendingRegistration) {
            mutate(pendingRegistration);
        }
    };

    // Cancel OTP and go back to form
    const handleCancelOTP = () => {
        setShowOTP(false);
        setPendingRegistration(null);
    };

    return (
        <div
            className='min-w-screen min-h-screen relative overflow-hidden flex justify-center items-center py-4 px-3 sm:px-4 lg:py-8 font-["Outfit"] bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            {/* Optional Overlay */}
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
                    /* Registration Form */
                    <div className='bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-4 sm:p-5 lg:p-6'>

                        {/* Header Section */}
                        <div className="text-center mb-3">
                            <div className="flex justify-center items-center gap-2 mb-2">
                                <img
                                    src={logo}
                                    alt="Jeenora Logo"
                                    className="h-7 object-contain"
                                />
                                <span className="text-lg font-bold text-slate-800 tracking-tight">
                                    JEENORA <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Hire</span>
                                </span>
                            </div>
                            <h1 className="text-xl font-bold text-slate-800 mb-1 flex items-center justify-center gap-2">
                                Create Account <Rocket className="w-5 h-5 text-indigo-500" />
                            </h1>
                            <p className="text-slate-500 text-[10px]">
                                Join us to find the perfect candidates
                            </p>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={submit} className="space-y-2.5">
                            {/* Full Name */}
                            <div className="space-y-0.5">
                                <label className="block text-[10px] font-semibold text-slate-700">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-3.5 w-3.5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
                                    </div>
                                    <input
                                        onChange={inputHandle}
                                        value={state.fullName}
                                        className="pl-9 w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-xs"
                                        type="text"
                                        name='fullName'
                                        placeholder='Enter your full name'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-0.5">
                                <label className="block text-[10px] font-semibold text-slate-700">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-3.5 w-3.5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
                                    </div>
                                    <input
                                        onChange={inputHandle}
                                        value={state.email}
                                        className="pl-9 w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-xs"
                                        type="email"
                                        name='email'
                                        placeholder='your@gmail.com'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-0.5">
                                <label className="block text-[10px] font-semibold text-slate-700">Phone Number</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-3.5 w-3.5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
                                    </div>
                                    <input
                                        onChange={inputHandle}
                                        value={state.phoneNumber}
                                        className="pl-9 w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-xs"
                                        type="tel"
                                        name='phoneNumber'
                                        placeholder='1234567890'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-0.5">
                                <label className="block text-[10px] font-semibold text-slate-700">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-3.5 w-3.5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
                                    </div>
                                    <input
                                        onChange={inputHandle}
                                        value={state.password}
                                        className="pl-9 w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-xs"
                                        type="password"
                                        name='password'
                                        placeholder='Create a strong password'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Checkbox */}
                            <div className='flex items-start'>
                                <input
                                    className='w-3 h-3 text-blue-600 bg-slate-50 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5 mr-2 flex-shrink-0 cursor-pointer'
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    required
                                />
                                <label className='text-[10px] text-slate-600 leading-tight'>
                                    I agree to the <Link to="/terms" className='text-blue-600 font-semibold hover:text-blue-800'>Terms</Link> and <Link to="/privacy" className='text-blue-600 font-semibold hover:text-blue-800'>Privacy Policy</Link>
                                </label>
                            </div>

                            {/* Button */}
                            <button
                                disabled={sendingOTP || !isChecked}
                                className='w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold py-2.5 rounded-lg shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-sm'
                            >
                                {sendingOTP ? (
                                    <PropagateLoader color='#fff' cssOverride={overrideStyle} size={6} />
                                ) : (
                                    <>
                                        <div className="bg-white/20 p-1 rounded-full">
                                            <Shield className="text-white text-xs" />
                                        </div>
                                        <span>Create Account</span>
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform w-3 h-3" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-4 border-t border-slate-100"></div>

                        {/* Login Link */}
                        <div className='flex items-center justify-center'>
                            <p className='text-[10px] text-slate-600'>
                                Already have an account?{" "}
                                <Link className='font-bold text-blue-600 hover:text-blue-800' to="/hire/login">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                ) : (
                    /* OTP Verification - Wrapper */
                    <div className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 lg:p-10'>
                        <OTPInput
                            email={state.email}
                            purpose="signup"
                            onVerified={handleOTPVerified}
                            onCancel={handleCancelOTP}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HireRegister;

