/**
 * Utility to resolve asset paths correctly in both local development
 * and within a WordPress theme environment.
 */

declare global {
    interface Window {
        WP_THEME_DATA?: {
            templateUrl: string;
            assetsUrl: string;
        };
    }
}

export const getAssetPath = (path: string): string => {
    // If we are in WordPress, use the injected theme URL
    if (window.WP_THEME_DATA?.templateUrl) {
        // Remove leading slash if present
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${window.WP_THEME_DATA.templateUrl}/${cleanPath}`;
    }

    // Fallback to local development path
    return path;
};
