import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Shield, 
  FileText, 
  Database, 
  Users, 
  Zap, 
  TrendingUp,
  Search,
  Download,
  ExternalLink,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';

const Resources = () => {
  const resourceCategories = [
    {
      title: "Security Guides",
      description: "Comprehensive guides and best practices for Web3 security",
      icon: Shield,
      href: "/resources/security-guides",
      items: ["Smart Contract Security", "DeFi Protocols", "Cross-chain Security", "AI Security"],
      badge: "Essential",
      color: "bg-blue-500"
    },
    {
      title: "Knowledge Base",
      description: "In-depth articles and documentation",
      icon: BookOpen,
      href: "/resources/knowledge-base",
      items: ["Technical Documentation", "Integration Guides", "API References", "Tutorials"],
      badge: "Popular",
      color: "bg-green-500"
    },
    {
      title: "Vulnerability Database",
      description: "Known security issues and their fixes",
      icon: Database,
      href: "/resources/vulnerability-database",
      items: ["CVE Database", "Exploit Analysis", "Patch Information", "Risk Assessment"],
      badge: "Updated Daily",
      color: "bg-red-500"
    },
    {
      title: "Audit Guidelines",
      description: "Standards and methodologies for security audits",
      icon: FileText,
      href: "/resources/audit-guidelines",
      items: ["Audit Checklist", "Methodology", "Reporting Standards", "Quality Assurance"],
      badge: "Professional",
      color: "bg-purple-500"
    },
    {
      title: "Templates & Tools",
      description: "Ready-to-use templates and development tools",
      icon: Zap,
      href: "/resources/templates",
      items: ["Contract Templates", "Audit Reports", "Security Checklists", "Testing Scripts"],
      badge: "New",
      color: "bg-orange-500"
    },
    {
      title: "Tutorials",
      description: "Step-by-step learning materials",
      icon: Users,
      href: "/resources/tutorials",
      items: ["Beginner Guides", "Advanced Techniques", "Video Tutorials", "Interactive Labs"],
      badge: "Hands-on",
      color: "bg-cyan-500"
    }
  ];

  const featuredResources = [
    {
      title: "Web3 Security Fundamentals 2025",
      description: "Complete guide to modern Web3 security practices including AI-enhanced analysis",
      type: "Guide",
      readTime: "45 min",
      rating: 4.9,
      href: "/resources/security-guides/web3-fundamentals-2025"
    },
    {
      title: "Smart Contract Audit Checklist",
      description: "Comprehensive checklist for conducting thorough smart contract audits",
      type: "Template",
      readTime: "15 min",
      rating: 4.8,
      href: "/resources/templates/audit-checklist"
    },
    {
      title: "DeFi Security Best Practices",
      description: "Latest best practices for securing DeFi protocols and applications",
      type: "Guide",
      readTime: "30 min",
      rating: 4.9,
      href: "/resources/security-guides/defi-best-practices"
    }
  ];

  const stats = [
    { label: "Security Guides", value: "150+", icon: Shield },
    { label: "Vulnerabilities Tracked", value: "2,500+", icon: Database },
    { label: "Templates Available", value: "75+", icon: FileText },
    { label: "Community Contributors", value: "500+", icon: Users }
  ];

  return (
    <>
      <Helmet>
        <title>Resources - Security Guides, Tools & Knowledge Base | Hawkly</title>
        <meta name="description" content="Access comprehensive Web3 security resources including guides, vulnerability database, audit templates, and educational materials. Updated for 2025." />
        <meta name="keywords" content="web3 security resources, smart contract guides, vulnerability database, audit templates, security knowledge base" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Updated for June 2025
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-6">
              Security Resources Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Access the most comprehensive collection of Web3 security resources, guides, and tools. 
              Everything you need to build and audit secure blockchain applications.
            </p>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search resources, guides, vulnerabilities..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  Search
                </Button>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Resources</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Most popular and recently updated resources from our community
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {featuredResources.map((resource, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{resource.type}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {resource.rating}
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {resource.title}
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {resource.readTime}
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={resource.href}>
                          Read More <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our organized collection of security resources and tools
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourceCategories.map((category, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${category.color}/10`}>
                        <category.icon className={`h-6 w-6 text-white`} style={{ color: category.color.replace('bg-', '').replace('-500', '') }} />
                      </div>
                      <Badge variant="outline">{category.badge}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                      <Link to={category.href}>
                        Explore {category.title}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
              <CardContent className="pt-8">
                <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our team is constantly adding new resources. Request specific content or contribute your own expertise to help the community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/support">
                      Request Resource
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/community">
                      Join Community
                      <Users className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default Resources;
