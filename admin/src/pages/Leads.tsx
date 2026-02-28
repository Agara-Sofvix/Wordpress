import { useEffect, useState } from 'react';
import { storage } from '../lib/storage';
import {
    Mail,
    Phone,
    Trash2,
    ExternalLink,
    Download,
    Search,
    CheckCircle2,
    Clock,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Leads = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLead, setSelectedLead] = useState<any | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const data = await storage.get('leads');
            setLeads(data);
        } catch (error) {
            toast.error('Failed to fetch leads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await storage.update('leads', id, { status: newStatus });
            toast.success(`Lead marked as ${newStatus}`);
            fetchLeads();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const deleteLead = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                await storage.delete('leads', id);
                toast.success('Lead deleted');
                setIsViewModalOpen(false);
                fetchLeads();
            } catch (error) {
                toast.error('Failed to delete lead');
            }
        }
    };

    const openViewModal = (lead: any) => {
        setSelectedLead(lead);
        setIsViewModalOpen(true);
    };

    const handlePullData = () => {
        if (leads.length === 0) {
            toast.error('No data available to export');
            return;
        }

        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text('Agara-Sofvix Lead Database', 14, 22);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Exported on: ${new Date().toLocaleString()}`, 14, 30);

        const tableData = leads.map(lead => [
            lead.name || 'N/A',
            lead.email || 'N/A',
            lead.phone || 'N/A',
            lead.service || 'General Inquiry',
            lead.status?.toUpperCase() || 'NEW',
            new Date(lead.createdAt).toLocaleString()
        ]);

        autoTable(doc, {
            startY: 35,
            head: [['Name', 'Email', 'Phone', 'Service', 'Status', 'Date']],
            body: tableData,
            styles: { fontSize: 8, cellPadding: 3 },
            headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [245, 247, 250] },
            margin: { top: 35 },
        });

        doc.save(`agara_leads_${new Date().toISOString().split('T')[0]}.pdf`);
        toast.success('Leads exported successfully');
    };

    const filteredLeads = leads.filter(lead =>
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.service?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white flex items-center gap-2 font-display uppercase tracking-tight">
                        Lead Database
                        <span className="text-xs font-bold bg-primary/20 text-primary px-3 py-1 rounded-full uppercase tracking-wider border border-primary/30">{leads.length} Global Nodes</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 font-structure uppercase tracking-widest text-[10px]">Tracking and responding to potential assets through the central architecture.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePullData}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-gray-300 hover:bg-white/10 hover:text-white transition-all shadow-xl backdrop-blur-sm uppercase tracking-[0.2em]"
                    >
                        <Download className="w-4 h-4 text-primary" /> Pull Data
                    </button>
                </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-2xl">
                <div className="relative w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search identity, email, or protocol..."
                        className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl text-sm text-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium placeholder:text-gray-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.03] text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                                <th className="px-8 py-6">Node identity</th>
                                <th className="px-8 py-6">Protocols</th>
                                <th className="px-8 py-6">Service</th>
                                <th className="px-8 py-6">Status core</th>
                                <th className="px-8 py-6 text-right">Commands</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-white/[0.01]">
                            <AnimatePresence>
                                {filteredLeads.map((lead) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        key={lead.id}
                                        className="hover:bg-primary/[0.02] transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-lg shadow-inner group-hover:scale-110 transition-transform">
                                                    {lead.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-base font-bold text-gray-200 font-display group-hover:text-primary transition-colors">{lead.name}</p>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-1 uppercase font-black tracking-widest font-structure">
                                                        <Clock className="w-3 h-3 text-tech-blue/70" /> {new Date(lead.createdAt).toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                                                    <Mail className="w-4 h-4 text-primary opacity-60" /> {lead.email}
                                                </div>
                                                {lead.phone && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                                                        <Phone className="w-4 h-4 text-tech-blue opacity-60" /> {lead.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-3">
                                                <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-lg uppercase tracking-widest">
                                                    {lead.service || 'General Inquiry'}
                                                </span>
                                                <p className="text-sm text-gray-500 line-clamp-1 italic font-structure">"{lead.message || 'No manual input provided'}"</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-3">
                                                <div className={`inline-flex items-center gap-2 py-1.5 px-3 rounded-xl text-[10px] font-black w-fit uppercase tracking-widest border border-current/20 ${lead.status === 'new' ? 'bg-primary/20 text-primary' :
                                                    lead.status === 'contacted' ? 'bg-orange-500/20 text-orange-400' :
                                                        'bg-accent-green/20 text-accent-green'
                                                    }`}>
                                                    {lead.status === 'new' ? <AlertCircle className="w-4 h-4" /> :
                                                        lead.status === 'contacted' ? <Clock className="w-4 h-4" /> :
                                                            <CheckCircle2 className="w-4 h-4" />}
                                                    {lead.status}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {['new', 'contacted', 'closed'].filter(s => s !== lead.status).map(s => (
                                                        <button
                                                            key={s}
                                                            onClick={() => updateStatus(lead.id, s)}
                                                            className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors"
                                                        >
                                                            Switch to {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => openViewModal(lead)}
                                                    className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all shadow-sm hover:shadow-md"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => deleteLead(lead.id)}
                                                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all shadow-sm hover:shadow-md"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                    {filteredLeads.length === 0 && !loading && (
                        <div className="py-24 text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-black/40 border border-white/5 rounded-full mb-6">
                                <Search className="w-10 h-10 text-gray-700" />
                            </div>
                            <h3 className="text-gray-500 font-black font-display uppercase tracking-widest">No nodes detected in local scan</h3>
                            <p className="text-gray-600 text-xs font-structure mt-2 uppercase tracking-tight">Try recalibrating protocol filters.</p>
                        </div>
                    )}
                </div>
            </div>
            {/* Lead View Modal */}
            <AnimatePresence>
                {isViewModalOpen && selectedLead && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background-dark/80 backdrop-blur-md"
                            onClick={() => setIsViewModalOpen(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-background-dark w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10"
                        >
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-2xl shadow-inner">
                                        {selectedLead.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">{selectedLead.name}</h3>
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">
                                            {selectedLead.service || 'General Inquiry'}
                                        </p>
                                    </div>
                                </div>
                                <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-current/20 ${selectedLead.status === 'new' ? 'bg-primary/20 text-primary' :
                                    selectedLead.status === 'contacted' ? 'bg-orange-500/20 text-orange-400' :
                                        'bg-accent-green/20 text-accent-green'
                                    }`}>
                                    {selectedLead.status}
                                </div>
                            </div>

                            <div className="p-8 space-y-10">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Contact Email</label>
                                        <div className="flex items-center gap-3 text-gray-200">
                                            <Mail className="w-5 h-5 text-primary" />
                                            <span className="font-bold">{selectedLead.email}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Contact Phone</label>
                                        <div className="flex items-center gap-3 text-gray-200">
                                            <Phone className="w-5 h-5 text-tech-blue" />
                                            <span className="font-bold">{selectedLead.phone || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Message Architecture</label>
                                    <div className="bg-black/30 border border-white/5 p-6 rounded-[2rem] text-gray-300 leading-relaxed font-structure italic">
                                        "{selectedLead.message}"
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                        <Clock className="w-4 h-4" /> Received: {new Date(selectedLead.createdAt).toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => deleteLead(selectedLead.id)}
                                            className="p-4 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                                        >
                                            <Trash2 className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={() => setIsViewModalOpen(false)}
                                            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-[10px] border border-white/10"
                                        >
                                            Close Frame
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Leads;
