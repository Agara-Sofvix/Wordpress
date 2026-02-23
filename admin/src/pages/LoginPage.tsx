import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { authService } from '../lib/auth';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // If already logged in, redirect to dashboard
    if (authService.getSession()) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulated login - in production this would verify against an API
            const result = await authService.login(email);
            if (!result.error) {
                toast.success('Welcome back, Admin');
                navigate('/admin/dashboard');
            } else {
                toast.error('Invalid credentials');
            }
        } catch (error) {
            toast.error('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 engineering-grid opacity-20 pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tech-blue/20 blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 mb-6 shadow-2xl"
                    >
                        <img src="/assets/logo.png" alt="Agara-Sofvix Logo" className="w-full h-full object-contain" />
                    </motion.div>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase font-display">
                        Agara <span className="text-primary">Sofvix</span>
                    </h1>
                    <p className="text-gray-400 mt-2 font-medium">Internal Management System</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1 uppercase tracking-wider">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium"
                                    placeholder="admin@agara-sofvix.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Password</label>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-primary focus:ring-primary bg-black/40 border-white/10 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400 font-medium">
                                Keep me logged in
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transform active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Authorize Access
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-gray-500 text-sm font-medium">
                        Secure System: Unauthorized access attempts are logged.
                    </p>
                    <div className="flex items-center justify-center gap-6">
                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Tier-4 Data Center</span>
                        <div className="w-1 h-1 rounded-full bg-gray-800"></div>
                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">AES-256 Encryption</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
