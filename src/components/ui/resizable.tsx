import React from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

// Fallback implementation for resizable panels
interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
}

const ResizablePanelGroup = ({
  className,
  direction = "horizontal",
  children,
  ...props
}: ResizablePanelGroupProps) => (
  <div
    className={cn(
      "flex h-full w-full",
      direction === "vertical" ? "flex-col" : "flex-row",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

const ResizablePanel = ({
  className,
  children,
  defaultSize,
  ...props
}: ResizablePanelProps) => (
  <div
    className={cn("flex-1", className)}
    style={{ flexBasis: defaultSize ? `${defaultSize}%` : undefined }}
    {...props}
  >
    {children}
  </div>
);

interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean;
}

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: ResizableHandleProps) => (
  <div
    className={cn(
      "relative flex w-px items-center justify-center bg-border cursor-col-resize",
      "hover:bg-border-hover transition-colors",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </div>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
