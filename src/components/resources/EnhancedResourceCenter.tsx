
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Video, Download, ExternalLink, Search, Star, Clock } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'video' | 'template' | 'tool' | 'documentation';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  rating: number;
  downloads?: number;
  url: string;
  tags: string[];
}

interface EnhancedResourceCenterProps {
  userType: 'project_owner' | 'auditor' | 'admin';
}

export function EnhancedResourceCenter({ userType }: EnhancedResourceCenterProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);

  useEffect(() => {
    // Generate personalized resources based on user type
    const resourceDatabase: Record<string, Resource[]> = {
      project_owner: [
        {
          id: 'smart-contract-basics',
          title: 'Smart Contract Security Fundamentals',
          description: 'Essential security concepts every project owner should know',
          type: 'guide',
          category: 'security',
          difficulty: 'beginner',
          estimatedTime: '15 min read',
          rating: 4.8,
          url: '/resources/security-fundamentals',
          tags: ['security', 'basics', 'smart-contracts']
        },
        {
          id: 'audit-preparation',
          title: 'Preparing Your Project for Audit',
          description: 'Complete checklist to prepare your smart contract for security audit',
          type: 'template',
          category: 'preparation',
          difficulty: 'intermediate',
          estimatedTime: '30 min',
          rating: 4.9,
          downloads: 1200,
          url: '/resources/audit-prep-checklist',
          tags: ['audit', 'preparation', 'checklist']
        },
        {
          id: 'choosing-auditor',
          title: 'How to Choose the Right Auditor',
          description: 'Video guide on selecting the best auditor for your project',
          type: 'video',
          category: 'guidance',
          difficulty: 'beginner',
          estimatedTime: '12 min watch',
          rating: 4.7,
          url: '/resources/choosing-auditor-video',
          tags: ['auditor', 'selection', 'guidance']
        }
      ],
      auditor: [
        {
          id: 'audit-methodology',
          title: 'Advanced Audit Methodology',
          description: 'Comprehensive guide to professional smart contract auditing',
          type: 'guide',
          category: 'methodology',
          difficulty: 'advanced',
          estimatedTime: '45 min read',
          rating: 4.9,
          url: '/resources/audit-methodology',
          tags: ['methodology', 'advanced', 'professional']
        },
        {
          id: 'vulnerability-database',
          title: 'Common Vulnerability Patterns',
          description: 'Database of frequently found vulnerabilities with examples',
          type: 'documentation',
          category: 'vulnerabilities',
          difficulty: 'intermediate',
          estimatedTime: '30 min browse',
          rating: 4.8,
          url: '/resources/vulnerability-db',
          tags: ['vulnerabilities', 'patterns', 'examples']
        },
        {
          id: 'reporting-template',
          title: 'Professional Audit Report Template',
          description: 'Industry-standard template for audit reports',
          type: 'template',
          category: 'reporting',
          difficulty: 'intermediate',
          estimatedTime: '10 min setup',
          rating: 4.6,
          downloads: 2300,
          url: '/resources/report-template',
          tags: ['reporting', 'template', 'professional']
        }
      ],
      admin: [
        {
          id: 'platform-management',
          title: 'Platform Management Guide',
          description: 'Complete guide to managing the Hawkly platform',
          type: 'guide',
          category: 'management',
          difficulty: 'advanced',
          estimatedTime: '60 min read',
          rating: 4.7,
          url: '/resources/platform-management',
          tags: ['platform', 'management', 'admin']
        },
        {
          id: 'analytics-dashboard',
          title: 'Analytics Dashboard Tutorial',
          description: 'How to use platform analytics effectively',
          type: 'video',
          category: 'analytics',
          difficulty: 'intermediate',
          estimatedTime: '20 min watch',
          rating: 4.5,
          url: '/resources/analytics-tutorial',
          tags: ['analytics', 'tutorial', 'dashboard']
        }
      ]
    };

    setResources(resourceDatabase[userType] || []);
  }, [userType]);

  useEffect(() => {
    let filtered = resources;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    setFilteredResources(filtered);
  }, [resources, searchQuery, selectedCategory]);

  const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'guide': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'template': return <Download className="h-4 w-4" />;
      case 'tool': return <ExternalLink className="h-4 w-4" />;
      case 'documentation': return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: Resource['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleResourceClick = (resource: Resource) => {
    // Track resource access
    if ((window as any).trackConversion) {
      (window as any).trackConversion({
        action: 'resource_accessed',
        category: 'learning',
        label: resource.title,
        metadata: {
          resourceId: resource.id,
          type: resource.type,
          userType
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category === 'all' ? 'All' : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map(resource => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(resource.type)}
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </div>
                <Badge className={getDifficultyColor(resource.difficulty)}>
                  {resource.difficulty}
                </Badge>
              </div>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {resource.estimatedTime}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  {resource.rating}
                </div>
              </div>
              
              {resource.downloads && (
                <div className="text-sm text-muted-foreground">
                  {resource.downloads.toLocaleString()} downloads
                </div>
              )}
              
              <div className="flex flex-wrap gap-1">
                {resource.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleResourceClick(resource)}
              >
                Access Resource
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No resources found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
