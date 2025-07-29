import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ResponsiveTab {
  value: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  priority?: 'high' | 'medium' | 'low';
}

interface ResponsiveTabsProps {
  tabs: ResponsiveTab[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  maxVisibleTabs?: number;
}

export function ResponsiveTabs({
  tabs,
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  maxVisibleTabs = 4
}: ResponsiveTabsProps) {
  const [activeTab, setActiveTab] = useState(value || defaultValue || tabs[0]?.value);
  const [visibleTabs, setVisibleTabs] = useState<ResponsiveTab[]>([]);
  const [hiddenTabs, setHiddenTabs] = useState<ResponsiveTab[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prioritize tabs based on importance and current selection
    const sortedTabs = [...tabs].sort((a, b) => {
      // Current active tab gets highest priority
      if (a.value === activeTab) return -1;
      if (b.value === activeTab) return 1;
      
      // Then by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const aPriority = priorityOrder[a.priority || 'medium'];
      const bPriority = priorityOrder[b.priority || 'medium'];
      
      return aPriority - bPriority;
    });

    const visible = sortedTabs.slice(0, maxVisibleTabs);
    const hidden = sortedTabs.slice(maxVisibleTabs);

    setVisibleTabs(visible);
    setHiddenTabs(hidden);
  }, [tabs, activeTab, maxVisibleTabs]);

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
    onValueChange?.(newValue);
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!tabsRef.current) return;
    
    const scrollAmount = 200;
    const newScrollLeft = tabsRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
    
    tabsRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const updateScrollButtons = () => {
    if (!tabsRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const tabsElement = tabsRef.current;
    if (!tabsElement) return;

    updateScrollButtons();
    tabsElement.addEventListener('scroll', updateScrollButtons);
    
    return () => tabsElement.removeEventListener('scroll', updateScrollButtons);
  }, [visibleTabs]);

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className={className}>
      <div className="relative">
        {/* Desktop: Scrollable tabs with navigation */}
        <div className="hidden md:flex items-center">
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollTabs('left')}
              className="shrink-0 mr-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          
          <div
            ref={tabsRef}
            className="flex-1 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <TabsList className="inline-flex w-auto min-w-full">
              {visibleTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-hawkly-primary/10 text-hawkly-primary rounded-full">
                      {tab.count}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {canScrollRight && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollTabs('right')}
              className="shrink-0 ml-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          {/* Overflow menu for hidden tabs */}
          {hiddenTabs.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {hiddenTabs.map((tab) => (
                  <DropdownMenuItem
                    key={tab.value}
                    onClick={() => handleTabChange(tab.value)}
                    className={cn(
                      'flex items-center gap-2',
                      activeTab === tab.value && 'bg-hawkly-primary/10 text-hawkly-primary'
                    )}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {tab.count}
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile: Dropdown selector */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  {tabs.find(t => t.value === activeTab)?.icon}
                  <span>{tabs.find(t => t.value === activeTab)?.label}</span>
                  {tabs.find(t => t.value === activeTab)?.count !== undefined && (
                    <span className="px-1.5 py-0.5 text-xs bg-hawkly-primary/10 text-hawkly-primary rounded-full">
                      {tabs.find(t => t.value === activeTab)?.count}
                    </span>
                  )}
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {tabs.map((tab) => (
                <DropdownMenuItem
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={cn(
                    'flex items-center gap-2',
                    activeTab === tab.value && 'bg-hawkly-primary/10 text-hawkly-primary'
                  )}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {tab.count}
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {children}
    </Tabs>
  );
}

// Simplified version for common use cases
interface SimpleResponsiveTabsProps {
  tabs: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
  }>;
  defaultValue?: string;
  className?: string;
}

export function SimpleResponsiveTabs({ tabs, defaultValue, className }: SimpleResponsiveTabsProps) {
  return (
    <ResponsiveTabs
      tabs={tabs.map(({ value, label, icon }) => ({ value, label, icon }))}
      defaultValue={defaultValue}
      className={className}
    >
      {tabs.map(({ value, content }) => (
        <TabsContent key={value} value={value}>
          {content}
        </TabsContent>
      ))}
    </ResponsiveTabs>
  );
} 