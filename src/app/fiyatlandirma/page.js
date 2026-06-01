import ServicePackages from '../../components/ServicePackages';

export const metadata = {
    title: 'Fiyatlandırma | Grove Media Creative',
    description: 'Grove Media Creative web sitesi ve e-ticaret paketleri fiyatlandırma sayfası.',
    alternates: {
        canonical: 'https://grovemediacreative.com.tr/fiyatlandirma',
    },
};

export default function FiyatlandirmaPage() {
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <div style={{ paddingTop: '100px' }}>
                <h1 className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: '0' }}>Web Sitesi ve E-Ticaret Paketleri — Fiyatlandırma</h1>
                <ServicePackages />
            </div>
        </div>
    );
}
