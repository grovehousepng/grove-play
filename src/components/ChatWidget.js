'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatWidget({ isOpen, onClose }) {
    // const [isOpen, setIsOpen] = useState(false); // REMOVED: Now controlled by props
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [errors, setErrors] = useState({}); // New error state
    const [messageText, setMessageText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    const chatHistoryRef = useRef(null);
    const messageInputRef = useRef(null);

    const API_ENDPOINT = 'https://bot.grovemediacreative.com.tr/api/chat';
    const LOCAL_STORAGE_KEY = 'grove_media_user';
    const LOCAL_STORAGE_HISTORY_KEY = 'grove_media_chat_history';

    // Initialization
    useEffect(() => {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        const storedHistory = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);

        if (storedUser) {
            setUserData(JSON.parse(storedUser));
            setIsHistoryOpen(true);
        }

        if (storedHistory) {
            setMessages(JSON.parse(storedHistory));
        }
    }, []);

    // Auto-scroll logic
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages, isTyping, isThinking, isOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && isHistoryOpen) {
            setTimeout(() => messageInputRef.current?.focus(), 300);
        }
    }, [isOpen, isHistoryOpen]);

    const validateForm = () => {
        const newErrors = {};

        // Name Validation: At least two words, min 3 chars each
        const nameParts = inputName.trim().split(/\s+/);
        if (nameParts.length < 2) {
            newErrors.name = 'Lütfen Ad ve Soyad giriniz.';
        } else if (inputName.length < 5) {
            newErrors.name = 'Ad Soyad çok kısa.';
        }

        // Phone Validation: Must start with 5 and be 10 digits
        const phoneClean = inputPhone.replace(/[^0-9]/g, '');
        if (phoneClean.length !== 10) {
            newErrors.phone = 'Telefon numarası 10 haneli olmalıdır (Başında 0 olmadan).';
        } else if (!phoneClean.startsWith('5')) {
            newErrors.phone = 'Numaranız 5 ile başlamalıdır.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleStartAnalysis = () => {
        if (!validateForm()) return;

        // sGTM Push
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];

            // Extract full name
            const fullName = inputName.trim();
            const nameParts = fullName.split(/\s+/);
            // Basic formatting for phone
            const formattedPhoneNum = '90' + inputPhone.replace(/^0/, '');

            window.dataLayer.push({
                event: 'generate_lead',
                user_data: {
                    user_email: "", // Not collected in chat
                    user_phone: formattedPhoneNum || "",
                    user_first_name: nameParts[0] || "",
                    user_last_name: nameParts.slice(1).join(' ') || "",
                    full_name: fullName
                },
                source: 'grove_chat_widget'
            });
        }

        // Format Phone: Ensure it starts with 90
        let formattedPhone = inputPhone.replace(/[^0-9]/g, '');

        // Remove leading 90 if user typed it (e.g. 905xx -> 5xx) to standardized 
        if (formattedPhone.startsWith('90')) {
            formattedPhone = formattedPhone.substring(2);
        }
        // Remove leading 0 if present (e.g., 05xx -> 5xx)
        if (formattedPhone.startsWith('0')) {
            formattedPhone = formattedPhone.substring(1);
        }
        // Prepend 90
        formattedPhone = '90' + formattedPhone;

        const newUserData = { name: inputName, phone: formattedPhone };
        setUserData(newUserData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUserData));
        setIsHistoryOpen(true);

        // Initial Bot Message
        if (messages.length === 0) {
            const firstName = inputName.split(' ')[0];
            const initialMsg = {
                text: `Merhaba ${firstName}, ben Grove Media Strateji Mimarı. Projenizden bahsedin, analiz edelim.`,
                type: 'bot'
            };
            saveMessage(initialMsg);
        }
    };

    const handleReset = (e) => {
        e.preventDefault(); // Prevent any default behavior
        e.stopPropagation();

        if (confirm('Sohbet geçmişi silinsin mi?')) { // Add confirmation to be sure
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            localStorage.removeItem(LOCAL_STORAGE_HISTORY_KEY);
            window.location.reload();
        }
    };

    const saveMessage = (msg) => {
        setMessages((prev) => {
            const newMessages = [...prev, msg];
            localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(newMessages));
            return newMessages;
        });
    };

    const handleSendMessage = async () => {
        if (!messageText.trim()) return;

        if (!userData) {
            alert("Lütfen önce bilgilerinizi giriniz.");
            setIsHistoryOpen(false);
            return;
        }

        const userMsg = { text: messageText, type: 'user' };
        saveMessage(userMsg);
        setMessageText('');

        // Push generic chat interaction on subsequent messages
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ 'event': 'chat_interaction' });
        }

        // Start Thinking
        setIsThinking(true);

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.text,
                    userName: userData.name,
                    userPhone: userData.phone
                })
            });

            const data = await response.json();

            // Stop Thinking, Start Typing (Simulated human delay)
            setIsThinking(false);
            setIsTyping(true);

            setTimeout(() => {
                setIsTyping(false);
                const botMsg = { text: data.text, type: 'bot' };
                saveMessage(botMsg);
            }, 1500); // 1.5s typing delay

        } catch (error) {
            console.error("API Hatası:", error);
            setIsThinking(false);
            const errorMsg = {
                text: `Bağlantı hatası: ${error.message}.<br><br><a href="https://wa.me/905416834410" target="_blank" style="display:inline-block; background-color:#25D366; color:white; padding:10px 20px; border-radius:24px; text-decoration:none; font-weight:bold; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.4);">WhatsApp ile Ulaşın</a>`,
                type: 'bot'
            };
            saveMessage(errorMsg);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div className={`fixed bottom-[130px] right-6 z-[9990] font-sans text-left pointer-events-none transition-all duration-300 ${isOpen ? 'z-[9999]' : ''}`}>
            {/* Note: pointer-events-none on container to let clicks pass through when closed.
           Position adjusted to act as anchor for the window, although window is absolute bottom-0 relative to this container. 
           Wait, if container is fixed bottom-130, the window will be fixed relative to that?
           Yes. The window uses absolute bottom-0 right-0.
           If we want the window to be at the bottom right of the screen (not relative to button), we should make the container simple.
           Used to be bottom-40 right-6. 
           If the button is now in FloatingCTA (which is at bottom-right), we want the window to appear probably ABOVE the buttons?
           Or aside? FloatingCTA is usually bottom-right.
           Let's keep the window fixed position logic but maybe adjust values.
           Actually, let's keep it robust: fixed positioned relative to viewport.
       */}

            {/* Mobile Backdrop for closing (Click outside) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-transparent z-[9998] md:hidden cursor-pointer pointer-events-auto"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Chat Window - Mobile: Margins & Rounded | Desktop: Fixed Right */}
            <div className={`fixed bottom-4 left-4 right-4 h-[80vh] md:w-[340px] md:h-[450px] md:bottom-[210px] md:right-8 md:left-auto bg-white/95 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-300 border border-white/60 flex flex-col pointer-events-auto origin-bottom-right z-[9999] ${isOpen ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible translate-y-8 scale-90'}`}>
                {/* Liquid Background Layer */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/40 via-white to-white animate-slow-spin"></div>
                </div>

                {/* Header */}
                <div className="p-4 px-6 bg-white/60 backdrop-blur-md border-b border-neutral-100 flex justify-between items-center z-50">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isThinking || isTyping ? 'bg-indigo-500 animate-pulse' : 'bg-green-500 animate-pulse-slow'}`}></div>
                        <h2 className="m-0 text-sm font-semibold text-neutral-800 tracking-wide">Grove AI Canlı Destek</h2>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={handleReset}
                            title="Sohbeti Sıfırla"
                            className="bg-none border-none cursor-pointer text-neutral-400 opacity-70 hover:opacity-100 transition-opacity p-2 hover:bg-neutral-100 rounded-full"
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                            </svg>
                        </button>
                        <button
                            onClick={onClose}
                            title="Kapat"
                            className="bg-none border-none cursor-pointer text-neutral-800 opacity-80 hover:opacity-100 transition-opacity p-2 hover:bg-red-50 hover:text-red-500 rounded-full"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Lead Form Screen */}
                <div className={`h-full w-full absolute top-0 left-0 transition-all duration-400 flex flex-col justify-center p-8 pt-0 box-border z-20 ${!isHistoryOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none invisible'}`}>
                    <div className="w-16 h-16 bg-neutral-50 rounded-2xl mb-6 flex items-center justify-center shadow-sm mx-auto">
                        <svg className="w-8 h-8 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    </div>
                    <h1 className="text-neutral-900 text-xl font-semibold mb-2 text-center">Merhaba! 👋</h1>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-8 text-center">
                        Size özel yapay zeka asistanımızla projenizi analiz etmek için lütfen bilgilerinizi girin.
                    </p>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={inputName}
                            onChange={(e) => {
                                setInputName(e.target.value);
                                if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                            }}
                            className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-neutral-200'} text-neutral-800 p-3.5 text-sm rounded-xl outline-none transition-all focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 placeholder:text-neutral-400 shadow-sm`}
                            placeholder="Adınız Soyadınız"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                    </div>
                    <div className="mb-6">
                        <div className={`relative flex items-center bg-white border ${errors.phone ? 'border-red-500' : 'border-neutral-200'} rounded-xl overflow-hidden focus-within:border-neutral-400 focus-within:ring-4 focus-within:ring-neutral-100 transition-all shadow-sm`}>
                            <div className="bg-neutral-50 px-3 py-3.5 border-r border-neutral-200 text-neutral-500 text-sm flex items-center gap-2 select-none">
                                <span>🇹🇷</span>
                                <span className="font-medium text-neutral-700">+90</span>
                            </div>
                            <input
                                type="tel"
                                value={inputPhone}
                                onChange={(e) => {
                                    // Allow only numbers
                                    const val = e.target.value.replace(/[^0-9]/g, '');
                                    // Limit to 10 chars
                                    if (val.length <= 10) {
                                        setInputPhone(val);
                                        if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                                    }
                                }}
                                className="w-full bg-white text-neutral-800 p-3.5 text-sm outline-none placeholder:text-neutral-400"
                                placeholder="5XX XXX XX XX"
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                    </div>
                    <button
                        onClick={handleStartAnalysis}
                        className="w-full bg-black text-white border-none p-3.5 text-sm font-medium rounded-xl cursor-pointer transition-all hover:bg-neutral-800 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                    >
                        Analize Başla
                    </button>
                </div>

                {/* Chat Interface Screen */}
                <div className={`h-full w-full absolute top-0 left-0 bg-transparent transition-all duration-400 flex flex-col pt-[60px] box-border z-20 ${isHistoryOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none hidden'}`}>
                    <div ref={chatHistoryRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 scroll-smooth">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`max-w-[85%] p-3 px-4 rounded-[18px] text-[13px] leading-relaxed relative shadow-md animate-slideUp break-words ${msg.type === 'user'
                                    ? 'bg-black text-white rounded-br-[4px] self-end font-medium'
                                    : 'bg-white text-neutral-800 rounded-bl-[4px] self-start border border-neutral-100'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: msg.text }}
                            />
                        ))}

                        {/* AI Thinking Animation */}
                        {isThinking && (
                            <div className="flex items-center gap-2 p-3 px-4 bg-white/50 backdrop-blur-sm rounded-[18px] rounded-bl-[4px] self-start border border-neutral-100 mb-2 animate-fadeIn shadow-sm">
                                <div className="w-4 h-4 animate-spin rounded-full border-2 border-neutral-300 border-t-black"></div>
                                <span className="text-xs text-neutral-500 font-medium">Analiz ediliyor...</span>
                            </div>
                        )}

                        {/* AI Typing Animation */}
                        {isTyping && (
                            <div className="flex gap-1 p-3 px-4 bg-white rounded-[18px] rounded-bl-[4px] self-start border border-neutral-100 mb-2.5 animate-fadeIn shadow-sm">
                                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-[-0.32s]"></div>
                                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-[-0.16s]"></div>
                                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"></div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-white/80 backdrop-blur-md border-t border-neutral-100 flex gap-2">
                        <input
                            ref={messageInputRef}
                            type="text"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Mesajınızı yazın..."
                            className="flex-1 bg-white border border-neutral-200 text-neutral-800 p-2.5 px-4 rounded-full text-[13px] outline-none transition-all focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 shadow-sm"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-black hover:bg-neutral-800 text-white border-none cursor-pointer w-10 h-10 flex items-center justify-center rounded-full transition-all shadow-md transform hover:scale-105 active:scale-95"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>


        </div>
    );
}
