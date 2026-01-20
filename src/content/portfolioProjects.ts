// src/content/portfolioProjects.ts

/**
 * Defines the type for a single project.
 * - id: A unique ID for the project.
 * - title: The name of the project.
 * - image: Path to the project image (ideally under /public).
 * - href: Optional URL for the project. If provided, the card will be a clickable link.
 */
export interface Project {
  id: string; // Unique ID for React keys
  title: string;
  image: string;
  href?: string;
}

/**
 * The master list of all portfolio projects.
 * To add a new project, create a new object in this array.
 * For best results, use images with a 9:16 aspect ratio (like a phone screen).
 */
export const projects: Project[] = [
  {
    id: "clinica-montblanc",
    title: "Clínica Montblanc",
    image: "/images/webs/account-setup.png",
    href: "https://www.clinicamontblanc.cl",
  },
  {
    id: "saas-placeholder-1",
    title: "Proyecto SaaS",
    image: "/images/webs/account-setup.png", // Placeholder image
  },
  {
    id: "ecommerce-placeholder-1",
    title: "Tienda Online",
    image: "/images/webs/account-setup.png", // Placeholder image
  },
  {
    id: "landing-placeholder-1",
    title: "Landing Page Evento",
    image: "/images/webs/account-setup.png", // Placeholder image
    href: "#",
  },
  {
    id: "sitio-placeholder-1",
    title: "Sitio Corporativo",
    image: "/images/webs/account-setup.png", // Using existing image as placeholder
    href: "#",
  },
   {
    id: "saas-placeholder-2",
    title: "Plataforma Educativa",
    image: "/images/webs/account-setup.png", // Placeholder image
  },
  {
    id: "ecommerce-placeholder-2",
    title: "Ecommerce de Ropa",
    image: "/images/webs/account-setup.png", // Placeholder image
    href: "#",
  },
  {
    id: "landing-placeholder-2",
    title: "Página de Captura",
    image: "/images/webs/account-setup.png", // Placeholder image
  },
];
