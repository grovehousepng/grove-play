import styles from './page.module.css';

export const metadata = {
    title: 'Gizlilik Politikası | Grove Media Creative',
    description: 'Grove Media Creative gizlilik politikası ve kişisel verilerin korunması hakkında bilgilendirme.',
    alternates: {
        canonical: 'https://grovemediacreative.com.tr/gizlilik-politikasi',
    },
};

export default function PrivacyPolicyPage() {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Gizlilik Politikası</h1>
            <div className={styles.content}>
                <p>Son güncellenme tarihi: {new Date().toLocaleDateString('tr-TR')}</p>

                <h2>1. Taraflar ve Amaç</h2>
                <p>
                    Bu Gizlilik Politikası, Grove Media Creative ("Biz", "Şirket" veya "Ajans") tarafından yönetilen web sitesi ve hizmetleri kullanan ziyaretçilerin ve müşterilerin ("Kullanıcı") kişisel verilerinin toplanması, kullanımı ve korunması süreçlerini açıklamaktadır.
                </p>

                <h2>2. Toplanan Veriler</h2>
                <p>Hizmetlerimizi kullandığınızda aşağıdaki verileri toplayabiliriz:</p>
                <ul>
                    <li>İletişim Bilgileri (Ad, Soyad, E-posta adresi, Telefon numarası vb.)</li>
                    <li>IP adresi, tarayıcı türü, ziyaret süresi gibi analitik kullanım verileri</li>
                    <li>İletişim formları veya chatbot aracılığıyla sağladığınız diğer bilgiler</li>
                </ul>

                <h2>3. Verilerin Kullanım Amaçları</h2>
                <p>Topladığımız kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:</p>
                <ul>
                    <li>Talep ettiğiniz hizmetleri sağlamak ve sürdürmek</li>
                    <li>Sorularınızı yanıtlamak ve müşteri desteği sunmak</li>
                    <li>Web sitemizin performansını ve kullanıcı deneyimini iyileştirmek</li>
                    <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                </ul>

                <h2>4. Verilerin Paylaşımı</h2>
                <p>
                    Kişisel verilerinizi üçüncü şahıslara satmıyoruz veya kiralamıyoruz. Ancak, yasal zorunluluklar gerektirdiğinde veya hizmetlerimizi güvenli bir şekilde sunabilmek adına güvendiğimiz (hosting, analitik sağlayıcılar vb.) iş ortaklarımızla gizlilik sözleşmeleri kapsamında paylaşabiliriz.
                </p>

                <h2>5. Veri Güvenliği</h2>
                <p>
                    Kişisel verilerinizin güvenliğini sağlamak için endüstri standartlarında teknik ve idari tedbirler almaktayız. Ancak, internet üzerinden veri iletiminin %100 güvenli olmadığını unutmayınız.
                </p>

                <h2>6. Kullanıcı Hakları</h2>
                <p>
                    Kullanıcılar olarak kişisel verilerinizle ilgili bilgi alma, düzeltme, silme (unutulma hakkı) ve işlenmesine itiraz etme haklarına sahipsiniz. Bu haklarınızı kullanmak için iletişim bilgilerimiz üzerinden bizimle irtibata geçebilirsiniz.
                </p>

                <h2>7. İletişim</h2>
                <p>
                    Gizlilik politikamız ile ilgili soru ve talepleriniz için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz:
                </p>
                <ul>
                    <li>E-posta: yucel.guzel42@gmail.com</li>
                    <li>Telefon: +90 541 683 44 10</li>
                </ul>
            </div>
        </main>
    );
}
