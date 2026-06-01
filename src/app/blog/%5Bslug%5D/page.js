import { blogs } from '../../../data/blogs';
import { sectors } from '../../../data/sectors';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Contact from '../../../components/Contact';
import styles from './page.module.css';

export async function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
        return { title: 'Blog Bulunamadı' };
    }

    return {
        title: `${blog.title} | Grove Media Creative`,
        description: blog.description,
        alternates: {
            canonical: `https://grovemediacreative.com.tr/blog/${blog.slug}`,
        },
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
        notFound();
    }

    const relatedSector = sectors.find(s => s.slug === blog.sectorSlug);

    return (
        <main>
            <Navbar />
            
            <article className={styles.article}>
                <header className={styles.header}>
                    <div className={styles.meta}>
                        <span>{blog.date}</span> • <span>{blog.category}</span>
                    </div>
                    <h1 className={styles.title}>{blog.title}</h1>
                </header>

                <div 
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {relatedSector && (
                    <div className={styles.ctaBox}>
                        <h3>{relatedSector.title} Alanında Profesyonel Destek mi Arıyorsunuz?</h3>
                        <p>Grove Media Creative olarak bu sektördeki tecrübemizle yanınızdayız.</p>
                        <a href={`/hizmet/${relatedSector.slug}`} className={styles.ctaButton}>
                            Hizmetimizi İnceleyin
                        </a>
                    </div>
                )}
            </article>

            {blog.faq && (
                <section className={styles.faq}>
                    <h2>Sık Sorulan Sorular</h2>
                    {blog.faq.map((item, index) => (
                        <div key={index} className={styles.faqItem}>
                            <h3>{item.q}</h3>
                            <p>{item.a}</p>
                        </div>
                    ))}
                </section>
            )}

            <Contact />
            <Footer />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": blog.title,
                        "description": blog.description,
                        "datePublished": blog.date,
                        "author": {
                            "@type": "Organization",
                            "name": "Grove Media Creative"
                        }
                    })
                }}
            />
            {blog.faq && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": blog.faq.map(f => ({
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
        </main>
    );
}
