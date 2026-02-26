/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode neomorphic
        'neo-bg': '#e8ecf1',
        'neo-surface': '#eef1f6',
        'neo-text': '#2d3561',
        'neo-text-secondary': '#6b7fa3',
        'neo-accent': '#ff4757',
        'neo-accent-cyan': '#1e90ff',
        'neo-accent-green': '#2ed573',
        'neo-accent-orange': '#ffa502',
        // Dark mode neomorphic
        'dark-bg': '#1e2235',
        'dark-surface': '#252a3d',
        'dark-elevated': '#2d3354',
        'dark-text': '#e8eaf6',
        'dark-text-secondary': '#8b92b8',
        'dark-accent': '#ff4757',
        'dark-accent-cyan': '#00d2ff',
        'dark-accent-green': '#2ed573',
        'dark-accent-orange': '#ffa502',
        'dark-border': '#363d5c',
      },
      borderRadius: {
        'neo': '16px',
        'neo-lg': '24px',
        'neo-xl': '32px',
      },
      boxShadow: {
        // Light neomorphic
        'neo-sm': '4px 4px 8px #c8cdd6, -4px -4px 8px #ffffff',
        'neo-md': '8px 8px 16px #c8cdd6, -8px -8px 16px #ffffff',
        'neo-lg': '12px 12px 24px #c0c6d0, -12px -12px 24px #ffffff',
        'neo-inset': 'inset 4px 4px 8px #c8cdd6, inset -4px -4px 8px #ffffff',
        'neo-inset-sm': 'inset 2px 2px 5px #c8cdd6, inset -2px -2px 5px #ffffff',
        'neo-pressed': 'inset 6px 6px 12px #c0c6d0, inset -6px -6px 12px #ffffff',
        // Dark neomorphic
        'dark-neo-sm': '4px 4px 8px #161929, -4px -4px 8px #262d47',
        'dark-neo-md': '8px 8px 16px #161929, -8px -8px 16px #262d47',
        'dark-neo-lg': '12px 12px 24px #141726, -12px -12px 24px #283050',
        'dark-neo-inset': 'inset 4px 4px 8px #161929, inset -4px -4px 8px #262d47',
        'dark-neo-pressed': 'inset 6px 6px 12px #141726, inset -6px -6px 12px #283050',
        // Glow
        'glow-red': '0 0 20px rgba(255, 71, 87, 0.4)',
        'glow-cyan': '0 0 20px rgba(0, 210, 255, 0.4)',
        'glow-green': '0 0 20px rgba(46, 213, 115, 0.4)',
      },
      fontFamily: {
        'display': "'Space Grotesk', 'Courier New', monospace",
        'mono': "'JetBrains Mono', 'Courier New', monospace",
        'body': "'DM Sans', 'Segoe UI', sans-serif",
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scan': 'scan 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}