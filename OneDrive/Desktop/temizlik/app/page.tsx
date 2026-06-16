'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Clock, ShieldCheck, Leaf, ArrowRight, Award } from 'lucide-react';

export default function Home() {
    return (
        <div style={{ position: 'relative' }}>
            {/* Grand Hero Section (VIP Entrance) */}
            <section id="hero" className="hero">
                <div className="hero-bg">
                    <img 
                        src="/hero_bg.png" 
                        className="hero-image" 
                        alt="Lüks Ev Temizliği Oturma Odası" 
                    />
                    <div className="hero-overlay"></div>
                </div>
                
                {/* Sparkle Glowing Ambient Orbs */}
                <div className="sparkle-orb orb-1"></div>
                <div className="sparkle-orb orb-2"></div>
                
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Seçkin Alanlar İçin <span>Kusursuz Hijyen</span>
                        </h1>
                        <p className="hero-description">
                            Yaşam ve çalışma alanlarınızda en yüksek hijyen standartlarını hayata geçiriyoruz. 
                            Üstün kaliteli ekipmanlarımız, ileri teknolojili sterilizasyon altyapımız ve uzman kadromuzla kusursuz temizliği garanti ediyoruz.
                        </p>
                        
                        <div className="btn-group" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
                            <Link href="/hesaplayici" className="btn btn-gold">
                                <Sparkles size={18} /> Online Keşif & Teklif Al
                            </Link>
                            <a 
                                href="https://wa.me/905427811029?text=Merhaba%20Nera%20Clean%2C%20bireysel%2Fkurumsal%20temizlik%20hizmetleriniz%20hakk%C4%B1nda%20ke%C5%9Fif%20ve%20teklif%20almak%20istiyorum." 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                <Clock size={18} /> Nera Clean WhatsApp Destek
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Trust Metrics Section */}
            <section className="section" style={{ backgroundColor: 'var(--white)', padding: '6rem 0 10rem', position: 'relative' }}>
                <div className="container">
                    <div className="grid-3">
                        {/* Trust Card 1 */}
                        <div className="service-card" style={{ padding: '3.5rem 2.5rem' }}>
                            <div className="service-card-icon">
                                <Clock size={28} />
                            </div>
                            <h3>7/24 Kesintisiz Hizmet</h3>
                            <p>Yoğun temponuza ayak uyduruyor, temizlik operasyonlarımızı sizin için en uygun zaman dilimlerinde (gece/gündüz) esnek ve sürekli olarak yürütüyoruz.</p>
                        </div>

                        {/* Trust Card 2 */}
                        <div className="service-card" style={{ padding: '3.5rem 2.5rem' }}>
                            <div className="service-card-icon">
                                <ShieldCheck size={28} />
                            </div>
                            <h3>Uzman & Güvenilir Kadro</h3>
                            <p>Tüm çalışma arkadaşlarımız detaylı güvenlik taramalarından geçmiş, düzenli hijyen eğitimleri alan ve lüks konut hassasiyetine sahip profesyonellerdir.</p>
                        </div>

                        {/* Trust Card 3 */}
                        <div className="service-card" style={{ padding: '3.5rem 2.5rem' }}>
                            <div className="service-card-icon">
                                <Leaf size={28} />
                            </div>
                            <h3>Çevre & Pet Dostu Hijyen</h3>
                            <p>Sağlığınızı korumak adına yalnızca uluslararası sertifikalı, yüzeylerinize zarar vermeyen ve evcil hayvan dostu premium deterjanlar tercih ediyoruz.</p>
                        </div>
                    </div>
                </div>

                {/* Gentle Parallax Wave Divider (Sticks seamlessly to the navy section below) */}
                <div className="wave-container">
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(0, 30, 61, 0.25)" />
                            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(0, 30, 61, 0.45)" />
                            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(0, 30, 61, 0.65)" />
                            <use xlinkHref="#gentle-wave" x="48" y="7" fill="var(--navy-dark)" />
                        </g>
                    </svg>
                </div>
            </section>

            {/* Brand Philosophy Panel */}
            <section className="section-dark" style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <span className="section-tag" style={{ color: 'var(--gold-main)' }}>Seçkin Vizyon</span>
                            <h2 className="section-title" style={{ fontSize: '2.8rem', color: 'var(--white)' }}>
                                Lüks Yaşam Alanlarında <span style={{ color: 'var(--gold-main)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: '400' }}>Kusursuz Standartlar</span>
                            </h2>
                            <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
                                Nera Clean, sıradan bir temizlik firmasının çok ötesinde hizmet veren, lüks ve seçkin hijyen standartlarını temsil eden lider bir markadır. 
                                VIP konutlardan prestijli holdinglere kadar geniş bir portföye butik ve profesyonel dezenfeksiyon desteği sunuyoruz.
                            </p>
                            <div className="btn-group">
                                <Link href="/neden-biz" className="btn btn-gold">
                                    Neden Biz? Detayları Gör <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <div style={{
                                width: '320px',
                                height: '320px',
                                borderRadius: '20px',
                                border: '2px solid var(--gold-main)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2rem',
                                background: 'rgba(255, 255, 255, 0.02)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: 'var(--shadow-gold)'
                            }}>
                                <Award size={64} style={{ color: 'var(--gold-main)', marginBottom: '1.5rem' }} />
                                <h4 style={{ color: 'var(--white)', fontSize: '1.3rem', marginBottom: '0.5rem', textAlign: 'center' }}>Nera Clean Güvencesi</h4>
                                <p style={{ color: '#94A3B8', fontSize: '0.9rem', textAlign: 'center', margin: 0 }}>Tüm operasyonlarımız ve butik detaylarımız kurumsal standartlarımız ve kusursuz hijyen güvencemiz altındadır.</p>
                            </div>
                            <div className="sparkle-orb" style={{ width: '250px', height: '250px', top: '20%', right: '10%' }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
