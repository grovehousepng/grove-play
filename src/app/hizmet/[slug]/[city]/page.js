import { sectors } from '../../../../data/sectors';
import { cities } from '../../../../data/cities';
import { notFound } from 'next/navigation';
import SectorContent from '../SectorContent';

export async function generateStaticParams() {
  const params = [];
  
  // Sadece belirli sektörler veya tümü için çoklanabilir
  // Build time'ı korumak için sadece ana şehirleri statik üretiyoruz
  sectors.forEach((sector) => {
    cities.forEach((city) => {
      params.push({
        slug: sector.slug,
        city: city.slug,
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }) {
  const { slug, city: citySlug } = await params;
  const sector = sectors.find((s) => s.slug === slug);
  const city = cities.find((c) => c.slug === citySlug);

  if (!sector || !city) return { title: 'Sayfa Bulunamadı' };

  const title = `${city.name} ${sector.title} | Grove Media Creative`;
  const description = `${city.name} bölgesinde profesyonel ${sector.title} çözümleri. AI destekli reklam altyapısı ile işinizi büyütün.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://grovemediacreative.com.tr/hizmet/${slug}/${citySlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://grovemediacreative.com.tr/hizmet/${slug}/${citySlug}`,
      type: 'website',
    }
  };
}

export default async function RegionalSectorPage({ params }) {
  const { slug, city: citySlug } = await params;
  const sector = sectors.find((s) => s.slug === slug);
  const city = cities.find((c) => c.slug === citySlug);

  if (!sector || !city) notFound();

  // Lokalize edilmiş sektör verisi oluştur
  const localizedSector = {
    ...sector,
    title: `${city.name} ${sector.title}`,
    desc: `${city.name} ve çevresinde ${sector.desc}`,
  };

  return <SectorContent sector={localizedSector} />;
}
