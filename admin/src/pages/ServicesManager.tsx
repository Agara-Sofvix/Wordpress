import { useEffect, useState } from 'react';
import { storage } from '../lib/storage';
import {
    Plus,
    Trash2,
    Edit3,
    X,
    Save,
    Image as ImageIcon,
    Wrench,
    Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const ServicesManager = () => {
    const [services, setServices] = useState<any[]>([]);
    const [, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: 'Core Service',
        icon: '',
        image: '',
        features: [''],
        stats: { label: '', value: '' }
    });

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
            const payload = {
                ...form,
                features: form.features.filter(f => f.trim() !== '')
            };

            if (editingId) {
                await storage.update('services', editingId, payload);
                toast.success('Service updated');
            } else {
                await storage.add('services', payload);
                toast.success('Service created');
            }
            setIsModalOpen(false);
            fetchServices();
        } catch (error) {
            toast.error('Failed to save service');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Delete this service?')) {
            try {
                await storage.delete('services', id);
                toast.success('Service deleted');
                fetchServices();
            } catch (error) {
                toast.error('Failed to delete service');
            }
        }
    };

    const openForm = (svc?: any) => {
        if (svc) {
            setEditingId(svc._id || svc.id);
            setForm({
                title: svc.title || '',
                description: svc.description || '',
                category: svc.category || 'Core Service',
                icon: svc.icon || '',
                image: svc.image || '',
                features: svc.features && svc.features.length > 0 ? svc.features : [''],
                stats: svc.stats || { label: '', value: '' }
            });
        } else {
            setEditingId(null);
            setForm({
                title: '',
                description: '',
                category: 'Core Service',
                icon: '',
                image: '',
                features: [''],
                stats: { label: '', value: '' }
            });
        }
        setIsModalOpen(true);
    };

    const addFeature = () => setForm({ ...form, features: [...form.features, ''] });
    const removeFeature = (index: number) => setForm({
        ...form,
        features: form.features.filter((_, i) => i !== index)
    });
    const updateFeature = (index: number, val: string) => {
        const newFeatures = [...form.features];
        newFeatures[index] = val;
        setForm({ ...form, features: newFeatures });
    };

    return (
        <div className="space-y-8 pb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-white font-display uppercase tracking-tight">Services Portfolio</h1>
                    <p className="text-gray-500 text-[10px] mt-1 font-structure uppercase tracking-[0.2em] font-black">Managing Global IT service vectors.</p>
                </div>
                <button
                    onClick={() => openForm()}
                    className="bg-primary hover:bg-blue-600 text-white font-black py-3 px-8 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"
                >
                    <Plus className="w-5 h-5" /> New Service
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((svc) => (
                    <div key={svc._id || svc.id} className="bg-white/5 backdrop-blur-sm rounded-[2.5rem] border border-white/5 p-8 flex flex-col group hover:border-primary/30 transition-all hover:-translate-y-2 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className="p-5 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform shadow-inner border border-primary/20">
                                <Wrench className="w-8 h-8 text-primary" />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openForm(svc)}
                                    className="p-3 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-xl transition-all border border-white/5 bg-black/20"
                                >
                                    <Edit3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(svc._id || svc.id)}
                                    className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-white/5 bg-black/20"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-lg uppercase tracking-widest border border-primary/20">
                                {svc.category || 'Core Service'}
                            </span>
                        </div>
                        <h3 className="text-xl font-black text-white mb-3 font-display group-hover:text-primary transition-colors uppercase tracking-tight">{svc.title}</h3>
                        <p className="text-gray-400 text-sm flex-1 leading-relaxed font-structure line-clamp-3">{svc.description}</p>
                        <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] font-structure">
                            <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-tech-blue/50" /> Node.v1.0.{String(svc._id || svc.id).slice(-2)}</span>
                            {svc.image && <div className="flex items-center gap-1.5 text-primary"><ImageIcon className="w-3.5 h-3.5" /> Media Indexed</div>}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-background-dark w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/10 max-h-[90vh] flex flex-col">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02] shrink-0">
                            <div>
                                <h3 className="text-xl font-black text-white font-display uppercase tracking-widest">{editingId ? 'Modify Service' : 'Initialize Service'}</h3>
                                <p className="text-xs text-gray-500 font-structure mt-1">Configuring service data nodes</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                type="button"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em] ml-1">Service Label</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Cybersecurity Solutions"
                                        className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em] ml-1">Category</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Cloud Security"
                                        className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em] ml-1">Icon Node Link</label>
                                    <input
                                        type="text"
                                        placeholder="Material icon name e.g. language, layers"
                                        className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                                        value={form.icon}
                                        onChange={(e) => setForm({ ...form, icon: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em] ml-1">Featured Asset URL (Image)</label>
                                    <input
                                        type="text"
                                        placeholder="URL of the service image"
                                        className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                                        value={form.image}
                                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em] ml-1">Data Payloading (Description)</label>
                                    <textarea
                                        required
                                        placeholder="Describe your service..."
                                        rows={4}
                                        className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none font-medium"
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-2 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">System Protocols (Features)</label>
                                        <button
                                            type="button"
                                            onClick={addFeature}
                                            className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest flex items-center gap-1"
                                        >
                                            <Plus className="w-3 h-3" /> Add Protocol
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {form.features.map((feature, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    className="flex-1 px-6 py-3 bg-black/20 border border-white/10 rounded-xl text-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                                    value={feature}
                                                    onChange={(e) => updateFeature(idx, e.target.value)}
                                                    placeholder={`Protocol #${idx + 1}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(idx)}
                                                    className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em] ml-1">Success Metric (Stats)</label>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Label (e.g. Uptime)"
                                        className="px-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-gray-200 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-sm"
                                        value={form.stats.label}
                                        onChange={(e) => setForm({ ...form, stats: { ...form.stats, label: e.target.value } })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value (e.g. 99.9%)"
                                        className="px-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-gray-200 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-sm"
                                        value={form.stats.value}
                                        onChange={(e) => setForm({ ...form, stats: { ...form.stats, value: e.target.value } })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 shrink-0 bg-background-dark/50 backdrop-blur sticky bottom-0 -m-8 p-8 border-t border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 text-gray-500 font-black hover:bg-white/5 rounded-2xl transition-all uppercase tracking-widest text-[10px]"
                                >
                                    Abort
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]"
                                >
                                    <Save className="w-5 h-5" /> Commit Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesManager;
