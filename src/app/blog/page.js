import { blogs } from '../../data/blogs';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Contact from '../../components/Contact';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
    title: 'Dijital Pazarlama Blog | Grove Media Creative',
    description: 'Sektörünüze özel dijital pazarlama stratejileri, Google Ads rehberleri ve web tasarım ipuçları.',
    alternates: {
        canonical: 'https://grovemediacreative.com.tr/blog',
    },
};

export default function BlogIndex() {
    return (
        <main>
            <Navbar />
            
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Dijital Pazarlama Blog</h1>
                    <p className={styles.subtitle}>
                        Sektörünüzü büyütmenize yardımcı olacak stratejik bilgiler ve teknik rehberler.
                    </p>
                </header>

                <div className={styles.grid}>
                    {blogs.map((blog) => (
                        <Link key={blog.slug} href={`/blog/${blog.slug}`} className={styles.card}>
                            <div className={styles.category}>{blog.category}</div>
                            <h2 className={styles.cardTitle}>{blog.title}</h2>
                            <p className={styles.excerpt}>{blog.description}</p>
                            <div className={styles.footer}>
                                <span>{blog.date}</span>
                                <span className={styles.readMore}>Devamını Oku →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Contact />
            <Footer />
        </main>
    );
}
