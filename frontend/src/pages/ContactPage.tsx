import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { getConfig } from '../lib/config';

const config = getConfig();

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        try {
            const response = await fetch(`${config.apiBase}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // Handle both string "true" and boolean true from FormSubmit
            if (result.success === "true" || result.success === true) {
                setStatus({ text: 'Details sent successfully!', type: 'success' });
                setFormData({ name: '', company: '', email: '', phone: '', service: '', message: '' });
                setTimeout(() => setStatus(null), 5000);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({ text: 'Something went wrong. Please check your connection or WhatsApp us.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background-dark min-h-screen pt-40 pb-20 px-4 sm:px-6 lg:px-20 relative overflow-hidden">
            <SEO pageSlug="contact" />
            <div className="absolute inset-0 engineering-grid"></div>
            <div className="absolute inset-0 hero-glow"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Text */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-structure text-white text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
                    >
                        Let’s Build Your <span className="text-gradient-lime-cyan">System</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/70 text-base sm:text-lg lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto"
                    >
                        Get a free project inquiry for website development near Tharamani IT Hub. We are a leading IT company in Tharamani and Velachery turning complex requirements into high-performance digital ecosystems.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Contact Details */}
                    <div className="lg:col-span-12 xl:col-span-5 space-y-8 order-2 xl:order-1">
                        <div className="space-y-4">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Best IT Company in Chennai</h2>
                            <p className="text-white/60 text-lg">Looking for a web development company in Velachery or Tharamani? Interested in working together? Reach out to us through any of these channels.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-5">
                            {/* Email Card */}
                            <motion.a
                                whileHover={{ scale: 1.02, x: 5 }}
                                href="mailto:info@agara-sofvix.com"
                                className="glass-card rounded-2xl p-6 flex items-start gap-5 group hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="size-14 bg-primary/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                                    <span className="material-symbols-outlined text-primary group-hover:text-white">mail</span>
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Email Us</h4>
                                    <p className="text-lg font-bold text-white group-hover:text-primary transition-colors truncate">info@agara-sofvix.com</p>
                                </div>
                            </motion.a>

                            {/* Phone Card */}
                            <motion.a
                                whileHover={{ scale: 1.02, x: 5 }}
                                href="https://wa.me/919498069292" target="_blank"
                                className="glass-card rounded-2xl p-6 flex items-start gap-5 group hover:border-accent-green/50 transition-all duration-300"
                            >
                                <div className="size-14 bg-accent-green/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent-green transition-colors duration-300">
                                    <span className="material-symbols-outlined text-accent-green group-hover:text-white">call</span>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Phone / WhatsApp</h4>
                                    <p className="text-lg font-bold text-white group-hover:text-accent-green transition-colors">+91 94980 69292</p>
                                </div>
                            </motion.a>

                            {/* Location Card */}
                            <motion.a
                                whileHover={{ scale: 1.02, x: 5 }}
                                href="https://share.google/Uy4mzxdWM6BMNVVnj" target="_blank"
                                className="glass-card rounded-2xl p-6 flex items-start gap-5 group hover:border-tech-blue/50 transition-all duration-300 sm:col-span-2 xl:col-span-1"
                            >
                                <div className="size-14 bg-tech-blue/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-tech-blue transition-colors duration-300">
                                    <span className="material-symbols-outlined text-tech-blue group-hover:text-white">location_on</span>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Office Location</h4>
                                    <p className="text-sm font-bold text-white/80 group-hover:text-tech-blue transition-colors leading-relaxed">Pillaiyar kovil, Tharamani, Velachery, Chennai - 600113</p>
                                </div>
                            </motion.a>
                        </div>

                        <div className="glass-card rounded-3xl p-8 border border-primary/20 bg-primary/5">
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                Quick Response Policy
                            </h4>
                            <p className="text-white/60">Our engineering team typically responds to new project inquiries within 24 business hours.</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-12 xl:col-span-7 order-1 xl:order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-white/60 ml-1">Name</label>
                                        <input
                                            type="text" name="name" value={formData.name} onChange={handleChange}
                                            placeholder="Your Full Name"
                                            className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-white/20"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-white/60 ml-1">Company</label>
                                        <input
                                            type="text" name="company" value={formData.company} onChange={handleChange}
                                            placeholder="Company Name"
                                            className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-white/20"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-white/60 ml-1">Email</label>
                                        <input
                                            type="email" name="email" value={formData.email} onChange={handleChange}
                                            placeholder="email@address.com"
                                            className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-white/20"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-white/60 ml-1">Phone</label>
                                        <input
                                            type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-white/20"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white/60 ml-1">Service Required</label>
                                    <select
                                        name="service" value={formData.service} onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-background-dark">Select a Service</option>
                                        <option value="Web Development" className="bg-background-dark">Web Development</option>
                                        <option value="SaaS Platforms" className="bg-background-dark">SaaS Platforms</option>
                                        <option value="SEO & Digital Growth" className="bg-background-dark">SEO & Digital Growth</option>
                                        <option value="Cloud Infrastructure" className="bg-background-dark">Cloud Infrastructure</option>
                                        <option value="Other Technical Solutions" className="bg-background-dark">Other Technical Solutions</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white/60 ml-1">Message</label>
                                    <textarea
                                        name="message" value={formData.message} onChange={handleChange}
                                        rows={4} placeholder="How can we help you?"
                                        className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-white/20"
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-5 px-8 rounded-xl shadow-lg shadow-primary/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="animate-spin size-5 border-2 border-white/30 border-t-white rounded-full"></span>
                                                Sending Details...
                                            </>
                                        ) : (
                                            <>
                                                Submit Request
                                                <span className="material-symbols-outlined text-xl">send</span>
                                            </>
                                        )}
                                    </button>
                                    <motion.a
                                        whileHover={{ y: -2 }}
                                        href="https://wa.me/919498069292" target="_blank"
                                        className="flex-1 bg-white/5 border border-accent-green hover:bg-accent-green text-accent-green hover:text-white font-bold py-5 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">chat</span>
                                        WhatsApp Chat
                                    </motion.a>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Status Notification */}
            <AnimatePresence>
                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-10 right-10 ${status.type === 'success' ? 'bg-accent-green' : 'bg-red-500'} text-white px-8 py-4 rounded-2xl shadow-2xl z-[100] font-bold flex items-center gap-3`}
                    >
                        <span className="material-symbols-outlined">{status.type === 'success' ? 'check_circle' : 'error'}</span>
                        {status.text}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactPage;
