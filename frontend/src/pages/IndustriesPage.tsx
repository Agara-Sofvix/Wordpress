import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Industry {
    name: string;
    icon: string;
    color: string;
    bg: string;
    description: string;
    details: string[];
}

const industryData: Record<string, Industry> = {
    "Startups": {
        name: "Startups",
        icon: "rocket_launch",
        color: "text-primary",
        bg: "bg-primary/10",
        description: "Affordable web development for startups in Chennai. Rapid prototyping, MVP development, and scalable cloud architectures to turn your vision into a market-ready product.",
        details: [
            "Rapid MVP Development in Velachery",
            "Scalable Cloud Architecture & DevOps",
            "Startup IT Services Chennai Excellence",
            "Investor-Ready Pitch Deck Technical Support",
            "Agile Feature Iterations & Growth Systems"
        ]
    },
    "SMEs": {
        name: "SMEs",
        icon: "storefront",
        color: "text-accent-green",
        bg: "bg-accent-green/10",
        description: "Website development for small business and SMEs. Digital transformation strategies and automated systems designed to optimize operations in Chennai.",
        details: [
            "Custom CRM & Internal Operations Portals",
            "Automated Billing & Inventory Systems",
            "SME Business Website Development Chennai",
            "Legacy System Modernization",
            "Cybersecurity Audits & Data Protection"
        ]
    },
    "Industrial": {
        name: "Industrial",
        icon: "factory",
        color: "text-tech-blue",
        bg: "bg-tech-blue/10",
        description: "Robust IoT solutions, inventory management, and technical infrastructure built for heavy industry environments.",
        details: [
            "Industrial IoT (IIoT) Sensor Integration",
            "Predictive Maintenance Dashboards",
            "Warehouse Management Systems (WMS)",
            "Fleet Tracking & Logistics Optimization",
            "Energy Efficiency Monitoring Systems"
        ]
    },
    "Service": {
        name: "Service",
        icon: "support_agent",
        color: "text-primary",
        bg: "bg-primary/10",
        description: "Custom booking systems, CRM integrations, and digital platforms to streamline client interactions and deliveries.",
        details: [
            "Automated Booking & Scheduling Engines",
            "Client Lifecycle Management Tools",
            "Service Delivery Automation",
            "Integrated Payment Gateways",
            "Review Management & Automated Follow-ups"
        ]
    },
    "IT & Eng": {
        name: "IT & Eng",
        icon: "terminal",
        color: "text-accent-green",
        bg: "bg-accent-green/10",
        description: "Specialized technical consulting, DevOps support, and complex backend engineering for other technology entities.",
        details: [
            "Complex Backend Engineering & API Design",
            "Security Framework Implementation",
            "High-Availability Server Operations",
            "Specialized Technical Consulting",
            "Cross-Platform System Integration"
        ]
    },
    "Manufacturing": {
        name: "Manufacturing",
        icon: "precision_manufacturing",
        color: "text-tech-blue",
        bg: "bg-tech-blue/10",
        description: "Smart factory solutions, supply chain visibility platforms, and automated production tracking systems.",
        details: [
            "Smart Factory Real-time Monitoring",
            "Supply Chain Visibility Platforms",
            "Quality Control Automation Systems",
            "Production Line Efficiency Analytics",
            "Custom ERP (Enterprise Resource Planning)"
        ]
    }
};

import SEO from '../components/SEO';

const IndustriesPage: React.FC = () => {
    const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);

    return (
        <div className="bg-background-dark min-h-screen">
            <SEO pageSlug="industries" />
            {/* Hero Section */}
            <section className="relative bg-background-dark min-h-[50vh] flex items-center pt-40 overflow-hidden">
                <div className="absolute inset-0 engineering-grid"></div>
                <div className="absolute inset-0 hero-glow"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10 py-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-structure text-white text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8"
                    >
                        Industries We <span className="text-gradient-lime-cyan">Serve</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/80 text-base sm:text-lg lg:text-2xl font-medium leading-relaxed max-w-4xl mx-auto"
                    >
                        Agara Sofvix is a leading **software company for SMEs in Chennai** and provider of **startup IT solutions in Tharamani and Velachery**. We build specialized digital systems focusing on technical excellence and operational efficiency.
                    </motion.p>
                </div>
            </section>

            {/* Industries Grid */}
            <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 light-grid opacity-20"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {Object.values(industryData).map((industry) => (
                            <motion.div
                                key={industry.name}
                                whileHover={{ y: -8 }}
                                onClick={() => setSelectedIndustry(industry)}
                                className="relative group h-full cursor-pointer"
                            >
                                <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-tech-blue/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-duration-500"></div>
                                <div className="relative h-full bento-glass rounded-3xl p-6 md:p-10 overflow-hidden flex flex-col justify-between transition-all duration-500 border border-white/20 hover:ring-2 hover:ring-primary/20">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <span className="material-symbols-outlined text-[120px]">{industry.icon}</span>
                                    </div>
                                    <div className="relative z-10">
                                        <div className={`size-16 ${industry.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:${industry.color === 'text-primary' ? 'bg-primary' : industry.color === 'text-accent-green' ? 'bg-accent-green' : 'bg-tech-blue'} group-hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/5`}>
                                            <span className={`material-symbols-outlined text-4xl ${industry.color} group-hover:text-white transition-colors`}>{industry.icon}</span>
                                        </div>
                                        <h3 className="text-3xl font-extrabold text-navy-deep mb-4 tracking-tight">{industry.name}</h3>
                                        <p className="text-slate-600 leading-relaxed text-lg">{industry.description}</p>
                                    </div>
                                    <div className="mt-8 flex items-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                                        <span>Learn More</span>
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {selectedIndustry && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedIndustry(null)}
                            className="absolute inset-0 bg-background-dark/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[2rem] p-6 sm:p-10 border border-primary/10 shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            <button
                                onClick={() => setSelectedIndustry(null)}
                                className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-navy-deep/5 hover:bg-navy-deep/10 text-navy-deep transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <div className="flex items-center gap-6 mb-8">
                                <div className={`size-20 ${selectedIndustry.bg} rounded-[1.8rem] flex items-center justify-center border border-primary/5`}>
                                    <span className={`material-symbols-outlined text-4xl ${selectedIndustry.color}`}>{selectedIndustry.icon}</span>
                                </div>
                                <div>
                                    <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Industry Expert Solution</h4>
                                    <h2 className="text-3xl font-extrabold text-navy-deep tracking-tight">{selectedIndustry.name}</h2>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    We deliver high-performance specialized technical solutions for the {selectedIndustry.name} sector, focusing on scalability and reliability.
                                </p>
                                <ul className="grid sm:grid-cols-1 gap-3">
                                    {selectedIndustry.details.map((item, idx) => (
                                        <motion.li
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            key={idx}
                                            className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 hover:border-primary/20 transition-all"
                                        >
                                            <span className="material-symbols-outlined text-primary">verified_user</span>
                                            <span className="font-semibold text-navy-deep/80">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/contact"
                                    className="bg-primary hover:bg-primary/90 text-white flex-1 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20"
                                    onClick={() => setSelectedIndustry(null)}
                                >
                                    Discuss Your Project
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                                <a
                                    href="mailto:info@agara-sofvix.com?subject=Project Inquiry&body=Hi, I would like to discuss a project regarding {selectedIndustry.name}."
                                    className="bg-accent-green/5 hover:bg-accent-green/10 text-accent-green px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
                                >
                                    <span className="material-symbols-outlined text-accent-green">mail</span>
                                    Email Us
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IndustriesPage;
