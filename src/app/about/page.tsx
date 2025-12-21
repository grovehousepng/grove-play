import styles from './page.module.css';
import { Orbitron, Urbanist } from 'next/font/google';

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '600', '800', '900'],
});

const urbanist = Urbanist({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export default function AboutPage() {
    return (
        <div className={`${styles.container} ${urbanist.className}`}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={`${styles.title} ${orbitron.className}`}>GROVE GAMES</h1>
                    <span className={`${styles.subtitle} ${orbitron.className}`}>GAMING UNLEASHED</span>
                </div>

                <div className={styles.content}>
                    <p>
                        Welcome to Grove Games, your ultimate destination for instant gaming.
                        We believe that high-quality gaming should be accessible to everyone, anywhere,
                        without the hassle of downloads, updates, or expensive hardware.
                    </p>

                    <div className={styles.section}>
                        <h2 className={`${styles.sectionTitle} ${orbitron.className}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                            OUR MISSION
                        </h2>
                        <p>
                            To empower players with a vast library of free games that run smoothly in your browser.
                            Whether you're on a desktop, tablet, or mobile, Grove Games delivers console-quality
                            experiences with just a click.
                        </p>
                    </div>

                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={`${styles.statValue} ${orbitron.className}`}>1000+</span>
                            <span className={styles.statLabel}>GAMES</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={`${styles.statValue} ${orbitron.className}`}>0%</span>
                            <span className={styles.statLabel}>DOWNLOADS</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={`${styles.statValue} ${orbitron.className}`}>100%</span>
                            <span className={styles.statLabel}>FREE</span>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={`${styles.sectionTitle} ${orbitron.className}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                            GLOBAL COMMUNITY
                        </h2>
                        <p>
                            Join thousands of daily players from around the world. Challenge your friends,
                            beat high scores, and discover new adventures every single day.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
