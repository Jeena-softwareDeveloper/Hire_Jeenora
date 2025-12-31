import React, { useEffect } from 'react';
import './About.css';
import '../Animations.css';

const About = () => {
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

    const values = [
        { title: 'Transparency', content: 'Clear processes, honest communication, no hidden agendas.', icon: '💎' },
        { title: 'Empowerment', content: 'Tools that give candidates control over their career journey.', icon: '💪' },
        { title: 'Innovation', content: 'Continuously improving our platform based on user feedback.', icon: '⚙️' },
        { title: 'Community', content: 'Building supportive networks of professionals and employers.', icon: '🤝' }
    ];

    const stories = [
        { name: 'Sarah Chen', role: 'Product Designer', quote: 'Reduced my job search from 6 months to 3 weeks using their platform.' },
        { name: 'Marcus Rodriguez', role: 'Software Engineer', quote: 'The tracking system kept me organized during 20+ applications.' },
        { name: 'Jessica Park', role: 'Marketing Manager', quote: 'Direct messaging feature helped me stand out and land interviews.' }
    ];

    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="static-container">
                    <h1 className="reveal">Empowering Your <span>Career Growth</span></h1>
                    <p className="reveal stagger-1">To democratize career advancement by creating transparent, efficient connections between talent and opportunity.</p>
                </div>
            </section>

            <section className="vision-section">
                <div className="static-container">
                    <div className="vision-grid reveal">
                        <div className="vision-text">
                            <h2>Our Vision</h2>
                            <p>"A world where the job search is less about searching and more about connecting – where technology removes barriers and amplifies human potential."</p>
                        </div>
                        <div className="vision-stats reveal stagger-1">
                            <div className="v-stat">
                                <h4>50k+</h4>
                                <p>Users</p>
                            </div>
                            <div className="v-stat">
                                <h4>98%</h4>
                                <p>Success</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="values-section">
                <div className="static-container">
                    <h2 className="section-title text-center reveal">Our Core Values</h2>
                    <div className="values-grid">
                        {values.map((v, i) => (
                            <div key={v.title} className={`value-card reveal stagger-${i + 1}`}>
                                <div className="v-icon">{v.icon}</div>
                                <h3>{v.title}</h3>
                                <p>{v.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="success-stories">
                <div className="static-container">
                    <h2 className="section-title text-center reveal">Success Stories</h2>
                    <div className="stories-slider">
                        {stories.map((s, i) => (
                            <div key={s.name} className={`story-card reveal stagger-${i + 1} scale-hover`}>
                                <p className="quote">"{s.quote}"</p>
                                <div className="author">
                                    <strong>{s.name}</strong>
                                    <span>{s.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
