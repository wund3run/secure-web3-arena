import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Network, 
  MessageSquare, 
  Building2, 
  Shield, 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Star,
  Sparkles,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Clock,
  Award
} from 'lucide-react';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  status: 'live' | 'beta' | 'coming_soon';
  category: 'automation' | 'analysis' | 'enterprise' | 'collaboration';
  features: string[];
  badge?: string;
}

export function AdvancedFeaturesNavigation() {
  const features: FeatureCard[] = [
    {
      id: 'code-analysis',
      title: 'Advanced Code Analysis Engine',
      description: 'AI-powered multi-layer security analysis with cross-chain support and gas optimization',
      icon: <Code className="h-6 w-6" />,
      route: '/auditor/code-analysis',
      status: 'live',
      category: 'analysis',
      features: [
        'Multi-language support (Solidity, Vyper, Rust)',
        'Real-time vulnerability detection',
        'Gas optimization recommendations',
        'Security pattern analysis',
        'Cross-chain compatibility'
      ],
      badge: 'New'
    },
    {
      id: 'cross-chain',
      title: 'Cross-Chain Security Analyzer',
      description: 'Multi-chain vulnerability detection and bridge security assessment',
      icon: <Network className="h-6 w-6" />,
      route: '/auditor/cross-chain-analysis',
      status: 'live',
      category: 'analysis',
      features: [
        'Bridge security assessment',
        'Consensus mechanism analysis',
        'Interoperability testing',
        'Vulnerability correlation',
        'Multi-chain support'
      ],
      badge: 'Advanced'
    },
    {
      id: 'ai-assistant',
      title: 'AI Audit Assistant',
      description: 'Real-time AI-powered chat assistant with advanced collaboration features',
      icon: <MessageSquare className="h-6 w-6" />,
      route: '/auditor/ai-assistant',
      status: 'live',
      category: 'collaboration',
      features: [
        'Real-time chat interface',
        'Multi-language support',
        'Voice and video integration',
        'Vulnerability insights',
        'Code snippet analysis'
      ],
      badge: 'Popular'
    },
    {
      id: 'enterprise',
      title: 'Enterprise Dashboard',
      description: 'Advanced analytics and team management for enterprise audit firms',
      icon: <Building2 className="h-6 w-6" />,
      route: '/enterprise/dashboard',
      status: 'live',
      category: 'enterprise',
      features: [
        'Team performance analytics',
        'Revenue tracking',
        'Compliance management',
        'Client satisfaction metrics',
        'AI adoption insights'
      ],
      badge: 'Enterprise'
    },
    {
      id: 'enhanced-dashboard',
      title: 'Enhanced Auditor Dashboard',
      description: 'AI-powered audit management with advanced analytics and learning integration',
      icon: <BarChart3 className="h-6 w-6" />,
      route: '/auditor/enhanced-dashboard',
      status: 'live',
      category: 'automation',
      features: [
        'Performance metrics',
        'Learning progress tracking',
        'AI-powered insights',
        'Project management',
        'Real-time analytics'
      ],
      badge: 'Enhanced'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'text-green-600 bg-green-100';
      case 'beta': return 'text-yellow-600 bg-yellow-100';
      case 'coming_soon': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'automation': return 'text-blue-600';
      case 'analysis': return 'text-green-600';
      case 'enterprise': return 'text-purple-600';
      case 'collaboration': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const categories = [
    { id: 'all', name: 'All Features', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'automation', name: 'Automation', icon: <Zap className="h-4 w-4" /> },
    { id: 'analysis', name: 'Analysis', icon: <Brain className="h-4 w-4" /> },
    { id: 'enterprise', name: 'Enterprise', icon: <Building2 className="h-4 w-4" /> },
    { id: 'collaboration', name: 'Collaboration', icon: <Users className="h-4 w-4" /> }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Advanced Auditor Features</h1>
        <p className="text-muted-foreground mt-2">
          Discover the next generation of AI-powered audit tools and automation
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            {category.icon}
            {category.name}
          </Button>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map((feature) => (
          <Card key={feature.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status}
                      </Badge>
                      <Badge className={getCategoryColor(feature.category)}>
                        {feature.category}
                      </Badge>
                      {feature.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {feature.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium">Key Features:</h4>
                <ul className="space-y-1">
                  {feature.features.slice(0, 3).map((feat, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {feat}
                    </li>
                  ))}
                  {feature.features.length > 3 && (
                    <li className="text-xs text-muted-foreground">
                      +{feature.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>

              <Link to={feature.route}>
                <Button className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Launch Feature
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Platform Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-muted-foreground">Advanced Features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">35%</div>
              <div className="text-sm text-muted-foreground">Efficiency Gain</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-muted-foreground">AI Availability</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
              <Globe className="h-6 w-6" />
              <span className="text-sm font-medium">View Documentation</span>
              <span className="text-xs text-muted-foreground">Learn how to use features</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
              <Award className="h-6 w-6" />
              <span className="text-sm font-medium">Get Certified</span>
              <span className="text-xs text-muted-foreground">Complete training courses</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
              <Activity className="h-6 w-6" />
              <span className="text-sm font-medium">View Analytics</span>
              <span className="text-xs text-muted-foreground">Track your performance</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 