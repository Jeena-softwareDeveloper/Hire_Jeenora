import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pricing.css';

const Pricing = () => {
    const navigate = useNavigate();

    return (
        <div className="pricing-page">
            <section className="pricing-header">
                <div className="static-container">
                    <h1>Transparent <span>Value</span></h1>
                    <p>Our credit-based system ensures you only pay for what you use.</p>
                </div>
            </section>

            <section className="pricing-content">
                <div className="static-container">
                    <div className="credit-info">
                        <h2>How Credits Work</h2>
                        <div className="info-grid">
                            <div className="info-card">
                                <h3>Apply to Jobs</h3>
                                <p>1 Credit per application</p>
                            </div>
                            <div className="info-card">
                                <h3>Expert Chat</h3>
                                <p>5 Credits per session</p>
                            </div>
                            <div className="info-card">
                                <h3>Resume Edit</h3>
                                <p>10-20 Credits (based on level)</p>
                            </div>
                        </div>
                    </div>

                    <div className="pricing-card-main">
                        <div className="card-top">
                            <span className="popular-badge">Starter Bundle</span>
                            <div className="price">₹499<span> / 50 Credits</span></div>
                        </div>
                        <ul className="features">
                            <li>Apply to up to 50 Jobs</li>
                            <li>Basic Application Tracking</li>
                            <li>24/7 Email Support</li>
                            <li>Free Profile Review</li>
                        </ul>
                        <button onClick={() => navigate('/hire/register')} className="btn-buy">Get Credits Now</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
