import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen bg-background-dark overflow-hidden hero-diagonal">
            <div className="absolute inset-0 engineering-grid"></div>
            <div className="absolute inset-0 hero-glow"></div>
            <div className="w-full px-6 lg:px-20 pt-32 pb-24 relative z-10 min-h-screen flex flex-col justify-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h1 className="font-structure text-white text-3xl sm:text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                            Need a Website, App, or Server Setup for Your Business? We Build It <span className="text-gradient-lime-cyan">Fast &amp; Right.</span>
                        </h1>
                        <p className="text-white/80 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-xl">
                            Web Development • SaaS Applications • SEO • Cloud &amp; Local Server Setup for SMEs &amp; Startups
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                            <Link
                                to="/contact"
                                className="button-glow flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all w-full sm:w-auto"
                            >
                                Get Free Consultation
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </Link>
                            <a
                                href="https://wa.me/919498069292"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 transition-all w-full sm:w-auto text-white group"
                            >
                                <span className="material-symbols-outlined text-[#25D366]">chat</span>
                                <span className="font-bold">Talk on WhatsApp</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square flex items-center justify-center">
                            <div className="absolute w-[80%] h-[80%] rounded-full border border-white/5 animate-[spin_20s_linear_infinite]"></div>
                            <div className="absolute w-[60%] h-[60%] rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]"></div>
                            <div className="absolute top-[10%] right-[10%] glass-bento p-4 rounded-xl w-48 border border-white/10">
                                <div className="flex gap-1 mb-3">
                                    <div className="size-2 rounded-full bg-red-400"></div>
                                    <div className="size-2 rounded-full bg-amber-400"></div>
                                    <div className="size-2 rounded-full bg-emerald-400"></div>
                                </div>
                                <div className="space-y-1 font-mono text-[10px] text-white/70">
                                    <p className="text-blue-400">async function build() {'{'}</p>
                                    <p className="pl-3">await <span className="text-cyan-400">deploy</span>();</p>
                                    <p className="text-blue-400">{'}'}</p>
                                </div>
                            </div>
                            <div className="absolute bottom-[20%] left-[5%] glass-bento p-5 rounded-2xl border border-white/10">
                                <span className="material-symbols-outlined text-5xl text-blue-400">cloud_sync</span>
                            </div>
                            <div className="relative z-10 size-56 bg-gradient-to-br from-primary to-tech-blue rounded-[2.5rem] flex items-center justify-center shadow-[0_0_70px_rgba(19,91,236,0.5)]">
                                <span className="material-symbols-outlined text-white text-8xl">terminal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
