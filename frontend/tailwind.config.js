/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aliceblue': '#F0F8FF',
        'cadetblue': {
          DEFAULT: '#5F9EA0',
          'dark': '#4B7B7D',
          'light': '#7BB3B6',
        },
        'steel-blue': '#4682B4',
        'light-steel-blue': '#B0C4DE',
        'slate-gray': '#2F4F4F',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'cadet': '0 4px 15px rgba(95, 158, 160, 0.3)',
        'cadet-lg': '0 8px 25px rgba(95, 158, 160, 0.4)',
        'cadet-xl': '0 12px 35px rgba(95, 158, 160, 0.5)',
        'filter': '0 2px 8px rgba(95, 158, 160, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
        'pulse-cadet': 'pulseCadet 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' },
        },
        pulseCadet: {
          '0%, 100%': { 
            backgroundColor: '#5F9EA0',
            transform: 'scale(1)',
          },
          '50%': { 
            backgroundColor: '#7BB3B6',
            transform: 'scale(1.05)',
          },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}