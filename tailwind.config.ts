
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
				'2xl': '1400px'
			}
		},
		fontFamily: {
			sans: [
				'Inter', 
				'-apple-system', 
				'BlinkMacSystemFont', 
				'Segoe UI', 
				'Roboto', 
				'Oxygen', 
				'Ubuntu', 
				'Cantarell', 
				'sans-serif'
			],
			mono: [
				'JetBrains Mono', 
				'Menlo', 
				'Monaco', 
				'Consolas', 
				'Liberation Mono', 
				'Courier New', 
				'monospace'
			],
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
					foreground: 'hsl(var(--primary-foreground))',
					50: 'var(--color-primary-50)',
					100: 'var(--color-primary-100)',
					200: 'var(--color-primary-200)',
					300: 'var(--color-primary-300)',
					400: 'var(--color-primary-400)',
					500: 'var(--color-primary-500)',
					600: 'var(--color-primary-600)',
					700: 'var(--color-primary-700)',
					800: 'var(--color-primary-800)',
					900: 'var(--color-primary-900)',
					950: 'var(--color-primary-950)',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					50: 'var(--color-secondary-50)',
					100: 'var(--color-secondary-100)',
					200: 'var(--color-secondary-200)',
					300: 'var(--color-secondary-300)',
					400: 'var(--color-secondary-400)',
					500: 'var(--color-secondary-500)',
					600: 'var(--color-secondary-600)',
					700: 'var(--color-secondary-700)',
					800: 'var(--color-secondary-800)',
					900: 'var(--color-secondary-900)',
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
				// Enhanced semantic colors
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					50: 'var(--color-success-50)',
					500: 'var(--color-success-500)',
					600: 'var(--color-success-600)',
					700: 'var(--color-success-700)',
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					50: 'var(--color-warning-50)',
					500: 'var(--color-warning-500)',
					600: 'var(--color-warning-600)',
					700: 'var(--color-warning-700)',
				},
				error: {
					DEFAULT: 'hsl(var(--error))',
					foreground: 'hsl(var(--error-foreground))',
					50: 'var(--color-error-50)',
					500: 'var(--color-error-500)',
					600: 'var(--color-error-600)',
					700: 'var(--color-error-700)',
				},
				// Modern neutral palette
				neutral: {
					50: 'var(--color-neutral-50)',
					100: 'var(--color-neutral-100)',
					200: 'var(--color-neutral-200)',
					300: 'var(--color-neutral-300)',
					400: 'var(--color-neutral-400)',
					500: 'var(--color-neutral-500)',
					600: 'var(--color-neutral-600)',
					700: 'var(--color-neutral-700)',
					800: 'var(--color-neutral-800)',
					900: 'var(--color-neutral-900)',
					950: 'var(--color-neutral-950)',
				},
				// Web3 specific colors
				web3: {
					purple: {
						DEFAULT: '#5E35B1',
						light: '#7E57C2',
						dark: '#4527A0'
					},
					teal: {
						DEFAULT: '#00BCD4',
						light: '#4DD0E1',
						dark: '#0097A7'
					},
					orange: {
						DEFAULT: '#FF5722',
						light: '#FF8A65',
						dark: '#E64A19'
					},
					background: {
						DEFAULT: '#1A1F2C',
						light: '#2D3748'
					}
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				// Modern radius scale
				none: 'var(--radius-none)',
				xs: 'var(--radius-sm)',
				base: 'var(--radius-base)',
				xl: 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)',
				'3xl': 'var(--radius-3xl)',
				full: 'var(--radius-full)',
			},
			spacing: {
				// Enhanced spacing scale based on modern design tokens
				'0.5': 'var(--space-0-5)',
				'1.5': 'var(--space-1-5)',
				'2.5': 'var(--space-2-5)',
				'3.5': 'var(--space-3-5)',
				'18': 'var(--space-18)',
				'72': 'var(--space-72)',
				'84': 'var(--space-84)',
				'96': 'var(--space-96)',
			},
			fontSize: {
				// Modern typography scale
				'2xs': ['0.625rem', { lineHeight: '0.75rem' }],
				xs: ['var(--font-size-xs)', { lineHeight: 'var(--line-height-tight)' }],
				sm: ['var(--font-size-sm)', { lineHeight: 'var(--line-height-snug)' }],
				base: ['var(--font-size-base)', { lineHeight: 'var(--line-height-normal)' }],
				lg: ['var(--font-size-lg)', { lineHeight: 'var(--line-height-normal)' }],
				xl: ['var(--font-size-xl)', { lineHeight: 'var(--line-height-normal)' }],
				'2xl': ['var(--font-size-2xl)', { lineHeight: 'var(--line-height-tight)' }],
				'3xl': ['var(--font-size-3xl)', { lineHeight: 'var(--line-height-tight)' }],
				'4xl': ['var(--font-size-4xl)', { lineHeight: 'var(--line-height-tight)' }],
				'5xl': ['var(--font-size-5xl)', { lineHeight: 'var(--line-height-tight)' }],
				'6xl': ['var(--font-size-6xl)', { lineHeight: 'var(--line-height-tight)' }],
				'7xl': ['var(--font-size-7xl)', { lineHeight: 'var(--line-height-tight)' }],
			},
			fontWeight: {
				light: 'var(--font-weight-light)',
				normal: 'var(--font-weight-normal)',
				medium: 'var(--font-weight-medium)',
				semibold: 'var(--font-weight-semibold)',
				bold: 'var(--font-weight-bold)',
				extrabold: 'var(--font-weight-extrabold)',
				black: 'var(--font-weight-black)',
			},
			lineHeight: {
				tight: 'var(--line-height-tight)',
				snug: 'var(--line-height-snug)',
				normal: 'var(--line-height-normal)',
				relaxed: 'var(--line-height-relaxed)',
				loose: 'var(--line-height-loose)',
			},
			boxShadow: {
				// Modern shadow system
				xs: 'var(--shadow-xs)',
				sm: 'var(--shadow-sm)',
				base: 'var(--shadow-base)',
				md: 'var(--shadow-md)',
				lg: 'var(--shadow-lg)',
				xl: 'var(--shadow-xl)',
				'2xl': 'var(--shadow-2xl)',
				inner: 'var(--shadow-inner)',
			},
			transitionDuration: {
				75: 'var(--duration-75)',
				100: 'var(--duration-100)',
				150: 'var(--duration-150)',
				200: 'var(--duration-200)',
				300: 'var(--duration-300)',
				500: 'var(--duration-500)',
				700: 'var(--duration-700)',
				1000: 'var(--duration-1000)',
			},
			transitionTimingFunction: {
				'ease-linear': 'var(--ease-linear)',
				'ease-out': 'var(--ease-out)',
				'ease-in': 'var(--ease-in)',
				'ease-in-out': 'var(--ease-in-out)',
			},
			zIndex: {
				hide: 'var(--z-hide)',
				auto: 'var(--z-auto)',
				base: 'var(--z-base)',
				docked: 'var(--z-docked)',
				dropdown: 'var(--z-dropdown)',
				sticky: 'var(--z-sticky)',
				banner: 'var(--z-banner)',
				overlay: 'var(--z-overlay)',
				modal: 'var(--z-modal)',
				popover: 'var(--z-popover)',
				skipLink: 'var(--z-skipLink)',
				toast: 'var(--z-toast)',
				tooltip: 'var(--z-tooltip)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': { 
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': { 
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-in-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite'
			},
			backdropBlur: {
				xs: '2px',
				sm: '4px',
				md: '8px',
				lg: '12px',
				xl: '16px',
				'2xl': '24px',
				'3xl': '40px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
