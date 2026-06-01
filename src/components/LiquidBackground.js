'use client';

import { motion } from 'framer-motion';
import styles from './LiquidBackground.module.css';

export default function LiquidBackground() {
    return (
        <div className={styles.background}>
            <div className={styles.grid} />
            <motion.div
                className={`${styles.blob} ${styles.blob1}`}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className={`${styles.blob} ${styles.blob2}`}
                animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
