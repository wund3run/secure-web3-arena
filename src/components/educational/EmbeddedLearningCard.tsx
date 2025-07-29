
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, Info } from "lucide-react";
import { cn } from '@/lib/utils';

export interface LearningResource {
  title: string;
  description: string;
  type: 'article' | 'video' | 'tutorial' | 'guide' | 'documentation';
  url?: string;
  readingTime?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
}

export interface EmbeddedLearningCardProps {
  title: string;
  description?: string;
  contextual?: boolean;
  resources: LearningResource[];
  className?: string;
  compact?: boolean;
}

export function EmbeddedLearningCard({
  title,
  description,
  contextual = true,
  resources,
  className,
  compact = false
}: EmbeddedLearningCardProps) {
  const [expanded, setExpanded] = useState(!compact);
  
  return (
    <Card className={cn(
      "overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-background",
      contextual ? "border-l-4 border-l-primary" : "",
      className
    )}>
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <CardHeader className={cn("pb-3", compact ? "p-4" : "")}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-primary mr-2" />
              <CardTitle className={cn(
                compact ? "text-base" : "text-lg"
              )}>
                {title}
              </CardTitle>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          {description && !compact && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className={cn(compact ? "p-4 pt-0" : "")}>
            <div className="space-y-3">
              {resources.map((resource, index) => (
                <div 
                  key={index} 
                  className="flex flex-col border rounded-md p-3 bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary flex-shrink-0" />
                      <h3 className="font-medium">{resource.title}</h3>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 text-xs">
                      {resource.level && (
                        <Badge variant="secondary" className="capitalize text-xs">
                          {resource.level}
                        </Badge>
                      )}
                      {resource.readingTime && (
                        <span className="text-muted-foreground">
                          {resource.readingTime} read
                        </span>
                      )}
                    </div>
                    
                    {resource.url && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <span className="text-xs">Learn more</span>
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className={cn("pt-0", compact ? "p-4" : "")}>
            <Button variant="link" className="text-sm p-0" asChild>
              <a href="/security-insights">
                Browse all security learning resources
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
