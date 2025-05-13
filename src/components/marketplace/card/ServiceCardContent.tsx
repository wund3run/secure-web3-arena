
import { BadgeCheck, Users, Clock } from "lucide-react";

interface ServiceCardContentProps {
  title: string;
  description: string;
  provider: {
    name: string;
    isVerified: boolean;
  };
  completedJobs: number;
  tags: string[];
  responseTime?: string;
}

export function ServiceCardContent({
  title,
  description,
  provider,
  completedJobs,
  tags,
  responseTime = "24h"
}: ServiceCardContentProps) {
  return (
    <div className="p-5 flex-grow">
      <div className="flex items-center gap-1 mb-3">
        <span className="text-sm font-medium">Provider:</span>
        <span className="text-sm font-bold">{provider.name}</span>
        {provider.isVerified && (
          <BadgeCheck className="h-4 w-4 text-web3-teal ml-1" />
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.slice(0, 3).map((tag) => (
          <span 
            key={tag} 
            className="inline-flex bg-primary/5 border border-primary/20 text-primary-foreground px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="inline-flex bg-muted/80 text-muted-foreground px-2 py-0.5 rounded-full text-xs font-medium shadow-sm">
            +{tags.length - 3} more
          </span>
        )}
      </div>
      
      <h3 className="font-bold text-lg mb-3 line-clamp-2 min-h-[3.5rem]">{title}</h3>
      
      <div className="mb-4 text-sm text-muted-foreground line-clamp-3 min-h-[4.5rem]">
        {description}
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground mb-3">
        <Users className="h-4 w-4 mr-1" />
        <span className="font-medium">{completedJobs} completed</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="rounded-full bg-primary/10 text-primary-foreground px-3 py-1 text-xs uppercase font-semibold tracking-wide">
          {tags[0]}
        </div>
      </div>
    </div>
  );
}
