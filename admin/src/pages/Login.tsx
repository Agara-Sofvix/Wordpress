import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/auth';
import { Lock, Mail, Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (authService.getSession()) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const [backendReady, setBackendReady] = useState<boolean | null>(null);

    useEffect(() => {
        const check = async () => {
            const isReady = await authService.checkConnection();
            setBackendReady(isReady);
        };
        check();
        const interval = setInterval(check, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (backendReady === false) {
            setError("Cannot proceed: Backend node is unreachable.");
            return;
        }
        setLoading(true);
        setError(null);

        const { error } = await (authService.login as any)();

        if (error) {
            setError((error as any).message);
            setLoading(false);
        } else {
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-4 engineering-grid font-structure">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl p-10 relative overflow-hidden group">
                {backendReady === false && (
                    <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-[10px] font-black uppercase py-2 text-center z-50 animate-pulse">
                        CRITICAL: Backend Node Offline or Blocked
                    </div>
                )}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-1000"></div>
                <div className="text-center mb-10 relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6 border border-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                        <Lock className={`w-10 h-10 ${backendReady === false ? 'text-red-500' : 'text-primary'}`} />
                    </div>
                    <h1 className="text-3xl font-black text-white font-display uppercase tracking-tight">Agara Admin</h1>
                    <p className="text-gray-500 mt-2 text-xs font-black uppercase tracking-[0.2em]">{backendReady === false ? 'Connection Error' : 'Secure Node Authentication'}</p>
                    <div className="mt-8 p-4 bg-black/40 rounded-2xl text-[10px] text-gray-400 text-left border border-white/5">
                        <p className={`font-black ${backendReady === false ? 'text-red-500' : 'text-primary'} mb-2 uppercase tracking-widest`}>
                            {backendReady === false ? 'System Failure:' : 'Default Access Protocols:'}
                        </p>
                        {backendReady === false ? (
                            <p className="text-red-400">The gateway cannot reach the backend server at 127.0.0.1:5001. Please ensure the backend is running and not blocked by a firewall.</p>
                        ) : (
                            <>
                                <p className="flex justify-between"><span>Identity:</span> <b className="text-gray-200">admin@agara.com</b></p>
                                <p className="flex justify-between mt-1"><span>Secret:</span> <b className="text-gray-200">admin123</b></p>
                            </>
                        )}
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-8 relative z-10">
                    {error && (
                        <div className="bg-red-500/10 text-red-400 p-4 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-500/20 text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Identity Vector</label>
                        <div className="relative group/field">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/field:text-primary transition-colors" />
                            <input
                                type="email"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium placeholder:text-gray-800"
                                placeholder="admin@node.agara"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Access Fragment</label>
                        <div className="relative group/field">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/field:text-primary transition-colors" />
                            <input
                                type="password"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium placeholder:text-gray-800"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 px-4 rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Execute Sequence'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
