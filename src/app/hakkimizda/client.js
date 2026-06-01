'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import FlyingTechIcons from '../../components/FlyingTechIcons';

const Typewriter = ({ text, delay = 0, speed = 50, showCursor = true }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!text) return;
        setDisplayedText('');
        let i = 0;
        const delayTimer = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(delayTimer);
    }, [text, delay, speed]);

    return (
        <span>
            <style>{`
                @keyframes typewriter-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
            {displayedText}
            {showCursor && <span style={{ animation: 'typewriter-blink 1s step-end infinite', marginLeft: '2px', fontWeight: '400' }}>|</span>}
        </span>
    );
};

export default function HakkimizdaClient({ page }) {
    // Fallback content if WP content is empty
    const hasContent = page && page.content;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen bg-white text-black overflow-hidden font-sans">
            <FlyingTechIcons />
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-6 md:pt-48 md:pb-32">
                {/* Subtle Background */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
                    <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gray-50 rounded-full blur-[120px] opacity-60"></div>
                </div>

                <motion.div
                    className="container mx-auto relative z-10 max-w-[1200px]"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h1
                        className="text-5xl md:text-8xl font-bold mb-8 tracking-wide leading-[0.9] text-black font-display min-h-[1em]"
                        variants={itemVariants}
                    >
                        <Typewriter text={page?.title || 'GROVE MEDIA CREATIVE'} speed={50} delay={300} showCursor={false} />
                    </motion.h1>
                    <motion.div
                        className="w-20 h-1 bg-black mb-8"
                        variants={itemVariants}
                    />
                    <motion.p
                        className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed font-light min-h-[2em]"
                        variants={itemVariants}
                    >
                        <Typewriter text="Dijital dünyada iz bırakmanız için buradayız." speed={40} delay={1000} showCursor={false} />
                    </motion.p>
                </motion.div>
            </section>

            {/* Main Content Section */}
            <section className="pb-24 px-6 md:pb-32 relative z-10">
                <motion.div
                    className="container mx-auto max-w-[1200px]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {hasContent ? (
                        <div
                            className="prose prose-lg max-w-4xl mx-auto md:mx-0 text-gray-700"
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />
                    ) : (
                        <div className="max-w-4xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-black tracking-wide font-display">Biz Kimiz?</h2>
                            <div className="space-y-8 text-lg text-gray-700 font-light leading-relaxed">
                                <p>
                                    Grove Media Creative olarak, markaların dijital ekosistemde sürdürülebilir büyüme elde etmeleri için <strong className="text-black font-medium">profesyonel reklam takibi</strong> ve <strong className="text-black font-medium">ölçülebilir</strong> stratejiler geliştiriyoruz.
                                    Karmaşık dijital problemleri, anlaşılır ve etkili çözümlere dönüştürüyoruz.
                                </p>
                                <p>
                                    Teknoloji ve tasarımı birleştirerek, müşterilerimize <strong className="text-black font-medium">en yüksek dönüşüm</strong> oranlarını sunmayı hedefliyoruz.
                                    İş ortaklarımızın hedeflerini kendi hedefimiz olarak benimsiyor, şeffaf ve sonuç odaklı bir çalışma modeli sunuyoruz.
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Founder Section */}
            <section className="pb-24 px-6 md:pb-32 relative z-10">
                <div className="container mx-auto max-w-[1200px]">
                    <motion.div
                        className="bg-gray-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 shadow-sm border border-gray-100"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-200 relative">
                            <Image src="/yucel-guzel.jpg" alt="Yücel Güzel - Kurucu" fill sizes="(max-width: 768px) 192px, 256px" className="object-cover" />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-black font-display tracking-wide">Yücel Güzel</h2>
                            <h3 className="text-xl text-blue-600 mb-6 font-medium tracking-wide">Kurucu (Founder)</h3>
                            <p className="text-lg text-gray-700 font-light leading-relaxed italic min-h-[4em]">
                                <Typewriter text='"Herkesin, işin uzmanı olduğunu iddia ettiği bu dönemde kuralları baştan yazmak için geldim."' speed={40} delay={2000} showCursor={true} />
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 px-6 border-t border-gray-100 bg-gray-50">
                <div className="container mx-auto max-w-[1200px]">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {[
                            { title: "YENİLİKÇİ", desc: "En yeni teknolojilerle geleceği bugüne taşıyoruz.", color: "bg-blue-600" },
                            { title: "YARATICI", desc: "Sıradan olanı reddediyor, özgün hikayeler yaratıyoruz.", color: "bg-purple-600" },
                            { title: "SONUÇ ODAKLI", desc: "Başarıyı rakamlarla ve gerçek büyümeyle ölçüyoruz.", color: "bg-green-600" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group"
                            >
                                <div className="w-12 h-12 mb-6 border border-gray-300 rounded-full flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors duration-300 font-display text-xl pt-1">
                                    {index + 1}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-black tracking-wide font-display">{item.title}</h3>
                                <p className="text-gray-600 group-hover:text-black transition-colors duration-300 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
