import Hero from '@/components/Hero';
import QueResuelvoSection from '@/components/QueResuelvoSection';
import ServicesSection from '@/components/ServicesSection';
import CasoDestacadoSection from '@/components/CasoDestacadoSection';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import MetodoOrbitaSection from '@/components/MetodoOrbitaSection';
import PorQueConmigoSection from '@/components/PorQueConmigoSection';
import InsightsSection from '@/components/InsightsSection';
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
      <QueResuelvoSection />
      <ServicesSection />
      <CasoDestacadoSection />
      <GoogleReviewsSection sectionId="opiniones" />
      <MetodoOrbitaSection />
      <PorQueConmigoSection />
      <InsightsSection />
      <ContactSection />
    </>
  );
}
