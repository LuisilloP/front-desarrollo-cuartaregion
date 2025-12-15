export type SiteSettings = {
  siteName: string;
  tagline: string;
  region: string;
  whatsappNumber: string;
  primaryCTA: string;
  secondaryCTA: string;
  socialLinks: { label: string; url: string }[];
  footerText: string;
};

export type Service = {
  slug: string;
  name: string;
  description: string;
  idealFor: string;
  priceCLP: number;
  features: string[];
  isFeatured?: boolean;
  order?: number;
  category: "web" | "maintenance" | "digital";
};

export type CaseStudy = {
  slug: string;
  clientName: string;
  industry: string;
  summary: string;
  results: string;
  image?: string;
  url?: string;
  order?: number;
};

export type Review = {
  clientName: string;
  business: string;
  rating: number;
  quote: string;
  avatar?: string;
  order?: number;
};

export type Faq = {
  question: string;
  answer: string;
  order?: number;
};

export type LegalPage = {
  slug: string;
  title: string;
  content: string;
};

export const mockSiteSettings: SiteSettings = {
  siteName: "Norte Digital",
  tagline: "Diseñamos y automatizamos tu presencia online con resultados medibles.",
  region: "Región de Coquimbo",
  whatsappNumber: "+56912345678",
  primaryCTA: "Cotizar por WhatsApp",
  secondaryCTA: "Ver planes",
  socialLinks: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "LinkedIn", url: "https://linkedin.com" }
  ],
  footerText: "Creamos sitios que venden, con soporte local y respuestas rápidas."
};

export const mockServices: Service[] = [
  {
    slug: "landing-conversion-local",
    name: "Landing conversión local",
    description: "Sitio de una sola página optimizado para captar contactos con storytelling y pruebas sociales.",
    idealFor: "Campañas relámpago y negocios que recién digitalizan.",
    priceCLP: 210000,
    features: ["Entrega en 5-7 días", "Copywriting orientado a venta", "Integración CRM o WhatsApp", "SEO on-page local"],
    isFeatured: true,
    order: 1,
    category: "web"
  },
  {
    slug: "web-con-reservas",
    name: "Web + Reservas inteligentes",
    description: "Sitio multi sección con agenda, pagos y dashboard para tu equipo.",
    idealFor: "Clínicas, barberías, estudios creativos o coworks.",
    priceCLP: 350000,
    features: ["Calendario con recordatorios", "Pasarela de pago opcional", "Panel en Strapi para editar contenido", "Soporte prioritario"],
    order: 2,
    category: "web"
  },
  {
    slug: "mantencion-gamer-pro",
    name: "Mantención Pro Equipos Gamer",
    description: "Limpieza profunda, cambio de pasta térmica, cable management y stress test de componentes.",
    idealFor: "Gamers, streamers y oficinas con PCs de alto rendimiento.",
    priceCLP: 95000,
    features: ["Limpieza física antiestática", "Curva de ventiladores optimizada", "Reporte de temperaturas antes/después", "Retiro y entrega opcional"],
    order: 3,
    category: "maintenance"
  },
  {
    slug: "mantencion-empresarial",
    name: "Mantención TI empresas",
    description: "Plan mensual para computadores de tu equipo: limpieza, actualizaciones críticas y respaldo.",
    idealFor: "Pymes que quieren prevenir caídas de servicio.",
    priceCLP: 130000,
    features: ["On-site o remoto por ticket", "Checklist de seguridad y parches", "Inventario de hardware/software", "Soporte WhatsApp dedicado"],
    order: 4,
    category: "maintenance"
  },
  {
    slug: "presencia-digital-seo",
    name: "Presencia digital + SEO local",
    description: "Arquitectura de contenidos, SEO técnico y Google Business Profile optimizado.",
    idealFor: "Negocios que quieren aparecer primeros en búsquedas locales.",
    priceCLP: 180000,
    features: ["Investigación de palabras clave", "Plan editorial Strapi", "Optimización velocidad Astro", "Automatizaciones reportes"],
    order: 5,
    category: "digital"
  },
  {
    slug: "gestion-redes-automatizada",
    name: "Redes sociales + automatización",
    description: "Calendario creativo, piezas de alto impacto y bots que responden leads mientras duermes.",
    idealFor: "Marcas que quieren coherencia visual y respuesta inmediata.",
    priceCLP: 240000,
    features: ["Diseños responsivos (Reels, stories, banners)", "Biblioteca de prompts/guiones", "Automatización WhatsApp FAQ", "Reporte de métricas clave"],
    order: 6,
    category: "digital"
  }
];

export const mockCases: CaseStudy[] = [
  {
    slug: "cafe-litoral",
    clientName: "Café Litoral",
    industry: "Gastronomía",
    summary: "Nueva carta y reservas online.",
    results: "Reservas +38% en 6 semanas",
    image: "/images/case-cafe.jpg",
    url: "https://ejemplo-cafe.cl",
    order: 1
  },
  {
    slug: "clinica-norte",
    clientName: "Clínica Norte",
    industry: "Salud",
    summary: "Landing con agenda y WhatsApp derivado a recepción.",
    results: "Tasa de respuesta 2x en horarios peak",
    image: "/images/case-clinica.jpg",
    order: 2
  },
  {
    slug: "turismo-pisco",
    clientName: "Turismo Pisco",
    industry: "Turismo",
    summary: "Automatización de preguntas frecuentes y reservas.",
    results: "Menos 60% de tiempo atendiendo inbox",
    image: "/images/case-turismo.jpg",
    order: 3
  }
];

export const mockReviews: Review[] = [
  {
    clientName: "Paula Martínez",
    business: "Cafetería Litoral",
    rating: 5,
    quote: "Lanzamos en una semana y ya vemos más reservas. Responden rápido y con ideas claras.",
    order: 1
  },
  {
    clientName: "Dr. Rodrigo Pino",
    business: "Clínica Norte",
    rating: 5,
    quote: "La automatización de WhatsApp nos liberó al equipo y no perdemos pacientes en horario peak.",
    order: 2
  },
  {
    clientName: "María José Vega",
    business: "Agencia de Turismo Pisco",
    rating: 4,
    quote: "El sitio carga rápido y podemos editar contenido en Strapi sin pedir soporte.",
    order: 3
  }
];

export const mockFaqs: Faq[] = [
  {
    question: "¿Cuánto demoramos en lanzar?",
    answer: "Para landings simples lanzamos en 5-7 días hábiles. Proyectos con reservas o automatizaciones avanzadas van entre 2 y 3 semanas.",
    order: 1
  },
  {
    question: "¿Incluyen hosting y dominio?",
    answer: "Podemos hostear y administrar por ti. Si ya tienes dominio, lo conectamos. Si no, lo gestionamos con tu RUT.",
    order: 2
  },
  {
    question: "¿Puedo editar el contenido?",
    answer: "Sí. Strapi permite editar textos, precios, preguntas frecuentes y casos sin tocar código.",
    order: 3
  },
  {
    question: "¿Ofrecen soporte local?",
    answer: "Soporte en horario laboral Chile (9:00 a 19:00) por WhatsApp o correo, con SLA 24h hábiles.",
    order: 4
  }
];

export const mockLegalPages: Record<string, LegalPage> = {
  privacidad: {
    slug: "privacidad",
    title: "Política de Privacidad",
    content:
      "Tu información se usa solo para responder a tus consultas y prestar el servicio. No vendemos tus datos. Puedes solicitar la eliminación escribiendo a contacto@nortedigital.cl."
  },
  terminos: {
    slug: "terminos",
    title: "Términos y Condiciones",
    content:
      "Los servicios se cotizan en CLP y se pagan 50% al inicio y 50% contra entrega. Hosting administrado se factura de forma mensual. Ajustes y mejoras posteriores se cotizan aparte."
  }
};
