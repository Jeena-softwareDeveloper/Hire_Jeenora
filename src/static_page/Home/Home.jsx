import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import '../Animations.css';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="static-container">
                    <div className="hero-wrapper">
                        <div className="hero-text">
                            <span className="hero-badge reveal stagger-1">Next Generation Hiring</span>
                            <h1 className="reveal stagger-2">Your Career Journey, <span>Simplified</span></h1>
                            <p className="reveal stagger-3">Jeenora Hire bridges the gap between talented professionals and their dream opportunities. Our intelligent platform streamlines applications, provides real-time tracking, and connects you directly with hiring teams.</p>
                            <div className="hero-cta reveal stagger-4">
                                <button onClick={() => navigate('/jobs-preview')} className="btn-primary scale-hover">Explore Available Jobs</button>
                                <button onClick={() => navigate('/hire/register')} className="btn-secondary scale-hover">Start Free Account</button>
                            </div>
                        </div>
                        <div className="hero-image reveal stagger-3">
                            <div className="main-image-placeholder glow-card">
                                <div className="blob"></div>
                                <div className="floating-elements">
                                    <div className="float-card c1">100+ Jobs Found</div>
                                    <div className="float-card c2">Resume ATS Score: 95%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="value-prop">
                <div className="static-container">
                    <div className="section-header reveal">
                        <h2>Experience the Future of Hiring</h2>
                        <p>We've built the tools to make your job search faster, smarter, and more effective.</p>
                    </div>
                    <div className="prop-grid">
                        <div className="prop-card reveal stagger-1">
                            <div className="prop-icon">🚀</div>
                            <h3>Apply Smart</h3>
                            <p>Submit applications with one click using our optimized profile system. No more repetitive forms.</p>
                        </div>
                        <div className="prop-card reveal stagger-2">
                            <div className="prop-icon">📊</div>
                            <h3>Track Progress</h3>
                            <p>Real-time dashboard showing application status and employer feedback. Stay informed at every step.</p>
                        </div>
                        <div className="prop-card reveal stagger-3">
                            <div className="prop-icon">🎯</div>
                            <h3>Get Hired Faster</h3>
                            <p>Direct communication channels with hiring managers and automated follow-ups to keep things moving.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="static-container">
                    <div className="features-wrapper">
                        <div className="features-content">
                            <h2 className="reveal">Intelligent Features for <span>Modern Professionals</span></h2>
                            <ul className="features-list">
                                <li className="reveal stagger-1"><strong>Smart Job Matching:</strong> AI-powered recommendations based on your profile.</li>
                                <li className="reveal stagger-2"><strong>Application Analytics:</strong> Track response rates and improve your approach.</li>
                                <li className="reveal stagger-3"><strong>Resume Builder:</strong> Professional templates optimized for ATS systems.</li>
                                <li className="reveal stagger-4"><strong>Interview Scheduler:</strong> Coordinate interviews without endless emails.</li>
                                <li className="reveal stagger-5"><strong>Salary Insights:</strong> Market data for informed negotiation.</li>
                            </ul>
                        </div>
                        <div className="features-stats-grid">
                            <div className="stat-box reveal stagger-1">
                                <h3 className="counter-text">50,000+</h3>
                                <p>Professionals</p>
                            </div>
                            <div className="stat-box reveal stagger-2">
                                <h3 className="counter-text">40%</h3>
                                <p>Faster Search</p>
                            </div>
                            <div className="stat-box reveal stagger-3">
                                <h3 className="counter-text">4.8/5</h3>
                                <p>User Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="trust-indicator-bar">
                <div className="static-container">
                    <p className="reveal">Featured In</p>
                    <div className="trust-logos-scroller reveal stagger-2">
                        <span>TechHire</span>
                        <span>CareerBuilder</span>
                        <span>JobSearch Magazine</span>
                        <span>TalentTimes</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
