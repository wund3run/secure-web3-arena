import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent gradient-primary text-white hover:opacity-80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:
          "text-foreground border-primary/30 hover:bg-primary/5",
        success:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200/80",
        warning:
          "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200/80",
        brand:
          "gradient-primary text-white border-0 hawk-shadow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
) 