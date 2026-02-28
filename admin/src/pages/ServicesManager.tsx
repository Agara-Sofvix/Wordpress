import { useEffect, useState } from 'react';
import { storage } from '../lib/storage';
import {
    Plus,
    Trash2,
    Edit3,
    X,
    Save,
    Settings,
    Layers,
    Type,
    ListChecks,
    Image as ImageIcon,
    BarChart,
    Zap
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ServicesManager = () => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: '',
        category: '',
        description: '',
        icon: '',
        features: [] as string[],
        image: '',
        stats_label: '',
        stats_value: '',
        order: 0
    });
    const [featureInput, setFeatureInput] = useState('');

    const fetchServices = async () => {
        setLoading(true);
        try {
            const data = await storage.get('services');
            setServices(data || []);
        } catch (error) {
            toast.error('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await storage.update('services', editingId, form);
                toast.success('Service updated');
            } else {
                await storage.add('services', form);
                toast.success('Service added');
            }
            setIsModalOpen(false);
            fetchServices();
        } catch (error) {
            toast.error('Failed to save service');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Delete this service? This may affect your website content.')) {
            try {
                await storage.delete('services', id);
                toast.success('Service deleted');
                fetchServices();
            } catch (error) {
                toast.error('Failed to delete service');
            }
        }
    };

    const openForm = (s?: any) => {
        if (s) {
            setEditingId(s.id || s._id);
            setForm({
                title: s.title || '',
                category: s.category || '',
                description: s.description || '',
                icon: s.icon || '',
                features: s.features || [],
                image: s.image || '',
                stats_label: s.stats_label || '',
                stats_value: s.stats_value || '',
                order: s.order || 0
            });
        } else {
            setEditingId(null);
            setForm({
                title: '',
                category: '',
                description: '',
                icon: '',
                features: [],
                image: '',
                stats_label: '',
                stats_value: '',
                order: 0
            });
        }
        setIsModalOpen(true);
    };

    const addFeature = () => {
        if (featureInput.trim()) {
            setForm({ ...form, features: [...form.features, featureInput.trim()] });
            setFeatureInput('');
        }
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...form.features];
        newFeatures.splice(index, 1);
        setForm({ ...form, features: newFeatures });
    };

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white flex items-center gap-3 font-display uppercase tracking-tight">
                        Service Matrix
                        <span className="text-xs font-bold bg-primary/20 text-primary px-3 py-1 rounded-full uppercase tracking-wider border border-primary/30">{services.length} Core Nodes</span>
                    </h1>
                    <p className="text-gray-500 text-[10px] mt-1 font-structure uppercase tracking-[0.2em] font-black">Managing key solution architectures and deployment protocols.</p>
                </div>
                <button
                    onClick={() => openForm()}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1 uppercase tracking-widest text-[10px] border border-primary/50"
                >
                    <Plus className="w-5 h-5" /> Deploy Service
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s) => (
                        <div key={s.id || s._id} className="bg-white/5 backdrop-blur-sm rounded-[2.5rem] border border-white/5 p-8 flex flex-col group hover:border-primary/30 transition-all relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />

                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                                    <span className="material-symbols-outlined text-3xl">{s.icon || 'settings'}</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-white text-lg font-display tracking-tight leading-none">{s.title}</h3>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-2 bg-primary/10 px-2 py-1 rounded-lg w-fit">{s.category}</p>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed font-structure relative z-10">
                                {s.description}
                            </p>

                            <div className="space-y-3 mb-8 relative z-10">
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Protocol Features:</p>
                                <div className="flex flex-wrap gap-2">
                                    {(s.features || []).slice(0, 3).map((f: string, idx: number) => (
                                        <span key={idx} className="text-[9px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-md border border-white/5 flex items-center gap-1">
                                            <div className="w-1 h-1 rounded-full bg-primary"></div> {f}
                                        </span>
                                    ))}
                                    {s.features?.length > 3 && <span className="text-[9px] font-bold text-gray-600">+{s.features.length - 3} more</span>}
                                </div>
                            </div>

                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{s.stats_label || 'PERFORMANCE'}</span>
                                    <span className="text-lg font-black text-white font-display text-accent-green">{s.stats_value || '99.9%'}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openForm(s)} className="p-3 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-xl transition-all border border-white/5 bg-black/20"><Edit3 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(s.id || s._id)} className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-white/5 bg-black/20"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {services.length === 0 && (
                        <div className="col-span-full py-24 text-center bg-white/5 rounded-[2.5rem] border border-white/5 border-dashed">
                            <Settings className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                            <h3 className="text-gray-500 font-black font-display uppercase tracking-widest">No services integrated into matrix</h3>
                            <p className="text-gray-600 text-[10px] font-structure mt-2 uppercase tracking-tight">Deploy your first service node to begin orchestration.</p>
                        </div>
                    )}
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background-dark/80 backdrop-blur-md"
                            onClick={() => setIsModalOpen(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative bg-background-dark w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 max-h-[90vh] flex flex-col"
                        >
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02] shrink-0">
                                <div>
                                    <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">{editingId ? 'Modify Service Node' : 'Integrate New Service'}</h3>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Calibration: V2.0 Enterprise Protocol</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all"><X className="w-6 h-6" /></button>
                            </div>

                            <form onSubmit={handleSave} className="p-8 space-y-8 overflow-y-auto font-structure">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">
                                                <Type className="w-3 h-3 text-primary" /> Service Designation
                                            </label>
                                            <input type="text" required className="w-full px-8 py-4 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-white uppercase placeholder:text-gray-700" placeholder="e.g. Technical SEO Expert" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">
                                                <Layers className="w-3 h-3 text-tech-blue" /> Category
                                            </label>
                                            <input type="text" className="w-full px-8 py-4 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-white placeholder:text-gray-700" placeholder="e.g. Growth" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">
                                                <Settings className="w-3 h-3 text-accent-green" /> Icon String (Material Symbol)
                                            </label>
                                            <div className="flex gap-4">
                                                <input type="text" className="flex-1 px-8 py-4 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-mono text-xs text-white placeholder:text-gray-700" placeholder="e.g. query_stats" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                                                <div className="size-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined">{form.icon || 'settings'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">
                                                <BarChart className="w-3 h-3 text-orange-400" /> Metric Label
                                            </label>
                                            <input type="text" className="w-full px-8 py-4 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-white placeholder:text-gray-700" placeholder="e.g. Visibility" value={form.stats_label} onChange={(e) => setForm({ ...form, stats_label: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">
                                                <Zap className="w-3 h-3 text-accent-green" /> Metric Value
                                            </label>
                                            <input type="text" className="w-full px-8 py-4 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-accent-green placeholder:text-gray-700" placeholder="e.g. +300%" value={form.stats_value} onChange={(e) => setForm({ ...form, stats_value: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">
                                                <ImageIcon className="w-3 h-3 text-purple-400" /> Asset Image Path
                                            </label>
                                            <input type="text" className="w-full px-8 py-4 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-mono text-xs text-white placeholder:text-gray-700" placeholder="/assets/services/name.png" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Protocol Description (SEO Rich Content)</label>
                                    <textarea required rows={3} className="w-full px-8 py-5 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none text-gray-300 leading-relaxed font-structure" placeholder="Provide a deep technical overview for search engines..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 ml-1">
                                        <ListChecks className="w-3 h-3 text-primary" /> Feature Protocols
                                    </label>
                                    <div className="flex gap-4 mb-4">
                                        <input type="text" className="flex-1 px-8 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-primary transition-all text-sm text-white" placeholder="Add technical feature..." value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
                                        <button type="button" onClick={addFeature} className="px-8 py-4 bg-primary/10 border border-primary/20 text-primary rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all">Inject</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 min-h-[44px] p-2 bg-black/20 rounded-2xl border border-white/5">
                                        {form.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 rounded-lg border border-primary/20 group">
                                                <span className="text-[10px] font-bold uppercase tracking-tight">{feature}</span>
                                                <button type="button" onClick={() => removeFeature(idx)} className="text-primary hover:text-white"><X className="w-3 h-3" /></button>
                                            </div>
                                        ))}
                                        {form.features.length === 0 && <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest p-2">Empty Feature Log</span>}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 shrink-0">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 text-gray-500 font-black hover:bg-white/5 rounded-2xl transition-all uppercase tracking-widest text-[10px]">Abort Process</button>
                                    <button type="submit" className="flex-1 py-5 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]">
                                        <Save className="w-5 h-5" /> Commit to Database
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ServicesManager;
