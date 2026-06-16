'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, ChevronRight, Instagram, Facebook, Linkedin, Sparkles, Star, Droplet } from 'lucide-react';

export default function Footer() {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <footer className="footer">
            {/* Smooth Gradient Parallax Wave Divider (Transitions perfectly from gold to footer navy) */}
            <div className="footer-wave-container">
                <svg className="footer-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 18 150 30" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        {/* Define luxury gradients blending gold to the footer background (#0A2540) */}
                        <linearGradient id="footer-wave-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.15)" />
                            <stop offset="100%" stopColor="#0A2540" />
                        </linearGradient>
                        <linearGradient id="footer-wave-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.35)" />
                            <stop offset="100%" stopColor="#0A2540" />
                        </linearGradient>
                        <linearGradient id="footer-wave-grad-3" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.55)" />
                            <stop offset="100%" stopColor="#0A2540" />
                        </linearGradient>
                        <linearGradient id="footer-wave-grad-4" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="var(--gold-main)" />
                            <stop offset="100%" stopColor="#0A2540" />
                        </linearGradient>
                        {/* A single-piece, double-sided wavy ribbon path! Both top and bottom are beautifully curved. */}
                        <path id="footer-gentle-wave" d="M-160 32c30 0 58-12 88-12s 58 12 88 12 58-12 88-12 58 12 88 12 v8c-30 0-58-12-88-12s-58 12-88 12-58-12-88-12-58 12-88 12 z" />
                    </defs>
                    
                    {/* A single group of beautiful double-sided wavy ribbons sliding past each other! */}
                    <g className="footer-parallax">
                        <use xlinkHref="#footer-gentle-wave" x="48" y="0" fill="url(#footer-wave-grad-1)" />
                        <use xlinkHref="#footer-gentle-wave" x="48" y="2" fill="url(#footer-wave-grad-2)" />
                        <use xlinkHref="#footer-gentle-wave" x="48" y="3" fill="url(#footer-wave-grad-3)" />
                        <use xlinkHref="#footer-gentle-wave" x="48" y="5" fill="url(#footer-wave-grad-4)" />
                    </g>
                </svg>
            </div>

            {!isHome && (
                <div className="falling-particles-container">
                    {/* 10 beautifully randomized falling luxury cleaning icons */}
                    <div className="falling-particle" style={{ left: '8%', animationDelay: '0s', '--rotation': '360deg', '--drift': '30px' } as any}><Sparkles size={16} /></div>
                    <div className="falling-particle" style={{ left: '18%', animationDelay: '1.2s', '--rotation': '-180deg', '--drift': '-20px' } as any}><Star size={14} /></div>
                    <div className="falling-particle" style={{ left: '28%', animationDelay: '2.5s', '--rotation': '240deg', '--drift': '15px' } as any}><Droplet size={15} /></div>
                    <div className="falling-particle" style={{ left: '38%', animationDelay: '0.8s', '--rotation': '-360deg', '--drift': '-40px' } as any}><Sparkles size={18} /></div>
                    <div className="falling-particle" style={{ left: '48%', animationDelay: '3.1s', '--rotation': '180deg', '--drift': '25px' } as any}><Star size={16} /></div>
                    <div className="falling-particle" style={{ left: '58%', animationDelay: '1.7s', '--rotation': '-270deg', '--drift': '-10px' } as any}><Droplet size={14} /></div>
                    <div className="falling-particle" style={{ left: '68%', animationDelay: '4.2s', '--rotation': '360deg', '--drift': '35px' } as any}><Sparkles size={15} /></div>
                    <div className="falling-particle" style={{ left: '78%', animationDelay: '2.1s', '--rotation': '-120deg', '--drift': '-15px' } as any}><Star size={15} /></div>
                    <div className="falling-particle" style={{ left: '88%', animationDelay: '0.4s', '--rotation': '180deg', '--drift': '20px' } as any}><Droplet size={16} /></div>
                    <div className="falling-particle" style={{ left: '94%', animationDelay: '3.6s', '--rotation': '-240deg', '--drift': '-30px' } as any}><Sparkles size={14} /></div>
                </div>
            )}
            <div className="container">
                <div className="footer-top">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <Link href="/" className="logo-wrapper" style={{ marginBottom: '1.5rem', display: 'flex' }}>
                            <img 
                                src="/logo.png?v=2" 
                                className="logo-img" 
                                alt="Nera Clean Logo Footer" 
                            />
                        </Link>
                        <p>Yaşam ve ticari alanlarınız için lüks ve hijyenik VIP çözümler sunan lider çözüm ortağınız.</p>
                        <div className="footer-socials">
                            <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="footer-column">
                        <h4>Hızlı Erişim</h4>
                        <ul className="footer-links">
                            <li>
                                <Link href="/"><ChevronRight size={16} /> Anasayfa</Link>
                            </li>
                            <li>
                                <Link href="/hizmetlerimiz"><ChevronRight size={16} /> Hizmetlerimiz</Link>
                            </li>
                            <li>
                                <Link href="/hesaplayici"><ChevronRight size={16} /> Keşif Hesaplayıcı</Link>
                            </li>
                            <li>
                                <Link href="/neden-biz"><ChevronRight size={16} /> Neden Biz?</Link>
                            </li>
                            <li>
                                <Link href="/iletisim"><ChevronRight size={16} /> İletişim & Teklif</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div className="footer-column">
                        <h4>Popüler Hizmetler</h4>
                        <ul className="footer-links">
                            <li>
                                <Link href="/hizmetlerimiz"><ChevronRight size={16} /> VIP Ev Temizliği</Link>
                            </li>
                            <li>
                                <Link href="/hizmetlerimiz"><ChevronRight size={16} /> İnşaat Sonrası Temizlik</Link>
                            </li>
                            <li>
                                <Link href="/hizmetlerimiz"><ChevronRight size={16} /> Villa & Malikane Hijyeni</Link>
                            </li>
                            <li>
                                <Link href="/hizmetlerimiz"><ChevronRight size={16} /> Ofis & Plaza Temizliği</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Address & Direct Call Column */}
                    <div className="footer-column">
                        <h4>İletişim Bilgileri</h4>
                        <p style={{ display: 'flex', alignItems: 'center', marginBottom: '1.2rem', lineHeight: '1.5' }}>
                            <MapPin size={18} style={{ marginRight: '8px', flexShrink: 0 }} />
                            Akşemsettin Mah. Sulhiye Sok. Beyşehirliler Sitesi A/B Blok Kat:2 No:3 Konya
                        </p>
                        <p>
                            <Phone size={18} style={{ marginRight: '8px', flexShrink: 0 }} />
                            <a href="tel:+905427811029" style={{ color: 'inherit' }}>+90 542 781 10 29</a>
                        </p>
                        <p>
                            <Mail size={18} style={{ marginRight: '8px', flexShrink: 0 }} />
                            <a href="mailto:neracleaningservices@gmail.com" style={{ color: 'inherit' }}>neracleaningservices@gmail.com</a>
                        </p>
                    </div>
                </div>

                {/* Footer Bottom Copy */}
                <div className="footer-bottom">
                    <p>&copy; 2026 Nera Clean Temizlik Hizmetleri. Tüm Hakları Saklıdır.</p>
                    <div className="footer-bottom-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <a href="#">Gizlilik Politikası</a>
                        <a href="#">Kullanım Şartları</a>
                        <span style={{ color: '#64748B', display: 'inline-flex', alignItems: 'center' }}>
                            made by <a href="https://www.grovemediacreative.com.tr/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-main)', fontWeight: '600', marginLeft: '4px', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>grove</a>
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Custom layout styles override helper */}
            <style jsx>{`
                .footer-top {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
                    gap: 4rem;
                    margin-bottom: 6rem;
                }
                .footer-links a {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .footer-contact-info p {
                    display: flex;
                    align-items: flex-start;
                }
                @media (max-width: 992px) {
                    .footer-top {
                        grid-template-columns: 1fr 1fr;
                        gap: 2.5rem;
                    }
                }
                @media (max-width: 576px) {
                    .footer-top {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
            `}</style>
        </footer>
    );
}
