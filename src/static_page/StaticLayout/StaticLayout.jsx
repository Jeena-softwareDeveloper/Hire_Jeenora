import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const StaticLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/how-it-works', label: 'How It Works' },
        { path: '/jobs-preview', label: 'Jobs' },
        { path: '/pricing', label: 'Pricing' },
        { path: '/about', label: 'About' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans">
            {/* Header */}
            <header className="sticky top-0 z-[1000] bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
                <div className="max-w-[1200px] mx-auto px-8 w-full">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="text-2xl font-extrabold tracking-tighter no-underline">
                            <span className="text-primary">Jeenora</span>
                            <span className="text-secondary">Hire</span>
                        </Link>

                        <nav className="hidden md:flex gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative py-1 text-[0.95rem] font-semibold no-underline transition-all duration-300
                                        ${location.pathname === link.path ? 'text-primary' : 'text-text-dark hover:text-primary'}
                                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300
                                        ${location.pathname === link.path ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                                    `}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/hire/login')}
                                className="px-5 py-2.5 text-primary font-semibold transition-opacity hover:opacity-70 cursor:pointer bg-transparent border-none"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/hire/register')}
                                className="px-6 py-2.5 bg-primary text-white rounded-full font-semibold transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(30,64,175,0.2)] shadow-[0_4px_6px_-1px_rgba(6,78,59,0.1)] cursor:pointer border-none"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 animate-fadeIn" key={location.pathname}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="mt-16 bg-[#0f172a] text-white py-16 pb-8">
                <div className="max-w-[1200px] mx-auto px-8 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
                        <div className="max-w-xs">
                            <Link to="/" className="text-2xl font-extrabold tracking-tighter no-underline inline-block mb-4">
                                <span className="text-white">Jeenora</span>
                                <span className="text-secondary">Hire</span>
                            </Link>
                            <p className="text-slate-400 leading-relaxed">
                                Your professional partner in career growth and job application management.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">Platform</h3>
                            <div className="flex flex-col gap-3">
                                <Link to="/jobs-preview" className="text-slate-400 no-underline hover:text-secondary hover:translate-x-1.5 transition-all">Browse Jobs</Link>
                                <Link to="/how-it-works" className="text-slate-400 no-underline hover:text-secondary hover:translate-x-1.5 transition-all">Process</Link>
                                <Link to="/pricing" className="text-slate-400 no-underline hover:text-secondary hover:translate-x-1.5 transition-all">Pricing</Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">Company</h3>
                            <div className="flex flex-col gap-3">
                                <Link to="/about" className="text-slate-400 no-underline hover:text-secondary hover:translate-x-1.5 transition-all">About Us</Link>
                                <Link to="/contact" className="text-slate-400 no-underline hover:text-secondary hover:translate-x-1.5 transition-all">Contact</Link>
                                <Link to="/faq" className="text-slate-400 no-underline hover:text-secondary hover:translate-x-1.5 transition-all">FAQs</Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">Support</h3>
                            <div className="flex flex-col gap-3">
                                <p className="text-slate-400">support@jeenora.com</p>
                                <p className="text-slate-400">+91 (Call Us)</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                        <p>&copy; 2025 Jeenora Hire. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StaticLayout;
