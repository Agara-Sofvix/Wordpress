import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, search, hash } = useLocation();

    useEffect(() => {
        // Disable automatic scroll restoration to prevent browsers (like Firefox) 
        // from fighting our custom scroll logic.
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Handle hash scrolling with a robust retry mechanism
        if (hash) {
            const id = hash.replace('#', '');
            let scrollAttempts = 0;
            const maxAttempts = 20; // Try for 2 seconds

            const performScroll = () => {
                const element = document.getElementById(id);
                if (element) {
                    // Use requestAnimationFrame to sync with browser's paint cycle
                    requestAnimationFrame(() => {
                        // Small buffer timeout to ensure layout is final
                        setTimeout(() => {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });

                            // Firefox fallback: If scrollIntoView is ignored, use scrollTo
                            const rect = element.getBoundingClientRect();
                            const absoluteTop = rect.top + window.pageYOffset - 100; // 100px offset for header
                            if (Math.abs(window.pageYOffset - absoluteTop) > 200) {
                                window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
                            }
                        }, 50);
                    });
                    return true;
                }
                return false;
            };

            // Try immediately
            if (!performScroll()) {
                const intervalId = setInterval(() => {
                    scrollAttempts++;
                    if (performScroll() || scrollAttempts >= maxAttempts) {
                        clearInterval(intervalId);
                    }
                }, 100);
                return () => clearInterval(intervalId);
            }
            return;
        }

        // Force scroll to top on all other navigations
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'auto' });

        // Double check after a small delay
        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [pathname, search, hash]);

    return null;
};

export default ScrollToTop;
