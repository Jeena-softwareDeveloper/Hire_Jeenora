import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="static-container">
                    <h1>Our <span>Mission</span></h1>
                    <p>Empowering job seekers with the technology and support they need to navigate the modern hiring landscape.</p>
                </div>
            </section>

            <section className="about-details">
                <div className="static-container">
                    <div className="about-grid">
                        <div className="about-text">
                            <h2>The Jeenora Vision</h2>
                            <p>We believe that finding a job shouldn't be a job in itself. Jeenora Hire was born out of the frustration candidates face when applying for roles - from lack of feedback to complex application processes.</p>
                            <p>Our platform bridges the gap between candidates and opportunities by providing a centralized hub for applications, real-time tracking, and expert resume optimization.</p>
                        </div>
                        <div className="about-stats">
                            <div className="stat-card">
                                <h4>10k+</h4>
                                <p>Applications Tracked</p>
                            </div>
                            <div className="stat-card">
                                <h4>500+</h4>
                                <p>Verified Companies</p>
                            </div>
                            <div className="stat-card">
                                <h4>98%</h4>
                                <p>User Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
