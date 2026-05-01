export const SITE_URL = 'https://carlesdelolmo.com';

export const ENTITY = {
  name: 'Carles del Olmo',
  businessLabel: 'Carles del Olmo | Diseño web en Valencia',
  websiteUrl: SITE_URL,
  email: 'hola@carlesdelolmo.com',
  phoneE164: '+34668676302',
  phoneDisplay: '+34 668 676 302',
  whatsappUrl: 'https://wa.me/34668676302',
  location: {
    locality: 'Benetússer',
    region: 'Valencia',
    postalCode: '46910',
    countryCode: 'ES',
    display: 'Benetússer, Valencia, España',
  },
  serviceArea: {
    primary: 'Valencia',
    secondary: 'España, remoto',
  },
  profiles: {
    googleBusinessProfile:
      'https://www.google.com/maps/place/Carles+del+Olmo+%7C+Dise%C3%B1o+web+en+Valencia/@39.4340488,-0.4339949,13z/data=!4m10!1m2!2m1!1sCarles+del+Olmo+%7C+Dise%C3%B1o+web+en+Valencia!3m6!1s0xa60a79fb26b6c1ef:0x779207be2c9a40f!8m2!3d39.4444242!4d-0.4229488!15sCilDYXJsZXMgZGVsIE9sbW8gfCBEaXNlw7FvIHdlYiBlbiBWYWxlbmNpYVopIidjYXJsZXMgZGVsIG9sbW8gZGlzZcOxbyB3ZWIgZW4gdmFsZW5jaWGSARB3ZWJzaXRlX2Rlc2lnbmVy4AEA!16s%2Fg%2F11z5nks2v_',
    linkedin: 'https://www.linkedin.com/in/delolmocarles/',
    github: 'https://github.com/15carles',
    x: 'https://x.com/15carles',
  },
} as const;

export const BUSINESS_SAME_AS = [
  ENTITY.profiles.googleBusinessProfile,
  ENTITY.profiles.linkedin,
  ENTITY.profiles.github,
  ENTITY.websiteUrl,
] as const;

export const PERSON_SAME_AS = [
  ENTITY.profiles.linkedin,
  ENTITY.profiles.github,
  ENTITY.profiles.x,
] as const;
