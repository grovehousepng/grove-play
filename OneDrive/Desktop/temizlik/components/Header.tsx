'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // 1. Stage 1 vs 2: scrolled white frosted-glass trigger
            if (currentScrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // 2. Stage 3: Hide header deep scroll down, reveal on scroll up (with smart scroll buffering)
            const diff = currentScrollY - lastScrollY;
            if (currentScrollY > 200) {
                if (diff > 15) {
                    // Scrolling DOWN significantly - Slide hide
                    setHidden(true);
                } else if (diff < -15) {
                    // Scrolling UP significantly - Slide reveal
                    setHidden(false);
                }
            } else {
                // Near the top - Always visible
                setHidden(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Navigation links array mapping to Next.js routes
    const navLinks = [
        { label: 'Anasayfa', href: '/' },
        { label: 'Hizmetlerimiz', href: '/hizmetlerimiz' },
        { label: 'Keşif Hesaplayıcı', href: '/hesaplayici' },
        { label: 'Neden Biz?', href: '/neden-biz' },
        { label: 'İletişim', href: '/iletisim' }
    ];

    // The header should be solid/scrolled on all subpages, or when scrolled on the home page
    const isHeaderScrolled = pathname !== '/' || scrolled;

    return (
        <header id="header" className={`${isHeaderScrolled ? 'scrolled' : ''} ${hidden ? 'header-hidden' : ''}`}>
            <div className="container">
                <nav>
                    <Link href="/" className="logo-wrapper" onClick={() => setIsOpen(false)}>
                        <img 
                            src="/logo.png?v=2" 
                            className="logo-img" 
                            alt="Nera Clean Logo" 
                        />
                    </Link>

                    {/* Desktop & Mobile Navigation Links */}
                    <ul className={`nav-links ${isOpen ? 'active-drawer' : ''}`} style={isOpen ? {
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        background: isHeaderScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(3, 27, 51, 0.98)',
                        padding: '2rem',
                        borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                        gap: '1.5rem',
                        opacity: 1,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    } : {}}>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href} 
                                        onClick={() => setIsOpen(false)}
                                        style={isActive ? { color: 'var(--gold-main)', fontWeight: 700 } : (isOpen && !isHeaderScrolled ? { color: 'var(--white)' } : {})}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                        {/* Call to Action Button inside mobile drawer (Mobile Only) */}
                        <li className="mobile-cta-li">
                            <Link 
                                href="/iletisim" 
                                className="btn btn-gold btn-small"
                                onClick={() => setIsOpen(false)}
                                style={{ display: 'block', textAlign: 'center', width: '100%', padding: '0.9rem' }}
                            >
                                Keşif & Teklif Al
                            </Link>
                        </li>
                    </ul>

                    {/* Call to Action Button (Desktop Only) */}
                    <div className="btn-group desktop-cta">
                        <Link 
                            href="/iletisim" 
                            className={`btn btn-small ${isHeaderScrolled ? 'btn-navy' : 'btn-outline-white'}`} 
                            id="header-cta-btn"
                            style={isHeaderScrolled ? { padding: '0.8rem 1.6rem', fontSize: '0.8rem' } : { padding: '0.8rem 1.6rem', fontSize: '0.8rem' }}
                        >
                            Keşif & Teklif Al
                        </Link>
                    </div>

                    {/* Hamburger Trigger for Compact Devices */}
                    <div 
                        className="mobile-nav-btn" 
                        id="mobile-menu-btn" 
                        onClick={() => setIsOpen(!isOpen)}
                        style={isHeaderScrolled ? { color: 'var(--navy-dark)' } : { color: 'var(--white)' }}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </div>
                </nav>
            </div>
            
            {/* Custom responsive mobile-drawer CSS helper block */}
            <style jsx>{`
                @media (max-width: 992px) {
                    .nav-links {
                        display: ${isOpen ? 'flex' : 'none'} !important;
                    }
                    .mobile-nav-btn {
                        display: block !important;
                    }
                    /* Hide the header CTA button from the main bar in mobile */
                    .desktop-cta {
                        display: none !important;
                    }
                    /* Show the mobile CTA inside the drawer list */
                    .mobile-cta-li {
                        display: block !important;
                        margin-top: 1rem;
                        width: 100%;
                    }
                }
                @media (min-width: 993px) {
                    /* Hide the mobile CTA in desktop view */
                    .mobile-cta-li {
                        display: none !important;
                    }
                    .desktop-cta {
                        display: block !important;
                    }
                }
            `}</style>
        </header>
    );
}
