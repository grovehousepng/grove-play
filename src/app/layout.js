import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GtmTracker from "../components/GtmTracker";
import Script from 'next/script';
import ClientWidgets from "../components/ClientWidgets";
// Configure Bebas Neue (Display font for headings)
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

// Configure Inter (Body font - clean and professional)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NR46KMC2');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${bebas.variable} ${inter.variable}`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NR46KMC2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <GtmTracker />
        {/* ... existing components ... */}
        <ClientWidgets />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}



export const metadata = {
  title: "Grove Media Creative | Reklam Altyapısı & Dönüşüm Takibi",
  description: "Markanız için özel reklam altyapısı ve stratejileri. Dönüşüm odaklı dijital pazarlama çözümleri ile büyümenizi hızlandırın.",
  alternates: {
    canonical: "https://grovemediacreative.com.tr",
  },
  openGraph: {
    title: "Grove Media Creative | Veriye Dayalı Reklam Çözümleri",
    description: "Reklam altyapınızı profesyonelce yönetin. Google Ads, Meta Ads ve özel analiz hizmetlerimizle tanışın.",
    url: "https://grovemediacreative.com.tr", // Replace with actual URL if known, or keep generic
    siteName: "Grove Media Creative",
    images: [
      {
        url: "/logo.png", // Assuming logo.png is good for OG
        width: 800,
        height: 600,
        alt: "Grove Media Creative Logo",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  verification: {
    google: "dhBnxCYsJKpr4UmtpElYZcy8RPYnA6wGPPHfxpEDk0Q",
    other: {
      "facebook-domain-verification": "1oq7xh8bkrtk8pg2mudc9ucvjjo2wr",
    },
  },
};

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://grovemediacreative.com.tr/#organization",
      "name": "Grove Media Creative",
      "url": "https://grovemediacreative.com.tr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://grovemediacreative.com.tr/logo.png"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Turkey"
      },
      "sameAs": [
        "https://www.instagram.com/grovemediacreative",
        "https://www.linkedin.com/in/y%C3%BCcel-g%C3%BCzel-787794273/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://grovemediacreative.com.tr/#website",
      "url": "https://grovemediacreative.com.tr",
      "name": "Grove Media Creative",
      "publisher": { "@id": "https://grovemediacreative.com.tr/#organization" }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://grovemediacreative.com.tr/#service",
      "name": "Grove Media Creative",
      "image": "https://grovemediacreative.com.tr/logo.png",
      "priceRange": "$$",
      "areaServed": {
        "@type": "Country",
        "name": "Turkey"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Merkez",
        "addressLocality": "Konya",
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.8714,
        "longitude": 32.4846
      },
      "telephone": "+905416834410",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "knowsAbout": [
        "Headless E-commerce",
        "Next.js Architecture",
        "Server-Side GTM",
        "BigQuery Data Analytics",
        "Meta CAPI Implementation",
        "Web Analytics & Conversion Tracking",
        "3D Modeling & WebGL"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://grovemediacreative.com.tr/#founder",
      "name": "Yücel Güzel",
      "jobTitle": "Founder & Technical SEO Architect",
      "sameAs": [
        "https://www.linkedin.com/in/y%C3%BCcel-g%C3%BCzel-787794273/"
      ],
      "worksFor": { "@id": "https://grovemediacreative.com.tr/#organization" }
    }
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Reklam altyapısı nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reklam altyapısı, Google Ads ve Meta Ads gibi platformlarda reklam yayınlanması ve dönüşüm takibinin doğru yapılması için kurulan teknik sistemdir."
      }
    },
    {
      "@type": "Question",
      "name": "Server-Side Tracking ne işe yarar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Server-Side Tracking (SGTM), tarayıcı kısıtlamalarını ve ad-blocker veri kaybını önleyerek %100 doğrulukta veri ölçümü sağlar."
      }
    }
  ]
};


