import React from 'react';

const About: React.FC = () => {
    return (
        <div id="about">
            {/* Hero Section */}
            <section className="relative bg-background-dark min-h-[60vh] flex items-center pt-40 overflow-hidden">
                <div className="absolute inset-0 engineering-grid"></div>
                <div className="absolute inset-0 hero-glow"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10 py-20 text-center">
                    <h1 className="font-structure text-white text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8">
                        Who We <span className="text-gradient-lime-cyan">Are</span>
                    </h1>
                    <p className="text-white/80 text-base sm:text-lg lg:text-2xl font-medium leading-relaxed max-w-5xl mx-auto">
                        Agara-Sofvix is a technology solutions company focused on helping businesses succeed in the digital
                        world. We combine software engineering, cloud infrastructure, and digital marketing to deliver
                        complete business systems — not just websites or apps. Our team consists of engineers, developers,
                        and strategists who understand how technology impacts business operations, sales, and scalability.
                    </p>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="py-24 px-6 lg:px-20 bg-white relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 order-2 lg:order-1">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-deep leading-tight">
                                Expertise that
                                drives <span className="text-primary">scalability.</span></h2>
                            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed">
                                Agara-Sofvix is a technology solutions company focused on helping businesses succeed in the
                                digital world. We combine software engineering, cloud infrastructure, and digital marketing
                                to deliver complete business systems — not just websites or apps. Our team consists of
                                engineers, developers, and strategists who understand how technology impacts business
                                operations, sales, and scalability.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div>
                                    <h4 className="text-3xl font-extrabold text-navy-deep">100%</h4>
                                    <p className="text-slate-500 text-sm font-medium">Engineering-Driven</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-extrabold text-navy-deep">24/7</h4>
                                    <p className="text-slate-500 text-sm font-medium">Technical Support</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative order-1 lg:order-2">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
                                <img alt="Team Engineering" className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFUVS7OyupW8PT7H5KzWjuZHuyG0B2dHGh-FKyynDX7FdMYsaeMv8m6avUmMh78xQcqKR4D-kYXj5Xy6S2wAFQsadqpcRDsaoDwU7J2TS8a8nBNwFYVAkWc8KYcdpXD46xWM69khce50orSk3bJDSdd4mtkHAjXjU02-yCLPZxegDFx48_BHY6IxdQcEGRf9vXcyUUpNZGR8OvQWq4qBEAqdaiBwlUgBWj4S92WdaKFjTEhI_FS8FcdjZR1F6OeOKjC7eUCMDC-M5x" />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent"></div>
                                <div
                                    className="absolute bottom-6 left-6 right-6 glass-bento p-6 rounded-2xl border border-white/20">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 bg-neon-green/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-neon-green">groups</span>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">Collaborative Excellence</p>
                                            <p className="text-white/60 text-xs font-mono">CORE_TEAM_SYNC_ACTIVE</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-6 -right-6 size-32 bg-tech-blue/20 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-24 px-6 lg:px-20 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 light-grid opacity-30"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div
                            className="glass-card-light rounded-3xl p-10 lg:p-14 shadow-sm hover:shadow-xl transition-all duration-500 group">
                            <div
                                className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-500">
                                <span
                                    className="material-symbols-outlined text-4xl text-primary group-hover:text-white">rocket_launch</span>
                            </div>
                            <h3 className="text-3xl font-extrabold text-navy-deep mb-6">Our Mission</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                To provide reliable, affordable, and scalable digital and IT solutions that help businesses
                                grow, automate, and compete in the modern market.
                            </p>
                        </div>
                        <div
                            className="glass-card-light rounded-3xl p-10 lg:p-14 shadow-sm hover:shadow-xl transition-all duration-500 group">
                            <div
                                className="size-16 bg-accent-green/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent-green transition-colors duration-500">
                                <span
                                    className="material-symbols-outlined text-4xl text-accent-green group-hover:text-white">visibility</span>
                            </div>
                            <h3 className="text-3xl font-extrabold text-navy-deep mb-6">Our Vision</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                To become a trusted technology partner for SMEs, startups, and industrial businesses across
                                India and globally.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-slate-100 to-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 light-grid opacity-40"></div>
                <div className="absolute inset-0 circuit-pattern opacity-10"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-navy-deep tracking-tight">Our Core
                            Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-auto">
                        <div
                            className="lg:col-span-7 bento-glass rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 group transition-all duration-500">
                            <div className="relative shrink-0">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110"></div>
                                <span
                                    className="material-symbols-outlined text-6xl sm:text-[80px] text-primary relative z-10 block group-hover:rotate-180 transition-transform duration-1000">settings_suggest</span>
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-deep mb-3">Engineering excellence
                                </h3>
                                <p className="text-slate-600 text-base sm:text-lg">Technical precision in every line of code. We
                                    build robust
                                    systems designed for high-performance and future-proof reliability.</p>
                            </div>
                        </div>
                        <div
                            className="lg:col-span-5 bento-glass rounded-3xl p-6 sm:p-10 flex flex-col justify-center group transition-all duration-500">
                            <div className="mb-6">
                                <span
                                    className="material-symbols-outlined text-5xl sm:text-6xl text-primary opacity-80 group-hover:opacity-100 transition-opacity">verified</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-navy-deep mb-3">Honesty and transparency</h3>
                            <p className="text-slate-600 text-base">Clear communication and realistic expectations in everything
                                we do.
                            </p>
                        </div>
                        <div
                            className="lg:col-span-4 bento-glass rounded-3xl p-6 sm:p-10 flex flex-col justify-between group transition-all duration-500">
                            <div className="mb-6 flex justify-end">
                                <span
                                    className="material-symbols-outlined text-6xl sm:text-7xl text-primary opacity-80 group-hover:scale-110 transition-transform">monitoring</span>
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-deep mb-2">Customer success first
                                </h3>
                                <p className="text-slate-600 text-base">Your growth is our primary metric for success.</p>
                            </div>
                        </div>
                        <div
                            className="lg:col-span-4 bento-glass rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center group transition-all duration-500">
                            <div
                                className="size-16 sm:size-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary">handshake</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-extrabold text-navy-deep mb-3 leading-tight">Long-term
                                partnerships</h3>
                            <p className="text-slate-600 text-sm">Growing together over months and years as a trusted ally.</p>
                        </div>
                        <div
                            className="lg:col-span-4 bento-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-center group transition-all duration-500 overflow-hidden relative">
                            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span
                                    className="material-symbols-outlined text-[100px] sm:text-[150px] text-primary">trending_up</span>
                            </div>
                            <div className="relative z-10">
                                <span
                                    className="material-symbols-outlined text-4xl sm:text-5xl text-primary mb-4 block">cycle</span>
                                <h3 className="text-lg sm:text-xl font-extrabold text-navy-deep mb-2">Continuous improvement
                                </h3>
                                <p className="text-slate-600 text-sm">Always evolving with the tech landscape to deliver
                                    cutting-edge solutions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
