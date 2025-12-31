import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Jobs.css';
import '../Animations.css';

const JobsPreview = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All');

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
    }, [activeFilter]);

    const categories = ['All', 'Engineering', 'Marketing', 'Data Science', 'Design', 'Product'];

    const mockJobs = [
        { id: 1, title: 'Senior Frontend Developer', company: 'TechVision Solutions', location: 'Remote • Full-time', salary: '$120,000 - $150,000', tags: ['React', 'TypeScript', 'UI/UX'], category: 'Engineering' },
        { id: 2, title: 'Marketing Director', company: 'GrowthHack Digital', location: 'New York, NY • Hybrid', salary: '$140,000 - $180,000', tags: ['Strategy', 'Leadership', 'Analytics'], category: 'Marketing' },
        { id: 3, title: 'Data Scientist', company: 'DataInsight Corp', location: 'Remote', salary: '$130,000 - $160,000', tags: ['Python', 'ML', 'SQL'], category: 'Data Science' },
        { id: 4, title: 'Product Manager', company: 'InnovateTech', location: 'Austin, TX • On-site', salary: '$125,000 - $155,000', tags: ['Agile', 'Research', 'Roadmap'], category: 'Product' },
        { id: 5, title: 'UI/UX Designer', company: 'DesignFirst', location: 'San Francisco, CA • Remote', salary: '$110,000 - $140,000', tags: ['Figma', 'Prototyping'], category: 'Design' },
        { id: 6, title: 'Backend Architect', company: 'CloudBase Systems', location: 'Remote', salary: '$150,000 - $190,000', tags: ['Node.js', 'Go', 'K8s'], category: 'Engineering' },
        { id: 7, title: 'Content Strategist', company: 'Modern Media', location: 'Remote', salary: '$80,000 - $110,000', tags: ['Copywriting', 'SEO'], category: 'Marketing' },
        { id: 8, title: 'ML Engineer', company: 'AIVision', location: 'Boston, MA • On-site', salary: '$140,000 - $175,000', tags: ['PyTorch', 'CV', 'NLP'], category: 'Data Science' },
        { id: 9, title: 'HR Manager', company: 'PeopleFirst', location: 'Chicago, IL • Hybrid', salary: '$95,000 - $130,000', tags: ['Culture', 'Operations'], category: 'Product' },
        { id: 10, title: 'Systems Engineer', company: 'InfraScale', location: 'Remote', salary: '$115,000 - $150,000', tags: ['AWS', 'Linux'], category: 'Engineering' }
    ];

    const filteredJobs = activeFilter === 'All' ? mockJobs : mockJobs.filter(j => j.category === activeFilter);

    return (
        <div className="jobs-preview-page">
            <section className="jobs-header reveal">
                <div className="static-container">
                    <h1>Explore <span>Prime Opportunities</span></h1>
                    <p>Hand-picked roles from top-tier companies. Sign in to view full details and apply.</p>
                </div>
            </section>

            <section className="jobs-filters reveal stagger-1">
                <div className="static-container">
                    <div className="filter-chips">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`chip ${activeFilter === cat ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="jobs-grid-section">
                <div className="static-container">
                    <div className="jobs-masonry">
                        {filteredJobs.map((job, idx) => (
                            <div key={job.id} className={`job-card reveal stagger-${(idx % 5) + 1} scale-hover`}>
                                <div className="job-card-header">
                                    <div className="company-logo-placeholder">{job.company[0]}</div>
                                    <div className="header-text">
                                        <h3>{job.title}</h3>
                                        <p>{job.company}</p>
                                    </div>
                                </div>
                                <div className="job-tags">
                                    {job.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                </div>
                                <div className="job-info-row">
                                    <span>📍 {job.location}</span>
                                    <span>💰 {job.salary}</span>
                                </div>
                                <button onClick={() => navigate('/hire/login')} className="btn-apply-lock">
                                    <span className="lock-icon">🔒</span> View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JobsPreview;
