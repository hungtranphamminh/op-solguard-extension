/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
        monasans: "'MonaSans', sans-serif",
        DmMono: "'DM Mono', sans-serif;",
      },
      colors: {
        primary: '#7D20FF',
        'primary-400': '#A780FF',
        'secondary-text': '#DBDBE2',
      },
      backgroundImage: {
        'custom-radial': 'radial-gradient(30.04% 100% at 55.18% 100.00%, #AC47FA 0%, #7D20FF 100%)',
      },
      boxShadow: {
        primary: '0px 0px 0px 4px rgba(137, 59, 255, 0.16)',
      },
      space: {
        128: 'calc(100% + 16px)',
      },
    },
  },
  plugins: [require('daisyui')],
}
