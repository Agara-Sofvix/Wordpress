import { useEffect, useState } from 'react';
import { storage } from '../lib/storage';
import {
    Users,
    FileText,
    Wrench,
    ArrowUpRight,
    ArrowDownRight,
    LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [stats, setStats] = useState(() => {
        const cached = localStorage.getItem('dashboard_stats');
        return cached ? JSON.parse(cached) : { leads: 0, services: 0, testimonials: 0 };
    });
    const [recentLeads, setRecentLeads] = useState<any[]>(() => {
        const cached = localStorage.getItem('recent_leads');
        return cached ? JSON.parse(cached) : [];
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const [leadsData, servicesData, testimonialsData] = await Promise.all([
                    storage.get('leads'),
                    storage.get('services'),
                    storage.get('testimonials')
                ]);

                const newStats = {
                    leads: (leadsData || []).length,
                    services: (servicesData || []).length,
                    testimonials: (testimonialsData || []).length
                };
                const newRecentLeads = (leadsData || []).slice(0, 5);

                setStats(newStats);
                setRecentLeads(newRecentLeads);

                localStorage.setItem('dashboard_stats', JSON.stringify(newStats));
                localStorage.setItem('recent_leads', JSON.stringify(newRecentLeads));
            } catch (error) {
                console.error('Dashboard fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const cards = [
        { title: 'Total Leads', value: stats.leads, icon: Users, color: 'blue', change: '+12%', up: true },
        { title: 'Services', value: stats.services, icon: Wrench, color: 'orange', change: '0', up: true },
        { title: 'Testimonials', value: stats.testimonials, icon: FileText, color: 'green', change: '+2', up: true },
    ];

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white group flex items-center gap-2 font-display uppercase tracking-tight">
                        Command Overview
                        <span className={`text-xs font-bold bg-primary/20 text-primary px-3 py-1 rounded-full uppercase tracking-widest border border-primary/30 ${loading ? 'animate-pulse' : ''}`}>
                            {loading ? 'Syncing...' : 'Stable'}
                        </span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 font-structure uppercase tracking-wider">Condensed summary of platform infrastructure nodes.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 md:block hidden">
                    <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={card.title}
                        className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 hover:border-primary/30 hover:bg-white/[0.08] transition-all group relative overflow-hidden shadow-2xl"
                    >
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={`p-4 rounded-2xl bg-${card.color}-500/10 group-hover:bg-${card.color}-500 transition-all shadow-inner`}>
                                <card.icon className={`w-6 h-6 text-${card.color}-500 group-hover:text-white transition-colors`} />
                            </div>
                            <div className={`flex items-center gap-1.5 text-xs font-black px-2 py-1 rounded-lg bg-black/20 ${card.up ? 'text-accent-green' : 'text-red-500'}`}>
                                {card.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                {card.change}
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{card.title}</h3>
                        <p className="text-4xl font-black text-white font-display tracking-tight leading-none">{card.value}</p>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <div>
                        <h3 className="font-black text-white font-display uppercase tracking-widest text-sm text-primary">Inbound Transmissions</h3>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Latest node interactions</p>
                    </div>
                    <button className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest px-4 py-2 hover:bg-white/5 rounded-xl transition-all">Protocol History</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-5">Node Identity</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Timeline</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentLeads.map((lead) => (
                                <tr key={lead._id} className="hover:bg-primary/[0.05] transition-colors cursor-pointer group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black border border-primary/20 group-hover:scale-110 transition-transform shadow-inner text-xs">
                                                {lead.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-200 group-hover:text-primary transition-colors font-display tracking-tight uppercase">{lead.name}</p>
                                                <p className="text-[10px] text-gray-600 font-medium font-structure tracking-tight">{lead.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-2 py-1.5 px-3 rounded-xl text-[9px] font-black tracking-widest ${lead.status === 'new' ? 'bg-primary/20 text-primary' :
                                            lead.status === 'contacted' ? 'bg-orange-500/20 text-orange-400' :
                                                'bg-accent-green/20 text-accent-green'
                                            } border border-current/20`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'new' ? 'bg-primary animate-pulse' :
                                                lead.status === 'contacted' ? 'bg-orange-400' :
                                                    'bg-accent-green'
                                                }`}></div>
                                            {lead.status?.toUpperCase() || 'NEW'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-[10px] text-gray-500 font-mono tracking-tighter text-right uppercase">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
