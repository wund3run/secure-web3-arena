
import { CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TutorialStepProps {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  completed?: boolean;
  onClick?: () => void;
}

export function TutorialStep({ title, description, icon, completed = false, onClick }: TutorialStepProps) {
  return (
    <div 
      className={`p-4 border rounded-lg mb-4 relative transition-all duration-200 
                ${completed ? 'border-primary/30 bg-primary/5' : 'border-border'} 
                ${onClick ? 'cursor-pointer hover:border-primary/50 hover:shadow-sm' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`mr-4 p-2 rounded-full ${completed ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
          {icon}
        </div>
        <div className="flex-1 pr-6">
          <h3 className="font-medium mb-1 flex items-center">
            {title}
            {completed && <CheckCircle className="ml-2 h-4 w-4 text-primary" />}
          </h3>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
        {onClick && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center self-center">
                  <div className="p-1 rounded-full hover:bg-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>View details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
