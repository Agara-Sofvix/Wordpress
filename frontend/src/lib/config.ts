export const getConfig = () => {
    // 0. Environment Variable (Vite) - Highest Priority
    const viteApiUrl = import.meta.env.VITE_API_URL;
    if (viteApiUrl) {
        return {
            apiBase: viteApiUrl,
            assetsBase: '/assets'
        };
    }

    // Check if WordPress has provided configuration
    const wpConfig = (window as any).WP_THEME_DATA;
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    // Smart Discovery:
    // 1. If on production domain, use production API (from WP or hardcoded)
    if (hostname.includes('agara-sofvix.com')) {
        return {
            apiBase: wpConfig?.apiUrl || `https://agara-sofvix.com/api`,
            assetsBase: wpConfig?.assetsUrl || '/assets'
        };
    }

    // 2. Default to current host with port 5001 (handles localhost and local network IP)
    const apiBase = `${protocol}//${hostname}:5001/api`;

    return {
        apiBase,
        assetsBase: wpConfig?.assetsUrl || '/assets'
    };
};
