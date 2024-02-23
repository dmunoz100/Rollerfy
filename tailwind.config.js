/** @type {import('tailwindcss').Config} */
export default {
  content: [ './index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors : {
        'custom-primary' : "#957DAD",
        'custom-secondary' : "#D291BC" ,
        'Todos' : "#FFDFD3",
        'Principiante':"#FEC8D8",
        'Intermedio':"#D291BC",
        'Avenzado':"#957DAD",
        'Default' : "#E0BBE4"
      }
    },
  },
  plugins: [],
}

