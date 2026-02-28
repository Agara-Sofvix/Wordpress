import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
    pageSlug: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({ pageSlug }) => {
    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Agara Sofvix",
        "alternateName": "Agara Sofvix IT Solutions Chennai",
        "image": "https://agara-sofvix.com/assets/logo.png",
        "@id": "https://agara-sofvix.com",
        "url": "https://agara-sofvix.com",
        "telephone": "+919498069292",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Pillaiyar kovil, Tharamani, Velachery",
            "addressLocality": "Chennai",
            "addressRegion": "Tamil Nadu",
            "postalCode": "600113",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 12.9830,
            "longitude": 80.2296
        },
        "description": "Best Web Development and SaaS Development Company in Chennai, Velachery, and Tharamani near Tharamani IT Hub.",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.linkedin.com/company/agara-sofvix/",
            "https://www.instagram.com/agara_sofvix"
        ],
        "knowsAbout": [
            "Web Development",
            "SaaS Architecture",
            "Technical SEO",
            "Cloud Computing",
            "Digital Transformation"
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://agara-sofvix.com"
            },
            ...(pageSlug !== 'home' ? [{
                "@type": "ListItem",
                "position": 2,
                "name": pageSlug.charAt(0).toUpperCase() + pageSlug.slice(1),
                "item": `https://agara-sofvix.com/${pageSlug}`
            }] : [])
        ]
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "SaaS and Web Development",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Agara Sofvix"
        },
        "areaServed": [
            { "@type": "City", "name": "Chennai" },
            { "@type": "City", "name": "Tharamani" },
            { "@type": "City", "name": "Velachery" },
            { "@type": "Country", "name": "India" }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Agara Sofvix Digital Engineering Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom Web Application Development in Tharamani",
                        "description": "High-performance web apps tailored for Chennai tech hubs."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "SaaS Product Development in Chennai",
                        "description": "Scalable multi-tenant software architectures."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "SEO & Digital Marketing in Velachery",
                        "description": "Result-oriented growth strategies."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "IT Infrastructure Setup in Tharamani",
                        "description": "Professional server and network configurations."
                    }
                }
            ]
        }
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(businessSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>
            {pageSlug === 'services' && (
                <script type="application/ld+json">
                    {JSON.stringify(serviceSchema)}
                </script>
            )}
        </Helmet>
    );
};

export default StructuredData;
