import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts';
import {
    Activity,
    Zap,
    ShieldCheck,
    Globe,
    Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['#135bec', '#10b981', '#f43f5e', '#8b5cf6', '#eab308'];

const Analytics = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('30d');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await storage.getStats(timeRange);
                if (!data) {
                    setError('Telemetry node returned empty data set. Verify transmission protocol.');
                }
                setStats(data);
            } catch (err: any) {
                console.error('Failed to fetch stats:', err);
                setError(`Connection Synchronicity Error: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [timeRange]);

    // Generate accurate baseline based on range
    const getTrendData = () => {
        if (!stats?.leadTrends) return [];

        const result = [];
        const now = new Date();

        if (timeRange === '24h') {
            // Last 24 hours baseline (hourly)
            for (let i = 23; i >= 0; i--) {
                const d = new Date(now);
                d.setHours(d.getHours() - i);
                const hourStr = d.getHours().toString().padStart(2, '0') + ':00';
                const existing = stats.leadTrends.find((t: any) => t.name === hourStr);
                result.push({
                    name: hourStr,
                    leads: existing ? existing.leads : 0,
                    fullDate: d.toLocaleString()
                });
            }
        } else {
            // Daily baseline (7d, 30d, 90d)
            const daysToBack = timeRange === '90d' ? 90 : timeRange === '30d' ? 30 : 7;
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            for (let i = daysToBack - 1; i >= 0; i--) {
                const d = new Date(now);
                d.setDate(d.getDate() - i);
                const dateStr = d.toISOString().split('T')[0];
                const label = daysToBack > 30
                    ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                    : daysToBack > 7
                        ? dateStr.split('-').slice(1).join('/')
                        : dayNames[d.getDay()];

                const existing = stats.leadTrends.find((t: any) => t.name === dateStr);
                result.push({
                    name: label,
                    leads: existing ? existing.leads : 0,
                    fullDate: dateStr
                });
            }
        }
        return result;
    };

    const trendData = getTrendData();

    // Fallback for distribution if empty
    const distributionData = stats?.serviceDistribution?.length > 0
        ? stats.serviceDistribution
        : [{ name: 'No Data', value: 1 }];

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white font-display uppercase tracking-tight">Intelligence & Analytics</h1>
                    <p className="text-gray-500 text-sm mt-1 font-structure uppercase tracking-wider">High-fidelity visualization of global node performance and lead acquisition.</p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
                    {['24h', '7d', '30d', '90d'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${timeRange === range ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-[2rem] flex items-center justify-between">
                    <div>
                        <h3 className="text-red-500 text-xs font-black uppercase tracking-widest">Diagnostic Alert</h3>
                        <p className="text-red-400/70 text-[10px] font-bold mt-1 uppercase tracking-wider">{error}</p>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    {/* Performance Matrix */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-8 shadow-2xl relative overflow-hidden group">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Leads Transmission Trend</h3>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Acquisition volume ({timeRange})</p>
                                </div>
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <Activity className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trendData}>
                                        <defs>
                                            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#135bec" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#135bec" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#ffffff20"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: '#6b7280', fontWeight: 900 }}
                                            interval={timeRange === '90d' ? 6 : timeRange === '30d' ? 2 : 0}
                                        />
                                        <YAxis
                                            stroke="#ffffff20"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: '#6b7280', fontWeight: 900 }}
                                            allowDecimals={false}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f1214', border: '1px solid #ffffff10', borderRadius: '16px' }}
                                            itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                                            labelFormatter={(label, payload) => payload[0]?.payload?.fullDate || label}
                                        />
                                        <Area type="monotone" dataKey="leads" stroke="#135bec" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-8 shadow-2xl relative overflow-hidden group">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">System Load Distribution</h3>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Resource allocation by sector</p>
                                </div>
                                <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                                    <Zap className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="h-[300px] w-full flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={distributionData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {distributionData.map((_: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f1214', border: '1px solid #ffffff10', borderRadius: '16px' }}
                                            itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
                                    {distributionData.map((item: any, idx: number) => (
                                        <div key={item.name} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.name}</span>
                                            <span className="text-[10px] font-black text-white ml-auto">{item.value} units</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Neural Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Network Uptime', val: stats?.systemHealth || '100.00%', desc: 'Current protocol status', icon: Globe, color: 'blue' },
                            { label: 'Conversion', val: stats?.conversionRate || '0%', desc: 'Lead generation efficiency', icon: ShieldCheck, color: 'emerald' },
                            { label: 'Transmissions', val: stats?.formSubmissions || '0', desc: 'Total node interactions', icon: Zap, color: 'purple' },
                            { label: 'Active Leads', val: stats?.newSubmissionsCount || '0', desc: 'New inbound queue', icon: Activity, color: 'orange' },
                        ].map((item: any, idx: number) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={item.label}
                                className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/5 hover:border-primary/30 transition-all group overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-2xl bg-${item.color}-500/10 group-hover:bg-${item.color}-500 transition-all`}>
                                        <item.icon className={`w-5 h-5 text-${item.color}-500 group-hover:text-white transition-colors`} />
                                    </div>
                                    <span className="text-[10px] font-black text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-lg border border-accent-green/20">LIVE</span>
                                </div>
                                <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.label}</h3>
                                <p className="text-2xl font-black text-white font-display uppercase">{item.val}</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-2">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            {/* Detailed System Logs Placeholder */}
            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-10 shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Protocol Execution Logs</h3>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Real-time telemetry data</p>
                    </div>
                    <Filter className="w-5 h-5 text-gray-500" />
                </div>
                <div className="space-y-4">
                    {[
                        { event: 'NODE_AUTH_SUCCESS', node: 'Epsilon-7', time: '14:23:01', status: 'optimal' },
                        { event: 'LEAD_TRANS_INIT', node: 'Delta-4', time: '14:22:45', status: 'optimal' },
                        { event: 'CORE_SYNC_COMPL', node: 'Alpha-1', time: '14:22:12', status: 'optimal' },
                        { event: 'SECURITY_VAULT_ROT', node: 'Sigma-9', time: '14:21:58', status: 'optimal' },
                    ].map((log: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <div>
                                    <p className="text-[10px] font-black font-mono text-gray-200 uppercase tracking-widest">{log.event}</p>
                                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-0.5">Origin: {log.node}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-gray-400 font-mono">{log.time}</p>
                                <span className="text-[8px] font-black text-primary uppercase tracking-widest">SECURE</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
