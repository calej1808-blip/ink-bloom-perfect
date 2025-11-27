export interface Poem {
  id: string;
  title: string;
  content: string;
  date?: string;
}

// Datos de ejemplo - en producción esto leería de archivos .md
export function getPoems(): Poem[] {
  return [
    {
      id: "1",
      title: "Mi Primer Poema",
      content: `Bienvenido a tu colección de poesía.

Este es tu primer poema creado desde el CMS.

Puedes editar este texto cuando quieras.`,
      date: "2024-01-20"
    },
    {
      id: "2", 
      title: "Reflejos Nocturnos",
      content: `La luna pinta de plata el río,
y en su corriente llevo mis sueños,
como hojas que el otoño libera.`,
      date: "2024-01-18"
    }
  ];
}
