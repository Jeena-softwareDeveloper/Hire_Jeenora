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

    // Mask email: jee****@gmail.com
    const maskEmail = (email) => {
        if (!email) return "";
        const [user, domain] = email.split("@");
        if (user.length < 3) return email;
        return `${user.slice(0, 3)}****@${domain}`;
    };

    return (
        <div className="w-full">
            {/* Header with Logo */}
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

                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Check your inbox ✉️</h2>
                <p className="text-slate-500 font-medium text-[15px]">
                    We sent a 6-digit code to <span className="text-slate-800 font-semibold">{maskEmail(email)}</span>
                </p>
            </div>

            {/* OTP Input Fields */}
            <div className="flex gap-2 sm:gap-3 justify-center mb-4">
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
                        className={`w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold border-2 rounded-xl transition-all outline-none 
                            ${digit ? 'border-[#27CFA6] bg-white shadow-lg shadow-[#27CFA6]/10' : 'border-slate-200 bg-white/50 hover:border-slate-300'}
                            focus:border-[#27CFA6] focus:bg-white focus:ring-4 focus:ring-[#27CFA6]/10 text-slate-800`}
                        disabled={loading || timeLeft === 0}
                    />
                ))}
            </div>

            {/* Timer Section */}
            <div className="flex items-center justify-center gap-2 mb-8">
                <FaClock className={`w-3.5 h-3.5 ${timeLeft < 60 ? 'text-rose-500 shadow-sm' : 'text-blue-500/60'}`} />
                <span className="text-slate-500 text-sm font-medium">Expires in</span>
                <span className={`text-sm font-bold ${timeLeft < 60 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {formatTime(timeLeft)}
                </span>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl text-center">
                    <p className="text-red-600 text-[13px] font-medium">{error}</p>
                </div>
            )}

            {/* Verify Button */}
            <div className="px-1">
                <button
                    onClick={handleVerify}
                    disabled={loading || otp.join('').length !== 6 || timeLeft === 0 || attemptsLeft === 0}
                    className="w-full h-[60px] bg-gradient-to-r from-blue-500 to-emerald-400 hover:from-blue-600 hover:to-emerald-500 text-white font-bold rounded-xl shadow-[0_12px_24px_-8px_rgba(37,99,235,0.3)] transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group mb-8"
                >
                    {loading ? (
                        <PropagateLoader color='#fff' cssOverride={overrideStyle} size={10} />
                    ) : (
                        <>
                            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center shadow-inner">
                                <FaShieldAlt className="text-white text-sm" />
                            </div>
                            <span className="text-lg tracking-wide">Verify & Continue →</span>
                        </>
                    )}
                </button>
            </div>

            {/* Links Section */}
            <div className="flex items-center justify-center gap-6 text-[15px] font-bold mb-10">
                <button
                    onClick={handleResend}
                    disabled={loading || (attemptsLeft > 0 && timeLeft > 0)}
                    className="text-blue-500/80 hover:text-blue-600 disabled:opacity-40 transition-colors"
                >
                    Resend OTP
                </button>
                <div className="h-4 w-px bg-slate-200"></div>
                <button
                    onClick={onCancel}
                    disabled={loading}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                    Cancel
                </button>
            </div>

            {/* Support Link */}
            <div className="text-center">
                <p className="text-slate-400 text-sm font-medium">
                    Need help? <a href="#" className="text-blue-500/80 hover:text-blue-600 hover:underline">Contact support</a>
                </p>
            </div>
        </div>
    );
};
export default OTPInput;

