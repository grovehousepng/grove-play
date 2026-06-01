import React from 'react';
import styles from './ReferencesSlider.module.css';
import Image from 'next/image';
import WaveTransition from './WaveTransition';

export default function ReferencesSlider() {
    // Array of 14 items since we have 1.png to 14.png
    const logos = Array.from({ length: 14 }, (_, i) => `${i + 1}.png`);

    return (
        <section className={styles.sliderSection}>
            <div className={styles.waveWrapper}>
                <WaveTransition color="#FFFFFF" position="top" />
            </div>
            <div className={styles.container}>
                {/* <p className={styles.subtitle}>BİZE GÜVENEN MARKALAR</p> */}
                
                <div className={styles.slider}>
                    <div className={styles.slideTrack}>
                        {/* Render twice for seamless infinite scrolling */}
                        {[...logos, ...logos].map((logo, index) => (
                            <div className={styles.slide} key={index}>
                                <Image 
                                    src={`/referanslar/${logo}`} 
                                    alt={`Referans ${index + 1}`} 
                                    width={320} 
                                    height={160} 
                                    style={{ 
                                        objectFit: 'contain'
                                    }}
                                    className={styles.logoImage}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
