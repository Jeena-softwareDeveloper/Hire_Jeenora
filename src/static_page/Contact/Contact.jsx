import React, { useEffect, useState } from 'react';
import './Contact.css';
import '../Animations.css';

const Contact = () => {
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Message sent successfully!');
        }, 1500);
    };

    return (
        <div className="contact-page">
            <section className="contact-header reveal">
                <div className="static-container">
                    <h1>Get in <span>Touch</span></h1>
                    <p>We're here to help you every step of the way. Reach out to us for any inquiries.</p>
                </div>
            </section>

            <section className="contact-main">
                <div className="static-container">
                    <div className="contact-split">
                        <div className="contact-info-cards">
                            <div className="info-item-card reveal stagger-1">
                                <div className="icon-wrap">📧</div>
                                <div className="text-wrap">
                                    <h4>Email Support</h4>
                                    <p>support@jeenorahire.com</p>
                                    <span>Responds within 4 hours</span>
                                </div>
                            </div>
                            <div className="info-item-card reveal stagger-2">
                                <div className="icon-wrap">📞</div>
                                <div className="text-wrap">
                                    <h4>Call Us</h4>
                                    <p>1-800-JEENORA</p>
                                    <span>Mon-Fri, 9AM-6PM EST</span>
                                </div>
                            </div>
                            <div className="info-item-card reveal stagger-3">
                                <div className="icon-wrap">📍</div>
                                <div className="text-wrap">
                                    <h4>Headquarters</h4>
                                    <p>123 Career Drive, Suite 500, San Francisco, CA 94107</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-wrapper reveal stagger-2">
                            <form className="luxury-form" onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <div className="field-group">
                                        <label>Full Name</label>
                                        <input type="text" placeholder="John Doe" required />
                                    </div>
                                    <div className="field-group">
                                        <label>Email Address</label>
                                        <input type="email" placeholder="john@example.com" required />
                                    </div>
                                </div>
                                <div className="field-group">
                                    <label>Inquiry Type</label>
                                    <select>
                                        <option>General Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Billing</option>
                                        <option>Partnership</option>
                                    </select>
                                </div>
                                <div className="field-group">
                                    <label>Message</label>
                                    <textarea placeholder="How can we help you?" rows="5" required></textarea>
                                </div>
                                <button type="submit" disabled={loading} className="btn-submit scale-hover">
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                                <p className="form-promise">We guarantee a response within 24 hours.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
