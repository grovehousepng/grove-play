'use client';

import styles from './Contact.module.css';

import { trackFormSubmit } from '../utils/analytics';
import { useForm, ValidationError } from '@formspree/react';
import { useEffect, useState } from 'react';

export default function Contact() {
    const [state, handleSubmit] = useForm("xnjbjojn");
    const [submittedData, setSubmittedData] = useState(null);

    const onSubmit = (e) => {
        // Formspree's handleSubmit expects an event
        const formData = new FormData(e.target);
        setSubmittedData({
            name: formData.get('name') || '',
            phone: formData.get('phone') || '',
            email: formData.get('email') || ''
        });
        handleSubmit(e);
    };

    useEffect(() => {
        if (state.succeeded && submittedData) {
            window.dataLayer = window.dataLayer || [];

            // Format phone and name
            const fullName = submittedData.name.trim();
            const nameParts = fullName.split(/\s+/);
            const formattedPhoneNum = '90' + submittedData.phone.replace(/[^0-9]/g, '').replace(/^0/, '');

            window.dataLayer.push({
                event: 'generate_lead',
                user_data: {
                    user_email: submittedData.email || "",
                    user_phone: formattedPhoneNum || "",
                    user_first_name: nameParts[0] || "",
                    user_last_name: nameParts.slice(1).join(' ') || "",
                    full_name: fullName
                },
                source: 'grove_contact_form'
            });
        }
    }, [state.succeeded, submittedData]);

    if (state.succeeded) {
        return (
            <section className={styles.section} id="contact">
                <div className={styles.container}>
                    <div className={styles.successWrapper}>
                        <h2 className={styles.successTitle}>Teşekkürler!</h2>
                        <p className={styles.successDesc}>Analiz talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section} id="contact">
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.label}>İletişime Geçin</span>
                    <h2 className={styles.title}>Ücretsiz Reklam Analizi Alın</h2>
                    <p className={styles.desc}>
                        Mevcut reklam altyapınızı ücretsiz analiz edelim.
                        İyileştirme fırsatlarını ve potansiyel tasarrufları keşfedin.
                    </p>
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <span className={styles.check}>✓</span>
                            <span>Hesap Performans Analizi</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.check}>✓</span>
                            <span>Dönüşüm Takibi Kontrolü</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.check}>✓</span>
                            <span>Optimizasyon Önerileri</span>
                        </div>
                    </div>
                </div>
                <div className={styles.formWrapper}>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Adınız Soyadınız"
                            className={styles.input}
                            required
                        />
                        <ValidationError prefix="Name" field="name" errors={state.errors} />

                        <input
                            id="sector"
                            type="text"
                            name="sector"
                            placeholder="Sektörünüz"
                            className={styles.input}
                            required
                        />
                        <ValidationError prefix="Sector" field="sector" errors={state.errors} />

                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            placeholder="Telefon Numaranız"
                            className={styles.input}
                            required
                        />
                        <ValidationError prefix="Phone" field="phone" errors={state.errors} />

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="E-posta Adresiniz (Opsiyonel)"
                            className={styles.input}
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />

                        <button type="submit" className={styles.button} disabled={state.submitting}>
                            {state.submitting ? 'Gönderiliyor...' : 'Ücretsiz Analiz Talep Et'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
