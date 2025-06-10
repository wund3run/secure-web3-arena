
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { AccessibilityComplianceTest } from '@/components/testing/AccessibilityComplianceTest';
import { BrandConsistencyChecker } from '@/components/testing/BrandConsistencyChecker';
import { AccessibilityValidator } from '@/components/accessibility/AccessibilityValidator';
import { ResponsiveContainer } from '@/components/layout/responsive/ResponsiveContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TestTube, Shield, Palette, Eye } from 'lucide-react';

export function AccessibilityTestingPage() {
  return (
    <StandardLayout
      title="Accessibility Testing | Hawkly"
      description="Comprehensive accessibility and brand consistency testing for the Hawkly platform"
    >
      <ResponsiveContainer variant="wide" padding="lg">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Badge variant="outline" className="px-4 py-2">
                <TestTube className="h-4 w-4 mr-2" />
                Quality Assurance Testing
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-hawkly-gradient">
              Accessibility & Brand Testing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive WCAG compliance testing and brand consistency verification 
              to ensure the highest quality user experience.
            </p>
          </div>

          {/* Testing Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-hawkly-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-hawkly-primary" />
                  WCAG Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tests for WCAG 2.1 Level AA compliance including color contrast, 
                  keyboard navigation, and screen reader accessibility.
                </p>
              </CardContent>
            </Card>

            <Card className="border-hawkly-secondary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Palette className="h-5 w-5 text-hawkly-secondary" />
                  Brand Consistency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Verifies adherence to Hawkly brand guidelines including colors, 
                  typography, and design system usage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-hawkly-accent/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="h-5 w-5 text-hawkly-accent" />
                  Visual Validation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comprehensive visual accessibility checks including focus indicators, 
                  heading structure, and semantic markup.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Test Components */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AccessibilityComplianceTest />
            <BrandConsistencyChecker />
          </div>

          {/* Additional Validator */}
          <AccessibilityValidator />

          {/* Testing Guidelines */}
          <Card className="bg-hawkly-primary/5 border-hawkly-primary/20">
            <CardHeader>
              <CardTitle className="text-hawkly-primary">Testing Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">WCAG 2.1 Level AA Requirements</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Minimum color contrast ratio of 4.5:1 for normal text</li>
                  <li>• All interactive elements must be keyboard accessible</li>
                  <li>• Images must have appropriate alt text</li>
                  <li>• Form controls must have associated labels</li>
                  <li>• Page must have proper heading structure</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Hawkly Brand Standards</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use hawkly-primary (#4a90e2) for primary actions</li>
                  <li>• Apply hawkly-secondary (#33c3f0) for trust elements</li>
                  <li>• Use Inter font family for body text</li>
                  <li>• Apply consistent spacing using design tokens</li>
                  <li>• Maintain dark theme consistency</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </ResponsiveContainer>
    </StandardLayout>
  );
}
