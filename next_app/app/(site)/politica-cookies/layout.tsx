import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | Carles del Olmo',
  description: 'Información sobre el uso de cookies en carlesdelolmo.com: qué tipos se utilizan, con qué finalidad, cómo gestionar el consentimiento y cómo desactivarlas.'
};

export default function PoliticaCookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
