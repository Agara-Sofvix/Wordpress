import React from 'react';

const Process: React.FC = () => {
    return (
        <section className="py-24 px-6 lg:px-20 bg-white relative overflow-hidden" id="process">
            <div className="absolute inset-0 light-grid opacity-20"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <span className="font-mono text-navy-deep/60 text-xs font-bold tracking-[0.3em] uppercase block mb-3">Workflow</span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-deep tracking-tight">How We Work</h2>
                </div>
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-px step-connector hidden lg:block -translate-y-12"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        <div className="relative space-y-6 text-center lg:text-left">
                            <div className="size-14 mx-auto lg:mx-0 rounded-full bg-primary flex items-center justify-center text-white relative z-10 shadow-lg border-4 border-white">
                                <span className="font-mono font-bold text-xl">01</span>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-navy-deep">Understand your business &amp; goals</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">In-depth discovery to align technical strategy with your commercial objectives.</p>
                            </div>
                        </div>
                        <div className="relative space-y-6 text-center lg:text-left">
                            <div className="size-14 mx-auto lg:mx-0 rounded-full bg-accent-green flex items-center justify-center text-white relative z-10 shadow-lg border-4 border-white">
                                <span className="font-mono font-bold text-xl">02</span>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-navy-deep">Design the right technical solution</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">Architecting a custom solution that prioritizes performance, security, and scalability.</p>
                            </div>
                        </div>
                        <div className="relative space-y-6 text-center lg:text-left">
                            <div className="size-14 mx-auto lg:mx-0 rounded-full bg-primary flex items-center justify-center text-white relative z-10 shadow-lg border-4 border-white">
                                <span className="font-mono font-bold text-xl">03</span>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-navy-deep">Build, test &amp; deploy</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">Expert development cycle with rigorous quality assurance and smooth launch protocols.</p>
                            </div>
                        </div>
                        <div className="relative space-y-6 text-center lg:text-left">
                            <div className="size-14 mx-auto lg:mx-0 rounded-full bg-accent-green flex items-center justify-center text-white relative z-10 shadow-lg border-4 border-white">
                                <span className="font-mono font-bold text-xl">04</span>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-navy-deep">Provide ongoing support &amp; scaling</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">Continuous monitoring and updates to ensure your system evolves with your growth.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
