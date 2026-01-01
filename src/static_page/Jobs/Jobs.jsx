import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import api from '../../api/api';

const JobsPreview = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All');
    const [showSimulator, setShowSimulator] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [pageContent, setPageContent] = useState({
        jobListings: [],
        successMetrics: [],
        intelligenceFeatures: [],
        matchingSystem: {},
        simulator: {},
        successStories: []
    });
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        listings: 0,
        responseRate: 0,
        avgResponse: 0,
        verified: 0
    });
    const statsRef = useRef(null);
    const matchingRef = useRef(null);
    const jobsRef = useRef(null);

    // Color Palette
    const colors = {
        primary: '#0066CC', // Deep Blue
        secondary: '#00A86B', // Emerald Green
        accent: '#FFD700', // Gold
        dark: '#0F172A',
        light: '#F8FAFC',
        gradient: 'linear-gradient(135deg, #0066CC 0%, #00A86B 100%)'
    };

    // Default Data
    const defaultJobListings = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            company: "Freshworks",
            location: "Chennai, TN",
            salary: "₹12,00,000 - ₹18,00,000",
            type: "Full-time",
            experience: "5+ years",
            posted: "2 days ago",
            match: 92,
            skills: ["React", "TypeScript", "Next.js", "Tailwind"],
            status: "featured",
            category: "Tech",
            description: "Lead frontend development for enterprise SaaS platform in Chennai",
            benefits: ["Health insurance", "Free meals", "Performance bonus"],
            responseTime: "1.8 days",
            credits: 2
        },
        {
            id: 2,
            title: "Embedded Systems Engineer",
            company: "TVS Motor Company",
            location: "Hosur / Chennai, TN",
            salary: "₹10,00,000 - ₹15,00,000",
            type: "Full-time",
            experience: "4+ years",
            posted: "1 day ago",
            match: 88,
            skills: ["C/C++", "RTOS", "Microcontrollers", "IoT"],
            status: "featured",
            category: "Tech",
            description: "Design and develop embedded software for next-gen electric vehicles",
            benefits: ["Automobile discounts", "Learning budget", "Flexible hours"],
            responseTime: "2.1 days",
            credits: 2
        },
        {
            id: 3,
            title: "Software Engineer (Product)",
            company: "Zoho Corporation",
            location: "Tenkasi / Chennai, TN",
            salary: "₹8,00,000 - ₹14,00,000",
            type: "Full-time",
            experience: "3+ years",
            posted: "3 days ago",
            match: 85,
            skills: ["Java", "JavaScript", "SQL", "Product Dev"],
            status: "featured",
            category: "Tech",
            description: "Build scalable product modules for global business suite",
            benefits: ["Rural work culture", "Housing support", "Organic food"],
            responseTime: "2.4 days",
            credits: 1
        },
        {
            id: 4,
            title: "Digital Marketing Lead",
            company: "Titan Company",
            location: "Hosur / Chennai Base",
            salary: "₹9,00,000 - ₹13,00,000",
            type: "Full-time",
            experience: "4+ years",
            posted: "1 week ago",
            match: 82,
            skills: ["Digital Marketing", "SEO", "Analytics", "Brand Management"],
            status: "new",
            category: "Marketing",
            description: "Lead marketing strategy for lifestyle and retail brands",
            benefits: ["Employee discounts", "Performance bonus", "Career growth"],
            responseTime: "2.8 days",
            credits: 1
        },
        {
            id: 5,
            title: "Data Analyst",
            company: "HCL Tech Chennai",
            location: "Chennai, TN",
            salary: "₹7,00,000 - ₹11,00,000",
            type: "Full-time",
            experience: "2+ years",
            posted: "4 days ago",
            match: 90,
            skills: ["PowerBI", "Python", "SQL", "Excel"],
            status: "new",
            category: "Tech",
            description: "Analyze large datasets to drive business decisions for global clients",
            benefits: ["Insurance", "Relocation assistance", "Gym membership"],
            responseTime: "1.9 days",
            credits: 2
        },
        {
            id: 6,
            title: "Structural Engineer",
            company: "L&T Construction (HQ Chennai)",
            location: "Chennai, TN",
            salary: "₹9,00,000 - ₹13,00,000",
            type: "Full-time",
            experience: "3+ years",
            posted: "2 days ago",
            match: 86,
            skills: ["STAAD Pro", "AutoCAD", "Structural Design"],
            status: "featured",
            category: "Design",
            description: "Design structural frameworks for mega infrastructure projects",
            benefits: ["Project allowances", "Health care", "Technical training"],
            responseTime: "2.2 days",
            credits: 1
        }
    ];

    const defaultSuccessMetrics = [
        { metric: 'Jobs Posted', value: '156+', change: '+12%', trend: 'up' },
        { metric: 'Response Rate', value: '99%', change: '+21%', trend: 'up' },
        { metric: 'Avg Response Time', value: '2.3 days', change: '-40%', trend: 'down' },
        { metric: 'Verified Employers', value: '92%', change: '+8%', trend: 'up' },
        { metric: 'Interview Rate', value: '65%', change: '+25%', trend: 'up' },
        { metric: 'Offer Acceptance', value: '85%', change: '+15%', trend: 'up' }
    ];

    const defaultIntelligenceFeatures = [
        {
            icon: '🎯',
            title: 'Expert Support Scoring',
            description: 'Our team calculates your fit for each role based on manual professional verification and deep profile analysis.',
            stats: { label: 'Match Accuracy', value: '95%', color: 'blue' }
        },
        {
            icon: '⚡',
            title: 'Response Time Analytics',
            description: 'See historical response times and success rates for each company and role.',
            stats: { label: 'Avg. Response', value: '2.3 days', color: 'green' }
        },
        {
            icon: '💬',
            title: 'Direct Admin Access',
            description: 'Communicate directly with hiring teams through our integrated messaging system.',
            stats: { label: 'Message Response', value: '4.5 hours', color: 'blue' }
        }
    ];

    const defaultMatchingSystem = {
        title: "Support Matching System",
        description: "See how our team calculates your fit for each opportunity in real-time.",
        overallScore: 89.5,
        skills: [
            { label: 'Technical Skills', value: 92, icon: '💻' },
            { label: 'Experience Match', value: 88, icon: '📊' },
            { label: 'Cultural Fit', value: 95, icon: '🤝' },
            { label: 'Salary Alignment', value: 82, icon: '💰' }
        ]
    };

    const defaultSimulator = {
        title: "Personalized Application Process",
        description: "Experience how our platform transforms your application journey.",
        step1: "Profile Analysis",
        step2: "Job Matching",
        manualEnhancement: {
            title: "Manual Profile Enhancement",
            description: "Our team analyzes your profile and suggests improvements to increase your visibility and match score manually.",
            features: ["Keyword optimization", "Skill gap identification", "Experience structuring", "Achievement highlighting"]
        },
        intelligentMatching: {
            title: "Intelligent Job Matching",
            description: "Our system matches you with opportunities that align with your skills, experience, and career goals.",
            features: ["Real-time match scoring", "Success probability", "Company culture fit", "Growth opportunity"]
        }
    };

    const defaultSuccessStories = [
        { name: "Alex Johnson", role: "Senior Frontend Dev", company: "TechCorp", time: "2 weeks", quote: "The expert matching system found me roles I would have never found on my own", avatar: "AJ", match: 92 },
        { name: "Sarah Chen", role: "Product Manager", company: "StartupXYZ", time: "3 weeks", quote: "Direct communication with hiring teams eliminated the application black hole", avatar: "SC", match: 88 },
        { name: "Marcus Rodriguez", role: "DevOps Engineer", company: "CloudSystems", time: "1 month", quote: "Saved 40+ hours monthly with automated applications and tracking", avatar: "MR", match: 85 }
    ];

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get('/hire/static/jobs');
                if (response.data && response.data.content) {
                    setPageContent({
                        jobListings: response.data.content.jobListings || defaultJobListings,
                        successMetrics: response.data.content.successMetrics || defaultSuccessMetrics,
                        intelligenceFeatures: response.data.content.intelligenceFeatures || defaultIntelligenceFeatures,
                        matchingSystem: response.data.content.matchingSystem || defaultMatchingSystem,
                        simulator: response.data.content.simulator || defaultSimulator,
                        successStories: response.data.content.successStories || defaultSuccessStories
                    });
                } else {
                    setPageContent({
                        jobListings: defaultJobListings,
                        successMetrics: defaultSuccessMetrics,
                        intelligenceFeatures: defaultIntelligenceFeatures,
                        matchingSystem: defaultMatchingSystem,
                        simulator: defaultSimulator,
                        successStories: defaultSuccessStories
                    });
                }
            } catch (error) {
                console.error('Failed to fetch jobs page content:', error);
                setPageContent({
                    jobListings: defaultJobListings,
                    successMetrics: defaultSuccessMetrics,
                    intelligenceFeatures: defaultIntelligenceFeatures,
                    matchingSystem: defaultMatchingSystem,
                    simulator: defaultSimulator,
                    successStories: defaultSuccessStories
                });
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const jobListings = pageContent.jobListings.length > 0 ? pageContent.jobListings : defaultJobListings;
    const successMetrics = pageContent.successMetrics.length > 0 ? pageContent.successMetrics : defaultSuccessMetrics;

    // Filters with counts
    const filters = [
        { name: 'All', count: jobListings.length },
        { name: 'Tech', count: jobListings.filter(j => j.category === 'Tech').length },
        { name: 'Design', count: jobListings.filter(j => j.category === 'Design').length },
        { name: 'Marketing', count: jobListings.filter(j => j.category === 'Marketing').length },
        { name: 'Remote', count: jobListings.filter(j => j.location.includes('Remote')).length },
        { name: 'Featured', count: jobListings.filter(j => j.status === 'featured').length }
    ];


    useEffect(() => {
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target === statsRef.current) {
                        startStatsAnimation();
                    }
                    if (entry.target === matchingRef.current) {
                        startMatchingAnimation();
                    }
                    if (entry.target === jobsRef.current) {
                        startJobsAnimation();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });

        document.querySelectorAll('.reveal-up, .bounce-in, .fade-in, .slide-in-left, .slide-in-right, .float-animation').forEach(el => observer.observe(el));

        // Initialize stats animation
        const statValues = { listings: 156, responseRate: 99, avgResponse: 23, verified: 92 };
        Object.keys(statValues).forEach(key => {
            animateCounter(statValues[key], key);
        });

        // Hover effect for job cards
        const jobCards = document.querySelectorAll('.job-card');
        jobCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hovered');
            });
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hovered');
            });
        });

        return () => observer.disconnect();
    }, []);

    const startStatsAnimation = () => {
        const statElements = document.querySelectorAll('.stat-number');
        statElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            animateCounterElement(el, target, 2000);
        });
    };

    const startMatchingAnimation = () => {
        const progressBars = document.querySelectorAll('.match-progress');
        progressBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = `${value}%`;
            }, 500);
        });
    };

    const startJobsAnimation = () => {
        const jobCards = document.querySelectorAll('.job-card');
        jobCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 100);
        });
    };

    const animateCounter = (target, key) => {
        let current = 0;
        const increment = target / 60;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 30);
    };

    const animateCounterElement = (element, target, duration) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
        }, 16);
    };

    // Filter jobs based on active filter
    const filteredJobs = activeFilter === 'All'
        ? jobListings
        : jobListings.filter(job => {
            if (activeFilter === 'Remote') return job.location.includes('Remote');
            if (activeFilter === 'Featured') return job.status === 'featured';
            return job.category === activeFilter;
        });

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
            <section className="relative pt-7 pb-7 md:pb-7 overflow-hidden">
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
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-green-100 text-primary px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider mb-6 md:mb-10 border border-blue-200/50 reveal-up"
                            style={{ color: colors.primary }}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Premium Career Opportunities
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 md:mb-8 tracking-tight gradient-text">
                            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
                                Expert-Supported
                            </span>
                            <br />
                            <span className="text-dark">Job Matching</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 px-4 md:px-0"
                        >
                            Discover hand-curated roles enhanced with
                            <span className="font-bold text-primary" style={{ color: colors.primary }}> expert support insights</span> and
                            <span className="font-bold text-secondary" style={{ color: colors.secondary }}> live application tracking</span>.
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



            {/* Platform Intelligence Showcase - Responsive */}
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
                                Beyond Job Listings
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            We don't just show you jobs - we show you <span className="font-bold">winning opportunities</span> with data-driven insights.
                        </p>
                    </motion.div>

                    {/* Intelligence Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-12 md:mb-20">
                        {(pageContent.intelligenceFeatures && pageContent.intelligenceFeatures.length > 0 ? pageContent.intelligenceFeatures : defaultIntelligenceFeatures).map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-blue-500/5 rounded-full -translate-y-8 translate-x-8 md:-translate-y-16 md:translate-x-16 group-hover:scale-125 transition-transform duration-500"></div>

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 md:w-16 md:h-16 mb-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl md:text-3xl shadow-lg">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold mb-4 text-dark">{feature.title}</h3>
                                        <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs md:text-sm text-gray-500">{feature.stats.label}</span>
                                                <span className={`font-bold ${feature.stats.color === 'blue' ? 'text-blue-600' : 'text-green-600'}`}>
                                                    {feature.stats.value}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: feature.stats.value.includes('%') ? feature.stats.value : '85%' }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.5 }}
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



            {/* Platform Matching Visualization - Responsive */}
            <section ref={matchingRef} className="py-10 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                {pageContent.matchingSystem.title || "Support Matching System"}
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            {pageContent.matchingSystem.description || "See how our team calculates your fit for each opportunity in real-time."}
                        </p>
                    </motion.div>

                    {/* Interactive Matching Demo */}
                    <div className="rounded-2xl md:rounded-3xl overflow-hidden border-2 border-gray-100 shadow-xl md:shadow-2xl">
                        <div className="flex flex-col lg:flex-row bg-gradient-to-br from-white to-blue-50/30">
                            {/* Input Panel */}
                            <div className="p-6 md:p-12 flex flex-col justify-center flex-1">
                                <h3 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">Your Profile Analysis</h3>

                                <div className="space-y-4 md:space-y-6">
                                    {(pageContent.matchingSystem.skills && pageContent.matchingSystem.skills.length > 0 ? pageContent.matchingSystem.skills : defaultMatchingSystem.skills).map((skill, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <span className="text-lg md:text-xl">{skill.icon}</span>
                                                    <span className="font-medium text-gray-700 text-sm md:text-base">{skill.label}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs md:text-sm text-gray-500">Score: </span>
                                                    <span className={`font-bold ${idx % 2 === 0 ? 'text-green-600' : 'text-blue-600'}`}>
                                                        {skill.value}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full match-progress bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000" data-value={skill.value}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Overall Match Score */}
                                <div className="mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl md:rounded-2xl border border-blue-100">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-lg md:text-xl">
                                            🎯
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800 text-sm md:text-base">Overall Match Score</div>
                                            <div className="text-2xl md:text-3xl font-black text-primary" style={{ color: colors.primary }}>{pageContent.matchingSystem.overallScore || 89.5}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visualization Panel */}
                            <div className="relative p-6 md:p-12 bg-gradient-to-br from-blue-500/10 to-green-500/10 flex items-center justify-center flex-1">
                                <div className="relative w-full max-w-md">
                                    {/* Radar Chart Visualization */}
                                    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
                                        <svg className="w-full h-full" viewBox="0 0 200 200">
                                            {/* Background Grid */}
                                            <polygon points="100,10 170,50 170,150 100,190 30,150 30,50" fill="rgba(0,102,204,0.05)" stroke="#e5e7eb" strokeWidth="1" />
                                            <polygon points="100,40 150,70 150,130 100,160 50,130 50,70" fill="rgba(0,168,107,0.05)" stroke="#e5e7eb" strokeWidth="1" />
                                            <polygon points="100,70 130,90 130,110 100,130 70,110 70,90" fill="rgba(0,102,204,0.05)" stroke="#e5e7eb" strokeWidth="1" />

                                            {/* Data Points */}
                                            <polygon
                                                points="100,10 170,50 170,150 100,190 30,150 30,50"
                                                fill="rgba(0,102,204,0.2)"
                                                stroke={colors.primary}
                                                strokeWidth="2"
                                                className="animate-draw"
                                                style={{ strokeDasharray: '600', strokeDashoffset: '600', animation: 'draw 2s forwards' }}
                                            />
                                        </svg>

                                        {/* Data Labels */}
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 md:-translate-y-6 text-center">
                                            <div className="text-xs md:text-sm font-bold text-primary" style={{ color: colors.primary }}>Skills</div>
                                            <div className="text-xs text-gray-500">92%</div>
                                        </div>
                                        <div className="absolute top-1/4 right-0 transform translate-x-4 md:translate-x-6 text-center">
                                            <div className="text-xs md:text-sm font-bold text-secondary" style={{ color: colors.secondary }}>Experience</div>
                                            <div className="text-xs text-gray-500">88%</div>
                                        </div>
                                        <div className="absolute bottom-1/4 right-0 transform translate-x-4 md:translate-x-6 text-center">
                                            <div className="text-xs md:text-sm font-bold text-primary" style={{ color: colors.primary }}>Culture</div>
                                            <div className="text-xs text-gray-500">95%</div>
                                        </div>
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 md:translate-y-6 text-center">
                                            <div className="text-xs md:text-sm font-bold text-secondary" style={{ color: colors.secondary }}>Salary</div>
                                            <div className="text-xs text-gray-500">82%</div>
                                        </div>
                                        <div className="absolute bottom-1/4 left-0 transform -translate-x-4 md:-translate-x-6 text-center">
                                            <div className="text-xs md:text-sm font-bold text-primary" style={{ color: colors.primary }}>Growth</div>
                                            <div className="text-xs text-gray-500">90%</div>
                                        </div>
                                        <div className="absolute top-1/4 left-0 transform -translate-x-4 md:-translate-x-6 text-center">
                                            <div className="text-xs md:text-sm font-bold text-secondary" style={{ color: colors.secondary }}>Location</div>
                                            <div className="text-xs text-gray-500">85%</div>
                                        </div>
                                    </div>

                                    <div className="text-center mt-6 md:mt-8">
                                        <div className="text-lg md:text-2xl font-black text-gray-800 mb-2">Strong Match</div>
                                        <p className="text-sm md:text-base text-gray-600">
                                            High probability of interview success based on comprehensive analysis.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Simulator - Responsive */}
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
                                {pageContent.simulator.title || "Personalized Application Process"}
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            {pageContent.simulator.description || "Experience how our platform transforms your application journey."}
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="rounded-2xl md:rounded-3xl overflow-hidden border-2 border-gray-100 shadow-xl md:shadow-2xl">
                            {/* Simulator Header */}
                            <div className="flex bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-200">
                                <button
                                    className={`flex-1 py-4 md:py-6 font-bold text-base md:text-lg transition-all duration-300 ${showSimulator ? 'bg-white border-b-2 text-primary' : 'text-gray-600 hover:text-primary'
                                        }`}
                                    style={showSimulator ? { borderBottomColor: colors.primary } : {}}
                                    onClick={() => setShowSimulator(true)}
                                >
                                    1. {pageContent.simulator.step1 || "Profile Analysis"}
                                </button>
                                <button
                                    className={`flex-1 py-4 md:py-6 font-bold text-base md:text-lg transition-all duration-300 ${!showSimulator ? 'bg-white border-b-2 text-primary' : 'text-gray-600 hover:text-primary'
                                        }`}
                                    style={!showSimulator ? { borderBottomColor: colors.primary } : {}}
                                    onClick={() => setShowSimulator(false)}
                                >
                                    2. {pageContent.simulator.step2 || "Job Matching"}
                                </button>
                            </div>

                            {/* Simulator Content */}
                            <div className="flex flex-col lg:flex-row gap-6 md:gap-12 p-6 md:p-12 lg:p-20 items-center min-h-[400px] md:min-h-[500px]">
                                {showSimulator ? (
                                    <>
                                        <div className="relative h-48 md:h-72 flex items-center justify-center w-full lg:w-1/2">
                                            <div className="relative w-[250px] h-[150px] md:w-[300px] md:h-[180px]">
                                                <div className="absolute inset-0 w-full h-full p-4 md:p-8 rounded-xl md:rounded-3xl bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center text-center font-bold text-gray-500 rotate-[-5deg] z-10 transition-all text-sm md:text-base">
                                                    Basic Profile: 65% Complete
                                                </div>
                                                <div className="absolute inset-0 w-full h-full p-4 md:p-8 rounded-xl md:rounded-3xl bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-xl flex items-center justify-center text-center font-bold rotate-[5deg] z-20 transition-all opacity-0 translate-y-5 animate-[sim-reveal_3s_forwards_infinite_alternate] text-sm md:text-base">
                                                    Jeenora Supported: 95% Complete
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/2">
                                            <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">{pageContent.simulator.manualEnhancement?.title || "Manual Profile Enhancement"}</h3>
                                            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
                                                {pageContent.simulator.manualEnhancement?.description || "Our team analyzes your profile and suggests improvements to increase your visibility and match score manually."}
                                            </p>
                                            <div className="space-y-3 font-semibold text-gray-700">
                                                {(pageContent.simulator.manualEnhancement?.features || []).map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-3"><span className="text-green-500">✓</span> <span className="text-sm md:text-base">{feature}</span></div>
                                                ))}
                                                {(!pageContent.simulator.manualEnhancement?.features && defaultSimulator.manualEnhancement.features || []).length > 0 &&
                                                    !pageContent.simulator.manualEnhancement?.features &&
                                                    defaultSimulator.manualEnhancement.features.map((feature, idx) => (
                                                        <div key={idx} className="flex items-center gap-3"><span className="text-green-500">✓</span> <span className="text-sm md:text-base">{feature}</span></div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-full lg:w-1/2">
                                            <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">{pageContent.simulator.intelligentMatching?.title || "Intelligent Job Matching"}</h3>
                                            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
                                                {pageContent.simulator.intelligentMatching?.description || "Our system matches you with opportunities that align with your skills, experience, and career goals."}
                                            </p>
                                            <div className="space-y-3 font-semibold text-gray-700">
                                                {(pageContent.simulator.intelligentMatching?.features || []).map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-3"><span className="text-blue-500">✓</span> <span className="text-sm md:text-base">{feature}</span></div>
                                                ))}
                                                {(!pageContent.simulator.intelligentMatching?.features && defaultSimulator.intelligentMatching.features || []).length > 0 &&
                                                    !pageContent.simulator.intelligentMatching?.features &&
                                                    defaultSimulator.intelligentMatching.features.map((feature, idx) => (
                                                        <div key={idx} className="flex items-center gap-3"><span className="text-blue-500">✓</span> <span className="text-sm md:text-base">{feature}</span></div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="relative h-48 md:h-72 flex items-center justify-center w-full lg:w-1/2">
                                            <div className="relative w-[250px] h-[150px] md:w-[300px] md:h-[180px]">
                                                <div className="absolute inset-0 w-full h-full p-4 md:p-8 rounded-xl md:rounded-3xl bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center text-center font-bold text-gray-500 rotate-[5deg] z-10 transition-all text-sm md:text-base">
                                                    Traditional Search: 40% Match
                                                </div>
                                                <div className="absolute inset-0 w-full h-full p-4 md:p-8 rounded-xl md:rounded-3xl bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl flex items-center justify-center text-center font-bold rotate-[-5deg] z-20 transition-all opacity-0 translate-y-5 animate-[sim-reveal_3s_forwards_infinite_alternate] text-sm md:text-base">
                                                    Jeenora Match: 92% Score
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories */}
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
                            Hear from professionals who found their dream jobs through Jeenora
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {(pageContent.successStories && pageContent.successStories.length > 0 ? pageContent.successStories : defaultSuccessStories).map((story, idx) => (
                            <motion.div
                                key={story.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 md:gap-6 mb-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold">
                                        {story.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-base md:text-lg">{story.name}</div>
                                        <div className="text-sm md:text-base text-gray-600">{story.role}</div>
                                        <div className="text-xs md:text-sm text-gray-500">{story.company}</div>
                                    </div>
                                </div>
                                <blockquote className="text-base md:text-lg italic text-gray-700 mb-6">
                                    "{story.quote}"
                                </blockquote>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm text-gray-500">Match Score:</div>
                                        <div className="font-bold text-primary">{story.match}%</div>
                                    </div>
                                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-bold">
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
                        className="p-6 md:p-12 lg:p-16 rounded-2xl md:rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 text-center text-white shadow-2xl"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                            Ready to See Your Matches?
                        </h2>
                        <p className="text-base md:text-xl opacity-90 max-w-3xl mx-auto mb-8 md:mb-12">
                            Experience the power of personalized job selection and direct employer connections.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                            <button
                                onClick={() => navigate('/hire/register')}
                                className="group w-full sm:w-auto px-6 md:px-12 py-3 md:py-5 bg-white text-primary rounded-xl md:rounded-2xl font-bold text-base md:text-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{ color: colors.primary }}
                            >
                                <span className="flex items-center gap-2 md:gap-3 justify-center">
                                    Create Free Account
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
                                onClick={() => navigate('/pricing')}
                                className="w-full sm:w-auto px-4 md:px-10 py-3 md:py-5 bg-transparent border-2 border-white text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg cursor-pointer transition-all duration-300 hover:bg-white/10"
                            >
                                View Pricing Plans
                            </button>
                        </div>

                        <div className="mt-8 md:mt-12 text-sm opacity-80">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                3 free credits on signup • No credit card required • 30-day satisfaction guarantee
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Job Details Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedJob(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="bg-white rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal content here */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* CSS Animations */}
            <style>{`
                @keyframes sim-reveal {
                    0%, 45% { opacity: 0; transform: translateY(20px) rotate(5deg); }
                    50%, 95% { opacity: 1; transform: translateY(0) rotate(5deg); }
                    100% { opacity: 0; transform: translateY(20px) rotate(5deg); }
                }

                @keyframes draw {
                    to { stroke-dashoffset: 0; }
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

                .animate-draw {
                    animation: draw 2s forwards;
                }

                .match-progress {
                    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Job card animations */
                .job-card {
                    transition: all 0.3s ease;
                }

                .job-card.hovered {
                    transform: translateY(-8px);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
                }

                .job-card.animated {
                    animation: fade-in 0.6s ease-out;
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

export default JobsPreview;