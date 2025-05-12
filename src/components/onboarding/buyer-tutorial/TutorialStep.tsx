
import { CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TutorialStepProps {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  completed?: boolean;
  onClick?: () => void;
  id?: string;
  active?: boolean;
}

export function TutorialStep({ 
  title, 
  description, 
  icon, 
  completed = false, 
  onClick, 
  id,
  active = false
}: TutorialStepProps) {
  return (
    <div 
      id={id}
      className={cn(
        "p-5 border rounded-lg mb-4 relative transition-all duration-200",
        completed ? "border-primary/30 bg-primary/5" : "border-border",
        active ? "ring-2 ring-primary/30 shadow-sm" : "",
        onClick ? "cursor-pointer hover:border-primary/50 hover:shadow-sm" : ""
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-2.5 rounded-full flex items-center justify-center flex-shrink-0",
          completed ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            {title}
            {completed && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
          </h3>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
        {onClick && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center self-center">
                  <div className="p-1.5 rounded-full hover:bg-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{active ? 'Hide details' : 'View details'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
