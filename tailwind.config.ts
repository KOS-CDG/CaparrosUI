import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brut-bg': '#F5F0E8',
        'brut-black': '#0A0A0A',
        'brut-white': '#FFFFFF',
        'brut-yellow': '#FFEB00',
        'brut-red': '#FF3B00',
        'brut-blue': '#0033FF',
        'brut-surface': '#1A1A1A',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0px #0A0A0A',
        'brutal-lg': '6px 6px 0px #0A0A0A',
        'brutal-accent': '4px 4px 0px #FFEB00',
        'brutal-red': '4px 4px 0px #FF3B00',
        'brutal-blue': '4px 4px 0px #0033FF',
        'brutal-sm': '2px 2px 0px #0A0A0A',
        none: 'none',
      },
      borderWidth: {
        brutal: '2px',
        'brutal-heavy': '3px',
      },
      backgroundImage: {
        'brutalist-stripe':
          'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(10,10,10,0.03) 40px, rgba(10,10,10,0.03) 80px)',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      transitionDuration: {
        fast: '120ms',
      },
      transitionTimingFunction: {
        snappy: 'ease-out',
      },
    },
  },
  plugins: [],
}

export default config
