import React from 'react';

const Challenges: React.FC = () => {
    return (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-20 bg-white relative overflow-hidden">
            <div className="absolute inset-0 light-grid opacity-50"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16">
                    <span className="font-mono text-primary text-xs font-bold tracking-[0.3em] uppercase block mb-3">The Challenges</span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-deep mb-4 max-w-2xl">Most businesses struggle because...</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
                    <div className="md:col-span-12 lg:col-span-8 card-white-elegant rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row gap-8 items-center overflow-hidden">
                        <div className="flex-1 space-y-4 text-left">
                            <h3 className="text-2xl lg:text-3xl font-bold text-navy-deep">Slow Performance</h3>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                                Legacy systems and slow load times are causing user frustration and high bounce rates.
                                Speed is the new currency.
                            </p>
                        </div>
                        <div className="flex-1 flex justify-center items-center relative">
                            <div className="relative size-48 lg:size-64">
                                <svg className="size-full" viewBox="0 0 100 100">
                                    <circle className="text-gray-100" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="8"></circle>
                                    <circle className="text-primary gauge-ring" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeLinecap="round" strokeWidth="8"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl lg:text-5xl font-bold text-navy-deep font-mono">98</span>
                                    <span className="text-xs font-mono text-primary font-bold tracking-tighter">PERFORMANCE SCORE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-6 lg:col-span-4 card-white-elegant rounded-3xl p-8 flex flex-col justify-between overflow-hidden">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-accent-green font-bold text-3xl">trending_up</span>
                                <h3 className="text-xl font-bold text-navy-deep">Low Lead Generation</h3>
                            </div>
                            <p className="text-gray-600 text-sm">Your website acts as a brochure instead of a high-converting machine.</p>
                        </div>
                        <div className="mt-8 h-32 flex items-end gap-2 px-2">
                            <div className="w-full bg-gray-100 h-[30%] rounded-t-lg"></div>
                            <div className="w-full bg-gray-100 h-[45%] rounded-t-lg"></div>
                            <div className="w-full bg-gray-100 h-[35%] rounded-t-lg"></div>
                            <div className="w-full bg-gray-100 h-[60%] rounded-t-lg"></div>
                            <div className="w-full bg-accent-green/30 h-[85%] rounded-t-lg"></div>
                            <div className="w-full bg-accent-green h-[95%] rounded-t-lg shadow-lg"></div>
                        </div>
                    </div>
                    <div className="md:col-span-6 lg:col-span-5 card-white-elegant rounded-3xl p-8 flex flex-col justify-between h-full">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary font-bold text-3xl">hub</span>
                                <h3 className="text-xl font-bold text-navy-deep">Unorganized IT</h3>
                            </div>
                            <p className="text-gray-600 text-sm">Fragmented infrastructure leads to frequent downtime and vulnerabilities.</p>
                        </div>
                        <div className="relative h-24 mt-6">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 size-4 rounded-full bg-primary shadow-lg"></div>
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1/3 h-px bg-gradient-to-r from-primary to-gray-200"></div>
                            <div className="absolute left-[30%] top-0 w-px h-full bg-gray-100"></div>
                            <div className="absolute left-[30%] top-4 size-2 rounded-full bg-gray-200"></div>
                            <div className="absolute left-[30%] bottom-4 size-2 rounded-full bg-gray-200"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-3">
                                <div className="size-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-lg text-primary">dns</span>
                                </div>
                                <div className="size-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-lg text-primary">settings_input_component</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-12 lg:col-span-7 card-white-elegant rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-orange-500 font-bold text-3xl">visibility_off</span>
                                <h3 className="text-xl font-bold text-navy-deep">Zero Visibility</h3>
                            </div>
                            <p className="text-gray-600 text-sm">Your brand is invisible while competitors capture the entire market.</p>
                        </div>
                        <div className="flex-1 w-full bg-gray-50 rounded-xl p-5 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-3">
                                <span className="material-symbols-outlined text-accent-green text-xl font-bold">search</span>
                                <div className="h-2.5 w-32 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                                <div className="h-2 w-[85%] bg-gray-200 rounded-full"></div>
                                <div className="h-2 w-[65%] bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Challenges;
