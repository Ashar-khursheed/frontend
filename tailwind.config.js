/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xxs: "0.5rem",
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "1rem",
        "3xl": "1rem",
      },
    },
    screens: {
      xxs: "436px",
      xs: "576px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
      "3xl": "1600px",
    },
    extend: {
      colors: {
        "gray-100": "#F5F5F5",
        "gray-200": "#EBEBEB",
        "gray-300": "#E2E8F0",
        "gray-400": "#707070",
        "gray-500": "#F8FAFC",
        "gray-600": "#F1F5F9",
        "gray-700": "#64748B",
        "gray-800": "#98A2B1",
        "black-100": "#030303",
        "primary": "#186737",
        "secondary": "#FCB800"
      },
      fontWeight: {
        semibold: '500',
        bold: '600'
      },
      animation: {
        'slide-sequence': 'slideSequence 8s infinite',
        'slide-sequence-store': 'slideSequenceStore 8s infinite',

      },
      keyframes: {
        slideSequence: {
          '0%': { transform: 'translateY(0%)' },
          '25%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(-200%)' },
          '75%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        slideSequenceStore: {
          '0%': { transform: 'translateY(-25%)' },
          '50%': { transform: 'translateY(-130%)' },
          '100%': { transform: 'translateY(-25%)' },
        },
      },
    },
  },

  plugins: [],
};
