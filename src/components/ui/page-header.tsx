import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  backPath?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  showBackButton = false,
  backPath,
  children,
  className,
}: PageHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={cn(
      "space-y-4 pb-8 border-b border-border bg-transparent",
      "pt-8 px-0 md:px-2 lg:px-0",
      className
    )}>
      {showBackButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="mb-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <h1
            className={cn(
              "text-h1 font-black leading-tight tracking-tight",
              "bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent",
              "uppercase drop-shadow-lg"
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="text-body-large text-secondary max-w-2xl mt-1">
              {description}
            </p>
          )}
        </div>

        {children && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
