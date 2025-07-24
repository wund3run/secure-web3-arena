import type { Config } from "tailwindcss";

const config: Config = {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Design System Colors
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'sidebar': 'var(--sidebar)',
        'surface': 'var(--surface)',
        'card': 'var(--card)',
        'border': 'var(--border)',
        'elevation1': 'var(--elevation1)',
        
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-disabled': 'var(--text-disabled)',
        'text-inverse': 'var(--text-inverse)',
        
        'error': 'var(--error)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'info': 'var(--info)',
        
        // Legacy Tailwind Colors for compatibility
        background: 'var(--bg-primary)',
        foreground: 'var(--text-primary)',
        
        primary: {
          DEFAULT: 'var(--accent-primary)',
          foreground: 'white',
        },
        secondary: {
          DEFAULT: 'var(--accent-secondary)',
          foreground: 'white',
        },
        accent: {
          DEFAULT: 'var(--accent-primary)',
          foreground: 'white',
        },
        destructive: {
          DEFAULT: 'var(--error)',
          foreground: 'white',
        },
        muted: {
          DEFAULT: 'var(--bg-secondary)',
          foreground: 'var(--text-secondary)',
        },
        popover: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--text-primary)',
        },
        input: 'var(--surface)',
        ring: 'var(--accent-secondary)',
      },
      borderRadius: {
        'small': 'var(--radius-small)',
        'medium': 'var(--radius-medium)',
        'large': 'var(--radius-large)',
        'full': 'var(--radius-full)',
        // Legacy for compatibility
        lg: 'var(--radius-medium)',
        md: 'var(--radius-small)',
        sm: 'calc(var(--radius-small) - 2px)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': 'var(--font-display)',
        'h1': 'var(--font-h1)',
        'h2': 'var(--font-h2)',
        'h3': 'var(--font-h3)',
        'body-large': 'var(--font-body-large)',
        'body': 'var(--font-body)',
        'body-small': 'var(--font-body-small)',
        'caption': 'var(--font-caption)',
      },
      spacing: {
        '0': 'var(--spacing-0)',
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '7': 'var(--spacing-7)',
        '8': 'var(--spacing-8)',
        'navbar': 'var(--navbar-height)',
        'sidebar': 'var(--sidebar-width)',
        'gutter': 'var(--gutter)',
      },
      maxWidth: {
        'content': 'var(--content-max-width)',
      },
      backgroundImage: {
        'gradient': 'var(--bg-gradient)',
        'button-primary': 'var(--button-primary)',
        'button-hover': 'var(--button-hover)',
        'glass': 'var(--glass-bg)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      boxShadow: {
        'card': 'var(--card-shadow-strong)',
        'glow': 'var(--card-shadow-glow)',
        'accent': 'var(--accent-glow)',
        'focus': 'var(--focus-ring)',
      },
      transitionTimingFunction: {
        'hover': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--accent-glow-purple)" },
          "70%": { boxShadow: "0 0 0 10px transparent" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "glow-pulse": "glow-pulse 2s infinite",
        "shimmer": "shimmer 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
