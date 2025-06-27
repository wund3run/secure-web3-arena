
import React from 'react';
import { Typography } from '@/components/ui/design-system/DesignSystem';
import { cn } from '@/lib/utils';

// Content Hierarchy Components
interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}

export function ContentSection({ 
  title, 
  subtitle, 
  children, 
  level = 1, 
  className 
}: ContentSectionProps) {
  const headingVariant = level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4';
  
  return (
    <section className={cn('space-y-6', className)}>
      {title && (
        <div className="space-y-2">
          <Typography variant={headingVariant} className="font-semibold">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body" className="text-muted-foreground">
              {subtitle}
            </Typography>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}

// Progressive Disclosure Component
interface ProgressiveDisclosureProps {
  title: string;
  summary: string;
  details: React.ReactNode;
  defaultExpanded?: boolean;
}

export function ProgressiveDisclosure({ 
  title, 
  summary, 
  details, 
  defaultExpanded = false 
}: ProgressiveDisclosureProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        className="w-full p-4 text-left hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h6" className="font-medium">
              {title}
            </Typography>
            <Typography variant="caption" className="mt-1">
              {summary}
            </Typography>
          </div>
          <div className={cn(
            'transform transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}>
            ↓
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-4 border-t border-border bg-muted/20 animate-fade-in">
          {details}
        </div>
      )}
    </div>
  );
}

// Content Guidelines Hook
export function useContentGuidelines() {
  const guidelines = {
    tone: {
      professional: 'Use clear, direct language that builds trust',
      helpful: 'Focus on user benefits and actionable information',
      concise: 'Eliminate unnecessary words and jargon',
    },
    terminology: {
      audit: 'Security audit or code review',
      auditor: 'Security professional or code reviewer',
      client: 'Project owner or organization',
      vulnerability: 'Security issue or potential risk',
    },
    formatting: {
      headings: 'Use sentence case (First word capitalized)',
      buttons: 'Use action verbs (Submit, Continue, Cancel)',
      lists: 'Use parallel structure and consistent punctuation',
    },
  };

  return guidelines;
}

// Information Architecture Helper
interface IANode {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  children?: IANode[];
}

export function InformationArchitecture({ nodes }: { nodes: IANode[] }) {
  const renderNode = (node: IANode, depth: number = 0) => (
    <div 
      key={node.id} 
      className={cn(
        'border-l-2 pl-4 py-2',
        node.priority === 'high' && 'border-l-green-500',
        node.priority === 'medium' && 'border-l-yellow-500',
        node.priority === 'low' && 'border-l-gray-500'
      )}
      style={{ marginLeft: `${depth * 20}px` }}
    >
      <div className="flex items-center gap-2">
        <Typography 
          variant={depth === 0 ? 'h5' : depth === 1 ? 'h6' : 'body'} 
          className="font-medium"
        >
          {node.title}
        </Typography>
        <span className={cn(
          'px-2 py-1 text-xs rounded-full',
          node.priority === 'high' && 'bg-green-100 text-green-800',
          node.priority === 'medium' && 'bg-yellow-100 text-yellow-800',
          node.priority === 'low' && 'bg-gray-100 text-gray-800'
        )}>
          {node.priority}
        </span>
      </div>
      {node.description && (
        <Typography variant="caption" className="text-muted-foreground mt-1">
          {node.description}
        </Typography>
      )}
      {node.children && (
        <div className="mt-2">
          {node.children.map(child => renderNode(child, depth + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {nodes.map(node => renderNode(node))}
    </div>
  );
}
