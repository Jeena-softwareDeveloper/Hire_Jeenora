import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const HowItWorks = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [pageContent, setPageContent] = useState({
        phases: [],
        timelineSteps: [],
        sections: {
            hero: {
                subtitle: 'Platform Workflow & Process',
                title: 'The Complete Hiring',
                highlight: 'Success System',
                description: 'Experience a structured, data-driven journey from discovery to offer. No black holes, just clear progress and expert support.'
            },
            lifecycle: {
                title: 'Complete Application Lifecycle',
                subtitle: 'Track your progress through every stage with real-time updates and actionable insights.'
            },
            comparison: {
                title: 'Why Professionals Choose',
                highlight: 'Jeenora',
                subtitle: 'See how we compare to traditional job search methods'
            }
        },
        successMetrics: [],
        tabContent: {}
    });

    const [expandedStep, setExpandedStep] = useState(0);
    const [activePhase, setActivePhase] = useState(0);
    const [progress, setProgress] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    const [isScrolling, setIsScrolling] = useState(false);
    const timelineRef = useRef(null);
    const processRef = useRef(null);
    const comparisonRef = useRef(null);

    // Color Palette
    const colors = {
        primary: '#0066CC', // Deep Blue
        secondary: '#00A86B', // Emerald Green
        accent: '#FFD700', // Gold
        dark: '#0F172A',
        light: '#F8FAFC',
        gradient: 'linear-gradient(135deg, #0066CC 0%, #00A86B 100%)'
    };

    // Default data for initial render
    const defaultPhases = [
        {
            num: '01',
            title: 'Expert Discovery & Matching',
            details: [
                'AI-Powered Job Matching (95% accuracy)',
                'Manual Match Score Calculation',
                'Credit Cost Transparency',
                'Featured Opportunity Badges',
                'Professional Filter Panel',
                'Company Culture Insights',
                'Salary Range Predictions',
                'Success Probability Analysis'
            ],
            icon: '🔍',
            description: 'Our expert team combined with AI algorithms analyzes thousands of job descriptions against your profile. We provide personalized match scores, success probabilities, and detailed insights to help you identify the best opportunities with human-verified accuracy.',
            color: 'blue',
            features: [
                { name: 'Match Score', value: 95, unit: '%', icon: '🎯' },
                { name: 'Avg. Response Time', value: 2.3, unit: ' days', icon: '⏱️' },
                { name: 'Success Rate', value: 78, unit: '%', icon: '📈' }
            ],
            timeline: '1-3 days',
            keyBenefits: [
                'Avoid job application fatigue',
                'Focus on high-probability opportunities',
                'Understand company culture fit'
            ]
        },
        {
            num: '02',
            title: 'Enhanced Application Process',
            details: [
                'Expert Resume Optimization',
                'ATS Compatibility Scan',
                'Keyword Integration',
                'Strength Probability Meter',
                'Missing Skill Identification',
                'Custom Cover Letter Creation',
                'Application Formatting',
                'One-Click Expert Review'
            ],
            icon: '⚡',
            description: 'Our career experts manually enhance your resume for each application. We ensure ATS compatibility, integrate missing keywords, and structure your application for maximum impact. Every application receives personalized attention to highlight your strengths.',
            color: 'green',
            features: [
                { name: 'ATS Score', value: 98, unit: '%', icon: '📊' },
                { name: 'Time Saved', value: 85, unit: '%', icon: '⏰' },
                { name: 'Quality Improvement', value: 65, unit: '%', icon: '✨' }
            ],
            timeline: '2-4 hours',
            keyBenefits: [
                'Increase interview callbacks by 3x',
                'Save 10+ hours per application',
                'Stand out with professionally crafted applications'
            ]
        },
        {
            num: '03',
            title: 'Tracking & Communication Hub',
            details: [
                'Live Status Timeline Updates',
                'Direct Admin Messaging System',
                'Interview Scheduling Tool',
                'Action Requirement Alerts',
                'Company Communication History',
                'Response Time Analytics',
                'Application Health Score',
                'Next Step Predictions'
            ],
            icon: '📱',
            description: 'Real-time tracking dashboard with direct communication channels to hiring teams. Receive instant updates, schedule interviews directly, and communicate with company representatives through our secure platform. Never wonder about your application status again.',
            color: 'blue',
            features: [
                { name: 'Response Time', value: 4.5, unit: ' hours', icon: '⚡' },
                { name: 'Update Frequency', value: 92, unit: '%', icon: '🔄' },
                { name: 'User Satisfaction', value: 4.8, unit: '/5', icon: '⭐' }
            ],
            timeline: 'Ongoing',
            keyBenefits: [
                'Eliminate application black holes',
                'Reduce follow-up time by 90%',
                'Get notified instantly about updates'
            ]
        },
        {
            num: '04',
            title: 'Decision & Success Support',
            details: [
                'Multi-Offer Comparison Tool',
                'Expert Negotiation Guidance',
                'Structured Onboarding Plan',
                'Comprehensive Feedback Loop',
                'Career Path Analysis',
                'Skill Gap Assessment',
                'Team Introduction Support',
                'Long-term Success Planning'
            ],
            icon: '🏆',
            description: 'Comprehensive offer evaluation with expert negotiation support. We help you compare multiple offers, understand market rates, and negotiate better terms. Get structured feedback and smoothly transition into your new role with ongoing support.',
            color: 'green',
            features: [
                { name: 'Offer Success Rate', value: 87, unit: '%', icon: '🎉' },
                { name: 'Time to Offer', value: 14, unit: ' days', icon: '📅' },
                { name: 'Satisfaction Score', value: 4.9, unit: '/5', icon: '💯' }
            ],
            timeline: '1-2 weeks',
            keyBenefits: [
                'Increase offer value by 15-25%',
                'Make informed career decisions',
                'Smooth transition to new role'
            ]
        }
    ];

    const defaultTimelineSteps = [
        {
            step: 1,
            title: 'Profile Setup & Analysis',
            duration: '5-10 min',
            status: 'completed',
            description: 'Complete your professional profile with skills, experience, and career goals. Our AI analyzes your profile to identify strengths and improvement areas.',
            tasks: ['Profile completion', 'Skill assessment', 'Career goal setting'],
            icon: '👤'
        },
        {
            step: 2,
            title: 'Job Discovery & Matching',
            duration: '10-15 min',
            status: 'completed',
            description: 'Browse through curated job opportunities with personalized match scores. Use advanced filters to find perfect role matches.',
            tasks: ['Job browsing', 'Match analysis', 'Opportunity shortlisting'],
            icon: '🔍'
        },
        {
            step: 3,
            title: 'Expert Application Optimization',
            duration: '2-4 hours',
            status: 'completed',
            description: 'Our team manually tailors your application for maximum impact. We enhance resumes, optimize cover letters, and ensure ATS compatibility.',
            tasks: ['Resume enhancement', 'Cover letter creation', 'ATS optimization'],
            icon: '✏️'
        },
        {
            step: 4,
            title: 'Application Submission',
            duration: '1 min',
            status: 'active',
            description: 'Submit optimized applications with one click. Our system tracks every submission and provides instant confirmation.',
            tasks: ['One-click submission', 'Confirmation receipt', 'Tracking setup'],
            icon: '🚀'
        },
        {
            step: 5,
            title: 'Real-time Status Tracking',
            duration: 'Ongoing',
            status: 'pending',
            description: 'Monitor real-time updates, receive notifications, and track progress through hiring pipeline with detailed analytics.',
            tasks: ['Status monitoring', 'Notification setup', 'Analytics review'],
            icon: '📊'
        },
        {
            step: 6,
            title: 'Interview Coordination',
            duration: 'Varies',
            status: 'pending',
            description: 'Schedule and prepare for interviews directly on platform. Get expert coaching and mock interview sessions.',
            tasks: ['Interview scheduling', 'Preparation coaching', 'Mock interviews'],
            icon: '🎯'
        },
        {
            step: 7,
            title: 'Offer & Negotiation Support',
            duration: '3-7 days',
            status: 'pending',
            description: 'Evaluate offers with our comparison tools. Get expert negotiation guidance and contract review support.',
            tasks: ['Offer comparison', 'Negotiation strategy', 'Contract review'],
            icon: '💼'
        },
        {
            step: 8,
            title: 'Onboarding & Transition',
            duration: '2-4 weeks',
            status: 'pending',
            description: 'Smooth transition into your new role with structured onboarding plan and ongoing career support.',
            tasks: ['Onboarding planning', 'Team introduction', 'Success tracking'],
            icon: '✨'
        }
    ];

    const defaultSuccessMetrics = [
        { metric: 'Applications Processed', value: '25,000+', change: '+15%', trend: 'up' },
        { metric: 'Average Response Time', value: '2.3 days', change: '-40%', trend: 'down' },
        { metric: 'Interview Rate', value: '99%', change: '+28%', trend: 'up' },
        { metric: 'Offer Acceptance', value: '99%', change: '+22%', trend: 'up' },
        { metric: 'User Satisfaction', value: '4.9/5', change: '+0.3', trend: 'up' },
        { metric: 'Time Saved', value: '80+ hrs', change: 'per user', trend: 'static' }
    ];

    const defaultTabContent = {
        overview: {
            title: "Complete Workflow Overview",
            description: "End-to-end process from discovery to onboarding",
            steps: [
                { title: "Profile Analysis", icon: "📋", desc: "Comprehensive profile assessment and optimization" },
                { title: "Job Matching", icon: "🎯", desc: "AI-powered matching with expert verification" },
                { title: "Application", icon: "✏️", desc: "Manual enhancement and optimization" },
                { title: "Tracking", icon: "📱", desc: "Real-time status updates and communication" },
                { title: "Interview", icon: "🎙️", desc: "Preparation and coordination support" },
                { title: "Offer", icon: "💼", desc: "Evaluation and negotiation guidance" }
            ]
        },
        features: {
            title: "Key Platform Features",
            description: "Everything you need for a successful job search",
            steps: [
                { title: "Expert Support", icon: "👥", desc: "Dedicated career experts for guidance" },
                { title: "Real-time Tracking", icon: "📍", desc: "Live application status updates" },
                { title: "Direct Communication", icon: "💬", desc: "Chat with hiring teams directly" },
                { title: "Analytics Dashboard", icon: "📊", desc: "Comprehensive performance insights" },
                { title: "Resource Library", icon: "📚", desc: "Templates, guides, and tools" },
                { title: "Mobile App", icon: "📱", desc: "On-the-go access and notifications" }
            ]
        },
        benefits: {
            title: "User Benefits",
            description: "How Jeenora transforms your job search",
            steps: [
                { title: "Time Savings", icon: "⏰", desc: "Save 40+ hours per month" },
                { title: "Higher Success", icon: "📈", desc: "3x more interview calls" },
                { title: "Better Offers", icon: "💰", desc: "15-25% higher compensation" },
                { title: "Stress Reduction", icon: "😌", desc: "Eliminate application anxiety" },
                { title: "Career Growth", icon: "🚀", desc: "Long-term career planning" },
                { title: "Community", icon: "🤝", desc: "Network with professionals" }
            ]
        }
    };

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await api.get('/hire/static/how-it-works');
                if (data && data.content) {
                    setPageContent(prev => ({
                        ...prev,
                        ...data.content,
                        phases: data.content.phases || defaultPhases,
                        timelineSteps: data.content.timelineSteps || defaultTimelineSteps,
                        successMetrics: data.content.successMetrics || defaultSuccessMetrics,
                        tabContent: data.content.tabContent || defaultTabContent
                    }));
                } else {
                    setPageContent(prev => ({
                        ...prev,
                        phases: defaultPhases,
                        timelineSteps: defaultTimelineSteps,
                        successMetrics: defaultSuccessMetrics,
                        tabContent: defaultTabContent
                    }));
                }
            } catch (err) {
                console.error('Failed to fetch how-it-works content:', err);
                setPageContent(prev => ({
                    ...prev,
                    phases: defaultPhases,
                    timelineSteps: defaultTimelineSteps,
                    successMetrics: defaultSuccessMetrics,
                    tabContent: defaultTabContent
                }));
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const phases = pageContent.phases && pageContent.phases.length > 0 ? pageContent.phases : defaultPhases;
    const timelineSteps = pageContent.timelineSteps && pageContent.timelineSteps.length > 0 ? pageContent.timelineSteps : defaultTimelineSteps;
    const successMetrics = pageContent.successMetrics && pageContent.successMetrics.length > 0 ? pageContent.successMetrics : defaultSuccessMetrics;
    const tabContent = pageContent.tabContent && Object.keys(pageContent.tabContent).length > 0 ? pageContent.tabContent : defaultTabContent;

    useEffect(() => {
        // Intersection Observer for animations
        if (loading) return; // Add check inside effect if needed, but mainly we move the declaration up

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target === timelineRef.current) {
                        startTimelineAnimation();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });

        document.querySelectorAll('.reveal-up, .bounce-in, .slide-in-left, .slide-in-right, .float-animation, .fade-in').forEach(el => observer.observe(el));

        // Auto-rotate expanded step for demo
        const stepInterval = setInterval(() => {
            setExpandedStep(prev => (prev + 1) % phases.length);
        }, 7000);

        // Progress animation
        let progressValue = 0;
        const progressInterval = setInterval(() => {
            if (progressValue < 100) {
                progressValue += 1;
                setProgress(progressValue);
            }
        }, 50);

        // Scroll detection
        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
        };

        let scrollTimeout;
        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            clearInterval(stepInterval);
            clearInterval(progressInterval);
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [loading, phases.length]); // dependency update

    const startTimelineAnimation = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            setProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 30);
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
                animate={{ width: `${progress}%` }}
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 z-50"
                style={{ width: `${progress}%` }}
            />

            {/* Hero Section - Enhanced & Responsive */}
            <section className="relative pt-7 pb-12 md:pb-16 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>
                <div className="absolute -top-20 -right-20 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute top-40 -left-20 w-56 h-56 md:w-80 md:h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>

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
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-green-100 text-primary px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider mb-6 md:mb-10 border border-blue-200/50 reveal-up"
                            style={{ color: colors.primary }}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            {pageContent.sections.hero.subtitle}
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 md:mb-8 tracking-tight gradient-text">
                            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
                                {pageContent.sections.hero.title}
                            </span>
                            <br />
                            <span className="text-dark">{pageContent.sections.hero.highlight}</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 px-4 md:px-0"
                        >
                            {pageContent.sections.hero.description}
                        </motion.p>

                        {/* Interactive Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-16 px-4 md:px-0"
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
                    </motion.div>
                </div>
            </section>

            {/* Tabs Navigation - Responsive */}
            <section className="py-6 md:py-8 bg-white/50 backdrop-blur-sm border-y border-gray-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
                        {Object.keys(tabContent).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all duration-300 ${activeTab === tab
                                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg transform scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                {tabContent[tab].title.split(' ')[0]}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tab Content - Responsive */}
            <section className="py-10 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-center mb-12 md:mb-20"
                        >
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                    {tabContent[activeTab].title}
                                </span>
                            </h2>
                            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                                {tabContent[activeTab].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {tabContent[activeTab].steps.map((step, idx) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="flex items-start gap-4 md:gap-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center text-2xl md:text-3xl">
                                        {step.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg md:text-xl font-bold mb-2 text-dark">{step.title}</h3>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs md:text-sm text-gray-500">Learn more</span>
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="text-blue-600 font-bold"
                                        >
                                            →
                                        </motion.span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Phases - Enhanced & Responsive */}
            <section ref={processRef} className="py-10 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Four-Phase Success System
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Each phase is meticulously designed to give you maximum advantage in the hiring process.
                        </p>
                    </motion.div>

                    {/* Connection Line - Responsive */}
                    <div className="hidden lg:block relative h-2 mb-16 md:mb-20">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 rounded-full opacity-20"></div>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 2 }}
                            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 rounded-full"
                        ></motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {phases.map((phase, i) => (
                            <motion.div
                                key={phase.num}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                onClick={() => setExpandedStep(i)}
                                className={`relative group cursor-pointer ${expandedStep === i ? 'transform scale-[1.02]' : ''
                                    }`}
                            >
                                <div className={`relative h-full p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border-2 transition-all duration-300 overflow-hidden ${expandedStep === i
                                    ? 'border-primary shadow-2xl shadow-blue-100'
                                    : 'border-gray-100 hover:border-primary/50 hover:shadow-xl'
                                    }`}>
                                    {/* Background Glow */}
                                    <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 rounded-full -translate-y-8 translate-x-8 md:-translate-y-16 md:translate-x-16 transition-transform duration-500 group-hover:scale-125 ${phase.color === 'blue' ? 'bg-blue-500/5' : 'bg-green-500/5'
                                        }`}></div>

                                    {/* Step Number */}
                                    <div className="absolute top-4 right-4 md:top-6 md:right-6 text-4xl md:text-5xl font-black text-gray-100 leading-none">
                                        {phase.num}
                                    </div>

                                    {/* Header */}
                                    <div className="flex items-start gap-4 md:gap-6 mb-6">
                                        {/* Icon */}
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl shadow-lg ${phase.color === 'blue'
                                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                                            : 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                                            }`}>
                                            {phase.icon}
                                        </div>

                                        {/* Title & Timeline */}
                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-xl font-bold text-dark mb-2">{phase.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span>⏱️</span>
                                                <span className="font-medium">Timeline: {phase.timeline}</span>
                                            </div>
                                        </div>

                                        {/* Expand Button */}
                                        <motion.span
                                            animate={{ rotate: expandedStep === i ? 180 : 0 }}
                                            className={`transition-colors text-2xl ${expandedStep === i
                                                ? 'text-primary opacity-100'
                                                : 'text-gray-300 opacity-50 group-hover:opacity-100'
                                                }`}
                                        >
                                            ↓
                                        </motion.span>
                                    </div>

                                    {/* Description */}
                                    <AnimatePresence>
                                        {expandedStep === i && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                                                    {phase.description}
                                                </p>

                                                {/* Key Benefits */}
                                                <div className="mb-6">
                                                    <h4 className="text-sm font-bold text-gray-700 mb-3">Key Benefits:</h4>
                                                    <div className="space-y-2">
                                                        {phase.keyBenefits.map((benefit, idx) => (
                                                            <div key={idx} className="flex items-center gap-3">
                                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                                <span className="text-sm text-gray-600">{benefit}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Features Grid */}
                                                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                                                    {phase.features.map((feature, idx) => (
                                                        <div key={feature.name} className="text-center">
                                                            <div className="text-lg md:text-xl font-bold text-primary mb-1">
                                                                {feature.value}{feature.unit}
                                                            </div>
                                                            <div className="text-xs md:text-sm text-gray-500">{feature.name}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Progress Bar for Expanded State */}
                                    {expandedStep === i && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 0.8 }}
                                            className="h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mt-6"
                                        ></motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Phase Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center mt-8 md:mt-12 space-x-2"
                    >
                        {phases.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setExpandedStep(i)}
                                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${expandedStep === i
                                    ? 'bg-gradient-to-r from-blue-500 to-green-500 scale-125'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Interactive Timeline - Enhanced & Responsive */}
            <section ref={timelineRef} className="py-10 md:py-16 bg-gradient-to-b from-white to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                {pageContent.sections.lifecycle.title}
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            {pageContent.sections.lifecycle.subtitle}
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Desktop Timeline */}
                        <div className="hidden md:block relative">
                            {/* Main Timeline Line */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-blue-500 transform -translate-x-1/2"></div>

                            {/* Timeline Steps */}
                            <div className="space-y-24">
                                {timelineSteps.map((step, index) => (
                                    <motion.div
                                        key={step.step}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className={`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''
                                            }`}
                                    >
                                        {/* Content Card */}
                                        <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                                            <div className={`p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border-2 shadow-lg hover:shadow-xl transition-all duration-300 ${step.status === 'completed'
                                                ? 'border-green-200 bg-gradient-to-r from-green-50 to-white'
                                                : step.status === 'active'
                                                    ? 'border-blue-200 bg-gradient-to-r from-blue-50 to-white'
                                                    : 'border-gray-100'
                                                }`}>
                                                <div className="flex items-start gap-4 md:gap-6">
                                                    <div className="relative">
                                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg ${step.status === 'completed'
                                                            ? 'bg-gradient-to-br from-green-500 to-green-600'
                                                            : step.status === 'active'
                                                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 animate-pulse'
                                                                : 'bg-gradient-to-br from-gray-300 to-gray-400'
                                                            }`}>
                                                            {step.icon}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center mb-3">
                                                            <h3 className={`text-lg md:text-xl font-bold ${step.status === 'completed'
                                                                ? 'text-green-700'
                                                                : step.status === 'active'
                                                                    ? 'text-blue-700'
                                                                    : 'text-gray-400'
                                                                }`}>
                                                                {step.title}
                                                            </h3>
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${step.status === 'completed'
                                                                ? 'bg-green-100 text-green-700'
                                                                : step.status === 'active'
                                                                    ? 'bg-blue-100 text-blue-700'
                                                                    : 'bg-gray-100 text-gray-400'
                                                                }`}>
                                                                {step.duration}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-3">
                                                            {step.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {step.tasks.map((task, idx) => (
                                                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                                                    {task}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Timeline Node */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2">
                                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${step.status === 'completed'
                                                ? 'bg-green-500'
                                                : step.status === 'active'
                                                    ? 'bg-blue-500 animate-pulse'
                                                    : 'bg-gray-300'
                                                }`}>
                                                <span className="text-white font-bold text-xs md:text-sm">{step.step}</span>
                                            </div>
                                        </div>

                                        {/* Empty Space */}
                                        <div className="w-5/12"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Timeline */}
                        <div className="md:hidden space-y-6">
                            {timelineSteps.map((step, index) => (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="relative pl-10"
                                >
                                    {/* Timeline Line */}
                                    <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>

                                    {/* Timeline Node */}
                                    <div className={`absolute left-5 top-6 w-6 h-6 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 ${step.status === 'completed'
                                        ? 'bg-green-500'
                                        : step.status === 'active'
                                            ? 'bg-blue-500 animate-pulse'
                                            : 'bg-gray-300'
                                        }`}>
                                        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                                            {step.step}
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`ml-6 p-6 rounded-2xl bg-white border-2 shadow-lg ${step.status === 'completed'
                                        ? 'border-green-200 bg-gradient-to-r from-green-50 to-white'
                                        : step.status === 'active'
                                            ? 'border-blue-200 bg-gradient-to-r from-blue-50 to-white'
                                            : 'border-gray-100'
                                        }`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${step.status === 'completed'
                                                ? 'bg-gradient-to-br from-green-500 to-green-600'
                                                : step.status === 'active'
                                                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 animate-pulse'
                                                    : 'bg-gradient-to-br from-gray-300 to-gray-400'
                                                }`}>
                                                {step.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className={`text-base font-bold ${step.status === 'completed'
                                                        ? 'text-green-700'
                                                        : step.status === 'active'
                                                            ? 'text-blue-700'
                                                            : 'text-gray-400'
                                                        }`}>
                                                        {step.title}
                                                    </h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${step.status === 'completed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : step.status === 'active'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-gray-100 text-gray-400'
                                                        }`}>
                                                        {step.duration}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {step.tasks.slice(0, 2).map((task, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                            {task}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            className="h-2 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 rounded-full mt-8 md:mt-12"
                        >
                            <div className="h-full w-full relative">
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-blue-500"></div>
                            </div>
                        </motion.div>
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>Start</span>
                            <span>{progress}% Complete</span>
                            <span>Finish</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table Section - Enhanced & Responsive */}
            <section ref={comparisonRef} className="py-10 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-6 md:p-12 rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-50 to-green-50 border border-white shadow-xl"
                    >
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                    Why Choose Jeenora?
                                </span>
                            </h2>
                            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                                Compare how we stack up against traditional job search methods.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
                            {/* Traditional Methods */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="group"
                            >
                                <div className="p-1 md:p-2 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-2xl">
                                    <div className="p-6 md:p-10 rounded-2xl bg-white border-2 border-red-100">
                                        <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-6 md:mb-8 flex items-center gap-3 md:gap-4 text-gray-600">
                                            <span className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-500 text-lg md:text-xl">✗</span>
                                            Traditional Job Search
                                        </h3>
                                        <ul className="space-y-3 md:space-y-4">
                                            {[
                                                'Plain Resume Upload (No optimization)',
                                                'Zero Feedback / Complete Ghosting',
                                                'Manual Email Follow-ups (Time-consuming)',
                                                'No Status Visibility (Black holes)',
                                                '30% Avg Response Rate',
                                                'Time-Consuming Applications (15+ mins each)',
                                                'Limited Communication Channels',
                                                'No Performance Analytics'
                                            ].map((item, idx) => (
                                                <motion.li
                                                    key={item}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="p-3 md:p-4 bg-red-50/50 text-gray-600 rounded-xl text-sm md:text-base font-medium flex items-start gap-3 md:gap-4 hover:bg-red-50 transition-colors"
                                                >
                                                    <span className="text-red-400 text-lg md:text-xl flex-shrink-0">✗</span>
                                                    <span>{item}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Jeenora Hire */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="group"
                            >
                                <div className="p-1 md:p-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-2xl">
                                    <div className="p-6 md:p-10 rounded-2xl bg-white border-2 border-blue-100">
                                        <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-6 md:mb-8 flex items-center gap-3 md:gap-4 text-primary" style={{ color: colors.primary }}>
                                            <span className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-lg md:text-xl">✓</span>
                                            Jeenora Hire Platform
                                        </h3>
                                        <ul className="space-y-3 md:space-y-4">
                                            {[
                                                'Expert-Optimized Applications (98% ATS score)',
                                                'Guaranteed Status Updates (No ghosting)',
                                                'Integrated Direct Chat (Real-time communication)',
                                                'Real-time Application Timeline (Complete visibility)',
                                                '78% Platform Response Rate (2.6x higher)',
                                                'One-Click Applications (Under 1 minute)',
                                                'Multi-Channel Notifications (Never miss updates)',
                                                'Detailed Performance Analytics (Data-driven insights)'
                                            ].map((item, idx) => (
                                                <motion.li
                                                    key={item}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="p-3 md:p-4 bg-gradient-to-r from-blue-50 to-green-50 text-gray-700 rounded-xl text-sm md:text-base font-medium flex items-start gap-3 md:gap-4 border border-blue-100/50 hover:border-blue-200 transition-all"
                                                >
                                                    <span className="text-green-500 text-lg md:text-xl flex-shrink-0">✓</span>
                                                    <span>{item}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Stats Comparison */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-8 md:mt-16 p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-lg"
                        >
                            <h4 className="text-lg md:text-2xl font-bold text-center mb-6 md:mb-8 text-gray-700">Performance Comparison</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                {[
                                    { label: 'Response Rate', traditional: 30, jeenora: 78, unit: '%', icon: '📨' },
                                    { label: 'Time to Apply', traditional: 15, jeenora: 2, unit: ' min', icon: '⏰' },
                                    { label: 'Status Updates', traditional: 10, jeenora: 95, unit: '%', icon: '🔄' },
                                    { label: 'User Satisfaction', traditional: 2.8, jeenora: 4.8, unit: '/5', icon: '⭐' }
                                ].map((stat, idx) => (
                                    <div key={stat.label} className="text-center p-3 md:p-4">
                                        <div className="text-lg md:text-xl mb-2">{stat.icon}</div>
                                        <div className="text-xs md:text-sm text-gray-500 mb-2">{stat.label}</div>
                                        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3">
                                            <div className="text-sm md:text-base font-bold text-red-500">{stat.traditional}{stat.unit}</div>
                                            <div className="text-gray-400 text-xs">→</div>
                                            <div className="text-base md:text-lg font-bold text-green-600">{stat.jeenora}{stat.unit}</div>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full flex">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${stat.traditional}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1 }}
                                                    className="bg-red-400"
                                                ></motion.div>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${stat.jeenora - stat.traditional}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.3 }}
                                                    className="bg-green-500"
                                                ></motion.div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Application Flow Visualization - Enhanced & Responsive */}
            <section className="py-10 md:py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Real-time Status Lifecycle
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Track every application through our comprehensive status tracking system.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Desktop Timeline */}
                        <div className="hidden md:flex items-center justify-between max-w-5xl mx-auto">
                            {[
                                { step: 1, title: 'Submitted', color: 'blue', description: 'Application sent and confirmed', icon: '📤' },
                                { step: 2, title: 'Viewed', color: 'green', description: 'Reviewed by hiring team', icon: '👁️' },
                                { step: 3, title: 'Shortlisted', color: 'blue', description: 'Selected for next round', icon: '✅' },
                                { step: 4, title: 'Interview', color: 'green', description: 'Interview scheduled', icon: '🎙️' },
                                { step: 5, title: 'Review', color: 'blue', description: 'Final evaluation', icon: '📋' },
                                { step: 6, title: 'Offer', color: 'green', description: 'Offer extended', icon: '💼' }
                            ].map((step, index) => (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col items-center relative"
                                >
                                    {/* Step Card */}
                                    <div className="group relative cursor-pointer">
                                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg mb-4 ${step.color === 'blue'
                                            ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                                            : 'bg-gradient-to-br from-green-500 to-green-600'
                                            } ${index <= 3 ? 'animate-pulse-soft' : ''}`}>
                                            {step.icon}
                                        </div>

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                            <div className="text-sm font-bold text-gray-700">{step.title}</div>
                                            <div className="text-xs text-gray-500">{step.description}</div>
                                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div className="text-center">
                                        <div className={`text-sm font-bold ${index <= 3 ? 'text-gray-800' : 'text-gray-400'
                                            }`}>{step.title}</div>
                                        <div className="text-xs text-gray-500 mt-1">{step.description}</div>
                                    </div>

                                    {/* Connector Line */}
                                    {index < 5 && (
                                        <div className={`absolute top-8 left-full w-16 md:w-24 h-1 ${index < 3
                                            ? 'bg-gradient-to-r from-blue-500 to-green-500'
                                            : 'bg-gray-200'
                                            }`}></div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile Timeline */}
                        <div className="md:hidden space-y-8">
                            {[
                                { step: 1, title: 'Submitted', color: 'blue', description: 'Application sent and confirmed', icon: '📤' },
                                { step: 2, title: 'Viewed', color: 'green', description: 'Reviewed by hiring team', icon: '👁️' },
                                { step: 3, title: 'Shortlisted', color: 'blue', description: 'Selected for next round', icon: '✅' },
                                { step: 4, title: 'Interview', color: 'green', description: 'Interview scheduled', icon: '🎙️' },
                                { step: 5, title: 'Review', color: 'blue', description: 'Final evaluation', icon: '📋' },
                                { step: 6, title: 'Offer', color: 'green', description: 'Offer extended', icon: '💼' }
                            ].map((step, index) => (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    {/* Step Indicator */}
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${step.color === 'blue'
                                        ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                                        : 'bg-gradient-to-br from-green-500 to-green-600'
                                        } ${index <= 3 ? 'animate-pulse-soft' : ''}`}>
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className={`text-base font-bold ${index <= 3 ? 'text-gray-800' : 'text-gray-400'
                                            }`}>{step.title}</div>
                                        <div className="text-sm text-gray-500">{step.description}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Status Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mt-8 md:mt-16 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-r from-blue-50 to-green-50 border border-white shadow-lg"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                                <div className="flex-1">
                                    <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Current Application Status</h3>
                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                        Your application at <span className="font-bold">TechCorp Inc.</span> is currently in the
                                        <span className="font-bold text-primary" style={{ color: colors.primary }}> Interview </span>
                                        phase. Next step: Technical assessment scheduled for tomorrow at 2 PM.
                                    </p>
                                    <div className="flex items-center gap-3 mt-4">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-sm text-gray-500">Next update expected in 4 hours</span>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ color: colors.primary }}>Step 4/6</div>
                                    <div className="text-sm text-gray-500 mb-2">Application Progress</div>
                                    <div className="w-40 md:w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '66%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1 }}
                                            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                                        ></motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Success Stories Carousel */}
            <section className="py-10 md:py-16 bg-gradient-to-b from-white to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Success Stories
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Hear from professionals who transformed their careers with Jeenora
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            { name: "Alex Johnson", role: "Senior Frontend Dev", company: "TechCorp", time: "2 weeks", quote: "Landed my dream job with expert support", avatar: "AJ" },
                            { name: "Sarah Chen", role: "Product Manager", company: "StartupXYZ", time: "3 weeks", quote: "Transparent tracking eliminated job search stress", avatar: "SC" },
                            { name: "Marcus Rodriguez", role: "DevOps Engineer", company: "CloudSystems", time: "1 month", quote: "Saved 40+ hours monthly on applications", avatar: "MR" }
                        ].map((story, idx) => (
                            <motion.div
                                key={story.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 md:gap-6 mb-6">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                                        {story.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg md:text-xl">{story.name}</div>
                                        <div className="text-sm md:text-base text-gray-600">{story.role}</div>
                                        <div className="text-xs md:text-sm text-gray-500">{story.company}</div>
                                    </div>
                                </div>
                                <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6">
                                    "{story.quote}"
                                </blockquote>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">Found job in</div>
                                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                                        {story.time}
                                    </div>
                                </div>
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
                        className="p-8 md:p-12 lg:p-16 rounded-2xl md:rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 text-center text-white shadow-2xl"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            Ready to Experience the Difference?
                        </h2>
                        <p className="text-base md:text-xl opacity-90 max-w-3xl mx-auto mb-8 md:mb-12">
                            Join thousands of professionals who have transformed their job search with Jeenora Hire.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                            <button
                                onClick={() => navigate('/hire/register')}
                                className="group w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-primary rounded-xl md:rounded-2xl font-bold text-base md:text-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{ color: colors.primary }}
                            >
                                <span className="flex items-center gap-2 md:gap-3 justify-center">
                                    Start Free Account
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
                                onClick={() => navigate('/jobs-preview')}
                                className="w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 bg-transparent border-2 border-white text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg cursor-pointer transition-all duration-300 hover:bg-white/10"
                            >
                                Explore Jobs First
                            </button>
                        </div>

                        <div className="mt-8 md:mt-12 text-sm opacity-80">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                No credit card required • 3 free credits on signup • 30-day satisfaction guarantee
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* CSS Animations */}
            <style>{`
                @keyframes flow-pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }

                @keyframes pulse-soft {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
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

                .animate-pulse-soft {
                    animation: pulse-soft 2s infinite;
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

                .animation-delay-2000 {
                    animation-delay: 2s;
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

                /* Loading spinner */
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .spin-animation {
                    animation: spin 1s linear infinite;
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

export default HowItWorks;