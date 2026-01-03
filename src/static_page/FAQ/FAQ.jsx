import api from '../../api/api';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageContent, setPageContent] = useState({
        faqs: [],
        hero: {},
        supportPanel: {},
        systemStatus: {}
    });
    const [loading, setLoading] = useState(true);

    const defaultFaqs = [
        {
            q: "How do credits work exactly?",
            a: "Credits are our platform's focus currency. Each credit allows you to perform one 'Platinum Action'—like sending a professionally-enhanced application, requesting an expert review, or initiating a direct employer chat. They never expire and rollover month-to-month.",
            cat: "Payments"
        },
        {
            q: "Does Jeenora guarantee a job?",
            a: "While we can't guarantee a final offer (that depends on the interview!), we do guarantee transparency and high-intent matching. Our users see a 78% response rate compared to the 15% industry average on traditional sites.",
            cat: "General"
        },
        {
            q: "What is an Expert Support Score?",
            a: "Our professional team analyzes your profile against the job's hidden requirements. We identify missing skills, assess cultural fit, and provide you with a support-backed selection probability before you apply.",
            cat: "Technology"
        },
        {
            q: "Is my personal data encrypted?",
            a: "Absolutely. We use military-grade AES-256 encryption. Employers only see the data you choose to share in your platinum profile, and we never sell your PII to third parties.",
            cat: "Security"
        }
    ];

    const defaultHero = {
        title: "Common Questions",
        subtitle: "Get answers to common questions about our pricing and plans",
        badge: "Help Center"
    };

    const defaultSupportPanel = {
        title: "Need more clarity?",
        description: "Our dedicated support team is available 24/7 for instant credit and platform queries.",
        buttonText: "Chat with Live Support"
    };

    const defaultSystemStatus = {
        title: "System Status",
        status: "All Platforms Operational"
    };

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get('/hire/static/faq');
                if (response.data && response.data.content) {
                    setPageContent({
                        faqs: response.data.content.faqs || defaultFaqs,
                        hero: response.data.content.hero || defaultHero,
                        supportPanel: response.data.content.supportPanel || defaultSupportPanel,
                        systemStatus: response.data.content.systemStatus || defaultSystemStatus
                    });
                } else {
                    setPageContent({
                        faqs: defaultFaqs,
                        hero: defaultHero,
                        supportPanel: defaultSupportPanel,
                        systemStatus: defaultSystemStatus
                    });
                }
            } catch (error) {
                console.error('Failed to fetch FAQ content:', error);
                setPageContent({
                    faqs: defaultFaqs,
                    hero: defaultHero,
                    supportPanel: defaultSupportPanel,
                    systemStatus: defaultSystemStatus
                });
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const faqs = pageContent.faqs.length > 0 ? pageContent.faqs : defaultFaqs;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-up, .fade-up-blur, .bounce-in').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [searchTerm]);

    const filteredFaqs = faqs.filter(f =>
        f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.cat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="pb-20 mesh-bg">
            <section className="py-20 text-center reveal-up">
                <div className="max-w-[1200px] mx-auto px-8 w-full">
                    <span className="inline-flex items-center gap-2 bg-blue-900/10 text-primary px-5 py-2 rounded-full font-extrabold text-[0.85rem] uppercase tracking-widest mb-8 border border-blue-900/20">
                        {pageContent.hero.badge || "Help Center"}
                    </span>
                    <h1 className="text-6xl font-black mb-12 tracking-tighter">
                        {(pageContent.hero.title && pageContent.hero.title.split(' ')[0]) || "Common"}
                        <span> {(pageContent.hero.title && pageContent.hero.title.split(' ').slice(1).join(' ')) || "Questions"}</span>
                    </h1>

                    <div className="max-w-2xl mx-auto relative group">
                        <input
                            type="text"
                            placeholder="Search keywords (e.g., Credits, Support, Privacy)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-10 py-6 rounded-full border border-slate-200 bg-white shadow-lg text-lg outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all pr-12"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl opacity-30">🔍</div>
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <div className="max-w-[1200px] mx-auto px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
                        <div className="flex flex-col gap-6">
                            {filteredFaqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className={`bg-white rounded-3xl border border-slate-100 cursor-pointer overflow-hidden transition-all duration-400 reveal-up stagger-${i + 1}
                                        ${activeIndex === i ? 'ring-2 ring-primary/20 shadow-xl' : 'hover:border-primary hover:shadow-lg'}`}
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                >
                                    <div className="p-10 flex justify-between items-center gap-5">
                                        <div className="flex flex-col gap-3">
                                            <span className="bg-slate-50 text-slate-400 px-3 py-1 rounded-lg font-black text-[0.7rem] uppercase w-fit inline-block leading-none">
                                                {faq.cat}
                                            </span>
                                            <h3 className="text-xl font-black text-text-dark leading-tight">{faq.q}</h3>
                                        </div>
                                        <div className={`shrink-0 w-8 h-8 relative transition-transform duration-400 ${activeIndex === i ? 'rotate-45' : ''}`}>
                                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary -translate-y-1/2"></div>
                                            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-primary -translate-x-1/2"></div>
                                        </div>
                                    </div>
                                    <div className={`grid transition-all duration-500 ease-premium ${activeIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <p className="px-10 pb-10 text-text-light font-bold text-lg leading-relaxed italic border-t border-slate-50 pt-8 mt-2">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-8">
                            <div className="p-12 rounded-[2.5rem] text-center glass-panel shadow-2xl border border-white/30 tilt-card bounce-in active">
                                <h3 className="text-2xl font-black mb-6">{pageContent.supportPanel.title || "Need more clarity?"}</h3>
                                <p className="text-text-light font-bold mb-8 leading-relaxed">{pageContent.supportPanel.description || "Our dedicated support team is available 24/7 for instant credit and platform queries."}</p>
                                <button className="w-full py-4 bg-primary text-white rounded-full font-black text-lg hover:shadow-xl hover:bg-blue-700 transition-all btn-press border-none">{pageContent.supportPanel.buttonText || "Chat with Live Support"}</button>
                            </div>

                            <div className="p-8 rounded-3xl bg-slate-900 text-white reveal-up stagger-3">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse-soft"></div>
                                    <span className="font-bold text-sm uppercase tracking-widest text-slate-400">{pageContent.systemStatus.title || "System Status"}</span>
                                </div>
                                <p className="font-black text-xl">{pageContent.systemStatus.status || "All Platforms Operational"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;

