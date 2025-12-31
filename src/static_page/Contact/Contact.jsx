import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <section className="contact-header">
                <div className="static-container">
                    <h1>Get in <span>Touch</span></h1>
                    <p>Have questions? We are here to help you on your career journey.</p>
                </div>
            </section>

            <section className="contact-content">
                <div className="static-container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <div className="info-item">
                                <div className="info-icon">📧</div>
                                <div>
                                    <h4>Email Us</h4>
                                    <p>support@jeenora.com</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon">📍</div>
                                <div>
                                    <h4>Office</h4>
                                    <p>Bangalore, Karnataka, India</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon">💬</div>
                                <div>
                                    <h4>Support Hours</h4>
                                    <p>Mon - Sat: 9am to 6pm</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-box">
                            <form className="static-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="john@example.com" />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea placeholder="How can we help you?" rows="5"></textarea>
                                </div>
                                <button type="button" className="btn-submit">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
