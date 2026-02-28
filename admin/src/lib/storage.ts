import { authService } from './auth';
import { getConfig } from './config';

export const getHeaders = () => {
    const config = (window as any).agaraReactAdminConfig;
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`,
        'X-WP-Nonce': config?.nonce || ''
    };
};

export const storage = {
    get: async (key: string) => {
        const config = getConfig();
        const API_BASE = config.apiBase;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const endpoint = key === 'leads' ? `${API_BASE}/admin/submissions` : `${API_BASE}/content/${key}`;
            const response = await fetch(endpoint, {
                headers: getHeaders(),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            console.error(`Storage GET error for ${key}:`, error);
            return [];
        }
    },

    add: async (key: string, item: any) => {
        const config = getConfig();
        const API_BASE = config.apiBase;
        const endpoint = key === 'leads' ? `${API_BASE}/admin/submissions` : `${API_BASE}/content/${key}`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(item)
        });
        return await response.json();
    },

    update: async (key: string, id: string | null, updates: any) => {
        const config = getConfig();
        const API_BASE = config.apiBase;
        const endpoint = key === 'settings'
            ? `${API_BASE}/settings`
            : key === 'leads'
                ? `${API_BASE}/admin/submissions/${id}`
                : `${API_BASE}/content/${key}/${id}`;

        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(updates)
        });
        return await response.json();
    },

    delete: async (key: string, id: string) => {
        const config = getConfig();
        const API_BASE = config.apiBase;
        const endpoint = key === 'leads' ? `${API_BASE}/admin/submissions/${id}` : `${API_BASE}/content/${key}/${id}`;
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return await response.json();
    },

    getStats: async (range: string = '30d') => {
        const config = getConfig();
        const API_BASE = config.apiBase;
        try {
            const response = await fetch(`${API_BASE}/admin/stats?range=${range}`, {
                headers: getHeaders()
            });
            if (!response.ok) return null;
            return await response.json();
        } catch (error) {
            console.error('Storage getStats error:', error);
            return null;
        }
    }
};
