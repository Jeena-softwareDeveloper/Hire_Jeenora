import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaEnvelope,
    FaLock,
    FaArrowRight,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from "../../../utils/utils";
import useAuthStore from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import api from '../../../api/api';
import toast from 'react-hot-toast';
import logo from '@/assets/logo.png';
import Notification from '../../../utils/Notification';
import OTPInput from '../../common/OTPInput';
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

                {!showOTP ? (
                    /* Login Form */
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
                                Welcome Back
                            </h1>
                            <p className='text-center text-green-600 mb-6 font-medium'>
                                Please log in to your employer account
                            </p>

                            <form onSubmit={submit}>
                                {/* Email */}
                                <div className='mb-5'>
                                    <label htmlFor="email" className='block text-sm font-semibold text-green-900 mb-2'>
                                        Email Address
                                    </label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                            <FaEnvelope className='h-5 w-5 text-green-800' />
                                        </div>
                                        <input
                                            onChange={inputHandle}
                                            value={state.email}
                                            className='pl-10 w-full px-3 py-3 border border-green-700 rounded-lg bg-green-50 text-green-900 placeholder-green-700 text-sm sm:text-base focus:border-green-700 focus:ring-0 focus:outline-none'
                                            type="email"
                                            name='email'
                                            placeholder='your@gmail.com'
                                            id='email'
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className='mb-6'>
                                    <label htmlFor="password" className='block text-sm font-semibold text-green-900 mb-2'>
                                        Password
                                    </label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                            <FaLock className='h-5 w-5 text-green-800' />
                                        </div>
                                        <input
                                            onChange={inputHandle}
                                            value={state.password}
                                            className='pl-10 w-full px-3 py-3 border border-green-700 rounded-lg bg-green-50 text-green-900 placeholder-green-700 text-sm sm:text-base focus:border-green-700 focus:ring-0 focus:outline-none'
                                            type={passwordVisible ? "text" : "password"}
                                            name='password'
                                            placeholder='Enter your password'
                                            id='password'
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                            className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                            {passwordVisible ? (
                                                <FaEyeSlash className='h-5 w-5 text-green-800' />
                                            ) : (
                                                <FaEye className='h-5 w-5 text-green-800' />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Forgot Password Link */}
                                <div className='flex justify-end mb-6'>
                                    <Link
                                        to="/hire/forgot-password"
                                        className='text-sm text-green-700 hover:text-green-900 font-semibold'
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Button */}
                                <button
                                    disabled={sendingOTP}
                                    className='w-full bg-green-900 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2'
                                >
                                    {sendingOTP ? (
                                        <PropagateLoader color='#fff' cssOverride={overrideStyle} size={10} />
                                    ) : (
                                        <>
                                            Log In
                                            <FaArrowRight className='w-3 h-3 sm:w-4 sm:h-4' />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className='w-full flex justify-center items-center my-5'>
                                <div className='w-[45%] bg-green-900 h-[1px]'></div>
                                <div className='w-[10%] flex justify-center items-center'>
                                    <span className='text-green-900 font-semibold'>Or</span>
                                </div>
                                <div className='w-[45%] bg-green-900 h-[1px]'></div>
                            </div>

                            {/* Signup Link */}
                            <div className='flex items-center justify-center'>
                                <p className='text-green-900'>
                                    Don't have an account?{" "}
                                    <Link className='font-bold text-green-700 hover:text-green-900' to="/hire/register">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* OTP Verification */
                    <OTPInput
                        email={state.email}
                        purpose="login"
                        onVerified={handleOTPVerified}
                        onCancel={handleCancelOTP}
                    />
                )}
            </div>
        </div>
    );
};

export default HireLogin;
