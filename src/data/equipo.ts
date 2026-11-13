/**
 * Socios de Aliado Digital para la sección "Nosotros" del home.
 *
 * El bloque del equipo solo se muestra cuando los 3 socios tienen nombre.
 * Así nunca se publica un perfil a medias. Para activarlo:
 *   1. Completa `nombre`, `rol` y `enfoque` de cada socio.
 *   2. Sube la foto a /public/images/equipo/ (cuadrada, mínimo 600x600,
 *      fondo neutro, misma luz en las tres) y pon la ruta en `foto`.
 *      Sin foto se muestran las iniciales.
 *   3. `linkedin` es opcional.
 */

export type Socio = {
  nombre: string;
  /** Lo que hace en Aliado, en palabras del cliente. Ej: "Desarrollo web y sistemas". */
  rol: string;
  titulo: string;
  /** Una línea: de qué se encarga con el cliente. */
  enfoque: string;
  foto?: string;
  linkedin?: string;
};

const TITULO = "Ingeniero en Informática";

export const equipo: Socio[] = [
  { nombre: "", rol: "", titulo: TITULO, enfoque: "" },
  { nombre: "", rol: "", titulo: TITULO, enfoque: "" },
  { nombre: "", rol: "", titulo: TITULO, enfoque: "" },
];

export const equipoCompleto = equipo.every(
  (socio) => socio.nombre.trim() && socio.rol.trim(),
);

export const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() ?? "")
    .join("");
