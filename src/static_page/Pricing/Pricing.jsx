import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/api';

const Pricing = () => {
    const navigate = useNavigate();
    const [liveSettings, setLiveSettings] = useState(null);
    const [pageContent, setPageContent] = useState({
        faqs: [],
        successMetrics: [],
        creditFeatures: [],
        cta: {}
    });
    const [loading, setLoading] = useState(true);
    const [calc, setCalc] = useState({
        apps: 10,
        priority: false,
        resume: 0,
        directChats: 0,
        tracking: true,
        mockInterviews: 0,
        negotiation: false,
        careerGuidance: 0
    });
    const [totalCredits, setTotalCredits] = useState(0);
    const [selectedPackage, setSelectedPackage] = useState('professional');
    const [currency, setCurrency] = useState('INR');
    const [showCalculator, setShowCalculator] = useState(false);
    const [activeFAQ, setActiveFAQ] = useState(null);
    const calculatorRef = useRef(null);
    const packagesRef = useRef(null);

    // Default Data
    const defaultFaqs = [
        {
            question: "Do credits expire?",
            answer: "No! Credits never expire. Once you buy them, they stay in your account and can be used whenever you need help with a job application.",
            icon: "🔄"
        },
        {
            question: "How are credits used?",
            answer: "Credits are used only when our experts manually apply for a job on your behalf or provide professional support like resume edits or mock interviews.",
            icon: "🎯"
        },
        {
            question: "What is the Support until Hired philosophy?",
            answer: "We don't just apply once. We work with you, provide guidance, and use our manual expertise until you successfully land a job.",
            icon: "🛡️"
        },
        {
            question: "Is there a refund policy?",
            answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with our support, we'll process your refund with no questions asked.",
            icon: "💯"
        }
    ];

    const defaultSuccessMetrics = [
        { metric: 'Users Supported', value: '25,000+', change: '+15%', trend: 'up' },
        { metric: 'Avg Time Saved', value: '40+ hrs', change: 'per user', trend: 'static' },
        { metric: 'Offer Success Rate', value: '78%', change: '+22%', trend: 'up' },
        { metric: 'User Satisfaction', value: '4.8/5', change: '+0.3', trend: 'up' },
        { metric: 'Response Time', value: '2.3 days', change: '-40%', trend: 'down' },
        { metric: 'Credit Usage', value: '92%', change: 'Utilization', trend: 'up' }
    ];

    const defaultCreditFeatures = [
        { icon: '⚡', title: 'Zero Lock-in', desc: 'No subscription commitment required', highlight: 'Complete Freedom' },
        { icon: '🔄', title: 'Rollover Forever', desc: 'Unused credits never expire', highlight: 'No Waste' },
        { icon: '💎', title: 'Bulk Savings', desc: 'Save up to 35% with larger packages', highlight: 'Smart Investment' },
        { icon: '🚀', title: 'Instant Activation', desc: 'Credits available immediately', highlight: 'No Delays' },
        { icon: '👥', title: 'Team Discounts', desc: 'Special pricing for teams & groups', highlight: 'Scale Together' },
        { icon: '💯', title: '30-Day Guarantee', desc: 'Money-back guarantee on all purchases', highlight: 'Risk-Free' },
        { icon: '📊', title: 'Usage Analytics', desc: 'Track credit usage & optimize spending', highlight: 'Smart Insights' },
        { icon: '🌟', title: 'Premium Support', desc: 'Priority support for all users', highlight: 'Always Supported' }
    ];

    const defaultCta = {
        title: "Ready to Invest in Your Career?",
        subtitle: "Start with free credits to experience our platform before committing.",
        buttonText: "Get Free Credits",
        secondaryButtonText: "Need Custom Plan?",
        guarantee: "30-day money back guarantee • No credit card required for trial • Instant setup"
    };

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const [settingsResponse, contentResponse] = await Promise.all([
                    api.get('/hire/setting/credits'),
                    api.get('/hire/static/pricing')
                ]);

                setLiveSettings(settingsResponse.data);

                if (contentResponse.data && contentResponse.data.content) {
                    setPageContent({
                        faqs: contentResponse.data.content.faqs || defaultFaqs,
                        successMetrics: contentResponse.data.content.successMetrics || defaultSuccessMetrics,
                        creditFeatures: contentResponse.data.content.creditFeatures || defaultCreditFeatures,
                        cta: contentResponse.data.content.cta || defaultCta
                    });
                } else {
                    setPageContent({
                        faqs: defaultFaqs,
                        successMetrics: defaultSuccessMetrics,
                        creditFeatures: defaultCreditFeatures,
                        cta: defaultCta
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch pricing data:', error);
                setPageContent({
                    faqs: defaultFaqs,
                    successMetrics: defaultSuccessMetrics,
                    creditFeatures: defaultCreditFeatures,
                    cta: defaultCta
                });
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const faqs = pageContent.faqs.length > 0 ? pageContent.faqs : defaultFaqs;
    const successMetrics = pageContent.successMetrics.length > 0 ? pageContent.successMetrics : defaultSuccessMetrics;

    // Color Palette
    const colors = {
        primary: '#0066CC', // Deep Blue
        secondary: '#00A86B', // Emerald Green
        accent: '#FFD700', // Gold
        dark: '#0F172A',
        light: '#F8FAFC',
        gradient: 'linear-gradient(135deg, #0066CC 0%, #00A86B 100%)'
    };

    // Simplified credit packages: Free Trial + Professional Support
    const creditPackages = React.useMemo(() => {
        const baseCost = liveSettings?.perCreditCostINR || 149.95;
        const freeBonus = liveSettings?.initialFreeCredits || 10;

        return [
            {
                id: 'welcome',
                credits: freeBonus,
                price: { monthly: 0, annual: 0 },
                savings: 100,
                popular: false,
                features: [
                    'Free for New Users',
                    'Test Expert Support',
                    'Initial Resume Audit',
                    '24/7 Platform Access',
                    'No Credit Card Required'
                ],
                bestFor: 'Try before you buy',
                icon: '🎁',
                isFree: true
            },
            {
                id: 'professional',
                credits: 50,
                price: { monthly: Math.round(50 * baseCost * 0.9), annual: Math.round(50 * baseCost * 0.8) },
                savings: 20,
                popular: true,
                features: [
                    'Support Until Selection',
                    'Pay only for applied jobs',
                    'Priority Placement Track',
                    'Expert Manual Enhancements',
                    'No Hidden Placement Fees',
                    'Lifetime Credit Validity'
                ],
                bestFor: 'Serious job seekers',
                icon: '🚀'
            }
        ];
    }, [liveSettings]);

    useEffect(() => {
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target === packagesRef.current) {
                        startPackagesAnimation();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });

        document.querySelectorAll('.reveal-up, .bounce-in, .slide-in-left, .slide-in-right, .fade-in, .float-animation').forEach(el => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);

    const startPackagesAnimation = () => {
        const packages = document.querySelectorAll('.package-card');
        packages.forEach((pkg, i) => {
            setTimeout(() => {
                pkg.classList.add('animated');
            }, i * 150);
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/20 via-white to-green-50/20">
            {/* Navigation Progress Bar */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 z-50"
            />

            {/* Hero Section - Enhanced & Responsive */}
            <section className="relative pt-7 pb-5 md:pb-8 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>
                <div className="absolute top-40 -right-20 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute -bottom-20 -left-20 w-56 h-56 md:w-80 md:h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-green-100 text-primary px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider mb-4 md:mb-6 border border-blue-200/50 reveal-up"
                            style={{ color: colors.primary }}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Flexible Career Investment
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 md:mb-8 tracking-tight gradient-text">
                            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
                                Manual Support
                            </span>
                            <br />
                            <span className="text-dark whitespace-nowrap">Purely Credit Based System</span>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-16 px-4 md:px-0"
                        >
                            {successMetrics.slice(0, 4).map((metric, idx) => (
                                <motion.div
                                    key={metric.metric}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + idx * 0.1 }}
                                    className="text-center p-4 md:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className={`text-2xl md:text-3xl font-bold mb-2 ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-blue-600' : 'text-gray-600'}`}>
                                        {metric.value}
                                    </div>
                                    <div className="text-sm md:text-base text-gray-600 mb-1">{metric.metric}</div>
                                    <div className={`text-xs md:text-sm ${metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-blue-500' : 'text-gray-500'}`}>
                                        {metric.change}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl font-black text-xl md:text-2xl border-2 border-orange-200 shadow-xl mb-4 md:mb-6 reveal-up"
                        >
                            🔥 Special Offer Price: ₹{liveSettings?.perCreditCostINR || 149} Per Credit
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4"
                        >
                            <span className="block mb-4 font-bold text-blue-600 text-lg md:text-2xl">Get {liveSettings?.initialFreeCredits || 32} Welcome Credits Instantly!</span>
                            No hidden costs, no recurring fees. Pay only for the jobs we apply for. Complete expert support until you land your dream job.
                        </motion.p>
                    </motion.div>
                </div>
            </section>


            {/* Purchase Options Section */}
            <section
                className="pt-5 pb-10 md:pt-8 md:pb-16 bg-gradient-to-b from-white to-blue-50/30"
                ref={packagesRef}
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6 md:mb-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Choose Your Support Level
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Start for free or upgrade to Professional Support until you get hired. One-time payment, lifetime validity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                        {creditPackages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                onClick={() => setSelectedPackage(pkg.id)}
                                className={`package-card relative ${pkg.popular ? 'transform md:scale-[1.05] z-10' : ''}`}
                            >
                                {pkg.popular && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-1 md:px-6 md:py-2 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest shadow-lg">
                                        Support Guarantee
                                    </div>
                                )}

                                <div className={`h-full p-6 md:p-10 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 ${selectedPackage === pkg.id
                                    ? 'border-primary shadow-2xl bg-gradient-to-b from-blue-50 to-white'
                                    : 'border-gray-100 hover:border-primary/50 hover:shadow-xl bg-white'
                                    }`}>
                                    {/* Package Header */}
                                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                        <div className="text-3xl md:text-5xl">{pkg.icon}</div>
                                        <div>
                                            <h3 className="text-xl md:text-3xl font-black text-gray-800 capitalize">{pkg.id}</h3>
                                            <div className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">{pkg.bestFor}</div>
                                        </div>
                                    </div>

                                    {/* Credits & Price */}
                                    <div className="mb-6 md:mb-10">
                                        <div className="text-4xl md:text-5xl font-black text-gray-800 mb-2">
                                            {pkg.isFree ? (
                                                <>
                                                    {pkg.credits}
                                                    <span className="text-lg md:text-2xl ml-2 font-normal text-gray-500">Credits</span>
                                                </>
                                            ) : (
                                                <div className="text-primary text-3xl md:text-4xl leading-tight">
                                                    Special Offer: ₹{liveSettings?.perCreditCostINR || 149} <span className="text-lg md:text-xl font-normal text-gray-500">/ Credit</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-400 font-medium">
                                            {pkg.isFree ? 'Introduction Bonus • Limited Time' : 'Pay-as-you-go • Purely Support Based'}
                                        </div>
                                    </div>

                                    <div className="mb-8 md:mb-12">
                                        <div className="text-sm font-bold text-gray-500 uppercase tracking-widest bg-blue-50 py-2 rounded-lg">
                                            {pkg.isFree ? 'Zero Investment' : 'Support Guarantee Plan'}
                                        </div>
                                        {!pkg.isFree && (
                                            <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100">
                                                <div className="text-sm text-green-700 font-bold leading-tight">
                                                    ✨ Dedicated Support until Job Placement
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
                                        {pkg.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-green-600 text-xs md:text-sm font-bold">✓</span>
                                                </div>
                                                <span className="text-sm md:text-lg text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => navigate('/hire/register')}
                                        className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl transition-all duration-300 ${selectedPackage === pkg.id
                                            ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-xl hover:scale-105'
                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                    >
                                        {pkg.isFree ? 'Get Free Credits' : 'Get Professional Support'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Credit Features - Enhanced & Responsive */}
            <section className="py-10 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-6 md:p-12 rounded-2xl md:rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-xl md:shadow-2xl"
                    >
                        <h3 className="text-xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Choose Jeenora?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {(pageContent.creditFeatures && pageContent.creditFeatures.length > 0 ? pageContent.creditFeatures : defaultCreditFeatures).map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center p-4 md:p-6"
                                >
                                    <div className="text-3xl md:text-4xl mb-3 md:mb-4">{feature.icon}</div>
                                    <h4 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h4>
                                    <p className="opacity-90 text-sm md:text-base mb-2">{feature.desc}</p>
                                    <div className="text-xs md:text-sm opacity-80 bg-white/10 px-3 py-1 rounded-full inline-block">
                                        {feature.highlight}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-10 md:py-16 bg-gradient-to-b from-white to-blue-50/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Frequently Asked Questions
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600">
                            Get answers to common questions about our pricing and plans
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="border border-gray-200 rounded-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                                    className="w-full p-4 md:p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="text-xl md:text-2xl">{faq.icon}</div>
                                        <div className="font-bold text-gray-800 text-base md:text-lg">{faq.question}</div>
                                    </div>
                                    <motion.span
                                        animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                                        className="text-gray-400 text-xl"
                                    >
                                        ↓
                                    </motion.span>
                                </button>
                                <AnimatePresence>
                                    {activeFAQ === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 md:p-6 pt-0 border-t border-gray-100">
                                                <p className="text-gray-600 text-sm md:text-base">{faq.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action - Enhanced & Responsive */}
            <section className="py-10 md:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-6 md:p-12 lg:p-16 rounded-2xl md:rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 text-center text-white shadow-2xl"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            {(pageContent.cta && pageContent.cta.title) || defaultCta.title}
                        </h2>
                        <p className="text-base md:text-xl opacity-90 max-w-3xl mx-auto mb-8 md:mb-12">
                            {(pageContent.cta && pageContent.cta.subtitle) || `Start with ${liveSettings?.initialFreeCredits || 32} free credits to experience our platform before committing.`}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                            <button
                                onClick={() => navigate('/hire/register')}
                                className="group w-full sm:w-auto px-6 md:px-12 py-3 md:py-5 bg-white text-primary rounded-xl md:rounded-2xl font-bold text-base md:text-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{ color: colors.primary }}
                            >
                                <span className="flex items-center gap-2 md:gap-3 justify-center">
                                    {(pageContent.cta && pageContent.cta.buttonText) || `Get ${liveSettings?.initialFreeCredits || 32} Free Credits`}
                                    <motion.span
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="inline-block"
                                    >
                                        ⟳
                                    </motion.span>
                                </span>
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="w-full sm:w-auto px-4 md:px-10 py-3 md:py-5 bg-transparent border-2 border-white text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg cursor-pointer transition-all duration-300 hover:bg-white/10"
                            >
                                {(pageContent.cta && pageContent.cta.secondaryButtonText) || "Need Custom Plan?"}
                            </button>
                        </div>

                        <div className="mt-8 md:mt-12 text-sm opacity-80">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                {(pageContent.cta && pageContent.cta.guarantee) || "30-day money back guarantee • No credit card required for trial • Instant setup"}
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

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }

                @keyframes float-animation {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite;
                }

                .float-animation {
                    animation: float-animation 3s ease-in-out infinite;
                }

                .fade-in {
                    animation: fade-in 0.6s ease-out;
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

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                .calculator-element {
                    opacity: 0;
                    transform: translateY(20px);
                }

                .calculator-element.animated,
                .package-card.animated,
                .comparison-item.animated {
                    animation: slide-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .slider-custom::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: white;
                    border: 3px solid ${colors.primary};
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
                }

                .slider-custom::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: white;
                    border: 3px solid ${colors.primary};
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
                }

                /* Responsive animations */
                @media (max-width: 768px) {
                    .mobile-fade-in {
                        animation: fade-in 0.4s ease-out;
                    }
                    
                    .mobile-slide-up {
                        animation: slideInLeft 0.4s ease-out;
                    }
                }

                /* Reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                /* Smooth scrolling */
                html {
                    scroll-behavior: smooth;
                }

                /* Better focus styles for accessibility */
                button:focus, a:focus {
                    outline: 2px solid ${colors.primary};
                    outline-offset: 2px;
                }

                /* Card hover effects */
                .hover-card {
                    transition: all 0.3s ease;
                }

                .hover-card:hover {
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    transform: translateY(-5px);
                }

                /* Mobile optimizations */
                @media (max-width: 768px) {
                    .mobile-stack {
                        flex-direction: column;
                    }
                    
                    .mobile-center {
                        text-align: center;
                    }
                    
                    .mobile-padding {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    
                    .mobile-margin {
                        margin-top: 2rem;
                        margin-bottom: 2rem;
                    }
                }

                /* Tablet optimizations */
                @media (min-width: 769px) and (max-width: 1024px) {
                    .tablet-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .tablet-text {
                        font-size: 1.125rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Pricing;
