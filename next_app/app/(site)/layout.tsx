import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ScrollReveal from "@/components/ScrollReveal";
import ContextualLeadBanner from "@/components/ContextualLeadBanner";
import PromoBanner from "@/components/PromoBanner";
import { PWARegister } from "@/components/PWARegister";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Diseño web estratégico | Carles del Olmo - SEO y GEO",
  description: "Diseño web estratégico para empresas que quieren una web clara, rápida y preparada para posicionar en buscadores y en IA.",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
};

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
        {/* Script inline para añadir body.has-promo-banner antes del primer
            paint y evitar el salto de layout cuando el banner aparece tras la
            hidratación. Mantener sincronizado con PROMO_ACTIVE y HIDDEN_PATHS
            de components/PromoBanner.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var PROMO_ACTIVE = true;
                  var HIDDEN = ['/auditoria-gratuita', '/gracias'];
                  if (PROMO_ACTIVE && HIDDEN.indexOf(window.location.pathname) === -1) {
                    document.body.classList.add('has-promo-banner');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Providers>
          <PWARegister />
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
