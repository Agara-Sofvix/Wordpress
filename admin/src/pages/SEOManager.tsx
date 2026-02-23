import React, { useState, useEffect } from 'react';
import SEOForm from '../components/SEOForm';
import { GlobalSEO, PageSEO, PageSlug } from '../types/seo';
import { Globe, FileText, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE = 'http://127.0.0.1:5001/api/seo';

const SEOManager: React.FC = () => {
    const [globalSeo, setGlobalSeo] = useState<GlobalSEO | null>(null);
    const [pageSeo, setPageSeo] = useState<PageSEO | null>(null);
    const [selectedPage, setSelectedPage] = useState<PageSlug>('home');
    const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [activeTab, setActiveTab] = useState<'global' | 'pages'>('global');

    useEffect(() => {
        fetchGlobalSEO();
        fetchPageSEO('home');
    }, []);

    const fetchGlobalSEO = async () => {
        try {
            const response = await fetch(`${API_BASE}/global`);
            if (response.ok) {
                const data = await response.json();
                setGlobalSeo(data);
            }
        } catch (error) {
            console.error('Error fetching global SEO:', error);
            toast.error('Failed to load global SEO settings');
        }
    };

    const fetchPageSEO = async (slug: string) => {
        setIsLoadingPage(true);
        try {
            const response = await fetch(`${API_BASE}/pages/${slug}`);
            if (response.ok) {
                const data = await response.json();
                setPageSeo(data);
            } else if (response.status === 404) {
                // Return default empty state if not found
                setPageSeo({
                    page_slug: slug,
                    meta_title: '',
                    meta_description: '',
                    keywords: '',
                    og_title: '',
                    og_description: '',
                    og_image_url: '',
                    canonical_url: ''
                });
            }
        } catch (error) {
            console.error('Error fetching page SEO:', error);
            toast.error(`Failed to load SEO for ${slug}`);
        } finally {
            setIsLoadingPage(false);
        }
    };

    const handleGlobalSave = async (data: any) => {
        setIsLoadingGlobal(true);
        try {
            const response = await fetch(`${API_BASE}/global`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const updatedData = await response.json();
                setGlobalSeo(updatedData);
                toast.success('Global SEO settings updated');
            } else {
                throw new Error('Failed to update');
            }
        } catch (error) {
            toast.error('Error saving global SEO');
        } finally {
            setIsLoadingGlobal(false);
        }
    };

    const handlePageSave = async (data: any) => {
        setIsLoadingPage(true);
        try {
            const response = await fetch(`${API_BASE}/pages/${selectedPage}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const updatedData = await response.json();
                setPageSeo(updatedData);
                toast.success(`SEO for "${selectedPage}" updated`);
            } else {
                throw new Error('Failed to update');
            }
        } catch (error) {
            toast.error(`Error saving SEO for ${selectedPage}`);
        } finally {
            setIsLoadingPage(false);
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white font-display uppercase tracking-tight">SEO Manager</h1>
                    <p className="text-gray-400 mt-2">Control how your website appears in search engines and social media.</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 h-fit self-start">
                    <button
                        onClick={() => setActiveTab('global')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'global' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white'}`}
                    >
                        Global SEO
                    </button>
                    <button
                        onClick={() => setActiveTab('pages')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'pages' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white'}`}
                    >
                        Page-Level SEO
                    </button>
                </div>
            </header>

            {activeTab === 'global' ? (
                <section className="space-y-6">
                    <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-2xl border border-primary/20">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                                <Globe className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Global SEO Settings</h2>
                                <p className="text-gray-400 text-sm">Update the default SEO values for your entire application. These values will be used as fallbacks if a page doesn't have specific SEO settings.</p>
                            </div>
                        </div>
                    </div>

                    {globalSeo && (
                        <SEOForm
                            title={globalSeo.site_meta_title}
                            description={globalSeo.site_meta_description}
                            keywords={globalSeo.site_keywords}
                            ogImage={globalSeo.og_image_url}
                            onSave={handleGlobalSave}
                            isLoading={isLoadingGlobal}
                            initialData={globalSeo}
                        />
                    )}
                </section>
            ) : (
                <section className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-500/10 to-transparent p-6 rounded-2xl border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                                <FileText className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Page-Level SEO</h2>
                                <p className="text-gray-400 text-sm">Customize SEO metadata for individual pages to improve ranking and social sharing.</p>
                            </div>
                        </div>

                        <div className="relative min-w-[200px]">
                            <select
                                value={selectedPage}
                                onChange={(e) => {
                                    const val = e.target.value as PageSlug;
                                    setSelectedPage(val);
                                    fetchPageSEO(val);
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                            >
                                <option value="home">Home Page</option>
                                <option value="about">About Us</option>
                                <option value="services">Services</option>
                                <option value="industries">Industries</option>
                                <option value="contact">Contact</option>
                                <option value="blog">Blog</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {pageSeo && (
                        <SEOForm
                            key={selectedPage}
                            title={pageSeo.meta_title}
                            description={pageSeo.meta_description}
                            keywords={pageSeo.keywords}
                            ogImage={pageSeo.og_image_url}
                            canonical={pageSeo.canonical_url}
                            onSave={handlePageSave}
                            isLoading={isLoadingPage}
                            isPageLevel={true}
                        />
                    )}
                </section>
            )}
        </div>
    );
};

export default SEOManager;
