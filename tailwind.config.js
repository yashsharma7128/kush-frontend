/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kush: {
          maroon: '#6B1D2F',
          maroonDark: '#4A0F1E',
          maroonDeep: '#2E060F',
          maroonLight: '#8C2B43',
          gold: '#C59B4E',
          goldLight: '#E2C475',
          goldDark: '#9A7228',
          cream: '#FAF6F0',
          ivory: '#FDFBF7',
          champagne: '#F4EBD9',
          border: '#E6D5BD',
          borderGold: '#D4AF37',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        royal: ['"Cinzel"', 'serif'],
        cinzelDeco: ['"Cinzel Decorative"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        hindi: ['"Rozha One"', '"Yatra One"', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sound-bar-1': 'soundBar 0.8s ease-in-out infinite',
        'sound-bar-2': 'soundBar 0.6s ease-in-out infinite 0.2s',
        'sound-bar-3': 'soundBar 0.9s ease-in-out infinite 0.4s',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'sway': 'sway 4s ease-in-out infinite',
      },
      keyframes: {
        soundBar: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '16px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
