// src/content/portfolioProjects.ts

/**
 * Defines the type for a single company.
 * - id: Unique ID for React keys.
 * - name: Display name for the company.
 * - logo: Path to the logo image (under /public).
 * - href: Optional URL for the company.
 */
export interface Company {
  id: string;
  name: string;
  logo: string;
  href?: string;
}

/**
 * The master list of companies we have worked with.
 * Use transparent logos whenever possible for better visual balance.
 */
export const companies: Company[] = [
  {
    id: "clinica-montblanc",
    name: "Clinica Montblanc",
    logo: "/images/logos/montblanc.webp",
    href: "https://www.clinicamontblanc.cl",
  },
  {
    id: "doctor-harald-ziller",
    name: "Dr. Harald Ziller",
    logo: "/images/logos/dr-harald-ziller.webp",
    href: "https://drharaldziller.cl/",
  },
  {
    id: "estampados-rya",
    name: "Estampados R&A",
    logo: "/images/logos/rya-estampados.webp",
    href: "https://rya-estampados.vercel.app/",
  },
  {
    id: "eco-grow",
    name: "Sistema Eco Grow",
    logo: "/images/logos/eco-grow.webp",
    href: "https://landig-eco-grow.vercel.app/",
  },
  {
    id: "muebleria-el-florentino",
    name: "Muebleria El Florentino",
    logo: "/images/logos/muebleria-florentino.webp",
    href: "https://elfiorentino.vercel.app/",
  },
    {
    id: "propiedades-arenas",
    name: "Propiedades Arenas",
    logo: "/images/logos/propiedades-arenas.webp",
    href: "https://propiedadesarenas.cl/",
  },
];
