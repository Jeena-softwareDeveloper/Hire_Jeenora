import React, { useEffect, useState } from 'react';
import './FAQ.css';
import '../Animations.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

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

    const faqs = [
        { q: "How long do my credits last?", a: "Credits never expire! Use them whenever you find the right opportunity for your career growth." },
        { q: "Can I get a refund for unused credits?", a: "Yes, we offer prorated refunds for any unused credits within 30 days of purchase. Just contact our support team." },
        { q: "How does application tracking work?", a: "Our system monitors your applications and provides real-time status updates directly from employer systems and our internal database." },
        { q: "Can I edit my application after submission?", a: "Yes, you can update your profile and documents at any time for future applications. Some active applications can also be edited if the employer allows." },
        { q: "Is my data secure?", a: "We use enterprise-grade encryption and never share your information without your explicit consent. Your privacy is our priority." },
        { q: "Do you offer resume writing services?", a: "Yes, through our expert network. This service requires additional credits but significantly increases your interview chances." }
    ];

    return (
        <div className="faq-page">
            <section className="faq-header reveal">
                <div className="static-container">
                    <h1>Common <span>Questions</span></h1>
                    <p>Everything you need to know about the Jeenora Hire platform and your career journey.</p>
                </div>
            </section>

            <section className="faq-content-list">
                <div className="static-container">
                    <div className="faq-accordion-box">
                        {faqs.map((f, i) => (
                            <div
                                key={i}
                                className={`faq-accordion-item reveal stagger-${(i % 5) + 1} ${activeIndex === i ? 'open' : ''}`}
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                            >
                                <div className="faq-q-row">
                                    <h3>{f.q}</h3>
                                    <span className="faq-plus">{activeIndex === i ? '−' : '+'}</span>
                                </div>
                                <div className="faq-a-row">
                                    <p>{f.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="faq-help-cta reveal">
                        <p>Can't find what you're looking for?</p>
                        <button onClick={() => window.location.href = '/contact'} className="btn-secondary">Contact Support</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
