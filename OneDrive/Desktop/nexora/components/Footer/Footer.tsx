'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pb-10 relative overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
      {/* Decorative subtle glow */}
      <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-nexora/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2">
            <img 
              src="/images/logo.png" 
              alt="Nexora Logo" 
              className="h-8 w-auto object-contain mb-4"
            />
            <p className="text-nexora-light font-bold mb-4 tracking-wide">
              Geleceğin Tarımı, Bugün.
            </p>
            <p className="text-slate-400 leading-relaxed max-w-md">
              İleri teknoloji iklimlendirme ve sulama otomasyon sistemlerimizle tarımsal verimliliği en üst duyeye çıkarıyor, anahtar teslim mühendislik çözümleri sunuyoruz.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Hızlı Linkler</h4>
            <ul className="space-y-4">
              {['Ana Sayfa', 'Sistem Özellikleri', 'Nasıl Çalışıyoruz?', 'Kontrol Paneli'].map((item, idx) => {
                const links = ['#home', '#ozellikler', '#surec', '#panel'];
                return (
                  <li key={idx}>
                    <a href={links[idx]} className="text-slate-400 hover:text-nexora transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-400">
                <span>📞</span>
                <a 
                  href="tel:+905555579902" 
                  className="hover:text-nexora transition-colors duration-300"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'click_phone', { phone_number: '+905555579902' });
                    }
                  }}
                >
                  +90 555 557 99 02
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <span>📸</span>
                <a
                  href="https://instagram.com/nexora_otomasyon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-nexora transition-colors duration-300"
                >
                  @nexora_otomasyon
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Nexora Akıllı Tarım Teknolojileri. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Gizlilik Politikası</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Kullanım Şartları</a>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              Made by{' '}
              <a 
                href="https://www.grovemediacreative.com.tr/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300"
              >
                Grove
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
