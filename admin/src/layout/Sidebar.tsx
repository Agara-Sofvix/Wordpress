import { NavLink, useNavigate, Link } from 'react-router-dom';
import { authService } from '../lib/auth';
import {
    LayoutDashboard,
    Users,
    Wrench,
    Star,
    LogOut,
    ChevronRight,
    BarChart3,
    Search
} from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
        { name: 'Leads', icon: Users, path: '/admin/leads' },
        { name: 'Services', icon: Wrench, path: '/admin/services' },
        { name: 'Testimonials', icon: Star, path: '/admin/testimonials' },
        { name: 'SEO Manager', icon: Search, path: '/admin/seo' },
    ];

    const handleLogout = () => {
        authService.logout();
        navigate('/admin/login');
    };

    return (
        <div className="w-64 bg-background-dark/95 backdrop-blur-xl h-full flex flex-col border-r border-white/5 shadow-2xl z-20">
            <div className="p-8 border-b border-white/5">
                <Link to="/admin/dashboard" className="flex items-center gap-3 group">
                    <div className="size-10 overflow-hidden transition-transform group-hover:scale-110">
                        <img src="/assets/logo.png" alt="Agara-Sofvix Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-white">
                        Agara-<span className="text-primary">Sofvix</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 mt-auto border-t border-white/5 space-y-2">
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to end the session?')) {
                            handleLogout();
                        }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all font-medium group"
                >
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
