'use client';

import styles from './loading.module.css';

export default function Loading() {
    return (
        <div className={styles.heroSkeleton}>
            {/* Title Skeletons */}
            <div className={`${styles.skeletonBox} ${styles.titleLine1}`}></div>
            <div className={`${styles.skeletonBox} ${styles.titleLine2}`}></div>

            {/* Subtitle Skeletons */}
            <div className={`${styles.skeletonBox} ${styles.subtitleLine1}`}></div>
            <div className={`${styles.skeletonBox} ${styles.subtitleLine2}`}></div>

            {/* CTA Buttons Skeletons */}
            <div className={styles.ctaContainer}>
                <div className={`${styles.skeletonBox} ${styles.button}`}></div>
                <div className={`${styles.skeletonBox} ${styles.button}`}></div>
            </div>
        </div>
    );
}
