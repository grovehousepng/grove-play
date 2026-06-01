'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Phone as PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import WireframeCube from './WireframeCube';
import styles from './ChatbotWidget.module.css';

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [user, setUser] = useState(null); // { name, phone }
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({ name: '', phone: '' });

    const messagesEndRef = useRef(null);

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Check for existing user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('grove_user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            // Add initial greeting if no messages
            if (messages.length === 0) {
                setMessages([
                    {
                        id: 1,
                        sender: 'bot',
                        text: `Merhaba ${parsedUser.name.split(' ')[0]}, Grove Media Strateji Mimarı ben. Projenizden bahsedin, analiz edelim.`
                    }
                ]);
            }
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (formData.name && formData.phone) {
            // Basic validation could go here
            const newUser = { name: formData.name, phone: formData.phone };
            localStorage.setItem('grove_user', JSON.stringify(newUser));
            setUser(newUser);

            // sGTM Push
            if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || [];

                // Extract full name
                const fullName = formData.name.trim();
                const nameParts = fullName.split(/\s+/);
                // Basic formatting for phone
                const formattedPhoneNum = '90' + formData.phone.replace(/[^0-9]/g, '').replace(/^0/, '');

                window.dataLayer.push({
                    event: 'generate_lead',
                    user_data: {
                        user_email: "", // Not collected in chat
                        user_phone: formattedPhoneNum || "",
                        user_first_name: nameParts[0] || "",
                        user_last_name: nameParts.slice(1).join(' ') || "",
                        full_name: fullName
                    },
                    source: 'grove_chatbot_widget'
                });
            }

            // Add initial greeting
            setMessages([
                {
                    id: 1,
                    sender: 'bot',
                    text: `Merhaba ${newUser.name.split(' ')[0]}, Grove Media Strateji Mimarı ben. Projenizden bahsedin, analiz edelim.`
                }
            ]);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            sender: 'user',
            text: inputValue
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:3001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: newUserMessage.text,
                    userName: user.name,
                    userPhone: user.phone
                }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'bot',
                text: data.text
            }]);

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'bot',
                text: "Bağlantı hatası oluştu. Lütfen WhatsApp üzerinden iletişime geçiniz."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Animation variants for the FAB
    const fabVariants = {
        idle: {
            y: [0, -5, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
            }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        open: {
            rotate: 90,
            scale: 1,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className={styles.container}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.popup}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <div className={styles.header}>
                            {/* Placeholder Avatar - replace with local asset if available */}
                            <Image
                                src="https://ui-avatars.com/api/?name=Grove+AI&background=000&color=fff&bold=true"
                                alt="Support Avatar"
                                width={40}
                                height={40}
                                className={styles.avatar}
                            />
                            <div className={styles.titleGroup}>
                                <span className={styles.name}>Grove AI</span>
                                <span className={styles.brand}>Strateji Mimarı</span>
                            </div>
                        </div>

                        <div className={styles.content}>
                            {!user ? (
                                // STATE A: Lead Capture Form
                                <form onSubmit={handleLogin} className={styles.formContainer}>
                                    <div className={styles.formHeader}>
                                        <h3 className={styles.formTitle}>PROJE ANALİZİ</h3>
                                        <p className={styles.formSubtitle}>Size özel strateji geliştirebilmemiz için;</p>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Ad Soyad</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            placeholder="Adınız Soyadınız"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Telefon</label>
                                        <input
                                            type="tel"
                                            className={styles.formInput}
                                            placeholder="05xxxxxxxxx"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className={styles.submitButton}>
                                        SOHBETE BAŞLA
                                    </button>
                                </form>
                            ) : (
                                // STATE B: Chat Interface
                                <>
                                    <div className={styles.messagesContainer}>
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`${styles.messageRow} ${msg.sender === 'user' ? styles.userRow : styles.botRow}`}
                                            >
                                                {msg.sender === 'bot' && (
                                                    <div className={styles.cubeContainer} style={{ width: 20, height: 20 }}>
                                                        <WireframeCube size={20} />
                                                    </div>
                                                )}
                                                <div
                                                    className={`${styles.messageBubble} ${msg.sender === 'user' ? styles.userBubble : styles.botBubble}`}
                                                >
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className={`${styles.messageRow} ${styles.botRow}`}>
                                                <div className={styles.cubeContainer} style={{ width: 20, height: 20 }}>
                                                    <WireframeCube size={20} />
                                                </div>
                                                <div className={`${styles.messageBubble} ${styles.botBubble}`}>
                                                    <span className="animate-pulse">...</span>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    <form onSubmit={handleSendMessage} className={styles.inputArea}>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="Mesajınızı yazın..."
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="submit"
                                            className={styles.sendButton}
                                            disabled={isLoading || !inputValue.trim()}
                                        >
                                            <Send size={18} />
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={styles.fab}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variants={fabVariants}
                animate={isOpen ? 'open' : (isHovered ? 'hover' : 'idle')}
                aria-label="Chatbot"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
}
