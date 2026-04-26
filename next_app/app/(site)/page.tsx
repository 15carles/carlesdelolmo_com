import Hero from '@/components/Hero';
import CredibilidadSection from '@/components/CredibilidadSection';
import QueResuelvoSection from '@/components/QueResuelvoSection';
import ServicesSection from '@/components/ServicesSection';
import CasoDestacadoSection from '@/components/CasoDestacadoSection';
import MetodoOrbitaSection from '@/components/MetodoOrbitaSection';
import DiferenciadoresSection from '@/components/DiferenciadoresSection';
import InsightsSection from '@/components/InsightsSection';
import ParaQuienSection from '@/components/ParaQuienSection';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import CtaFinalSection from '@/components/CtaFinalSection';
import ContactSection from '@/components/ContactSection';
import { generateHomeSchema } from '@/lib/seo/schemas';
import { safeJsonLd } from '@/lib/seo/jsonLd';

export default function Home() {
  const jsonLd = generateHomeSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <Hero />
      <CredibilidadSection />
      <QueResuelvoSection />
      <ServicesSection />
      <CasoDestacadoSection />
      <MetodoOrbitaSection />
      <DiferenciadoresSection />
      <InsightsSection />
      <ParaQuienSection />
      <GoogleReviewsSection />
      <CtaFinalSection />
      <ContactSection />
    </>
  );
}
