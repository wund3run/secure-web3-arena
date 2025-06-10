
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
        
        // Official Hawkly Brand Colors
        hawkly: {
          primary: "hsl(var(--hawkly-primary))",
          secondary: "hsl(var(--hawkly-secondary))",
          accent: "hsl(var(--hawkly-accent))",
          orange: "hsl(var(--hawkly-orange))",
          success: "hsl(var(--hawkly-success))",
          warning: "hsl(var(--hawkly-warning))",
          error: "hsl(var(--hawkly-error))",
          info: "hsl(var(--hawkly-info))",
        },
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
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
      backgroundImage: {
        "hawkly-primary": "linear-gradient(135deg, hsl(var(--hawkly-primary)), hsl(var(--hawkly-secondary)))",
        "hawkly-accent": "linear-gradient(135deg, hsl(var(--hawkly-accent)), hsl(var(--hawkly-orange)))",
        "hawkly-hero": "linear-gradient(135deg, hsl(var(--background)), hsl(var(--hawkly-primary) / 0.1))",
      },
      boxShadow: {
        'hawkly': '0 4px 20px hsl(var(--hawkly-primary) / 0.15)',
        'hawkly-lg': '0 8px 32px hsl(var(--hawkly-primary) / 0.2)',
        'hawkly-xl': '0 12px 40px hsl(var(--hawkly-primary) / 0.25)',
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
        hawklyFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        hawklyGlow: {
          "0%, 100%": { "box-shadow": "0 0 0 0 hsl(var(--hawkly-primary) / 0.4)" },
          "70%": { "box-shadow": "0 0 0 10px hsl(var(--hawkly-primary) / 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "hawkly-float": "hawklyFloat 6s ease-in-out infinite",
        "hawkly-glow": "hawklyGlow 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
