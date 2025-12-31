import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pricing.css';
import '../Animations.css';

const Pricing = () => {
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

    const tiers = [
        {
            name: 'Starter Plan',
            price: 'Free',
            period: 'Monthly',
            feat: ['3 credits monthly', 'Basic job tracking', 'Standard applications', 'Email support'],
            cta: 'Get Started',
            popular: false
        },
        {
            name: 'Professional',
            price: '$29',
            period: 'Monthly',
            feat: ['20 credits monthly', 'Priority applications', 'Direct messaging', 'Advanced analytics', 'Phone & email support'],
            cta: 'Choose Pro',
            popular: true
        },
        {
            name: 'Business',
            price: '$79',
            period: 'Monthly',
            feat: ['60 credits monthly', 'Dedicated manager', 'Custom reporting', 'Team collaboration', '24/7 priority support'],
            cta: 'Choose Business',
            popular: false
        }
    ];

    return (
        <div className="pricing-page">
            <section className="pricing-header reveal">
                <div className="static-container">
                    <h1>Plans for Every <span>Career Stage</span></h1>
                    <p>Transparent pricing with no hidden fees. Choose the plan that fits your goals.</p>
                </div>
            </section>

            <section className="pricing-cards">
                <div className="static-container">
                    <div className="tier-grid">
                        {tiers.map((tier, idx) => (
                            <div key={tier.name} className={`tier-card ${tier.popular ? 'popular' : ''} reveal stagger-${idx + 1} scale-hover`}>
                                {tier.popular && <span className="most-popular">Most Popular</span>}
                                <div className="tier-header">
                                    <h3>{tier.name}</h3>
                                    <div className="price-box">
                                        <span className="amount">{tier.price}</span>
                                        <span className="period">/{tier.period}</span>
                                    </div>
                                </div>
                                <ul className="tier-features">
                                    {tier.feat.map(f => <li key={f}>{f}</li>)}
                                </ul>
                                <button onClick={() => navigate('/hire/register')} className={`btn-tier ${tier.popular ? 'primary' : ''}`}>
                                    {tier.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="credit-breakdown-section">
                <div className="static-container">
                    <div className="reveal">
                        <h2 className="section-title">How Credits Work</h2>
                        <div className="credit-grid">
                            <div className="credit-item reveal stagger-1">
                                <span className="cr-count">1</span>
                                <p>Job Application</p>
                            </div>
                            <div className="credit-item reveal stagger-2">
                                <span className="cr-count">2</span>
                                <p>Priority Boost</p>
                            </div>
                            <div className="credit-item reveal stagger-3">
                                <span className="cr-count">3</span>
                                <p>Direct Message</p>
                            </div>
                            <div className="credit-item reveal stagger-4">
                                <span className="cr-count">5</span>
                                <p>Expert Resume Review</p>
                            </div>
                        </div>
                    </div>

                    <div className="pricing-guarantee reveal">
                        <div className="guarantee-grid">
                            <span>✓ No hidden fees</span>
                            <span>✓ Cancel anytime</span>
                            <span>✓ 30-day money-back</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
