import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // GamingVerse brand tokens
        gv: {
          bg:       '#04040a',
          surface:  '#0a0a14',
          surface2: '#10101e',
          cyan:     '#00f5ff',
          ember:    '#ff4500',
          gold:     '#ffaa00',
          muted:    '#6a6a88',
          border:   'rgba(0,245,255,0.12)',
        },
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'monospace'],
        rajdhani: ['var(--font-rajdhani)', 'sans-serif'],
        mono:     ['var(--font-share-tech)', 'monospace'],
      },
      animation: {
        'fade-up':      'fadeUp 0.8s ease forwards',
        'twinkle':      'twinkle 3s ease-in-out infinite',
        'grid-pulse':   'gridPulse 8s ease-in-out infinite',
        'orb-float':    'orbFloat 12s ease-in-out infinite',
        'tech-scroll':  'techScroll 20s linear infinite',
        'scroll-line':  'scrollLine 2s ease-in-out infinite',
        'glitch':       'glitch 6s ease-in-out infinite',
        'hex-pulse':    'hexPulse 0.8s ease',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0', transform: 'scale(0.8)' },
          '50%':     { opacity: '1', transform: 'scale(1)' },
        },
        gridPulse: {
          '0%,100%': { opacity: '0.5' },
          '50%':     { opacity: '1' },
        },
        orbFloat: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(30px,-20px) scale(1.05)' },
          '66%':     { transform: 'translate(-20px,30px) scale(0.95)' },
        },
        techScroll: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        scrollLine: {
          '0%':   { transform: 'scaleY(0)', opacity: '1', transformOrigin: 'top' },
          '50%':  { transform: 'scaleY(1)', opacity: '1' },
          '100%': { transform: 'scaleY(1)', opacity: '0' },
        },
        glitch: {
          '0%,92%,100%': { opacity: '0', transform: 'translateX(0)' },
          '93%':          { opacity: '0.8', transform: 'translateX(-4px)' },
          '94%':          { opacity: '0', transform: 'translateX(4px)' },
          '95%':          { opacity: '0.6', transform: 'translateX(-2px)' },
          '96%':          { opacity: '0' },
        },
        hexPulse: {
          '0%':   { boxShadow: '0 0 0px rgba(0,245,255,0)' },
          '50%':  { boxShadow: '0 0 20px rgba(0,245,255,0.4)' },
          '100%': { boxShadow: '0 0 0px rgba(0,245,255,0)' },
        },
      },
      backgroundImage: {
        'hero-grid': `
          linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
        `,
        'scanlines': `repeating-linear-gradient(
          to bottom,
          transparent 0px, transparent 3px,
          rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px
        )`,
      },
      backgroundSize: {
        'grid-60': '60px 60px',
      },
      clipPath: {
        skewed: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
        'skewed-sm': 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
      },
    },
  },
  plugins: [],
}

export default config
