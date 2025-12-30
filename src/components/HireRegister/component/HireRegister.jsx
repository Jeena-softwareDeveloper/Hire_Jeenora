import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaUserTie,
    FaBuilding,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaArrowRight
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
                    /* Registration Form */
                    <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg border border-green-500 overflow-hidden'>

                        {/* Header Section */}
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

                        {/* Form Section */}
                        <div className='p-4 sm:p-6 lg:p-8'>
                            <h1 className='text-xl text-center mb-3 sm:text-2xl lg:text-3xl font-extrabold text-green-800 tracking-wide capitalize'>
                                Create your account
                            </h1>

                            <form onSubmit={submit}>
                                {/* Full Name */}
                                <div className='mb-4 sm:mb-6'>
                                    <label htmlFor="fullName" className='block text-sm font-semibold text-green-900 mb-2 sm:mb-3'>
                                        Full Name
                                    </label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                            <FaUserTie className='h-4 w-4 sm:h-5 sm:w-5 text-green-800' />
                                        </div>
                                        <input
                                            onChange={inputHandle}
                                            value={state.fullName}
                                            className='pl-10 sm:pl-12 w-full px-3 py-3 border border-green-700 rounded-lg bg-green-50 text-green-900 placeholder-green-700 text-sm sm:text-base focus:border-green-700 focus:ring-0 focus:outline-none'
                                            type="text"
                                            name='fullName'
                                            placeholder='Enter your full name'
                                            id='fullName'
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className='mb-4 sm:mb-6'>
                                    <label htmlFor="email" className='block text-sm font-semibold text-green-900 mb-2 sm:mb-3'>
                                        Your Email
                                    </label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                            <FaEnvelope className='h-4 w-4 sm:h-5 sm:w-5 text-green-800' />
                                        </div>
                                        <input
                                            onChange={inputHandle}
                                            value={state.email}
                                            className='pl-10 sm:pl-12 w-full px-3 py-3 border border-green-700 rounded-lg bg-green-50 text-green-900 placeholder-green-700 text-sm sm:text-base focus:border-green-700 focus:ring-0 focus:outline-none'
                                            type="email"
                                            name='email'
                                            placeholder='your@gmail.com'
                                            id='email'
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className='mb-4 sm:mb-6'>
                                    <label htmlFor="phoneNumber" className='block text-sm font-semibold text-green-900 mb-2 sm:mb-3'>
                                        Phone Number
                                    </label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                            <FaPhone className='h-4 w-4 sm:h-5 sm:w-5 text-green-800' />
                                        </div>
                                        <input
                                            onChange={inputHandle}
                                            value={state.phoneNumber}
                                            className='pl-10 sm:pl-12 w-full px-3 py-3 border border-green-700 rounded-lg bg-green-50 text-green-900 placeholder-green-700 text-sm sm:text-base focus:border-green-700 focus:ring-0 focus:outline-none'
                                            type="tel"
                                            name='phoneNumber'
                                            placeholder='1234567890'
                                            id='phoneNumber'
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className='mb-6'>
                                    <label htmlFor="password" className='block text-sm font-semibold text-green-900 mb-2 sm:mb-3'>
                                        Password
                                    </label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                            <FaLock className='h-4 w-4 sm:h-5 sm:w-5 text-green-800' />
                                        </div>
                                        <input
                                            onChange={inputHandle}
                                            value={state.password}
                                            className='pl-10 sm:pl-12 w-full px-3 py-3 border border-green-700 rounded-lg bg-green-50 text-green-900 placeholder-green-700 text-sm sm:text-base focus:border-green-700 focus:ring-0 focus:outline-none'
                                            type="password"
                                            name='password'
                                            placeholder='Create a strong password'
                                            id='password'
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Checkbox */}
                                <div className='flex items-start mb-6'>
                                    <input
                                        className='w-4 h-4 text-green-600 bg-green-50 border-green-300 rounded focus:ring-green-500 focus:ring-2 mt-1 mr-3 flex-shrink-0'
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                        required
                                    />
                                    <label htmlFor="checkbox" className='text-xs sm:text-sm text-green-700'>
                                        I agree to the <Link to="/terms" className='text-green-500 font-semibold hover:text-green-800'>Terms</Link> and <Link to="/privacy" className='text-green-500 font-semibold hover:text-green-800'>Privacy Policy</Link>
                                    </label>
                                </div>

                                {/* Button */}
                                <button
                                    disabled={sendingOTP || !isChecked}
                                    className='w-full bg-green-900 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base'
                                >
                                    {sendingOTP ? (
                                        <PropagateLoader color='#fff' cssOverride={overrideStyle} size={10} />
                                    ) : (
                                        <>
                                            Create Account
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

                            {/* Login Redirect */}
                            <div className='flex items-center justify-center'>
                                <p className='text-green-900'>
                                    Already have an account?{" "}
                                    <Link className='font-bold text-green-900 hover:text-green-900' to="/hire/login">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* OTP Verification */
                    <OTPInput
                        email={state.email}
                        purpose="signup"
                        onVerified={handleOTPVerified}
                        onCancel={handleCancelOTP}
                    />
                )}
            </div>
        </div>
    );
};

export default HireRegister;
