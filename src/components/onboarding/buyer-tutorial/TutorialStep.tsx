
import { CheckCircle } from "lucide-react";

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
      className={`p-4 border rounded-lg mb-4 ${completed ? 'border-primary/30 bg-primary/5' : 'border-border'} 
                 ${onClick ? 'cursor-pointer hover:border-primary/50 transition-colors' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`mr-4 rounded-full p-2 ${completed ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium mb-1 flex items-center">
            {title}
            {completed && <CheckCircle className="ml-2 h-4 w-4 text-primary" />}
          </h3>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
    </div>
  );
}
