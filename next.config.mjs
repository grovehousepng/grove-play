/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Apache uyumluluğu için trailing slash (SEO: false to consolidate non-slash URLs)
  trailingSlash: false,
  // Production'da source map kapatma
  productionBrowserSourceMaps: false,
  // Bundle optimizasyonu
  compress: true,
  poweredByHeader: false,
  // Daha hızlı derleme ve küçük bundle
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Static asset uzun süreli cache
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*\.(?:ico|png|jpg|jpeg|svg|woff2?))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default nextConfig;
