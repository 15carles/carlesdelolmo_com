export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  date: string;
  photoUrl?: string;
}

export interface GoogleBusinessData {
  businessName: string;
  averageRating: number;
  totalReviews: number;
  googleMapsUrl: string;
  reviews: GoogleReview[];
}

export const googleReviewsData: GoogleBusinessData = {
  businessName: "Carles del Olmo | Diseño web en Valencia",
  averageRating: 5.0,
  totalReviews: 3,
  googleMapsUrl: "https://share.google/GcWgyY3CyJAbvJZ8w",
  reviews: [
    {
      author: "Juan J. Peris",
      rating: 5,
      text: "Totalmente recomendable\nCarles ha llevado nuestra web a otro nivel. No solo es un diseño rápido y limpio, sino que su estrategia de SEO + GEO nos ha posicionado donde realmente importa hoy: en las respuestas de las IAs.\nExcelente profesional, directo y con un mantenimiento proactivo que te permite despreocuparte de todo",
      date: "2026-04-23",
      photoUrl: "/assets/images/reviews/juan-peris.png" // <-- Ejemplo: guarda la imagen en public/assets/images/reviews/
    },
    {
      author: "LED escaparate",
      rating: 5,
      text: "Implementar este ecosistema digital ha sido un paso fundamental para nuestra operativa. La combinación de web, automatizaciones y estrategia SEO nos aporta la solidez necesaria para crecer, logrando una presencia real en Google y en las consultas de las IAs de forma natural y eficaz. Es un servicio profesional y honesto que se centra en aportar soluciones útiles sin complicaciones innecesarias. Nos ha permitido organizar toda nuestra infraestructura digital con total confianza y una visión de futuro muy clara.",
      date: "2026-04-23",
      photoUrl: "/assets/images/reviews/led-escaparate.png"
    },
    {
      author: "Paula Martinez",
      rating: 5,
      text: "Carles ha desarrollado una web a medida excelente. El rendimiento es fantástico y el diseño resulta muy profesional.\nTrabajo de forma muy eficiente. La plataforma funciona perfectamente y aporta mucho valor a nuestro negocio. Es un placer colaborar con él.",
      date: "2026-04-23",
      photoUrl: "/assets/images/reviews/paula-martinez.png"
    }
  ]
};
