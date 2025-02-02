/** @type {import('tailwindcss').Config} */
import { type Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '16px',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      fontFamily: {
        title: ['Fraunces', 'serif'],
        heading: ['Fraunces', 'serif'],
        label: ['Outfit', 'sans-serif'],
        small: ['Outfit', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        button: ['Outfit', 'sans-serif'],
        input: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        title: '48px',
        'heading-lg': '32px',
        'heading-md': '24px',
        'body-lg': '18px',
        'body-md': '14px',
      },
      lineHeight: {
        title: '56px',
        'heading-lg': '40px',
        'heading-md': '32px',
        'body-lg': '24px',
        'body-md': '18px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
        '40': '160px',
        '48': '192px',
        '56': '224px',
        '64': '256px',
        headerHeightMobile: '56px',
        headerHeightDesktop: '72px',
        sunGraphicDiameterMobile: '80px',
        sunGraphicDiameterDesktop: '100px',
        maxWidth: '600px',
      },
    },
  },
  plugins: [],
};

export default config;
