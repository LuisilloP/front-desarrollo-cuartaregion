import type { CaseStudy, Faq, LegalPage, Post, Review, Service, SiteSettings } from "../lib/api/types";

export type { CaseStudy, Faq, LegalPage, Post, Review, Service, SiteSettings };

export const mockSiteSettings: SiteSettings = {
  siteName: "Nortech Digital",
  tagline: "Webs y automatizaciones con impacto medible en ventas.",
  region: "Region de Coquimbo",
  whatsappNumber: "+56987654321",
  primaryCTA: "Cotizar por WhatsApp",
  secondaryCTA: "Ver soluciones",
  socialLinks: [
    { name: "LinkedIn", url: "https://www.linkedin.com/company/nortech-digital", icon: "simple-icons:linkedin" },
    { name: "Instagram", url: "https://www.instagram.com/nortechdigital", icon: "simple-icons:instagram" }
  ],
  footerText: "Estrategia, diseno y tecnologia para negocios que buscan crecer con datos."
};

export const mockServices: Service[] = [
  {
    slug: "landing-conversion",
    type: "web",
    title: "Landing de conversion inmediata",
    for_who: "Equipos de marketing y founders que necesitan leads rapido.",
    what_it_solves: "Pagina enfocada en captar oportunidades con narrativa clara, prueba social y medicion desde el dia uno.",
    benefits: ["Copy orientado a decision", "Integracion con CRM o WhatsApp"],
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
    title: "Web con reservas y pagos online",
    for_who: "Clinicas, gimnasios, turismo y servicios profesionales.",
    what_it_solves: "Sitio multipagina con agenda, recordatorios, pagos y panel simple para tu equipo.",
    benefits: ["Agenda con recordatorios", "Pagos y confirmaciones automaticas"],
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
    for_who: "Equipos comerciales que necesitan respuesta 24/7 y pipeline ordenado.",
    what_it_solves: "Bots con preguntas frecuentes, derivacion a agentes y sincronizacion con tu CRM.",
    benefits: ["Flujos sin codigo", "Alertas y reportes por canal"],
    deliverables: ["Playbook de mensajes", "Dashboard de conversion"],
    delivery_time: "10-14 dias",
    price: "Desde $260.000 CLP",
    ctaType: "whatsapp",
    guarantee: "Iteracion incluida durante el primer mes.",
    order: 3,
    featured: false
  },
  {
    slug: "mantencion-ti-monitoreo",
    type: "maintenance",
    title: "Mantencion TI y monitoreo proactivo",
    for_who: "Pymes con equipos criticos que no pueden detenerse.",
    what_it_solves: "Plan mensual con limpieza, parches, respaldos y monitoreo preventivo.",
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
    title: "Agenda medica con pagos online",
    industry: "Salud",
    city: "La Serena",
    summary: "Agenda online con recordatorios y pago previo para reducir ausencias.",
    coverImage: "/images/case-clinica.jpg",
    beforeTitle: "Antes",
    afterTitle: "Despues",
    beforePoints: [
      { text: "Llamadas perdidas en horarios punta", tone: "danger" },
      { text: "Cobros manuales sin trazabilidad", tone: "warning" }
    ],
    afterPoints: [
      { text: "Reserva y pago online con recordatorios", tone: "success" },
      { text: "Reportes listos para finanzas y recepcion", tone: "success" }
    ],
    impactTags: [
      { text: "No show -35%", variant: "green" },
      { text: "Turnos confirmados +40%", variant: "blue" }
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
    title: "Portal B2B con inventario en tiempo real",
    industry: "Logistica",
    city: "Coquimbo",
    summary: "Catalogo privado con stock online y avisos automaticos de despacho.",
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
      { text: "Pedidos 2x mas rapidos", variant: "blue" }
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
    city: "Vicuna",
    summary: "Reservas con pago anticipado y bots que responden 24/7.",
    coverImage: "/images/case-turismo.jpg",
    beforeTitle: "Antes",
    afterTitle: "Despues",
    beforePoints: [
      { text: "Consultas repetidas en temporada alta", tone: "danger" },
      { text: "Confirmaciones manuales", tone: "warning" }
    ],
    afterPoints: [
      { text: "Bots con FAQs y derivacion a agente", tone: "success" },
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
    quote: "El sitio y las automatizaciones bajaron el tiempo de respuesta y subieron las reservas en el primer mes.",
    order: 1
  },
  {
    clientName: "Rodrigo Pino",
    business: "Clinica Andes",
    rating: 5,
    quote: "Hoy no perdemos pacientes en horarios peak y el equipo tiene visibilidad del pipeline.",
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
    question: "Cuanto tarda cada tipo de proyecto?",
    answer:
      "Landings de conversion salen en 5-7 dias habiles. Sitios con reservas o pasarela en 2-3 semanas. Automatizaciones en 10-14 dias. Mantencion TI se activa la misma semana.",
    order: 1
  },
  {
    question: "Como aseguramos que convierta?",
    answer:
      "Partimos con la oferta y los mensajes clave, sumamos pruebas sociales, formularios claros y medicion desde el dia uno. Incluimos una ronda de ajustes con datos reales.",
    order: 2
  },
  {
    question: "Se integra con mi CRM, agenda o pasarela?",
    answer:
      "Si. Conectamos con HubSpot, Pipedrive, Notion, Google Calendar o agendas medicas. Para pagos usamos Webpay, MercadoPago o Stripe segun tu rubro.",
    order: 3
  },
  {
    question: "Que pasa con hosting, dominio y seguridad?",
    answer:
      "Podemos administrarlos a tu nombre. Configuramos SSL, backups y monitoreo basico. En mantencion TI sumamos parches, antivirus gestionado y reportes mensuales.",
    order: 4
  },
  {
    question: "Puedo editar y medir sin soporte?",
    answer:
      "Si. Dejamos panel para textos, precios, FAQ y casos sin tocar codigo. Entregamos dashboard con visitas, conversiones y origenes para que marketing decida rapido.",
    order: 5
  },
  {
    question: "Como es el soporte y el SLA?",
    answer:
      "Atendemos por WhatsApp y correo en horario laboral Chile (09:00 a 19:00) con SLA de 24h habiles. Para urgencias TI ofrecemos soporte on-site y remoto segun plan.",
    order: 6
  }
];

export const mockLegalPages: Record<string, LegalPage> = {
  privacidad: {
    slug: "privacidad",
    title: "Politica de Privacidad",
    content:
      "Usamos tu informacion para responder solicitudes y prestar el servicio. No vendemos datos. Puedes pedir eliminacion escribiendo a contacto@nortechdigital.cl."
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
    excerpt: "Pasos clave para salir a produccion con performance y medicion desde el dia uno.",
    content:
      "Define una oferta clara, valida el copy con clientes, implementa analytics y mapas de calor, y prepara variantes para test A/B.",
    createdAt: "2025-01-10T00:00:00.000Z",
    updatedAt: "2025-01-10T00:00:00.000Z",
    publishedAt: "2025-01-10T00:00:00.000Z"
  },
  {
    slug: "automatizar-whatsapp",
    title: "Como automatizar WhatsApp sin perder el tono humano",
    excerpt: "Flujos que responden rapido y saben cuando escalar a un agente.",
    content:
      "Define mensajes de bienvenida, FAQs y derivaciones. Usa horarios para respuestas diferidas y mide el tiempo a primer contacto humano.",
    createdAt: "2025-01-12T00:00:00.000Z",
    updatedAt: "2025-01-12T00:00:00.000Z",
    publishedAt: "2025-01-12T00:00:00.000Z"
  }
];
