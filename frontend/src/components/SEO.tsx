import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSEO } from '../useSEO';

interface SEOProps {
    pageSlug: string;
}

const SEO: React.FC<SEOProps> = ({ pageSlug }) => {
    const {
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        ogImage,
        canonical,
        robots,
        twitterCard,
        googleAnalyticsId
    } = useSEO(pageSlug);

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content={robots} />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Google Analytics */}
            {googleAnalyticsId && (
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
            )}
            {googleAnalyticsId && (
                <script>
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${googleAnalyticsId}');
                    `}
                </script>
            )}

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={ogDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={window.location.href} />

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={ogTitle} />
            <meta name="twitter:description" content={ogDescription} />
            <meta name="twitter:image" content={ogImage} />
        </Helmet>
    );
};

export default SEO;
