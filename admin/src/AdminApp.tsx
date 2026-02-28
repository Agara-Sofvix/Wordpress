import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const AdminApp = () => {
    const location = useLocation();

    useEffect(() => {
        console.log('[AgaraRouter] Path Changed:', location.pathname);
    }, [location]);

    return (
        <div className="fixed bottom-4 left-4 z-[9999] pointer-events-none opacity-20 hover:opacity-100 transition-opacity">
            <span className="bg-black/80 text-[8px] text-primary font-black px-2 py-1 rounded uppercase tracking-widest border border-primary/20">
                Route: {location.pathname}
            </span>
        </div>
    );
};

export default AdminApp;
