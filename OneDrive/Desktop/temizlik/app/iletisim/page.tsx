'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, CheckCircle2, Send } from 'lucide-react';

// Subcomponent that uses useSearchParams inside Suspense
function BookingForm() {
    const searchParams = useSearchParams();
    
    // Form states
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [service, setService] = useState('vip');
    const [area, setArea] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Dynamic auto-population from URL search query parameters (from Calculator Handoff)
    useEffect(() => {
        const queryArea = searchParams.get('area');
        const queryService = searchParams.get('service');
        const queryPrice = searchParams.get('price');

        if (queryArea) setArea(queryArea);
        
        // Map service label back to value key
        if (queryService) {
            if (queryService.includes('İnşaat')) setService('insaat');
            else if (queryService.includes('Villa')) setService('villa');
            else if (queryService.includes('Boş')) setService('bos');
            else if (queryService.includes('Ofis')) setService('ofis');
            else setService('vip');
        }

        if (queryArea && queryService && queryPrice) {
            setNotes(`Keşif Hesaplayıcı ile yapılan tahmini hesaplama:\n- Hizmet: ${queryService}\n- Alan Büyüklüğü: ${queryArea} m²\n- Tahmini Ücret: ${queryPrice} ₺.`);
        }
    }, [searchParams]);

    // Handle Form Submission with WhatsApp integration
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Map selection to human readable label
        const serviceLabels: Record<string, string> = {
            vip: 'VIP Ev & Rezidans Temizliği',
            insaat: 'İnşaat / Tadilat Sonrası Temizlik',
            villa: 'Premium Villa & Malikane Temizliği',
            bos: 'Boş Konut / Taşınma Temizliği',
            ofis: 'Ofis & Plaza Temizliği'
        };

        const serviceLabel = serviceLabels[service] || 'VIP Ev & Rezidans Temizliği';

        // Construct high-fidelity message text for WhatsApp
        const waMessage = `Merhaba Nera Clean, yeni bir keşif ve teklif talebi göndermek istiyorum:\n\n` +
                          `👤 Ad Soyad: ${name}\n` +
                          `📞 Telefon: ${phone}\n` +
                          `✉️ E-posta: ${email || 'Belirtilmedi'}\n` +
                          `✨ Hizmet: ${serviceLabel}\n` +
                          `📐 Alan Metrajı: ${area ? `${area} m²` : 'Belirtilmedi'}\n` +
                          `📝 Özel Notlar:\n${notes || 'Yok'}`;

        const waUrl = `https://wa.me/905427811029?text=${encodeURIComponent(waMessage)}`;

        // Open WhatsApp in a new tab immediately
        window.open(waUrl, '_blank');
        
        // Toggle web page success modal/state
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div style={{
                background: 'var(--white)',
                border: '1px solid rgba(0, 45, 98, 0.05)',
                padding: '4rem 3rem',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-deep)',
                textAlign: 'center'
            }}>
                <CheckCircle2 size={72} style={{ color: '#25D366', marginBottom: '2rem', display: 'inline-block' }} />
                <h3 style={{ fontSize: '2rem', color: 'var(--navy-dark)', marginBottom: '1rem', fontWeight: 700 }}>Talebiniz WhatsApp Üzerinden Gönderildi!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
                    Formda girdiğiniz tüm bilgilerle birlikte doğrudan müşteri hizmetlerimize yönlendirildiniz. Müşteri temsilcimiz anında sizinle iletişime geçecektir.
                </p>
                <button 
                    onClick={() => {
                        setIsSubmitted(false);
                        setName('');
                        setPhone('');
                        setEmail('');
                        setArea('');
                        setNotes('');
                    }}
                    className="btn btn-navy"
                >
                    Yeni Talep Gönder
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{
            background: 'var(--white)',
            border: '1px solid rgba(0, 45, 98, 0.05)',
            padding: '4rem 3rem',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-deep)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.8rem'
        }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--navy-dark)', fontWeight: 700, margin: 0 }}>Keşif & Rezervasyon Formu</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '-1rem', marginBottom: '1rem' }}>Formu doldurun, talebinizi WhatsApp hattımıza tek tıkla güvenle yönlendirelim.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Full name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-main)', textTransform: 'uppercase' }}>Ad Soyad *</label>
                    <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Örn: Ayhan Oğuz" 
                        className="form-input" 
                    />
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-main)', textTransform: 'uppercase' }}>Telefon Numarası *</label>
                    <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Örn: 0542 781 10 29" 
                        className="form-input" 
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-main)', textTransform: 'uppercase' }}>E-posta Adresi</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Örn: info@neraclean.com" 
                        className="form-input" 
                    />
                </div>

                {/* Area m2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-main)', textTransform: 'uppercase' }}>Alan Metrajı (m²)</label>
                    <input 
                        type="number" 
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Örn: 120" 
                        className="form-input" 
                    />
                </div>
            </div>

            {/* Service dropdown selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-main)', textTransform: 'uppercase' }}>Hizmet Tercihi</label>
                <select 
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="form-input"
                    style={{ background: 'var(--bg-light)', cursor: 'pointer' }}
                >
                    <option value="vip">VIP Ev & Rezidans Temizliği</option>
                    <option value="insaat">İnşaat ve Tadilat Sonrası Temizlik</option>
                    <option value="villa">Premium Villa & Malikane Temizliği</option>
                    <option value="bos">Boş Konut / Taşınma Öncesi Detaylı Hijyen</option>
                    <option value="ofis">Ofis, Büro & Plaza Temizliği</option>
                </select>
            </div>

            {/* Notes & Special Requests */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-main)', textTransform: 'uppercase' }}>Özel Talepler & Notlar</label>
                <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Varsa evcil hayvan durumu, özel talep edilen bölümler ve ek açıklama..." 
                    className="form-input"
                    style={{ minHeight: '120px', resize: 'none' }}
                />
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-gold" style={{ marginTop: '1rem', width: '100%', padding: '1.2rem' }}>
                <Send size={16} /> WhatsApp ile Keşif Talebi Gönder
            </button>
        </form>
    );
}

// Main page component wrapping form in Suspense
export default function ContactPage() {
    return (
        <div style={{ backgroundColor: 'var(--bg-light)', paddingBottom: '8rem', paddingTop: '110px' }}>
            <div className="container">
                
                {/* Header Title Section */}
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <span className="section-tag" style={{ color: 'var(--gold-main)', justifyContent: 'center' }}>İLETİŞİM</span>
                    <h1 className="section-title" style={{ fontSize: '3rem', fontWeight: 700 }}>
                        Bizimle <span>İletişime Geçin</span>
                    </h1>
                    <p className="section-subtitle" style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Sorularınız, iş birlikleri ve keşif talepleriniz için 7/24 hizmetinizdeyiz. Profesyonel kadromuzla anında yanınızdayız.
                    </p>
                </div>

                {/* Dual Column Section Layout */}
                <div className="grid-2" style={{ gap: '4rem', alignItems: 'stretch' }}>
                    {/* Left Column: Contact Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        
                        {/* Info Block: Location */}
                        <div style={{
                            background: 'var(--white)',
                            border: '1px solid rgba(0, 45, 98, 0.05)',
                            padding: '1.5rem 2rem',
                            borderRadius: '16px',
                            boxShadow: 'var(--shadow-soft)',
                            display: 'flex',
                            gap: '1.5rem'
                        }}>
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
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-dark)', fontWeight: 700, marginBottom: '0.4rem' }}>Ofis / Lokasyon</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                    Akşemsettin Mah. Sulhiye Sok.<br />
                                    Beyşehirliler Sitesi A/B Blok Kat:2 No:3<br />
                                    Konya, Türkiye
                                </p>
                            </div>
                        </div>

                        {/* Info Block: Phone Calling */}
                        <div style={{
                            background: 'var(--white)',
                            border: '1px solid rgba(0, 45, 98, 0.05)',
                            padding: '1.5rem 2rem',
                            borderRadius: '16px',
                            boxShadow: 'var(--shadow-soft)',
                            display: 'flex',
                            gap: '1.5rem'
                        }}>
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
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-dark)', fontWeight: 700, marginBottom: '0.4rem' }}>Doğrudan İletişim</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, marginBottom: '0.3rem' }}>
                                    <a href="tel:+905427811029" style={{ color: 'inherit', fontWeight: 600 }}>+90 542 781 10 29</a>
                                </p>
                                <span style={{ fontSize: '0.75rem', color: 'var(--gold-main)', textTransform: 'uppercase', fontWeight: 600 }}>7/24 Kesintisiz Çağrı Destek</span>
                            </div>
                        </div>

                        {/* Info Block: Secure Email */}
                        <div style={{
                            background: 'var(--white)',
                            border: '1px solid rgba(0, 45, 98, 0.05)',
                            padding: '1.5rem 2rem',
                            borderRadius: '16px',
                            boxShadow: 'var(--shadow-soft)',
                            display: 'flex',
                            gap: '1.5rem'
                        }}>
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
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-dark)', fontWeight: 700, marginBottom: '0.4rem' }}>Kurumsal E-posta</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                    <a href="mailto:neracleaningservices@gmail.com" style={{ color: 'inherit' }}>neracleaningservices@gmail.com</a>
                                </p>
                            </div>
                        </div>

                        {/* Guarantee Card block */}
                        <div style={{
                            background: 'linear-gradient(135deg, #002D62 0%, #0B3E7D 100%)',
                            color: 'var(--white)',
                            padding: '3rem 2.5rem',
                            borderRadius: '16px',
                            boxShadow: 'var(--shadow-deep)'
                        }}>
                            <h4 style={{ fontSize: '1.3rem', color: 'var(--white)', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ShieldCheck size={24} style={{ color: 'var(--gold-main)' }} /> Nera Clean Hijyen Sözü
                            </h4>
                            <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                                "Tüm rezervasyon ve keşif taleplerinizi kurumsal kalite standartlarımıza göre inceliyor, uzman ekibimizin ve kullanılan sterilizasyon ürünlerinin kalitesini en üst düzeyde denetliyoruz."
                            </p>
                        </div>

                    </div>

                    {/* Right Column: Suspense boundaries wrapped form */}
                    <div>
                        <Suspense fallback={
                            <div style={{
                                background: 'var(--white)',
                                border: '1px solid rgba(0, 45, 98, 0.05)',
                                padding: '4rem 3rem',
                                borderRadius: '20px',
                                boxShadow: 'var(--shadow-deep)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '400px'
                            }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Form Yükleniyor...</span>
                            </div>
                        }>
                            <BookingForm />
                        </Suspense>
                    </div>
                </div>

            </div>

            {/* Responsive styles override helper */}
            <style jsx>{`
                @media (max-width: 992px) {
                    .grid-2 {
                        grid-template-columns: 1fr !important;
                        gap: 3.5rem !important;
                    }
                    div[style*="display: grid; gridTemplateColumns: 1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                        gap: 1.2rem !important;
                    }
                }
            `}</style>
        </div>
    );
}
