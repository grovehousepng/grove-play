'use client';

import { useState, useEffect } from 'react';
import { Gift, X } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

export default function GiveawayWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Using the same formspree ID as Contact.js
    const [state, handleSubmitFormspree] = useForm("xnjbjojn");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const submitted = localStorage.getItem('grove_giveaway_submitted');
            if (submitted === 'true') {
                setIsSubmitted(true);
            }
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};

        // Name Validation
        const nameParts = formData.name.trim().split(/\s+/);
        if (nameParts.length < 2) {
            newErrors.name = 'Lütfen ad ve soyad giriniz.';
        }

        // Phone Validation (10 digits starting with 5)
        const phoneClean = formData.phone.replace(/[^0-9]/g, '');
        if (phoneClean.length !== 10) {
            newErrors.phone = 'Numara 10 haneli olmalı.';
        } else if (!phoneClean.startsWith('5')) {
            newErrors.phone = 'Numara 5 ile başlamalıdır.';
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Geçerli bir e-posta giriniz.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Extract full name
        const fullName = formData.name.trim();
        const nameParts = fullName.split(/\s+/);

        // Basic formatting for phone to prepend 90 like in other forms
        let formattedPhoneNum = formData.phone.replace(/[^0-9]/g, '');
        if (formattedPhoneNum.startsWith('0')) {
            formattedPhoneNum = formattedPhoneNum.substring(1);
        }
        formattedPhoneNum = '90' + formattedPhoneNum;

        // sGTM Push exactly like you configured previously
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'join_giveaway',
                user_data: {
                    user_email: formData.email.trim() || "",
                    user_phone: formattedPhoneNum || "",
                    user_first_name: nameParts[0] || "",
                    user_last_name: nameParts.slice(1).join(' ') || "",
                    full_name: fullName
                },
                source: 'giveaway_widget'
            });
        }

        // Send to Formspree
        const formspreeData = new FormData();
        formspreeData.append('form_source', 'Giveaway Popup');
        formspreeData.append('name', formData.name);
        formspreeData.append('phone', formData.phone);
        formspreeData.append('email', formData.email);

        handleSubmitFormspree(formspreeData).then(() => {
            setIsSubmitted(true);
            if (typeof window !== 'undefined') {
                localStorage.setItem('grove_giveaway_submitted', 'true');
            }

            // Hide popup after a few seconds
            setTimeout(() => {
                setIsOpen(false);
            }, 3000);
        });
    };

    return (
        <div className="fixed left-6 bottom-[130px] z-[9990] font-sans">
            {/* Custom Keyframes for Circular Glow */}
            <style>{`
                @keyframes circular-glow {
                    0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7); }
                    70% { box-shadow: 0 0 0 15px rgba(124, 58, 237, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
                }
            `}</style>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_25px_rgba(124,58,237,0.6)] ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
                style={{ animation: isOpen ? 'none' : 'circular-glow 2s infinite' }}
                aria-label="Çekiliş Fırsatı"
            >
                <Gift size={26} />
            </button>

            {/* Popup Panel */}
            <div className={`absolute bottom-0 left-0 w-[320px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-neutral-100 overflow-hidden transition-all duration-400 origin-bottom-left ${isOpen ? 'opacity-100 visible scale-100 translate-y-0 translate-x-0' : 'opacity-0 invisible scale-95 translate-y-8 -translate-x-4 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-[-50px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-[-30px] left-[-30px] w-32 h-32 bg-black/10 rounded-full blur-xl"></div>
                    <div className="relative z-10 flex items-center gap-3 text-white">
                        <Gift size={24} />
                        <h3 className="m-0 font-display text-xl tracking-wide">Çekiliş Fırsatı</h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="relative z-10 text-white/80 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 bg-gray-50/50">
                    {isSubmitted ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h4 className="text-xl font-semibold text-neutral-800 mb-2">Başarıyla Katıldınız!</h4>
                            <p className="text-sm text-neutral-500">Çekiliş sonuçları için sizinle iletişime geçeceğiz.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <p className="text-sm text-neutral-600 mb-4 leading-relaxed font-medium">
                                Bilgilerinizi doldurun, ücretsiz web sitesi kazanma şansı yakalayın!
                            </p>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Adınız Soyadınız"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-neutral-200'} text-neutral-800 p-3 text-sm rounded-lg outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-100`}
                                />
                                {errors.name && <span className="text-xs text-red-500 mt-1 block px-1">{errors.name}</span>}
                            </div>

                            <div className={`flex items-center bg-white border ${errors.phone ? 'border-red-500' : 'border-neutral-200'} rounded-lg overflow-hidden focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all`}>
                                <div className="bg-neutral-50 px-3 py-3 border-r border-neutral-200 text-neutral-500 text-sm font-medium">
                                    +90
                                </div>
                                <input
                                    type="tel"
                                    placeholder="5XX XXX XX XX"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                        if (val.length <= 10) setFormData({ ...formData, phone: val });
                                    }}
                                    className="w-full bg-white text-neutral-800 p-3 text-sm outline-none"
                                />
                            </div>
                            {errors.phone && <span className="text-xs text-red-500 block px-1 -mt-3">{errors.phone}</span>}

                            <div>
                                <input
                                    type="email"
                                    placeholder="E-posta Adresiniz"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-neutral-200'} text-neutral-800 p-3 text-sm rounded-lg outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-100`}
                                />
                                {errors.email && <span className="text-xs text-red-500 mt-1 block px-1">{errors.email}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={state.submitting}
                                className="mt-2 w-full bg-black text-white p-3.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors shadow-md disabled:opacity-70"
                            >
                                {state.submitting ? 'Katılım Gönderiliyor...' : 'Çekilişe Katıl'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
