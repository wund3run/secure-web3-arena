
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right"
      richColors
      closeButton
      expand
      toastOptions={{
        duration: 5000,
        className: "rounded-md border border-border bg-background text-foreground",
        descriptionClassName: "text-muted-foreground text-sm",
        // Remove the invalid properties, sonner doesn't support these directly
        // Use the style prop instead for consistent styling
        style: {
          // Add any custom styles if needed
        }
      }}
    />
  );
}
