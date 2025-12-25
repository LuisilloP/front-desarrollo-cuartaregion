import type { CaseStudy, Faq, LegalPage, Post, Review, Service, SiteSettings } from "../lib/api/types";

export type { CaseStudy, Faq, LegalPage, Post, Review, Service, SiteSettings };

export const mockSiteSettings: SiteSettings = {
  siteName: "Norte Digital",
  tagline: "Diseñamos y automatizamos tu presencia online con resultados medibles.",
  region: "Región de Santiago de Chile",
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
    type: "web",
    title: "Landing conversion local",
    for_who: "Campanas relampago y negocios que recien digitalizan.",
    what_it_solves: "Sitio de una sola pagina optimizado para captar contactos con storytelling y pruebas sociales.",
    benefits: ["Copywriting orientado a venta", "Integracion CRM o WhatsApp"],
    deliverables: ["SEO on-page local"],
    delivery_time: "5-7 dias habiles",
    price: "$210.000 CLP",
    ctaType: "form",
    guarantee: "Precio depende de alcance.",
    top_banner: "Mas vendido",
    order: 1,
    featured: true
  },
  {
    slug: "web-con-reservas",
    type: "web",
    title: "Web + Reservas inteligentes",
    for_who: "Clinicas, barberias, estudios creativos o coworks.",
    what_it_solves: "Sitio multi seccion con agenda, pagos y dashboard para tu equipo.",
    benefits: ["Calendario con recordatorios", "Pasarela de pago opcional"],
    deliverables: ["Panel en Strapi para editar contenido", "Soporte prioritario"],
    delivery_time: "2-3 semanas",
    price: "$350.000 CLP",
    ctaType: "whatsapp",
    guarantee: "Precio depende de alcance.",
    order: 2,
    featured: false
  },
  {
    slug: "mantencion-gamer-pro",
    type: "maintenance",
    title: "Mantencion Pro Equipos Gamer",
    for_who: "Gamers, streamers y oficinas con PCs de alto rendimiento.",
    what_it_solves: "Limpieza profunda, cambio de pasta termica, cable management y stress test de componentes.",
    benefits: ["Limpieza fisica antiestatica", "Curva de ventiladores optimizada"],
    deliverables: ["Reporte de temperaturas antes/despues", "Retiro y entrega opcional"],
    delivery_time: "2-3 dias habiles",
    price: "$95.000 CLP",
    ctaType: "whatsapp",
    guarantee: "Precio depende de alcance.",
    order: 3,
    featured: false
  },
  {
    slug: "mantencion-empresarial",
    type: "maintenance",
    title: "Mantencion TI empresas",
    for_who: "Pymes que quieren prevenir caidas de servicio.",
    what_it_solves: "Plan mensual para computadores de tu equipo: limpieza, actualizaciones criticas y respaldo.",
    benefits: ["On-site o remoto por ticket", "Checklist de seguridad y parches"],
    deliverables: ["Inventario de hardware/software", "Soporte WhatsApp dedicado"],
    delivery_time: "Plan mensual",
    price: "$130.000 CLP",
    ctaType: "whatsapp",
    guarantee: "Precio depende de alcance.",
    order: 4,
    featured: false
  },
  {
    slug: "presencia-digital-seo",
    type: "digital",
    title: "Presencia digital + SEO local",
    for_who: "Negocios que quieren aparecer primeros en busquedas locales.",
    what_it_solves: "Arquitectura de contenidos, SEO tecnico y Google Business Profile optimizado.",
    benefits: ["Investigacion de palabras clave", "Plan editorial Strapi"],
    deliverables: ["Optimizacion velocidad Astro", "Automatizaciones reportes"],
    delivery_time: "2 semanas",
    price: "$180.000 CLP",
    ctaType: "whatsapp",
    guarantee: "Precio depende de alcance.",
    order: 5,
    featured: false
  },
  {
    slug: "gestion-redes-automatizada",
    type: "digital",
    title: "Redes sociales + automatizacion",
    for_who: "Marcas que quieren coherencia visual y respuesta inmediata.",
    what_it_solves: "Calendario creativo, piezas de alto impacto y bots que responden leads mientras duermes.",
    benefits: ["Disenos responsivos (Reels, stories, banners)", "Biblioteca de prompts/guiones"],
    deliverables: ["Automatizacion WhatsApp FAQ", "Reporte de metricas clave"],
    delivery_time: "Plan mensual",
    price: "$240.000 CLP",
    ctaType: "whatsapp",
    guarantee: "Precio depende de alcance.",
    order: 6,
    featured: false
  }
];

export const mockCases: CaseStudy[] = [
  {
    slug: "inventario-reportes",
    clientName: "Angel Calameno",
    title: "Sistema ERP de inventario + reportes",
    industry: "Restaurante",
    city: "Ovalle",
    summary: "Control de stock con movimientos trazables y reportes semanales automaticos.",
    coverImage: "/images/case-inventario.jpg",
    beforeTitle: "Antes",
    afterTitle: "Despues",
    beforePoints: [
      { text: "Inventario en planillas desactualizadas", tone: "danger" },
      { text: "Reportes manuales semanales", tone: "danger" }
    ],
    afterPoints: [
      { text: "Sistema de inventario con stock actual", tone: "success" },
      { text: "Reportes automaticos listos para revision", tone: "success" }
    ],
    impactTags: [
      { text: "Stock actualizado", variant: "blue" },
      { text: "Trazabilidad de movimientos", variant: "green" }
    ],
    ctaPrimaryType: "contact",
    ctaPrimaryLabel: "Quiero un inventario asi",
    siteUrl: "https://ejemplo-inventario.cl",
    order: 1,
    featured: true
  },
  {
    slug: "clinica-norte",
    clientName: "Clinica Norte",
    title: "Agenda online y WhatsApp asistido",
    industry: "Salud",
    city: "Santiago",
    summary: "Landing con agenda y derivacion directa a recepcion.",
    coverImage: "/images/case-clinica.jpg",
    beforeTitle: "Antes",
    afterTitle: "Despues",
    beforePoints: [
      { text: "Llamadas perdidas en horarios peak", tone: "danger" },
      { text: "Agenda manual sin recordatorios", tone: "warning" }
    ],
    afterPoints: [
      { text: "Agenda automatizada con recordatorios", tone: "success" },
      { text: "Derivacion inmediata por WhatsApp", tone: "success" }
    ],
    impactTags: [
      { text: "Tasa de respuesta 2x", variant: "blue" },
      { text: "Menos ausencias", variant: "green" }
    ],
    ctaPrimaryType: "contact",
    ctaPrimaryLabel: "Quiero mi agenda asi",
    siteUrl: "https://ejemplo-clinica.cl",
    order: 2
  },
  {
    slug: "turismo-pisco",
    clientName: "Turismo Pisco",
    industry: "Turismo",
    city: "La Serena",
    summary: "Automatizacion de preguntas frecuentes y reservas.",
    coverImage: "/images/case-turismo.jpg",
    beforeTitle: "Antes",
    afterTitle: "Despues",
    beforePoints: [
      { text: "Consultas repetidas en redes sociales", tone: "danger" },
      { text: "Reservas sin confirmacion automatica", tone: "warning" }
    ],
    afterPoints: [
      { text: "Respuestas automaticas con FAQ", tone: "success" },
      { text: "Reservas confirmadas por WhatsApp", tone: "success" }
    ],
    impactTags: [
      { text: "Menos tiempo en inbox", variant: "blue" },
      { text: "Reservas mas rapidas", variant: "green" }
    ],
    ctaPrimaryType: "contact",
    ctaPrimaryLabel: "Quiero automatizar",
    siteUrl: "https://ejemplo-turismo.cl",
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

export const mockPosts: Post[] = [
  {
    slug: "post",
    title: "prueba",
    excerpt: "prueba2",
    content: "ola",
    createdAt: "2025-12-18T19:58:55.652Z",
    updatedAt: "2025-12-18T19:58:55.652Z",
    publishedAt: "2025-12-18T19:58:55.676Z"
  }
];


