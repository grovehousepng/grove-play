'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Clock, ShieldCheck, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CalculatorPage() {
    const [area, setArea] = useState<number>(100);
    const [serviceType, setServiceType] = useState<string>('vip');
    const [price, setPrice] = useState<string>('2.300');
    const [duration, setDuration] = useState<number>(6);

    // List of services with katsayı multipliers
    const services = [
        { id: 'vip', label: 'VIP Ev & Rezidans', factor: 1.0 },
        { id: 'insaat', label: 'İnşaat / Tadilat Sonrası', factor: 1.4 },
        { id: 'villa', label: 'Villa & Malikane', factor: 1.8 },
        { id: 'bos', label: 'Boş Konut / Taşınma', factor: 0.85 },
        { id: 'ofis', label: 'Ofis & Plaza', factor: 0.9 }
    ];

    useEffect(() => {
        const currentService = services.find(s => s.id === serviceType) || services[0];
        const factor = currentService.factor;

        // Formula: (m² * 15 * factor) + 800, rounded to nearest 50 TL
        const calculatedRawPrice = (area * 15 * factor) + 800;
        const roundedPrice = Math.round(calculatedRawPrice / 50) * 50;
        setPrice(roundedPrice.toLocaleString('tr-TR'));

        // Duration: cap at min 3 hours, scale based on area and complexity
        const calculatedDuration = Math.max(3, Math.round((area * 0.05 * factor) + 1));
        setDuration(calculatedDuration);
    }, [area, serviceType]);

    const activeServiceLabel = services.find(s => s.id === serviceType)?.label || '';

    // Create the booking URL carrying state parameters
    const bookingUrl = `/iletisim?area=${area}&service=${encodeURIComponent(activeServiceLabel)}&price=${price}`;

    return (
        <div style={{ backgroundColor: 'var(--bg-light)', paddingBottom: '8rem', paddingTop: '110px' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                
                {/* Header Title Section */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="section-tag" style={{ color: 'var(--gold-main)', justifyContent: 'center' }}>Online Keşif</span>
                    <h1 className="section-title" style={{ fontSize: '3rem', fontWeight: 700 }}>
                        Keşif & <span>Fiyat Hesaplayıcı</span>
                    </h1>
                    <p className="section-subtitle" style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Dairenizin büyüklüğünü ve hizmet türünü seçerek anında tahmini bütçe hesabı yapabilir, VIP rezervasyon için bilgileri iletebilirsiniz.
                    </p>
                </div>

                {/* Dashboard Grid Panel */}
                <div className="calc-container" style={{
                    background: 'var(--white)',
                    borderRadius: '20px',
                    border: '1px solid rgba(0, 45, 98, 0.06)',
                    boxShadow: 'var(--shadow-deep)',
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr'
                }}>
                    {/* Controls Column */}
                    <div className="calc-controls" style={{ padding: '4rem 3.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--navy-dark)', marginBottom: '0.8rem' }}>Parametrelerinizi Seçin</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.95rem' }}>Alan boyutlarını sürükleyerek anında hesaplama yapın.</p>

                        {/* Slider Area Input */}
                        <div className="calc-group" style={{ marginBottom: '3rem' }}>
                            <div className="calc-label" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--navy-main)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                <span>1. ALAN BÜYÜKLÜĞÜ (m²)</span>
                                <span style={{ color: 'var(--gold-main)', fontSize: '1.1rem', fontWeight: 700 }}>{area} m²</span>
                            </div>
                            <div className="range-slider">
                                <input 
                                    type="range" 
                                    min="50" 
                                    max="500" 
                                    step="5"
                                    value={area} 
                                    onChange={(e) => setArea(Number(e.target.value))}
                                    className="slider-input" 
                                />
                            </div>
                        </div>

                        {/* Service Type Selection */}
                        <div className="calc-group" style={{ marginBottom: '3rem' }}>
                            <div className="calc-label" style={{ fontWeight: 600, color: 'var(--navy-main)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
                                <span>2. HİZMET TÜRÜ SEÇİMİ</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {services.map((service) => (
                                    <button
                                        key={service.id}
                                        type="button"
                                        onClick={() => setServiceType(service.id)}
                                        style={{
                                            padding: '1rem 1.4rem',
                                            textAlign: 'left',
                                            borderRadius: '8px',
                                            border: serviceType === service.id ? '2px solid var(--gold-main)' : '1px solid #E2E8F0',
                                            background: serviceType === service.id ? 'rgba(212, 175, 55, 0.05)' : 'var(--white)',
                                            color: serviceType === service.id ? 'var(--navy-dark)' : 'var(--text-main)',
                                            fontWeight: serviceType === service.id ? '700' : '500',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {service.label}
                                        {serviceType === service.id && <CheckCircle2 size={18} style={{ color: 'var(--gold-main)' }} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Results Display Column */}
                    <div className="calc-results" style={{
                        background: 'linear-gradient(135deg, #002D62 0%, #0B3E7D 100%)',
                        color: 'var(--white)',
                        padding: '4rem 3.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative'
                    }}>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', color: 'var(--white)', marginBottom: '2.5rem' }}>Ön Değerlendirme</h2>
                            
                            {/* Grid Row: Price */}
                            <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>Tahmini Ücret</span>
                                <span style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '-1px' }}>
                                    {price} <span style={{ color: 'var(--gold-main)', fontSize: '2.2rem', fontWeight: 600 }}>₺</span>
                                </span>
                            </div>

                            {/* Grid Row: Duration */}
                            <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>Tahmini Süre</span>
                                <span style={{ fontSize: '1.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <Clock size={20} style={{ color: 'var(--gold-main)' }} /> {duration} Saat <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', fontWeight: 'normal' }}>(Ortalama)</span>
                                </span>
                            </div>

                            {/* Grid Row: Hygiene Locked rating */}
                            <div style={{ marginBottom: '2.5rem' }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>Hijyen Güvence Puanı</span>
                                <span className="score-green" style={{
                                    fontSize: '1.8rem',
                                    fontWeight: 700,
                                    color: '#25D366',
                                    textShadow: '0 0 10px rgba(37, 211, 102, 0.4)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.6rem'
                                }}>
                                    <ShieldCheck size={20} /> %100 Güvenli
                                </span>
                            </div>
                        </div>

                        {/* CTA Handoff Booking Button */}
                        <div>
                            <Link href={bookingUrl} className="btn btn-gold" style={{ width: '100%', padding: '1.2rem' }}>
                                Seçilen Değerlerle Teklif Al <ArrowRight size={16} />
                            </Link>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textAlign: 'center', marginTop: '1rem', margin: '1rem 0 0' }}>
                                *Hesaplanan değerler tahmini olup, nihai teklif keşif sonrası netleşir.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Custom media queries helper block */}
            <style jsx>{`
                @media (max-width: 992px) {
                    .calc-container {
                        grid-template-columns: 1fr !important;
                    }
                    .calc-results {
                        border-top: 1px solid rgba(255,255,255,0.1);
                        padding: 3rem 2rem !important;
                    }
                    .calc-controls {
                        padding: 3rem 2rem !important;
                    }
                }
            `}</style>
        </div>
    );
}
