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
<<<<<<< Updated upstream
    logo: "/images/companies/logo_montblanc.png",
=======
    logo: "/images/logos/logo-01-montblanc.webp",
>>>>>>> Stashed changes
    href: "https://www.clinicamontblanc.cl",
  },
  {
    id: "doctor-harold-ziller",
    name: "Dr. Harold Ziller",
<<<<<<< Updated upstream
    logo: "/images/companies/logo_drharaldziller.png",
=======
    logo: "/images/logos/logo-02-dr-harald-ziller.webp",
>>>>>>> Stashed changes
    href: "https://drharaldziller.cl/",
  },
  {
    id: "estampados-rya",
    name: "Estampados R&A",
<<<<<<< Updated upstream
    logo: "/images/companies/logo_rya_estampados.jpg",
=======
    logo: "/images/logos/logo-03-rya-estampados.webp",
>>>>>>> Stashed changes
    href: "https://rya-estampados.vercel.app/",
  },
  {
    id: "eco-grow",
    name: "Sistema Eco Grow",
<<<<<<< Updated upstream
    logo: "/images/companies/logo_ecogrow.png",
=======
    logo: "/images/logos/logo-04-eco-grow.webp",
>>>>>>> Stashed changes
    href: "https://landig-eco-grow.vercel.app/",
  },
  {
    id: "muebleria-el-florentino",
    name: "Muebleria El Florentino",
<<<<<<< Updated upstream
    logo: "/images/companies/logo_muebleria_florentino.png",
=======
    logo: "/images/logos/logo-05-muebleria-florentino.webp",
>>>>>>> Stashed changes
    href: "https://elfiorentino.vercel.app/",
  },
];
