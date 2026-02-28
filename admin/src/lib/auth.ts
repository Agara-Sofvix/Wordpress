

import { getConfig } from './config';

const SESSION_KEY = 'agara_admin_session';

export const authService = {
    login: async (username: string, password: string) => {
        try {
            const config = getConfig();
            console.log('[Auth] Attempting login at:', `${config.apiBase}/auth/login`);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

            const response = await fetch(`${config.apiBase}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // Handle non-JSON or other unexpected responses
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('[Auth] Unexpected response format:', text);
                return { error: `Server error (${response.status})`, session: null };
            }

            const data = await response.json();

            if (!response.ok) {
                return { error: data.message || 'Identity verification failed', session: null };
            }

            const session = {
                username: data.username,
                token: data.token,
                timestamp: Date.now()
            };

            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
            return { error: null, session };
        } catch (error) {
            console.error('Login error:', error);
            return { error: 'Connection failed', session: null };
        }
    },

    logout: () => {
        localStorage.removeItem(SESSION_KEY);
        window.location.hash = '#/login'; // Explicitly use hash for redirection
    },

    getSession: () => {
        const sessionStr = localStorage.getItem(SESSION_KEY);
        if (!sessionStr) return null;
        try {
            return JSON.parse(sessionStr);
        } catch {
            return null;
        }
    },

    getToken: () => {
        const session = authService.getSession();
        return session?.token || null;
    },

    isAuthenticated: () => {
        const session = authService.getSession();
        if (!session) return false;

        // Simple expiry check (24h)
        const dayInMs = 24 * 60 * 60 * 1000;
        if (Date.now() - session.timestamp > dayInMs) {
            authService.logout();
            return false;
        }

        return !!session.token;
    },

    checkConnection: async () => {
        try {
            const config = getConfig();
            console.log('[Auth] Checking connection at:', config.healthCheck);
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 3000);

            const response = await fetch(config.healthCheck, { signal: controller.signal });
            clearTimeout(id);
            if (!response.ok) {
                console.error('[Auth] Health check failed with status:', response.status);
            }
            return response.ok;
        } catch (e) {
            console.error('[Auth] Connection check failed:', e);
            return false;
        }
    }
};
