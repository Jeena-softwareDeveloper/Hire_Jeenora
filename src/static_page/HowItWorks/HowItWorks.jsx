import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HowItWorks.css';

const HowItWorks = () => {
    const navigate = useNavigate();

    const steps = [
        {
            number: '01',
            title: 'Explore Jobs',
            description: 'Browse through our curated list of verified job openings across various industries.',
            icon: '🔍'
        },
        {
            number: '02',
            title: 'Sign Up & Apply',
            description: 'Create your account, upload your profile, and apply to jobs with a single click.',
            icon: '📝'
        },
        {
            number: '03',
            title: 'Track Applications',
            description: 'Monitor the status of your applications in real-time through your personalized dashboard.',
            icon: '📊'
        },
        {
            number: '04',
            title: 'Get Hired',
            description: 'Receive interview alerts and notifications directly from our admin team.',
            icon: '🎉'
        }
    ];

    return (
        <div className="how-it-works-page">
            <section className="page-header">
                <div className="static-container">
                    <h1>The Road to Your <span>Next Career</span></h1>
                    <p>Four simple steps to transform your hiring process and land the job you deserve.</p>
                </div>
            </section>

            <section className="steps-section">
                <div className="static-container">
                    <div className="steps-column">
                        {steps.map((step, index) => (
                            <div key={index} className="step-item">
                                <div className="step-number">{step.number}</div>
                                <div className="step-content">
                                    <div className="step-icon-mobile">{step.icon}</div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                                <div className="step-visual">
                                    <div className="step-icon">{step.icon}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="static-container">
                    <div className="cta-box">
                        <h2>Ready to get started?</h2>
                        <p>Join thousands of successful candidates today.</p>
                        <button onClick={() => navigate('/hire/register')} className="btn-primary">Create Your Account</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
