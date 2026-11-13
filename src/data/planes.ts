/**
 * Fuente única de planes y precios de Aliado Digital.
 *
 * Origen: doc "Aliado Digital — Costos, planes y pipeline" (nov 2026).
 * Todas las páginas (home, /planes, /desarrollo, /marketing) leen de aquí.
 * Para cambiar un precio, cámbialo SOLO en este archivo.
 *
 * Precios netos en CLP; el IVA (19 %) se suma aparte.
 */

import type { Service } from "../lib/api/types";

export const IVA = 0.19;

export const formatoCLP = (valor: number) =>
  `$${valor.toLocaleString("es-CL", { maximumFractionDigits: 0 })}`;

export const conIVA = (valor: number) => Math.round(valor * (1 + IVA));

export type PlanMensual = {
  slug: "presencia" | "crecimiento" | "socio-digital";
  nombre: string;
  precio: number; // neto mensual
  idealPara: string;
  resumen: string;
  incluye: string[];
  recomendado?: boolean;
  icono: string;
  mensajeWhatsapp: string;
};

export type Setup = {
  slug: string;
  nombre: string;
  precio: number | null; // null = a cotizar
  descripcion: string;
  incluye: string[];
  icono: string;
  mensajeWhatsapp: string;
};

export const planesMensuales: PlanMensual[] = [
  {
    slug: "presencia",
    nombre: "Presencia",
    precio: 119000,
    idealPara: "Negocios que ya tienen web y quieren mantenerla al día y visible en Google.",
    resumen: "Tu web siempre funcionando, segura y con tu ficha de Google activa.",
    incluye: [
      "Hosting, dominio y SSL con backups diarios y monitoreo",
      "Actualizaciones de seguridad",
      "Google Business Profile: 2 publicaciones al mes y reseñas respondidas en menos de 48 h",
      "1 cambio menor al mes (hasta 30 minutos)",
      "Reporte mensual: visitas, clics a WhatsApp y 3 recomendaciones",
      "Soporte por un solo canal, respuesta en 1 día hábil",
    ],
    icono: "lucide:shield-check",
    mensajeWhatsapp: "Hola, me interesa el plan Presencia de Aliado Digital.",
  },
  {
    slug: "crecimiento",
    nombre: "Crecimiento",
    precio: 549000,
    idealPara: "Pymes que quieren más consultas cada mes, no solo tener web.",
    resumen: "Todo Presencia, más SEO local, contenido, campañas y una automatización.",
    incluye: [
      "Todo lo de Presencia",
      "SEO local para aparecer en búsquedas de tu zona",
      "8 publicaciones al mes en redes sociales",
      "Gestión de campañas (la inversión en anuncios la pagas tú)",
      "1 automatización: WhatsApp o formularios",
      "Reunión mensual de resultados",
    ],
    recomendado: true,
    icono: "lucide:trending-up",
    mensajeWhatsapp: "Hola, me interesa el plan Crecimiento de Aliado Digital.",
  },
  {
    slug: "socio-digital",
    nombre: "Socio Digital",
    precio: 1290000,
    idealPara: "Empresas que necesitan un equipo técnico externo: sistemas, datos y cumplimiento.",
    resumen: "Todo Crecimiento, más sistemas y automatizaciones a medida.",
    incluye: [
      "Todo lo de Crecimiento",
      "Sistemas y automatizaciones a medida (1 solicitud activa a la vez)",
      "Dashboard de métricas del negocio",
      "Revisión de cumplimiento Ley 21.719 (datos personales)",
      "Soporte prioritario",
      "Reunión quincenal",
    ],
    icono: "lucide:handshake",
    mensajeWhatsapp: "Hola, me interesa el plan Socio Digital de Aliado Digital.",
  },
];

export const setups: Setup[] = [
  {
    slug: "landing",
    nombre: "Landing page",
    precio: 290000,
    descripcion: "Una página rápida y enfocada en conseguir consultas, hecha en Astro.",
    incluye: [
      "Diseño a medida de tu marca",
      "Botón de WhatsApp y formulario de contacto",
      "SEO básico y medición de visitas",
      "Carga rápida en celular",
    ],
    icono: "lucide:layout",
    mensajeWhatsapp: "Hola, quiero cotizar una landing page.",
  },
  {
    slug: "web-corporativa",
    nombre: "Web corporativa",
    precio: 590000,
    descripcion: "Sitio de varias páginas para presentar tu empresa y tus servicios.",
    incluye: [
      "Todo lo de la landing",
      "Varias páginas: servicios, nosotros, contacto",
      "Versión autoadministrable opcional (con recargo)",
      "Base lista para sumar blog o catálogo",
    ],
    icono: "lucide:building-2",
    mensajeWhatsapp: "Hola, quiero cotizar una web corporativa.",
  },
  {
    slug: "sistema-inicial",
    nombre: "Diagnóstico + sistema inicial",
    precio: 1490000,
    descripcion: "Punto de partida del plan Socio Digital: entendemos tu operación y armamos la primera versión del sistema.",
    incluye: [
      "Diagnóstico de procesos y datos",
      "Primera versión del sistema a medida",
      "Integración con tus herramientas actuales",
      "Capacitación al equipo",
    ],
    icono: "lucide:layers",
    mensajeWhatsapp: "Hola, quiero cotizar un diagnóstico y sistema a medida.",
  },
];

export const reglasPlanes = [
  "Precios netos en pesos chilenos; el IVA se suma aparte.",
  "La mensualidad se paga por adelantado.",
  "Lo que esté fuera del plan se cotiza aparte antes de hacerlo.",
  "Las solicitudes entran por un solo canal para que nada se pierda.",
  "Presencia requiere una web hecha por Aliado o migrada a nuestra infraestructura.",
];

/** Tabla comparativa: true = incluido, string = detalle, false = no incluido */
export const comparativa: Array<{
  item: string;
  presencia: boolean | string;
  crecimiento: boolean | string;
  socio: boolean | string;
}> = [
  { item: "Hosting, dominio, SSL y backups", presencia: true, crecimiento: true, socio: true },
  { item: "Actualizaciones de seguridad", presencia: true, crecimiento: true, socio: true },
  { item: "Google Business Profile", presencia: true, crecimiento: true, socio: true },
  { item: "Cambios en la web", presencia: "1 al mes", crecimiento: "1 al mes", socio: "Cola de solicitudes" },
  { item: "Reporte de resultados", presencia: "Mensual", crecimiento: "Mensual + reunión", socio: "Dashboard + reunión quincenal" },
  { item: "SEO local", presencia: false, crecimiento: true, socio: true },
  { item: "Publicaciones en redes", presencia: false, crecimiento: "8 al mes", socio: "8 al mes" },
  { item: "Gestión de campañas", presencia: false, crecimiento: true, socio: true },
  { item: "Automatizaciones", presencia: false, crecimiento: "1", socio: "A medida" },
  { item: "Sistemas a medida", presencia: false, crecimiento: false, socio: true },
  { item: "Revisión Ley 21.719", presencia: false, crecimiento: false, socio: true },
  { item: "Soporte", presencia: "1 día hábil", crecimiento: "1 día hábil", socio: "Prioritario" },
];

// ---------------------------------------------------------------------------
// Adaptadores para las tarjetas existentes (ServiceCard / ServicesSection)
// ---------------------------------------------------------------------------

export const planesComoServicios = (ctaHref = "/planes"): Service[] =>
  planesMensuales.map((plan, index) => ({
    slug: `plan-${plan.slug}`,
    type: "web",
    variant: "web",
    title: plan.nombre,
    what_it_solves: plan.resumen,
    benefits: plan.incluye.slice(0, 4),
    modality: "Mensual",
    price: `${formatoCLP(plan.precio)} / mes`,
    priceLabel: "Plan mensual",
    priceNote: "+ IVA",
    top_banner: plan.recomendado ? "Recomendado" : undefined,
    icon: plan.icono,
    whatsapp_desc: plan.mensajeWhatsapp,
    ctaLabel: "Ver detalle del plan",
    ctaHref: `${ctaHref}#${plan.slug}`,
    order: index + 1,
  }));

/** Modelo que usan las tarjetas PlanCard (development/ y marketing/). */
export type PlanCardModel = {
  id: string;
  name: string;
  idealFor: string;
  price: string;
  currency?: string;
  priceNote?: string;
  includes: string[];
  deliverables?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  featured?: boolean;
};

export const planesComoTarjetas = (
  whatsappLink: (mensaje: string) => string,
): PlanCardModel[] =>
  planesMensuales.map((plan) => ({
    id: plan.slug,
    name: plan.nombre,
    idealFor: plan.idealPara,
    price: formatoCLP(plan.precio),
    currency: "CLP",
    priceNote: "Neto mensual + IVA",
    includes: plan.incluye,
    ctaLabel: `Quiero ${plan.nombre}`,
    ctaHref: whatsappLink(plan.mensajeWhatsapp),
    featured: Boolean(plan.recomendado),
  }));

export const setupsComoTarjetas = (
  whatsappLink: (mensaje: string) => string,
): PlanCardModel[] =>
  setups.map((setup) => ({
    id: setup.slug,
    name: setup.nombre,
    idealFor: setup.descripcion,
    price: setup.precio ? formatoCLP(setup.precio) : "A cotizar",
    currency: setup.precio ? "CLP" : undefined,
    priceNote: setup.precio ? "Desde · pago único + IVA" : "Según alcance",
    includes: setup.incluye,
    ctaLabel: "Cotizar por WhatsApp",
    ctaHref: whatsappLink(setup.mensajeWhatsapp),
  }));
