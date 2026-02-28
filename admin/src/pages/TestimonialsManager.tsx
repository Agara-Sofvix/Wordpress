import { useEffect, useState } from 'react';
import { storage } from '../lib/storage';
import {
    Plus,
    Trash2,
    Edit3,
    X,
    Save,
    Star,
    Quote
} from 'lucide-react';
import toast from 'react-hot-toast';

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({
        client_name: '',
        company: '',
        rating: 5,
        review: '',
        image: ''
    });

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const data = await storage.get('testimonials');
            setTestimonials(data);
        } catch (error) {
            toast.error('Failed to load testimonials');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                name: form.client_name,
                company: form.company,
                rating: form.rating,
                content: form.review,
                image: form.image
            };

            if (editingId) {
                await storage.update('testimonials', editingId, payload);
                toast.success('Testimonial updated');
            } else {
                await storage.add('testimonials', payload);
                toast.success('Testimonial added');
            }
            setIsModalOpen(false);
            fetchTestimonials();
        } catch (error) {
            toast.error('Failed to save testimonial');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Delete this testimonial?')) {
            try {
                await storage.delete('testimonials', id);
                toast.success('Testimonial deleted');
                fetchTestimonials();
            } catch (error) {
                toast.error('Failed to delete testimonial');
            }
        }
    };

    const openForm = (t?: any) => {
        if (t) {
            setEditingId(t.id);
            setForm({
                client_name: t.name || t.client_name,
                company: t.company || '',
                rating: t.rating || 5,
                review: t.content || t.review,
                image: t.image || ''
            });
        } else {
            setEditingId(null);
            setForm({ client_name: '', company: '', rating: 5, review: '', image: '' });
        }
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white flex items-center gap-3 font-display uppercase tracking-tight">
                        Client Validation
                        <span className="text-xs font-bold bg-accent-green/20 text-accent-green px-3 py-1 rounded-full uppercase tracking-wider border border-accent-green/30">{testimonials.length} Active Nodes</span>
                    </h1>
                    <p className="text-gray-500 text-[10px] mt-1 font-structure uppercase tracking-[0.2em] font-black">Global feedback and performance metrics from verified client nodes.</p>
                </div>
                <button
                    onClick={() => openForm()}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1 uppercase tracking-widest text-[10px] border border-primary/50"
                >
                    <Plus className="w-5 h-5" /> Integrate Feedback
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t) => (
                    <div key={t.id} className="bg-white/5 backdrop-blur-sm rounded-[2.5rem] border border-white/5 p-8 flex flex-col group hover:border-primary/30 transition-all relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />
                        <Quote className="absolute top-8 right-8 w-10 h-10 text-primary opacity-10 group-hover:opacity-20 transition-all group-hover:scale-110" />

                        <div className="flex items-center gap-1.5 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < (t.rating || 0) ? 'text-accent-green fill-accent-green' : 'text-gray-800'}`} />
                            ))}
                        </div>

                        <p className="text-gray-400 italic text-sm mb-10 flex-1 leading-relaxed font-structure relative z-10">
                            "{t.content || t.review}"
                        </p>

                        <div className="flex items-center justify-between mt-auto relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-black/40 rounded-2xl border border-white/10 shadow-inner overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
                                    {t.image ? <img src={t.image} alt={t.name || t.client_name} className="w-full h-full object-cover opacity-80" /> : <div className="w-full h-full flex items-center justify-center font-black text-primary text-2xl uppercase bg-primary/10">{(t.name || t.client_name || '?').charAt(0)}</div>}
                                </div>
                                <div className="space-y-1">
                                    <p className="font-black text-white text-base font-display tracking-tight">{t.name || t.client_name}</p>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-lg w-fit border border-primary/20">
                                        {t.company}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => openForm(t)} className="p-3 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-xl transition-all border border-white/5 bg-black/20"><Edit3 className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(t.id)} className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-white/5 bg-black/20"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {
                isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                        <div className="relative bg-background-dark w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/10">
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <div>
                                    <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">{editingId ? 'Modify Validation' : 'Integrate Node'}</h3>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Status: Calibration Required</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all"><X className="w-6 h-6" /></button>
                            </div>
                            <form onSubmit={handleSave} className="p-8 space-y-8 font-structure">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 ml-1">Entity Identity</label>
                                        <input type="text" required className="w-full px-8 py-5 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-white" placeholder="Client Name" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 ml-1">Origin / Node</label>
                                        <input type="text" className="w-full px-8 py-5 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-white placeholder:text-gray-700" placeholder="Company/Position" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 ml-1">Confidence Level</label>
                                        <select className="w-full px-8 py-5 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold cursor-pointer text-white appearance-none" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
                                            <option value="1">1 Bit</option>
                                            <option value="2">2 Bits</option>
                                            <option value="3">3 Bits</option>
                                            <option value="4">4 Bits</option>
                                            <option value="5">5 Bits (Max)</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 ml-1">Feedback Stream</label>
                                    <textarea required rows={4} className="w-full px-8 py-5 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none italic text-white" placeholder="Input validation data..." value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-gray-500 font-black hover:bg-white/5 rounded-2xl transition-all uppercase tracking-widest text-[10px]">Abort</button>
                                    <button type="submit" className="flex-1 py-4 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]">
                                        <Save className="w-5 h-5" /> Integrate Data
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default TestimonialsManager;
