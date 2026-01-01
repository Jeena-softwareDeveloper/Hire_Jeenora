import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Pricing = () => {
    const navigate = useNavigate();
    const [purchaseMode, setPurchaseMode] = useState('credits'); // 'credits' or 'subscription'
    const [calc, setCalc] = useState({
        apps: 10,
        priority: false,
        resume: 0,
        directChats: 0,
        tracking: true
    });
    const [totalCredits, setTotalCredits] = useState(0);
    const [selectedPackage, setSelectedPackage] = useState('professional');
    const [currency, setCurrency] = useState('INR');
    const [showCalculator, setShowCalculator] = useState(false);
    const calculatorRef = useRef(null);

    // Color Palette
    const colors = {
        primary: '#0066CC', // Deep Blue
        secondary: '#00A86B', // Emerald Green
        accent: '#FFD700', // Gold
        dark: '#0F172A',
        light: '#F8FAFC'
    };

    // Credit packages
    const creditPackages = [
        { id: 'starter', credits: 20, price: 2999, savings: 0, popular: false, features: ['Basic applications', 'Full Support'] },
        { id: 'professional', credits: 50, price: 6999, savings: 15, popular: true, features: ['Priority applications', 'Direct messaging', 'Resume review'] },
        { id: 'premium', credits: 100, price: 12999, savings: 25, popular: false, features: ['All Professional features', 'End-to-end support journey', 'Priority Expert support'] },
        { id: 'enterprise', credits: 250, price: 29999, savings: 35, popular: false, features: ['Custom everything', 'Dedicated manager', 'Team collaboration'] }
    ];

    // Subscription plans
    const subscriptionPlans = [
        {
            id: 'basic',
            name: 'Basic',
            price: 999,
            period: 'monthly',
            features: [
                '5 Credits/month',
                'Standard applications',
                'Full support journey',
                'Email support'
            ],
            cta: 'Start Free Trial'
        },
        {
            id: 'professional',
            name: 'Professional',
            price: 2499,
            period: 'monthly',
            popular: true,
            features: [
                '25 Credits/month',
                'Priority applications',
                'Direct admin messaging',
                'Expert resume guidance',
                'Phone & email support'
            ],
            cta: 'Most Popular'
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: 6999,
            period: 'monthly',
            features: [
                'Unlimited Credits',
                'All Professional features',
                'Custom integrations',
                'Dedicated account manager',
                '24/7 priority support'
            ],
            cta: 'Contact Sales'
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target === calculatorRef.current) {
                        startCalculatorAnimation();
                    }
                }
            });
        }, { threshold: 0.1, rootMargin: '-50px' });

        document.querySelectorAll('.reveal-up, .bounce-in, .slide-in-left, .slide-in-right').forEach(el => observer.observe(el));

        // Auto-calculate credits
        const interval = setInterval(() => {
            calculateCredits();
        }, 100);

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, [calc]);

    const startCalculatorAnimation = () => {
        const elements = document.querySelectorAll('.calculator-element');
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('active');
            }, i * 100);
        });
    };

    const calculateCredits = () => {
        let credits = calc.apps * 2; // 2 credits per application
        if (calc.priority) credits += calc.apps * 1; // Extra credit for priority
        credits += calc.resume * 15; // Resume reviews
        credits += calc.directChats * 5; // Direct chats
        if (calc.tracking) credits += 10; // Advanced tracking
        setTotalCredits(credits);
    };

    const formatCurrency = (amount) => {
        const rates = { INR: '₹', USD: '$', EUR: '€' };
        return `${rates[currency]}${amount.toLocaleString()}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/20 via-white to-green-50/20 pb-40">
            {/* Hero Section */}
            <section className="relative pt-32 pb-40 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>
                <div className="absolute top-40 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-green-100 text-primary px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider mb-10 border border-blue-200/50"
                            style={{ color: colors.primary }}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Flexible Pricing Models
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 tracking-tighter gradient-text">
                            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
                                Career Journey
                            </span>
                            <br />
                            <span className="text-dark">With Full Professional Support</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
                        >
                            Choose between <span className="font-bold text-primary" style={{ color: colors.primary }}>pay-per-use credits</span> for flexibility or
                            <span className="font-bold text-secondary" style={{ color: colors.secondary }}> subscription plans</span> for predictable career advancement.
                        </motion.p>

                        {/* Purchase Mode Toggle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="inline-flex p-2 bg-white rounded-2xl border border-gray-200 shadow-lg mb-12"
                        >
                            <button
                                onClick={() => setPurchaseMode('credits')}
                                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${purchaseMode === 'credits'
                                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                                    : 'text-gray-600 hover:text-primary'
                                    }`}
                            >
                                💳 Credit Packages
                            </button>
                            <button
                                onClick={() => setPurchaseMode('subscription')}
                                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${purchaseMode === 'subscription'
                                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                                    : 'text-gray-600 hover:text-primary'
                                    }`}
                            >
                                📅 Subscription Plans
                            </button>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap justify-center gap-12"
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary" style={{ color: colors.primary }}>0%</div>
                                <div className="text-sm text-gray-500">Subscription Lock-in</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-secondary" style={{ color: colors.secondary }}>100%</div>
                                <div className="text-sm text-gray-500">Credit Rollover</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary" style={{ color: colors.primary }}>30-Day</div>
                                <div className="text-sm text-gray-500">Money Back Guarantee</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-secondary" style={{ color: colors.secondary }}>24/7</div>
                                <div className="text-sm text-gray-500">Support Included</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Calculator - Enhanced */}
            <section ref={calculatorRef} className="py-32">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Personalized Support Calculator
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Estimate exactly what you need. No more, no less. Your credits never expire.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Calculator Inputs */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-10 calculator-element"
                        >
                            <div className="p-10 rounded-3xl bg-white border-2 border-gray-100 shadow-xl">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800">Monthly Applications</h3>
                                        <p className="text-gray-600">How many jobs will you apply to?</p>
                                    </div>
                                    <div className="text-3xl font-bold text-primary" style={{ color: colors.primary }}>
                                        {calc.apps}
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    value={calc.apps}
                                    onChange={(e) => setCalc({ ...calc, apps: parseInt(e.target.value) })}
                                    className="w-full h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full appearance-none cursor-pointer slider-custom"
                                />
                                <div className="flex justify-between text-sm text-gray-500 mt-4">
                                    <span>Light (5)</span>
                                    <span>Moderate (15)</span>
                                    <span>Active (30)</span>
                                    <span>Aggressive (50)</span>
                                </div>
                            </div>

                            {/* Priority Toggle */}
                            <div className="p-10 rounded-3xl bg-white border-2 border-gray-100 shadow-xl">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Priority Applications</h3>
                                        <p className="text-gray-600">Get faster responses & direct feedback</p>
                                    </div>
                                    <button
                                        onClick={() => setCalc({ ...calc, priority: !calc.priority })}
                                        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ${calc.priority ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-200'
                                            }`}
                                    >
                                        <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-all duration-300 shadow-lg ${calc.priority ? 'translate-x-9' : 'translate-x-1'
                                            }`} />
                                    </button>
                                </div>
                                {calc.priority && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                            <span className="text-sm text-blue-700">
                                                Priority applications use 3 credits each (instead of 2)
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Additional Services */}
                            <div className="p-10 rounded-3xl bg-white border-2 border-gray-100 shadow-xl">
                                <h3 className="text-2xl font-bold text-gray-800 mb-8">Additional Services</h3>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-bold text-gray-800">Expert Resume Reviews</div>
                                            <div className="text-sm text-gray-600">Professional editing by industry experts</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setCalc({ ...calc, resume: Math.max(0, calc.resume - 1) })}
                                                className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="text-2xl font-bold text-gray-800 w-8 text-center">
                                                {calc.resume}
                                            </span>
                                            <button
                                                onClick={() => setCalc({ ...calc, resume: calc.resume + 1 })}
                                                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-lg hover:opacity-90 transition-all"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-bold text-gray-800">Direct Admin Chats</div>
                                            <div className="text-sm text-gray-600">Direct messaging with hiring teams</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setCalc({ ...calc, directChats: Math.max(0, calc.directChats - 1) })}
                                                className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="text-2xl font-bold text-gray-800 w-8 text-center">
                                                {calc.directChats}
                                            </span>
                                            <button
                                                onClick={() => setCalc({ ...calc, directChats: calc.directChats + 1 })}
                                                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-lg hover:opacity-90 transition-all"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Results Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="calculator-element"
                        >
                            <div className="relative h-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl transform rotate-2 opacity-10"></div>
                                <div className="relative p-12 rounded-3xl bg-gradient-to-br from-blue-600 to-green-600 text-white shadow-2xl h-full flex flex-col">
                                    <div className="mb-10">
                                        <div className="text-sm uppercase tracking-widest opacity-80 mb-2">Your Estimated Monthly Needs</div>
                                        <div className="text-6xl md:text-7xl font-black mb-4 flex items-end">
                                            {totalCredits}
                                            <span className="text-2xl ml-2 opacity-80">credits</span>
                                        </div>
                                        <div className="text-lg opacity-90">
                                            Based on {calc.apps} applications with selected services
                                        </div>
                                    </div>

                                    {/* Credit Breakdown */}
                                    <div className="mb-10 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="opacity-90">Applications ({calc.apps} × 2)</span>
                                            <span className="font-bold">{calc.apps * 2} credits</span>
                                        </div>
                                        {calc.priority && (
                                            <div className="flex justify-between items-center">
                                                <span className="opacity-90">Priority upgrade ({calc.apps} × 1)</span>
                                                <span className="font-bold">{calc.apps} credits</span>
                                            </div>
                                        )}
                                        {calc.resume > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="opacity-90">Resume reviews ({calc.resume} × 15)</span>
                                                <span className="font-bold">{calc.resume * 15} credits</span>
                                            </div>
                                        )}
                                        {calc.directChats > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="opacity-90">Direct chats ({calc.directChats} × 5)</span>
                                                <span className="font-bold">{calc.directChats * 5} credits</span>
                                            </div>
                                        )}
                                        {calc.tracking && (
                                            <div className="flex justify-between items-center">
                                                <span className="opacity-90">End-to-end support journey</span>
                                                <span className="font-bold">10 credits</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Recommendation */}
                                    <div className="mt-auto">
                                        <div className="p-6 bg-white/10 rounded-2xl border border-white/20 mb-6">
                                            <div className="text-sm uppercase tracking-widest opacity-80 mb-2">Recommended Package</div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-2xl font-bold">Professional</div>
                                                    <div className="opacity-80">50 credits</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold">{formatCurrency(6999)}</div>
                                                    <div className="opacity-80">Saves 15%</div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => navigate('/hire/register')}
                                            className="w-full py-5 bg-white text-primary rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl cursor-pointer"
                                            style={{ color: colors.primary }}
                                        >
                                            Get Started with {totalCredits} Credits
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Purchase Options Section */}
            <AnimatePresence mode="wait">
                {purchaseMode === 'credits' ? (
                    <motion.section
                        key="credits"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="py-32 bg-gradient-to-b from-white to-blue-50/30"
                    >
                        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                            <div className="text-center mb-20">
                                <h2 className="text-5xl md:text-6xl font-black mb-6">
                                    <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                        Credit Packages
                                    </span>
                                </h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    Buy credits in bulk and save. Use them whenever you need - they never expire!
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {creditPackages.map((pkg, index) => (
                                    <motion.div
                                        key={pkg.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        className={`relative ${pkg.popular ? 'transform scale-[1.05] z-10' : ''}`}
                                        onClick={() => setSelectedPackage(pkg.id)}
                                    >
                                        {pkg.popular && (
                                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg">
                                                Most Popular
                                            </div>
                                        )}

                                        <div className={`h-full p-8 rounded-3xl border-2 transition-all duration-300 ${selectedPackage === pkg.id
                                            ? 'border-primary shadow-2xl bg-gradient-to-b from-blue-50 to-white'
                                            : 'border-gray-100 hover:border-primary/50 hover:shadow-xl bg-white'
                                            }`}>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{pkg.id.charAt(0).toUpperCase() + pkg.id.slice(1)}</h3>

                                            <div className="mb-8">
                                                <div className="text-5xl font-black text-gray-800 mb-2">{pkg.credits}</div>
                                                <div className="text-lg text-gray-600">Credits</div>
                                                <div className="text-sm text-gray-500">Never expire • Use anytime</div>
                                            </div>

                                            <div className="mb-8">
                                                <div className="text-3xl font-bold text-primary mb-1" style={{ color: colors.primary }}>
                                                    {formatCurrency(pkg.price)}
                                                </div>
                                                {pkg.savings > 0 && (
                                                    <div className="text-sm text-green-600 font-bold">
                                                        Saves {pkg.savings}% vs buying individually
                                                    </div>
                                                )}
                                                <div className="text-sm text-gray-500">
                                                    ~{Math.round(pkg.price / pkg.credits)} per credit
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-8">
                                                {pkg.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                                            <span className="text-green-600 text-xs">✓</span>
                                                        </div>
                                                        <span className="text-gray-700">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => navigate('/hire/register')}
                                                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${selectedPackage === pkg.id
                                                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-2xl'
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {selectedPackage === pkg.id ? 'Select Package' : 'Choose Package'}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section
                        key="subscription"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="py-32 bg-gradient-to-b from-white to-green-50/30"
                    >
                        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                            <div className="text-center mb-20">
                                <h2 className="text-5xl md:text-6xl font-black mb-6">
                                    <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                        Subscription Plans
                                    </span>
                                </h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    Predictable monthly pricing with recurring credits and premium features.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {subscriptionPlans.map((plan, index) => (
                                    <motion.div
                                        key={plan.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        className={`relative ${plan.popular ? 'transform scale-[1.05] z-10' : ''}`}
                                    >
                                        {plan.popular && (
                                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg">
                                                Most Popular
                                            </div>
                                        )}

                                        <div className={`h-full p-8 rounded-3xl border-2 transition-all duration-300 ${plan.popular
                                            ? 'border-primary shadow-2xl bg-gradient-to-b from-blue-50 to-white'
                                            : 'border-gray-100 hover:border-primary/50 hover:shadow-xl bg-white'
                                            }`}>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                            <div className="text-sm text-gray-500 mb-6 capitalize">{plan.period}</div>

                                            <div className="mb-8">
                                                <div className="text-5xl font-black text-gray-800 mb-2">
                                                    {formatCurrency(plan.price)}
                                                    <span className="text-lg text-gray-600">/month</span>
                                                </div>
                                                <div className="text-sm text-gray-500">Cancel anytime • 30-day trial</div>
                                            </div>

                                            <div className="space-y-4 mb-8">
                                                {plan.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-start gap-3">
                                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-1">
                                                            <span className="text-green-600 text-xs">✓</span>
                                                        </div>
                                                        <span className="text-gray-700">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => navigate('/hire/register')}
                                                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${plan.popular
                                                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-2xl'
                                                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                                                    }`}
                                            >
                                                {plan.cta}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Billing Toggle */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100"
                            >
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Annual Billing Available</h3>
                                        <p className="text-gray-600">Save 20% with annual subscription</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-gray-800">20%</div>
                                            <div className="text-sm text-gray-500">Yearly Discount</div>
                                        </div>
                                        <button
                                            onClick={() => navigate('/hire/register')}
                                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all duration-300"
                                        >
                                            View Annual Plans
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Comparison Section */}
            <section className="py-32">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Which Model is Right for You?
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Compare our flexible pricing models to find your perfect fit.
                        </p>
                    </motion.div>

                    <div className="rounded-3xl overflow-hidden border-2 border-gray-100 shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 bg-gradient-to-r from-blue-50 to-green-50">
                            {/* Credits Model */}
                            <div className="p-12 border-r border-gray-100">
                                <div className="text-center mb-8">
                                    <div className="text-5xl mb-4">💳</div>
                                    <h3 className="text-2xl font-bold text-gray-800">Credit Packages</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Pay only for what you use</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Credits never expire</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Perfect for irregular job seekers</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Bulk purchase discounts</span>
                                    </div>
                                </div>

                                <div className="mt-12 text-center">
                                    <div className="text-sm text-gray-500 mb-2">Best for</div>
                                    <div className="font-bold text-gray-800">Active Job Seekers</div>
                                </div>
                            </div>

                            {/* VS Separator */}
                            <div className="md:hidden p-8 flex items-center justify-center">
                                <div className="relative">
                                    <div className="text-2xl font-black text-gray-400">VS</div>
                                </div>
                            </div>

                            {/* Subscription Model */}
                            <div className="p-12 border-r border-gray-100">
                                <div className="text-center mb-8">
                                    <div className="text-5xl mb-4">📅</div>
                                    <h3 className="text-2xl font-bold text-gray-800">Subscription Plans</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="text-green-600 text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Predictable monthly costs</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="text-green-600 text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Recurring credits each month</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="text-green-600 text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Perfect for regular applications</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="text-green-600 text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Annual discount available</span>
                                    </div>
                                </div>

                                <div className="mt-12 text-center">
                                    <div className="text-sm text-gray-500 mb-2">Best for</div>
                                    <div className="font-bold text-gray-800">Regular Users</div>
                                </div>
                            </div>

                            {/* Hybrid Model */}
                            <div className="p-12">
                                <div className="text-center mb-8">
                                    <div className="text-5xl mb-4">🔄</div>
                                    <h3 className="text-2xl font-bold text-gray-800">Hybrid Option</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Start with subscription</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Top up with credits when needed</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Maximum flexibility</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="font-medium">Never run out of credits</span>
                                    </div>
                                </div>

                                <div className="mt-12 text-center">
                                    <div className="text-sm text-gray-500 mb-2">Best for</div>
                                    <div className="font-bold text-gray-800">All Users</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Credit Features - Enhanced */}
            <section className="py-32">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-12 rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-2xl"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: '⚡', title: 'Zero Lock-in', desc: 'No subscription commitment required' },
                                { icon: '🔄', title: 'Rollover Forever', desc: 'Unused credits never expire' },
                                { icon: '💎', title: 'Bulk Savings', desc: 'Save up to 35% with larger packages' },
                                { icon: '🚀', title: 'Instant Activation', desc: 'Credits available immediately' }
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="opacity-90 text-sm">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-32">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-16 rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 text-center text-white shadow-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Invest in Your Career?</h2>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto mb-12">
                            Start with 10 free credits to experience our platform before committing.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => navigate('/hire/register')}
                                className="px-12 py-5 bg-white text-primary rounded-2xl font-bold text-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{ color: colors.primary }}
                            >
                                Get 10 Free Credits
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg cursor-pointer transition-all duration-300 hover:bg-white/10"
                            >
                                Need Custom Plan?
                            </button>
                        </div>

                        <div className="mt-12 text-sm opacity-80">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                30-day money back guarantee • No credit card required for trial
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CSS Animations */}
            <style>{`
                @keyframes flip-v {
                    0% { transform: rotateX(-90deg); opacity: 0; }
                    100% { transform: rotateX(0); opacity: 1; }
                }

                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .gradient-text {
                    background-clip: text;
                    -webkit-background-clip: text;
                }

                .reveal-up {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .reveal-up.active {
                    opacity: 1;
                    transform: translateY(0);
                }

                .bounce-in {
                    opacity: 0;
                    transform: scale(0.8);
                    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                }

                @keyframes bounceIn {
                    0% { opacity: 0; transform: scale(0.8); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                    100% { opacity: 1; transform: scale(1); }
                }

                .slide-in-left {
                    animation: slideInLeft 0.6s ease-out;
                }

                .slide-in-right {
                    animation: slideInRight 0.6s ease-out;
                }

                @keyframes slideInLeft {
                    from { transform: translateX(-50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes slideInRight {
                    from { transform: translateX(50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                .calculator-element {
                    opacity: 0;
                    transform: translateY(20px);
                }

                .calculator-element.active {
                    animation: slide-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .slider-custom::-webkit-slider-thumb {
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: white;
                    border: 3px solid ${colors.primary};
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
                }

                .slider-custom::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: white;
                    border: 3px solid ${colors.primary};
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
                }

                .stagger-1 { animation-delay: 0.1s; }
                .stagger-2 { animation-delay: 0.2s; }
                .stagger-3 { animation-delay: 0.3s; }
            `}</style>
        </div>
    );
};

export default Pricing;