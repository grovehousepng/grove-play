'use client';

import styles from './ServicePackages.module.css';

const packages = [
    {
        title: "Kurumsal Web Sitesi Paketi",
        badge: "Müşteri Garantisi",
        badgeColor: "red",
        price: "30.000 TL",
        installment: "Taksit Seçeneği: 3 x 10.000 TL",
        slogan: "Hız ve Geleceğin Teknolojisi ile Öne Çıkın.",
        features: [
            { name: "Next.js Altyapısı", desc: "Ultra hızlı açılış süreleri ve yüksek SEO performansı." },
            { name: "Hizmet Sektörleri", desc: "Hizmet sektörleri için mükemmel sonuç ve profesyonel görünüm." },
            { name: "Modern Arayüz", desc: "Markanıza özel, temiz ve kullanıcı dostu tasarım." },
            { name: "İletişim Odaklı", desc: "Form entegrasyonları ve hızlı etkileşim butonları." },
            { name: "Reklam Entegrasyonu", desc: "Google Ads, Meta Pixel ve performans takip kurulumları." }
        ],
        ctaText: "Detaylı Bilgi Al",
        ctaHref: "https://wa.me/905416834410?text=Merhaba%2C%2030.000%20TL%27lik%20Kurumsal%20Web%20Sitesi%20Paketi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.",
        ctaStyle: "secondaryBtn"
    },
    {
        title: "Akıllı E-Ticaret Paketi",
        badge: "Tek Kişilik Ordular İçin",
        badgeColor: "blue",
        price: "30.000 TL",
        installment: "Taksit Seçeneği: 3 x 10.000 TL",
        slogan: "Satışa Hazır, Güçlü ve Yönetilebilir Mağaza.",
        features: [
            { name: "Shopify Kurulumu", desc: "Temel ayarlar, ödeme kanalları ve kargo entegrasyonu." },
            { name: "Ürün Yönetimi", desc: "İlk ürünlerin yüklenmesi ve kategori yapılandırması." },
            { name: "Dönüşüm Optimizasyonu", desc: "Satış artıran standart özellikler ve eklentiler." },
            { name: "Kolay Yönetim Paneli", desc: "Teknik bilgi gerektirmeden mağazanızı yönetin." },
            { name: "Şirket Şartı Yok", desc: "Satışa başlamak ve ödeme almak için şirket kurma zorunluluğunuz bulunmamaktadır." },
            { name: "Reklam Entegrasyonu", desc: "Google Ads, Meta Pixel ve performans takip kurulumları." }
        ],
        ctaText: "Ücretsiz Demo İste",
        ctaHref: "https://wa.me/905416834410?text=Merhaba%2C%2030.000%20TL%27lik%20Ak%C4%B1ll%C4%B1%20E-Ticaret%20Paketi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.",
        ctaStyle: "secondaryBtn"
    },
    {
        title: "Anahtar Teslim E-Ticaret Paketi",
        price: "40.000 TL",
        installment: "Taksit Seçeneği: 3 x 13.333 TL",
        slogan: "Sınırsız Esneklik, Maksimum Performans ve Güvenlik.",
        features: [
            { name: "Komisyon Yok", desc: "Satışlarınızdan ekstra yazılım komisyonu ödemezsiniz." },
            { name: "Ömür Boyu Sizin", desc: "Tüm kaynak kodları ve altyapı mülkiyeti size ait olur." },
            { name: "Size Özel Geliştirme", desc: "Tamamen markanıza özel, benzersiz yazılım çözümleri." },
            { name: "Üst Düzey Güvenlik", desc: "Statik üretim sayesinde siber saldırılara karşı tam koruma." },
            { name: "Şirket Şartı Yok", desc: "Satışa başlamak ve ödeme almak için şirket kurma zorunluluğunuz bulunmamaktadır." },
            { name: "Reklam Entegrasyonu", desc: "Google Ads, Meta Pixel ve performans takip kurulumları." }
        ],
        ctaText: "Projemi Anlatmak İstiyorum",
        ctaHref: "https://wa.me/905416834410?text=Merhaba%2C%2040.000%20TL%27lik%20Anahtar%20Teslim%20E-Ticaret%20Paketi%20ile%20ilgileniyorum.%20Projemden%20bahsetmek%20isterim.",
        ctaStyle: "premiumBtn",
        isPopular: true
    },
    {
        title: "SGTM Kurulum ve Yönetimi",
        badge: "Profesyonellerin Tercihi",
        badgeColor: "orange",
        price: "10.000 TL Kurulum",
        installment: "+ Aylık 1.000 TL Yönetim",
        slogan: "Server-Side Tracking ile Kayıpsız Veri Ölçümlemesi.",
        features: [
            { name: "Bulut Sunucu", desc: "Size özel barındırma ve SGTM container kurulumu." },
            { name: "Kayıpsız Veri", desc: "Ad-blocker ve iOS kısıtlamalarına takılmadan ölçümleme." },
            { name: "Gelişmiş API", desc: "Facebook CAPI, Google Ads ve WhatsApp Entegrasyonları." },
            { name: "Performans Artışı", desc: "Tarayıcı yükünü azaltarak site hızınızı yükseltir." },
            { name: "Kesintisiz Destek", desc: "Sunucu sağlığı takibi ve hata ayıklama desteği." }
        ],
        ctaText: "Hemen Kuruluma Başla",
        ctaHref: "https://wa.me/905416834410?text=Merhaba%2C%2010.000%20TL%20kurulum%20ve%20ayl%C4%B1k%201.000%20TL%20y%C3%B6netim%20olan%20SGTM%20paketiyle%20ilgileniyorum.",
        ctaStyle: "secondaryBtn"
    }
];

export default function ServicePackages() {
    return (
        <section className={styles.section} id="pricing">
            {/* Animated Background Elements */}
            <div className={styles.backgroundLayer}>

                {/* Floating Icons Background */}
                <div className={`${styles.bgIcon} ${styles.icon1}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon2}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon3}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon4}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon5}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon6}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon7}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon8}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon9}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon10}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon11}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon12}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon13}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                        <rect x="9" y="9" width="6" height="6"></rect>
                        <line x1="9" y1="1" x2="9" y2="4"></line>
                        <line x1="15" y1="1" x2="15" y2="4"></line>
                        <line x1="9" y1="20" x2="9" y2="23"></line>
                        <line x1="15" y1="20" x2="15" y2="23"></line>
                        <line x1="20" y1="9" x2="23" y2="9"></line>
                        <line x1="20" y1="14" x2="23" y2="14"></line>
                        <line x1="1" y1="9" x2="4" y2="9"></line>
                        <line x1="1" y1="14" x2="4" y2="14"></line>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon14}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                </div>
                <div className={`${styles.bgIcon} ${styles.icon15}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {packages.map((pkg, index) => (
                        <div key={index} className={`${styles.cardWrapper} ${pkg.isPopular ? styles.popularWrapper : ''}`}>
                            <div className={`${styles.card} ${pkg.isPopular ? styles.popularCard : ''}`}>
                                {pkg.isPopular && (
                                    <>
                                        <span className={styles.crownIcon} aria-hidden="true">👑</span>
                                        <div className={styles.popularBadge}>En Çok Tercih Edilen</div>
                                    </>
                                )}
                                {!pkg.isPopular && pkg.badge && (
                                    <div 
                                        className={styles.popularBadge}
                                        style={{
                                            background: pkg.badgeColor === 'red' ? 'linear-gradient(135deg, #FF4B4B, #E63946)' :
                                                        pkg.badgeColor === 'blue' ? 'linear-gradient(135deg, #2F80ED, #1A5CBF)' :
                                                        pkg.badgeColor === 'orange' ? 'linear-gradient(135deg, #F2994A, #E76F51)' : undefined,
                                            boxShadow: pkg.badgeColor === 'red' ? '0 4px 10px rgba(255, 75, 75, 0.3)' :
                                                    pkg.badgeColor === 'blue' ? '0 4px 10px rgba(47, 128, 237, 0.3)' :
                                                    pkg.badgeColor === 'orange' ? '0 4px 10px rgba(242, 153, 74, 0.3)' : undefined
                                        }}
                                    >
                                        {pkg.badge}
                                    </div>
                                )}
                                <h3 className={styles.title}>{pkg.title}</h3>
                                {pkg.price && <div className={styles.price}>{pkg.price}</div>}
                                {pkg.installment && <div className={styles.installment}>{pkg.installment}</div>}
                                <p className={styles.slogan}>{pkg.slogan}</p>
                                <ul className={styles.features}>
                                    {pkg.features.map((feature, fIndex) => (
                                        <li key={fIndex} className={styles.feature}>
                                            <span className={styles.check}>✓</span>
                                            <div>
                                                <strong>{feature.name}:</strong> {feature.desc}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href={pkg.ctaHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${styles.ctaButton} ${styles[pkg.ctaStyle]}`}
                                >
                                    {pkg.ctaText}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.trustBanner}>
                    <div className={styles.trustIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                    </div>
                    <p>
                        Tüm paketlerimizde <strong>%100 memnuniyet</strong> ve <strong>sorunsuz teslimat</strong> garantisi sunuyoruz.
                        <br />
                        Önceki referans projelerimizi detaylı incelemek için <a href="https://wa.me/905416834410?text=Merhaba,%20referans%20projelerinizi%20incelemek%20istiyorum." target="_blank" rel="noopener noreferrer">WhatsApp'tan hemen yazın</a>.
                    </p>
                </div>
            </div>
        </section>
    );
}
