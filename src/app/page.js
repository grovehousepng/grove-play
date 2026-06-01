import { Suspense } from 'react';
import styles from "./page.module.css";
import Hero from "../components/Hero";
import { getGeneralSettings } from "../lib/wordpress";
import dynamic from 'next/dynamic';

// Ağır bileşenler tembel yüklenir — hero anında görünür
const About = dynamic(() => import('../components/About'), {
  loading: () => <div style={{ minHeight: 200 }} />,
});
const Contact = dynamic(() => import('../components/Contact'), {
  loading: () => <div style={{ minHeight: 200 }} />,
});

const ReferencesSlider = dynamic(() => import('../components/ReferencesSlider'), {
  ssr: true, // We can let it SSR or use loading. Better to SSR if possible.
  loading: () => <div style={{ minHeight: 200 }} />,
});
const WaveTransition = dynamic(() => import('../components/WaveTransition'));

// Basit placeholder — yükleme esnasında görünür
const SectionSkeleton = () => (
  <div style={{ minHeight: 200, background: '#f9f9f9', borderRadius: 8, margin: '24px 0' }} />
);

export default async function Home() {
  // Static export'ta WP bilgisi sabittir, force-cache ile waterfall eğimi kapat
  let settings = null;
  try {
    settings = await getGeneralSettings();
  } catch {}

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Hero SSR ile anlık render olur */}
        <Hero title={settings?.title} description={settings?.description} />

        <Suspense fallback={<SectionSkeleton />}>
          <ReferencesSlider />
        </Suspense>

        {/* Alttaki bölümler progressive yüklenir */}
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={null}>
          <WaveTransition color="#0A0A0A" position="top" />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

