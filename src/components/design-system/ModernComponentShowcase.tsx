
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Type, 
  Layout, 
  Zap,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info
} from 'lucide-react';

export function ModernComponentShowcase() {
  return (
    <div className="modern-container space-section">
      <div className="section-header">
        <h1 className="section-title gradient-text">Modern Design System</h1>
        <p className="section-subtitle">
          Showcasing our enhanced design tokens, typography, and component library
        </p>
      </div>

      <div className="grid-features">
        {/* Typography Showcase */}
        <Card className="modern-card modern-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5 text-primary" />
              Typography Scale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-elements">
            <div className="space-y-4">
              <div>
                <h1 className="text-display-sm">Display Heading</h1>
                <p className="text-muted-foreground text-sm">text-display-sm</p>
              </div>
              <div>
                <h2 className="text-display-xs">Section Heading</h2>
                <p className="text-muted-foreground text-sm">text-display-xs</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Subsection</h3>
                <p className="text-muted-foreground text-sm">text-2xl font-semibold</p>
              </div>
              <div>
                <p className="text-responsive-base">Body text with responsive sizing</p>
                <p className="text-muted-foreground text-sm">text-responsive-base</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card className="modern-card modern-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Color System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-elements">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <div className="h-12 bg-primary rounded-md"></div>
                <p className="text-xs font-medium">Primary</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-secondary rounded-md"></div>
                <p className="text-xs font-medium">Secondary</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-accent rounded-md"></div>
                <p className="text-xs font-medium">Accent</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="space-y-1">
                <div className="h-8 bg-success rounded-sm"></div>
                <p className="text-xs">Success</p>
              </div>
              <div className="space-y-1">
                <div className="h-8 bg-warning rounded-sm"></div>
                <p className="text-xs">Warning</p>
              </div>
              <div className="space-y-1">
                <div className="h-8 bg-error rounded-sm"></div>
                <p className="text-xs">Error</p>
              </div>
              <div className="space-y-1">
                <div className="h-8 bg-muted rounded-sm"></div>
                <p className="text-xs">Muted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Button Variants */}
        <Card className="modern-card modern-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Button System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-elements">
            <div className="space-y-3">
              <Button className="w-full btn-primary">
                Primary Button
              </Button>
              <Button variant="secondary" className="w-full">
                Secondary Button
              </Button>
              <Button variant="outline" className="w-full">
                Outline Button
              </Button>
              <Button variant="ghost" className="w-full">
                Ghost Button
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card className="modern-card modern-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5 text-primary" />
              Form Elements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-elements">
            <div className="space-y-4">
              <div>
                <label className="form-label">Input Field</label>
                <Input 
                  placeholder="Enter text here..." 
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Focused State</label>
                <Input 
                  placeholder="This input shows focus styles" 
                  className="form-input border-primary ring-2 ring-primary/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Badges */}
        <Card className="modern-card modern-card-hover">
          <CardHeader>
            <CardTitle>Status Badges</CardTitle>
          </CardHeader>
          <CardContent className="space-elements">
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" className="badge-success">
                <CheckCircle className="h-3 w-3 mr-1" />
                Success
              </Badge>
              <Badge variant="warning" className="badge-warning">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Warning
              </Badge>
              <Badge variant="destructive" className="badge-error">
                <XCircle className="h-3 w-3 mr-1" />
                Error
              </Badge>
              <Badge className="badge-primary">
                <Info className="h-3 w-3 mr-1" />
                Info
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Spacing & Layout */}
        <Card className="modern-card modern-card-hover">
          <CardHeader>
            <CardTitle>Spacing System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-elements">
                <div className="h-4 bg-primary/20 rounded"></div>
                <div className="h-4 bg-primary/20 rounded"></div>
                <div className="h-4 bg-primary/20 rounded"></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Elements with space-elements class
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Card Examples */}
      <div className="mt-16">
        <h2 className="section-title">Interactive Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="modern-card p-6 hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-2">Hover Effect</h3>
            <p className="text-muted-foreground mb-4">
              This card demonstrates our modern hover effects and smooth transitions.
            </p>
            <Button className="btn-primary">
              Try Me
            </Button>
          </div>

          <div className="modern-card p-6 gradient-primary text-white">
            <h3 className="text-xl font-semibold mb-2">Gradient Card</h3>
            <p className="mb-4 opacity-90">
              Beautiful gradient backgrounds using our design tokens.
            </p>
            <Button variant="secondary">
              Learn More
            </Button>
          </div>

          <div className="modern-card p-6 border-primary border-2">
            <h3 className="text-xl font-semibold mb-2 text-primary">Accented Border</h3>
            <p className="text-muted-foreground mb-4">
              Cards with branded border styles for emphasis.
            </p>
            <Button variant="outline">
              Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
