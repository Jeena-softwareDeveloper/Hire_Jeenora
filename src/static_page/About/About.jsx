import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
    const [activeTab, setActiveTab] = useState('mission');
    const [animatedNumbers, setAnimatedNumbers] = useState({
        transparency: 0,
        response: 0,
        satisfaction: 0,
        hiring: 0
    });
    const statsRef = useRef(null);
    const missionRef = useRef(null);
    const valuesRef = useRef(null);

    // Color Palette
    const colors = {
        primary: '#0066CC', // Deep Blue
        secondary: '#00A86B', // Emerald Green
        accent: '#FFD700', // Gold
        dark: '#0F172A',
        light: '#F8FAFC'
    };

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
                }
            });
        }, { threshold: 0.1, rootMargin: '-50px' });

        document.querySelectorAll('.reveal-up, .fade-up-blur, .bounce-in, .slide-in-left, .slide-in-right').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const startNumberAnimation = () => {
        const targets = { transparency: 100, response: 78, satisfaction: 95, hiring: 2.3 };
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

    const animateNumber = (key, target, duration) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setAnimatedNumbers(prev => ({ ...prev, [key]: Math.round(target) }));
                clearInterval(timer);
            } else {
                setAnimatedNumbers(prev => ({ ...prev, [key]: Math.round(start) }));
            }
        }, 16);
    };

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

    const coreValues = [
        {
            icon: '🔓',
            title: 'Radical Transparency',
            description: 'No black boxes. Every application status, every decision, every communication is visible and trackable.',
            color: 'blue'
        },
        {
            icon: '⚡',
            title: 'Speed & Efficiency',
            description: 'We eliminate waiting times with real-time updates and direct employer connections.',
            color: 'green'
        },
        {
            icon: '🤝',
            title: 'Dedicated Support',
            description: 'We don\'t just match you; we support you. From choosing the right role to the final interview, our team is with you.',
            color: 'blue'
        },
        {
            icon: '💎',
            title: 'User Empowerment',
            description: 'Giving job seekers control, visibility, and actionable insights throughout their journey.',
            color: 'green'
        }
    ];

    const timelineMilestones = [
        { year: '2023', event: 'Concept Born', description: 'Frustrated by job search ghosting, we envisioned a transparent platform' },
        { year: '2024', event: 'Alpha Launch', description: 'First 100 users experience revolutionary application tracking' },
        { year: '2024', event: 'Support Network', description: 'Established a dedicated network of recruiters and support staff for candidates' },
        { year: '2025', event: 'Global Launch', description: 'Expanded to serve professionals across 50+ countries' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/20 via-white to-green-50/20 pb-40">
            {/* Hero Section - Enhanced */}
            <section className="relative pt-32 pb-40 overflow-hidden about-hero">
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
                            Our Vision & Mission
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 tracking-tighter gradient-text">
                            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
                                Ending the Era
                            </span>
                            <br />
                            <span className="text-dark">of Career Uncertainty</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
                        >
                            Jeenora Hire was built by engineers, recruiters, and job seekers who were tired of the
                            <span className="font-bold text-primary" style={{ color: colors.primary }}> "Application Black Hole"</span>.
                            We\'ve engineered <span className="font-bold text-secondary" style={{ color: colors.secondary }}>transparency</span>,
                            <span className="font-bold text-primary" style={{ color: colors.primary }}> live tracking</span>, and
                            <span className="font-bold text-secondary" style={{ color: colors.secondary }}> end-to-end support</span> into the very core of the job hunt.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Tabs for Problem/Solution */}
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
                                Transforming Career Journeys
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From problem identification to innovative solution - see how we're changing the game.
                        </p>
                    </motion.div>

                    {/* Interactive Tabs */}
                    <div className="mb-16">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            {[
                                { id: 'problem', label: 'The Problem', color: 'red' },
                                { id: 'solution', label: 'Our Solution', color: 'primary' },
                                { id: 'impact', label: 'The Impact', color: 'secondary' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${activeTab === tab.id
                                        ? `bg-gradient-to-r ${tab.id === 'problem' ? 'from-red-500 to-red-600' :
                                            tab.id === 'solution' ? 'from-blue-500 to-blue-600' :
                                                'from-green-500 to-green-600'
                                        } text-white shadow-lg scale-105`
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                                        }`}
                                >
                                    {tab.label}
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
                                {activeTab === 'problem' && (
                                    <div className="p-12 rounded-3xl bg-gradient-to-br from-red-50 to-white border-2 border-red-100 shadow-xl">
                                        <h3 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-4">
                                            <span className="text-4xl">🎯</span>
                                            The Traditional Job Search Problem
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {[
                                                {
                                                    title: 'Application Black Holes',
                                                    desc: 'Submit resumes into void, receive no updates, zero feedback loops',
                                                    icon: '🕳️',
                                                    stats: '85% of applications get no response'
                                                },
                                                {
                                                    title: 'Ghosting Culture',
                                                    desc: 'Companies disappear after interviews, leaving candidates in limbo',
                                                    icon: '👻',
                                                    stats: '40% experience post-interview ghosting'
                                                },
                                                {
                                                    title: 'Limited Visibility',
                                                    desc: 'No insight into application status, hiring team feedback, or next steps',
                                                    icon: '🙈',
                                                    stats: 'Zero transparency in 90% of processes'
                                                }
                                            ].map((item, index) => (
                                                <motion.div
                                                    key={item.title}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="p-6 bg-white rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-all"
                                                >
                                                    <div className="text-4xl mb-4">{item.icon}</div>
                                                    <h4 className="text-xl font-bold text-red-700 mb-3">{item.title}</h4>
                                                    <p className="text-gray-600 mb-4">{item.desc}</p>
                                                    <div className="text-sm font-bold text-red-500">{item.stats}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'solution' && (
                                    <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 shadow-xl">
                                        <h3 className="text-3xl font-bold text-primary mb-8 flex items-center gap-4" style={{ color: colors.primary }}>
                                            <span className="text-4xl">✨</span>
                                            The Jeenora Hire Solution
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {[
                                                {
                                                    title: 'Real-time Tracking',
                                                    desc: 'Live application status updates with direct hiring team feedback',
                                                    icon: '📊',
                                                    benefit: '95% application visibility'
                                                },
                                                {
                                                    title: 'Live Support Journey',
                                                    desc: 'Expert guidance from application up to your first day at work. We never leave you alone.',
                                                    icon: '🤝',
                                                    benefit: '100% Support Guarantee'
                                                },
                                                {
                                                    title: 'Direct Communication',
                                                    desc: 'Integrated messaging with hiring teams, no more black holes',
                                                    icon: '💬',
                                                    benefit: '4.5 hour avg response time'
                                                }
                                            ].map((item, index) => (
                                                <motion.div
                                                    key={item.title}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all"
                                                >
                                                    <div className="text-4xl mb-4">{item.icon}</div>
                                                    <h4 className="text-xl font-bold text-primary mb-3" style={{ color: colors.primary }}>{item.title}</h4>
                                                    <p className="text-gray-600 mb-4">{item.desc}</p>
                                                    <div className="text-sm font-bold text-primary" style={{ color: colors.primary }}>{item.benefit}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'impact' && (
                                    <div className="p-12 rounded-3xl bg-gradient-to-br from-green-50 to-white border-2 border-green-100 shadow-xl">
                                        <h3 className="text-3xl font-bold text-secondary mb-8 flex items-center gap-4" style={{ color: colors.secondary }}>
                                            <span className="text-4xl">🚀</span>
                                            Measurable Impact
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {[
                                                {
                                                    title: 'Response Rates',
                                                    desc: '78% average response rate vs industry standard of 30%',
                                                    icon: '⚡',
                                                    improvement: '+160% improvement'
                                                },
                                                {
                                                    title: 'Time Saved',
                                                    desc: 'Average user saves 40 hours monthly on job search activities',
                                                    icon: '⏱️',
                                                    improvement: '65% time reduction'
                                                },
                                                {
                                                    title: 'Success Rates',
                                                    desc: '45% higher interview-to-offer conversion through better matching',
                                                    icon: '🏆',
                                                    improvement: '2.3x more successful'
                                                }
                                            ].map((item, index) => (
                                                <motion.div
                                                    key={item.title}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="p-6 bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all"
                                                >
                                                    <div className="text-4xl mb-4">{item.icon}</div>
                                                    <h4 className="text-xl font-bold text-secondary mb-3" style={{ color: colors.secondary }}>{item.title}</h4>
                                                    <p className="text-gray-600 mb-4">{item.desc}</p>
                                                    <div className="text-sm font-bold text-secondary" style={{ color: colors.secondary }}>{item.improvement}</div>
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

            {/* Technology Stack - Enhanced */}
            <section className="py-32 bg-gradient-to-b from-white to-blue-50/30">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Technology DNA
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Built on cutting-edge technology designed specifically for transparent hiring.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Tech Stack Visualization */}
                        <div className="relative">
                            <div className="p-12 rounded-3xl bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl">
                                        ⚙️
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800">Our Tech Stack</h3>
                                        <p className="text-gray-600">Purpose-built for performance and security</p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {[
                                        {
                                            name: 'Live Tracking System',
                                            desc: 'Proprietary pipeline that keeps you updated on every single movement of your application',
                                            progress: 100,
                                            color: 'blue'
                                        },
                                        {
                                            name: 'Real-time Engine',
                                            desc: 'WebSocket-driven notification architecture with zero latency',
                                            progress: 100,
                                            color: 'green'
                                        },
                                        {
                                            name: 'Data Security',
                                            desc: 'Military-grade encryption with GDPR & CCPA compliance',
                                            progress: 100,
                                            color: 'blue'
                                        },
                                        {
                                            name: 'Support Framework',
                                            desc: 'Managed assistance for resume optimization and interview preparation',
                                            progress: 98,
                                            color: 'green'
                                        }
                                    ].map((tech, index) => (
                                        <motion.div
                                            key={tech.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="space-y-2"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-gray-800">{tech.name}</span>
                                                <span className={`font-bold ${tech.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                                                    }`}>
                                                    {tech.progress}%
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">{tech.desc}</p>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
                            <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-green-500/10 border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-2xl">
                                        🏗️
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800">Platform Architecture</h3>
                                        <p className="text-gray-600">Designed for scale, security, and seamless user experience</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="text-2xl mb-2">⚡</div>
                                            <div className="font-bold text-gray-800">Microservices</div>
                                            <div className="text-sm text-gray-600">Scalable, independent services</div>
                                        </div>
                                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="text-2xl mb-2">🔒</div>
                                            <div className="font-bold text-gray-800">End-to-End Encryption</div>
                                            <div className="text-sm text-gray-600">Military-grade security</div>
                                        </div>
                                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="text-2xl mb-2">🌐</div>
                                            <div className="font-bold text-gray-800">Global CDN</div>
                                            <div className="text-sm text-gray-600">Low latency worldwide</div>
                                        </div>
                                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="text-2xl mb-2">📊</div>
                                            <div className="font-bold text-gray-800">Real-time Analytics</div>
                                            <div className="text-sm text-gray-600">Live data processing</div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white/80 rounded-2xl border border-white/50 backdrop-blur-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="font-bold text-gray-800">99.9% Uptime Guarantee</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Enterprise-grade reliability with automatic failover and disaster recovery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values - Enhanced */}
            <section ref={valuesRef} className="py-32 bg-gradient-to-b from-white to-green-50/30">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Our Core Values
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The principles that guide every decision we make and every feature we build.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreValues.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group"
                            >
                                <div className="relative h-full p-8 rounded-3xl bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 transition-transform duration-500 group-hover:scale-125 ${value.color === 'blue' ? 'bg-blue-500/5' : 'bg-green-500/5'
                                        }`}></div>

                                    <div className="relative z-10">
                                        <div className={`w-16 h-16 mb-8 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${value.color === 'blue'
                                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                                            : 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                                            }`}>
                                            {value.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-4 text-gray-800">{value.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline & Milestones */}
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
                                Our Journey
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From concept to global platform - our mission to transform hiring continues.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-blue-500 transform -translate-x-1/2"></div>

                        <div className="space-y-12 lg:space-y-24">
                            {timelineMilestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
                                >
                                    {/* Milestone Content */}
                                    <div className="relative z-10 w-full lg:w-1/2">
                                        <div className={`p-8 rounded-3xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 ${index % 2 === 0
                                            ? 'bg-gradient-to-r from-blue-50 to-white border-blue-100'
                                            : 'bg-gradient-to-r from-green-50 to-white border-green-100'
                                            }`}>
                                            <div className="flex items-center gap-6 mb-6">
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg ${index % 2 === 0
                                                    ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                                                    : 'bg-gradient-to-br from-green-500 to-green-600'
                                                    }`}>
                                                    {milestone.year}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-800">{milestone.event}</h3>
                                                    <p className="text-gray-600">{milestone.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline Node (Desktop) */}
                                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                                        <div className={`w-8 h-8 rounded-full border-4 border-white shadow-lg ${index % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'
                                            }`}></div>
                                    </div>

                                    {/* Empty Space */}
                                    <div className="hidden lg:block w-1/2"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Metrics - Enhanced */}
            <section ref={statsRef} className="py-32 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6">Trust & Impact Metrics</h2>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto">
                            Numbers that demonstrate our commitment to transforming the hiring experience.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { value: animatedNumbers.transparency, label: 'Application Transparency', unit: '%', icon: '🔓' },
                            { value: animatedNumbers.response, label: 'Platform Response Rate', unit: '%', icon: '⚡' },
                            { value: animatedNumbers.satisfaction, label: 'User Satisfaction', unit: '%', icon: '⭐' },
                            { value: animatedNumbers.hiring, label: 'Avg. Time to Hire', unit: 'days', icon: '🚀' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20">
                                    <div className="text-4xl mb-4">{stat.icon}</div>
                                    <div className="text-5xl md:text-6xl font-black mb-4">
                                        {stat.value}
                                        <span className="text-2xl opacity-80">{stat.unit}</span>
                                    </div>
                                    <div className="text-lg font-medium opacity-90">{stat.label}</div>

                                    {/* Animated Dots */}
                                    <div className="mt-6 flex justify-center">
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((dot) => (
                                                <motion.div
                                                    key={dot}
                                                    className="w-2 h-2 rounded-full bg-white/30"
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
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Metrics */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                    >
                        {[
                            { label: 'Active Job Seekers', value: '5,000+' },
                            { label: 'Partner Companies', value: '300+' },
                            { label: 'Successful Hires', value: '1,200+' },
                            { label: 'Countries Served', value: '50+' }
                        ].map((metric, index) => (
                            <div key={metric.label}>
                                <div className="text-2xl font-bold mb-2">{metric.value}</div>
                                <div className="text-sm opacity-80">{metric.label}</div>
                            </div>
                        ))}
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
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Join the Movement</h2>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto mb-12">
                            Be part of the revolution that's bringing transparency, efficiency, and fairness to hiring.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => window.location.href = '/hire/register'}
                                className="px-12 py-5 bg-white text-primary rounded-2xl font-bold text-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{ color: colors.primary }}
                            >
                                Start Your Journey
                            </button>
                            <button
                                onClick={() => window.location.href = '/how-it-works'}
                                className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg cursor-pointer transition-all duration-300 hover:bg-white/10"
                            >
                                See How It Works
                            </button>
                        </div>

                        <div className="mt-12 text-sm opacity-80">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                No credit card required • 10 free credits on signup
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CSS Animations */}
            <style>{`
                .gradient-text {
                    background-clip: text;
                    -webkit-background-clip: text;
                }

                .about-hero {
                    background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 50%, #eff6ff 100%);
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

                .char-reveal span {
                    opacity: 0;
                    animation: charReveal 0.5s forwards;
                }

                @keyframes charReveal {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .mission-element {
                    opacity: 0;
                    transform: translateY(20px);
                }

                .mission-element.active {
                    animation: missionReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                @keyframes missionReveal {
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default About;