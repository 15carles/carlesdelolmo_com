import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/entity';

export const metadata = constructMetadata({
  title: 'Política de Cookies | Carles del Olmo',
  description: 'Información sobre el uso de cookies en carlesdelolmo.com: qué tipos se utilizan, con qué finalidad, cómo gestionar el consentimiento y cómo desactivarlas.',
  exactUrl: `${SITE_URL}/politica-cookies`,
});

export default function PoliticaCookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
