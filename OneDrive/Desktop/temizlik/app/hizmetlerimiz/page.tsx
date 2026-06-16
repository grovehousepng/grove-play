'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Hammer, Crown, Sparkles, Layers, Users, Briefcase, Factory, Building2, ShieldAlert, Dumbbell, ArrowRight, Sparkle } from 'lucide-react';

export default function ServicesPage() {
    const [activeTab, setActiveTab] = useState<'bireysel' | 'kurumsal'>('bireysel');

    // Residential & VIP Services Array
    const residentialServices = [
        {
            title: 'Nera Clean VIP Ev & Rezidans Temizliği',
            desc: 'Eşyalı lüks konutlar ve premium rezidans daireleri için her santimetrekareye özel butik hijyen dokunuşları ve detaylı toz/kir arındırma çözümleri.',
            icon: Home,
            highlight: 'Eşyalı Ev Temizliği'
        },
        {
            title: 'İnşaat ve Tadilat Sonrası Kusursuz Temizlik',
            desc: 'Kaba/ince temizlik sonrası tüm yüzeylerdeki boya, alçı, harç ve ince şantiye tozlarını özel mikrofiber ekipmanlarla sıfıra indirgeyen derin dezenfeksiyon.',
            icon: Hammer,
            highlight: 'Sıfır Hata / Kusursuz'
        },
        {
            title: 'Premium Villa & Malikane Temizliği',
            desc: 'Geniş metrajlı yapılar, malikaneler ve yalılar için dış cephe, iç mekan ve peyzaj alanları dahil, profesyonel ekip koordinasyonuyla elit hijyen standardı.',
            icon: Crown,
            highlight: 'Butik Malikane Çözümleri'
        },
        {
            title: 'Boş Konut / Taşınma Öncesi Detaylı Hijyen',
            desc: 'Yeni mülkünüze taşınmadan önce veya eski dairenizi teslim ederken dolap içleri, banyo ve zeminlerin A\'dan Z\'ye dezenfekte edilerek sterilize edilmesi.',
            icon: Sparkles,
            highlight: 'Taşınma Öncesi Güvence'
        },
        {
            title: 'Profesyonel Koltuk, Yatak & Tekstil Yıkama',
            desc: 'Lüks kumaşlı oturma grupları, yatak ve tüm hassas tekstil ürünlerinizin yüksek emiş güçlü buharlı yıkama cihazlarıyla lekelerden ve bakterilerden arındırılması.',
            icon: Layers,
            highlight: 'Buharlı Dezenfeksiyon'
        },
        {
            title: 'Periyodik Ev Yardımcısı & Gündelikçi Destek',
            desc: 'Ev düzeninizi korumak adına haftalık veya aylık periyotlarla görevlendirilen, hijyen ve VIP servis standartlarımıza hakim güvenilir gündelik yardımcı hizmeti.',
            icon: Users,
            highlight: 'Düzenli Profesyonel Destek'
        }
    ];

    // Corporate & Industrial Services Array
    const corporateServices = [
        {
            title: 'Ofis, Büro & Plaza Temizliği',
            desc: 'Çalışanlarınızın sağlığını korumak ve prestijinizi yansıtmak amacıyla tasarlanmış, teknolojik ekipmanlarla yürütülen periyodik plaza ve ofis hijyeni.',
            icon: Briefcase,
            highlight: 'Kurumsal Büro Hijyeni'
        },
        {
            title: 'Endüstriyel Alan & Fabrika Temizliği',
            desc: 'Geniş üretim tesisleri, depolar ve fabrikalar için ağır makine kirleri, zemin yağları ve endüstriyel atıklardan arındırma odaklı profesyonel ağır temizlik.',
            icon: Factory,
            highlight: 'Endüstriyel Standartlar'
        },
        {
            title: 'Modern Apartman, Site & Merdiven Yönetimi',
            desc: 'Toplu yaşam alanlarında ortak merdiven holleri, asansörler ve kapı kolları gibi yoğun temas noktalarının periyodik olarak yıkanması ve sterilizasyonu.',
            icon: Building2,
            highlight: 'Site Yönetim Çözümleri'
        },
        {
            title: 'Mobil Kapıcılık & Entegre Tesis Hizmetleri',
            desc: 'Kadrolu kapıcı maliyetlerini minimize eden, çöplerin toplanması ve ortak alan bakımlarının periyodik mobil ekiplerimiz tarafından yapıldığı entegre model.',
            icon: ShieldAlert,
            highlight: 'Entegre Tesis Desteği'
        },
        {
            title: 'Spor Salonu & Sosyal Alan Temizliği',
            desc: 'Yüksek hijyen hassasiyeti olan fitness salonları, havuz çevreleri ve sosyal dinlenme tesisleri için ter ve bakterilere karşı özel dezenfektanlarla sürekli sterilizasyon.',
            icon: Dumbbell,
            highlight: 'Spor & Yaşam Alanı Steril'
        }
    ];

    return (
        <div style={{ backgroundColor: 'var(--bg-light)', paddingBottom: '8rem', paddingTop: '110px' }}>
            {/* Header Title Section */}
            <div className="containerCentered" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <span className="section-tag" style={{ color: 'var(--gold-main)', justifyContent: 'center' }}>Hizmetlerimiz</span>
                <h1 className="section-title" style={{ fontSize: '3rem', fontWeight: 700 }}>
                    Size Özel <span>Seçkin Çözümler</span>
                </h1>
                <p className="section-subtitle" style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                    Yaşam ve ticari alanlarınız için en yüksek hijyen standartlarında tasarlanmış, profesyonel butik temizlik ve dezenfeksiyon hizmetleri.
                </p>
            </div>

            {/* Dynamic Tabs Navigation */}
            <div className="container">
                <div className="tabs-container">
                    <div className="tabs-nav" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
                        <button 
                            className={`tab-btn ${activeTab === 'bireysel' ? 'active' : ''}`}
                            onClick={() => setActiveTab('bireysel')}
                        >
                            <Sparkle size={18} /> Bireysel & Rezidans Çözümleri
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'kurumsal' ? 'active' : ''}`}
                            onClick={() => setActiveTab('kurumsal')}
                        >
                            <Building2 size={18} /> Kurumsal & Endüstriyel Çözümleri
                        </button>
                    </div>

                    {/* Active Residential Panel */}
                    {activeTab === 'bireysel' && (
                        <div className="services-grid">
                            {residentialServices.map((service, index) => {
                                const IconComponent = service.icon;
                                return (
                                    <div key={index} className="service-card">
                                        <div className="service-card-icon">
                                            <IconComponent size={28} />
                                        </div>
                                        <h3>{service.title}</h3>
                                        <p>{service.desc}</p>
                                        <span className="service-card-bullet">
                                            {service.highlight} <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Active Corporate Panel */}
                    {activeTab === 'kurumsal' && (
                        <div className="services-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            {corporateServices.map((service, index) => {
                                const IconComponent = service.icon;
                                return (
                                    <div key={index} className="service-card">
                                        <div className="service-card-icon">
                                            <IconComponent size={28} />
                                        </div>
                                        <h3>{service.title}</h3>
                                        <p>{service.desc}</p>
                                        <span className="service-card-bullet">
                                            {service.highlight} <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Services Footer Call to Action */}
                <div style={{
                    marginTop: '6rem',
                    textAlign: 'center',
                    background: 'var(--white)',
                    border: '1px solid rgba(0, 45, 98, 0.05)',
                    padding: '4rem 3rem',
                    borderRadius: '20px',
                    boxShadow: 'var(--shadow-soft)'
                }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--navy-dark)', marginBottom: '1rem' }}>Sizin İçin En Doğru Teklifi Hazırlayalım</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Alanınızın metrajına ve özel temizlik ihtiyaçlarına göre anında tahmini bütçe hesabı yapabilir veya hemen bizimle iletişime geçebilirsiniz.
                    </p>
                    <div className="btn-group" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <Link href="/hesaplayici" className="btn btn-gold">
                            Keşif Hesaplayıcıyı Aç <ArrowRight size={16} />
                        </Link>
                        <Link href="/iletisim" className="btn btn-navy">
                            Hızlı Keşif Talebi Gönder
                        </Link>
                    </div>
                </div>
            </div>

            {/* Custom tab styling helper block */}
            <style jsx>{`
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2.5rem;
                }
                @media (max-width: 992px) {
                    .services-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 2rem;
                    }
                    .tab-btn {
                        padding: 1rem 2rem !important;
                        font-size: 0.95rem !important;
                    }
                }
                @media (max-width: 768px) {
                    .services-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                    .tabs-nav {
                        flex-direction: column;
                        align-items: center;
                        gap: 1rem !important;
                    }
                    .tab-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
}
