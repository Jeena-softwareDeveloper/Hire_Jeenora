import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="static-container">
                    <div className="hero-wrapper">
                        <div className="hero-text">
                            <span className="hero-badge">Next Generation Hiring</span>
                            <h1>Find Your Dream Job with <span>Expert Support</span></h1>
                            <p>Jeenora Hire simplifies your job search. Apply to top opportunities, track your progress, and get professional resume editing to stand out.</p>
                            <div className="hero-cta">
                                <button onClick={() => navigate('/jobs-preview')} className="btn-primary">Explore Jobs</button>
                                <button onClick={() => navigate('/how-it-works')} className="btn-secondary">Learn More</button>
                            </div>
                        </div>
                        <div className="hero-image">
                            <div className="image-card card-1">
                                <div className="card-dot"></div>
                                <p>Application Tracked</p>
                            </div>
                            <div className="image-card card-2">
                                <p>Top Job Match</p>
                            </div>
                            <div className="main-image-placeholder">
                                <div className="blob"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="value-prop">
                <div className="static-container">
                    <div className="section-header">
                        <h2>Why Choose Jeenora Hire?</h2>
                        <p>We provide the tools and support you need to succeed in today's competitive job market.</p>
                    </div>
                    <div className="prop-grid">
                        <div className="prop-card">
                            <div className="prop-icon">🔍</div>
                            <h3>Apply Seamlessly</h3>
                            <p>One-click applications to verified jobs across multiple industries and locations.</p>
                        </div>
                        <div className="prop-card">
                            <div className="prop-icon">📊</div>
                            <h3>Track Progress</h3>
                            <p>Real-time status updates on every application you make. No more guessing.</p>
                        </div>
                        <div className="prop-card">
                            <div className="prop-icon">🎯</div>
                            <h3>Get Hired Faster</h3>
                            <p>Expert administrative support and resume optimization to boost your chances by 3x.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Banner */}
            <section className="trust-banner">
                <div className="static-container">
                    <p>Trusted by thousands of job seekers worldwide</p>
                    <div className="trust-logos">
                        <span>FastTrack</span>
                        <span>CareerPro</span>
                        <span>HireUp</span>
                        <span>LinkDev</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
