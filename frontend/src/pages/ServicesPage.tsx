import React from 'react';
import { motion } from 'framer-motion';
import CTA from '../components/CTA';
import SEO from '../components/SEO';
import { getAssetPath } from '../utils/assets';

const DEFAULT_SERVICES = [
    {
        id: 'web-app-development',
        title: 'Custom Web & App Development',
        category: 'Engineering',
        icon: 'language',
        description: 'Premier web development company in Chennai and Tharamani IT Hub, providing custom responsive web applications and native mobile apps designed for high-performance and scalability.',
        features: [
            "Custom Responsive Web Applications",
            "Full Stack Development Company Excellence",
            "High-Conversion UI/UX Research & Design",
            "API Integration & Performance Optimization"
        ],
        image: "/assets/services/web_app_dev_service.png",
        stats: { label: 'Uptime', value: '99.9%' }
    },
    {
        id: 'saas-product-development',
        title: 'SaaS Product Development',
        category: 'Product',
        icon: 'layers',
        description: 'Leading SaaS development company in Chennai building multi-tenant architectures and subscription systems for modern software enterprises in Velachery and Tharamani.',
        features: [
            "Multi-tenant Architecture Scalability",
            "SaaS Product Development Company Expertise",
            "Automated Workflow & Data Analytics",
            "Security Compliance & Data Redundancy"
        ],
        image: "/assets/services/saas_product_service_1771580811262.png",
        stats: { label: 'Security', value: 'Enterprise' }
    },
    {
        id: 'seo-digital-growth',
        title: 'SEO & Digital Marketing Agency',
        category: 'Growth',
        icon: 'query_stats',
        description: 'Best SEO company in Chennai providing technical SEO and conversion rate optimization to turn your digital presence into a lead machine.',
        features: [
            "Technical SEO Audits & Speed Fixes",
            "Content Strategy & Authority Building",
            "Local SEO Services Chennai & Velachery",
            "Advanced Keyword Research"
        ],
        image: "/assets/services/seo_growth_service_1771580833874.png",
        stats: { label: 'Visibility', value: '+300%' }
    },
    {
        id: 'server-os-installation',
        title: 'Server Setup & Cloud Infrastructure',
        category: 'Infrastructure',
        icon: 'terminal',
        description: 'Specialized server setup services in Tharamani and Velachery, offering enterprise cloud infrastructure management for robust business operations in Chennai.',
        features: [
            "Enterprise Linux/Windows Server Setup",
            "Cloud Server Setup for SMEs",
            "Dedicated Server Installation Chennai",
            "Proactive Health Monitoring Systems"
        ],
        image: "/assets/services/server_os_service_1771580856165.png",
        stats: { label: 'Stability', value: 'Tested' }
    },
    {
        id: 'it-support-maintenance',
        title: 'IT Support & Maintenance',
        category: 'Support',
        icon: 'engineering',
        description: '24/7 technical support and proactive maintenance to keep your systems running smoothly.',
        features: [
            "24/7 Remote Desktop & Tech Support",
            "Zero-Downtime Security Patching",
            "Hardware Troubleshooting & Upgrades",
            "Staff Training & IT Strategy Roadmap"
        ],
        image: "/assets/services/it_support_service_1771580873150.png",
        stats: { label: 'Response', value: '< 2 Hours' }
    }
];

const ServicesPage: React.FC = () => {
    return (
        <div className="bg-white">
            <SEO pageSlug="services" />

            {/* Hero Section */}
            <section className="relative bg-background-dark min-h-[50vh] flex items-center pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 engineering-grid"></div>
                <div className="absolute inset-0 hero-glow"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-structure text-white text-4xl sm:text-5xl lg:text-8xl font-bold leading-tight mb-6"
                    >
                        Our <span className="text-gradient-lime-cyan">Services</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/70 text-base sm:text-lg lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto"
                    >
                        Agara Sofvix provides affordable web development for startups and end-to-end IT solutions in Chennai, Velachery, and Tharamani.
                    </motion.p>
                </div>
            </section>

            <div className="divide-y divide-slate-100">
                {DEFAULT_SERVICES.map((service: any, index: number) => (
                    <section
                        key={service.id}
                        id={service.id}
                        className={`py-24 px-6 lg:px-20 relative overflow-hidden scroll-mt-32 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f9fafc]'}`}
                    >
                        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                            <div className={`space-y-8 ${index % 2 !== 0 ? 'order-1 lg:order-2' : ''}`}>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-sm">{service.icon || 'settings'}</span> {service.category || 'Core Service'}
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-deep leading-tight">
                                    {service.title.split(' ').slice(0, -1).join(' ')} <br /><span className="text-primary">{service.title.split(' ').slice(-1)}</span>
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed">{service.description}</p>

                                {service.features && service.features.length > 0 && (
                                    <div className="grid sm:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-lg font-bold text-navy-deep mb-4 flex items-center gap-2">
                                                <span className="size-2 rounded-full bg-primary"></span> Core Features
                                            </h4>
                                            <ul className="space-y-3 text-slate-600">
                                                {service.features.map((feature: string, fIdx: number) => (
                                                    <li key={fIdx} className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span> {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={`relative group ${index % 2 !== 0 ? 'order-2 lg:order-1' : ''}`}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                    className="aspect-video lg:aspect-square rounded-[3rem] overflow-hidden bg-slate-100 shadow-2xl relative"
                                >
                                    <img alt={`${service.title} - Agara Sofvix Chennai`} className="w-full h-full object-cover" src={getAssetPath(service.image || "/assets/services/saas_product_service_1771580811262.png")} />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/20 to-transparent"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 bg-primary/20 blur-[80px]"></div>
                                </motion.div>
                                {service.stats && (
                                    <div className="absolute -bottom-8 -right-8 glass-card-light p-6 rounded-2xl shadow-xl border-primary/10 max-w-[200px] z-20">
                                        <div className="text-xs font-mono text-primary mb-1 uppercase tracking-widest">{service.stats.label || 'METRIC'}</div>
                                        <div className="text-2xl font-black text-navy-deep">{service.stats.value || 'N/A'}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <CTA />
        </div>
    );
};

export default ServicesPage;
