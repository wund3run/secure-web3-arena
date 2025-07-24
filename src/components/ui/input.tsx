import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex w-full border",
          "bg-[#181e2c] border-[1.5px] border-[#23283e] text-[#f8f9fb]",
          "rounded-[0.5rem] px-[1.2rem] py-[0.85rem] text-base font-medium",
          "placeholder-[#8391ad]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#32d9fa] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={{
          fontFamily: "'Space Grotesk', Arial, sans-serif",
          transition: 'all 0.23s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
