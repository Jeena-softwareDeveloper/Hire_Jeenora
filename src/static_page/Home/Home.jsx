import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPaperPlane, FaShieldAlt, FaRocket, FaClock, FaTimes } from 'react-icons/fa';
import api from '../../api/api';

const Home = () => {
    const navigate = useNavigate();
    const [pageContent, setPageContent] = useState({
        hero: {
            title: "End-to-End Career Support",
            subtitle: "Transform your job search with expert manual support, live tracking, and dedicated end-to-end guidance."
        },
        stats: {
            applications: 12459,
            users: 4892,
            hires: 327,
            responseRate: 78
        },
        testimonials: [
            {
                name: "Alex Johnson",
                role: "Senior Frontend Developer",
                company: "TechCorp",
                content: "Jeenora helped me land my dream job in just 2 weeks! The personalized support was incredible.",
                avatar: "AJ",
                rating: 5
            },
            {
                name: "Sarah Chen",
                role: "Product Manager",
                company: "StartupXYZ",
                content: "The transparency in application tracking gave me peace of mind during my job search.",
                avatar: "SC",
                rating: 5
            },
            {
                name: "Marcus Rodriguez",
                role: "DevOps Engineer",
                company: "CloudSystems",
                content: "I saved 40+ hours per month on applications. The expert support is worth every credit!",
                avatar: "MR",
                rating: 5
            },
            {
                name: "Priya Patel",
                role: "UX Designer",
                company: "DesignHub",
                content: "From resume to negotiation - complete end-to-end support. Highly recommended!",
                avatar: "PP",
                rating: 5
            }
        ],
        features: [
            {
                icon: "🎯",
                title: "Smart Job Matching",
                description: "AI-powered job matching with 95% accuracy",
                details: "Our algorithm analyzes your skills, experience, and preferences to match you with the perfect roles.",
                longDetails: [
                    "Advanced Skill Extraction: Our AI reads between the lines of your resume to find hidden strengths.",
                    "Cultural Alignment: We match you with companies that share your work values and environment preferences.",
                    "Probability Scoring: Every match comes with a success probability score to help you prioritize.",
                    "Growth Mapping: We don't just find a job; we find roles that align with your long-term career goals."
                ]
            },
            {
                icon: "🤝",
                title: "Dedicated Support",
                description: "1-on-1 expert guidance throughout your journey",
                details: "Get assigned a career expert who supports you from application to offer letter.",
                longDetails: [
                    "Personal Career Coach: Access to a dedicated expert for all your career queries.",
                    "Offer Negotiation: Professional guidance to help you secure the best possible compensation.",
                    "Strategic Planning: Weekly check-ins to review progress and adjust your search strategy.",
                    "Direct Line: Messaging access to your coach for instant support when you need it."
                ]
            },
            {
                icon: "📊",
                title: "Live Tracking",
                description: "Real-time application status updates",
                details: "Track every application with detailed insights and predictive analytics.",
                longDetails: [
                    "Transparency Portal: See exactly where your application is in the hiring funnel.",
                    "Bottleneck Alerts: Get notified if an application is stuck and what steps to take.",
                    "Company Insights: View response rates and average hiring times for specific employers.",
                    "Milestone Tracking: Celebrate every step from 'Applied' to 'Selected'."
                ]
            },
            {
                icon: "💼",
                title: "Interview Prep",
                description: "Mock interviews & negotiation coaching",
                details: "Practice with experts and learn salary negotiation strategies.",
                longDetails: [
                    "Role-Specific Prep: Practice for specific job requirements with industry veterans.",
                    "Live Mock Interviews: Realistic simulations with detailed feedback on performance.",
                    "Communication Coaching: Refine your storytelling and technical explanation skills.",
                    "Post-Interview Analysis: Review what went well and where to improve for the next round."
                ]
            },
            {
                icon: "🔄",
                title: "Continuous Feedback",
                description: "Detailed feedback on every application",
                details: "Learn from each application with comprehensive feedback reports.",
                longDetails: [
                    "Expert Reviews: Manual feedback from career advisors on why an application succeeded or failed.",
                    "Skill Gap Identification: Understand what certificates or skills could boost your profile.",
                    "Iterative Improvement: Constant refinement of your profile based on real employer interactions.",
                    "Monthly Performance Stats: Track your improvement across different search metrics."
                ]
            },
            {
                icon: "🔒",
                title: "Secure & Private",
                description: "Enterprise-grade security & privacy",
                details: "Your data is encrypted and never shared without consent.",
                longDetails: [
                    "Data Sovereignty: You have complete control over who sees your profile and when.",
                    "Stealth Mode: Search for jobs without alerting your current employer or network.",
                    "End-to-End Encryption: All communications and documents are protected by the latest standards.",
                    "Privacy-First Design: We never sell your data; our revenue comes from helping you succeed."
                ]
            }
        ],
        faqs: [
            {
                question: "How does the credit system work?",
                answer: "Our credit-based system lets you pay only for what you use. Each application or service uses credits, and unused credits roll over month-to-month."
            },
            {
                question: "Is there a subscription fee?",
                answer: "No! We don't believe in locking you into subscriptions. Pay-per-use with our credit system saves you money and gives you flexibility."
            },
            {
                question: "How quickly can I get support?",
                answer: "Our experts typically respond within 2 hours during business hours. We provide 24/7 email support and live chat during working hours."
            },
            {
                question: "What makes Jeenora different from other platforms?",
                answer: "We provide end-to-end manual support, real-time application tracking, and direct communication channels with hiring teams - something no other platform offers."
            },
            {
                question: "Can I track multiple applications at once?",
                answer: "Yes! Our dashboard lets you track unlimited applications with detailed status updates, interview scheduling, and communication logs."
            }
        ]
    });

    const [stats, setStats] = useState(pageContent.stats);
    const [activeTab, setActiveTab] = useState(0);
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);
    const pillarsRef = useRef(null);
    const simulatorRef = useRef(null);
    const testimonialsRef = useRef(null);

    // Color Palette - Green & Blue Theme
    const colors = {
        primary: '#0066CC', // Deep Blue
        secondary: '#00A86B', // Emerald Green
        accent: '#FFD700', // Gold
        dark: '#0F172A',
        light: '#F8FAFC',
        gradient: 'linear-gradient(135deg, #0066CC 0%, #00A86B 100%)'
    };

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                const { data } = await api.get('/hire/static/home');
                if (data && data.content) {
                    setPageContent(prev => ({ ...prev, ...data.content }));
                    if (data.content.stats) setStats(data.content.stats);
                }
            } catch (err) {
                console.error('Failed to fetch home content:', err);
            }
        };
        fetchPageContent();
    }, []);


    useEffect(() => {
        // Mouse move effect for interactive elements
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            });
        };

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target === heroRef.current) {
                        setIsVisible(true);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });

        const elements = document.querySelectorAll('.reveal-up, .fade-up-blur, .bounce-in, .slide-in-left, .slide-in-right, .pulse-glow');
        elements.forEach(el => observer.observe(el));

        // Live stats counter
        const interval = setInterval(() => {
            setStats(prev => ({
                applications: prev.applications + Math.floor(Math.random() * 3),
                users: prev.users + (Math.random() > 0.7 ? 1 : 0),
                hires: prev.hires,
                responseRate: prev.responseRate
            }));
        }, 2000);

        // Testimonial carousel
        const testimonialInterval = setInterval(() => {
            setTestimonialIndex((prev) => (prev + 1) % pageContent.testimonials.length);
        }, 5000);

        // Floating particles effect
        const particlesContainer = document.querySelector('.particles-container');
        if (particlesContainer) {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 8 + 2}px;
                    height: ${Math.random() * 8 + 2}px;
                    background: linear-gradient(45deg, ${colors.primary}, ${colors.secondary});
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    opacity: ${Math.random() * 0.3 + 0.1};
                    animation: float-particle ${Math.random() * 20 + 10}s infinite linear;
                `;
                particlesContainer.appendChild(particle);
            }
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            observer.disconnect();
            clearInterval(interval);
            clearInterval(testimonialInterval);
            window.removeEventListener('mousemove', handleMouseMove);
            const particles = document.querySelectorAll('.floating-particle');
            particles.forEach(p => p.remove());
        };
    }, [colors.primary, colors.secondary, pageContent.testimonials.length]);

    const splitText = (text) => {
        return text.split('').map((char, i) => (
            <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.5 }}
                className="inline-block"
            >
                {char === ' ' ? '\u00A0' : char}
            </motion.span>
        ));
    };

    return (
        <div className="min-h-screen relative overflow-hidden mesh-bg-green-blue">
            {/* Floating Particles Background */}
            <div className="particles-container absolute inset-0 overflow-hidden pointer-events-none"></div>

            {/* Mouse Tracker for Interactive Effects */}
            <div
                className="mouse-tracker absolute w-96 h-96 rounded-full pointer-events-none"
                style={{
                    left: `${mousePosition.x * 100}%`,
                    top: `${mousePosition.y * 100}%`,
                    background: `radial-gradient(circle at center, ${colors.primary}15 0%, transparent 70%)`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.3s ease-out'
                }}
            />

            {/* Hero Section - Refined Spacing */}
            <section ref={heroRef} className="relative pt-7 pb-6 md:pt-7 md:pb-6 lg:pt-7 lg:pb-6 overflow-hidden mesh-bg-green-blue flex items-center min-h-[70vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Animated Background Elements */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute top-40 -left-20 w-56 h-56 md:w-80 md:h-80 bg-gradient-to-tr from-blue-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>

                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20 xl:gap-32 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex-[1.2] relative z-10 w-full"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-green-100 text-primary px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider mb-6 md:mb-10 border border-blue-200/50 reveal-up"
                                style={{ color: colors.primary }}
                            >
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                TN Based Next-Gen Career Platform 🇮🇳
                            </motion.div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight md:leading-[1.05] mb-6 md:mb-10 tracking-tight gradient-text">
                                <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
                                    {splitText(pageContent.hero.title.split(' ')[0])}
                                </span>
                                <br />
                                <span className="text-dark mt-2 block">
                                    {splitText(pageContent.hero.title.split(' ').slice(1).join(' '))}
                                </span>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="text-base md:text-xl text-gray-600 leading-relaxed mb-8 md:mb-14 max-w-3xl mx-auto lg:mx-0 fade-up-blur px-4 md:px-0"
                            >
                                {pageContent.hero.subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 reveal-up px-4 md:px-0"
                            >
                                <button
                                    onClick={() => navigate('/jobs-preview')}
                                    className="group relative w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg cursor-pointer transition-all duration-300 overflow-hidden button-gradient hover-scale"
                                    style={{
                                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                        color: 'white'
                                    }}
                                >
                                    <span className="relative z-10">Explore Jobs</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-green-400 blur opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                                </button>

                                <button
                                    onClick={() => navigate('/hire/register')}
                                    className="group w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg cursor-pointer transition-all duration-300 border-2 border-primary hover:bg-primary/5 hover-scale"
                                    style={{ color: colors.primary }}
                                >
                                    <span className="flex items-center gap-2 md:gap-3 justify-center">
                                        Start Free Account
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                            className="inline-block"
                                        >
                                            →
                                        </motion.span>
                                    </span>
                                </button>
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="flex flex-wrap gap-4 md:gap-8 mt-10 md:mt-16 justify-center lg:justify-start px-4 md:px-0"
                            >
                                {(pageContent.quickStats || [
                                    { value: '100%', label: 'Support Happiness' },
                                    { value: '99%', label: 'Response Rate' },
                                    { value: '80%', label: 'Time Saved' },
                                    { value: '24/7', label: 'Expert Support' }
                                ]).map((stat, idx) => (
                                    <div key={idx} className="text-center px-3 py-2">
                                        <div className="text-2xl md:text-3xl font-bold" style={{ color: stat.color || colors.primary }}>{stat.value}</div>
                                        <div className="text-xs md:text-sm text-gray-500">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Interactive Dashboard Card - Responsive */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotateY: 20 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="flex-1 relative w-full max-w-2xl mt-12 lg:mt-0 px-4 md:px-0"
                        >
                            <div className="relative tilt-card-3d">
                                {/* Glow Effect */}
                                <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-500/20 to-green-500/20 blur-xl rounded-3xl animate-pulse"></div>

                                <div className="relative p-4 md:p-8 rounded-2xl md:rounded-3xl glass-card border border-white/40 shadow-xl md:shadow-2xl backdrop-blur-sm">
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 md:mb-8">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="relative">
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                                                    JD
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-base md:text-lg">Welcome back!</div>
                                                <div className="text-xs md:text-sm text-gray-500">Senior Frontend Developer</div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold text-xs md:text-sm bounce-in active shadow-lg">
                                            🪙 {pageContent.dashboardPreview ? pageContent.dashboardPreview.credits : 42} Credits
                                        </div>
                                    </div>

                                    {/* Progress Dashboard */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                                        <div className="bg-white/50 p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="flex justify-between items-center mb-2 md:mb-3">
                                                <label className="block text-xs md:text-sm text-gray-600 font-bold">Active Apps</label>
                                                <span className="text-xs font-bold text-green-600">+{pageContent.dashboardPreview ? pageContent.dashboardPreview.dailyApps : 3} Today</span>
                                            </div>
                                            <div className="text-3xl md:text-4xl font-black text-dark mb-2 md:mb-3">{pageContent.dashboardPreview ? pageContent.dashboardPreview.activeApps : 12}</div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '70%' }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                                                ></motion.div>
                                            </div>
                                        </div>

                                        <div className="bg-white/50 p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
                                            <label className="block text-xs md:text-sm text-gray-600 font-bold mb-2 md:mb-3">Match Score</label>
                                            <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto">
                                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                                                    <motion.circle
                                                        cx="50" cy="50" r="40"
                                                        stroke="url(#gradient)"
                                                        strokeWidth="8"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        initial={{ strokeDasharray: "0 251" }}
                                                        animate={{ strokeDasharray: `${(pageContent.dashboardPreview ? pageContent.dashboardPreview.matchScore : 92) * 2.51} 251` }}
                                                        transition={{ duration: 1.5, delay: 0.7 }}
                                                        transform="rotate(-90 50 50)"
                                                    />
                                                    <defs>
                                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" stopColor={colors.primary} />
                                                            <stop offset="100%" stopColor={colors.secondary} />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center text-xl md:text-2xl font-black" style={{ color: colors.secondary }}>
                                                    {pageContent.dashboardPreview ? pageContent.dashboardPreview.matchScore : 92}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Live Notifications */}
                                    <div className="space-y-3 md:space-y-4">
                                        {(pageContent.dashboardPreview ? pageContent.dashboardPreview.notifications : [
                                            { title: "Admin Message", message: "Interview with TechCorp confirmed", time: "2 min" },
                                            { title: "Status Update", message: "Application moved to Technical Review", time: "1 hr" }
                                        ]).map((notif, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1 + (i * 0.2) }}
                                                className={`flex items-center gap-3 p-3 md:p-4 rounded-xl border ${i === 0 ? 'bg-gradient-to-r from-blue-50 to-green-50 border-blue-100' : 'bg-white border-gray-100'}`}
                                            >
                                                <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${i === 0 ? 'bg-green-500 animate-pulse' : 'bg-blue-500'} flex-shrink-0`}></div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-xs md:text-sm truncate">{notif.title}</div>
                                                    <div className="text-xs md:text-sm text-gray-600 truncate">"{notif.message}"</div>
                                                </div>
                                                <div className="text-xs text-gray-400 flex-shrink-0">{notif.time}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section - New */}
            <section className="py-8 md:py-12 bg-white/50 backdrop-blur-sm border-y border-gray-100/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-gray-500 font-bold text-sm uppercase tracking-widest text-center md:text-left">
                            Trusted by candidates at
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 opacity-40 grayscale group hover:grayscale-0 transition-all duration-500">
                            {['Zoho', 'Freshworks', 'TVS', 'Ashok Leyland', 'Titan', 'HCL Chennai'].map((company) => (
                                <span key={company} className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter hover:scale-110 transition-transform cursor-pointer">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid Section */}
            <section className="py-12 md:py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Everything You Need
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Comprehensive tools and support for every stage of your career journey
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {pageContent.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-full group-hover:scale-125 transition-transform duration-300"></div>

                                <div className="relative z-10">
                                    <div className="w-14 h-14 md:w-16 md:h-16 mb-6 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl md:text-3xl shadow-lg">
                                        {feature.icon}
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-dark">{feature.title}</h3>
                                    <p className="text-sm md:text-base text-gray-600 mb-4">{feature.description}</p>
                                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{feature.details}</p>

                                    <div
                                        onClick={() => setSelectedFeature(feature)}
                                        className="mt-6 pt-4 border-t border-gray-100 cursor-pointer group/link hover:bg-gray-50/50 -mx-2 px-2 rounded-lg transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs md:text-sm font-bold text-primary group-hover/link:translate-x-1 transition-transform duration-300">Learn More</span>
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="text-blue-600 font-bold"
                                            >
                                                →
                                            </motion.span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advanced Value Pillars - Enhanced & Responsive */}
            <section ref={pillarsRef} className="py-12 md:py-12 bg-gradient-to-b from-white to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Our Core Support
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            We've engineered the platform to give you an <span className="font-bold">unfair advantage</span> in the competitive job market.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                        {(pageContent.valuePillars || [
                            {
                                icon: "🤝",
                                title: "Personalized Application Support",
                                description: "Expert manual guidance and full support for every application until you get selected.",
                                features: ["Manual Enhancements", "Profile Verification", "Application Guarantee"],
                                successRate: "95%",
                                color: "blue"
                            },
                            {
                                icon: "👁️",
                                title: "Post-Application Visibility",
                                description: "Real-time tracking and direct communication channels with hiring teams.",
                                features: ["Direct Admin Chat", "Status Timeline", "Interview Feedback"],
                                responseTime: "2.3 Days",
                                color: "green"
                            },
                            {
                                icon: "💳",
                                title: "Full-Support Credit System",
                                description: "Pay once for credits and receive expert manual support until you secure your dream job. No recurring fees or hidden charges.",
                                features: ["Support Until Selection", "No Hidden Extra Fees", "Credit-Based Flexibility"],
                                savings: "Full Support",
                                color: "blue"
                            }
                        ]).map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="group relative"
                            >
                                <div className="relative h-full p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-blue-500/5 rounded-full -translate-y-8 translate-x-8 md:-translate-y-16 md:translate-x-16 group-hover:scale-125 transition-transform duration-500"></div>

                                    <div className="relative z-10">
                                        <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl md:text-3xl shadow-lg">
                                            {pillar.icon}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold mb-4 text-dark">{pillar.title}</h3>
                                        <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                                            {pillar.description}
                                        </p>

                                        <div className="space-y-3 mb-6">
                                            {pillar.features.map((feature, idx) => (
                                                <motion.div
                                                    key={feature}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-green-600 font-bold text-sm">✓</span>
                                                    </div>
                                                    <span className="text-sm md:text-base font-medium">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs md:text-sm text-gray-500">
                                                    {pillar.successRate ? 'Success Rate' : pillar.responseTime ? 'Response Time' : 'Average Savings'}
                                                </span>
                                                <span className={`font-bold ${pillar.color === 'green' ? 'text-green-600' : 'text-blue-600'}`}>
                                                    {pillar.successRate || pillar.responseTime || pillar.savings}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: pillar.successRate ? '95%' : pillar.responseTime ? '85%' : '90%' }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                                                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                                                ></motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Carousel */}
            <section ref={testimonialsRef} className="py-7 md:py-7 bg-gradient-to-b from-gray-50 to-white">
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

                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={testimonialIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-12 max-w-4xl mx-auto"
                            >
                                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                                            {pageContent.testimonials[testimonialIndex].avatar}
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-yellow-400 text-lg">★</span>
                                            ))}
                                        </div>
                                        <p className="text-lg md:text-xl italic text-gray-700 mb-6">
                                            "{pageContent.testimonials[testimonialIndex].content}"
                                        </p>
                                        <div>
                                            <div className="font-bold text-lg md:text-xl">
                                                {pageContent.testimonials[testimonialIndex].name}
                                            </div>
                                            <div className="text-gray-600">
                                                {pageContent.testimonials[testimonialIndex].role} • {pageContent.testimonials[testimonialIndex].company}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Testimonial Navigation */}
                        <div className="flex justify-center items-center gap-4 mt-8">
                            {pageContent.testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setTestimonialIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${testimonialIndex === idx
                                        ? 'bg-gradient-to-r from-blue-500 to-green-500 w-8'
                                        : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Simulator - Enhanced & Responsive */}
            <section ref={simulatorRef} className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                How It Works
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Experience how Jeenora transforms your career journey
                        </p>
                    </motion.div>

                    {/* Simulator Steps */}
                    <div className="relative">
                        {/* Connection Line */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 transform -translate-y-1/2 z-0"></div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {(pageContent.platformSteps || [
                                {
                                    step: 1,
                                    title: "Profile Optimization",
                                    icon: "📊",
                                    color: "blue",
                                    features: ["Expert Manual Support", "Skill Alignment", "End-to-End Guidance"]
                                },
                                {
                                    step: 2,
                                    title: "Expert Job Selection",
                                    icon: "🎯",
                                    color: "green",
                                    features: ["Hand-picked Roles", "Company Insights", "Verified Opportunities"]
                                },
                                {
                                    step: 3,
                                    title: "Application Tracking",
                                    icon: "📈",
                                    color: "blue",
                                    features: ["Real-time Status", "Admin Updates", "Interview Scheduling"]
                                },
                                {
                                    step: 4,
                                    title: "Career Advancement",
                                    icon: "🚀",
                                    color: "green",
                                    features: ["Offer Negotiation", "Career Pathing", "Skill Development"]
                                }
                            ]).map((item, index) => (
                                <motion.div
                                    key={item.step || index} // step might be undefined if edited, default to index
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="relative group"
                                >
                                    <div className="relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                                        {/* Step Number */}
                                        <div className="absolute -top-4 -left-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg">
                                            {item.step || index + 1}
                                        </div>

                                        {/* Icon */}
                                        <div className="w-12 h-12 md:w-16 md:h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center text-2xl md:text-3xl">
                                            {item.icon}
                                        </div>

                                        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{item.title}</h3>

                                        <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                                            {item.features.map((feature, idx) => (
                                                <motion.div
                                                    key={feature}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.1 + 0.3 }}
                                                    className="flex items-center gap-2 md:gap-3"
                                                >
                                                    <div className={`w-2 h-2 rounded-full ${item.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'} animate-pulse flex-shrink-0`}></div>
                                                    <span className="text-sm md:text-base text-gray-600">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Progress Indicator */}
                                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${70 + index * 10}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className={`h-full ${item.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'} rounded-full`}
                                            ></motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Stats Section - Enhanced & Responsive */}
            <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            Live Platform Metrics
                        </h2>
                        <p className="text-base md:text-xl opacity-90 max-w-3xl mx-auto px-4">
                            Real-time data showing our impact on job seekers worldwide
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                        {[
                            { value: stats.applications, label: "Applications Sent", suffix: "+", color: "from-blue-400 to-green-400" },
                            { value: stats.users, label: "Active Job Seekers", suffix: "+", color: "from-green-400 to-blue-400" },
                            { value: stats.hires, label: "Companies Hiring", suffix: "+", color: "from-blue-400 to-green-400" },
                            { value: stats.responseRate, label: "Response Rate", suffix: "%", color: "from-green-400 to-blue-400" }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="text-center group"
                            >
                                <div className="relative">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl`}></div>

                                    <div className="relative p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                                        <div className={`text-3xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                            {stat.value.toLocaleString()}{stat.suffix}
                                        </div>
                                        <div className="text-sm md:text-base font-medium opacity-90">{stat.label}</div>

                                        {/* Animated Indicator */}
                                        <div className="mt-4 flex justify-center">
                                            <div className="flex space-x-1">
                                                {[1, 2, 3].map((dot) => (
                                                    <motion.div
                                                        key={dot}
                                                        className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/30"
                                                        animate={{
                                                            scale: [1, 1.5, 1],
                                                            opacity: [0.3, 1, 0.3]
                                                        }}
                                                        transition={{
                                                            duration: 1.5,
                                                            repeat: Infinity,
                                                            delay: dot * 0.1
                                                        }}
                                                    ></motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Frequently Asked Questions
                            </span>
                        </h2>
                        <p className="text-base md:text-lg text-gray-600">
                            Get answers to common questions about Jeenora Hire
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {pageContent.faqs && pageContent.faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="border border-gray-200 rounded-xl p-4 md:p-6 hover:border-blue-300 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                        ?
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg md:text-xl mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Enhanced & Responsive */}
            <section className="py-12 md:py-20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>
                <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-green-500/5 rounded-full blur-3xl"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8">
                            Ready to Transform Your
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Career Journey?
                            </span>
                        </h2>

                        <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto">
                            Join thousands of professionals who have already accelerated their career growth with Jeenora Hire.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                            <button
                                onClick={() => navigate('/hire/register')}
                                className="group relative w-full sm:w-auto px-8 md:px-14 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg cursor-pointer transition-all duration-300 overflow-hidden hover-scale"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                    color: 'white'
                                }}
                            >
                                <span className="relative z-10 flex items-center gap-2 md:gap-3 justify-center">
                                    Start Free Account
                                    <motion.span
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="inline-block"
                                    >
                                        ⟳
                                    </motion.span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <button
                                onClick={() => navigate('/how-it-works')}
                                className="w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg cursor-pointer border-2 border-primary hover:bg-primary/5 transition-all duration-300 hover-scale"
                                style={{ color: colors.primary }}
                            >
                                See Platform Walkthrough
                            </button>
                        </div>

                        <div className="mt-8 md:mt-12 text-sm text-gray-500">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                No credit card required • 30-day free trial • Cancel anytime
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>



            {/* Feature Details Modal */}
            <AnimatePresence>
                {selectedFeature && (
                    <div className="fixed inset-0 z-[1001] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedFeature(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        ></motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
                                <button
                                    onClick={() => setSelectedFeature(null)}
                                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-20 bg-white/80 backdrop-blur-sm"
                                >
                                    <FaTimes className="text-gray-400" />
                                </button>

                                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-3xl shadow-lg">
                                    {selectedFeature.icon}
                                </div>

                                <h3 className="text-2xl font-black text-dark mb-4">{selectedFeature.title}</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    {selectedFeature.details}
                                </p>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">What you get:</h4>
                                    <div className="grid gap-4">
                                        {selectedFeature.longDetails.map((detail, idx) => (
                                            <div key={idx} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-green-600 font-bold text-sm">✓</span>
                                                </div>
                                                <p className="text-sm md:text-base text-gray-700 font-medium">
                                                    {detail}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedFeature(null)}
                                    className="w-full mt-10 py-4 bg-primary text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300"
                                >
                                    Got it, thanks!
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Add CSS for animations */}
            <style>{`
                @keyframes float-particle {
                    0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                    33% { transform: translateY(-20px) translateX(10px) rotate(120deg); }
                    66% { transform: translateY(-40px) translateX(-5px) rotate(240deg); }
                    100% { transform: translateY(0px) translateX(0px) rotate(360deg); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }

                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .mesh-bg-green-blue {
                    background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 50%, #eff6ff 100%);
                    position: relative;
                    background-size: 200% 200%;
                    animation: gradient-shift 15s ease infinite;
                }

                .glass-card {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                }

                .gradient-text {
                    background-clip: text;
                    -webkit-background-clip: text;
                }

                .tilt-card-3d {
                    transform-style: preserve-3d;
                    perspective: 1000px;
                }

                .tilt-card-3d:hover {
                    transform: rotateY(5deg) rotateX(5deg);
                }

                .button-gradient:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 20px 40px rgba(0, 102, 204, 0.3);
                }

                .hover-scale:hover {
                    transform: translateY(-2px) scale(1.02);
                }

                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
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

                .fade-up-blur {
                    opacity: 0;
                    transform: translateY(20px);
                    filter: blur(4px);
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .fade-up-blur.active {
                    opacity: 1;
                    transform: translateY(0);
                    filter: blur(0);
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

                /* Floating animation */
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                .float-animation {
                    animation: float 3s ease-in-out infinite;
                }

                /* Gradient border animation */
                @keyframes border-glow {
                    0%, 100% { border-color: rgba(0, 102, 204, 0.3); }
                    50% { border-color: rgba(0, 168, 107, 0.5); }
                }

                .border-glow {
                    animation: border-glow 2s infinite;
                }

                /* Text gradient animation */
                @keyframes text-gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .gradient-animated-text {
                    background: linear-gradient(90deg, #0066CC, #00A86B, #0066CC);
                    background-size: 200% 200%;
                    background-clip: text;
                    -webkit-background-clip: text;
                    color: transparent;
                    animation: text-gradient 3s ease infinite;
                }

                /* Responsive text sizes */
                @media (max-width: 640px) {
                    .responsive-text {
                        font-size: 0.875rem;
                    }
                    
                    .responsive-heading {
                        font-size: 1.5rem;
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

                /* Staggered children animation */
                .stagger-children > * {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: stagger-fade 0.5s ease forwards;
                }

                .stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
                .stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
                .stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
                .stagger-children > *:nth-child(4) { animation-delay: 0.4s; }

                @keyframes stagger-fade {
                    to { opacity: 1; transform: translateY(0); }
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

                /* Reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </div>
    );
};

export default Home;