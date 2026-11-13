/**
 * Agrupación de rubros para el filtro de /casos.
 *
 * Con pocos casos, un botón por rubro exacto deja filtros de 1 solo caso,
 * así que agrupamos `industry` en categorías amplias. Si aparece un rubro
 * nuevo que no está en el mapa, cae en "Otros".
 */
import type { CaseStudy } from "../lib/api/types";

export const gruposRubro = [
  { slug: "salud", nombre: "Salud" },
  { slug: "inmobiliaria", nombre: "Inmobiliaria" },
  { slug: "comercio", nombre: "Comercio" },
  { slug: "gastronomia", nombre: "Gastronomía" },
  { slug: "otros", nombre: "Otros" },
] as const;

export type GrupoRubro = (typeof gruposRubro)[number]["slug"];

const normalizar = (texto: string) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

const rubroAGrupo: Record<string, GrupoRubro> = {
  salud: "salud",
  inmobiliaria: "inmobiliaria",
  automotora: "comercio",
  muebleria: "comercio",
  comercio: "comercio",
  retail: "comercio",
  gastronomia: "gastronomia",
  restaurante: "gastronomia",
};

export const grupoDeCaso = (caso: Pick<CaseStudy, "industry">): GrupoRubro =>
  rubroAGrupo[normalizar(caso.industry ?? "")] ?? "otros";

/** Solo los grupos que tienen al menos un caso, en el orden de `gruposRubro`. */
export const gruposConCasos = (casos: CaseStudy[]) => {
  const presentes = new Set(casos.map(grupoDeCaso));
  return gruposRubro.filter((grupo) => presentes.has(grupo.slug));
};

export const ordenarCasos = (casos: CaseStudy[]) =>
  [...casos].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
