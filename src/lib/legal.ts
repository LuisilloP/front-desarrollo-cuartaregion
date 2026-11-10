// Fuente única de datos para las páginas legales (privacidad, términos, eliminación de datos).
// Si cambia algún proveedor o dato de contacto, se edita aquí y se actualizan todas las páginas.

import { LEGAL_INFO } from "../config/legal";

export const LEGAL = {
  // Datos de la empresa: vienen de src/config/legal.ts (los mismos que se
  // muestran en /informacion-legal y se usaron para verificar la empresa en Meta).
  companyName: "Informática Aliado Digital Limitada",
  brandName: LEGAL_INFO.commercialName,
  rut: LEGAL_INFO.rut,
  address: LEGAL_INFO.address.full,
  jurisdiction: LEGAL_INFO.address.locality,
  privacyEmail: LEGAL_INFO.email,
  siteUrl: LEGAL_INFO.url,
  // Plazos (días)
  ackDays: 5, // acuse de recibo de solicitudes (días hábiles)
  rightsResponseDays: 30, // respuesta a derechos (días corridos, Ley 21.719)
  deletionDays: 30, // borrado de datos de Meta (días corridos)
  prospectRetentionMonths: 24,
  lastUpdated: "10 de noviembre de 2026",
} as const;

// Proveedores que tratan datos por cuenta nuestra (encargados) o con los que
// nos comunicamos. Mantener esta lista alineada con la realidad: Meta la revisa.
export const PROCESSORS: { name: string; purpose: string; location: string }[] = [
  {
    name: "Meta Platforms (WhatsApp Business Platform, Instagram, Messenger)",
    purpose: "Recepción y envío de mensajes de los canales de atención",
    location: "Estados Unidos / Irlanda",
  },
  {
    name: "Servidores propios de Aliado Digital (bandeja de atención, CRM y automatizaciones)",
    purpose: "Almacenamiento de conversaciones, contactos y flujos de respuesta",
    location: "Chile",
  },
  {
    name: "Cloudflare",
    purpose: "Entrega del sitio web, seguridad y túneles de red",
    location: "Estados Unidos y red global",
  },
  {
    name: "Resend",
    purpose: "Envío de correos transaccionales",
    location: "Estados Unidos",
  },
  {
    name: "Google (Workspace / Forms, Tag Manager y Analytics)",
    purpose:
      "Correo, formularios de diagnóstico, documentos de trabajo y medición agregada de visitas al sitio",
    location: "Estados Unidos",
  },
  {
    name: "Proveedores de inteligencia artificial",
    purpose:
      "Clasificar consultas y sugerir respuestas; no se usan tus datos para entrenar modelos de terceros",
    location: "Estados Unidos",
  },
];
