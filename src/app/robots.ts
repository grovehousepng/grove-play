import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://groveplay.com/sitemap.xml', // Update domain before launch if known, otherwise relative works in some contexts but full is better. Using placeholder based on context.
    };
}
