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
    image: "/images/webs/montblanc-web.webp",
    href: "https://www.clinicamontblanc.cl",
  },
  {
    id: "doctor-harold-ziller",
    title: "Dr. Harold Ziller",
    image: "/images/webs/dr-harald-ziller.webp",
    href: "https://drharaldziller.cl/", 
  },
  {
    id: "estampados-rya",
    title: "Estampados R&A",
    image: "/images/webs/estampados-rya.webp", // Placeholder image
    href: "https://rya-estampados.vercel.app/",  // Placeholder image
  },
  {
    id: "eco-grow",
    title: "Sistema Eco Grow",
    image: "/images/webs/eco-grow.webp", // Placeholder image
    href: "https://landig-eco-grow.vercel.app/",
  },
];
