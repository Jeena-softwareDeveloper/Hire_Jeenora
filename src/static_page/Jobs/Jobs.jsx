import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JobsPreview = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredJob, setHoveredJob] = useState(null);
    const [showSimulator, setShowSimulator] = useState(false);
    const statsRef = useRef(null);
    const matchingRef = useRef(null);

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
                        startStatsAnimation();
                    }
                    if (entry.target === matchingRef.current) {
                        startMatchingAnimation();
                    }
                }
            });
        }, { threshold: 0.1, rootMargin: '-50px' });

        document.querySelectorAll('.reveal-up, .bounce-in, .fade-in, .slide-in-left, .slide-in-right').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const startStatsAnimation = () => {
        const statElements = document.querySelectorAll('.stat-number');
        statElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            animateCounter(el, target, 2000);
        });
    };

    const startMatchingAnimation = () => {
        // Add matching visualization animations
        const progressBars = document.querySelectorAll('.match-progress');
        progressBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = `${value}%`;
            }, 500);
        });
    };

    const animateCounter = (element, target, duration) => {
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

    const filters = ['All', 'Tech', 'Design', 'Marketing', 'Finance', 'Remote', 'Featured'];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/20 via-white to-green-50/20 pb-40">
            {/* Hero Section - Enhanced */}
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
                            Premium Opportunities
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 tracking-tighter gradient-text">
                            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
                                Platform Support
                            </span>
                            <br />
                            <span className="text-dark">Meets Career Opportunity</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
                        >
                            Discover hand-curated roles from our partner network, enhanced with
                            <span className="font-bold text-primary" style={{ color: colors.primary }}> expert support insights</span> and
                            <span className="font-bold text-secondary" style={{ color: colors.secondary }}> live tracking</span>.
                        </motion.p>

                        {/* Interactive Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap justify-center gap-12 mb-16"
                        >
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary" style={{ color: colors.primary }} ref={statsRef}>
                                    <span className="stat-number" data-target="156">0</span>+
                                </div>
                                <div className="text-sm text-gray-500">Active Listings</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-secondary" style={{ color: colors.secondary }}>
                                    <span className="stat-number" data-target="78">0</span>%
                                </div>
                                <div className="text-sm text-gray-500">Avg. Response Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary" style={{ color: colors.primary }}>
                                    <span className="stat-number" data-target="23">0</span>h
                                </div>
                                <div className="text-sm text-gray-500">Avg. Response Time</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-secondary" style={{ color: colors.secondary }}>
                                    <span className="stat-number" data-target="92">0</span>%
                                </div>
                                <div className="text-sm text-gray-500">Verified Employers</div>
                            </div>
                        </motion.div>

                        {/* Interactive Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search by role, skills, or company..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-8 py-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-blue-100 outline-none text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <button
                                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                        onClick={() => navigate('/jobs-preview')}
                                    >
                                        Search Jobs
                                    </button>
                                </div>
                            </div>

                            {/* Quick Filters */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                className="flex flex-wrap justify-center gap-3 mt-8"
                            >
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${activeFilter === filter
                                            ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Platform Intelligence Showcase */}
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
                                Beyond Job Listings
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We don't just show you jobs - we show you <span className="font-bold">winning opportunities</span> with data-driven insights.
                        </p>
                    </motion.div>

                    {/* Intelligence Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="group"
                        >
                            <div className="relative p-8 rounded-3xl bg-white border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform duration-500"></div>

                                <div className="relative z-10">
                                    <div className="w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl shadow-lg">
                                        🎯
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-dark">Expert Support Scoring</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        Our team calculates your fit for each role based on manual professional verification and deep profile analysis.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Match Accuracy</span>
                                            <span className="font-bold text-blue-600">95%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '95%' }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                                            ></motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="group"
                        >
                            <div className="relative p-8 rounded-3xl bg-white border-2 border-green-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform duration-500"></div>

                                <div className="relative z-10">
                                    <div className="w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-3xl shadow-lg">
                                        ⚡
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-dark">Response Time Analytics</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        See historical response times and success rates for each company and role.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Avg. Response</span>
                                            <span className="font-bold text-green-600">2.3 days</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '85%' }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.6 }}
                                                className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                                            ></motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="group"
                        >
                            <div className="relative p-8 rounded-3xl bg-white border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform duration-500"></div>

                                <div className="relative z-10">
                                    <div className="w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-3xl shadow-lg">
                                        💬
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-dark">Direct Admin Access</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        Communicate directly with hiring teams through our integrated messaging system.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Message Response</span>
                                            <span className="font-bold text-blue-600">4.5 hours</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '90%' }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.7 }}
                                                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                                            ></motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How We Deliver - Enhanced */}
            <section className="py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white rounded-[3rem] mx-6 lg:mx-8 mb-20 reveal-up shadow-2xl">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6">How We Deliver <span className="italic">Your Next Role</span></h2>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto">
                            We don't just list jobs - we engineer your path to getting hired.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="group"
                        >
                            <div className="relative p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-secondary transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10">
                                    <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform duration-500">💎</div>
                                    <h3 className="text-2xl font-bold mb-6 text-secondary">Verified Sourcing</h3>
                                    <p className="opacity-90 leading-relaxed mb-6">
                                        Direct partnerships with HR leaders and founders ensure access to exclusive, high-quality opportunities.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-sm opacity-80">Direct company partnerships</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-sm opacity-80">No third-party recruiters</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-sm opacity-80">Verified hiring managers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="group"
                        >
                            <div className="relative p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-secondary transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10">
                                    <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform duration-500">🎯</div>
                                    <h3 className="text-2xl font-bold mb-6 text-secondary">Expert-Vetted Matching</h3>
                                    <p className="opacity-90 leading-relaxed mb-6">
                                        Our professional team analyzes job requirements against your profile to predict success probability.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                            <span className="text-sm opacity-80">95% match accuracy</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                            <span className="text-sm opacity-80">Skill gap analysis</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                            <span className="text-sm opacity-80">Culture fit scoring</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="group"
                        >
                            <div className="relative p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-secondary transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10">
                                    <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform duration-500">🤝</div>
                                    <h3 className="text-2xl font-bold mb-6 text-secondary">Direct Connection</h3>
                                    <p className="opacity-90 leading-relaxed mb-6">
                                        Eliminate black holes with real-time tracking and direct communication with hiring teams.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-sm opacity-80">Live status updates</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-sm opacity-80">Direct admin messaging</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-sm opacity-80">Guaranteed responses</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-20 pt-12 border-t border-white/10"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: '92% Verified Companies', icon: '✅' },
                                { label: '4.8/5 User Rating', icon: '⭐' },
                                { label: '78% Response Rate', icon: '⚡' },
                                { label: '156 Active Listings', icon: '📈' }
                            ].map((badge, index) => (
                                <div key={badge.label} className="text-center">
                                    <div className="text-2xl mb-2">{badge.icon}</div>
                                    <div className="text-sm font-medium opacity-90">{badge.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Platform Matching Visualization */}
            <section ref={matchingRef} className="py-32">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Support Matching System
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            See how our team calculates your fit for each opportunity in real-time.
                        </p>
                    </motion.div>

                    {/* Interactive Matching Demo */}
                    <div className="rounded-3xl overflow-hidden border-2 border-gray-100 shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-white to-blue-50/30">
                            {/* Input Panel */}
                            <div className="p-12 flex flex-col justify-center">
                                <h3 className="text-3xl font-bold mb-8 text-gray-800">Your Profile Analysis</h3>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-700">Technical Skills</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">Score: </span>
                                            <span className="font-bold text-green-600">92%</span>
                                        </div>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full match-progress bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000" data-value="92"></div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-700">Experience Match</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">Score: </span>
                                            <span className="font-bold text-blue-600">88%</span>
                                        </div>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full match-progress bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000 delay-200" data-value="88"></div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-700">Cultural Fit</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">Score: </span>
                                            <span className="font-bold text-green-600">95%</span>
                                        </div>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full match-progress bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000 delay-400" data-value="95"></div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-700">Salary Alignment</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">Score: </span>
                                            <span className="font-bold text-blue-600">82%</span>
                                        </div>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full match-progress bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000 delay-600" data-value="82"></div>
                                    </div>
                                </div>

                                <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-blue-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                                            🎯
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800">Overall Match Score</div>
                                            <div className="text-2xl font-black text-primary" style={{ color: colors.primary }}>89.5%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visualization Panel */}
                            <div className="relative p-12 bg-gradient-to-br from-blue-500/10 to-green-500/10 flex items-center justify-center">
                                <div className="relative w-full max-w-md">
                                    {/* Radar Chart Visualization */}
                                    <div className="relative w-64 h-64 mx-auto">
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
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-center">
                                            <div className="text-sm font-bold text-primary" style={{ color: colors.primary }}>Technical Skills</div>
                                            <div className="text-xs text-gray-500">92%</div>
                                        </div>
                                        <div className="absolute top-1/4 right-0 transform translate-x-6 text-center">
                                            <div className="text-sm font-bold text-secondary" style={{ color: colors.secondary }}>Experience</div>
                                            <div className="text-xs text-gray-500">88%</div>
                                        </div>
                                        <div className="absolute bottom-1/4 right-0 transform translate-x-6 text-center">
                                            <div className="text-sm font-bold text-primary" style={{ color: colors.primary }}>Cultural Fit</div>
                                            <div className="text-xs text-gray-500">95%</div>
                                        </div>
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-center">
                                            <div className="text-sm font-bold text-secondary" style={{ color: colors.secondary }}>Salary</div>
                                            <div className="text-xs text-gray-500">82%</div>
                                        </div>
                                        <div className="absolute bottom-1/4 left-0 transform -translate-x-6 text-center">
                                            <div className="text-sm font-bold text-primary" style={{ color: colors.primary }}>Growth</div>
                                            <div className="text-xs text-gray-500">90%</div>
                                        </div>
                                        <div className="absolute top-1/4 left-0 transform -translate-x-6 text-center">
                                            <div className="text-sm font-bold text-secondary" style={{ color: colors.secondary }}>Location</div>
                                            <div className="text-xs text-gray-500">85%</div>
                                        </div>
                                    </div>

                                    <div className="text-center mt-8">
                                        <div className="text-2xl font-black text-gray-800 mb-2">Strong Match</div>
                                        <p className="text-gray-600">
                                            High probability of interview success based on comprehensive analysis.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Simulator */}
            <section className="py-32 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Personalized Application Process
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience how our platform transforms your application journey.
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="rounded-3xl overflow-hidden border-2 border-gray-100 shadow-2xl">
                            {/* Simulator Header */}
                            <div className="flex bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-200">
                                <button
                                    className={`flex-1 py-6 font-bold text-lg transition-all duration-300 ${showSimulator ? 'bg-white border-b-2 text-primary' : 'text-gray-600 hover:text-primary'
                                        }`}
                                    style={showSimulator ? { borderBottomColor: colors.primary } : {}}
                                    onClick={() => setShowSimulator(true)}
                                >
                                    1. Profile Analysis
                                </button>
                                <button
                                    className={`flex-1 py-6 font-bold text-lg transition-all duration-300 ${!showSimulator ? 'bg-white border-b-2 text-primary' : 'text-gray-600 hover:text-primary'
                                        }`}
                                    style={!showSimulator ? { borderBottomColor: colors.primary } : {}}
                                    onClick={() => setShowSimulator(false)}
                                >
                                    2. Job Matching
                                </button>
                            </div>

                            {/* Simulator Content */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 lg:p-20 items-center min-h-[500px]">
                                {showSimulator ? (
                                    <>
                                        <div className="relative h-72 flex items-center justify-center">
                                            <div className="relative w-[300px] h-[180px]">
                                                <div className="absolute inset-0 w-full h-full p-8 rounded-3xl bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center text-center font-bold text-gray-500 rotate-[-5deg] z-10 transition-all">
                                                    Basic Profile: 65% Complete
                                                </div>
                                                <div className="absolute inset-0 w-full h-full p-8 rounded-3xl bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-xl flex items-center justify-center text-center font-bold rotate-[5deg] z-20 transition-all opacity-0 translate-y-5 animate-[sim-reveal_3s_forwards_infinite_alternate]">
                                                    Jeenora Supported: 95% Complete
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold mb-6 text-gray-800">Manual Profile Enhancement</h3>
                                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                                Our team analyzes your profile and suggests improvements to increase your visibility and match score manually.
                                            </p>
                                            <div className="space-y-4 font-semibold text-gray-700">
                                                <div className="flex items-center gap-3"><span className="text-green-500">✓</span> Keyword optimization</div>
                                                <div className="flex items-center gap-3"><span className="text-green-500">✓</span> Skill gap identification</div>
                                                <div className="flex items-center gap-3"><span className="text-green-500">✓</span> Experience structuring</div>
                                                <div className="flex items-center gap-3"><span className="text-green-500">✓</span> Achievement highlighting</div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <h3 className="text-3xl font-bold mb-6 text-gray-800">Intelligent Job Matching</h3>
                                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                                Our system matches you with opportunities that align with your skills, experience, and career goals.
                                            </p>
                                            <div className="space-y-4 font-semibold text-gray-700">
                                                <div className="flex items-center gap-3"><span className="text-blue-500">✓</span> Real-time match scoring</div>
                                                <div className="flex items-center gap-3"><span className="text-blue-500">✓</span> Success probability</div>
                                                <div className="flex items-center gap-3"><span className="text-blue-500">✓</span> Company culture fit</div>
                                                <div className="flex items-center gap-3"><span className="text-blue-500">✓</span> Growth opportunity</div>
                                            </div>
                                        </div>
                                        <div className="relative h-72 flex items-center justify-center">
                                            <div className="relative w-[300px] h-[180px]">
                                                <div className="absolute inset-0 w-full h-full p-8 rounded-3xl bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center text-center font-bold text-gray-500 rotate-[5deg] z-10 transition-all">
                                                    Traditional Search: 40% Match
                                                </div>
                                                <div className="absolute inset-0 w-full h-full p-8 rounded-3xl bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl flex items-center justify-center text-center font-bold rotate-[-5deg] z-20 transition-all opacity-0 translate-y-5 animate-[sim-reveal_3s_forwards_infinite_alternate]">
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

            {/* Call to Action */}
            <section className="py-32">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-16 rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 text-center text-white shadow-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to See Your Matches?</h2>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto mb-12">
                            Experience the power of personalized job selection and direct employer connections.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => navigate('/hire/register')}
                                className="px-12 py-5 bg-white text-primary rounded-2xl font-bold text-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{ color: colors.primary }}
                            >
                                Create Free Account
                            </button>
                            <button
                                onClick={() => navigate('/pricing')}
                                className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg cursor-pointer transition-all duration-300 hover:bg-white/10"
                            >
                                View Pricing Plans
                            </button>
                        </div>

                        <div className="mt-12 text-sm opacity-80">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                3 free credits on signup • No credit card required
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

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

                .fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
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

                .animate-draw {
                    animation: draw 2s forwards;
                }

                .match-progress {
                    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>
        </div>
    );
};

export default JobsPreview;