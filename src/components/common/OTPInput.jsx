import React, { useState, useRef, useEffect } from 'react';
import { FaEnvelope, FaClock, FaCheckCircle, FaShieldAlt, FaArrowRight, FaLifeRing } from 'react-icons/fa';
import api from '../../api/api';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from "../../utils/utils";
import logo from '@/assets/logo.png';

const OTPInput = ({ email, purpose, onVerified, onCancel }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
    const [attemptsLeft, setAttemptsLeft] = useState(5); // 5 attempts allowed
    const inputRefs = useRef([]);

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();

        // Start countdown timer
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setError('OTP expired. Please request a new one.');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('');
        while (newOtp.length < 6) newOtp.push('');
        setOtp(newOtp);
        inputRefs.current[5]?.focus();
    };

    const handleVerify = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter complete OTP');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.post('/hire/otp/verify', {
                email,
                otp: otpString,
                purpose
            });

            if (response.data) {
                onVerified(response.data);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Failed to verify OTP. Please try again.';
            setError(errorMsg);

            // Update attempts from backend or decrease locally
            if (err.response?.data?.attemptsLeft !== undefined) {
                setAttemptsLeft(err.response.data.attemptsLeft);
            } else {
                setAttemptsLeft(prev => Math.max(0, prev - 1));
            }

            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/hire/otp/resend', {
                email,
                purpose
            });

            if (response.data) {
                setOtp(['', '', '', '', '', '']);
                setTimeLeft(120); // Reset timer to 2 mins
                setAttemptsLeft(5); // Reset attempts to 5
                inputRefs.current[0]?.focus();
            }
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Failed to resend OTP. Please try again.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full ">
            {/* Header with Logo */}
            <div className="text-center mb-6">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <img
                        src={logo}
                        alt="Jeenora Logo"
                        className="h-7 object-contain"
                    />
                    <span className="text-xl font-bold text-slate-800 tracking-tight">
                        JEENORA <span className="text-emerald-500">Hire</span>
                    </span>
                </div>

                <h2 className="text-xl font-bold text-slate-800 mb-1">Check your inbox ✉️</h2>
                <p className="text-slate-500 text-sm">
                    We sent a 6-digit code to <span className="font-bold text-slate-800">{email}</span>
                </p>
            </div>

            {/* OTP Input */}
            <div className="flex gap-2 sm:gap-3 justify-center mb-5">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold border-2 rounded-lg transition-all outline-none 
                            ${digit ? 'border-teal-500 bg-white shadow-lg shadow-teal-100/50' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'}
                            focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 text-slate-800`}
                        disabled={loading || timeLeft === 0}
                    />
                ))}
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 mb-6 text-sm">
                <FaClock className={`${timeLeft < 60 ? 'text-red-500' : 'text-slate-400'}`} />
                <span className="text-slate-500">Expires in</span>
                <span className={`font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-slate-800'}`}>
                    {formatTime(timeLeft)}
                </span>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-center animate-shake">
                    <p className="text-red-600 text-xs font-semibold">{error}</p>
                    {attemptsLeft > 0 && attemptsLeft < 5 && (
                        <p className="text-red-500 text-[10px] mt-1">
                            {attemptsLeft} attempt{attemptsLeft !== 1 ? 's' : ''} remaining
                        </p>
                    )}
                </div>
            )}

            {/* Verify Button */}
            <button
                onClick={handleVerify}
                disabled={loading || otp.join('').length !== 6 || timeLeft === 0 || attemptsLeft === 0}
                className="w-full bg-gradient-to-r from-[#2FA8E5] to-[#27CFA6] hover:from-[#2697d0] hover:to-[#22bc96] text-white font-bold py-3 rounded-lg shadow-[0_10px_20px_-10px_rgba(39,207,166,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mb-5"
            >
                {loading ? (
                    <PropagateLoader color='#fff' cssOverride={overrideStyle} size={8} />
                ) : (
                    <>
                        <div className="bg-white/20 p-1 rounded-full">
                            <FaShieldAlt className="text-white text-xs" />
                        </div>
                        <span>Verify & Continue</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>

            {/* Resend / Cancel Links */}
            <div className="flex items-center justify-center gap-4 text-sm mb-6">
                <button
                    onClick={handleResend}
                    disabled={loading || (attemptsLeft > 0 && timeLeft > 0)}
                    className="font-medium text-slate-500 hover:text-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Resend OTP
                </button>
                <span className="text-slate-300">|</span>
                <button
                    onClick={onCancel}
                    disabled={loading}
                    className="font-medium text-slate-500 hover:text-red-500 disabled:opacity-50 transition-colors"
                >
                    Cancel
                </button>
            </div>


        </div>
    );
};
export default OTPInput;

