
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { BoldIcon, Type, Sun, Moon, PanelLeft } from "lucide-react"; // Fixed FontBoldIcon to BoldIcon

interface AccessibilityMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AccessibilityMenu({ open, onOpenChange }: AccessibilityMenuProps) {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}%`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast-mode");
  };

  const toggleDyslexiaFont = () => {
    setDyslexiaFont(!dyslexiaFont);
    document.documentElement.classList.toggle("dyslexia-friendly");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PanelLeft className="h-5 w-5" />
            Accessibility Options
          </DialogTitle>
          <DialogDescription>
            Customize the website to improve your experience
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <h3 className="mb-3 text-sm font-medium">Text Size</h3>
            <div className="flex items-center gap-4">
              <Type className="h-4 w-4" />
              <Slider
                value={[fontSize]}
                min={75}
                max={150}
                step={5}
                onValueChange={handleFontSizeChange}
                className="flex-1"
              />
              <Type className="h-6 w-6" />
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">
              Current: {fontSize}%
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={highContrast ? "default" : "outline"}
                    size="sm"
                    onClick={toggleHighContrast}
                    className="flex-1"
                  >
                    {highContrast ? <Sun /> : <Moon />}
                    <span className="ml-2">High Contrast</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Increase color contrast for better readability</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={dyslexiaFont ? "default" : "outline"}
                    size="sm"
                    onClick={toggleDyslexiaFont}
                    className="flex-1"
                  >
                    <BoldIcon />
                    <span className="ml-2">Dyslexia Font</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Use a font that's easier to read for people with dyslexia</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
