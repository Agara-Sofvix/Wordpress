import React, { useState, useEffect } from 'react';
import { Save, Globe, Smartphone, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SEOFormProps {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
    canonical?: string;
    onSave: (data: any) => Promise<void>;
    isLoading: boolean;
    isPageLevel?: boolean;
    initialData?: {
        twitter_card_type?: string;
        robots_index?: boolean;
        robots_follow?: boolean;
        google_analytics_id?: string;
    };
}

const SEOForm: React.FC<SEOFormProps> = ({
    title: initialTitle,
    description: initialDescription,
    keywords: initialKeywords,
    ogImage: initialOgImage,
    canonical: initialCanonical,
    onSave,
    isLoading,
    isPageLevel = false,
    initialData
}) => {
    const [title, setTitle] = useState(initialTitle || '');
    const [description, setDescription] = useState(initialDescription || '');
    const [keywords, setKeywords] = useState(initialKeywords || '');
    const [ogImage, setOgImage] = useState(initialOgImage || '');
    const [canonical, setCanonical] = useState(initialCanonical || '');
    const [twitterCard, setTwitterCard] = useState(initialData?.twitter_card_type || 'summary_large_image');
    const [robotsIndex, setRobotsIndex] = useState(initialData?.robots_index ?? true);
    const [robotsFollow, setRobotsFollow] = useState(initialData?.robots_follow ?? true);
    const [googleAnalyticsId, setGoogleAnalyticsId] = useState(initialData?.google_analytics_id || '');

    useEffect(() => {
        setTitle(initialTitle || '');
        setDescription(initialDescription || '');
        setKeywords(initialKeywords || '');
        setOgImage(initialOgImage || '');
        setCanonical(initialCanonical || '');
        if (!isPageLevel && initialData) {
            setTwitterCard(initialData.twitter_card_type || 'summary_large_image');
            setRobotsIndex(initialData.robots_index ?? true);
            setRobotsFollow(initialData.robots_follow ?? true);
            setGoogleAnalyticsId(initialData.google_analytics_id || '');
        }
    }, [initialTitle, initialDescription, initialKeywords, initialOgImage, initialCanonical, initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data: any = {
            meta_title: title,
            meta_description: description,
            keywords: keywords,
        };
        if (isPageLevel) {
            data.og_title = title;
            data.og_description = description;
            data.og_image_url = ogImage;
            data.canonical_url = canonical;
        } else {
            data.site_meta_title = title;
            data.site_meta_description = description;
            data.site_keywords = keywords;
            data.og_image_url = ogImage;
            data.twitter_card_type = twitterCard;
            data.robots_index = robotsIndex;
            data.robots_follow = robotsFollow;
            data.google_analytics_id = googleAnalyticsId;
        }
        onSave(data);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-gray-300">Meta Title</label>
                            <span className={`text-xs ${(title?.length || 0) > 60 ? 'text-yellow-500' : 'text-gray-500'}`}>
                                {title?.length || 0}/60
                            </span>
                        </div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-display"
                            placeholder="Enter meta title..."
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-gray-300">Meta Description</label>
                            <span className={`text-xs ${(description?.length || 0) > 160 ? 'text-yellow-500' : 'text-gray-500'}`}>
                                {description?.length || 0}/160
                            </span>
                        </div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[120px] resize-none"
                            placeholder="Enter meta description..."
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Keywords (comma separated)</label>
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="keyword1, keyword2, keyword3"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">OG Image URL</label>
                        <input
                            type="text"
                            value={ogImage}
                            onChange={(e) => setOgImage(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono text-sm"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {!isPageLevel && (
                        <>
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Twitter Card Type</label>
                                <select
                                    value={twitterCard}
                                    onChange={(e) => setTwitterCard(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                >
                                    <option value="summary">Summary</option>
                                    <option value="summary_large_image">Summary with Large Image</option>
                                    <option value="app">App</option>
                                    <option value="player">Player</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/20 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-300">Robots Index</label>
                                    <button
                                        type="button"
                                        onClick={() => setRobotsIndex(!robotsIndex)}
                                        className={`w-12 h-6 rounded-full transition-all relative ${robotsIndex ? 'bg-primary' : 'bg-gray-600'}`}
                                    >
                                        <div className={`absolute top-1 bottom-1 w-4 rounded-full bg-white transition-all ${robotsIndex ? 'right-1' : 'left-1'}`}></div>
                                    </button>
                                </div>
                                <div className="bg-black/20 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-300">Robots Follow</label>
                                    <button
                                        type="button"
                                        onClick={() => setRobotsFollow(!robotsFollow)}
                                        className={`w-12 h-6 rounded-full transition-all relative ${robotsFollow ? 'bg-primary' : 'bg-gray-600'}`}
                                    >
                                        <div className={`absolute top-1 bottom-1 w-4 rounded-full bg-white transition-all ${robotsFollow ? 'right-1' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Google Analytics ID</label>
                                <input
                                    type="text"
                                    value={googleAnalyticsId}
                                    onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono text-sm"
                                    placeholder="G-XXXXXXXXXX"
                                />
                            </div>
                        </>
                    )}

                    {isPageLevel && (
                        <div>
                            <label className="text-sm font-medium text-gray-300 mb-2 block">Canonical URL</label>
                            <input
                                type="text"
                                value={canonical}
                                onChange={(e) => setCanonical(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                placeholder="https://example.com/page"
                            />
                        </div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Changes
                            </>
                        )}
                    </motion.button>
                </form>
            </div>

            <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Google Preview
                </h3>
                <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 max-w-xl">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Globe className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-[14px] text-gray-900 leading-none">Agara-Sofvix</p>
                            <p className="text-[12px] text-gray-500 truncate">
                                {window.location.protocol}//{window.location.hostname}{isPageLevel ? '/...' : ''}
                            </p>
                        </div>
                        <span className="ml-auto text-gray-400">⋮</span>
                    </div>
                    <h3 className="text-[#1a0dab] text-xl font-medium mb-1 hover:underline cursor-pointer leading-tight">
                        {title || 'Your Meta Title will appear here'}
                    </h3>
                    <p className="text-[#4d5156] text-[14px] leading-relaxed line-clamp-2">
                        {description || 'Provide a compelling description of what this page is about to attract users from search results...'}
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-blue-300">SEO Tip</p>
                            <p className="text-xs text-blue-400/80 mt-1">
                                Aim for meta titles between 50-60 characters and descriptions between 150-160 characters for optimal display.
                            </p>
                        </div>
                    </div>

                    {ogImage && (
                        <div className="border border-white/5 rounded-2xl overflow-hidden bg-black/20">
                            <div className="p-3 border-b border-white/5 bg-white/5">
                                <p className="text-xs font-medium text-gray-400 flex items-center gap-2">
                                    <Smartphone className="w-3 h-3" />
                                    Open Graph Image Preview
                                </p>
                            </div>
                            <img src={ogImage} alt="OG Preview" className="w-full h-48 object-cover" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SEOForm;
