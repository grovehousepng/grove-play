'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './page.module.css';
import Image from 'next/image';
import WaveTransition from '../../components/WaveTransition';

export default function Referanslar() {
    // We have 14 logos
    const logos = Array.from({ length: 14 }, (_, i) => `${i + 1}.png`);
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const closeModal = () => setSelectedLogo(null);

    return (
        <div className={styles.pageContainer}>
            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Bize Güvenen Markalar</h1>
                    <p className={styles.subtitle}>
                        Dijital dünyada başarıya ulaştırdığımız, güvenilir iş ortaklarımız. Sizin projenizde de birlikte yürümekten mutluluk duyarız.
                    </p>
                </div>
                <WaveTransition position="bottom" color="#fafafa" />
            </section>

            <section className={styles.gridSection}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {logos.map((logo, index) => (
                            <div 
                                key={index} 
                                className={styles.gridItem}
                                onClick={() => setSelectedLogo(logo)}
                            >
                                <div className={styles.imageWrapper}>
                                    <Image 
                                        src={`/referanslar/${logo}`} 
                                        alt={`Referans ${index + 1}`} 
                                        fill
                                        style={{ 
                                            objectFit: 'contain'
                                        }}
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        className={styles.dynamicImage}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {isMounted && selectedLogo && createPortal(
                <div className={styles.modalOverlay} onClick={closeModal} style={{ zIndex: 2147483647 }}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeModal}>×</button>
                        <div className={styles.modalImageWrapper}>
                            <Image 
                                src={`/referanslar/${selectedLogo}`} 
                                alt="Büyütülmüş Referans"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
