
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Brain, BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  widgets: TemplateWidget[];
  layout: 'grid' | 'masonry' | 'sidebar';
  aiGenerated: boolean;
}

interface TemplateWidget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'gauge';
  title: string;
  size: 'small' | 'medium' | 'large';
  dataSource: string;
}

export const AITemplateGenerator = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [generatedTemplates, setGeneratedTemplates] = useState<DashboardTemplate[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    { id: 'security', name: 'Security Analytics', icon: BarChart3 },
    { id: 'performance', name: 'Performance Metrics', icon: TrendingUp },
    { id: 'financial', name: 'Financial Overview', icon: PieChart },
    { id: 'user', name: 'User Analytics', icon: Brain }
  ];

  const generateAITemplates = async (category: string) => {
    setIsGenerating(true);
    
    // Simulate AI template generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const templates: DashboardTemplate[] = [
      {
        id: `${category}-template-1`,
        name: `${category.charAt(0).toUpperCase() + category.slice(1)} Executive Overview`,
        description: 'High-level metrics designed for executive decision making',
        category,
        layout: 'grid',
        aiGenerated: true,
        widgets: [
          { id: '1', type: 'metric', title: 'Primary KPI', size: 'large', dataSource: 'analytics' },
          { id: '2', type: 'chart', title: 'Trend Analysis', size: 'medium', dataSource: 'metrics' },
          { id: '3', type: 'gauge', title: 'Performance Score', size: 'small', dataSource: 'performance' }
        ]
      },
      {
        id: `${category}-template-2`,
        name: `${category.charAt(0).toUpperCase() + category.slice(1)} Operational Dashboard`,
        description: 'Detailed operational metrics for day-to-day monitoring',
        category,
        layout: 'masonry',
        aiGenerated: true,
        widgets: [
          { id: '1', type: 'table', title: 'Detailed Breakdown', size: 'large', dataSource: 'detailed' },
          { id: '2', type: 'chart', title: 'Real-time Metrics', size: 'medium', dataSource: 'realtime' },
          { id: '3', type: 'metric', title: 'Status Indicators', size: 'small', dataSource: 'status' }
        ]
      }
    ];
    
    setGeneratedTemplates(templates);
    setIsGenerating(false);
  };

  const getWidgetIcon = (type: string) => {
    switch (type) {
      case 'chart': return <BarChart3 className="h-4 w-4" />;
      case 'metric': return <TrendingUp className="h-4 w-4" />;
      case 'table': return <PieChart className="h-4 w-4" />;
      case 'gauge': return <Brain className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            AI Dashboard Template Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select dashboard category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {category.name}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={() => generateAITemplates(selectedCategory)}
              disabled={!selectedCategory || isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate AI Templates'}
            </Button>
          </div>

          {generatedTemplates.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Generated Templates</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {generatedTemplates.map(template => (
                  <Card key={template.id} className="border-blue-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <Badge variant="secondary" className="bg-blue-100">
                          <Brain className="h-3 w-3 mr-1" />
                          AI Generated
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Layout:</span>
                          <Badge variant="outline">{template.layout}</Badge>
                        </div>
                        
                        <div>
                          <span className="font-medium text-sm">Widgets:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {template.widgets.map(widget => (
                              <Badge key={widget.id} variant="outline" className="text-xs">
                                {getWidgetIcon(widget.type)}
                                <span className="ml-1">{widget.title}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button size="sm" className="w-full">
                          Apply Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
