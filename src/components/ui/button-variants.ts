import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    // Base button styles from design.json
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-medium font-bold text-base uppercase transition-hover",
    "focus-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-[0.53] cursor-pointer select-none relative overflow-hidden",
    "font-[Space Grotesk,sans-serif] px-[2rem] py-[0.75rem]",
    "text-[1rem]",
    "border-none",
    "tracking-normal",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-button-primary text-white",
          "shadow-card",
          "hover:bg-button-hover hover:shadow-glow hover:-translate-y-0.5",
          "active:scale-[0.98]",
        ].join(" "),
        ghost: [
          "bg-transparent text-accent-primary",
          "hover:bg-[rgba(168,121,239,0.07)]",
        ].join(" "),
        outline: [
          "bg-transparent border border-accent-primary text-accent-primary",
          "hover:bg-[rgba(168,121,239,0.07)] hover:border-accent-secondary",
        ].join(" "),
        destructive: [
          "bg-error text-white",
          "hover:bg-error/80",
        ].join(" "),
        secondary: [
          "bg-surface text-accent-primary",
          "hover:bg-elevation1 hover:text-accent-secondary",
        ].join(" "),
        link: [
          "bg-transparent text-accent-primary underline underline-offset-4",
          "hover:text-accent-secondary",
        ].join(" "),
      },
      size: {
        default: "h-12 px-[2rem] py-[0.75rem] text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-3 text-lg",
        icon: "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
