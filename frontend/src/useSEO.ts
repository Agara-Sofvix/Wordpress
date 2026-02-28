import { useEffect, useState } from 'react';
import { getAssetPath } from './utils/assets';
import { getConfig } from './lib/config';

interface SEOData {
    meta_title?: string;
    meta_description?: string;
    keywords?: string;
    og_title?: string;
    og_description?: string;
    og_image_url?: string;
    canonical_url?: string;
    site_meta_title?: string;
    site_meta_description?: string;
    site_keywords?: string;
    twitter_card_type?: string;
    robots_index?: boolean;
    robots_follow?: boolean;
    google_analytics_id?: string;
}

export const useSEO = (pageSlug: string) => {
    const [seo, setSeo] = useState<SEOData | null>(null);
    const [globalSeo, setGlobalSeo] = useState<any>(null);

    useEffect(() => {
        const fetchSEO = async () => {
            const { apiBase } = getConfig();
            const seoBase = `${apiBase.replace(/\/$/, '')}/seo`;
            try {
                // Fetch Global SEO first as fallback
                const globalRes = await fetch(`${seoBase}/global`);
                const globalData = await globalRes.json();
                setGlobalSeo(globalData);

                // Fetch Page-specific SEO
                const pageRes = await fetch(`${seoBase}/pages/${pageSlug}`);
                if (pageRes.ok) {
                    const pageData = await pageRes.json();
                    setSeo(pageData);
                }
            } catch (error) {
                console.error('Error fetching SEO data:', error);
            }
        };

        fetchSEO();
    }, [pageSlug]);

    const title = seo?.meta_title || globalSeo?.site_meta_title || 'Agara-Sofvix';
    const description = seo?.meta_description || globalSeo?.site_meta_description || '';
    const keywords = seo?.keywords || globalSeo?.site_keywords || '';
    const ogImage = getAssetPath(seo?.og_image_url || globalSeo?.og_image_url || '');
    const ogTitle = seo?.og_title || title;
    const ogDescription = seo?.og_description || description;
    const canonical = seo?.canonical_url || '';

    // Dynamic robots logic
    const index = globalSeo?.robots_index ?? true ? 'index' : 'noindex';
    const follow = globalSeo?.robots_follow ?? true ? 'follow' : 'nofollow';
    const robots = `${index}, ${follow}`;

    return {
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        ogImage,
        canonical,
        robots,
        twitterCard: globalSeo?.twitter_card_type || 'summary_large_image',
        googleAnalyticsId: globalSeo?.google_analytics_id || ''
    };
};
