import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CTA from '../components/CTA';
import SEO from '../components/SEO';

const ServicesPage: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/content/services');
            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        } catch (error) {
            console.error('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

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
                        Comprehensive end-to-end technology solutions designed to scale your business, automate workflows,
                        and drive digital transformation.
                    </motion.p>
                </div>
            </section>

            {loading ? (
                <div className="py-20 text-center text-navy-deep font-bold">Recalibrating Service Nodes...</div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {services.map((service, index) => (
                        <section key={service._id} className={`py-24 px-6 lg:px-20 relative overflow-hidden ${index % 2 === 0 ? 'bg-white' : 'bg-[#f9fafc]'}`}>
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
                                        <img alt={service.title} className="w-full h-full object-cover" src={service.image || "/assets/services/saas_product_service_1771580811262.png"} />
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
            )}

            <CTA />
        </div>
    );
};

export default ServicesPage;
