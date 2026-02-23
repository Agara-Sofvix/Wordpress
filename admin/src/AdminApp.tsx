import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import ServicesManager from './pages/ServicesManager';
import TestimonialsManager from './pages/TestimonialsManager';
import SEOManager from './pages/SEOManager';

// Lazy load Analytics for performance
const Analytics = lazy(() => import('./pages/Analytics'));

import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

const AdminApp = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <Routes>
                <Route path="/admin/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/analytics" element={<Analytics />} />
                        <Route path="/admin/leads" element={<Leads />} />
                        <Route path="/admin/services" element={<ServicesManager />} />
                        <Route path="/admin/testimonials" element={<TestimonialsManager />} />
                        <Route path="/admin/seo" element={<SEOManager />} />
                    </Route>
                </Route>

                {/* Default redirect to admin dashboard */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AdminApp;
