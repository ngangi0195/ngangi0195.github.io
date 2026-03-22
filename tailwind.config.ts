import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:      '#f3ede0',
        surface: '#faf6ec',
        surface2:'#ece5d0',
        ink:     '#0c0c0c',
        red:     '#d93000',
        blue:    '#0047cc',
        yellow:  '#ffe14d',
        text2:   '#3d3d3d',
        muted:   '#888888',
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      borderWidth: {
        rule: '2.5px',
      },
      animation: {
        'pulse-dot': 'pulseDot 2.5s ease-in-out infinite',
        'blink':     'blink 1s step-end infinite',
        'fade-up':   'fadeUp 0.5s ease-out forwards',
      },
      keyframes: {
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
        blink:    { '50%': { opacity: '0' } },
        fadeUp:   { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}

export default config
