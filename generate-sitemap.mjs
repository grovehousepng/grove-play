import fs from 'fs';
import path from 'path';
import { sectors } from './src/data/sectors.js';

const baseUrl = 'https://grovemediacreative.com.tr';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${baseUrl}/hakkimizda</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${baseUrl}/gizlilik-politikasi</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>${baseUrl}/fiyatlandirma</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    ${sectors.map(sector => `
    <url>
        <loc>${baseUrl}/hizmet/${sector.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`).join('')}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), 'out', 'sitemap.xml'), sitemap);
console.log('Sitemap generated in out/sitemap.xml');
