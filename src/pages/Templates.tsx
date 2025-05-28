
import React, { useState } from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Download, FileText, Shield, Code, CheckCircle,
  Star, Users, Calendar, ArrowRight, Zap, Lock, Globe,
  Bot, Target, BookOpen, Lightbulb, AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [downloadedTemplates, setDownloadedTemplates] = useState<number[]>([]);

  const downloadTemplate = (templateIndex: number) => {
    if (!downloadedTemplates.includes(templateIndex)) {
      setDownloadedTemplates([...downloadedTemplates, templateIndex]);
    }
  };

  const templateCategories = [
    { id: 'all', name: 'All Templates', count: 47, icon: <FileText className="h-4 w-4" /> },
    { id: 'audit-checklists', name: 'Audit Checklists', count: 12, icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'security-reports', name: 'Security Reports', count: 8, icon: <Shield className="h-4 w-4" /> },
    { id: 'compliance', name: 'Compliance', count: 6, icon: <Lock className="h-4 w-4" /> },
    { id: 'code-review', name: 'Code Review', count: 9, icon: <Code className="h-4 w-4" /> },
    { id: 'ai-analysis', name: 'AI Analysis', count: 7, icon: <Bot className="h-4 w-4" /> },
    { id: 'testing', name: 'Testing', count: 5, icon: <Target className="h-4 w-4" /> }
  ];

  const featuredTemplates = [
    {
      title: "Comprehensive Smart Contract Audit Checklist 2025",
      description: "Complete 200+ point checklist covering all major vulnerability categories including AI-enhanced threat detection",
      category: "audit-checklists",
      type: "PDF + Excel",
      downloads: "12,847",
      rating: 4.9,
      lastUpdated: "March 2025",
      size: "2.1 MB",
      languages: ["English", "Spanish", "Chinese"],
      blockchains: ["Ethereum", "Polygon", "Arbitrum", "BSC"],
      features: ["AI Integration", "Risk Scoring", "OWASP Integration"],
      preview: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400",
      premium: false
    },
    {
      title: "DeFi Protocol Security Assessment Template",
      description: "Specialized template for auditing DeFi protocols with focus on liquidity risks, oracle security, and flash loan protection",
      category: "audit-checklists", 
      type: "Word + PDF",
      downloads: "8,923",
      rating: 4.8,
      lastUpdated: "March 2025",
      size: "1.8 MB",
      languages: ["English", "Korean", "Japanese"],
      blockchains: ["Ethereum", "Polygon", "Avalanche"],
      features: ["DeFi Specific", "MEV Analysis", "Liquidity Risk"],
      preview: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400",
      premium: false
    },
    {
      title: "AI-Powered Vulnerability Report Generator",
      description: "Template with built-in AI prompts for generating comprehensive security reports with risk classifications",
      category: "security-reports",
      type: "Word + AI Prompts",
      downloads: "6,734",
      rating: 4.9,
      lastUpdated: "March 2025", 
      size: "950 KB",
      languages: ["English"],
      blockchains: ["Multi-chain"],
      features: ["AI Prompts", "Auto-Classification", "Executive Summary"],
      preview: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
      premium: true
    },
    {
      title: "Cross-Chain Bridge Security Framework",
      description: "Comprehensive security assessment framework for cross-chain bridge protocols and infrastructure",
      category: "audit-checklists",
      type: "PDF + Excel",
      downloads: "5,156",
      rating: 4.7,
      lastUpdated: "February 2025",
      size: "3.2 MB",
      languages: ["English", "German"],
      blockchains: ["Multi-chain"],
      features: ["Bridge Specific", "Risk Matrix", "Incident Response"],
      preview: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
      premium: false
    },
    {
      title: "SOC2 Compliance Audit Template for Web3",
      description: "SOC2 Type II compliance template specifically designed for blockchain and DeFi platforms",
      category: "compliance",
      type: "Word + Excel",
      downloads: "4,892",
      rating: 4.6,
      lastUpdated: "March 2025",
      size: "2.8 MB",
      languages: ["English"],
      blockchains: ["All"],
      features: ["SOC2 Compliance", "Control Testing", "Evidence Collection"],
      preview: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400",
      premium: true
    },
    {
      title: "Zero-Knowledge Proof Security Checklist",
      description: "Specialized checklist for auditing ZK-SNARK and ZK-STARK implementations in smart contracts",
      category: "audit-checklists",
      type: "PDF + Checklist",
      downloads: "3,567",
      rating: 4.8,
      lastUpdated: "February 2025",
      size: "1.4 MB",
      languages: ["English", "French"],
      blockchains: ["Ethereum", "Polygon", "StarkNet"],
      features: ["ZK Specific", "Cryptographic Review", "Circuit Analysis"],
      preview: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400",
      premium: false
    }
  ];

  const quickTemplates = [
    {
      title: "Basic Security Checklist",
      description: "Essential 50-point checklist for small projects",
      type: "PDF",
      size: "450 KB",
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      title: "Vulnerability Report Template",
      description: "Standard format for reporting security issues",
      type: "Word",
      size: "200 KB", 
      icon: <AlertTriangle className="h-4 w-4" />
    },
    {
      title: "Code Review Checklist",
      description: "Manual code review guidelines and checklist",
      type: "PDF",
      size: "350 KB",
      icon: <Code className="h-4 w-4" />
    },
    {
      title: "Risk Assessment Matrix",
      description: "Risk scoring and priority matrix template",
      type: "Excel",
      size: "125 KB",
      icon: <Target className="h-4 w-4" />
    }
  ];

  const filteredTemplates = featuredTemplates.filter(template =>
    (selectedCategory === 'all' || template.category === selectedCategory) &&
    (searchQuery === '' || 
     template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     template.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <ContentPage
      title="Audit Templates"
      description="Professional security audit templates, checklists, and frameworks for comprehensive Web3 security assessments. Download industry-standard templates used by top auditors."
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
            <FileText className="h-4 w-4" />
            47 professional templates updated for March 2025 security standards
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Audit <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Templates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional-grade security audit templates, checklists, and frameworks used by industry experts. 
            Download comprehensive resources for thorough Web3 security assessments.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {templateCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.icon}
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Usage Stats */}
        <div className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-2xl p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">Template Usage Statistics</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-600">47</div>
              <div className="text-sm text-muted-foreground">Available templates</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">45,000+</div>
              <div className="text-sm text-muted-foreground">Downloads this month</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600">4.8★</div>
              <div className="text-sm text-muted-foreground">Average rating</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-orange-600">18</div>
              <div className="text-sm text-muted-foreground">Languages supported</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="custom">Custom Builder</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredTemplates.map((template, index) => (
                <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
                  <div className="relative">
                    <img 
                      src={template.preview} 
                      alt={template.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={template.premium ? "bg-yellow-500" : "bg-green-500"}>
                        {template.premium ? "Premium" : "Free"}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">{template.type}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">
                        {templateCategories.find(c => c.id === template.category)?.name}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {template.rating}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {template.title}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {template.downloads} downloads
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {template.lastUpdated}
                      </span>
                      <span>Size: {template.size}</span>
                      <span>{template.languages.length} languages</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Supported Blockchains:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.blockchains.map((blockchain, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {blockchain}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadTemplate(index)}
                        disabled={downloadedTemplates.includes(index)}
                      >
                        {downloadedTemplates.includes(index) ? (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Downloaded
                          </>
                        ) : (
                          <>
                            <Download className="mr-1 h-3 w-3" />
                            Download
                          </>
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        Preview <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick-start" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickTemplates.map((template, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        {template.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {template.title}
                        </CardTitle>
                        <CardDescription className="text-sm">{template.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{template.type}</span>
                      <span>{template.size}</span>
                    </div>
                    <Button size="sm" className="w-full">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templateCategories.filter(cat => cat.id !== 'all').map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                        <CardDescription>{category.count} templates</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      Browse Category <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Custom Template Builder</CardTitle>
                <CardDescription>
                  Create personalized audit templates based on your specific requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Template Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Custom security checklist generation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Blockchain-specific requirements
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        AI-powered vulnerability categories
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Compliance framework integration
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Multi-language support
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Coming Soon</h3>
                    <p className="text-muted-foreground text-sm">
                      Our AI-powered template builder is currently in development. 
                      It will allow you to create custom audit templates based on:
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Project type and complexity</li>
                      <li>• Blockchain platform requirements</li>
                      <li>• Compliance standards needed</li>
                      <li>• Team expertise level</li>
                      <li>• Budget and timeline constraints</li>
                    </ul>
                  </div>
                </div>
                <div className="text-center">
                  <Button disabled>
                    <Bot className="mr-2 h-4 w-4" />
                    Launch Template Builder (Coming Soon)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Need Custom Templates?</h2>
          <p className="text-muted-foreground mb-6">
            Our security experts can create custom audit templates tailored to your specific 
            blockchain platform, compliance requirements, and security standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">
                Request Custom Template
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/support">
                <Lightbulb className="mr-2 h-4 w-4" />
                Get Template Recommendations
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ContentPage>
  );
};

export default Templates;
