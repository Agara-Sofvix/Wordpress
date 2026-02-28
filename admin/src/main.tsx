import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import { Toaster } from 'react-hot-toast';

console.log('[AgaraAdmin] VITE_API_URL:', import.meta.env.VITE_API_URL);
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import TestimonialsManager from './pages/TestimonialsManager';
import SEOManager from './pages/SEOManager';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const router = createHashRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'analytics', element: <Analytics /> },
            { path: 'leads', element: <Leads /> },
            { path: 'testimonials', element: <TestimonialsManager /> },
            { path: 'seo', element: <SEOManager /> },
            { path: '', element: <Navigate to="/dashboard" replace /> },
            { path: '*', element: <Navigate to="/dashboard" replace /> }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
    </React.StrictMode>
);
