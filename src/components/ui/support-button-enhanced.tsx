
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  HelpCircle, 
  MessageSquare, 
  FileQuestion,
  Accessibility,
  ExternalLink
} from "lucide-react";
import { AccessibilityMenu } from "./accessibility-menu";
import { cn } from "@/lib/utils";

export function SupportButtonEnhanced() {
  const [supportOpen, setSupportOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  return (
    <>
      <Popover open={supportOpen} onOpenChange={setSupportOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg transition-all hover:shadow-md",
              supportOpen ? "bg-primary text-primary-foreground" : "bg-card"
            )}
            aria-label="Support and accessibility options"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 p-2"
          align="end"
          side="top"
          sideOffset={20}
        >
          <div className="grid gap-1">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 text-sm"
              aria-label="Contact support"
            >
              <MessageSquare className="h-4 w-4" />
              Contact Support
            </Button>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 text-sm"
              aria-label="View documentation"
              asChild
            >
              <a href="/documentation" target="_blank" rel="noopener noreferrer">
                <FileQuestion className="h-4 w-4" />
                Documentation
                <ExternalLink className="ml-auto h-3 w-3 opacity-70" />
              </a>
            </Button>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 text-sm"
              onClick={() => {
                setSupportOpen(false);
                setAccessibilityOpen(true);
              }}
              aria-label="Accessibility settings"
            >
              <Accessibility className="h-4 w-4" />
              Accessibility
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      <AccessibilityMenu
        open={accessibilityOpen}
        onOpenChange={setAccessibilityOpen}
      />
    </>
  );
}
