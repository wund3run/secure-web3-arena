
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, BookOpen, MessageSquare, Video } from 'lucide-react';

interface HelpItem {
  title: string;
  description: string;
  type: 'tip' | 'guide' | 'video' | 'faq';
  content?: string;
  links?: Array<{ text: string; url: string; }>;
}

interface ContextualHelpProps {
  context: string;
  helpItems: HelpItem[];
  className?: string;
}

export function ContextualHelp({ context, helpItems, className }: ContextualHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (type: HelpItem['type']) => {
    switch (type) {
      case 'tip': return <HelpCircle className="h-4 w-4" />;
      case 'guide': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'faq': return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: HelpItem['type']) => {
    switch (type) {
      case 'tip': return 'bg-blue-100 text-blue-800';
      case 'guide': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'faq': return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${className}`}
        >
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Help & Tips</CardTitle>
            <CardDescription className="text-xs">
              Contextual help for {context}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {helpItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className={`${getTypeColor(item.type)} text-xs`}>
                    {getIcon(item.type)}
                    <span className="ml-1 capitalize">{item.type}</span>
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                  {item.content && (
                    <p className="text-xs mt-1">{item.content}</p>
                  )}
                  {item.links && (
                    <div className="flex gap-2 mt-2">
                      {item.links.map((link, linkIndex) => (
                        <Button
                          key={linkIndex}
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-xs"
                          asChild
                        >
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.text}
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                {index < helpItems.length - 1 && <hr className="my-3" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
