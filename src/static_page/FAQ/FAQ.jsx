import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "Is Jeenora Hire free to use?",
            answer: "Browsing and viewing jobs is completely free. We use a credit-based system for taking advanced actions like applying to premium jobs or requesting resume optimization."
        },
        {
            question: "How do I earn or buy credits?",
            answer: "You can purchase credit bundles directly through your dashboard once you log in. We also offer introductory credits for new users."
        },
        {
            question: "Can I track applications from other sites?",
            answer: "Currently, our platform tracks applications made specifically through Jeenora Hire verified partners."
        },
        {
            question: "What is professional resume editing?",
            answer: "We have a team of industry experts who will review your resume and optimize it for ATS (Applicant Tracking Systems) to ensure you get more interviews."
        }
    ];

    return (
        <div className="faq-page">
            <section className="faq-header">
                <div className="static-container">
                    <h1>Frequently Asked <span>Questions</span></h1>
                    <p>Everything you need to know about the Jeenora Hire platform.</p>
                </div>
            </section>

            <section className="faq-list">
                <div className="static-container">
                    <div className="faq-wrapper">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            >
                                <div className="faq-question">
                                    <h3>{faq.question}</h3>
                                    <span className="faq-toggle">{activeIndex === index ? '−' : '+'}</span>
                                </div>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
