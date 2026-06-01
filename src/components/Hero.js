'use client';

import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            {/* Animated decorative elements */}
            <motion.div
                className={styles.floatingShape1}
                animate={{
                    y: [0, -30, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className={styles.floatingShape2}
                animate={{
                    y: [0, 25, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className={styles.floatingShape3}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.span
                    className={styles.line1}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    MÜŞTERİ KAZANMAYA
                </motion.span>
                <br />
                <motion.span
                    className={styles.line2}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    BAŞLAYIN
                </motion.span>
            </motion.h1>

            <motion.p
                className={styles.subtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ fontSize: '1.25rem' }}
            >
                Reklam altyapınızı profesyonel dönüşüm takibi ile optimize edin.
                <br />Sektörünüze özel strateji ve ölçümleme çözümleri.
            </motion.p>

            <motion.div
                className={styles.cta}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                <motion.a
                    href="#contact"
                    className={styles.primaryBtn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Ücretsiz Analiz Al
                </motion.a>
                <motion.a
                    href="#services"
                    className={styles.secondaryBtn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Hizmetlerimiz →
                </motion.a>
            </motion.div>




            {/* Scroll indicator */}
            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 1.4 },
                    y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <span className={styles.scrollLine}></span>
            </motion.div>
        </section>
    );
}
