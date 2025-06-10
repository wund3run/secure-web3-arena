
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f0f7ff",
          100: "#e0efff",
          200: "#b8dfff",
          300: "#78c7ff",
          400: "#5ba3f5",
          500: "#4a90e2",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#f0fdff",
          100: "#ccf7fe",
          200: "#99effd",
          300: "#5ce1fa",
          400: "#3dd8ff",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#f8f7ff",
          100: "#f0edff",
          200: "#e4deff",
          300: "#d1c7ff",
          400: "#b8a9ff",
          500: "#a78bfa",
          600: "#8b5cf6",
          700: "#7c3aed",
          800: "#6b46c1",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          50: "#f0fdf4",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          50: "#fffbeb",
          500: "#f59e0b",
          600: "#d97706",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
        },
        // Enhanced brand colors
        "brand-orange": {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#ff6b35",
          600: "#ea580c",
          700: "#c2410c",
        },
        // Blue-tinted neutrals instead of grey
        neutral: {
          50: "#f8fafe",
          100: "#f1f6fc",
          200: "#e6f0f8",
          300: "#d1e2f0",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'brand': '0 4px 20px rgba(74, 144, 226, 0.15)',
        'brand-lg': '0 8px 30px rgba(74, 144, 226, 0.2)',
        'brand-xl': '0 12px 40px rgba(74, 144, 226, 0.25)',
        'brand-glow': '0 0 30px rgba(74, 144, 226, 0.4)',
        'warm': '0 4px 20px rgba(255, 107, 53, 0.15)',
        'accent': '0 4px 20px rgba(167, 139, 250, 0.15)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #4a90e2, #a78bfa, #3dd8ff)',
        'brand-gradient-subtle': 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(167, 139, 250, 0.1), rgba(61, 216, 255, 0.1))',
        'brand-surface': 'linear-gradient(135deg, #f8fafe, #f0f7ff, #f0fdff)',
        'warm-gradient': 'linear-gradient(135deg, #fb923c, #4a90e2)',
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
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        gradient: {
          "0%, 100%": {
            "background-position": "0% 50%"
          },
          "50%": {
            "background-position": "100% 50%"
          }
        },
        "brand-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
        "gradient-shift": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "gradient": "gradient 3s ease-in-out infinite",
        "brand-float": "brand-float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "gradient-shift": "gradient-shift 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
