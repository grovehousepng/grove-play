import { sectors } from '../data/sectors';
import { cities } from '../data/cities';

export const dynamic = 'force-static';

export default async function sitemap() {
  const baseUrl = 'https://grovemediacreative.com.tr';

  // Statik rotalar
  const staticRoutes = ['', '/hakkimizda', '/hizmetlerimiz', '/fiyatlandirma', '/referanslar'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dinamik sektör rotaları
  const sectorRoutes = sectors.map((sector) => ({
    url: `${baseUrl}/hizmet/${sector.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Bölgesel rotalar (Programmatic SEO)
  const regionalRoutes = [];
  sectors.forEach((sector) => {
    cities.forEach((city) => {
      regionalRoutes.push({
        url: `${baseUrl}/hizmet/${sector.slug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return [...staticRoutes, ...sectorRoutes, ...regionalRoutes];
}
