import type { Service } from "../lib/api/types";

export const planSummaries: Service[] = [
  {
    slug: "planes-desarrollo",
    type: "web",
    variant: "web",
    title: "Planes de desarrollo",
    what_it_solves:
      "Web estática, web administrable o sistemas a medida según tu etapa.",
    benefits: [
      "Web estática profesional",
      "Web administrable",
      "Sistema de gestión a medida",
      "Sitio listo para captar consultas desde el primer día"
    ],
    delivery_time: "Según plan",
    modality: "Proyecto",
    price: "Desde $160.000 CLP",
    top_banner: "Desarrollo",
    icon: "lucide:layout",
    whatsapp_desc: "Hola, quiero ver los planes de desarrollo disponibles.",
    ctaLabel: "Ver planes disponibles",
    ctaHref: "/desarrollo#planes",
    order: 1
  },
  {
    slug: "planes-marketing",
    type: "digital",
    variant: "marketing",
    accent: "amber",
    title: "Planes de marketing",
    what_it_solves:
      "Planes para atraer clientes con campañas, contenido y optimización.",
    benefits: [
      "Meta Ads y Google Ads",
      "Redes sociales y contenido",
      "Embudos y estrategia",
      "Objetivo comercial de 80 a 200 clientes potenciales al mes (según rubro e inversión)"
    ],
    delivery_time: "Según plan",
    modality: "Mensual",
    price: "Desde $297.000 CLP",
    top_banner: "Marketing",
    icon: "lucide:rocket",
    whatsapp_desc: "Hola, quiero ver los planes de marketing disponibles.",
    ctaLabel: "Ver planes disponibles",
    ctaHref: "/marketing#planes",
    order: 2
  },
  {
    slug: "planes-mixto",
    type: "digital",
    variant: "mixed",
    accent: "orange",
    title: "Plan mixto web + marketing",
    what_it_solves:
      "Combina desarrollo web y campañas para lanzar y convertir.",
    benefits: [
      "Landing optimizada",
      "Campañas con tracking",
      "Landing y campañas alineadas en una sola estrategia comercial",
      "Estrategia full-funnel para escalar a 80-200 clientes potenciales por mes"
    ],
    delivery_time: "14 días hábiles",
    modality: "Proyecto + Mensual",
    price: "Desde $450.000 CLP",
    top_banner: "Mixto",
    icon: "lucide:layers",
    whatsapp_desc: "Hola, quiero ver los planes mixtos disponibles.",
    ctaLabel: "Hablar por WhatsApp",
    ctaHref: "",
    order: 3
  }
];
