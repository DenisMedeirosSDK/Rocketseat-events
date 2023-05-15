/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        app: 'url(/app-bg.png)',
      },
      colors: {
        ignite: {
          500: '#129e57',
        },
        yellow: {
          500: '#F7DD43',
          700: '#E5CD3D',
        },
        gray: {
          100: '#e1e1e6',
          300: '#8D8D99',
          600: '#323238',
          800: '#202024',
          900: '#121214',
        },
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
};
