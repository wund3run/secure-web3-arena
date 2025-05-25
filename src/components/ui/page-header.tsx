
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  icon?: React.ReactNode;
  external?: boolean;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  actions?: PageAction[];
  showBackButton?: boolean;
  backButtonText?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  badge,
  actions = [],
  showBackButton = false,
  backButtonText = "Back",
  className,
  children
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Back Navigation */}
      {showBackButton && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backButtonText}
          </Button>
        </div>
      )}

      {/* Header Content */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {badge && (
              <Badge variant={badge.variant || 'default'}>
                {badge.text}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {actions.map((action, index) => {
              const buttonContent = (
                <>
                  {action.icon}
                  {action.label}
                  {action.external && <ExternalLink className="ml-2 h-4 w-4" />}
                </>
              );

              return action.href ? (
                action.external ? (
                  <a
                    key={index}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant={action.variant || 'default'}>
                      {buttonContent}
                    </Button>
                  </a>
                ) : (
                  <Link key={index} to={action.href}>
                    <Button variant={action.variant || 'default'}>
                      {buttonContent}
                    </Button>
                  </Link>
                )
              ) : (
                <Button
                  key={index}
                  variant={action.variant || 'default'}
                  onClick={action.onClick}
                >
                  {buttonContent}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {/* Additional Content */}
      {children}
    </div>
  );
}
