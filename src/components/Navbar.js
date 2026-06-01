'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import Logo from './Logo';
import { sectors } from '../data/sectors';

import { trackContactClick } from '../utils/analytics';

import { Menu, X, ChevronDown, Instagram, Tag } from 'lucide-react';
import CouponPopup from './CouponPopup';

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [couponOpen, setCouponOpen] = useState(false);

    // Define pages with light background (requiring dark navbar text/logo)
    const lightPages = ['/', '/hakkimizda', '/hizmetlerimiz', '/fiyatlandirma'];
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const isLightPage = lightPages.includes(normalizedPath) || normalizedPath.startsWith('/hizmet/');

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine scroll direction and visibility
            if (currentScrollY > 50) {
                setScrolled(true);
                if (currentScrollY > lastScrollY) {
                    // Scrolling DOWN -> Hide
                    setIsVisible(false);
                } else {
                    // Scrolling UP -> Show
                    setIsVisible(true);
                }
            } else {
                setScrolled(false);
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // Determine navbar branding (Logo variant and Text color)
    // On light pages: Always Dark (Black)
    // On dark pages (Home): Light (White) initially, checks scroll? 
    // Actually, usually scrolled navbar becomes white bg -> dark text.
    // Unscrolled home -> transparent bg -> white text.

    // Logic:
    // If isLightPage: Text is always dark. Logo is dark.
    // If !isLightPage (Home) AND !scrolled: Text is light. Logo is light.
    // If !isLightPage (Home) AND scrolled: Text is dark. Logo is dark (because bg is white).

    const useDarkTheme = isLightPage || scrolled;

    return (
        <>
            <nav className={[
                styles.navbar,
                scrolled && styles.scrolled,
                isLightPage && !scrolled && styles.lightPageNav // specific style for light pages when not scrolled
            ].filter(Boolean).join(' ')}

                style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.3s ease-in-out'
                }}
            >
                <div className={styles.container}>
                    <Link href="/" className={styles.logoLink} onClick={closeMobileMenu}>
                        <Logo variant={useDarkTheme ? "dark" : "light"} size="small" />
                    </Link>

                    {/* Desktop Links */}
                    <div className={[styles.links, useDarkTheme ? styles.darkLinks : ''].filter(Boolean).join(' ')}>
                        <div className={styles.dropdown}>
                            <Link href="/hizmetlerimiz" className={styles.link}>Hizmetler</Link>
                            <div className={styles.dropdownContent}>
                                {sectors.map((sector) => (
                                    <Link
                                        key={sector.slug}
                                        href={`/hizmet/${sector.slug}`}
                                        className={styles.dropdownLink}
                                    >
                                        {sector.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Link href="/referanslar" className={styles.link}>Referanslar</Link>
                        <Link href="/hakkimizda" className={styles.link}>Hakkımızda</Link>
                        <button
                            className={styles.link}
                            onClick={() => setCouponOpen(true)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
                        >
                            Fiyatlandırma
                        </button>
                        <Link
                            href="/#contact"
                            className={styles.contactBtn}
                            onClick={() => trackContactClick('click', 'navbar_cta', 'Genel')}
                        >
                            Ücretsiz Analiz
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className={styles.hamburger} onClick={toggleMobileMenu} aria-label="Menu">
                        {mobileMenuOpen ? <X size={28} color="#333" /> : <Menu size={28} color="#333" />}
                    </button>

                    {/* Mobile Menu Overlay */}
                    <div className={[styles.mobileMenu, mobileMenuOpen && styles.mobileMenuOpen].filter(Boolean).join(' ')}>
                        <div className={styles.mobileLinks}>
                            <div className={styles.mobileDropdown}>
                                <button
                                    className={styles.mobileLink}
                                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}
                                >
                                    Hizmetler <ChevronDown size={20} style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                                </button>
                                <div className={[styles.mobileDropdownContent, mobileServicesOpen && styles.mobileDropdownOpen].filter(Boolean).join(' ')}>
                                    {sectors.map((sector) => (
                                        <Link
                                            key={sector.slug}
                                            href={`/hizmet/${sector.slug}`}
                                            className={styles.mobileDropdownLink}
                                            onClick={closeMobileMenu}
                                        >
                                            {sector.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link href="/referanslar" className={styles.mobileLink} onClick={closeMobileMenu}>
                                Referanslar
                            </Link>
                            <Link href="/hakkimizda" className={styles.mobileLink} onClick={closeMobileMenu}>
                                Hakkımızda
                            </Link>
                            <button
                                className={styles.mobileLink}
                                onClick={() => {
                                    closeMobileMenu();
                                    setCouponOpen(true);
                                }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <Tag size={18} /> Fiyatlandırma
                            </button>
                            <Link
                                href="/#contact"
                                className={styles.mobileContactBtn}
                                onClick={() => {
                                    closeMobileMenu();
                                    trackContactClick('click', 'mobile_navbar_cta', 'Genel');
                                }}
                            >
                                Ücretsiz Analiz
                            </Link>
                            <Link
                                href="https://wa.me/905416834410"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.mobileContactBtn} ${styles.whatsappBtn}`}
                                onClick={() => {
                                    closeMobileMenu();
                                    window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({ 'event': 'whatsapp_click' });
                                }}
                            >
                                WhatsApp İletişim
                            </Link>
                            <a
                                href="https://www.instagram.com/grovemediacreative"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.mobileLink}
                                onClick={closeMobileMenu}
                                style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <Instagram size={22} /> Instagram
                            </a>
                        </div>

                        {/* Decorative Background Elements */}
                        <div className={styles.mobileDecorations}>
                            <div className={styles.blob1}></div>
                            <div className={styles.blob2}></div>
                            <div className={styles.gridOverlay}></div>
                        </div>
                    </div>
                </div>
            </nav>
            <CouponPopup isOpen={couponOpen} onClose={() => setCouponOpen(false)} />
        </>
    );
}
