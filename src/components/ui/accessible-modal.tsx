
import React, { useRef, useEffect } from "react";
import { 
  Dialog,
  DialogPortal,
  DialogOverlay, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { FocusTrap } from "@/components/ui/focus-trap";
import { X } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface AccessibleModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  returnFocusRef?: React.RefObject<HTMLElement>;
}

export function AccessibleModal({
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  className,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  showCloseButton = true,
  initialFocusRef,
  returnFocusRef,
}: AccessibleModalProps) {
  // Store the element that had focus when the modal was opened
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  // Handle keyboard events
  useEffect(() => {
    if (!open) return;
    
    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;
    
    // Add escape key handler if needed
    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") {
        onOpenChange(false);
      }
    };
    
    if (closeOnEscape) {
      document.addEventListener("keydown", handleKeyDown);
    }
    
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("keydown", handleKeyDown);
      
      // Return focus when closing
      if (returnFocusRef && returnFocusRef.current) {
        returnFocusRef.current.focus();
      } else if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [open, closeOnEscape, onOpenChange, returnFocusRef]);
  
  return (
    <Dialog open={open} onOpenChange={closeOnOutsideClick ? onOpenChange : undefined}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogContent 
          className={cn("focus:outline-none", className)}
          onEscapeKeyDown={closeOnEscape ? undefined : (e) => e.preventDefault()}
          onPointerDownOutside={closeOnOutsideClick ? undefined : (e) => e.preventDefault()}
          onInteractOutside={closeOnOutsideClick ? undefined : (e) => e.preventDefault()}
        >
          <FocusTrap active={open} initialFocus={initialFocusRef}>
            <div className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                {description && <DialogDescription>{description}</DialogDescription>}
              </DialogHeader>
              
              <div className="mt-4">{children}</div>
              
              {footer && <DialogFooter>{footer}</DialogFooter>}
              
              {showCloseButton && (
                <DialogClose asChild>
                  <Button
                    className="absolute right-4 top-4"
                    variant="ghost"
                    size="icon"
                    aria-label="Close dialog"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogClose>
              )}
            </div>
          </FocusTrap>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
