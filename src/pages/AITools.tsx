
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Zap,
  Brain,
  Search,
  FileText,
  Shield,
  BarChart,
  Code,
  AlertTriangle,
  ArrowRight,
  Star,
  Users,
  Filter,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AITools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tools = [
    {
      id: 1,
      title: "GPT-4 Smart Contract Analyzer",
      description: "Advanced AI analysis using GPT-4 for comprehensive smart contract security assessment with natural language explanations",
      category: "Code Analysis",
      icon: Brain,
      features: ["Natural Language Reports", "Vulnerability Detection", "Code Optimization", "Security Scoring"],
      pricing: "Free tier available",
      rating: 4.9,
      users: "25.3k",
      new: true,
      status: "Available"
    },
    {
      id: 2,
      title: "Claude Security Assistant",
      description: "Anthropic's Claude integrated for intelligent security discussions, code review assistance, and threat modeling",
      category: "Assistant",
      icon: Zap,
      features: ["Interactive Q&A", "Threat Modeling", "Code Review", "Security Education"],
      pricing: "Premium",
      rating: 4.8,
      users: "18.7k",
      new: true,
      status: "Available"
    },
    {
      id: 3,
      title: "ML Vulnerability Detector",
      description: "Machine learning model trained on 100k+ smart contracts to detect zero-day vulnerabilities and novel attack patterns",
      category: "Detection",
      icon: Search,
      features: ["Zero-day Detection", "Pattern Recognition", "Risk Scoring", "Continuous Learning"],
      pricing: "Enterprise",
      rating: 4.7,
      users: "12.4k",
      status: "Available"
    },
    {
      id: 4,
      title: "Automated Report Generator",
      description: "AI-powered tool that generates comprehensive security audit reports with findings, recommendations, and visualizations",
      category: "Reporting",
      icon: FileText,
      features: ["Auto Report Generation", "Custom Templates", "Visual Analytics", "Export Options"],
      pricing: "Pro",
      rating: 4.8,
      users: "21.9k",
      status: "Available"
    },
    {
      id: 5,
      title: "Threat Intelligence AI",
      description: "Real-time threat intelligence powered by AI analysis of global security incidents and emerging attack vectors",
      category: "Intelligence",
      icon: Shield,
      features: ["Real-time Alerts", "Threat Analysis", "Attack Prediction", "Global Intelligence"],
      pricing: "Enterprise",
      rating: 4.9,
      users: "8.2k",
      new: true,
      status: "Beta"
    },
    {
      id: 6,
      title: "Security Metrics Dashboard",
      description: "AI-driven analytics dashboard providing security metrics, trend analysis, and predictive insights for Web3 projects",
      category: "Analytics",
      icon: BarChart,
      features: ["Predictive Analytics", "Custom Metrics", "Trend Analysis", "Risk Forecasting"],
      pricing: "Pro",
      rating: 4.6,
      users: "15.1k",
      status: "Available"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Code Analysis', label: 'Code Analysis' },
    { value: 'Assistant', label: 'Assistant' },
    { value: 'Detection', label: 'Detection' },
    { value: 'Reporting', label: 'Reporting' },
    { value: 'Intelligence', label: 'Intelligence' },
    { value: 'Analytics', label: 'Analytics' }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Beta': return 'bg-yellow-100 text-yellow-800';
      case 'Coming Soon': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <StandardLayout
      title="AI Security Tools"
      description="Advanced AI-powered tools for automated security analysis and vulnerability detection"
    >
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Powered by GPT-4 & Claude</Badge>
          <h1 className="text-4xl font-bold mb-4">AI-Powered Security Tools</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leverage cutting-edge artificial intelligence for automated vulnerability detection, 
            intelligent code analysis, and predictive security insights in Web3.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">AI Tools Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">101k</div>
            <div className="text-sm text-muted-foreground">Analyses Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">94%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2.3s</div>
            <div className="text-sm text-muted-foreground">Avg. Analysis Time</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search AI tools, features, or capabilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {tool.new && (
                        <Badge variant="default" className="text-xs">New 2025</Badge>
                      )}
                      <Badge className={getStatusColor(tool.status)} variant="secondary">
                        {tool.status}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                      <div className="space-y-1">
                        {tool.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {tool.users}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {tool.rating}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {tool.pricing}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                    
                    <Button className="w-full" disabled={tool.status === 'Coming Soon'}>
                      {tool.status === 'Available' ? 'Try Tool' : tool.status === 'Beta' ? 'Join Beta' : 'Coming Soon'}
                      {tool.status !== 'Coming Soon' && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Integration Info */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How AI Enhances Security Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Intelligent Analysis</h3>
              <p className="text-sm text-muted-foreground">
                AI models trained on millions of smart contracts can identify patterns and vulnerabilities that traditional tools might miss.
              </p>
            </Card>

            <Card className="text-center p-6">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Speed & Efficiency</h3>
              <p className="text-sm text-muted-foreground">
                Complete comprehensive security analysis in seconds rather than hours, with consistent accuracy and reliability.
              </p>
            </Card>

            <Card className="text-center p-6">
              <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Predictive Insights</h3>
              <p className="text-sm text-muted-foreground">
                Advanced ML models can predict potential future vulnerabilities based on code patterns and emerging threat intelligence.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Security Analysis?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Combine AI-powered tools with expert human analysis for the most comprehensive security assessment available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Zap className="mr-2 h-4 w-4" />
              Start AI Analysis
            </Button>
            <Link to="/request-audit">
              <Button size="lg" variant="outline">
                Get Expert + AI Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default AITools;
