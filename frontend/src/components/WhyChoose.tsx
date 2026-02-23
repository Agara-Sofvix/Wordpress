import React from 'react';

const WhyChoose: React.FC = () => {
    return (
        <section className="py-24 px-6 lg:px-20 bg-[#f1f5f9] relative overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-40"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-deep tracking-tight">Why Choose Agara-Sofvix</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
                    <div className="lg:col-span-8 bento-card-blue rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row gap-8 items-center group overflow-hidden border border-primary/20 bg-white/40 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:bg-white/60">
                        <div className="flex-1 space-y-4">
                            <div className="inline-flex px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-2 tracking-widest uppercase">Value Driven</div>
                            <h3 className="font-extrabold text-2xl lg:text-3xl text-navy-deep leading-tight">Business-focused solutions</h3>
                            <p className="text-gray-500 text-base leading-relaxed">We understand ROI. Every line of code is written to solve specific business problems and drive growth. We don't just build software; we build revenue engines.</p>
                        </div>
                        <div className="flex-shrink-0 icon-3d-wrapper">
                            <div className="size-32 lg:size-40 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/20 flex items-center justify-center shadow-inner relative overflow-hidden icon-3d transition-transform duration-500">
                                <span className="material-symbols-outlined text-6xl lg:text-7xl text-primary font-light">monitoring</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-1 lg:col-span-4 bento-card-green rounded-3xl p-8 flex flex-col justify-between group border border-accent-green/20 bg-white/40 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-green/10 hover:bg-white/60">
                        <div className="icon-3d-wrapper mb-8">
                            <div className="size-16 bg-accent-green/10 rounded-2xl flex items-center justify-center border border-accent-green/20 icon-3d">
                                <span className="material-symbols-outlined text-4xl text-accent-green">bolt</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-extrabold text-xl text-navy-deep mb-3">Fast execution</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Our small, elite expert team cuts through bureaucracy to deliver high-quality results at startup speed.</p>
                        </div>
                    </div>

                    <div className="md:col-span-1 lg:col-span-4 bento-card-blue rounded-3xl p-8 flex flex-col justify-between group border border-primary/20 bg-white/40 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:bg-white/60">
                        <div className="icon-3d-wrapper mb-8">
                            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 icon-3d">
                                <span className="material-symbols-outlined text-4xl text-primary">hub</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-extrabold text-xl text-navy-deep mb-3">One partner for all IT needs</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">From web &amp; SaaS to SEO and infrastructure—simplify your operations with a single trusted engineering partner.</p>
                        </div>
                    </div>

                    <div className="lg:col-span-8 bento-card-green rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row-reverse gap-8 items-center group overflow-hidden border border-accent-green/20 bg-white/40 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-green/10 hover:bg-white/60">
                        <div className="flex-1 space-y-4">
                            <div className="inline-flex px-3 py-1 bg-accent-green/10 text-accent-green text-xs font-bold rounded-full mb-2 tracking-widest uppercase">Scalable Economy</div>
                            <h3 className="font-extrabold text-2xl lg:text-3xl text-navy-deep leading-tight">Affordable &amp; scalable plans</h3>
                            <p className="text-gray-500 text-base leading-relaxed">Premium technical expertise made accessible through flexible service plans that grow as your business grows. No massive upfront costs, just sustainable scaling.</p>
                        </div>
                        <div className="flex-shrink-0 icon-3d-wrapper">
                            <div className="size-32 lg:size-40 bg-gradient-to-br from-accent-green/10 to-accent-green/5 rounded-3xl border border-accent-green/20 flex items-center justify-center shadow-inner relative overflow-hidden icon-3d transition-transform duration-500">
                                <span className="material-symbols-outlined text-6xl lg:text-7xl text-accent-green font-light">database_upload</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-wrap justify-center gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/40 backdrop-blur-md border border-white/60 px-8 py-4 rounded-3xl sm:rounded-full shadow-sm">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-accent-green font-bold">check_circle</span>
                            <span className="text-sm font-bold text-navy-deep">Direct Expert Access</span>
                        </div>
                        <div className="w-px h-4 bg-navy-deep/10 hidden sm:block"></div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-accent-green font-bold">check_circle</span>
                            <span className="text-sm font-bold text-navy-deep">No Hidden Fees</span>
                        </div>
                        <div className="w-px h-4 bg-navy-deep/10 hidden sm:block"></div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-accent-green font-bold">check_circle</span>
                            <span className="text-sm font-bold text-navy-deep">Weekly Progress Reports</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
