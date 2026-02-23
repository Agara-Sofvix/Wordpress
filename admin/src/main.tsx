import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AdminApp from './AdminApp';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AdminApp />
            <Toaster position="bottom-right" />
        </BrowserRouter>
    </React.StrictMode>
);
