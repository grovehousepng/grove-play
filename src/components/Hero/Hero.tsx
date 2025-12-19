'use client';

import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.gamepad}></div>

            <div className={styles.content}>
                <h1 className={styles.title}>
                    GROVE <span className={styles.accent}>GAMES</span>
                </h1>

                <p className={styles.subtitle}>
                    İndirmeden Oyna. Sınırsız Eğlenceyi <br />
                    Tarayıcında Keşfet.
                </p>

                <div className={styles.actions}>
                    <Link href="#play" className="btn-primary">
                        HEMEN OYNA
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
