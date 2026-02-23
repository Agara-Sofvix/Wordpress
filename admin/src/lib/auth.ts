


const SESSION_KEY = 'agara_admin_session';

export const authService = {
    login: async (email: string) => {
        // Simple mock login that persists a session
        const session = {
            email,
            token: 'authenticated_token_' + Math.random().toString(36).substring(7),
            timestamp: Date.now()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return { error: null, session };
    },

    logout: () => {
        localStorage.removeItem(SESSION_KEY);
        window.location.href = '/admin/login';
    },

    getSession: () => {
        const session = localStorage.getItem(SESSION_KEY);
        if (!session) return null;
        try {
            return JSON.parse(session);
        } catch (e) {
            localStorage.removeItem(SESSION_KEY);
            return null;
        }
    },

    getToken: () => {
        const session = authService.getSession();
        return session?.token || null;
    },

    checkConnection: async () => {
        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 3000);
            const response = await fetch('http://127.0.0.1:5001/health', { signal: controller.signal });
            clearTimeout(id);
            return response.ok;
        } catch (e) {
            return false;
        }
    }
};
