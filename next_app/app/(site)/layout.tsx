import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Diseño web en Valencia | Carles del Olmo - SEO y GEO",
  description: "Especialista en Generative Engine Optimization. Ayudo a empresas a destacar en la era de las IAs y buscadores inteligentes.",
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
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <ScrollReveal />
        </Providers>

        {/* Script inline para evitar parpadeo blanco (FOUC) en el modo oscuro */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', savedTheme);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
