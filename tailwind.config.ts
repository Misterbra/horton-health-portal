/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'background': 'var(--background)',
      },
      textColor: {
        'foreground': 'var(--foreground)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}