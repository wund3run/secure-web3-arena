
import { useState } from "react";
import { OnboardingContentRefactored } from "./OnboardingContentRefactored";

interface OnboardingContentProps {
  isMobile: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingContent({ isMobile, onOpenChange }: OnboardingContentProps) {
  // Simply use the refactored component to maintain the same API
  return OnboardingContentRefactored({ isMobile, onOpenChange });
}
