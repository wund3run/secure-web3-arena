
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import {
  Eye,
  MousePointerClick,
  Type,
  Settings,
  Volume2,
  MessageSquare
} from 'lucide-react';

export function AccessibilityMenu() {
  const {
    highContrast,
    largeText,
    focusVisible,
    reducedMotion,
    screenReaderFriendly,
    toggleHighContrast,
    toggleLargeText,
    toggleFocusVisible,
    toggleReducedMotion,
    toggleScreenReaderFriendly
  } = useAccessibility();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Accessibility Options">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={toggleHighContrast}>
          <Eye className="mr-2 h-4 w-4" />
          {highContrast ? 'Disable' : 'Enable'} High Contrast
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleLargeText}>
          <Type className="mr-2 h-4 w-4" />
          {largeText ? 'Disable' : 'Enable'} Large Text
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleFocusVisible}>
          <MousePointerClick className="mr-2 h-4 w-4" />
          {focusVisible ? 'Disable' : 'Enable'} Focus Indicators
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleReducedMotion}>
          <Volume2 className="mr-2 h-4 w-4" />
          {reducedMotion ? 'Disable' : 'Enable'} Reduced Motion
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleScreenReaderFriendly}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {screenReaderFriendly ? 'Disable' : 'Enable'} Screen Reader Mode
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
