import Navbar from '../../components/Navbar';
import Contact from '../../components/Contact';
import { sectors } from '../../data/sectors';
import styles from './page.module.css';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import WaveTransition from '../../components/WaveTransition';

export const metadata = {
    title: 'Hizmetlerimiz | Grove Media Creative',
    description: 'Sektörünüze özel dijital çözümlerimizle tanışın.',
    alternates: {
        canonical: 'https://grovemediacreative.com.tr/hizmetlerimiz',
    },
};

export default function ServicesPage() {
    return (
        <main>
            <Navbar />

            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Hizmetlerimiz</h1>
                    <p className={styles.subtitle}>
                        Her sektöre özel geliştirdiğimiz web tasarım ve dijital pazarlama çözümleriyle işinizi büyütün.
                    </p>
                </header>

                <div className={styles.grid}>
                    {sectors.map((sector) => {
                        const IconComponent = Icons[sector.icon] || Icons.Box;
                        return (
                            <Link key={sector.slug} href={`/hizmet/${sector.slug}`} className={styles.cardLink}>
                                <div className={styles.card}>
                                    <div className={styles.iconWrapper}>
                                        <IconComponent size={32} strokeWidth={1.5} />
                                    </div>
                                    <h3 className={styles.cardTitle}>{sector.title}</h3>
                                    <p className={styles.cardDesc}>{sector.desc}</p>
                                    <span className={styles.link}>
                                        İncele <Icons.ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Sektöre Özel Yaklaşım Bölümü */}
                <div style={{ marginTop: '80px', padding: '0 20px' }}>
                    <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-bebas)', marginBottom: '20px' }}>Neden Sektöre Özel Yaklaşım?</h2>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
                        <li><strong>Doğru Hedef Kitle İletişimi:</strong> Bir restoranın müşterisi ile bir hukuk bürosunun müvekkili bambaşka beklentilere sahiptir. Sektörünüzün dilini konuşan, güven veren ve doğrudan ihtiyaca yönelik bir web sitesi hazırlıyoruz.</li>
                        <li><strong>Optimize Edilmiş Reklam Bütçesi:</strong> Tesisatçılar için gece acil durum aramalarına, güzellik merkezleri için ise görsel odaklı randevu taleplerine yoğunlaşıyoruz. Bütçenizi en yüksek dönüşümü (ROAS) getirecek kanallara ve anahtar kelimelere ayırıyoruz.</li>
                        <li><strong>Sektörel Rekabet Avantajı:</strong> Rakiplerinizin henüz dijitalleşemediği noktalarda sizi öne çıkarıyoruz. Server-Side Tracking (SGTM) gibi ileri teknolojileri kullanarak rakiplerinizin erişemediği verilerle kampanyalarınızı domine etmenizi sağlıyoruz. Sektörünüzdeki en kurumsal oyuncu olarak algılanacaksınız.</li>
                    </ul>
                </div>

                {/* Nasıl Çalışıyoruz Süreci */}
                <div style={{ marginTop: '60px', padding: '0 20px' }}>
                    <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-bebas)', marginBottom: '20px' }}>Nasıl Çalışıyoruz?</h2>
                    <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
                        İşletmenizi bir sonraki aşamaya taşırken tamamen şeffaf, ölçülebilir ve hızlı bir süreç kurguluyoruz. Dört basit adımla dijital dönüşümünüzü gerçekleştiriyoruz:
                    </p>
                    <ol style={{ paddingLeft: '20px', fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
                        <li style={{ marginBottom: '10px' }}><strong>1. Analiz ve Strateji:</strong> Sektörünüzü, hedef kitlenizi ve rakiplerinizi inceliyoruz. İşletmenizin ihtiyaçlarına en uygun bütçeyi ve büyüme planını ortaya çıkarıyoruz.</li>
                        <li style={{ marginBottom: '10px' }}><strong>2. Kurumsal Kurulum (Tasarım):</strong> Next.js gibi ultra hızlı ve modern teknolojiler kullanarak, mobil uyumlu ve SEO dostu web sitenizi ya da e-ticaret mağazanızı en ufak detaya kadar profesyonelce oluşturuyoruz.</li>
                        <li style={{ marginBottom: '10px' }}><strong>3. Reklam ve Takip Entegrasyonu:</strong> Potansiyel müşterilerinizi sitenize çekecek Google Ads ve Meta (Facebook/Instagram) kampanyalarını hazırlıyor, dönüşüm hunisini (Server-Side Tracking) kusursuz işleyecek şekilde kurguluyoruz.</li>
                        <li style={{ marginBottom: '10px' }}><strong>4. Büyüme ve Optimizasyon:</strong> Siteniz yayına girer girmez performansınızı izlemeye başlıyoruz. Gelen müşteri verilerini analiz ediyor, kampanyaları anlık olarak optimize ederek size "müşteri ve kârlılık" garantili sonuçlar üretiyoruz.</li>
                    </ol>
                </div>

                {/* Sık Sorulan Sorular (SSS) */}
                <div style={{ marginTop: '60px', marginBottom: '80px', padding: '0 20px' }}>
                    <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-bebas)', marginBottom: '20px' }}>Sık Sorulan Sorular</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', color: '#111', marginBottom: '8px' }}>Hangi sektörlere hizmet veriyorsunuz?</h3>
                            <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.7' }}>Halı yıkamacılardan güvenlik firmalarına, diş kliniklerinden hukuk bürolarına kadar A'dan Z'ye geniş bir yelpazede yerel hizmet alanlarına destek sunuyoruz. İşletmesinin müşteri potansiyelini dijital reklamlarla artırmak ve modern, güvenilir bir kurumsal web sitesine sahip olmak isteyen her sektöre kapımız açık.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', color: '#111', marginBottom: '8px' }}>Sonuç almak ne kadar sürer?</h3>
                            <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.7' }}>Web sitenizin tasarımı ve altyapı kurulumları sektörünüze göre ortalama 5 ila 10 iş günü içinde tamamlanır. Kurgulanan akıllı reklam kampanyaları devreye girdiği andan itibaren (ilk 24 saat içinde) nitelikli müşteri aramaları ve form talepleri almaya başlarsınız. Tam performans ve makine öğrenimi optimizasyonu genellikle birkaç hafta içinde oturur.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', color: '#111', marginBottom: '8px' }}>Reklam bütçesi ne olmalı?</h3>
                            <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.7' }}>Reklam bütçeleri tamamen sektörünüzün rekabet oranına ve hedeflediğiniz günlük müşteri sayısına göre şekillenmektedir. Amacımız astronomik tutarlar harcamanız değil, sizi kurtaracak bir "Müşteri Edinme Maliyeti (CAC)" yakalamaktır. Tesisatçılar bölgesel ve düşük bir bütçeyle hareket edebilirken, lüks diş klinikleri farklı bütçe gereksinimlerine ihtiyaç duyabilir. Bizim odak noktamız harcanan her kuruşu en az iki kat iade sağlayacak bir kârlılık (ROAS) yapısına dönüştürmektir.</p>
                        </div>
                    </div>
                </div>
            </div>

            <WaveTransition color="#0A0A0A" position="top" />
            <Contact />
        </main>
    );
}
