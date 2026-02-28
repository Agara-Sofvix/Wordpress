import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';
import AdminApp from '../AdminApp';

const AdminLayout = () => {
    const isWP = !!(window as any).agaraReactAdminConfig;

    return (
        <div className={`flex bg-background-dark engineering-grid ${isWP ? 'min-h-[600px]' : 'h-screen overflow-hidden'}`}>
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <Topbar />
                <main className={`flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar ${isWP ? 'pb-20' : ''}`}>
                    <Outlet />
                </main>
            </div>
            <AdminApp />
        </div>
    );
};

export default AdminLayout;
