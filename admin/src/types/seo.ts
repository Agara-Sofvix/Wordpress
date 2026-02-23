export interface GlobalSEO {
    _id?: string;
    site_meta_title: string;
    site_meta_description: string;
    site_keywords: string;
    og_image_url: string;
    twitter_card_type: 'summary' | 'summary_large_image' | 'app' | 'player';
    robots_index: boolean;
    robots_follow: boolean;
    google_analytics_id: string;
    updated_at?: string;
}

export interface PageSEO {
    _id?: string;
    page_slug: string;
    meta_title: string;
    meta_description: string;
    keywords: string;
    og_title: string;
    og_description: string;
    og_image_url: string;
    canonical_url: string;
    updated_at?: string;
}

export type PageSlug = 'home' | 'about' | 'services' | 'industries' | 'contact' | 'blog';
