
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right"
      richColors
      closeButton
      expand
      // Add more consistent styling
      toastOptions={{
        duration: 5000,
        className: "rounded-md border border-border bg-background text-foreground",
        descriptionClassName: "text-muted-foreground text-sm",
        actionButtonClassName: "bg-primary text-primary-foreground hover:bg-primary/90",
        cancelButtonClassName: "bg-muted text-muted-foreground hover:bg-muted/80",
      }}
    />
  );
}
