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
    logo: "/images/companies/logo_montblanc.png",
    href: "https://www.clinicamontblanc.cl",
  },
  {
    id: "doctor-harold-ziller",
    name: "Dr. Harold Ziller",
    logo: "/images/companies/logo_drharaldziller.png",
    href: "https://drharaldziller.cl/",
  },
  {
    id: "estampados-rya",
    name: "Estampados R&A",
    logo: "/images/companies/logo_rya_estampados.jpg",
    href: "https://rya-estampados.vercel.app/",
  },
  {
    id: "eco-grow",
    name: "Sistema Eco Grow",
    logo: "/images/companies/logo_ecogrow.png",
    href: "https://landig-eco-grow.vercel.app/",
  },
  {
    id: "muebleria-el-florentino",
    name: "Muebleria El Florentino",
    logo: "/images/companies/logo_muebleria_florentino.png",
    href: "https://elfiorentino.vercel.app/",
  },
];
