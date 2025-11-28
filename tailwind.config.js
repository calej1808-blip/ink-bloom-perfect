/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta vintage/elegante corregida
        'vintage-brown': '#1a1208',      // Marrón oscuro cálido - fondo principal
        'vintage-brown-light': '#2a1c0f', // Marrón ligeramente más claro
        'metallic-gold': '#c9aa6e',       // Dorado metálico apagado - títulos
        'bronze-gold': '#d4af37',         // Bronce dorado - acentos
        'warm-beige': '#e6dfd3',          // Beige cálido - texto secundario
        'warm-gray': '#d6cfc1',           // Gris cálido - texto terciario
        'parchment': '#f5f1e8',           // Pergamino - fondos claros
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'], // Más vintage
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"1\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.1\"/%3E%3C/svg%3E')",
        'vintage-gradient': 'linear-gradient(135deg, #1a1208 0%, #2a1c0f 100%)',
      },
      textShadow: {
        'vintage': '0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}
