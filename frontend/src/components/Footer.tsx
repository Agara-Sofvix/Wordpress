import React from 'react';
import { Link } from 'react-router-dom';
import { getAssetPath } from '../utils/assets';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: 'Company',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Industries', href: '/industries' },
                { name: 'Contact', href: '/contact' },
            ]
        },
        {
            title: 'Services',
            links: [
                { name: 'Web & App Development', href: '/services#web-app-development' },
                { name: 'SaaS Product Development', href: '/services#saas-product-development' },
                { name: 'SEO & Digital Growth', href: '/services#seo-digital-growth' },
                { name: 'Server & OS Installation', href: '/services#server-os-installation' },
                { name: 'IT Support & Maintenance', href: '/services#it-support-maintenance' },
            ]
        },
        {
            title: 'Connect',
            isSocial: true,
            links: [
                { name: 'WhatsApp', href: 'https://wa.me/919498069292', icon: 'chat' },
                { name: 'Instagram', href: 'https://www.instagram.com/agara_sofvix?igsh=MWs1NWVjejdpcHVtMg%3D%3D', icon: 'photo_camera' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/company/agara-sofvix/', icon: 'groups' },
            ]
        }
    ];

    return (
        <footer className="relative bg-background-dark pt-24 pb-12 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 engineering-grid opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

            <div className="w-full px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-5 space-y-8">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="size-10 overflow-hidden transition-transform group-hover:scale-110">
                                <img src={getAssetPath('/assets/logo.png')} alt="Agara-Sofvix Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight text-white">
                                Agara-<span className="text-primary">Sofvix</span>
                            </span>
                        </Link>
                        <p className="text-white/60 text-lg leading-relaxed max-w-md font-medium">
                            Engineering premium digital solutions and high-performance infrastructure for modern businesses and startups worldwide.
                        </p>
                    </div>

                    {/* Navigation Sections */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
                        {sections.map((section: any) => (
                            <div key={section.title} className="space-y-6">
                                <h4 className="text-white font-bold text-sm uppercase tracking-widest">{section.title}</h4>
                                {section.isSocial ? (
                                    <div className="flex flex-wrap gap-4">
                                        {section.links.map((link: any) => (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="size-12 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110 bg-white/5 backdrop-blur-sm group/social"
                                                title={link.name}
                                            >
                                                <i className={`fa-brands fa-${link.name.toLowerCase()} text-xl transition-transform group-hover/social:rotate-12`}></i>
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <ul className="space-y-4">
                                        {section.links.map((link: any) => (
                                            <li key={link.name}>
                                                <Link
                                                    to={link.href}
                                                    className="text-white/50 hover:text-primary transition-colors font-medium"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col items-center justify-center text-center">
                    <div className="text-white/40 text-sm font-medium">
                        <p>&copy; {currentYear} Agara-Sofvix All rights reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
