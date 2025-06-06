
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Palette, 
  Type, 
  Image, 
  Layout,
  CheckCircle,
  AlertTriangle,
  Eye,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

interface BrandElement {
  id: string;
  category: string;
  name: string;
  description: string;
  compliance: number;
  issues: string[];
  recommendations: string[];
  devices: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
}

export function BrandingConsistency() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const brandElements: BrandElement[] = [
    {
      id: 'primary-colors',
      category: 'Colors',
      name: 'Primary Color Palette',
      description: 'Main brand colors used across the platform',
      compliance: 92,
      issues: ['Inconsistent hover states', 'Missing dark mode variants'],
      recommendations: ['Standardize hover color variations', 'Implement dark mode color scheme'],
      devices: { desktop: 95, tablet: 90, mobile: 88 }
    },
    {
      id: 'secondary-colors',
      category: 'Colors',
      name: 'Secondary & Accent Colors',
      description: 'Supporting colors for highlights and accents',
      compliance: 88,
      issues: ['Overuse of accent colors', 'Poor contrast ratios in some areas'],
      recommendations: ['Create accent color usage guidelines', 'Improve contrast ratios'],
      devices: { desktop: 90, tablet: 85, mobile: 82 }
    },
    {
      id: 'typography-headings',
      category: 'Typography',
      name: 'Heading Typography',
      description: 'Font families, sizes, and weights for headings',
      compliance: 95,
      issues: ['Inconsistent line heights'],
      recommendations: ['Standardize line height scale'],
      devices: { desktop: 98, tablet: 95, mobile: 92 }
    },
    {
      id: 'typography-body',
      category: 'Typography',
      name: 'Body Text Typography',
      description: 'Font styles for body content and UI text',
      compliance: 90,
      issues: ['Font size variations', 'Missing font weight hierarchy'],
      recommendations: ['Create consistent font size scale', 'Define clear font weight system'],
      devices: { desktop: 92, tablet: 88, mobile: 85 }
    },
    {
      id: 'logo-usage',
      category: 'Logo & Graphics',
      name: 'Logo Implementation',
      description: 'Consistent logo usage across all touchpoints',
      compliance: 98,
      issues: ['Missing logo in mobile footer'],
      recommendations: ['Add logo to mobile footer layout'],
      devices: { desktop: 100, tablet: 98, mobile: 95 }
    },
    {
      id: 'iconography',
      category: 'Logo & Graphics',
      name: 'Icon System',
      description: 'Consistent iconography and illustration style',
      compliance: 85,
      issues: ['Mixed icon styles', 'Inconsistent icon sizes'],
      recommendations: ['Standardize to single icon library', 'Create icon size guidelines'],
      devices: { desktop: 88, tablet: 82, mobile: 80 }
    },
    {
      id: 'layout-grid',
      category: 'Layout',
      name: 'Grid System',
      description: 'Consistent spacing and layout grid usage',
      compliance: 87,
      issues: ['Inconsistent margins', 'Non-standard grid breakpoints'],
      recommendations: ['Implement design system spacing tokens', 'Standardize breakpoints'],
      devices: { desktop: 90, tablet: 85, mobile: 82 }
    },
    {
      id: 'component-styling',
      category: 'Layout',
      name: 'Component Consistency',
      description: 'Uniform styling across UI components',
      compliance: 83,
      issues: ['Button style variations', 'Inconsistent card designs'],
      recommendations: ['Create component style guide', 'Implement design tokens'],
      devices: { desktop: 85, tablet: 82, mobile: 78 }
    },
    {
      id: 'responsive-design',
      category: 'Responsive',
      name: 'Mobile Responsiveness',
      description: 'Consistent brand experience across devices',
      compliance: 89,
      issues: ['Navigation inconsistencies', 'Touch target sizes'],
      recommendations: ['Improve mobile navigation', 'Optimize touch interactions'],
      devices: { desktop: 95, tablet: 88, mobile: 85 }
    },
    {
      id: 'accessibility-compliance',
      category: 'Accessibility',
      name: 'Accessibility Standards',
      description: 'Brand elements meet accessibility requirements',
      compliance: 91,
      issues: ['Color contrast in some components', 'Missing alt text'],
      recommendations: ['Audit and fix contrast issues', 'Add comprehensive alt text'],
      devices: { desktop: 93, tablet: 90, mobile: 88 }
    }
  ];

  const categories = ['all', 'Colors', 'Typography', 'Logo & Graphics', 'Layout', 'Responsive', 'Accessibility'];
  
  const filteredElements = selectedCategory === 'all' 
    ? brandElements 
    : brandElements.filter(element => element.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Colors': return <Palette className="h-4 w-4" />;
      case 'Typography': return <Type className="h-4 w-4" />;
      case 'Logo & Graphics': return <Image className="h-4 w-4" />;
      case 'Layout': return <Layout className="h-4 w-4" />;
      case 'Responsive': return <Smartphone className="h-4 w-4" />;
      case 'Accessibility': return <Eye className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateOverallScore = () => {
    return filteredElements.reduce((acc, element) => acc + element.compliance, 0) / filteredElements.length;
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return <Monitor className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Branding Consistency Analysis</h2>
          <p className="text-muted-foreground">
            Ensuring consistent brand experience across all platform touchpoints
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="flex items-center gap-2"
          >
            {category !== 'all' && getCategoryIcon(category)}
            {category === 'all' ? 'All Categories' : category}
          </Button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Overall Brand Score</p>
                <p className="text-2xl font-bold">{calculateOverallScore().toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Desktop Score</p>
                <p className="text-2xl font-bold">
                  {(filteredElements.reduce((acc, el) => acc + el.devices.desktop, 0) / filteredElements.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Tablet className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Tablet Score</p>
                <p className="text-2xl font-bold">
                  {(filteredElements.reduce((acc, el) => acc + el.devices.tablet, 0) / filteredElements.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Mobile Score</p>
                <p className="text-2xl font-bold">
                  {(filteredElements.reduce((acc, el) => acc + el.devices.mobile, 0) / filteredElements.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Brand Elements */}
      <div className="space-y-4">
        {filteredElements.map(element => (
          <Card key={element.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(element.category)}
                  <div>
                    <h3 className="font-semibold">{element.name}</h3>
                    <p className="text-sm text-muted-foreground">{element.description}</p>
                    <Badge variant="outline" className="mt-2">{element.category}</Badge>
                  </div>
                </div>
                <div className={`text-right ${getComplianceColor(element.compliance)}`}>
                  <div className="text-2xl font-bold">{element.compliance}%</div>
                  <div className="text-xs text-muted-foreground">Compliance</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Device Compliance</h4>
                  <div className="space-y-2">
                    {Object.entries(element.devices).map(([device, score]) => (
                      <div key={device} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(device)}
                          <span className="text-sm capitalize">{device}</span>
                        </div>
                        <span className="font-medium">{score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Current Issues</h4>
                  <div className="space-y-1">
                    {element.issues.map((issue, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                        <span className="text-xs text-muted-foreground">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Recommendations</h4>
                  <div className="space-y-1">
                    {element.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-muted-foreground">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Compliance Score</span>
                  <span className="text-sm text-muted-foreground">{element.compliance}%</span>
                </div>
                <Progress value={element.compliance} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
