'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Target, RefreshCw, Star, Check } from 'lucide-react';
import AnimatedCounter from '../../components/AnimatedCounter';

export default function WhyUsPage() {
    // Brand pillars array
    const pillars = [
        {
            title: 'Kusursuz Detay Planı (Renk Kodlu Bez)',
            desc: 'Çapraz bulaşmayı önlemek adına banyo, mutfak ve genel yaşam alanlarında tamamen farklı renklere sahip, özel dezenfekte edilmiş mikrofiber bezler kullanıyoruz.',
            icon: Target
        },
        {
            title: 'Sorumluluk & Hasar Sigorta Güvencesi',
            desc: 'Personelimizin tamamı adli sicil taramaları yapılmış kadrolu çalışanlarımızdır. Temizlik esnasında oluşabilecek en ufak hasarlar dahi sigorta kapsamımızdadır.',
            icon: ShieldCheck
        },
        {
            title: 'Yüksek Teknolojik Hijyen Altyapısı',
            desc: 'HEPA filtreli antialerjik vakum üniteleri ve yüzeyleri aşındırmadan derinlemesine arındıran 100°C kuru buhar sterilizasyon teknolojileri kullanıyoruz.',
            icon: Award
        },
        {
            title: '24 Saat Koşulsuz Telafi Garantisi',
            desc: 'Aldığınız hizmetten tamamen memnun kalmamanız durumunda, geri bildiriminiz doğrultusunda 24 saat içerisinde özel ekibimizle ücretsiz telafi temizliği sağlıyoruz.',
            icon: RefreshCw
        }
    ];

    return (
        <div style={{ backgroundColor: 'var(--white)', paddingBottom: '8rem', paddingTop: '110px' }}>
            <div className="container">
                
                {/* Header Title Section */}
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <span className="section-tag" style={{ color: 'var(--gold-main)', justifyContent: 'center' }}>Neden Nera Clean?</span>
                    <h1 className="section-title" style={{ fontSize: '3rem', fontWeight: 700 }}>
                        Fark Yaratan <span>Standartlarımız</span>
                    </h1>
                    <p className="section-subtitle" style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Nera Clean temizlik felsefemiz, sıradan bir toz alma işleminden çok daha fazlasını, klinikte test edilmiş sterilizasyon standartlarını kapsar.
                    </p>
                </div>

                {/* Split Visual Section Grid */}
                <div className="grid-2" style={{ gap: '5rem', alignItems: 'stretch' }}>
                    {/* Left Column: Premium Image with absolute badges */}
                    <div style={{ position: 'relative', minHeight: '450px' }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            minHeight: '450px',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-deep)',
                            border: '1px solid rgba(0, 45, 98, 0.05)'
                        }}>
                            <img 
                                src="/why_us.png" 
                                alt="Profesyonel Temizlik Uzmanı" 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        
                        {/* Floating trust badge card */}
                        <div style={{
                            position: 'absolute',
                            bottom: '30px',
                            right: '30px',
                            background: 'rgba(3, 27, 51, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--gold-main)',
                            padding: '1.5rem 2rem',
                            borderRadius: '12px',
                            color: 'var(--white)',
                            boxShadow: 'var(--shadow-gold)',
                            maxWidth: '260px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                                <Star size={20} style={{ color: 'var(--gold-main)', fill: 'var(--gold-main)' }} />
                                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--gold-main)' }}>%100</span>
                            </div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--white)' }}>Müşteri Memnuniyeti</h4>
                            <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>Sıfır hata ve premium telafi güvencesiyle temizlik operasyonları.</p>
                        </div>
                    </div>

                    {/* Right Column: Descriptions & Guarantee Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 style={{ fontSize: '2.2rem', color: 'var(--navy-dark)', marginBottom: '1.5rem', fontWeight: 700 }}>
                            Güven ve Kusursuzluğun Buluştuğu Nokta
                        </h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                            Evleriniz ve ofisleriniz yalnızca yaşam alanınız değil; şahsi eşyalarınızın, kıymetli anılarınızın ve sağlığınızın barındığı sığınaklarınızdır. 
                            Bunun farkındayız ve her adımımızı bu büyük sorumluluk bilinciyle planlıyoruz.
                        </p>
                        
                        {/* Pillars list layout */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {pillars.map((pillar, idx) => {
                                const IconComp = pillar.icon;
                                return (
                                    <div key={idx} style={{ display: 'flex', gap: '1.2rem' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            background: 'rgba(212, 175, 55, 0.08)',
                                            color: 'var(--gold-main)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <IconComp size={22} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-main)', fontWeight: 700, marginBottom: '0.4rem' }}>
                                                {pillar.title}
                                            </h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                                                {pillar.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Interactive Trust Statistics Row */}
                <div style={{
                    marginTop: '7rem',
                    padding: '4rem 0',
                    borderTop: '1px solid #E2E8F0',
                    borderBottom: '1px solid #E2E8F0',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    textAlign: 'center',
                    gap: '2rem'
                }}>
                    <div>
                        <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--navy-main)', display: 'block', marginBottom: '5px' }}>
                            <AnimatedCounter end={500} suffix="+" />
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px' }}>Mutlu Rezidans Sahibi</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--navy-main)', display: 'block', marginBottom: '5px' }}>
                            <AnimatedCounter end={120} suffix="+" />
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px' }}>Aktif Plaza / Ofis</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--navy-main)', display: 'block', marginBottom: '5px' }}>
                            <AnimatedCounter end={100} suffix="%" />
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px' }}>Memnuniyet Güvencesi</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--navy-main)', display: 'block', marginBottom: '5px' }}>
                            <AnimatedCounter end={7} />/<AnimatedCounter end={24} />
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px' }}>Operasyon Desteği</span>
                    </div>
                </div>

                {/* Final CTA Banner */}
                <div style={{ marginTop: '6rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--navy-dark)', marginBottom: '1.5rem' }}>Eşsiz Standartlarımızı Deneyimleyin</h3>
                    <div className="btn-group" style={{ justifyContent: 'center' }}>
                        <Link href="/iletisim" className="btn btn-gold">
                            Şimdi Keşif & Teklif Talebi Gönder
                        </Link>
                    </div>
                </div>

            </div>

            {/* Custom responsive overrides */}
            <style jsx>{`
                @media (max-width: 992px) {
                    .grid-2 {
                        grid-template-columns: 1fr !important;
                        gap: 3.5rem !important;
                    }
                    div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
                        grid-template-columns: 1fr 1fr !important;
                        gap: 2.5rem !important;
                    }
                }
                @media (max-width: 576px) {
                    div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }
            `}</style>
        </div>
    );
}
