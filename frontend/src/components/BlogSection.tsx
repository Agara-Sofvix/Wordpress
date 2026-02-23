import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogPost {
    _id: string;
    title: string;
    summary: string;
    image: string;
    date: string;
    author: string;
}

const BlogSection: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/content/blog');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data.slice(0, 3)); // Show only recent 3
                }
            } catch (err) {
                console.error('Error fetching blog posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading || posts.length === 0) return null;

    return (
        <section className="py-24 px-6 lg:px-20 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-navy-deep tracking-tight mb-4">Latest Insights</h2>
                        <p className="text-slate-600 text-lg max-w-2xl">Sharing our perspective on engineering, scalability, and digital transformation.</p>
                    </div>
                    {/* Placeholder for "View All" if we have a blog page later */}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col group"
                        >
                            <div className="aspect-video overflow-hidden relative">
                                <img
                                    src={post.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Engineering</span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                    <span>{new Date(post.date).toLocaleDateString()}</span>
                                    <span className="size-1 bg-slate-200 rounded-full"></span>
                                    <span>{post.author}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-navy-deep mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                                <p className="text-slate-600 mb-8 line-clamp-3">{post.summary}</p>
                                <div className="mt-auto flex items-center gap-2 text-primary font-bold group/btn cursor-pointer">
                                    <span>Read Insight</span>
                                    <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
