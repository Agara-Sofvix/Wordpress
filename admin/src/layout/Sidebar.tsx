import { Link, NavLink } from 'react-router-dom';
import { authService } from '../lib/auth';
import logo from '../assets/logo.png';
import {
    LayoutDashboard,
    Users,
    Star,
    ChevronRight,
    BarChart3,
    Search,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const config = (window as any).agaraReactAdminConfig;
    const logoUrl = config?.logoUrl || logo;

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Analytics', icon: BarChart3, path: '/analytics' },
        { name: 'Leads', icon: Users, path: '/leads' },
        { name: 'Testimonials', icon: Star, path: '/testimonials' },
        { name: 'SEO Manager', icon: Search, path: '/seo' },
    ];



    return (
        <div className="w-64 bg-background-dark/95 backdrop-blur-xl h-full flex flex-col border-r border-white/5 shadow-2xl z-20">
            <div className="p-8 border-b border-white/5">
                <Link to="/dashboard" className="flex items-center gap-3 group">
                    <div className="size-10 overflow-hidden transition-transform group-hover:scale-110">
                        <img src={logoUrl} alt="Agara-Sofvix Logo" className="w-full h-full object-contain" />
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

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={() => {
                        if (window.confirm('Terminate session and logout?')) {
                            authService.logout();
                        }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all group"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout Portal</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
