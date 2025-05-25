
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileDrawer } from './mobile-responsive-container';
import { navigationLinksStructure } from '@/components/layout/navigation/navigation-links.tsx';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  className?: string;
}

export function MobileNavigation({ className }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const NavSection = ({ title, items, sectionKey }: { 
    title: string; 
    items: any[]; 
    sectionKey: string;
  }) => {
    const isExpanded = expandedSections.includes(sectionKey);
    
    return (
      <div className="border-b border-border">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <span className="font-medium">{title}</span>
          <ChevronDown 
            className={cn(
              "h-4 w-4 transition-transform", 
              isExpanded && "rotate-180"
            )} 
          />
        </button>
        
        {isExpanded && (
          <div className="pb-4 px-4 space-y-2">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
              >
                <div className="font-medium">{item.title}</div>
                {item.description && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className={cn("md:hidden", className)}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <MobileDrawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Navigation"
      >
        <div className="space-y-0">
          <NavSection 
            title="Marketplace" 
            items={navigationLinksStructure.marketplace}
            sectionKey="marketplace"
          />
          <NavSection 
            title="Audits" 
            items={navigationLinksStructure.audits}
            sectionKey="audits"
          />
          <NavSection 
            title="Resources" 
            items={navigationLinksStructure.resources}
            sectionKey="resources"
          />
          <NavSection 
            title="Dashboards" 
            items={navigationLinksStructure.dashboards}
            sectionKey="dashboards"
          />
          
          <div className="p-4 space-y-2 border-t border-border">
            <Button asChild className="w-full">
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/request-audit" onClick={() => setIsOpen(false)}>
                Request Audit
              </Link>
            </Button>
          </div>
        </div>
      </MobileDrawer>
    </>
  );
}
