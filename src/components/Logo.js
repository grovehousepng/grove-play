'use client';

import Image from 'next/image';
import styles from './Logo.module.css';

export default function Logo({ variant = 'light', size = 'normal' }) {
    const sizeClasses = {
        small: { width: 120, height: 40 },
        normal: { width: 180, height: 60 },
        large: { width: 220, height: 73 }
    };

    // Choose dimensions based on size prop
    const dimensions = sizeClasses[size] || sizeClasses.normal;

    return (
        <div className={`${styles.logo} ${styles[size] || ''} ${styles[variant]}`}>
            <Image
                src="/logo.png"
                alt="Grove Media Creative Logo"
                width={dimensions.width}
                height={dimensions.height}
                className=""
                style={{ objectFit: 'contain' }}
                priority
            />
        </div>
    );
}
