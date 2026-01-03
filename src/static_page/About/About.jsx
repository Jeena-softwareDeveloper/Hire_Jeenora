import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBullseye,
    FaChartLine,
    FaUsers,
    FaGlobe,
    FaShieldAlt,
    FaLightbulb,
    FaRocket,
    FaHandshake,
    FaClock,
    FaCheckCircle,
    FaSearch,
    FaBalanceScale,
    FaHeart
} from 'react-icons/fa';

import api from '../../api/api';

const About = () => {
    const [loading, setLoading] = useState(true);
    const [pageContent, setPageContent] = useState({
        hero: {},
        statsPreview: [],
        tabsContent: {},
        techStack: {},
        platformArchitecture: {},
        coreValues: [],
        timelineMilestones: [],
        teamMembers: [],
        features: []
    });

    const defaultHero = {
        title: "Ending the Era of Career Uncertainty",
        subtitle: "Jeenora Hire was built by engineers, recruiters, and job seekers who were tired of the \"Application Black Hole\". We've engineered transparency, live tracking, and end-to-end support into the very core of the job hunt."
    };

    const defaultStatsPreview = [
        { label: 'Response Rate', value: '78%', icon: '⚡' },
        { label: 'Success Rate', value: '95%', icon: '🏆' },
        { label: 'Time Saved', value: '40h', icon: '⏱️' },
        { label: 'User Growth', value: '300%', icon: '📈' }
    ];

    const defaultTabsContent = {
        problem: {
            title: "The Traditional Job Search Problem",
            items: [
                { title: 'Application Black Holes', desc: 'Submit resumes into void, receive no updates, zero feedback loops', icon: '🕳️', stats: '85% of applications get no response', impact: 'High candidate frustration' },
                { title: 'Ghosting Culture', desc: 'Companies disappear after interviews, leaving candidates in limbo', icon: '👻', stats: '40% experience post-interview ghosting', impact: 'Damaged employer branding' },
                { title: 'Limited Visibility', desc: 'No insight into application status, hiring team feedback, or next steps', icon: '🙈', stats: 'Zero transparency in 90% of processes', impact: 'Poor candidate experience' }
            ]
        },
        solution: {
            title: "The Jeenora Hire Solution",
            items: [
                { title: 'Real-time Tracking', desc: 'Live application status updates with direct hiring team feedback', icon: '📊', benefit: '95% application visibility', feature: 'Instant notifications' },
                { title: 'Live Support Journey', desc: 'Expert guidance from application up to your first day at work.', icon: '🤝', benefit: '100% Support Guarantee', feature: 'Personal career advisor' },
                { title: 'Direct Communication', desc: 'Integrated messaging with hiring teams, no more black holes', icon: '💬', benefit: '4.5 hour avg response time', feature: 'In-platform messaging' }
            ]
        },
        impact: {
            title: "Measurable Impact",
            items: [
                { title: 'Response Rates', desc: '78% average response rate vs industry standard of 30%', icon: '⚡', improvement: '+160% improvement', detail: 'Higher engagement' },
                { title: 'Time Saved', desc: 'Average user saves 40 hours monthly on job search activities', icon: '⏱️', improvement: '65% time reduction', detail: 'More productive job search' },
                { title: 'Success Rates', desc: '45% higher interview-to-offer conversion through better matching', icon: '🏆', improvement: '2.3x more successful', detail: 'Better career outcomes' }
            ]
        },
        future: {
            title: "Future Vision",
            items: [
                { title: 'AI Career Coach', desc: 'Personalized AI mentor providing real-time career guidance and skill development', icon: '🤖', timeline: '2025', feature: '24/7 career support' },
                { title: 'Global Talent Network', desc: 'Seamless international job matching with visa and relocation support', icon: '🌍', timeline: '2026', feature: 'Borderless hiring' },
                { title: 'Skill Verification', desc: 'Blockchain-verified credentials and automated skill assessment', icon: '🔐', timeline: '2025', feature: 'Trusted credentials' }
            ]
        }
    };

    const defaultTechStack = {
        title: "Our Tech Stack",
        subtitle: "Purpose-built for performance and security",
        items: [
            { name: 'Live Tracking System', desc: 'Proprietary pipeline that keeps you updated on every single movement of your application', progress: 100, color: 'blue', tech: ['WebSockets', 'Redis', 'Node.js'] },
            { name: 'Real-time Engine', desc: 'WebSocket-driven notification architecture with zero latency', progress: 100, color: 'green', tech: ['Socket.io', 'Kafka', 'Elasticsearch'] },
            { name: 'Data Security', desc: 'Military-grade encryption with GDPR & CCPA compliance', progress: 100, color: 'blue', tech: ['AES-256', 'OAuth 2.0', 'GDPR Compliant'] },
            { name: 'Support Framework', desc: 'Managed assistance for resume optimization and interview preparation', progress: 98, color: 'green', tech: ['React', 'WebRTC', 'AI Matching'] }
        ]
    };

    const defaultPlatformArchitecture = {
        title: "Platform Architecture",
        subtitle: "Designed for scale, security, and seamless user experience",
        items: [
            { icon: '⚡', title: 'Microservices', desc: 'Scalable, independent services' },
            { icon: '🔒', title: 'End-to-End Encryption', desc: 'Military-grade security' },
            { icon: '🌐', title: 'Global CDN', desc: 'Low latency worldwide' },
            { icon: '📊', title: 'Real-time Analytics', desc: 'Live data processing' }
        ],
        uptime: "99.9% Uptime Guarantee",
        features: [
            { title: "Load Balancing", desc: "Auto-scaling" },
            { title: "API Rate Limiting", desc: "DDoS protection" }
        ]
    };

    const defaultCoreValues = [
        {
            icon: 'FaBullseye',
            title: 'Radical Transparency',
            description: 'No black boxes. Every application status, decision, and communication is visible and trackable with real-time updates.',
            features: ['Live application tracking', 'Direct employer feedback', 'Complete process visibility'],
            color: 'blue'
        },
        {
            icon: 'FaRocket',
            title: 'Speed & Efficiency',
            description: 'We eliminate waiting times with real-time updates and direct employer connections, reducing average response time to 4.5 hours.',
            features: ['Real-time notifications', 'Instant application updates', 'Quick match technology'],
            color: 'green'
        },
        {
            icon: 'FaHandshake',
            title: 'Dedicated Support',
            description: 'From resume optimization to final interviews, our expert team provides personalized guidance every step of the way.',
            features: ['Personal career advisor', 'Interview preparation', 'Negotiation support'],
            color: 'blue'
        },
        {
            icon: 'FaUsers',
            title: 'Community First',
            description: 'Building a network where job seekers, recruiters, and companies collaborate for better hiring outcomes.',
            features: ['Peer networking', 'Mentorship programs', 'Industry connections'],
            color: 'green'
        }
    ];

    const defaultTimelineMilestones = [
        {
            year: '2023',
            event: 'Concept Born',
            description: 'Founded by engineers frustrated with job search ghosting, we envisioned a transparent hiring platform.',
            icon: 'FaLightbulb',
            achievements: ['Research phase', 'Prototype development', 'Initial user testing']
        },
        {
            year: '2024',
            event: 'Alpha Launch',
            description: 'First 100 users experienced revolutionary application tracking with real-time updates.',
            icon: 'FaRocket',
            achievements: ['100 early adopters', 'First successful hires', 'Platform validation']
        },
        {
            year: '2024',
            event: 'Support Network',
            description: 'Established dedicated network of recruiters and support staff for candidates.',
            icon: 'FaHandshake',
            achievements: ['50+ partner companies', 'Support team expansion', 'Enhanced matching algorithms']
        },
        {
            year: '2025',
            event: 'Tamil Nadu Expansion',
            description: 'Expanded to serve professionals across all major districts of Tamil Nadu with localized support.',
            icon: 'FaGlobe',
            achievements: ['District-wide reach', 'Local language support', 'State-wide partnerships']
        },
        {
            year: '2025',
            event: 'TN Enterprise Adoption',
            description: 'Partnered with top Tamil Nadu based industries to transform their hiring processes.',
            icon: 'FaChartLine',
            achievements: ['TN Enterprise solutions', 'Regional talent analytics', 'Direct industry links']
        }
    ];

    const defaultTeamMembers = [
        {
            name: 'Alex Morgan',
            role: 'CEO & Founder',
            bio: 'Former tech recruiter with 10+ years in HR technology. Passionate about transparent hiring.',
            image: '👨‍💼',
            expertise: ['HR Tech', 'Recruitment', 'Product Strategy']
        },
        {
            name: 'Sarah Chen',
            role: 'CTO',
            bio: 'Ex-Google engineer specializing in real-time systems and scalable architectures.',
            image: '👩‍💻',
            expertise: ['Real-time Systems', 'AI/ML', 'Cloud Architecture']
        },
        {
            name: 'Marcus Johnson',
            role: 'Head of Support',
            bio: 'Career coach with 8 years experience helping professionals land dream jobs.',
            image: '👨‍🏫',
            expertise: ['Career Coaching', 'Interview Prep', 'Candidate Experience']
        },
        {
            name: 'Priya Sharma',
            role: 'Product Lead',
            bio: 'UX specialist focused on creating intuitive, user-centered hiring experiences.',
            image: '👩‍🎨',
            expertise: ['UX Design', 'User Research', 'Product Development']
        }
    ];

    const defaultFeatures = [
        {
            title: 'Smart Matching',
            description: 'AI-powered matching algorithm that connects you with roles matching your skills and aspirations',
            icon: 'FaSearch',
            stats: '92% match accuracy'
        },
        {
            title: 'Fairness First',
            description: 'Blind screening and bias detection to ensure equal opportunity for all candidates',
            icon: 'FaBalanceScale',
            stats: '45% more diverse hires'
        },
        {
            title: 'Health & Wellness',
            description: 'Mental health resources and stress management tools for job seekers',
            icon: 'FaHeart',
            stats: '60% less job search stress'
        }
    ];

    const iconMap = {
        FaBullseye: <FaBullseye />,
        FaChartLine: <FaChartLine />,
        FaUsers: <FaUsers />,
        FaGlobe: <FaGlobe />,
        FaShieldAlt: <FaShieldAlt />,
        FaLightbulb: <FaLightbulb />,
        FaRocket: <FaRocket />,
        FaHandshake: <FaHandshake />,
        FaClock: <FaClock />,
        FaCheckCircle: <FaCheckCircle />,
        FaSearch: <FaSearch />,
        FaBalanceScale: <FaBalanceScale />,
        FaHeart: <FaHeart />
    };

    const [activeTab, setActiveTab] = useState('problem');
    const [animatedNumbers, setAnimatedNumbers] = useState({
        transparency: 0,
        response: 0,
        satisfaction: 0,
        hiring: 0,
        users: 0,
        partners: 0
    });
    const [isMobile, setIsMobile] = useState(false);
    const statsRef = useRef(null);
    const missionRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null);

    // Color Palette
    const colors = {
        primary: '#0066CC', // Deep Blue
        secondary: '#00A86B', // Emerald Green
        accent: '#FFD700', // Gold
        dark: '#0F172A',
        light: '#F8FAFC',
        gradientStart: '#0066CC',
        gradientEnd: '#00A86B'
    };

    // Check for mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target === statsRef.current) {
                        startNumberAnimation();
                    }
                    if (entry.target === missionRef.current) {
                        startMissionAnimation();
                    }
                    if (entry.target === teamRef.current) {
                        startTeamAnimation();
                    }
                }
            });
        }, { threshold: 0.1, rootMargin: '-50px' });

        document.querySelectorAll('.reveal-up, .fade-up-blur, .bounce-in, .slide-in-left, .slide-in-right, .float-animation, .pulse-glow').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const startNumberAnimation = () => {
        const targets = {
            transparency: 100,
            response: 99,
            satisfaction: 95,
            hiring: 2.3,
            users: 5000,
            partners: 320
        };
        Object.keys(targets).forEach(key => {
            animateNumber(key, targets[key], 2000);
        });
    };

    const startMissionAnimation = () => {
        const missionElements = document.querySelectorAll('.mission-element');
        missionElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('active');
            }, i * 300);
        });
    };

    const startTeamAnimation = () => {
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach((card, i) => {
            setTimeout(() => {
                card.classList.add('active');
            }, i * 200);
        });
    };

    const animateNumber = (key, target, duration) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setAnimatedNumbers(prev => ({
                    ...prev,
                    [key]: key === 'hiring' ? target.toFixed(1) : Math.round(target)
                }));
                clearInterval(timer);
            } else {
                setAnimatedNumbers(prev => ({
                    ...prev,
                    [key]: key === 'hiring' ? start.toFixed(1) : Math.round(start)
                }));
            }
        }, 16);
    };

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await api.get('/hire/static/about');
                if (data && data.content) {
                    setPageContent(prev => ({
                        ...prev,
                        ...data.content,
                        hero: data.content.hero || defaultHero,
                        statsPreview: data.content.statsPreview || defaultStatsPreview,
                        tabsContent: data.content.tabsContent || defaultTabsContent,
                        techStack: data.content.techStack || defaultTechStack,
                        platformArchitecture: data.content.platformArchitecture || defaultPlatformArchitecture,
                        coreValues: data.content.coreValues || defaultCoreValues,
                        timelineMilestones: data.content.timelineMilestones || defaultTimelineMilestones,
                        teamMembers: data.content.teamMembers || defaultTeamMembers,
                        features: data.content.features || defaultFeatures
                    }));
                } else {
                    setPageContent(prev => ({
                        ...prev,
                        hero: defaultHero,
                        statsPreview: defaultStatsPreview,
                        tabsContent: defaultTabsContent,
                        techStack: defaultTechStack,
                        platformArchitecture: defaultPlatformArchitecture,
                        coreValues: defaultCoreValues,
                        timelineMilestones: defaultTimelineMilestones,
                        teamMembers: defaultTeamMembers,
                        features: defaultFeatures
                    }));
                }
            } catch (err) {
                console.error('Failed to fetch about content:', err);
                setPageContent(prev => ({
                    ...prev,
                    hero: defaultHero,
                    statsPreview: defaultStatsPreview,
                    tabsContent: defaultTabsContent,
                    techStack: defaultTechStack,
                    platformArchitecture: defaultPlatformArchitecture,
                    coreValues: defaultCoreValues,
                    timelineMilestones: defaultTimelineMilestones,
                    teamMembers: defaultTeamMembers,
                    features: defaultFeatures
                }));
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/20 via-white to-green-50/20 overflow-hidden">
            {/* Enhanced Hero Section */}
            <section className="relative pt-7 pb-16 md:pb-24 overflow-hidden about-hero">
                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 animate-gradient-x"></div>
                <div className="absolute top-20 md:top-40 -right-10 md:-right-20 w-48 md:w-96 h-48 md:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute -bottom-10 md:-bottom-20 -left-10 md:-left-20 w-40 md:w-80 h-40 md:h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
                <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-blue-400/30 animate-float"></div>
                <div className="absolute bottom-1/4 right-1/3 w-6 h-6 rounded-full bg-green-400/20 animate-float animation-delay-500"></div>

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 relative z-10">
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
                            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-blue-100 to-green-100 text-primary px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider mb-6 md:mb-10 border border-blue-200/50"
                            style={{ color: colors.primary }}
                        >
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Our Vision & Mission
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 md:mb-8 tracking-tighter gradient-text px-4">
                            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
                                {pageContent.hero.title.split(' ').slice(0, 3).join(' ')}
                            </span>
                            <br />
                            <span className="text-dark text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                                {pageContent.hero.title.split(' ').slice(3).join(' ')}
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4"
                        >
                            <span className="block mb-4 text-secondary font-bold text-sm tracking-widest uppercase italic">Proudly Based in Tamil Nadu, India 🇮🇳</span>
                            {pageContent.hero.subtitle}
                        </motion.p>

                        {/* Animated Stats Preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto"
                        >
                            {(pageContent.statsPreview && pageContent.statsPreview.length > 0 ? pageContent.statsPreview : defaultStatsPreview).map((stat, index) => (
                                <div key={index} className="bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-2xl border border-gray-200 shadow-sm">
                                    <div className="text-xl md:text-2xl mb-1">{stat.icon}</div>
                                    <div className="text-lg md:text-xl font-bold text-gray-800">{stat.value}</div>
                                    <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Tabs Section */}
            <section className="py-12 md:py-20 bg-white relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <div className="inline-block mb-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto"></div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Transforming Career Journeys
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            From problem identification to innovative solution - see how we're changing the game.
                        </p>
                    </motion.div>

                    {/* Interactive Tabs */}
                    <div className="mb-8 md:mb-16">
                        <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center mb-8 md:mb-12 overflow-x-auto pb-2">
                            {[
                                { id: 'problem', label: 'The Problem', gradient: 'from-orange-500 to-red-600', shadow: 'shadow-red-200', icon: '🎯' },
                                { id: 'solution', label: 'Our Solution', gradient: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-200', icon: '✨' },
                                { id: 'impact', label: 'The Impact', gradient: 'from-green-500 to-green-600', shadow: 'shadow-green-200', icon: '🚀' },
                                { id: 'future', label: 'Future Vision', gradient: 'from-purple-500 to-purple-600', shadow: 'shadow-purple-200', icon: '🔮' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`group flex items-center justify-center gap-3 px-6 md:px-10 py-3.5 md:py-4.5 rounded-2xl font-bold text-sm md:text-lg transition-all duration-500 whitespace-nowrap relative overflow-hidden ${activeTab === tab.id
                                        ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl ${tab.shadow} scale-105 -translate-y-1`
                                        : 'bg-white text-gray-500 border border-gray-100 hover:border-blue-100 hover:text-primary hover:shadow-xl hover:-translate-y-0.5'
                                        }`}
                                >
                                    <span className={`text-xl transition-transform duration-300 ${activeTab === tab.id ? 'scale-125' : 'group-hover:scale-110'}`}>{tab.icon}</span>
                                    <span className="relative z-10">{tab.label}</span>
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTabGlow"
                                            className="absolute inset-0 bg-white/20 blur-xl scale-150 pointer-events-none"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="min-h-[400px]"
                            >
                                {activeTab === 'problem' && pageContent.tabsContent.problem && (
                                    <div className="p-6 md:p-12 rounded-3xl bg-gradient-to-br from-red-50 to-white border-2 border-red-100 shadow-xl">
                                        <h3 className="text-2xl md:text-3xl font-bold text-red-700 mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
                                            <span className="text-3xl md:text-4xl">🎯</span>
                                            {pageContent.tabsContent.problem.title}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                            {pageContent.tabsContent.problem.items.map((item, index) => (
                                                <motion.div
                                                    key={item.title}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="p-4 md:p-6 bg-white rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                                                >
                                                    <div className="text-3xl md:text-4xl mb-3 md:mb-4">{item.icon}</div>
                                                    <h4 className="text-lg md:text-xl font-bold text-red-700 mb-2 md:mb-3">{item.title}</h4>
                                                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{item.desc}</p>
                                                    <div className="text-xs md:text-sm font-bold text-red-500 mb-1">{item.stats}</div>
                                                    <div className="text-xs text-red-400">{item.impact}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'solution' && pageContent.tabsContent.solution && (
                                    <div className="p-6 md:p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 shadow-xl">
                                        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 flex items-center gap-3 md:gap-4" style={{ color: colors.primary }}>
                                            <span className="text-3xl md:text-4xl">✨</span>
                                            {pageContent.tabsContent.solution.title}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                            {pageContent.tabsContent.solution.items.map((item, index) => (
                                                <motion.div
                                                    key={item.title}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="p-4 md:p-6 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                                                >
                                                    <div className="text-3xl md:text-4xl mb-3 md:mb-4">{item.icon}</div>
                                                    <h4 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3" style={{ color: colors.primary }}>{item.title}</h4>
                                                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{item.desc}</p>
                                                    <div className="text-xs md:text-sm font-bold text-primary mb-1" style={{ color: colors.primary }}>{item.benefit}</div>
                                                    <div className="text-xs text-blue-400">{item.feature}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'impact' && pageContent.tabsContent.impact && (
                                    <div className="p-6 md:p-12 rounded-3xl bg-gradient-to-br from-green-50 to-white border-2 border-green-100 shadow-xl">
                                        <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-6 md:mb-8 flex items-center gap-3 md:gap-4" style={{ color: colors.secondary }}>
                                            <span className="text-3xl md:text-4xl">🚀</span>
                                            {pageContent.tabsContent.impact.title}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                            {pageContent.tabsContent.impact.items.map((item, index) => (
                                                <motion.div
                                                    key={item.title}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="p-4 md:p-6 bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                                                >
                                                    <div className="text-3xl md:text-4xl mb-3 md:mb-4">{item.icon}</div>
                                                    <h4 className="text-lg md:text-xl font-bold text-secondary mb-2 md:mb-3" style={{ color: colors.secondary }}>{item.title}</h4>
                                                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{item.desc}</p>
                                                    <div className="text-xs md:text-sm font-bold text-secondary mb-1" style={{ color: colors.secondary }}>{item.improvement}</div>
                                                    <div className="text-xs text-green-400">{item.detail}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'future' && pageContent.tabsContent.future && (
                                    <div className="p-6 md:p-12 rounded-3xl bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 shadow-xl">
                                        <h3 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
                                            <span className="text-3xl md:text-4xl">🔮</span>
                                            {pageContent.tabsContent.future.title}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                            {pageContent.tabsContent.future.items.map((item, index) => (
                                                <motion.div
                                                    key={item.title}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="p-4 md:p-6 bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                                                >
                                                    <div className="text-3xl md:text-4xl mb-3 md:mb-4">{item.icon}</div>
                                                    <h4 className="text-lg md:text-xl font-bold text-purple-700 mb-2 md:mb-3">{item.title}</h4>
                                                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{item.desc}</p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs md:text-sm font-bold text-purple-500">{item.timeline}</span>
                                                        <span className="text-xs text-purple-400">{item.feature}</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Enhanced Technology Stack */}
            <section className="py-12 md:py-20 bg-gray-50/50">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <div className="inline-block mb-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto"></div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Technology DNA
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Built on cutting-edge technology designed specifically for transparent hiring.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                        {/* Tech Stack Visualization */}
                        <div className="relative">
                            <div className="p-6 md:p-12 rounded-3xl bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6 md:mb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl md:text-2xl">
                                        ⚙️
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Our Tech Stack</h3>
                                        <p className="text-sm md:text-base text-gray-600">Purpose-built for performance and security</p>
                                    </div>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    {pageContent.techStack.items && pageContent.techStack.items.map((tech, index) => (
                                        <motion.div
                                            key={tech.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="space-y-2"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-gray-800 text-sm md:text-base">{tech.name}</span>
                                                <span className={`font-bold text-sm md:text-base ${tech.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                                                    }`}>
                                                    {tech.progress}%
                                                </span>
                                            </div>
                                            <p className="text-xs md:text-sm text-gray-600 mb-1">{tech.desc}</p>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {tech.tech.map((t, i) => (
                                                    <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${tech.progress}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: index * 0.2 }}
                                                    className={`h-full rounded-full ${tech.color === 'blue'
                                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                                                        : 'bg-gradient-to-r from-green-500 to-green-600'
                                                        }`}
                                                ></motion.div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Platform Architecture */}
                        <div className="relative">
                            <div className="p-6 md:p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-green-500/10 border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6 md:mb-8">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xl md:text-2xl">
                                        🏗️
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Platform Architecture</h3>
                                        <p className="text-sm md:text-base text-gray-600">Designed for scale, security, and seamless user experience</p>
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6">
                                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                                        {pageContent.platformArchitecture.items && pageContent.platformArchitecture.items.map((item, index) => (
                                            <div key={index} className="p-4 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="text-xl md:text-2xl mb-2">{item.icon}</div>
                                                <div className="font-bold text-gray-800 text-sm md:text-base">{item.title}</div>
                                                <div className="text-xs md:text-sm text-gray-600">{item.desc}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 md:p-6 bg-white/80 rounded-2xl border border-white/50 backdrop-blur-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="font-bold text-gray-800 text-sm md:text-base">{pageContent.platformArchitecture.uptime}</span>
                                        </div>
                                        <p className="text-xs md:text-sm text-gray-600">
                                            Enterprise-grade reliability with automatic failover and disaster recovery.
                                        </p>
                                    </div>

                                    {/* Additional Features */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {pageContent.platformArchitecture.features && pageContent.platformArchitecture.features.map((feature, index) => (
                                            <div key={index} className="p-3 bg-white/60 rounded-xl border border-gray-100">
                                                <div className="text-xs font-bold text-gray-700">{feature.title}</div>
                                                <div className="text-xs text-gray-500">{feature.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Core Values */}
            <section ref={valuesRef} className="py-12 md:py-20 bg-gray-50/50">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <div className="inline-block mb-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto"></div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Our Core Values
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            The principles that guide every decision we make and every feature we build.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                        {pageContent.coreValues.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative h-full"
                            >
                                <div className={`h-full p-8 md:p-10 rounded-[2.5rem] bg-white border-2 ${value.color === 'blue' ? 'border-blue-100 hover:border-blue-400' : 'border-green-100 hover:border-green-400'} shadow-2xl hover:shadow-${value.color === 'blue' ? 'blue' : 'green'}-100 transition-all duration-500 overflow-hidden relative`}>
                                    <div className={`absolute top-0 right-0 w-32 h-32 ${value.color === 'blue' ? 'bg-blue-500/5' : 'bg-green-500/5'} rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700`}></div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className={`w-16 h-16 md:w-20 md:h-20 mb-8 rounded-3xl bg-gradient-to-br ${value.color === 'blue' ? 'from-blue-500 to-blue-600' : 'from-green-500 to-green-600'} flex items-center justify-center text-white text-3xl md:text-4xl shadow-xl group-hover:rotate-6 transition-transform`}>
                                            {iconMap[value.icon] || <FaBullseye />}
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800">{value.title}</h3>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">{value.description}</p>
                                        <ul className="space-y-1">
                                            {value.features.map((feature, i) => (
                                                <li key={i} className="flex items-center text-xs md:text-sm text-gray-500">
                                                    <FaCheckCircle className={`w-3 h-3 md:w-4 md:h-4 mr-2 ${value.color === 'blue' ? 'text-blue-500' : 'text-green-500'}`} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Features Section */}
            <section className="py-12 md:py-20 bg-gray-50/50">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <div className="inline-block mb-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto"></div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Beyond Hiring
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Additional features that make Jeenora Hire truly exceptional.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                        {pageContent.features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-green-500/10 flex items-center justify-center text-2xl md:text-3xl text-primary mb-4" style={{ color: colors.primary }}>
                                    {iconMap[feature.icon] || <FaCheckCircle />}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                                <p className="text-sm md:text-base text-gray-600 mb-4">{feature.description}</p>
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-green-100 text-primary text-sm font-bold" style={{ color: colors.primary }}>
                                    {feature.stats}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Timeline & Milestones */}
            <section className="py-12 md:py-20">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <div className="inline-block mb-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto"></div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Our Journey
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            From concept to global platform - our mission to transform hiring continues.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline Line - Mobile vs Desktop */}
                        {isMobile ? (
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-blue-500"></div>
                        ) : (
                            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-blue-500 transform -translate-x-1/2"></div>
                        )}

                        <div className="space-y-8 md:space-y-12 lg:space-y-24">
                            {pageContent.timelineMilestones.map((milestone, index) => (
                                <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 mb-20 md:mb-32 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                                    {/* Timeline Marker */}
                                    <div className="absolute left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white border-4 border-blue-500 rounded-full z-20 shadow-xl">
                                        <div className="w-full h-full bg-blue-500 rounded-full scale-50 animate-pulse"></div>
                                    </div>

                                    {/* Content Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className="w-full md:w-1/2"
                                    >
                                        <div className="p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-2xl hover:shadow-blue-50 transition-all duration-500 group relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-green-500"></div>
                                            <div className="flex items-center gap-6 mb-8">
                                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-3xl md:text-4xl group-hover:scale-110 transition-transform">
                                                    {iconMap[milestone.icon] || <FaRocket />}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{milestone.event}</h3>
                                                    <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">{milestone.year}</span>
                                                </div>
                                            </div>
                                            <p className="text-base md:text-lg text-gray-600 mb-6">{milestone.description}</p>
                                            <ul className="space-y-2">
                                                {milestone.achievements.map((achievement, i) => (
                                                    <li key={i} className="flex items-center text-sm md:text-base text-gray-700">
                                                        <FaCheckCircle className="w-5 h-5 mr-3 text-green-500" />
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>

                                    {/* Empty Space for Desktop */}
                                    {!isMobile && <div className="hidden lg:block w-1/2"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section ref={teamRef} className="py-12 md:py-20 bg-gray-50/50">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <div className="inline-block mb-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto"></div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Meet Our Team
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Passionate professionals dedicated to transforming your job search experience.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {pageContent.teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="team-card relative group"
                            >
                                <div className="relative p-6 rounded-3xl bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                    {/* Background Pattern */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform duration-500"></div>

                                    <div className="relative z-10">
                                        <div className="text-5xl mb-4">{member.image}</div>
                                        <h3 className="text-xl font-bold mb-1 text-gray-800">{member.name}</h3>
                                        <div className="text-primary font-medium mb-3" style={{ color: colors.primary }}>{member.role}</div>
                                        <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {member.expertise.map((skill, i) => (
                                                <span key={i} className="px-2 py-1 bg-blue-50 text-primary rounded-full text-xs" style={{ color: colors.primary }}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Trust Metrics */}
            <section ref={statsRef} className="py-12 md:py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden relative">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <div className="inline-block mb-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-white/50 to-white rounded-full mx-auto"></div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">Trust & Impact Metrics</h2>
                        <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-3xl mx-auto px-4">
                            Numbers that demonstrate our commitment to transforming the hiring experience.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-8 mb-8 md:mb-16">
                        {[
                            { value: animatedNumbers.transparency, label: 'Application Transparency', unit: '%', icon: '🔓', delay: 0 },
                            { value: animatedNumbers.response, label: 'Platform Response Rate', unit: '%', icon: '⚡', delay: 200 },
                            { value: animatedNumbers.satisfaction, label: 'User Satisfaction', unit: '%', icon: '⭐', delay: 400 },
                            { value: animatedNumbers.hiring, label: 'Avg. Time to Hire', unit: 'days', icon: '🚀', delay: 600 },
                            { value: animatedNumbers.users, label: 'Active Users', unit: '+', icon: '👥', delay: 800 },
                            { value: animatedNumbers.partners, label: 'Partner Companies', unit: '+', icon: '🤝', delay: 1000 }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="relative p-4 md:p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                                    <div className="text-2xl md:text-4xl mb-3 md:mb-4">{stat.icon}</div>
                                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-4">
                                        {stat.value}
                                        <span className="text-lg md:text-2xl opacity-80">{stat.unit}</span>
                                    </div>
                                    <div className="text-xs sm:text-sm md:text-base font-medium opacity-90">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Metrics */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                    >
                        {[
                            { label: 'Countries Served', value: '50+', icon: '🌍' },
                            { label: 'Success Stories', value: '1,200+', icon: '🏆' },
                            { label: 'Support Tickets', value: '98%', icon: '🎯' },
                            { label: 'Platform Uptime', value: '99.9%', icon: '⚡' }
                        ].map((metric, index) => (
                            <div key={metric.label} className="p-4 rounded-2xl bg-white/5">
                                <div className="text-2xl mb-2">{metric.icon}</div>
                                <div className="text-xl md:text-2xl font-bold mb-1">{metric.value}</div>
                                <div className="text-sm opacity-80">{metric.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Enhanced Call to Action */}
            <section className="py-12 md:py-20 relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-16 rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 text-center text-white shadow-2xl relative overflow-hidden"
                    >
                        {/* Animated Background Elements */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/30 via-white to-white/30 animate-gradient-x"></div>
                        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/5 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/5 blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">Join the Movement</h2>
                            <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-8 md:mb-12">
                                Be part of the revolution that's bringing transparency, efficiency, and fairness to hiring.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.location.href = '/hire/register'}
                                    className="w-full sm:w-auto px-8 md:px-12 py-3 md:py-5 bg-white text-primary rounded-2xl font-bold text-base md:text-lg cursor-pointer transition-all duration-300 hover:shadow-2xl"
                                    style={{ color: colors.primary }}
                                >
                                    Start Your Journey
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.location.href = '/how-it-works'}
                                    className="w-full sm:w-auto px-6 md:px-10 py-3 md:py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-base md:text-lg cursor-pointer transition-all duration-300 hover:bg-white/10"
                                >
                                    See How It Works
                                </motion.button>
                            </div>

                            <div className="mt-8 md:mt-12 text-sm opacity-80 flex flex-col sm:flex-row items-center justify-center gap-2">
                                <span className="inline-flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                    No credit card required
                                </span>
                                <span className="hidden sm:block">•</span>
                                <span>10 free credits on signup</span>
                                <span className="hidden sm:block">•</span>
                                <span>24/7 support available</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Enhanced CSS Animations */}
            <style>{`
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                .animation-delay-500 {
                    animation-delay: 500ms;
                }

                .animation-delay-1000 {
                    animation-delay: 1000ms;
                }

                .gradient-text {
                    background-clip: text;
                    -webkit-background-clip: text;
                }

                .about-hero {
                    background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 50%, #eff6ff 100%);
                }

                /* Responsive animations */
                @media (max-width: 640px) {
                    .reveal-up {
                        animation: slide-up 0.6s ease forwards;
                        opacity: 0;
                    }
                    
                    .reveal-up.active {
                        opacity: 1;
                    }
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

                .mission-element {
                    opacity: 0;
                    transform: translateY(20px);
                }

                .mission-element.active {
                    animation: missionReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .team-card {
                    opacity: 0;
                    transform: translateY(30px);
                }

                .team-card.active {
                    animation: teamReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                @keyframes missionReveal {
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes teamReveal {
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Smooth scrolling */
                html {
                    scroll-behavior: smooth;
                }

                /* Better focus styles for accessibility */
                button:focus, a:focus {
                    outline: none;
                }
                
                button:focus-visible, a:focus-visible {
                    outline: 2px solid ${colors.primary};
                    outline-offset: 2px;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 10px;
                }

                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, ${colors.primary}, ${colors.secondary});
                    border-radius: 5px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, ${colors.secondary}, ${colors.primary});
                }
            `}</style>
        </div>
    );
};

export default About;
