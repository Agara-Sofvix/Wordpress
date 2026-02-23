import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Industries', href: '/industries' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
                ? 'py-3 bg-white/95 backdrop-blur-md shadow-xl border-b border-primary/10'
                : 'py-6 bg-transparent'
                }`}
        >
            <div className="w-full px-6 lg:px-12 flex items-center justify-between">
                {/* Logo - Left */}
                <div className="flex-1 flex justify-start">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="size-10 overflow-hidden transition-transform group-hover:scale-110">
                            <img src="/assets/logo.png" alt="Agara-Sofvix Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className={`text-xl font-extrabold tracking-tight transition-colors ${isScrolled ? 'text-navy-deep' : 'text-white'}`}>
                            Agara-<span className="text-primary">Sofvix</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation - Center */}
                <nav className="hidden md:flex flex-[2] items-center justify-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`text-[13px] font-bold tracking-widest uppercase transition-all relative group/link ${isScrolled ? 'text-navy-deep/80' : 'text-white/90'
                                } ${pathname === link.href ? 'text-primary' : ''}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${pathname === link.href ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
                        </Link>
                    ))}
                </nav>

                {/* Button - Right */}
                <div className="flex-1 flex justify-end">
                    <Link
                        to="/contact"
                        className="hidden md:flex px-7 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-[0_10px_20px_rgba(19,91,236,0.2)] hover:shadow-[0_15px_30px_rgba(19,91,236,0.4)] hover:-translate-y-0.5 transition-all active:scale-95"
                    >
                        Consult Now
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex items-center justify-center p-2 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className={`material-symbols-outlined text-3xl ${isScrolled ? 'text-navy-deep' : 'text-white'}`}>
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[450px] border-t border-gray-100' : 'max-h-0'
                }`}>
                <div className="p-8 flex flex-col gap-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`font-bold text-xl border-b border-gray-50 pb-3 transition-colors ${pathname === link.href ? 'text-primary' : 'text-navy-deep'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        className="mt-4 w-full py-5 bg-primary text-white rounded-2xl font-extrabold text-center shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Get Free Consultation
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
