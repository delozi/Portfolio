import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'rgb(var(--background-primary) / <alpha-value>)',
          secondary: 'rgb(var(--background-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--background-tertiary) / <alpha-value>)',
        },
        accent: {
          primary: 'rgb(var(--accent-primary) / <alpha-value>)',
          secondary: 'rgb(var(--accent-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--accent-tertiary) / <alpha-value>)',
        },
        gradient: {
          start: 'rgb(var(--gradient-start) / <alpha-value>)',
          end: 'rgb(var(--gradient-end) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-manrope)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
        'button': '0 5px 15px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'noise': "url('/noise.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'bounce': 'bounce 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'falling-star': 'falling-star 10s linear infinite',
        'nyan-cat': 'nyan-cat 0.6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        'float-slow': {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-15px) translateX(5px)' },
          '66%': { transform: 'translateY(-5px) translateX(-5px)' },
          '100%': { transform: 'translateY(0px) translateX(0px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '0.5',
            filter: 'blur(1px)',
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor' 
          },
          '50%': { 
            opacity: '1',
            filter: 'blur(0)',
            boxShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor' 
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'falling-star': {
          '0%': { 
            transform: 'translateY(-50px) rotate(45deg) scale(0.8)', 
            opacity: '0' 
          },
          '5%': {
            transform: 'translateY(0) rotate(45deg) scale(1)',
            opacity: '0.2'
          },
          '15%': {
            opacity: '1',
            transform: 'translateY(15vh) rotate(45deg) scale(1.1)'
          },
          '85%': {
            opacity: '1',
            transform: 'translateY(85vh) rotate(45deg) scale(0.9)'
          },
          '100%': { 
            transform: 'translateY(calc(100vh + 50px)) rotate(45deg) scale(0.7)', 
            opacity: '0' 
          },
        },
        'nyan-cat': {
          '0%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '100%': { transform: 'translateX(-5px)' },
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text.primary'),
            a: {
              color: theme('colors.accent.primary'),
              '&:hover': {
                color: theme('colors.accent.secondary'),
              },
            },
            h1: {
              color: theme('colors.text.primary'),
              fontFamily: theme('fontFamily.display'),
            },
            h2: {
              color: theme('colors.text.primary'),
              fontFamily: theme('fontFamily.display'),
            },
            h3: {
              color: theme('colors.text.primary'),
              fontFamily: theme('fontFamily.display'),
            },
            h4: {
              color: theme('colors.text.primary'),
              fontFamily: theme('fontFamily.display'),
            },
            code: {
              color: theme('colors.accent.tertiary'),
              fontFamily: theme('fontFamily.mono'),
            },
            blockquote: {
              borderLeftColor: theme('colors.accent.primary'),
            },
          },
        },
      }),
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
        '2500': '2500ms',
        '3000': '3000ms',
        '5000': '5000ms',
        '7000': '7000ms',
      },
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config 