import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authService } from '../lib/auth';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const session = authService.getSession();
        setAuthenticated(!!session);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-admin-sidebar">
                <Loader2 className="w-10 h-10 animate-spin text-admin-accent" />
            </div>
        );
    }

    return authenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
