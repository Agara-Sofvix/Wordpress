import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSEO } from '../useSEO';
import StructuredData from './StructuredData';

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
        <>
            <StructuredData pageSlug={pageSlug} />
            <Helmet>
                {/* Standard metadata */}
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="robots" content={robots} />
                <link rel="canonical" href={canonical || window.location.href} />

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
                        gtag('config', '${googleAnalyticsId}', {
                          page_path: window.location.pathname,
                        });
                    `}
                    </script>
                )}

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Agara Sofvix" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={ogDescription} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:url" content={window.location.href} />

                {/* Twitter */}
                <meta name="twitter:card" content={twitterCard} />
                <meta name="twitter:title" content={ogTitle} />
                <meta name="twitter:description" content={ogDescription} />
                <meta name="twitter:image" content={ogImage} />
                <meta name="twitter:site" content="@agara_sofvix" />
            </Helmet>
        </>
    );
};

export default SEO;
