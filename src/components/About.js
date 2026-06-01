'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Linkedin } from 'lucide-react';
import FlyingRockets from './FlyingRockets';
import Globe from './Globe';
import { sectors } from '../data/sectors';
import styles from './About.module.css';

export default function About() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className={styles.section} id="agency" style={{ position: 'relative', overflow: 'hidden' }}>
            <FlyingRockets />
            <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className={styles.label}>Neden Biz?</span>
                        <h2 className={styles.title}>Veriye Dayalı Dijital Pazarlama</h2>
                        <p className={styles.description}>
                            Grove Media Creative olarak, reklam harcamalarınızın her kuruşunu ölçümlenebilir sonuçlara dönüştürüyoruz.
                            Reklam altyapısı, dönüşüm takibi ve analitik uzmanlığımızla işletmenizin büyümesini hızlandırıyoruz.
                        </p>
                        <a
                            href="https://www.linkedin.com/in/y%C3%BCcel-g%C3%BCzel-787794273/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.linkedinLink}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0071E3', fontWeight: '500', marginTop: '16px', textDecoration: 'none' }}
                        >
                            <Linkedin size={20} /> LinkedIn'de Bağlantı Kurun
                        </a>
                    </motion.div>

                    <motion.div
                        className={styles.stats}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>300+</span>
                            <span className={styles.statLabel}>Yönetilen Kampanya</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>₺500.000+</span>
                            <span className={styles.statLabel}>Reklam Bütçesi</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>%40</span>
                            <span className={styles.statLabel}>Ortalama ROAS Artışı</span>
                        </div>
                    </motion.div>
                </div>

                <div className={styles.sectors} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Globe />
                </div>
            </div>
        </section>
    );
}
