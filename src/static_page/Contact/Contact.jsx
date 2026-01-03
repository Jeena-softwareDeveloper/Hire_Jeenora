import React, { useState, useEffect } from 'react';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle, sending, success

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-up, .bounce-in, .fade-up-blur').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('success'), 2000);
    };

    return (
        <div className="pb-20 mesh-bg">
            <section className="py-20 text-center reveal-up">
                <div className="max-w-[1200px] mx-auto px-8 w-full">
                    <span className="inline-flex items-center gap-2 bg-blue-900/10 text-primary px-5 py-2 rounded-full font-extrabold text-[0.85rem] uppercase tracking-widest mb-8 border border-blue-900/20 shadow-sm">
                        Connect with jeenora
                    </span>
                    <h1 className="text-7xl font-black mb-8 tracking-tighter italic">Human <span>First</span> Support</h1>
                    <p className="text-xl text-text-light max-w-2xl mx-auto leading-relaxed">
                        Whether you're a candidate looking for a career pivot or an employer seeking precision matching, our team is ready.
                    </p>
                </div>
            </section>

            {/* Support Cards */}
            <section className="pb-16">
                <div className="max-w-[1200px] mx-auto px-8 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="group p-12 bg-white rounded-[2.5rem] text-center border border-slate-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-primary reveal-up stagger-1 shadow-sm">
                            <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">📧</div>
                            <h3 className="text-xl font-black mb-4">Direct Query</h3>
                            <p className="text-text-light font-bold mb-6">Standard support response within 24 business hours.</p>
                            <span className="text-primary font-black">support@jeenora.com</span>
                        </div>

                        <div className="group p-12 bg-blue-50/30 rounded-[2.5rem] text-center border border-primary/20 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-primary reveal-up stagger-2 shadow-sm">
                            <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">⚡</div>
                            <h3 className="text-xl font-black mb-4 group-hover:text-primary transition-colors">Platinum Chat</h3>
                            <p className="text-text-light font-bold mb-6">Direct access for users with active credits.</p>
                            <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-900/20">Active Credits Req</span>
                        </div>

                        <div className="group p-12 bg-white rounded-[2.5rem] text-center border border-slate-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-primary reveal-up stagger-3 shadow-sm">
                            <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">🏢</div>
                            <h3 className="text-xl font-black mb-4">Visit Office</h3>
                            <p className="text-text-light font-bold mb-6">Experience our tech stack at our HQ.</p>
                            <span className="text-primary font-black">Bangalore, India</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="max-w-[1200px] mx-auto px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-24 p-12 md:p-20 rounded-[3rem] glass-panel border border-white/30 shadow-2xl reveal-up stagger-4">
                    <div className="space-y-10">
                        <h2 className="text-4xl font-black tracking-tight leading-none text-text-dark">Send a <span>Priority</span> Ticket</h2>
                        <p className="text-lg text-text-light font-bold leading-relaxed">Our support team will route your query to the correct professional for a personalized response instantly.</p>

                        <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100 w-fit shadow-sm">
                            <div className="w-4 h-4 bg-secondary rounded-full animate-pulse-soft"></div>
                            <span className="text-sm font-black text-text-dark uppercase tracking-widest">Live ETA: <strong className="text-secondary ml-1">14 Mins</strong></span>
                        </div>
                    </div>

                    <div className="bg-white/50 p-8 md:p-12 rounded-[2rem] border border-white shadow-inner">
                        {status === 'success' ? (
                            <div className="text-center py-16 space-y-6 bounce-in h-full flex flex-col justify-center">
                                <div className="w-24 h-24 bg-secondary text-white rounded-full flex items-center justify-center text-5xl mx-auto shadow-xl shadow-green-500/20">✓</div>
                                <h3 className="text-3xl font-black text-text-dark">Message Dispatched</h3>
                                <p className="text-lg text-text-light font-bold">Your ticket #JN-{Math.floor(Math.random() * 9000) + 1000} is now in triage.</p>
                                <button onClick={() => setStatus('idle')} className="text-primary font-black text-lg underline hover:text-blue-700 cursor-pointer bg-transparent border-none">Reset Form</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="block text-sm font-black text-text-dark uppercase tracking-widest">Your Name</label>
                                        <input required type="text" className="w-full p-5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:-translate-y-1 transition-all text-lg font-bold" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-black text-text-dark uppercase tracking-widest">Email Address</label>
                                        <input required type="email" className="w-full p-5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:-translate-y-1 transition-all text-lg font-bold" placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-sm font-black text-text-dark uppercase tracking-widest">Inquiry Type</label>
                                    <select className="w-full p-5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:-translate-y-1 transition-all text-lg font-bold cursor-pointer appearance-none">
                                        <option>Candidate Support</option>
                                        <option>Employer Inquiries</option>
                                        <option>Credit & Payments</option>
                                        <option>Report a Bug</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-sm font-black text-text-dark uppercase tracking-widest">Message Content</label>
                                    <textarea required rows="5" className="w-full p-5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:-translate-y-1 transition-all text-lg font-bold resize-none" placeholder="Explain your query in detail..."></textarea>
                                </div>
                                <button
                                    disabled={status === 'sending'}
                                    className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-primary hover:scale-[1.02] shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none"
                                >
                                    {status === 'sending' ? 'Triage in Progress...' : 'Dispatch Ticket'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

