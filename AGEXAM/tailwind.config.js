/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quest: {
          blue: '#38bdf8',
          darkBlue: '#0284c7',
          yellow: '#facc15',
          gold: '#eab308',
          orange: '#fb923c',
          pink: '#f472b6',
          purple: '#c084fc',
          deepPurple: '#7e22ce',
          green: '#4ade80',
          darkGreen: '#16a34a',
          coral: '#fb7185',
          cream: '#fefce8',
          card: '#ffffff',
        }
      },
      fontFamily: {
        bubble: ['"Fredoka"', 'system-ui', 'sans-serif'],
        body: ['"Quicksand"', '"Nunito"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'playful': '0 8px 0 rgba(0, 0, 0, 0.12)',
        'playful-sm': '0 4px 0 rgba(0, 0, 0, 0.12)',
        'playful-lg': '0 12px 0 rgba(0, 0, 0, 0.15)',
        'playful-colored': '0 8px 0 rgba(126, 34, 206, 0.25)',
        'button-active': '0 2px 0 rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        'bubble': '2.5rem',
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2s infinite ease-in-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
