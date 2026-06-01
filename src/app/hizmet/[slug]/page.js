import { sectors } from '../../../data/sectors'; // Adjust path if needed
import { notFound } from 'next/navigation';
import SectorContent from './SectorContent';

export async function generateStaticParams() {
    return sectors.map((sector) => ({
        slug: sector.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const sector = sectors.find((s) => s.slug === slug);

    if (!sector) {
        return { title: 'Hizmet Bulunamadı' };
    }

    const seoTitle = sector.seoTitle || `${sector.title} | Dijital Pazarlama — Grove Media Creative`;
    const seoDescription = sector.seoDescription || `${sector.title} çözümleriyle dijitalde öne çıkın. Profesyonel web tasarımı ve reklam altyapısıyla anında yeni müşteriler kazanın.`;

    return {
        title: seoTitle,
        description: seoDescription,
        keywords: sector.keywords || [],
        alternates: {
            canonical: `https://grovemediacreative.com.tr/hizmet/${sector.slug}`,
        },
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            url: `https://grovemediacreative.com.tr/hizmet/${sector.slug}`,
            siteName: 'Grove Media Creative',
            images: [
                {
                    url: '/logo.png',
                    width: 1200,
                    height: 630,
                    alt: seoTitle,
                },
            ],
            locale: 'tr_TR',
            type: 'article',
            authors: ['Yücel Güzel'],
            publishedTime: new Date().toISOString(),
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDescription,
            creator: '@grovemedia',
            images: ['/logo.png'],
        },
        other: {
            'author': 'Yücel Güzel',
            'contact': '+905416834410',
            'geo.region': 'TR-42',
            'geo.placename': 'Konya',
        }
    };
}

export default async function SectorPage({ params }) {
    const { slug } = await params;
    const sector = sectors.find((s) => s.slug === slug);

    if (!sector) {
        notFound();
    }

    const seoDescription = sector.seoDescription || `${sector.title} çözümleriyle dijitalde öne çıkın. Profesyonel web tasarımı ve reklam altyapısıyla anında yeni müşteriler kazanın.`;

    return (
        <>
            <SectorContent sector={sector} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": sector.title,
                        "description": seoDescription,
                        "provider": {
                            "@type": "Organization",
                            "name": "Grove Media Creative"
                        },
                        "areaServed": {
                            "@type": "Country",
                            "name": "Turkey"
                        }
                    })
                }}
            />
            {sector.faq && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": sector.faq.map(f => ({
                                "@type": "Question",
                                "name": f.q,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": f.a
                                }
                            }))
                        })
                    }}
                />
            )}
        </>
    );
}
