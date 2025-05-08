
import { BadgeCheck, Clock, Users } from "lucide-react";

interface ServiceCardContentProps {
  title: string;
  description: string;
  provider: {
    name: string;
    isVerified: boolean;
  };
  completedJobs: number;
  tags: string[];
  responseTime: string;
  category: string;
}

export function ServiceCardContent({
  title,
  description,
  provider,
  completedJobs,
  tags,
  responseTime,
  category
}: ServiceCardContentProps) {
  return (
    <div className="p-5 flex-grow">
      <h3 className="font-bold text-lg mb-3 line-clamp-2 min-h-[3.5rem]">{title}</h3>
      
      <div className="mb-4 text-sm text-muted-foreground line-clamp-3 min-h-[4.5rem]">
        {description}
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium">Provider:</span>
          <span className="text-sm">{provider.name}</span>
          {provider.isVerified && (
            <BadgeCheck className="h-4 w-4 text-web3-teal ml-1" />
          )}
        </div>
        
        <div className="flex items-center text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full">
          <Clock className="h-3 w-3 mr-1" />
          <span>{responseTime} response</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
        {tags.slice(0, 3).map((tag) => (
          <span 
            key={tag} 
            className="inline-flex bg-secondary/30 border border-secondary/40 text-secondary-foreground px-2.5 py-0.5 rounded-md text-xs font-medium shadow-sm"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="inline-flex bg-muted/80 text-muted-foreground px-2.5 py-0.5 rounded-md text-xs font-medium shadow-sm">
            +{tags.length - 3} more
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>{completedJobs} completed</span>
        </div>
        <div>
          <span className="text-xs uppercase bg-primary/20 text-primary px-2.5 py-1 rounded-full font-medium">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}
