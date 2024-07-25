const plugin = require('tailwindcss/plugin')

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif']
      },
      clipPath: {
        polygon:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Custom polygon shape
      },
      animation: {
        fadeouttopright: 'fade-out-top-right 0.3s ease-in-out 0.2s 1',
        'slide-in-bottom': 'slide-in-bottom 0.3s ease-out',
        'slide-out-bottom': 'slide-out-bottom 0.3s ease-in',
      },
      backgroundImage: {
        'radial-ellipse': 'radial-gradient(circle at center, #E39431, transparent)',
        'custom-gradient': 'linear-gradient(228deg, #B26B17 0.83%, #4C2E0A 91.82%)',
        'divider-gradient': 'linear-gradient(#033446 100%, #00BAFF 100%, #00BAFF 100%, #033446 100%)',
        'rank-gradient': 'linear-gradient(191deg, #033446 60.14%, #067FAC 109.11%)',
        'navbar-gradient': 'linear-gradient(360deg, #0F222A 0%, #132B35 100%)',
        'home-gradient': 'radial-gradient(49.74% 49.75% at 76.71% 35.25%, #1E4759 0%, #020304 100%)',
        'btn-tap': 'linear-gradient(175.47deg, #07AEEA 3.51%, #007CA8 96.71%)'
      },
      boxShadow: {
        'custom': '0px 0px 24.01px 0px rgba(42, 171, 238, 0.58)',
        'coin-shadow': '0px 0px 24.01px 0px #2AABEE94'
      },
      keyframes: {
        'slide-in-bottom': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-out-bottom': {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(100%)', opacity: 0 },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const radialGradientUtilities = {
        '.radial-gradient': {
          background: 'radial-gradient(68.4% 68.4% at 51.16% 53.22%, #1E4759 0%, #020304 100%)',
        },
        '.linear-gradient': {
          background: 'linear-gradient(90deg, #00AEEF 0%, #D99748 100%)',
        }
      }
      addUtilities(radialGradientUtilities)
    })
  ],
};
