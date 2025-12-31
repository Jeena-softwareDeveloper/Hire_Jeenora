import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './StaticLayout.css';

const StaticLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="static-layout">
            <header className="static-header">
                <div className="static-container">
                    <div className="static-nav-wrapper">
                        <Link to="/" className="static-logo">
                            <span className="logo-text">Jeenora</span>
                            <span className="logo-accent">Hire</span>
                        </Link>

                        <nav className="static-nav">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/how-it-works" className="nav-link">How It Works</Link>
                            <Link to="/jobs-preview" className="nav-link">Jobs</Link>
                            <Link to="/pricing" className="nav-link">Pricing</Link>
                            <Link to="/about" className="nav-link">About</Link>
                        </nav>

                        <div className="static-auth-buttons">
                            <button onClick={() => navigate('/hire/login')} className="btn-login">Login</button>
                            <button onClick={() => navigate('/hire/register')} className="btn-signup">Get Started</button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="static-content">
                <Outlet />
            </main>

            <footer className="static-footer">
                <div className="static-container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <Link to="/" className="static-logo">
                                <span className="logo-text">Jeenora</span>
                                <span className="logo-accent">Hire</span>
                            </Link>
                            <p className="footer-desc">
                                Your professional partner in career growth and job application management.
                            </p>
                        </div>

                        <div className="footer-links">
                            <h3>Platform</h3>
                            <Link to="/jobs-preview">Browse Jobs</Link>
                            <Link to="/how-it-works">Process</Link>
                            <Link to="/pricing">Pricing</Link>
                        </div>

                        <div className="footer-links">
                            <h3>Company</h3>
                            <Link to="/about">About Us</Link>
                            <Link to="/contact">Contact</Link>
                            <Link to="/faq">FAQs</Link>
                        </div>

                        <div className="footer-links">
                            <h3>Support</h3>
                            <p>support@jeenora.com</p>
                            <p>+91 (Call Us)</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 Jeenora Hire. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StaticLayout;
