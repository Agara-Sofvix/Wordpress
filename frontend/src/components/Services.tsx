import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceModal from './ServiceModal';
import { getAssetPath } from '../utils/assets';

const serviceDetails: Record<string, { icon: string; color: string; bg: string; image: string; features: string[] }> = {
    "Web & App Development": {
        icon: "language",
        color: "text-primary",
        bg: "bg-primary/10",
        image: getAssetPath("/assets/services/web_app_dev_service.png"),
        features: [
            "Custom Responsive Web Applications",
            "Native & Cross-Platform Mobile Apps",
            "High-Conversion UI/UX Research & Design",
            "E-commerce & Dynamic Content Management",
            "API Integration & Performance Optimization"
        ]
    },
    "SaaS Product Development": {
        icon: "layers",
        color: "text-accent-green",
        bg: "bg-accent-green/10",
        image: getAssetPath("/assets/services/saas_product_service_1771580811262.png"),
        features: [
            "Multi-tenant Architecture Scalability",
            "Subscription & Stripe Payment Systems",
            "Automated Workflow & Data Analytics",
            "Customer Success & Admin Portals",
            "Security Compliance & Data Redundancy"
        ]
    },
    "SEO & Digital Growth": {
        icon: "query_stats",
        color: "text-primary",
        bg: "bg-primary/10",
        image: getAssetPath("/assets/services/seo_growth_service_1771580833874.png"),
        features: [
            "Technical SEO Audits & Speed Fixes",
            "Content Strategy & Authority Building",
            "Conversion Rate Optimization (CRO)",
            "Advanced Keyword Competitive Research",
            "Lead Capture & Sales Funnel Engineering"
        ]
    },
    "Server & OS Installation": {
        icon: "terminal",
        color: "text-primary",
        bg: "bg-primary/10",
        image: getAssetPath("/assets/services/server_os_service_1771580856165.png"),
        features: [
            "Enterprise Linux/Windows Server Setup",
            "Network Security & Firewall Config",
            "Automated Backup & Disaster Recovery",
            "Cloud Migration & Hybrid Integration",
            "Proactive Health Monitoring Systems"
        ]
    },
    "IT Support & Maintenance": {
        icon: "engineering",
        color: "text-accent-green",
        bg: "bg-accent-green/10",
        image: getAssetPath("/assets/services/it_support_service_1771580873150.png"),
        features: [
            "24/7 Remote Desktop & Tech Support",
            "Zero-Downtime Security Patching",
            "Hardware Troubleshooting & Upgrades",
            "IT Policy & Compliance Management",
            "Staff Training & IT Strategy Roadmap"
        ]
    }
};

const Services: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
            setScrollProgress(progress);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            // Initial progress
            handleScroll();
        }
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const scrollAmount = containerRef.current.clientWidth > 1024 ? 352 + 32 : 320 + 32;
            containerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const openModal = (name: string) => {
        setSelectedService(name);
        setIsModalOpen(true);
    };

    return (
        <section className="py-16 md:py-32 bg-[#f8fafc] relative overflow-hidden" id="services">
            <div className="absolute inset-0 light-grid opacity-30"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-64"></div>
            <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-20 text-center mb-10 md:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-navy-deep tracking-tight">Custom Software &amp; IT Solutions in <span className="text-primary">Chennai</span></h2>
                <p className="text-[#616f89] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">Specialized engineering services: Web Development in Tharamani, SEO in Velachery, and SaaS Product Architectures tailored for global success.</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-20 relative group">
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-4 lg:left-4 top-1/2 -translate-y-1/2 z-30 size-12 bg-white/80 backdrop-blur shadow-lg border border-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden lg:flex"
                >
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-4 lg:right-4 top-1/2 -translate-y-1/2 z-30 size-12 bg-white/80 backdrop-blur shadow-lg border border-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden lg:flex"
                >
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>

                <div className="overflow-hidden">
                    <div
                        ref={containerRef}
                        className="flex flex-col md:flex-row md:overflow-x-auto hide-scrollbar md:snap-x md:snap-mandatory py-4 md:py-8 gap-6 md:gap-8 items-stretch scroll-smooth"
                    >
                        {Object.entries(serviceDetails).map(([name, data]) => (
                            <div
                                key={name}
                                className="service-card-glass rounded-[2.5rem] snap-center shrink-0 group/card cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-primary/20 w-full md:w-[320px] lg:w-[352px] flex flex-col overflow-hidden"
                                onClick={() => openModal(name)}
                            >
                                <div className="h-56 w-full overflow-hidden relative">
                                    <img src={data.image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
                                    <div className="absolute bottom-6 left-10">
                                        <div className={`size-14 ${data.bg} backdrop-blur-md ${data.color} rounded-2xl flex items-center justify-center border border-primary/20 shadow-lg`}>
                                            <span className="material-symbols-outlined text-3xl">{data.icon}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-10 pt-4 flex flex-col gap-6 flex-grow">
                                    <div className="space-y-4 flex-grow">
                                        <h3 className="text-2xl font-extrabold text-navy-deep tracking-tight">{name}</h3>
                                        <p className="text-gray-600 leading-relaxed text-[1rem]">Professional {name.toLowerCase()} tailored for your business success and growth.</p>
                                    </div>
                                    <div className="pt-4 border-t border-navy-deep/5 flex justify-between items-center group/more">
                                        <span className={`text-xs font-mono font-bold ${data.color} tracking-widest uppercase`}>System Layer</span>
                                        <span className={`material-symbols-outlined ${data.color} transform transition-transform group-hover/more:translate-x-1`}>arrow_right_alt</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="min-w-[280px] w-full md:w-[320px] lg:w-[352px] shrink-0 relative group snap-center">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-tech-blue to-accent-green rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative h-full bg-navy-deep p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center text-white gap-8 overflow-hidden">
                                <div className="absolute top-0 right-0 -mr-20 -mt-20 size-64 bg-primary/20 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-64 bg-accent-green/20 rounded-full blur-3xl"></div>
                                <div className="size-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                                    <span className="material-symbols-outlined text-4xl text-tech-blue">rocket_launch</span>
                                </div>
                                <div className="space-y-3 relative z-10">
                                    <h3 className="text-3xl font-extrabold leading-tight">Ready to start?</h3>
                                    <p className="text-white/70 text-lg">Let's build something extraordinary together.</p>
                                </div>
                                <Link to="/contact" className="relative w-full py-5 bg-gradient-to-r from-primary to-tech-blue text-white rounded-2xl font-extrabold text-lg shadow-[0_10px_30px_rgba(19,91,236,0.3)] hover:shadow-[0_15px_40px_rgba(19,91,236,0.5)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95 group/btn">
                                    Consult Now
                                    <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-12">
                    <div className="scroll-progress-container w-[200px] h-[2px] bg-primary/10 rounded-full overflow-hidden">
                        <div
                            className="scroll-progress-bar h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${Math.max(10, scrollProgress)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceData={selectedService ? { name: selectedService, ...serviceDetails[selectedService] } : null}
            />
        </section>
    );
};

export default Services;
