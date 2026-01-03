import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronRight, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const StaticLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/how-it-works', label: 'How It Works' },
        { path: '/jobs-preview', label: 'Jobs' },
        { path: '/pricing', label: 'Pricing' },
        { path: '/about', label: 'About' },
    ];

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans">
            {/* Header */}
            <header className="sticky top-0 z-[1000] bg-white/90 backdrop-blur-lg border-b border-gray-100 py-3 md:py-4">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 w-full">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-2 no-underline group">
                            <img
                                src={logo}
                                alt="Jeenora Hire"
                                className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="flex flex-col">
                                <span className="text-primary text-lg md:text-xl font-black tracking-tighter leading-none">JEENORA</span>
                                <span className="text-secondary text-xs md:text-sm font-bold tracking-[0.2em] leading-none">HIRE</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative py-1 text-[0.95rem] font-semibold no-underline transition-all duration-300 focus:outline-none
                                        ${location.pathname === link.path ? 'text-primary' : 'text-text-dark hover:text-primary'}
                                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300
                                        ${location.pathname === link.path ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                                    `}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="hidden sm:flex items-center gap-2">
                                <button
                                    onClick={() => navigate('/hire/login')}
                                    className="px-4 py-2 text-primary font-semibold transition-all hover:opacity-70 cursor-pointer bg-transparent border-none text-sm md:text-base focus:outline-none"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/hire/register')}
                                    className="px-5 md:px-6 py-2 md:py-2.5 bg-primary text-white rounded-full font-semibold transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(30,64,175,0.2)] shadow-[0_4px_6px_-1px_rgba(6,78,59,0.1)] cursor-pointer border-none text-sm md:text-base focus:outline-none"
                                >
                                    Get Started
                                </button>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary transition-colors focus:outline-none"
                            >
                                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="md:hidden overflow-hidden bg-white border-t border-gray-100 absolute top-full left-0 right-0 shadow-2xl"
                        >
                            <div className="px-6 py-6 flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center justify-between py-2 text-base font-medium no-underline transition-all focus:outline-none
                                            ${location.pathname === link.path ? 'text-primary' : 'text-gray-600 hover:text-primary'}
                                        `}
                                    >
                                        {link.label}
                                        <FaChevronRight size={14} className={location.pathname === link.path ? 'text-primary' : 'text-gray-300'} />
                                    </Link>
                                ))}
                                <div className="mt-4 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => navigate('/hire/login')}
                                        className="w-full py-4 text-primary font-bold bg-blue-50 rounded-2xl transition-all active:scale-95 text-center border-none focus:outline-none"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate('/hire/register')}
                                        className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 text-center border-none focus:outline-none"
                                    >
                                        Join Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
                            <Link to="/" className="flex items-center gap-2 no-underline mb-6 group">
                                <img
                                    src={logo}
                                    alt="Jeenora Hire"
                                    className="h-10 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="flex flex-col">
                                    <span className="text-white text-xl font-black tracking-tighter leading-none">JEENORA</span>
                                    <span className="text-secondary text-xs font-bold tracking-[0.2em] leading-none">HIRE</span>
                                </div>
                            </Link>
                            <p className="text-slate-400 leading-relaxed">
                                Your professional partner in career growth and job application management.
                                <span className="block mt-2 text-sm italic text-secondary/80">Proudly based in Tamil Nadu, India 🇮🇳</span>
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
                                <div className="flex gap-4 mt-4">
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300">
                                        <FaLinkedinIn size={18} />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300">
                                        <FaTwitter size={18} />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300">
                                        <FaInstagram size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                        <p>&copy; 2025 Jeenora Hire. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StaticLayout;

