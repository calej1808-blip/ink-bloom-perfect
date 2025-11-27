/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'oklch(0.65 0.25 250)',
        accent: 'oklch(0.70 0.20 320)',
        foreground: 'oklch(0.15 0.02 250)',
        'muted-foreground': 'oklch(0.45 0.02 250)',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
