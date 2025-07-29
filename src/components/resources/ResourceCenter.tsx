
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Code, Users, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

interface Resource {
  title: string;
  description: string;
  type: string;
  category: string;
  link: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface ResourceCenterProps {
  userType: "project_owner" | "auditor" | "admin" | "general";
}

export function ResourceCenter({ userType }: ResourceCenterProps) {
  const getResourcesByUserType = (): Resource[] => {
    const allResources: Record<string, Resource[]> = {
      project_owner: [
        {
          title: "Smart Contract Security Best Practices",
          description: "Essential security guidelines for writing secure smart contracts",
          type: "Guide",
          category: "Security",
          link: "/resources/security-best-practices",
          level: "Beginner"
        },
        {
          title: "Audit Preparation Checklist",
          description: "Complete checklist to prepare your project for security audit",
          type: "Checklist",
          category: "Preparation",
          link: "/resources/audit-preparation",
          level: "Intermediate"
        },
        {
          title: "Understanding Audit Reports",
          description: "How to read and act on security audit findings",
          type: "Tutorial",
          category: "Analysis",
          link: "/resources/understanding-reports",
          level: "Beginner"
        },
        {
          title: "DeFi Security Patterns",
          description: "Common security patterns and anti-patterns in DeFi protocols",
          type: "Guide",
          category: "DeFi",
          link: "/resources/defi-security",
          level: "Advanced"
        }
      ],
      auditor: [
        {
          title: "Advanced Vulnerability Detection",
          description: "Deep dive into complex vulnerability patterns and detection techniques",
          type: "Course",
          category: "Technical",
          link: "/resources/vulnerability-detection",
          level: "Advanced"
        },
        {
          title: "Audit Methodology Framework",
          description: "Comprehensive framework for conducting thorough security audits",
          type: "Framework",
          category: "Methodology",
          link: "/resources/audit-methodology",
          level: "Intermediate"
        },
        {
          title: "Reporting Standards & Templates",
          description: "Professional audit report templates and writing guidelines",
          type: "Template",
          category: "Reporting",
          link: "/resources/reporting-standards",
          level: "Intermediate"
        },
        {
          title: "Cross-Chain Security Analysis",
          description: "Special considerations for multi-chain and bridge security",
          type: "Guide",
          category: "Advanced",
          link: "/resources/cross-chain-security",
          level: "Advanced"
        }
      ],
      admin: [
        {
          title: "Platform Administration Guide",
          description: "Complete guide to managing the Hawkly platform",
          type: "Manual",
          category: "Administration",
          link: "/resources/admin-guide",
          level: "Intermediate"
        },
        {
          title: "User Management Best Practices",
          description: "Guidelines for effective user account and role management",
          type: "Guide",
          category: "Management",
          link: "/resources/user-management",
          level: "Intermediate"
        },
        {
          title: "System Monitoring & Alerts",
          description: "Setting up and managing platform monitoring systems",
          type: "Tutorial",
          category: "Monitoring",
          link: "/resources/system-monitoring",
          level: "Advanced"
        }
      ],
      general: [
        {
          title: "Introduction to Web3 Security",
          description: "Basic concepts and principles of blockchain security",
          type: "Course",
          category: "Fundamentals",
          link: "/resources/web3-security-intro",
          level: "Beginner"
        },
        {
          title: "Choosing the Right Auditor",
          description: "How to evaluate and select security auditors for your project",
          type: "Guide",
          category: "Selection",
          link: "/resources/choosing-auditor",
          level: "Beginner"
        },
        {
          title: "Security Audit Process Overview",
          description: "Understanding the complete security audit lifecycle",
          type: "Overview",
          category: "Process",
          link: "/resources/audit-process",
          level: "Beginner"
        }
      ]
    };

    return allResources[userType] || allResources.general;
  };

  const resources = getResourcesByUserType();

  const getIcon = (type: string) => {
    const icons = {
      "Guide": BookOpen,
      "Tutorial": Video,
      "Course": Users,
      "Template": FileText,
      "Checklist": FileText,
      "Framework": Code,
      "Manual": BookOpen,
      "Overview": Lightbulb
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

  const categories = [...new Set(resources.map(r => r.category))];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Resource Center</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access curated resources tailored to your role and expertise level
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          {categories.slice(0, 3).map(category => (
            <TabsTrigger key={category} value={category.toLowerCase()}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-primary">
                      {getIcon(resource.type)}
                      <span className="text-sm font-medium">{resource.type}</span>
                    </div>
                    <Badge className={getLevelColor(resource.level)}>
                      {resource.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{resource.category}</Badge>
                    <Button asChild size="sm">
                      <Link to={resource.link}>Access Resource</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {categories.map(category => (
          <TabsContent key={category} value={category.toLowerCase()} className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .filter(resource => resource.category === category)
                .map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-primary">
                          {getIcon(resource.type)}
                          <span className="text-sm font-medium">{resource.type}</span>
                        </div>
                        <Badge className={getLevelColor(resource.level)}>
                          {resource.level}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{resource.category}</Badge>
                        <Button asChild size="sm">
                          <Link to={resource.link}>Access Resource</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
