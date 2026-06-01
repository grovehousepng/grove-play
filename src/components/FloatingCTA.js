'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
// import ChatWidget from './ChatWidget';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <>
            <motion.div
                className={styles.container}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
            >
                {/* <div
                    className={`${styles.btn} ${styles.chatBtn}`}
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    style={{ cursor: 'pointer' }}
                >
                    <span className={styles.badge}>1</span>
                    <MessageSquare size={18} /> Canlı Destek
                </div> */}
                <a
                    href="https://wa.me/905416834410"
                    className={`${styles.btn} ${styles.whatsappBtn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({ 'event': 'whatsapp_click' });
                    }}
                >
                    <MessageCircle size={18} /> WhatsApp
                </a>
                <a
                    href="tel:+905416834410"
                    className={`${styles.btn} ${styles.callBtn}`}
                    aria-label="Hemen Ara"
                    onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({ 'event': 'phone_click' });
                    }}
                >
                    <Phone size={18} /> Hemen Ara
                </a>
            </motion.div>

            {/* <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} /> */}
        </>
    );
}
