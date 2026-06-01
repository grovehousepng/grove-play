'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './not-found.module.css';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.errorCode}
                >
                    404
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={styles.title}
                >
                    ÜZGÜNÜZ, <br />SAYFA BULUNAMADI
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={styles.description}
                >
                    Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. <br />
                    Birlikte doğru yere gidelim.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={styles.actions}
                >
                    <Link href="/" className={styles.homeBtn}>
                        <Home size={18} />
                        Anasayfa'ya Dön
                    </Link>
                    <Link href="/hizmetlerimiz" className={styles.servicesBtn}>
                        Hizmetlerimizi İnceleyin
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>

            {/* Background elements to match the site vibe */}
            <div className={styles.decorations}>
                <div className={styles.blob} />
            </div>
        </div>
    );
}
