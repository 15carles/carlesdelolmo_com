import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ScrollReveal from "@/components/ScrollReveal";
import ContextualLeadBanner from "@/components/ContextualLeadBanner";
import { PWARegister } from "@/components/PWARegister";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Carles del Olmo | Diseño web, SEO y visibilidad en IA (GEO)",
  description: "Diseño web estratégico para empresas: webs claras y rápidas para captar clientes en Google y preparadas para que las IAs (ChatGPT, Gemini) entiendan y citen tu marca.",
});

export const viewport: Viewport = {
  themeColor: "#FDFCFA",
  colorScheme: "light",
};

// Fuentes variables auto-alojadas (woff2 subset latin, ~97 KB total)
const fraunces = localFont({
  src: "../../public/fonts/fraunces-latin-var.woff2",
  display: "swap",
  variable: "--font-fraunces",
  weight: "100 900",
  style: "normal",
});

const instrumentSans = localFont({
  src: "../../public/fonts/instrument-sans-latin-var.woff2",
  display: "swap",
  variable: "--font-instrument",
  weight: "400 700",
  style: "normal",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${instrumentSans.variable}`}>
      <head>
        {/* Google Consent Mode v2 (Initial State) */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            window.dataLayer.push({
              'event': 'default_consent'
            });
            // Aplica el consentimiento ya guardado antes de que cargue gtag.js. Sin
            // esto, el "update" solo se emite tras la hidratación de React, que puede
            // superar el wait_for_update (500 ms) y hacer que el primer page_view de
            // un visitante recurrente se mida como denegado.
            try {
              var stored = localStorage.getItem('cookie_consent_settings');
              if (stored) {
                var consent = JSON.parse(stored);
                var maxAge = 1000 * 60 * 60 * 24 * 365 * 2;
                var age = Date.now() - new Date(consent.timestamp).getTime();
                if (consent && consent.analytics_storage === 'granted' && age >= 0 && age <= maxAge) {
                  gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                    'ad_storage': consent.ad_storage === 'granted' ? 'granted' : 'denied',
                    'ad_user_data': consent.ad_user_data === 'granted' ? 'granted' : 'denied',
                    'ad_personalization': consent.ad_personalization === 'granted' ? 'granted' : 'denied'
                  });
                }
              }
            } catch (e) {}
          `}
        </Script>
        {/* Google Analytics 4 */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-196PEE2941" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-196PEE2941');
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <PWARegister />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <ContextualLeadBanner />
          <ScrollReveal />
        </Providers>
      </body>
    </html>
  );
}
