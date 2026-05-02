export interface ContextualLeadBannerConfig {
  contextKey: string;
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  enabled: boolean;
  enableExitIntent?: boolean;
}

export const CONTEXTUAL_LEAD_BANNER_STORAGE_KEYS = {
  shown: 'cdo:contextual-lead-banner:shown',
  dismissed: 'cdo:contextual-lead-banner:dismissed',
  ctaInteracted: 'cdo:contextual-lead-banner:cta-interacted',
  formInteracted: 'cdo:contextual-lead-banner:form-interacted',
} as const;

export const CONTEXTUAL_LEAD_BANNER_TRIGGER_RULES = {
  timeMs: 45_000,
  scrollPercent: 55,
} as const;

const CONTEXTUAL_LEAD_BANNER_ROUTE_CONFIG: Record<string, ContextualLeadBannerConfig> = {
  '/diseno-web': {
    contextKey: 'diseno-web',
    title: '¿No tienes claro si necesitas una web nueva?',
    description:
      'Cuéntame tu caso y te orientaré sobre si conviene crear una nueva web, replantear la actual o mejorar su base con criterio.',
    ctaLabel: 'Solicitar valoración',
    ctaHref: '/contacto',
    enabled: true,
    enableExitIntent: false,
  },
  '/diseno-web/valencia': {
    contextKey: 'diseno-web-valencia',
    eyebrow: 'AYUDA CONTEXTUAL',
    title: '¿No tienes claro si necesitas una web nueva?',
    description:
      'Cuéntame tu caso y te orientaré sobre si conviene crear una nueva web, mejorar la actual o replantear su base.',
    ctaLabel: 'Solicitar valoración',
    ctaHref: '/contacto',
    enabled: true,
    enableExitIntent: false,
  },
  '/diseno-web/castellon': {
    contextKey: 'diseno-web-castellon',
    eyebrow: 'AYUDA CONTEXTUAL',
    title: '¿No tienes claro si necesitas una web nueva?',
    description:
      'Cuéntame tu caso y te orientaré sobre si conviene crear una nueva web, mejorar la actual o replantear su base.',
    ctaLabel: 'Solicitar valoración',
    ctaHref: '/contacto',
    enabled: true,
    enableExitIntent: false,
  },
  '/diseno-web/alicante': {
    contextKey: 'diseno-web-alicante',
    eyebrow: 'AYUDA CONTEXTUAL',
    title: '¿No tienes claro si necesitas una web nueva?',
    description:
      'Cuéntame tu caso y te orientaré sobre si conviene crear una nueva web, mejorar la actual o replantear su base.',
    ctaLabel: 'Solicitar valoración',
    ctaHref: '/contacto',
    enabled: true,
    enableExitIntent: false,
  },
  '/mantenimiento-web-valencia': {
    contextKey: 'mantenimiento-web-valencia',
    eyebrow: 'AYUDA CONTEXTUAL',
    title: '¿Tu web necesita mantenimiento o algo más?',
    description:
      'Cuéntame tu caso y te orientaré sobre si encaja un mantenimiento recurrente o si conviene plantear otra intervención.',
    ctaLabel: 'Solicitar revisión',
    ctaHref: '/contacto',
    enabled: true,
    enableExitIntent: false,
  },
  '/migraciones-web': {
    contextKey: 'migraciones-web',
    eyebrow: 'AYUDA CONTEXTUAL',
    title: '¿Vas a cambiar tu web y no quieres romper lo que ya funciona?',
    description:
      'Cuéntame tu caso y te orientaré sobre cómo plantear la migración con menos riesgo para visibilidad, estructura y captación.',
    ctaLabel: 'Solicitar valoración',
    ctaHref: '/contacto',
    enabled: true,
    enableExitIntent: false,
  },
  '/desarrollo-web-a-medida': {
    contextKey: 'desarrollo-web-a-medida',
    eyebrow: 'AYUDA CONTEXTUAL',
    title: '¿No tienes claro si necesitas desarrollo a medida?',
    description:
      'Cuéntame tu caso y te orientaré sobre si conviene una solución a medida o una base más sencilla antes de escalar.',
    ctaLabel: 'Solicitar valoración',
    ctaHref: '/contacto',
    enabled: true,
    enableExitIntent: false,
  },
  '/servicio-seo/auditoria-seo-geo': {
    contextKey: 'auditoria-seo-geo',
    eyebrow: 'AYUDA CONTEXTUAL',
    title: '¿No tienes claro qué está frenando tu visibilidad?',
    description:
      'Cuéntame tu caso y te orientaré sobre si conviene hacer una auditoría o si necesitas otro tipo de intervención.',
    ctaLabel: 'Solicitar revisión',
    ctaHref: '/contacto',
    enabled: true,
    enableExitIntent: false,
  },
  '/servicio-seo/posicionamiento-seo-geo': {
    contextKey: 'posicionamiento-seo-geo',
    eyebrow: 'AYUDA CONTEXTUAL',
    title: '¿No tienes claro si este servicio encaja con tu caso?',
    description:
      'Cuéntame tu situación y te orientaré sobre si conviene trabajar el posicionamiento o si necesitas otro enfoque antes.',
    ctaLabel: 'Solicitar valoración',
    ctaHref: '/contacto',
    enabled: true,
    enableExitIntent: false,
  },
  '/servicio-seo/autoridad-digital-ias': {
    contextKey: 'autoridad-digital-ias',
    eyebrow: 'AYUDA CONTEXTUAL',
    title: '¿No tienes claro si este servicio aplica a tu negocio?',
    description:
      'Cuéntame tu caso y te orientaré sobre si tiene sentido trabajar tu autoridad digital para entornos de IA o si conviene otro enfoque antes.',
    ctaLabel: 'Solicitar valoración',
    ctaHref: '/contacto',
    enabled: true,
    enableExitIntent: false,
  },
  '/automatizaciones': {
    contextKey: 'automatizaciones',
    eyebrow: 'AYUDA CONTEXTUAL',
    title: '¿No tienes claro si conviene automatizar?',
    description:
      'Cuéntame tu caso y te orientaré sobre si merece la pena automatizar parte del proceso o si antes conviene resolver otra base.',
    ctaLabel: 'Solicitar valoración',
    ctaHref: '/contacto',
    enabled: false,
    enableExitIntent: false,
  },
};

function normalizePathname(pathname: string): string {
  if (!pathname) {
    return '/';
  }

  if (pathname === '/') {
    return pathname;
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function getContextualLeadBannerConfig(pathname: string): ContextualLeadBannerConfig | null {
  const normalizedPathname = normalizePathname(pathname);
  return CONTEXTUAL_LEAD_BANNER_ROUTE_CONFIG[normalizedPathname] ?? null;
}
