
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Thèmes personnalisés
        theme: {
          navy: '#344E79',
          blue: '#90B7CF',
          teal: '#B3DDCD',
          mint: '#D0E7DA',
          pink: '#E8BED3',
          purple: {
            light: '#9b87f5',
            dark: '#6E59A5'
          },
          green: {
            light: '#7CD992',
            dark: '#2C9D4E'
          },
          // Couleurs Teko
          teko: {
            black: '#0d0d0d',
            white: '#ffffff',
            gray: {
              light: '#f5f5f5',
              medium: '#888888',
              dark: '#333333'
            }
          },
          // Couleurs Robot
          robot: {
            primary: '#9b87f5',     // Violet primaire
            secondary: '#8B5CF6',   // Violet secondaire
            dark: {
              primary: '#111827',   // Fond principal sombre
              secondary: '#1A1F2C'  // Fond secondaire sombre
            },
            accent: '#6E59A5',      // Accent violet foncé
            neutral: {
              light: '#f5f5f5',
              medium: '#888888',
              dark: '#333333'
            }
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'blur-in': {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 2px)' },
          '40%': { transform: 'translate(-3px, -2px)' },
          '60%': { transform: 'translate(3px, 2px)' },
          '80%': { transform: 'translate(3px, -2px)' },
          '100%': { transform: 'translate(0)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'blur-in': 'blur-in 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 10s infinite'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 10px -3px rgba(0, 0, 0, 0.05)',
        'elegant': '0 15px 20px -5px rgba(0, 0, 0, 0.03)',
        'feature': '0 0 15px rgba(0, 0, 0, 0.03)',
        'teko': '0 15px 30px rgba(0, 0, 0, 0.25)',
        'robot': '0 10px 30px rgba(155, 135, 245, 0.15)'
      },
      backgroundImage: {
        'dot-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        'scanlines': "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.1) 50%)",
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23222' d='M0 0h60v60H0z'/%3E%3Cpath d='M60 0H0v60h60V0zM4 4h52v52H4V4z' fill='%23333' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E\")"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
