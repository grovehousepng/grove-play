import InfoFlame from '@/components/InfoFlame/InfoFlame';

export default function AboutPage() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <InfoFlame game={null} />
        </div>
    );
}
