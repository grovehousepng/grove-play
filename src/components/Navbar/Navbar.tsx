'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Throttle: Ignore small scroll deltas to prevent jitter
      if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down & past threshold -> Hide
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true); // Scrolling up -> Show
      }

      lastScrollY.current = currentScrollY;
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${!isVisible ? styles.navbarHidden : ''}`}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 12h4M8 10v4M15 13h.01M18 11h.01M10 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6l2-2 2 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-6l-2 2-2-2Z" />
            </svg>
          </div>
          <div className={styles.logoStack}>
            <span className={`${styles.logoTextTop} ${orbitron.className}`}>GROVE</span>
            <span className={`${styles.logoTextBottom} ${orbitron.className}`}>PLAY</span>
          </div>
        </Link>
      </div>

      <div className={styles.center}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </div>
          <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.icons}>

          <Link href="/about" className={styles.roundIcon}>
            {/* Info / About Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
