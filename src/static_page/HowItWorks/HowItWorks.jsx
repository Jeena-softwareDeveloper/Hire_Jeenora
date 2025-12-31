import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HowItWorks.css';
import '../Animations.css';

const HowItWorks = () => {
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

    const steps = [
        {
            title: 'Find Your Perfect Match',
            content: 'Browse our curated job board with intelligent filters. Save searches and get personalized alerts when matching positions become available.',
            icon: '🔍',
            tag: 'Explore & Discover'
        },
        {
            title: 'Showcase Your Best Self',
            content: 'Build a comprehensive professional profile that highlights your skills, experience, and achievements. Our system optimizes your presentation for each application.',
            icon: '👤',
            tag: 'Create Your Profile'
        },
        {
            title: 'One-Click Applications',
            content: 'Apply to positions with pre-filled information and optimized resumes. Track all submissions in your centralized dashboard.',
            icon: '✈️',
            tag: 'Apply with Confidence'
        },
        {
            title: 'Stay in Control',
            content: 'Monitor application status, receive employer updates, and communicate directly through our secure messaging system.',
            icon: '📊',
            tag: 'Track & Engage'
        }
    ];

    return (
        <div className="how-it-works-page">
            <section className="page-header reveal">
                <div className="static-container">
                    <h1>How Jeenora Hire <span>Works</span></h1>
                    <p>Four simple steps to transform your hiring process and land the job you deserve.</p>
                </div>
            </section>

            <section className="steps-timeline">
                <div className="static-container">
                    <div className="timeline-wrapper">
                        <div className="timeline-line"></div>
                        {steps.map((step, index) => (
                            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} reveal stagger-${index + 1}`}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-content-card scale-hover">
                                    <span className="step-tag">{step.tag}</span>
                                    <div className="step-icon-circle">{step.icon}</div>
                                    <h3>{step.title}</h3>
                                    <p>{step.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section reveal">
                <div className="static-container">
                    <div className="cta-box glow-card">
                        <h2>Start Your Success Story Today</h2>
                        <p>Join 50,000+ professionals who have accelerated their career with Jeenora Hire.</p>
                        <button onClick={() => navigate('/hire/register')} className="btn-primary scale-hover">Get Started Free</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
