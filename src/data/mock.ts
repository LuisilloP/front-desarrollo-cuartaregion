import type { CaseStudy, Faq, LegalPage, Post, Review, Service, SiteSettings } from "../lib/api/types";

export type { CaseStudy, Faq, LegalPage, Post, Review, Service, SiteSettings };

export const mockSiteSettings: SiteSettings = {
  siteName: "Nortech Digital",
  tagline: "Sitios y automatizaciones con performance medible.",
  region: "Santiago, Chile",
  whatsappNumber: "+56987654321",
  primaryCTA: "Agenda una llamada",
  secondaryCTA: "Ver servicios",
  socialLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/company/novatech-digital" },
    { label: "Instagram", url: "https://www.instagram.com/novatechdigital" }
  ],
  footerText: "Estrategia, diseno y tecnologia para negocios que quieren crecer."
};

export const mockServices: Service[] = [
  {
    slug: "landing-conversion",
    type: "web",
    title: "Landing de conversion",
    for_who: "Equipos de marketing y founders que necesitan resultados rapidos.",
    what_it_solves: "Pagina enfocada en captar leads con narrativa clara, pruebas sociales y analytics listos.",
    benefits: ["Copy orientado a decision", "Integracion inmediata a CRM o WhatsApp"],
    deliverables: ["SEO on-page", "Dashboard de rendimiento"],
    delivery_time: "5-7 dias habiles",
    price: "Desde $220.000 CLP",
    ctaType: "form",
    guarantee: "Ajustes incluidos tras el primer ciclo de feedback.",
    top_banner: "Mas solicitado",
    order: 1,
    featured: true
  },
  {
    slug: "web-reservas-pagos",
    type: "web",
    title: "Web con reservas y pagos",
    for_who: "Clinicas, gimnasios, coworks y servicios profesionales.",
    what_it_solves: "Sitio multi seccion con agenda, recordatorios, pagos y panel simple para tu equipo.",
    benefits: ["Agenda con recordatorios", "Pasarela de pago opcional"],
    deliverables: ["Panel para editar contenido", "Soporte prioritario"],
    delivery_time: "2-3 semanas",
    price: "Desde $380.000 CLP",
    ctaType: "whatsapp",
    guarantee: "Incluye capacitacion breve del panel.",
    order: 2,
    featured: false
  },
  {
    slug: "automatizacion-whatsapp-crm",
    type: "digital",
    title: "Automatizacion WhatsApp + CRM",
    for_who: "Equipos comerciales que quieren responder 24/7 y ordenar el pipeline.",
    what_it_solves: "Bots con preguntas frecuentes, derivacion a agentes y sincronizacion con tu CRM.",
    benefits: ["Flujos sin codigo", "Alertas y reportes por canal"],
    deliverables: ["Playbook de mensajes", "Dashboard de conversion"],
    delivery_time: "10-14 dias",
    price: "Desde $260.000 CLP",
    ctaType: "whatsapp",
    guarantee: "Iteracion incluida en el primer mes.",
    order: 3,
    featured: false
  },
  {
    slug: "mantencion-ti-monitoreo",
    type: "maintenance",
    title: "Mantencion TI y monitoreo",
    for_who: "Pymes con equipos criticos que no pueden parar.",
    what_it_solves: "Plan mensual con limpieza, parches, respaldos y monitoreo de incidentes.",
    benefits: ["Soporte local con SLA", "Checklist de seguridad y parches"],
    deliverables: ["Inventario y reportes mensuales", "Backups verificados"],
    delivery_time: "Plan mensual",
    price: "Planes desde $160.000 CLP",
    ctaType: "whatsapp",
    guarantee: "Mesa de ayuda con respuesta en 24h habiles.",
    order: 4,
    featured: false
  }
];

export const mockCases: CaseStudy[] = [
  {
    slug: "agenda-medica-digital",
    clientName: "Clinica Andes",
    title: "Agenda medica con pagos en linea",
    industry: "Salud",
    city: "Santiago",
    summary: "Turnos con recordatorios automatizados y pago previo para reducir ausencias.",
    coverImage: "/images/case-clinica.jpg",
    beforeTitle: "Antes",
    afterTitle: "Despues",
    beforePoints: [
      { text: "Llamadas perdidas en horarios punta", tone: "danger" },
      { text: "Cobros manuales sin trazabilidad", tone: "warning" }
    ],
    afterPoints: [
      { text: "Reserva y pago en linea con recordatorios", tone: "success" },
      { text: "Reportes listos para finanzas y recepcion", tone: "success" }
    ],
    impactTags: [
      { text: "No show -35%", variant: "green" },
      { text: "Tickets cerrados 2x mas rapido", variant: "blue" }
    ],
    ctaPrimaryType: "contact",
    ctaPrimaryLabel: "Quiero una agenda similar",
    siteUrl: "https://ejemplo-clinica.com",
    order: 1,
    featured: true
  },
  {
    slug: "b2b-inventario",
    clientName: "Andes Supply",
    title: "Portal B2B con inventario y status",
    industry: "Logistica",
    city: "Concepcion",
    summary: "Catalogo privado con stock en linea y aviso automatico de despacho.",
    coverImage: "/images/case-inventario.jpg",
    beforeTitle: "Antes",
    afterTitle: "Despues",
    beforePoints: [
      { text: "Pedidos por correo sin seguimiento", tone: "danger" },
      { text: "Stock desalineado con ventas", tone: "warning" }
    ],
    afterPoints: [
      { text: "Stock en tiempo real para clientes B2B", tone: "success" },
      { text: "Alertas y tracking unificados", tone: "success" }
    ],
    impactTags: [
      { text: "Reclamos -40%", variant: "green" },
      { text: "Pedidos mas rapidos", variant: "blue" }
    ],
    ctaPrimaryType: "contact",
    ctaPrimaryLabel: "Necesito un portal B2B",
    siteUrl: "https://ejemplo-b2b.com",
    order: 2
  },
  {
    slug: "turismo-experiencias",
    clientName: "Ruta del Valle",
    industry: "Turismo",
    city: "La Serena",
    summary: "Reservas y bots de respuesta para tours premium.",
    coverImage: "/images/case-turismo.jpg",
    beforeTitle: "Antes",
    afterTitle: "Despues",
    beforePoints: [
      { text: "Consultas repetidas por redes", tone: "danger" },
      { text: "Confirmaciones manuales", tone: "warning" }
    ],
    afterPoints: [
      { text: "Bots con preguntas frecuentes y derivacion a agente", tone: "success" },
      { text: "Reservas confirmadas con pago anticipado", tone: "success" }
    ],
    impactTags: [
      { text: "Menos tiempo en inbox", variant: "blue" },
      { text: "Up-sell en checkout", variant: "green" }
    ],
    ctaPrimaryType: "contact",
    ctaPrimaryLabel: "Quiero automatizar reservas",
    siteUrl: "https://ejemplo-tours.com",
    order: 3
  }
];

export const mockReviews: Review[] = [
  {
    clientName: "Paula Martinez",
    business: "Cafeteria Litoral",
    rating: 5,
    quote: "El sitio y las automatizaciones nos bajaron el tiempo de respuesta y aumentaron reservas el mismo mes.",
    order: 1
  },
  {
    clientName: "Rodrigo Pino",
    business: "Clinica Andes",
    rating: 5,
    quote: "No perdemos pacientes en horarios peak y el equipo tiene visibilidad del pipeline.",
    order: 2
  },
  {
    clientName: "Maria Jose Vega",
    business: "Ruta del Valle",
    rating: 4,
    quote: "Podemos editar ofertas sin soporte y los bots responden mientras el equipo guia tours.",
    order: 3
  }
];

export const mockFaqs: Faq[] = [
  {
    question: "Cuanto demoramos en lanzar?",
    answer: "Landings en 5-7 dias habiles. Proyectos con reservas o bots avanzados entre 2 y 3 semanas.",
    order: 1
  },
  {
    question: "Incluyen hosting y dominio?",
    answer: "Podemos administrarlos. Conectamos tu dominio o te ayudamos a gestionarlo a tu nombre.",
    order: 2
  },
  {
    question: "Puedo editar el contenido?",
    answer: "Si. Dejamos un panel para textos, precios, FAQ y casos sin tocar codigo.",
    order: 3
  },
  {
    question: "Ofrecen soporte local?",
    answer: "Soporte en horario laboral Chile (09:00 a 19:00) por WhatsApp o correo, con SLA de 24h habiles.",
    order: 4
  }
];

export const mockLegalPages: Record<string, LegalPage> = {
  privacidad: {
    slug: "privacidad",
    title: "Politica de Privacidad",
    content:
      "Usamos tu informacion para responder solicitudes y prestar el servicio. No vendemos datos. Puedes pedir eliminacion escribiendo a contacto@novatechdigital.com."
  },
  terminos: {
    slug: "terminos",
    title: "Terminos y Condiciones",
    content:
      "Las propuestas se cotizan en CLP. Se paga 50% al inicio y 50% contra entrega. Hosting administrado se factura mes a mes. Ajustes fuera de alcance se cotizan aparte."
  }
};

export const mockPosts: Post[] = [
  {
    slug: "performance-landing",
    title: "Checklist para lanzar una landing que convierta",
    excerpt: "Los pasos clave para salir a produccion con performance y medicion desde el dia uno.",
    content:
      "Define una oferta clara, prueba el copy con clientes, implementa analytics y mapas de calor, y prepara variantes para test A/B.",
    createdAt: "2025-01-10T00:00:00.000Z",
    updatedAt: "2025-01-10T00:00:00.000Z",
    publishedAt: "2025-01-10T00:00:00.000Z"
  },
  {
    slug: "automatizar-whatsapp",
    title: "Como automatizar WhatsApp sin perder el tono humano",
    excerpt: "Flujos que resuelven rapido y saben cuando escalar a un agente.",
    content:
      "Define mensajes de bienvenida, FAQs y derivaciones. Usa horarios para respuestas diferidas y mide el tiempo a primer contacto humano.",
    createdAt: "2025-01-12T00:00:00.000Z",
    updatedAt: "2025-01-12T00:00:00.000Z",
    publishedAt: "2025-01-12T00:00:00.000Z"
  }
];

