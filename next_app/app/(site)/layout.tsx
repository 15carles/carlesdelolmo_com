import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ScrollReveal from "@/components/ScrollReveal";
import ContextualLeadBanner from "@/components/ContextualLeadBanner";
import PromoBanner from "@/components/PromoBanner";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Diseño web estratégico | Carles del Olmo - SEO y GEO",
  description: "Diseño web estratégico para empresas que quieren una web clara, rápida y preparada para posicionar en buscadores y en IA.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
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
          `}
        </Script>
        {/* Google Analytics 4 */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-196PEE2941" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-196PEE2941', { 'anonymize_ip': true });
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <PromoBanner />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <ContextualLeadBanner />
          <ScrollReveal />
        </Providers>

        {/* Script inline para evitar parpadeo blanco (FOUC) en el modo oscuro.
            Validamos el valor leído de localStorage para no inyectar un string
            arbitrario como atributo data-theme (defensa en profundidad). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = (saved === 'light' || saved === 'dark') ? saved : 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
