import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MessageCircle } from 'lucide-react';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: 'Nera Clean | VIP Bireysel & Kurumsal Temizlik Çözümleri',
    description: "İstanbul'un öncü VIP temizlik şirketi. Profesyonel kadromuzla VIP eşyalı ev temizliği, malikane hijyeni, inşaat sonrası kusursuz temizlik ve plaza/ofis temizlik çözümleri sunuyoruz. 7/24 kesintisiz hizmet.",
    keywords: 'nera clean, temizlik, ev temizliği, rezidans temizliği, villa temizliği, malikane temizliği, inşaat sonrası temizlik, ofis temizliği, plaza temizliği, koltuk yıkama, istanbul temizlik firması',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body>
                {/* Persistent Scrolled Glassmorphic Header */}
                <Header />
                
                {/* Main Dynamic Multi-Page Router View */}
                <main style={{ minHeight: '80vh', paddingTop: '0px' }}>
                    {children}
                </main>
                
                {/* Persistent Royal Navy Corporate Footer */}
                <Footer />
                
                {/* Persistent Floating Glowing WhatsApp Widget */}
                <div className="whatsapp-widget">
                    <a 
                        href="https://wa.me/905427811029?text=Merhaba%20Nera%20Clean%2C%20bireysel%2Fkurumsal%20temizlik%20hizmetleriniz%20hakk%C4%B1nda%20ke%C5%9Fif%20ve%20teklif%20almak%20istiyorum." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="whatsapp-btn-circle" 
                        aria-label="WhatsApp Destek Hattı"
                    >
                        <MessageCircle size={28} />
                    </a>
                </div>
            </body>
        </html>
    );
}
