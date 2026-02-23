import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
    _id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    image: string;
}

const Testimonials: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/content/testimonials');
                if (response.ok) {
                    const data = await response.json();
                    setTestimonials(data);
                }
            } catch (err) {
                console.error('Error fetching testimonials:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading || testimonials.length === 0) return null;

    return (
        <section className="py-24 px-6 lg:px-20 bg-white relative overflow-hidden">
            <div className="absolute inset-0 light-grid opacity-20"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-deep tracking-tight mb-4">What Our Clients Say</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">Hear from the businesses we've helped transform through specialized technical solutions.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                    <span key={i} className="material-symbols-outlined text-primary text-xl">star</span>
                                ))}
                            </div>
                            <p className="text-slate-700 italic mb-8 leading-relaxed">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full overflow-hidden bg-primary/10 border border-primary/20">
                                    {testimonial.image ? (
                                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-primary font-bold">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-navy-deep">{testimonial.name}</h4>
                                    <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
