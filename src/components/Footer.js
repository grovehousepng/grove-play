'use client';

import styles from './Footer.module.css';
import Link from 'next/link';
import Logo from './Logo';
import { Instagram, Linkedin } from 'lucide-react';
import FooterGame from './FooterGame';
import { trackContactClick } from '../utils/analytics';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.separator}></div>
            <div className={styles.container}>
                <div className={styles.brandCol}>
                    <Logo variant="light" size="normal" />
                    <p className={styles.tagline}>
                        Ölçeklenebilir dijital pazarlama çözümleriyle işletmenizin büyümesini hızlandırıyoruz.
                    </p>
                </div>

                <div className={styles.col}>
                    <h4>İLETİŞİM</h4>
                    <ul>
                        <li>
                            <a
                                href="mailto:yucel.guzel42@gmail.com"
                                onClick={() => {
                                    trackContactClick('email', 'footer', 'Genel');
                                    window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({ 'event': 'email_click' });
                                }}
                            >
                                yucel.guzel42@gmail.com
                            </a>
                        </li>
                        <li>
                            <a
                                href="tel:+905416834410"
                                onClick={() => {
                                    trackContactClick('phone_call', 'footer', 'Genel');
                                    window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({ 'event': 'phone_click' });
                                }}
                            >
                                +90 541 683 44 10
                            </a>
                        </li>
                        <li>Konya, Türkiye</li>
                        <li>
                            <a
                                href="https://www.instagram.com/grovemediacreative"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                                <Instagram size={18} /> Instagram
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/y%C3%BCcel-g%C3%BCzel-787794273/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                                <Linkedin size={18} /> LinkedIn
                            </a>
                        </li>
                        <li>
                            <Link href="/gizlilik-politikasi" style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                                Gizlilik Politikası
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.gameCol}>
                    <FooterGame />
                </div>
            </div>

            <div className={styles.bottom}>
                <p>© 2024 Grove Media Creative. Tüm hakları saklıdır.</p>
            </div>
        </footer>
    );
}
