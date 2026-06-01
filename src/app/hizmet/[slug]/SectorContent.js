
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './page.module.css';
import SectorHeroBackground from '../../../components/SectorHeroBackground';
import WaveTransition from '../../../components/WaveTransition';
import FallingItems from '../../../components/FallingItems';
import { CheckCircle, Zap, Shield, Thermometer, Sparkles, Wrench, Key, Bug, Home, Truck, CarFront, Car, Scissors, Stethoscope, UtensilsCrossed, Scale, PartyPopper, PanelTop, Paintbrush, Phone, MessageCircle, ChevronDown, ArrowRight, Printer, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// Icon mapping
const iconMap = {
    Shield, Thermometer, Sparkles, Wrench, Key, Zap, Bug, Home, Truck, CarFront, Car, Scissors, Stethoscope, UtensilsCrossed, Scale, PartyPopper, PanelTop, Paintbrush, Printer, ShoppingCart
};

// Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function SectorContent({ sector }) {
    const IconComponent = iconMap[sector.icon] || Zap;
    const isRestaurant = sector.slug === 'restoranlar';

    // Scroll Animations for Hero
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 600], [0, 100]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

    // Features
    const features = [
        { title: "Mobil Öncelikli Tasarım", desc: "Web siteniz tüm cihazlarda — telefon, tablet ve masaüstünde — kusursuz çalışır. App hissiyatında akıcı bir deneyimle müşterileriniz sitenizde rahatça gezinir ve size ulaşır.", icon: <Phone size={24} /> },
        { title: "Reklam Altyapısı", desc: "Yapay zeka destekli hedefleme teknolojileri ile reklam bütçenizi en verimli şekilde kullanın. Doğru müşteriye, doğru zamanda, doğru mesajla ulaşarak dönüşüm oranlarınızı katlayin.", icon: <Zap size={24} /> },
        { title: "Bölgesel Liderlik", desc: "Hizmet verdiğiniz lokasyonda arama sonuçlarında birinci olun. Google Haritalar ve yerel arama optimizasyonu ile bölgenizdeki tüm potansiyel müşterilerin karşısına çıkın.", icon: <Home size={24} /> },
        {
            title: isRestaurant ? "QR Menü ve Sipariş" : "Anında İletişim",
            desc: isRestaurant ? "Komisyonsuz, temassız ve her zaman güncel menü yönetimi. Müşterileriniz QR kodu okutarak menüyü görür, garson beklemeden sipariş verir." : "Müşterileriniz tek tıkla arasın veya WhatsApp'tan yazsın. Bekleme yok, form doldurma yok — anında bağlantı kurun ve işi kapın.",
            icon: isRestaurant ? <UtensilsCrossed size={24} /> : <MessageCircle size={24} />,
            highlight: true
        }
    ];

    return (
        <article className={styles.page} data-entity="ProfessionalService" data-sector={sector.slug}>
            {/* HERO SECTION */}
            <header className={styles.hero}>
                <SectorHeroBackground slug={sector.slug} />
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className={styles.heroContent}
                >
                    <motion.div variants={fadeInUp} className={styles.heroIconWrapper}>
                        <IconComponent size={40} color="#1D1D1F" strokeWidth={1.5} />
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
                        {sector.title}
                    </motion.h1>

                    <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
                        {sector.desc}
                    </motion.p>

                    <motion.div variants={fadeInUp}>
                        <button
                            className={styles.heroScrollBtn}
                            onClick={() => {
                                const nextSection = document.querySelector(`.${styles.section}`);
                                if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
                            }}
                            aria-label="Aşağı kaydır"
                        >
                            <ChevronDown size={32} />
                        </button>
                    </motion.div>
                </motion.div>
            </header>

            {/* PROBLEM SECTION */}
            <section id="problem" className={styles.section} style={{ position: 'relative' }}>
                <FallingItems icon={IconComponent} count={12} />
                <div className={styles.container} style={{ position: 'relative', zIndex: 2 }}>
                    <FadeIn>
                        <span className={styles.sectionLabel}>Sektörel Problem</span>
                        <h2 className={styles.sectionHeading}>{sector.title} Sektöründeki<br />Dijital Engeller</h2>
                    </FadeIn>

                    <div className={styles.bentoGrid}>
                        {sector.painPoints?.map((point, index) => (
                            <BentoCard key={index} title={point.q} desc={point.a} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* SOLUTION & TECHNOLOGY SECTION */}
            <WaveTransition color="#000000" position="top" />
            <section id="technology" className={styles.section} style={{ background: '#000', color: 'white' }}>
                <div className={styles.container}>
                    <FadeIn>
                        <span className={styles.sectionLabel} style={{ color: '#86868B' }}>Teknoloji ve Çözüm</span>
                        <h3 className={styles.sectionHeading} style={{ color: 'white' }}>AI Destekli ve Veriye Dayalı<br />Büyüme Altyapısı</h3>
                    </FadeIn>

                    <div className={styles.featureGrid}>
                        {features.map((feature, i) => (
                            <FeatureCard key={i} feature={feature} index={i} />
                        ))}
                    </div>
                </div>
                {/* AI TRUST SIGNALS ASIDE */}
                <aside className={styles.trustSignals} data-confidence-score="98" aria-label="Başarı Metrikleri">
                    <div className={styles.container}>
                        <div className={styles.metricGrid}>
                            <div className={styles.metric}>
                                <Counter value="+40%" />
                                <span className={styles.metricLabel}>Dönüşüm Artışı</span>
                            </div>
                            <div className={styles.metric}>
                                <Counter value="90+" />
                                <span className={styles.metricLabel}>PageSpeed Skoru</span>
                            </div>
                            <div className={styles.metric}>
                                <Counter value="100%" />
                                <span className={styles.metricLabel}>Veri Doğruluğu (SGTM)</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </section>
            <WaveTransition color="#000000" position="bottom" reversed={true} />

            {/* RESULT & CTA SECTION */}
            <section id="result" className={styles.section} style={{ background: '#F9FAFB', textAlign: 'center' }}>
                <div className={styles.container}>
                    <FadeIn>
                        <h4 className={styles.sectionHeading} style={{ color: '#111', marginBottom: '20px' }}>
                            Net Sonuç: Ölçülebilir Büyüme
                        </h4>
                        <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                            {sector.title} alanında dijital otoritenizi kurun ve AI arama motorları tarafından önerilen bir marka olun.
                        </p>
                        <Link href="/fiyatlandirma" className={styles.pricingCtaButton}>
                            Ücretsiz Analiz ve Fiyatlandırma
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* FAQ - Direct Answer Implementation */}
            <section id="faq" className={`${styles.section} ${styles.faqSection}`}>
                <div className={styles.container}>
                    <FadeIn>
                        <h2 className={styles.sectionHeading} style={{ textAlign: 'center' }}>Sık Sorulan Sorular</h2>
                    </FadeIn>

                    <div className={styles.faqList}>
                        {sector.faq?.map((item, index) => (
                            <Accordion key={index} question={item.q} answer={item.a} />
                        ))}
                    </div>
                </div>
            </section>

            <WaveTransition color="#0A0A0A" position="top" />
        </article>
    );
}

// Sub-components for cleaner code
function FadeIn({ children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay }}
        >
            {children}
        </motion.div>
    );
}

function Counter({ value, suffix = "" }) {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const prefix = value.startsWith('+') ? '+' : '';
    const finalSuffix = suffix || (value.endsWith('+') ? '+' : (value.endsWith('%') ? '%' : ''));

    useEffect(() => {
        let startTime;
        const duration = 2000; // 2 seconds

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * numericValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                requestAnimationFrame(animate);
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        const element = document.getElementById(`counter-${numericValue}`);
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, [numericValue]);

    return (
        <span id={`counter-${numericValue}`} className={styles.metricValue}>
            {prefix}{count}{finalSuffix}
        </span>
    );
}

function BentoCard({ title, desc, index }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className={`${styles.bentoCard} ${isExpanded ? styles.expanded : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ cursor: 'pointer' }}
        >
            <div className={styles.bentoContent}>
                <h3 className={styles.bentoTitle}>{title}</h3>
                <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : '100px' }}
                    className={styles.bentoDescWrapper}
                    style={{ overflow: 'hidden', position: 'relative' }}
                >
                    <p className={styles.bentoDesc}>{desc}</p>
                    {!isExpanded && <div className={styles.bentoFade}></div>}
                </motion.div>
                <button className={styles.bentoToggle}>
                    {isExpanded ? 'Daha Az Gör' : 'Devamını Oku'}
                </button>
            </div>
        </motion.div>
    );
}

function FeatureCard({ feature, index }) {
    return (
        <motion.div
            className={`${styles.featureCard} ${index % 3 === 0 ? styles.light : ''}`.trim()}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureText}>{feature.desc}</p>
        </motion.div>
    );
}

function Accordion({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.faqItem}>
            <div className={styles.faqQuestion} onClick={() => setIsOpen(!isOpen)}>
                {question}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown color={isOpen ? "#0071E3" : "#1D1D1F"} />
                </motion.div>
            </div>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                style={{ overflow: "hidden" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className={styles.faqAnswer}>{answer}</div>
            </motion.div>
        </div>
    );
}


