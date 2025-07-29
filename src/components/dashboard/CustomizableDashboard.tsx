
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, ChevronDown, Grid, Layout, LayoutDashboard, LayoutGrid, Maximize2, Minimize2, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DashboardWidget {
  id: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  type: string;
  content: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  minimizable?: boolean;
  resizable?: boolean;
}

export interface CustomizableDashboardProps {
  title?: string;
  description?: string;
  widgets: DashboardWidget[];
  onLayoutChange?: (layout: unknown) => void;
  onAddWidget?: () => void;
  className?: string;
}

export function CustomizableDashboard({
  title = "Dashboard",
  description,
  widgets,
  onLayoutChange,
  onAddWidget,
  className
}: CustomizableDashboardProps) {
  const [layout, setLayout] = useState<string>('grid');
  const [minimizedWidgets, setMinimizedWidgets] = useState<string[]>([]);
  
  const toggleWidgetMinimized = (widgetId: string) => {
    setMinimizedWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId) 
        : [...prev, widgetId]
    );
  };
  
  // Helper to determine column and row span based on widget size
  const getWidgetSpan = (widget: DashboardWidget) => {
    // Default spans
    let colSpan = widget.colSpan || 1;
    let rowSpan = widget.rowSpan || 1;
    
    // Apply size-based spans if not explicitly defined
    if (!widget.colSpan) {
      switch (widget.size) {
        case 'large':
          colSpan = 3;
          break;
        case 'medium':
          colSpan = 2;
          break;
        case 'small':
          colSpan = 1;
          break;
      }
    }
    
    // For minimized widgets, reduce the rowSpan
    if (minimizedWidgets.includes(widget.id)) {
      rowSpan = 1;
    }
    
    return { colSpan, rowSpan };
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Layout className="h-4 w-4" />
                Layout
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Change Layout</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setLayout('grid')}
                className="gap-2"
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Grid</span>
                {layout === 'grid' && <CheckCircle className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLayout('dashboard')}
                className="gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
                {layout === 'dashboard' && <CheckCircle className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={onAddWidget} className="gap-1">
            <Plus className="h-4 w-4" />
            Add Widget
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className={cn(
        "grid gap-4",
        layout === 'grid' 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 md:grid-cols-3 lg:grid-cols-4",
      )}>
        {widgets.map(widget => {
          const { colSpan, rowSpan } = getWidgetSpan(widget);
          const isMinimized = minimizedWidgets.includes(widget.id);
          
          return (
            <Card 
              key={widget.id} 
              className={cn(
                "overflow-hidden",
                layout === 'dashboard' && `md:col-span-${colSpan} md:row-span-${rowSpan}`
              )}
            >
              <CardHeader className="bg-muted/40">
                <div className="flex justify-between items-center">
                  <CardTitle>{widget.title}</CardTitle>
                  <div className="flex items-center gap-1">
                    {widget.minimizable && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => toggleWidgetMinimized(widget.id)}
                      >
                        {isMinimized 
                          ? <Maximize2 className="h-4 w-4" /> 
                          : <Minimize2 className="h-4 w-4" />
                        }
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className={cn(
                "p-0",
                isMinimized ? "h-0 overflow-hidden" : "h-auto"
              )}>
                <ScrollArea className={cn(
                  "w-full",
                  widget.size === 'small' ? "max-h-[260px]" : 
                  widget.size === 'medium' ? "max-h-[320px]" : 
                  "max-h-[400px]"
                )}>
                  {widget.content}
                </ScrollArea>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
