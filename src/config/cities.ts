/**
 * City landing pages for local search.
 *
 * These exist to rank for "diseño web <ciudad>", which is how this market
 * actually searches. That only works if each page carries content Google has
 * not already seen elsewhere on the site: near-duplicate pages that differ
 * only by a city name are doorway pages, and Google either ignores them or
 * penalises the whole domain.
 *
 * So every entry below is anchored to real, verifiable work:
 *   - `caseSlugs` point at published case studies whose own copy names that
 *     city.
 *   - `brandIds` point at clients in portfolioProjects whose public websites
 *     state they operate there.
 *   - `intro` is written per city and must stay that way.
 *
 * Do not add a city without real clients to show. An empty city page is worse
 * than no page at all.
 */

export interface CityLanding {
  /** URL slug: /diseno-web-<slug>. */
  slug: string;
  /** City name as written in copy. */
  city: string;
  /** Province or area, used for context lines. */
  area: string;
  title: string;
  description: string;
  heading: string;
  /** Unique paragraphs. Never share these between cities. */
  intro: string[];
  /** Slugs from the case studies in content.json. */
  caseSlugs: string[];
  /** Client ids from portfolioProjects with no case study of their own. */
  brandIds: string[];
  /** Short line describing the client mix, shown above the work. */
  workIntro: string;
}

export const CITY_LANDINGS: CityLanding[] = [
  {
    slug: "la-serena",
    city: "La Serena",
    area: "provincia de Elqui",
    title: "Diseño Web en La Serena | Aliado Digital",
    description:
      "Agencia de diseño y desarrollo web en La Serena. Trabajamos con empresas de la ciudad como Propiedades Arenas y Ansar. Oficina en calle Colón.",
    heading: "Diseño y desarrollo web en La Serena",
    intro: [
      "Nuestra oficina está en La Serena, en calle Colón, así que trabajar con nosotros no significa coordinar con una agencia de Santiago que nunca pisó la región. Podemos juntarnos en persona a revisar el proyecto cuando haga falta.",
      "En la ciudad hemos trabajado con rubros exigentes en confianza: corretaje de propiedades y venta de vehículos. En ambos el visitante compara varias opciones antes de escribir, así que la web tiene que cargar rápido, mostrar el catálogo con claridad y dejar el contacto a un clic.",
    ],
    caseSlugs: ["propiedades-arenas", "ansar"],
    brandIds: [],
    workIntro:
      "Proyectos que desarrollamos para empresas de La Serena:",
  },
  {
    slug: "coquimbo",
    city: "Coquimbo",
    area: "provincia de Elqui",
    title: "Diseño Web en Coquimbo | Aliado Digital",
    description:
      "Diseño y desarrollo web para negocios de Coquimbo. Clientes como Peluquería Canina Max y Reybozz Control de Plagas. Estamos a minutos, en La Serena.",
    heading: "Diseño y desarrollo web en Coquimbo",
    intro: [
      "Coquimbo está a minutos de nuestra oficina en La Serena, así que atendemos la ciudad con la misma cercanía: reuniones presenciales cuando el proyecto lo pide y respuesta rápida por WhatsApp el resto del tiempo.",
      "Acá el trabajo ha sido con servicios locales que viven del contacto directo: peluquería canina y control de plagas. Son negocios donde el cliente busca en el teléfono, con urgencia, y decide en la primera pantalla. Por eso priorizamos velocidad en móvil y un botón de contacto siempre visible.",
    ],
    caseSlugs: [],
    brandIds: ["peluqueria-max", "reybozz-control-plagas"],
    workIntro: "Negocios de Coquimbo que confiaron en nosotros:",
  },
  {
    slug: "ovalle",
    city: "Ovalle",
    area: "provincia de Limarí",
    title: "Diseño Web en Ovalle | Aliado Digital",
    description:
      "Diseño y desarrollo web en Ovalle y el Limarí. Trabajamos con Clínica Mont Blanc, el Dr. Harald Ziller y la Academia de Tiro Ovalle.",
    heading: "Diseño y desarrollo web en Ovalle",
    intro: [
      "Ovalle es donde tenemos más trabajo publicado de toda la región, sobre todo en salud: una clínica dental y un cirujano maxilofacial. En ese rubro la web cumple una función concreta, que es dar confianza antes de la primera consulta, y eso cambia cómo se diseña.",
      "También hemos trabajado con deporte y con mueblería en el Limarí, incluida Punitaqui. Son negocios que compiten con la oferta de La Serena y Coquimbo, así que su sitio tiene que verse igual de profesional sin necesitar el mismo presupuesto.",
    ],
    caseSlugs: ["clinica-dental-mont-blanc", "dr-harald-ziller", "muebleria-el-fiorentino"],
    brandIds: ["academia-tiro-ovalle"],
    workIntro: "Proyectos que desarrollamos en Ovalle y el Limarí:",
  },
];

export const getCityLanding = (slug: string): CityLanding | undefined =>
  CITY_LANDINGS.find((entry) => entry.slug === slug);
