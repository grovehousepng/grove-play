
'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { sectors } from '../data/sectors';
import styles from './SectorSlider.module.css';
import { ArrowRight, LayoutGrid } from 'lucide-react';

export default function SectorSlider() {
    const [width, setWidth] = useState(0);
    const carousel = useRef();

    useEffect(() => {
        if (carousel.current) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        }
    }, []);

    return (
        <section className={styles.section} id="cozumler">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Sektörel Çözümler</h2>
                    <p className={styles.subtitle}>
                        İşiniz ne olursa olsun, sizi dijital dünyada öne çıkaracak özel stratejilerimiz hazır.
                    </p>
                </div>

                <motion.div ref={carousel} className={styles.sliderWrapper} whileTap={{ cursor: "grabbing" }}>
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className={styles.sliderTrack}
                    >
                        {sectors.map((sector, index) => (
                            <Link
                                href={`/hizmet/${sector.slug}`}
                                key={sector.slug}
                                className={styles.card}
                                draggable="false"
                            >
                                <div>
                                    <div className={styles.cardIcon}>
                                        <LayoutGrid size={24} color="#333" />
                                    </div>
                                    <h3 className={styles.cardTitle}>{sector.title}</h3>
                                    <p className={styles.cardDesc}>{sector.desc}</p>
                                </div>
                                <div className={styles.cardLink}>
                                    İncele <ArrowRight size={16} className={styles.arrow} />
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
