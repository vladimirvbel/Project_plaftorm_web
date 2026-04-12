/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          terracota: '#C05621', // Tono artesanal
          crema: '#FDFCF0',    // Tono de tela cruda/hilo
          textil: '#2D3748',   // Gris profundo para textos
        }
      }
    },
  },
  plugins: [],
}