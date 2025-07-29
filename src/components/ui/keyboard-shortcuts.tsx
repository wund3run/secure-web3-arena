
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";
import { Button } from "./button";

interface ShortcutItem {
  keys: string[];
  description: string;
  category: string;
}

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  
  const shortcuts: ShortcutItem[] = [
    // Navigation
    { keys: ["Alt", "S"], description: "Skip to main content", category: "Navigation" },
    { keys: ["Alt", "A"], description: "Open accessibility menu", category: "Navigation" },
    { keys: ["Tab"], description: "Move to next focusable element", category: "Navigation" },
    { keys: ["Shift", "Tab"], description: "Move to previous focusable element", category: "Navigation" },
    
    // UI Interaction
    { keys: ["Space", "Enter"], description: "Activate buttons, links, etc.", category: "Interaction" },
    { keys: ["Esc"], description: "Close dialogs, modals, or menus", category: "Interaction" },
    
    // Form Controls
    { keys: ["Space"], description: "Toggle checkboxes/radio buttons", category: "Forms" },
    { keys: ["↑", "↓"], description: "Navigate dropdown options", category: "Forms" },
  ];
  
  // Group shortcuts by category
  const categories = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, ShortcutItem[]>);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Keyboard className="h-4 w-4" />
          <span>Keyboard Shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            These shortcuts help navigate the platform more efficiently.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {Object.entries(categories).map(([category, shortcuts]) => (
            <div key={category}>
              <h3 className="font-medium mb-2">{category}</h3>
              <div className="space-y-2">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <kbd 
                          key={keyIndex} 
                          className="px-2 py-1 text-xs bg-muted rounded border border-border font-mono"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
