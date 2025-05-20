
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BoldIcon,
  MoonIcon,
  SunIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessibilityMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AccessibilityMenu({ open, onOpenChange }: AccessibilityMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Use controlled or uncontrolled state
  const isDialogOpen = open !== undefined ? open : isOpen;
  const handleOpenChange = onOpenChange || setIsOpen;

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast");
  };

  const toggleLargeText = () => {
    setLargeText(!largeText);
    document.documentElement.classList.toggle("large-text");
  };

  const toggleReduceMotion = () => {
    setReduceMotion(!reduceMotion);
    document.documentElement.classList.toggle("reduce-motion");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
          <DialogDescription>
            Customize your experience to make the site more accessible for your needs.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">High Contrast</h3>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better text visibility
              </p>
            </div>
            <Button
              variant={highContrast ? "default" : "outline"}
              size="sm"
              onClick={toggleHighContrast}
              className={cn(
                "w-14",
                highContrast && "bg-primary text-primary-foreground"
              )}
            >
              {highContrast ? "On" : "Off"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Large Text</h3>
              <p className="text-sm text-muted-foreground">
                Increase font size throughout the site
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  if (largeText) {
                    toggleLargeText();
                  }
                }}
                disabled={!largeText}
                className="w-8 h-8 text-xs"
              >
                <ZoomOutIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  if (!largeText) {
                    toggleLargeText();
                  }
                }}
                disabled={largeText}
                className="w-8 h-8 text-xs"
              >
                <ZoomInIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Reduce Motion</h3>
              <p className="text-sm text-muted-foreground">
                Minimize animations throughout the site
              </p>
            </div>
            <Button
              variant={reduceMotion ? "default" : "outline"}
              size="sm"
              onClick={toggleReduceMotion}
              className={cn(
                "w-14",
                reduceMotion && "bg-primary text-primary-foreground"
              )}
            >
              {reduceMotion ? "On" : "Off"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="w-20"
            >
              {theme === "light" ? (
                <>
                  <MoonIcon className="mr-2 h-4 w-4" /> Dark
                </>
              ) : (
                <>
                  <SunIcon className="mr-2 h-4 w-4" /> Light
                </>
              )}
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => handleOpenChange(false)}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
