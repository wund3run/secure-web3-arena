
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface MobileCardContentProps {
  title: string;
  description: string;
  provider: {
    name: string;
    securityScore: number;
    verificationLevel: string;
    completedProjects: number;
  };
  category: string;
  tags: string[];
}

export function MobileCardContent({
  title,
  description,
  provider,
  category,
  tags
}: MobileCardContentProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold line-clamp-1">{title}</h3>
      
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      
      <div className="flex items-center space-x-2 text-xs">
        <span className="font-medium">{provider.name}</span>
        <span className="text-muted-foreground">•</span>
        <div className="flex items-center">
          <Shield className="h-3 w-3 mr-1" />
          <span>{provider.securityScore}% secure</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mt-2">
        {tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
