import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/presentation/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/presentation/layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui'],
      serif: ['Playwrite US Modern', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    extend: {
      fontSize: {
        xs: '.85rem',
        xxs: '.675rem',
        xxl: '1.7rem',
      },
      colors: {
        light: 'var(--color-light)',
        dark: 'var(--color-dark)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        accentLight: 'var(--color-accent-light)',
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};

export default config;
