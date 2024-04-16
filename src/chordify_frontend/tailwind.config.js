import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'
import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    neumorphismColor: {

    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '160rem',
      },
      colors: {

        footer: {
          button: 'rgb(32,129,226)',
        },
      },

    },
  },
  plugins: [forms, daisyui],
}

