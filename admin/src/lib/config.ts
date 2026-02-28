export const getConfig = () => {
    // 0. Environment Variable (Vite) - Highest Priority
    const viteApiUrl = import.meta.env.VITE_API_URL;
    if (viteApiUrl) {
        return {
            apiBase: viteApiUrl,
            healthCheck: viteApiUrl.replace(/\/api$/, '/health').replace(/\/api\/$/, '/health')
        };
    }

    // Check if WordPress has provided a configuration
    const config = (window as any).agaraReactAdminConfig;
    const wpProxyUrl = config?.proxyUrl;
    const wpApiUrl = config?.apiUrl;

    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    // 1. Dynamic Hostname Check
    // If we are on a production-like domain, use its base for the API
    if (hostname.includes('agara-sofvix.com')) {
        const prodBase = wpApiUrl || `https://agara-sofvix.com/api`;
        return {
            apiBase: prodBase,
            healthCheck: prodBase.replace(/\/api$/, '/health').replace(/\/api\/$/, '/health')
        };
    }

    // 2. WordPress Proxy Discovery (for local testing/alternate domains)
    if (wpProxyUrl) {
        const rootUrl = wpProxyUrl.replace(/\/$/, '');
        return {
            apiBase: `${rootUrl}/api`,
            healthCheck: `${rootUrl}/health`
        };
    }

    // 3. Last Resort: Local discovery
    const base = `${protocol}//${hostname}:5001/api`;

    const finalConfig = {
        apiBase: base,
        healthCheck: base.replace(/\/api$/, '/health').replace(/\/api\/$/, '/health')
    };

    console.log('[Config] Discovery result:', finalConfig);
    return finalConfig;
};
