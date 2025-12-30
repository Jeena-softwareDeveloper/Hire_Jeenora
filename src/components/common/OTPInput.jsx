import React, { useState, useRef, useEffect } from 'react';
import { FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';
import Button from '../common/Button';
import api from '../../api/api';

const OTPInput = ({ email, purpose, onVerified, onCancel }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
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
                setTimeLeft(600); // Reset timer to 10 mins
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
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200 font-['Outfit']">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaEnvelope className="text-green-800 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                <p className="text-gray-600 text-sm">
                    We've sent a 6-digit code to<br />
                    <span className="font-semibold text-gray-900">{email}</span>
                </p>
            </div>

            {/* OTP Input */}
            <div className="flex gap-2 justify-center mb-6">
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
                        className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-800 focus:ring-2 focus:ring-green-100 transition-all"
                        disabled={loading || timeLeft === 0}
                    />
                ))}
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 mb-4">
                <FaClock className={`${timeLeft < 60 ? 'text-red-500' : 'text-gray-400'}`} />
                <span className={`text-sm font-semibold ${timeLeft < 60 ? 'text-red-500' : 'text-gray-600'}`}>
                    {formatTime(timeLeft)}
                </span>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm text-center font-medium">{error}</p>
                    {attemptsLeft > 0 && attemptsLeft < 5 && (
                        <p className="text-red-500 text-xs text-center mt-1">
                            {attemptsLeft} attempt{attemptsLeft !== 1 ? 's' : ''} remaining
                        </p>
                    )}
                </div>
            )}

            {/* Buttons */}
            <div className="space-y-3">
                <Button
                    fullWidth
                    onClick={handleVerify}
                    loading={loading}
                    disabled={otp.join('').length !== 6 || timeLeft === 0 || attemptsLeft === 0}
                    icon={FaCheckCircle}
                >
                    Verify OTP
                </Button>

                <div className="flex gap-3">
                    <Button
                        fullWidth
                        variant="secondary"
                        onClick={handleResend}
                        disabled={loading || (attemptsLeft > 0 && timeLeft > 0)}
                    >
                        {loading ? 'Sending...' : 'Resend OTP'}
                    </Button>
                    <Button
                        fullWidth
                        variant="ghost"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </div>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500 text-center mt-4">
                Didn't receive the code? Check your spam folder or click Resend OTP
            </p>
        </div>
    );
};

export default OTPInput;
