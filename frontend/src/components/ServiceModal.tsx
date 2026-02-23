import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceData: {
        name: string;
        icon: string;
        color: string;
        bg: string;
        image: string;
        features: string[];
    } | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, serviceData }) => {
    if (!serviceData) return null;

    return (
        <div className={`fixed inset-0 z-[100] ${isOpen ? 'modal-show' : 'hidden'} items-center justify-center p-4 sm:p-6`}>
            <div className="absolute inset-0 bg-background-dark/90 backdrop-blur-xl" onClick={onClose}></div>
            <div
                className={`relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[2rem] p-6 sm:p-10 border border-primary/10 shadow-2xl transition-all duration-500 transform overflow-y-auto max-h-[90vh] ${isOpen ? 'modal-content-active' : 'scale-95 opacity-0'}`}
                id="serviceModalContent"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 size-10 flex items-center justify-center rounded-full bg-navy-deep/5 hover:bg-navy-deep/10 text-navy-deep transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div id="serviceModalBody">
                    <div className="flex items-center gap-6 mb-8">
                        <div className={`size-20 ${serviceData.bg} rounded-[1.8rem] flex items-center justify-center border border-primary/5`}>
                            <span className={`material-symbols-outlined text-4xl ${serviceData.color}`}>{serviceData.icon}</span>
                        </div>
                        <div>
                            <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Service Excellence</h4>
                            <h2 className="text-3xl font-extrabold text-navy-deep tracking-tight">{serviceData.name}</h2>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">Our {serviceData.name} services are designed to provide robust, future-proof foundations for your growing business needs.</p>
                        <ul className="grid sm:grid-cols-1 gap-3">
                            {serviceData.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 hover:border-primary/20 transition-all">
                                    <span className="material-symbols-outlined text-primary">verified_user</span>
                                    <span className="font-semibold text-navy-deep/80">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/contact"
                            onClick={onClose}
                            className="bg-primary hover:bg-primary/90 text-white flex-1 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20"
                        >
                            Start Your Project
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                        <a
                            href="https://wa.me/919498069292"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-accent-green/5 hover:bg-accent-green/10 text-accent-green px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
                        >
                            <span className="material-symbols-outlined text-accent-green">chat_bubble</span>
                            Consult Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
