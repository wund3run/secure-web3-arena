
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
        className: "rounded-md border border-border bg-background text-foreground accessible-toast",
        descriptionClassName: "text-muted-foreground text-sm",
        actionButtonStyle: {
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)"
        },
        cancelButtonStyle: {
          backgroundColor: "var(--muted)",
          color: "var(--muted-foreground)"
        }
      }}
    />
  );
}
