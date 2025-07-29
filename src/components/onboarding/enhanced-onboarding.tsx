
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { OnboardingContent } from "./components/OnboardingContent";

interface EnhancedOnboardingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnhancedOnboarding({ open, onOpenChange }: EnhancedOnboardingProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Get the content elements from the OnboardingContent component
  const { contentTitle, contentDescription, renderContent, renderTrustIndicators } = OnboardingContent({ 
    isMobile, 
    onOpenChange 
  });

  // Render component based on screen size
  const Component = isMobile ? Drawer : Dialog;
  const ComponentContent = isMobile ? DrawerContent : DialogContent;
  
  const renderContentWithTitle = (title: string, description: string | null, content: React.ReactNode) => {
    return (
      <>
        {isMobile ? (
          <DrawerHeader className="text-center">
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
        ) : null}
        <div className="px-4 pb-4">
          {content}
        </div>
      </>
    );
  };

  return (
    <Component open={open} onOpenChange={onOpenChange}>
      <ComponentContent className={isMobile ? "" : "max-w-lg sm:max-w-xl p-6"}>
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 z-10" 
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        
        {renderContentWithTitle(
          contentTitle,
          contentDescription,
          renderContent()
        )}
        
        {renderTrustIndicators()}
      </ComponentContent>
    </Component>
  );
}
