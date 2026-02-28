import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import { authService } from '../lib/auth';
import { Bell, Search, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Topbar = () => {
    const [unreadCount, setUnreadCount] = useState(0);
    const [recentNotifications, setRecentNotifications] = useState<any[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hasNewUnseen, setHasNewUnseen] = useState(false);
    const [isOnline, setIsOnline] = useState<boolean | null>(null);

    const fetchNotifications = async () => {
        try {
            const stats = await storage.getStats();
            const leads = await storage.get('leads');

            if (stats) {
                setUnreadCount(stats.newSubmissionsCount || 0);
            }

            if (Array.isArray(leads)) {
                const newLeads = leads.filter(l => l.status === 'new').slice(0, 5);
                setRecentNotifications(newLeads);

                // Check if the latest notification is newer than the last seen one
                const lastSeenId = localStorage.getItem('last_seen_notification_id');
                const latestId = newLeads[0]?.id;

                if (latestId && latestId !== lastSeenId) {
                    setHasNewUnseen(true);
                } else if (!latestId) {
                    setHasNewUnseen(false);
                }
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    const handleToggleDropdown = () => {
        const nextState = !isDropdownOpen;
        setIsDropdownOpen(nextState);

        if (nextState) {
            // Mark as seen when opening
            setHasNewUnseen(false);
            if (recentNotifications.length > 0) {
                localStorage.setItem('last_seen_notification_id', recentNotifications[0].id);
            }
        }
    };

    useEffect(() => {
        const checkHealth = async () => {
            const connected = await authService.checkConnection();
            console.log('[Topbar] Health Check Result:', connected);
            setIsOnline(connected);
        };

        checkHealth();
        fetchNotifications();
        // Poll for health and notifications every 30 seconds
        const interval = setInterval(() => {
            checkHealth();
            fetchNotifications();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="h-20 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between shadow-sm z-[60]">
            <div className="relative w-96 hidden md:block group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Search Node Data..."
                    className="w-full pl-12 pr-4 py-2.5 bg-background-light/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-structure"
                />
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <div className={`w-1.5 h-1.5 rounded-full ${isOnline === true ? 'bg-accent-green animate-pulse' : isOnline === false ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {isOnline === true ? 'Sync Active' : isOnline === false ? 'Sync Failure' : 'Calibrating...'}
                    </span>
                </div>

                <div className="relative">
                    <button
                        onClick={handleToggleDropdown}
                        className={`relative text-gray-400 hover:text-primary transition-colors group p-2 rounded-xl h-11 w-11 flex items-center justify-center ${isDropdownOpen ? 'bg-primary/10 text-primary' : 'bg-white/5'}`}
                    >
                        <Bell className={`w-5 h-5 ${hasNewUnseen ? 'animate-pulse text-primary' : ''}`} />
                        {hasNewUnseen && unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-[10px] font-black text-white rounded-full flex items-center justify-center border-2 border-background-dark shadow-lg">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsDropdownOpen(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute right-0 mt-4 w-80 bg-background-dark/95 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden z-50 text-left"
                                >
                                    <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                                        <h3 className="text-xs font-black text-white uppercase tracking-widest">Inbound Notifications</h3>
                                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">{unreadCount} NEW</span>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                                        {recentNotifications.length > 0 ? (
                                            recentNotifications.map((notif) => (
                                                <Link
                                                    key={notif.id}
                                                    to="/leads"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="p-5 border-b border-white/5 flex gap-4 hover:bg-white/[0.03] transition-colors group"
                                                >
                                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black shrink-0 border border-primary/20">
                                                        {notif.name?.charAt(0)}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold text-gray-200 group-hover:text-primary transition-colors truncate">{notif.name}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Mail className="w-3 h-3 text-gray-500" />
                                                            <p className="text-[10px] text-gray-600 truncate">{notif.email}</p>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 mt-2 text-[9px] text-primary/70 font-black uppercase tracking-widest">
                                                            <Clock className="w-2.5 h-2.5" />
                                                            {new Date(notif.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="py-12 text-center">
                                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                                                    <Bell className="w-5 h-5 text-gray-700" />
                                                </div>
                                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-loose px-10">All protocol nodes are currently silent</p>
                                            </div>
                                        )}
                                    </div>
                                    <Link
                                        to="/leads"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="p-4 block text-center text-[10px] font-black text-gray-400 hover:text-white hover:bg-white/[0.02] transition-all uppercase tracking-widest border-t border-white/5"
                                    >
                                        View Global Access Logs
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </header>
    );
};

export default Topbar;
