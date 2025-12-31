import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Jobs.css';

const JobsPreview = () => {
    const navigate = useNavigate();

    const mockJobs = [
        {
            id: 1,
            title: 'Senior Software Engineer',
            company: 'Tech Solutions Inc.',
            location: 'Bangalore, India',
            type: 'Full-time',
            salary: '₹12L - ₹25L',
            category: 'Engineering'
        },
        {
            id: 2,
            title: 'Digital Marketing Manager',
            company: 'GrowAlpha',
            location: 'Remote',
            type: 'Contract',
            salary: '₹8L - ₹15L',
            category: 'Marketing'
        },
        {
            id: 3,
            title: 'Product Designer (UI/UX)',
            company: 'DesignFirst',
            location: 'Mumbai, India',
            type: 'Full-time',
            salary: '₹10L - ₹18L',
            category: 'Design'
        },
        {
            id: 4,
            title: 'Data Analyst',
            company: 'Insight Data',
            location: 'Chennai, India',
            type: 'Full-time',
            salary: '₹6L - ₹12L',
            category: 'Data Science'
        }
    ];

    return (
        <div className="jobs-preview-page">
            <section className="jobs-header">
                <div className="static-container">
                    <h1>Current <span>Opportunities</span></h1>
                    <p>Discover roles where you can make an impact. Sign in to apply.</p>
                </div>
            </section>

            <section className="jobs-list">
                <div className="static-container">
                    <div className="jobs-grid">
                        {mockJobs.map(job => (
                            <div key={job.id} className="job-card">
                                <div className="job-badge">{job.category}</div>
                                <h3>{job.title}</h3>
                                <p className="job-company">{job.company}</p>
                                <div className="job-meta">
                                    <span>📍 {job.location}</span>
                                    <span>⏱️ {job.type}</span>
                                    <span>💰 {job.salary}</span>
                                </div>
                                <button onClick={() => navigate('/hire/login')} className="btn-apply-static">View & Apply</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JobsPreview;
