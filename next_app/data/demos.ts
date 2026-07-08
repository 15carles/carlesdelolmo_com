export interface DemoData {
  title: string;
  description: string;
  demoUrl: string;
  image: string;
  imageAlt: string;
  badges: { text: string; color: string }[];
}

// Las demos se muestran intercaladas en un único grid: son de estilos de
// diseño distintos, así que el orden está pensado para que no queden juntas
// dos del mismo estilo.
export const DEMOS: DemoData[] = [
  {
    title: 'Flowdesk',
    description:
      'Plataforma de gestión de flujos de trabajo con interfaz moderna y optimizada para conversión. Explora la experiencia de usuario completa.',
    demoUrl: 'https://demo1.carlesdelolmo.com',
    image: '/assets/demos/demo-flowdesk.webp',
    imageAlt: 'Captura de pantalla de la demo Flowdesk',
    badges: [
      { text: 'Diseño Web', color: 'badge--purple' },
      { text: 'UX', color: 'badge--teal' },
    ],
  },
  {
    title: 'Esilo Neumorfismo',
    description:
      'Estudio ficticio de diseño digital con estética neumórfica: interfaces suaves, táctiles y memorables. Un ejemplo de cómo un estilo visual muy marcado puede seguir siendo usable y orientado a conversión.',
    demoUrl: 'https://demo5.carlesdelolmo.com',
    image: '/assets/demos/demo-esilo.webp',
    imageAlt: 'Captura de pantalla de la demo Esilo Neumorfismo',
    badges: [
      { text: 'Diseño Web', color: 'badge--purple' },
      { text: 'Neumorfismo', color: 'badge--teal' },
    ],
  },
  {
    title: 'LocalExpert Gestoría',
    description:
      'Web de captación para gestoría local con enfoque en SEO local y automatización de leads. Diseñada para generar confianza y conversiones.',
    demoUrl: 'https://demo2.carlesdelolmo.com',
    image: '/assets/demos/demo-localexpert.webp',
    imageAlt: 'Captura de pantalla de la demo LocalExpert Gestoría',
    badges: [
      { text: 'SEO Local', color: 'badge--teal' },
      { text: 'Captación', color: 'badge--blue' },
    ],
  },
  {
    title: 'Kinetiq Labs',
    description:
      'Web para negocios locales centrada en velocidad y acción: vender, reservar y responder sin perder oportunidades. Estilo brutalista con tipografía monoespaciada y una retícula muy marcada.',
    demoUrl: 'https://demo3.carlesdelolmo.com',
    image: '/assets/demos/demo-kinetiq.webp',
    imageAlt: 'Captura de pantalla de la demo Kinetiq Labs',
    badges: [
      { text: 'Negocios locales', color: 'badge--blue' },
      { text: 'Velocidad', color: 'badge--teal' },
    ],
  },
  {
    title: 'Martillo Marketing',
    description:
      'Agencia de marketing ficticia con identidad neobrutalista: color saturado, contraste alto y collage. Un ejemplo de branding con carácter que prioriza el impacto y la diferenciación.',
    demoUrl: 'https://demo4.carlesdelolmo.com',
    image: '/assets/demos/demo-martillo.webp',
    imageAlt: 'Captura de pantalla de la demo Martillo Marketing',
    badges: [
      { text: 'Marketing', color: 'badge--purple' },
      { text: 'Branding', color: 'badge--cyan' },
    ],
  },
];
