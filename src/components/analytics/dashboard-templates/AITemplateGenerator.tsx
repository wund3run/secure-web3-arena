import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Download, Eye, Zap } from 'lucide-react';

interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  metrics: string[];
  complexity: 'simple' | 'intermediate' | 'advanced';
  aiGenerated: boolean;
}

export function AITemplateGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const dashboardTemplates: DashboardTemplate[] = [
    {
      id: 'security-overview',
      name: 'Security Audit Overview',
      description: 'Comprehensive dashboard for tracking security audit metrics and KPIs',
      category: 'security',
      metrics: ['Active Audits', 'Vulnerability Trends', 'Auditor Performance', 'Risk Assessment'],
      complexity: 'intermediate',
      aiGenerated: true
    },
    {
      id: 'user-engagement',
      name: 'User Engagement Analytics',
      description: 'Track user behavior, session data, and engagement patterns',
      category: 'engagement',
      metrics: ['Session Duration', 'Page Views', 'Conversion Funnel', 'User Segments'],
      complexity: 'simple',
      aiGenerated: true
    },
    {
      id: 'financial-performance',
      name: 'Financial Performance Dashboard',
      description: 'Monitor revenue, costs, and financial health of the platform',
      category: 'financial',
      metrics: ['Revenue Trends', 'Cost Analysis', 'Profit Margins', 'Payment Processing'],
      complexity: 'advanced',
      aiGenerated: false
    },
    {
      id: 'marketplace-insights',
      name: 'Marketplace Intelligence',
      description: 'AI-powered insights into marketplace trends and opportunities',
      category: 'marketplace',
      metrics: ['Service Demand', 'Pricing Trends', 'Competition Analysis', 'Market Share'],
      complexity: 'advanced',
      aiGenerated: true
    }
  ];

  const categories = ['all', ...Array.from(new Set(dashboardTemplates.map(t => t.category)))];
  const filteredTemplates = selectedCategory === 'all' 
    ? dashboardTemplates 
    : dashboardTemplates.filter(t => t.category === selectedCategory);

  const handleGenerateCustomTemplate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    
    // Track template generation
    const globalWindow = window as any;
    if (globalWindow.trackConversion && typeof globalWindow.trackConversion === 'function') {
      globalWindow.trackConversion({
        action: 'ai_template_generated',
        category: 'analytics',
        label: 'custom_dashboard'
      });
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            AI Dashboard Template Generator
          </CardTitle>
          <CardDescription>
            Generate custom analytics dashboards tailored to your specific needs using AI
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleGenerateCustomTemplate}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Generate Custom'}
            </Button>
          </div>
          
          {isGenerating && (
            <div className="text-center py-8">
              <Sparkles className="h-8 w-8 text-blue-500 animate-pulse mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI is crafting your dashboard...</h3>
              <p className="text-muted-foreground">
                Analyzing your requirements and generating optimized templates
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold flex items-center gap-2">
                    {template.name}
                    {template.aiGenerated && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {template.category}
                </Badge>
                <Badge className={getComplexityColor(template.complexity)} variant="secondary">
                  {template.complexity}
                </Badge>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-2">Key Metrics:</h5>
                <div className="space-y-1">
                  {template.metrics.map((metric, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button size="sm" className="flex-1">
                  <Download className="h-3 w-3 mr-1" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Need something specific?</h3>
          <p className="text-muted-foreground mb-4">
            Our AI can generate custom dashboard templates based on your exact requirements
          </p>
          <Button variant="outline">
            <Sparkles className="h-4 w-4 mr-2" />
            Request Custom Template
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
