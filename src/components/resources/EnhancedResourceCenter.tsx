
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, FileText, Video, Code, Users, Lightbulb, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { PersonalizedRecommendations } from "@/components/recommendations/PersonalizedRecommendations";

interface Resource {
  title: string;
  description: string;
  type: string;
  category: string;
  link: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime?: string;
  popularity?: number;
  tags?: string[];
}

interface EnhancedResourceCenterProps {
  userType: "project_owner" | "auditor" | "admin" | "general";
}

export function EnhancedResourceCenter({ userType }: EnhancedResourceCenterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const getResourcesByUserType = (): Resource[] => {
    const allResources: Record<string, Resource[]> = {
      project_owner: [
        {
          title: "Smart Contract Security Best Practices",
          description: "Essential security guidelines for writing secure smart contracts",
          type: "Guide",
          category: "Security",
          link: "/resources/security-best-practices",
          level: "Beginner",
          estimatedTime: "15 min",
          popularity: 95,
          tags: ["security", "smart-contracts", "best-practices"]
        },
        {
          title: "Advanced Audit Preparation Checklist",
          description: "Comprehensive checklist to prepare your project for security audit",
          type: "Checklist",
          category: "Preparation",
          link: "/resources/audit-preparation",
          level: "Intermediate",
          estimatedTime: "30 min",
          popularity: 88,
          tags: ["audit", "preparation", "checklist"]
        },
        {
          title: "DeFi Security Patterns & Anti-Patterns",
          description: "Common security patterns and vulnerabilities in DeFi protocols",
          type: "Guide",
          category: "DeFi",
          link: "/resources/defi-security",
          level: "Advanced",
          estimatedTime: "45 min",
          popularity: 82,
          tags: ["defi", "security", "patterns"]
        },
        {
          title: "Cost-Benefit Analysis of Security Audits",
          description: "Understanding the ROI of investing in security audits",
          type: "Analysis",
          category: "Business",
          link: "/resources/security-roi",
          level: "Intermediate",
          estimatedTime: "20 min",
          popularity: 76,
          tags: ["business", "roi", "analysis"]
        }
      ],
      auditor: [
        {
          title: "Advanced Vulnerability Detection Techniques",
          description: "Master complex vulnerability patterns and detection methods",
          type: "Course",
          category: "Technical",
          link: "/resources/vulnerability-detection",
          level: "Advanced",
          estimatedTime: "2 hours",
          popularity: 92,
          tags: ["vulnerability", "detection", "advanced"]
        },
        {
          title: "Comprehensive Audit Methodology",
          description: "Step-by-step framework for conducting thorough security audits",
          type: "Framework",
          category: "Methodology",
          link: "/resources/audit-methodology",
          level: "Intermediate",
          estimatedTime: "1 hour",
          popularity: 89,
          tags: ["methodology", "framework", "audit"]
        },
        {
          title: "Professional Report Writing Standards",
          description: "Templates and guidelines for writing clear, actionable audit reports",
          type: "Template",
          category: "Reporting",
          link: "/resources/reporting-standards",
          level: "Intermediate",
          estimatedTime: "45 min",
          popularity: 85,
          tags: ["reporting", "writing", "standards"]
        },
        {
          title: "Cross-Chain Security Considerations",
          description: "Unique security challenges in multi-chain and bridge protocols",
          type: "Guide",
          category: "Advanced",
          link: "/resources/cross-chain-security",
          level: "Advanced",
          estimatedTime: "1.5 hours",
          popularity: 78,
          tags: ["cross-chain", "bridges", "security"]
        }
      ],
      admin: [
        {
          title: "Platform Administration Best Practices",
          description: "Complete guide to managing the Hawkly platform effectively",
          type: "Manual",
          category: "Administration",
          link: "/resources/admin-guide",
          level: "Intermediate",
          estimatedTime: "1 hour",
          popularity: 87,
          tags: ["admin", "platform", "management"]
        },
        {
          title: "User Engagement Analytics",
          description: "Understanding and improving user engagement metrics",
          type: "Guide",
          category: "Analytics",
          link: "/resources/engagement-analytics",
          level: "Advanced",
          estimatedTime: "45 min",
          popularity: 83,
          tags: ["analytics", "engagement", "metrics"]
        }
      ],
      general: [
        {
          title: "Introduction to Web3 Security",
          description: "Fundamental concepts and principles of blockchain security",
          type: "Course",
          category: "Fundamentals",
          link: "/resources/web3-security-intro",
          level: "Beginner",
          estimatedTime: "30 min",
          popularity: 94,
          tags: ["web3", "security", "basics"]
        },
        {
          title: "Choosing the Right Security Auditor",
          description: "How to evaluate and select the best auditor for your project",
          type: "Guide",
          category: "Selection",
          link: "/resources/choosing-auditor",
          level: "Beginner",
          estimatedTime: "20 min",
          popularity: 91,
          tags: ["auditor", "selection", "guide"]
        }
      ]
    };

    return allResources[userType] || allResources.general;
  };

  const resources = getResourcesByUserType();

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || resource.category.toLowerCase() === selectedCategory;
    const matchesLevel = selectedLevel === "all" || resource.level.toLowerCase() === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = [...new Set(resources.map(r => r.category))];
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const getIcon = (type: string) => {
    const icons = {
      "Guide": BookOpen,
      "Tutorial": Video,
      "Course": Users,
      "Template": FileText,
      "Checklist": FileText,
      "Framework": Code,
      "Manual": BookOpen,
      "Analysis": Lightbulb
    };
    const Icon = icons[type as keyof typeof icons] || BookOpen;
    return <Icon className="h-5 w-5" />;
  };

  const getLevelColor = (level: string) => {
    const colors = {
      "Beginner": "bg-green-100 text-green-800",
      "Intermediate": "bg-yellow-100 text-yellow-800",
      "Advanced": "bg-red-100 text-red-800"
    };
    return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPopularityBadge = (popularity?: number) => {
    if (!popularity) return null;
    if (popularity >= 90) return <Badge variant="default" className="bg-green-600">Popular</Badge>;
    if (popularity >= 80) return <Badge variant="secondary">Trending</Badge>;
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Personalized Recommendations */}
      <PersonalizedRecommendations userType={userType} />
      
      {/* Resource Center */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Enhanced Resource Center</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover curated resources, tutorials, and tools tailored to your expertise level and role
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category.toLowerCase()}>{category}</option>
                  ))}
                </select>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="all">All Levels</option>
                  {levels.map(level => (
                    <option key={level} value={level.toLowerCase()}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-primary">
                    {getIcon(resource.type)}
                    <span className="text-sm font-medium">{resource.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getLevelColor(resource.level)}>
                      {resource.level}
                    </Badge>
                    {getPopularityBadge(resource.popularity)}
                  </div>
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline">{resource.category}</Badge>
                    {resource.estimatedTime && (
                      <span className="text-muted-foreground">{resource.estimatedTime}</span>
                    )}
                  </div>
                  
                  {resource.tags && (
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Button asChild className="w-full">
                    <Link to={resource.link}>Access Resource</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
