/**
 * Datos legales de la empresa.
 *
 * Información pública usada para verificación de empresa en Meta Business y
 * mostrada de forma visible en el footer y en la página /informacion-legal.
 * Fuente única de verdad para no duplicar estos datos entre componentes.
 */
export const LEGAL_INFO = {
  /** Nombre comercial / marca. */
  commercialName: "Aliado Digital",
  /** Razón social registrada. */
  legalName: "INFORMATICA ALIADO DIGITAL LIMITADA",
  /** RUT de la empresa. */
  rut: "78.337.874-4",
  /** Giro / actividad económica. */
  activity: "Servicios TI, software, automatización y marketing digital",
  /** Correo de contacto legal/administrativo. */
  email: "aliadodigitalsp@gmail.com",
  /** Teléfono de contacto (formato visible). */
  phone: "+56 9 8735 9575",
  /** Teléfono en formato tel: (solo dígitos con prefijo). */
  phoneTel: "+56987359575",
  /** Sitio web oficial. */
  url: "https://aliadodigital.cl",
  /** Ruta de la página legal pública. */
  pageHref: "/informacion-legal",
  address: {
    /** Dirección completa para mostrar como texto. */
    full: "COLON 352 OF 318 STUDIOFFICE COLON, La Serena, Coquimbo, Chile",
    street: "COLON 352 OF 318 STUDIOFFICE COLON",
    locality: "La Serena",
    region: "Coquimbo",
    country: "CL",
  },
} as const;
