/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta cobriza/dorada inspirada en Lovable
        primary: 'oklch(0.55 0.15 45)',      // Café dorado principal
        accent: 'oklch(0.45 0.12 35)',       // Café más oscuro
        secondary: 'oklch(0.65 0.18 50)',    // Dorado cálido
        bronze: 'oklch(0.50 0.10 40)',       // Bronce
        copper: 'oklch(0.60 0.16 55)',       // Cobre
        gold: 'oklch(0.70 0.20 75)',         // Oro claro
        cream: 'oklch(0.95 0.02 85)',        // Crema para fondos
        parchment: 'oklch(0.92 0.03 80)',    // Pergamino
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, oklch(0.70 0.20 75) 0%, oklch(0.55 0.15 45) 100%)',
        'copper-glow': 'linear-gradient(135deg, oklch(0.60 0.16 55) 0%, oklch(0.45 0.12 35) 100%)',
      }
    },
  },
  plugins: [],
}
